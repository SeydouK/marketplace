package com.marketplace.service;

import com.marketplace.dto.AdminVersementDTO;
import com.marketplace.dto.AdminVersementPageDTO;
import com.marketplace.exception.BadRequestException;
import com.marketplace.exception.ForbiddenException;
import com.marketplace.exception.ResourceNotFoundException;
import com.marketplace.model.Commande;
import com.marketplace.model.CommandeItem;
import com.marketplace.model.Role;
import com.marketplace.model.StatutVersement;
import com.marketplace.model.User;
import com.marketplace.model.Versement;
import com.marketplace.repository.UserRepository;
import com.marketplace.repository.VersementRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.EnumSet;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Calcule et déclenche les versements dus aux vendeurs pour leur part dans une
 * commande payée. Le calcul (genererVersements) est automatique dès la
 * confirmation du paiement ; l'envoi effectif (envoyerVersement) est une
 * action manuelle admin — les versements bougent de l'argent réel vers des
 * tiers, donc un humain valide avant l'appel à l'API GeniusPay.
 */
@Service
@RequiredArgsConstructor
@Transactional
public class VersementService {

    private static final Logger log = LoggerFactory.getLogger(VersementService.class);

    private final VersementRepository versementRepository;
    private final UserRepository userRepository;
    private final UserService userService;
    private final GeniusPayService geniusPayService;

    public void genererVersements(Commande commande) {
        if (commande.getItems().isEmpty()) return;

        // Garde-fou : cette methode cree des lignes de versement sans clef d'unicite.
        // Un second appel pour la meme commande paierait les vendeurs deux fois.
        if (!versementRepository.findByCommandeId(commande.getId()).isEmpty()) {
            log.warn("Versements déjà générés pour la commande {} : génération ignorée.", commande.getId());
            return;
        }

        // Collectors.groupingBy leve une NPE sur une clef nulle. A ce stade le paiement est deja
        // encaisse : lever ici ferait rollback et la commande ne serait jamais enregistree comme payee.
        // On isole donc les articles sans vendeur au lieu d'echouer — un admin peut les traiter a la main.
        List<CommandeItem> sansVendeur = commande.getItems().stream()
                .filter(item -> item.getVendeurId() == null)
                .toList();
        if (!sansVendeur.isEmpty()) {
            log.error("Commande {} : {} article(s) sans vendeur, aucun versement généré pour eux. "
                            + "Intervention manuelle requise.",
                    commande.getId(), sansVendeur.size());
        }

        Map<Long, List<CommandeItem>> parVendeur = commande.getItems().stream()
                .filter(item -> item.getVendeurId() != null)
                .collect(Collectors.groupingBy(CommandeItem::getVendeurId));

        if (parVendeur.isEmpty()) return;

        Map<Long, User> vendeurs = userRepository.findAllById(parVendeur.keySet()).stream()
                .collect(Collectors.toMap(User::getId, u -> u));

        for (Map.Entry<Long, List<CommandeItem>> entry : parVendeur.entrySet()) {
            Long vendeurId = entry.getKey();
            List<CommandeItem> items = entry.getValue();

            BigDecimal montantBrutVendeur = items.stream()
                    .map(CommandeItem::getSousTotal)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);

            BigDecimal part = montantBrutVendeur.divide(commande.getMontant(), 10, RoundingMode.HALF_UP);
            BigDecimal fraisAlloue = commande.getFraisGeniusPay().multiply(part).setScale(0, RoundingMode.HALF_UP);
            BigDecimal commissionAlloue = commande.getCommissionPlateforme().multiply(part).setScale(0, RoundingMode.HALF_UP);
            BigDecimal montantNet = montantBrutVendeur.subtract(fraisAlloue).subtract(commissionAlloue);

            User vendeur = vendeurs.get(vendeurId);

            Versement versement = new Versement();
            versement.setCommandeId(commande.getId());
            versement.setCommandeReference(commande.getReference());
            versement.setVendeurId(vendeurId);
            versement.setVendeurNom(vendeur != null
                    ? (vendeur.getSurname() + " " + vendeur.getName()).trim()
                    : items.get(0).getVendeurNom());
            versement.setVendeurTelephone(vendeur != null ? vendeur.getPhone() : null);
            versement.setMontantBrut(montantBrutVendeur);
            versement.setFraisGeniusPayAlloue(fraisAlloue);
            versement.setCommissionPlateformeAlloue(commissionAlloue);
            versement.setMontantNet(montantNet);
            versement.setStatut(StatutVersement.EN_ATTENTE);
            versementRepository.save(versement);
        }
    }

    public AdminVersementDTO envoyerVersement(Long versementId) {
        ensureAdminRole(userService.getCurrentUser());

        Versement versement = versementRepository.findById(versementId)
                .orElseThrow(() -> new ResourceNotFoundException("Versement introuvable : " + versementId));

        if (versement.getStatut() == StatutVersement.CONFIRME || versement.getStatut() == StatutVersement.EN_COURS) {
            throw new BadRequestException("Ce versement a déjà été envoyé.");
        }

        GeniusPayService.PayoutResult result = geniusPayService.initiatePayout(
                versement.getMontantNet(),
                versement.getVendeurNom(),
                versement.getVendeurTelephone(),
                null,
                "Versement vendeur - commande #" + versement.getCommandeId(),
                Map.of(
                        "versement_id", String.valueOf(versement.getId()),
                        "commande_id", String.valueOf(versement.getCommandeId()),
                        "vendeur_id", String.valueOf(versement.getVendeurId())
                ),
                "versement-" + versement.getId()
        );

        versement.setReference(result.reference());
        versement.setStatut(StatutVersement.EN_COURS);
        versement.setEnvoyeAt(LocalDateTime.now());
        versement = versementRepository.save(versement);

        return toDTO(versement);
    }

    public void traiterWebhookCashout(String event, String reference) {
        Versement versement = versementRepository.findByReference(reference).orElse(null);
        if (versement == null) {
            log.warn("Webhook cashout GeniusPay reçu pour une référence inconnue : {}", reference);
            return;
        }

        // Idempotence : un webhook déjà traité (ex. retry GeniusPay) ne doit rien refaire.
        if (versement.getStatut() == StatutVersement.CONFIRME) {
            return;
        }

        switch (event) {
            case "cashout.completed" -> versementRepository.save(setStatut(versement, StatutVersement.CONFIRME));
            case "cashout.failed" -> versementRepository.save(setStatut(versement, StatutVersement.ECHOUE));
            case "cashout.requested", "cashout.approved" ->
                    versementRepository.save(setStatut(versement, StatutVersement.EN_COURS));
            default -> log.debug("Événement cashout GeniusPay ignoré : {}", event);
        }
    }

    @Transactional(readOnly = true)
    public AdminVersementPageDTO listAdminVersements(StatutVersement statut, int page, int size) {
        ensureAdminRole(userService.getCurrentUser());

        int safePage = Math.max(page, 0);
        int safeSize = Math.min(Math.max(size, 1), 100);
        Pageable pageable = PageRequest.of(safePage, safeSize, Sort.by(Sort.Direction.DESC, "createdAt"));

        Page<Versement> versements = statut == null
                ? versementRepository.findAll(pageable)
                : versementRepository.findByStatut(statut, pageable);

        return new AdminVersementPageDTO(
                versements.getContent().stream().map(this::toDTO).toList(),
                versements.getTotalElements(),
                versements.getTotalPages(),
                versements.getNumber());
    }

    private Versement setStatut(Versement versement, StatutVersement statut) {
        versement.setStatut(statut);
        return versement;
    }

    private void ensureAdminRole(User user) {
        if (!EnumSet.of(Role.ADMIN).contains(user.getRole())) {
            throw new ForbiddenException("Cette action est reservee aux administrateurs.");
        }
    }

    private AdminVersementDTO toDTO(Versement v) {
        return new AdminVersementDTO(
                v.getId(),
                v.getCommandeId(),
                v.getCommandeReference(),
                v.getVendeurId(),
                v.getVendeurNom(),
                v.getVendeurTelephone(),
                v.getMontantBrut(),
                v.getFraisGeniusPayAlloue(),
                v.getCommissionPlateformeAlloue(),
                v.getMontantNet(),
                v.getStatut(),
                v.getReference(),
                v.getCreatedAt(),
                v.getEnvoyeAt()
        );
    }
}
