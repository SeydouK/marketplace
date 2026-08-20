package com.marketplace.service;

import com.marketplace.dto.AdminCommandeDTO;
import com.marketplace.dto.AdminCommandePageDTO;
import com.marketplace.dto.CommandeDTO;
import com.marketplace.exception.BadRequestException;
import com.marketplace.exception.ForbiddenException;
import com.marketplace.exception.ResourceNotFoundException;
import com.marketplace.model.AnimalStatus;
import com.marketplace.model.Commande;
import com.marketplace.model.CommandeItem;
import com.marketplace.model.Panier;
import com.marketplace.model.PanierItem;
import com.marketplace.model.Role;
import com.marketplace.model.StatutCommande;
import com.marketplace.model.User;
import com.marketplace.repository.AnimalRepository;
import com.marketplace.repository.CommandeRepository;
import com.marketplace.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.EnumSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class PaiementService {

    private static final Logger log = LoggerFactory.getLogger(PaiementService.class);
    private static final BigDecimal MONTANT_MINIMUM_XOF = BigDecimal.valueOf(200);

    /**
     * Duree de vie d'un lien de paiement GeniusPay (constatee : expires_at = created_at + 30 min).
     * Au-dela, une commande en attente n'est plus reutilisable et sa reservation d'animaux est relachee.
     */
    private static final long VALIDITE_PAIEMENT_MINUTES = 30;

    // ── Politique commerciale ────────────────────────────────────────────────
    /** Commission retenue par la plateforme sur chaque commande. */
    private static final BigDecimal TAUX_COMMISSION_PLATEFORME = new BigDecimal("0.03");
    /** Frais GeniusPay : 1% + 100 XOF fixe (cf. tarification GeniusPay). */
    private static final BigDecimal TAUX_GENIUSPAY = new BigDecimal("0.01");
    private static final BigDecimal FRAIS_FIXE_GENIUSPAY = BigDecimal.valueOf(100);

    private final CommandeRepository commandeRepository;
    private final AnimalRepository animalRepository;
    private final PanierService panierService;
    private final GeniusPayService geniusPayService;
    private final UserService userService;
    private final UserRepository userRepository;
    private final VersementService versementService;

    @Value("${app.frontend.url}")
    private String frontendUrl;

    public CommandeDTO creerCommande(Long userId) {
        Panier panier = panierService.getOuCreerPanier(userId);

        if (panier.getItems().isEmpty()) {
            throw new BadRequestException("Votre panier est vide.");
        }

        BigDecimal montant = panier.getTotal();
        if (montant.compareTo(MONTANT_MINIMUM_XOF) < 0) {
            throw new BadRequestException("Le montant minimum pour un paiement est de 200 XOF.");
        }

        // Sans vendeur, la commande serait impayable aux vendeurs apres encaissement
        // (cf. VersementService.genererVersements). On refuse avant que l'argent ne bouge.
        if (panier.getItems().stream().anyMatch(item -> item.getVendeurId() == null)) {
            log.error("Commande refusée pour l'utilisateur {} : un article du panier n'a pas de vendeur.", userId);
            throw new BadRequestException(
                    "Un article de votre panier n'est plus rattaché à un vendeur. "
                    + "Retirez-le puis ajoutez-le à nouveau avant de payer.");
        }

        // Une commande en attente existe deja pour cet acheteur ?
        // Sans ce controle, chaque clic sur "Payer" creerait une commande et un lien de
        // paiement supplementaires, tous payables : l'acheteur pourrait etre debite plusieurs
        // fois pour le meme panier.
        for (Commande enAttente : commandeRepository.findByUserIdAndStatut(userId, StatutCommande.EN_ATTENTE)) {
            if (correspondAuPanier(enAttente, panier)) {
                log.info("Commande {} déjà en attente pour le même panier : réutilisation du lien de paiement.",
                        enAttente.getId());
                return toDTO(enAttente);
            }
            // Le panier a change : la commande precedente n'a plus lieu d'etre.
            log.info("Panier modifié depuis la commande {} : annulation et libération des animaux.",
                    enAttente.getId());
            enAttente.setStatut(StatutCommande.ANNULEE);
            commandeRepository.save(enAttente);
            libererAnimaux(enAttente);
        }

        // Verrou : reserve chaque animal, ou echoue si un autre acheteur a ete plus rapide.
        reserverAnimaux(panier);

        BigDecimal fraisGeniusPay = calculerFraisGeniusPay(montant);
        BigDecimal commissionPlateforme = calculerCommissionPlateforme(montant);

        Commande commande = new Commande();
        commande.setUserId(userId);
        commande.setMontant(montant);
        commande.setFraisGeniusPay(fraisGeniusPay);
        commande.setCommissionPlateforme(commissionPlateforme);
        commande.setMontantNetVendeur(montant.subtract(fraisGeniusPay).subtract(commissionPlateforme));
        commande.setStatut(StatutCommande.EN_ATTENTE);
        for (PanierItem item : panier.getItems()) {
            commande.getItems().add(buildCommandeItem(commande, item));
        }
        commande = commandeRepository.save(commande);

        String successUrl = frontendUrl + "/paiement/retour?status=success&commandeId=" + commande.getId();
        String errorUrl = frontendUrl + "/paiement/retour?status=error&commandeId=" + commande.getId();

        GeniusPayService.PaymentCreationResult result = geniusPayService.createPayment(
                montant,
                "Commande #" + commande.getId(),
                Map.of("order_id", String.valueOf(commande.getId())),
                successUrl,
                errorUrl
        );

        commande.setReference(result.reference());
        commande.setCheckoutUrl(result.checkoutUrl());
        commande = commandeRepository.save(commande);

        return toDTO(commande);
    }

    public CommandeDTO getCommande(Long userId, Long commandeId) {
        Commande commande = commandeRepository.findByIdAndUserId(commandeId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Commande introuvable : " + commandeId));

        // Le webhook peut tarder ou se perdre : on interroge GeniusPay tant que la commande n'est pas tranchee.
        if (commande.getStatut() == StatutCommande.EN_ATTENTE && commande.getReference() != null) {
            reconcilierAupresDeGeniusPay(commande);
        }

        return toDTO(commande);
    }

    /**
     * Aligne la commande sur le statut reel chez GeniusPay.
     * Un echec d'appel est avale : la consultation d'une commande ne doit jamais dependre
     * de la disponibilite de GeniusPay — le webhook reste le chemin nominal.
     */
    private void reconcilierAupresDeGeniusPay(Commande commande) {
        String statutDistant;
        try {
            statutDistant = geniusPayService.getPaymentStatus(commande.getReference());
        } catch (Exception e) {
            log.warn("Réconciliation GeniusPay impossible pour {} : {}", commande.getReference(), e.getMessage());
            return;
        }

        if (statutDistant == null) {
            return;
        }

        switch (statutDistant) {
            case "completed" -> appliquerPaiementReussi(commande);
            case "failed" -> appliquerEchec(commande, StatutCommande.ECHOUEE);
            case "expired" -> appliquerEchec(commande, StatutCommande.EXPIREE);
            // "pending" / "processing" : le paiement est encore en cours, rien a trancher.
            default -> log.debug("Statut GeniusPay non final pour {} : {}", commande.getReference(), statutDistant);
        }
    }

    /**
     * Marque la commande payee et declenche les effets associes.
     * Partage par le webhook et la reconciliation, qui peuvent s'executer en parallele :
     * la transition est donc confiee a la base, et les effets de bord ne sont joues
     * que par l'appel qui a effectivement opere le changement de statut.
     */
    private void appliquerPaiementReussi(Commande commande) {
        LocalDateTime paidAt = LocalDateTime.now();

        int lignesModifiees = commandeRepository.marquerPayeeSiEnAttente(
                commande.getId(), StatutCommande.EN_ATTENTE, StatutCommande.PAYEE, paidAt);

        if (lignesModifiees == 0) {
            log.debug("Commande {} déjà marquée payée par un appel concurrent : effets de bord ignorés.",
                    commande.getId());
            return;
        }

        commande.setStatut(StatutCommande.PAYEE);
        commande.setPaidAt(paidAt);
        marquerAnimauxVendus(commande);
        panierService.viderPanier(commande.getUserId());
        // Calcule ce qui est dû à chaque vendeur ; l'envoi effectif reste une action admin manuelle.
        versementService.genererVersements(commande);
    }

    /** Clot une commande qui n'aboutira pas et remet ses animaux en vente. */
    private void appliquerEchec(Commande commande, StatutCommande statut) {
        commandeRepository.save(setStatut(commande, statut));
        libererAnimaux(commande);
    }

    public void traiterWebhook(String event, String reference, String orderId) {
        Commande commande = reference != null
                ? commandeRepository.findByReference(reference).orElse(null)
                : null;

        // Repli sur metadata.order_id : GeniusPay renvoie la metadata envoyee a la creation.
        if (commande == null && orderId != null) {
            try {
                commande = commandeRepository.findById(Long.parseLong(orderId)).orElse(null);
            } catch (NumberFormatException e) {
                log.warn("Webhook GeniusPay : order_id non numérique ({}), repli ignoré.", orderId);
            }
        }

        if (commande == null) {
            log.warn("Webhook GeniusPay reçu pour une référence inconnue : {} (order_id={})", reference, orderId);
            return;
        }

        // Idempotence : un webhook déjà traité (ex. retry GeniusPay) ne doit rien refaire.
        if (commande.getStatut() == StatutCommande.PAYEE) {
            return;
        }

        switch (event) {
            case "payment.success" -> appliquerPaiementReussi(commande);
            case "payment.failed" -> appliquerEchec(commande, StatutCommande.ECHOUEE);
            case "payment.cancelled" -> appliquerEchec(commande, StatutCommande.ANNULEE);
            case "payment.expired" -> appliquerEchec(commande, StatutCommande.EXPIREE);
            default -> log.debug("Événement GeniusPay ignoré : {}", event);
        }
    }

    @Transactional(readOnly = true)
    public AdminCommandePageDTO listAdminCommandes(StatutCommande statut, int page, int size) {
        ensureAdminRole(userService.getCurrentUser());

        int safePage = Math.max(page, 0);
        int safeSize = Math.min(Math.max(size, 1), 100);
        Pageable pageable = PageRequest.of(safePage, safeSize, Sort.by(Sort.Direction.DESC, "createdAt"));

        Page<Commande> commandes = statut == null
                ? commandeRepository.findAll(pageable)
                : commandeRepository.findByStatut(statut, pageable);

        Map<Long, User> acheteurs = userRepository.findAllById(
                commandes.getContent().stream().map(Commande::getUserId).distinct().toList()
        ).stream().collect(Collectors.toMap(User::getId, u -> u));

        return new AdminCommandePageDTO(
                commandes.getContent().stream().map(c -> toAdminDTO(c, acheteurs.get(c.getUserId()))).toList(),
                commandes.getTotalElements(),
                commandes.getTotalPages(),
                commandes.getNumber());
    }

    private AdminCommandeDTO toAdminDTO(Commande commande, User acheteur) {
        return new AdminCommandeDTO(
                commande.getId(),
                commande.getReference(),
                commande.getStatut(),
                commande.getMontant(),
                commande.getFraisGeniusPay(),
                commande.getCommissionPlateforme(),
                commande.getMontantNetVendeur(),
                commande.getUserId(),
                acheteur != null ? (acheteur.getSurname() + " " + acheteur.getName()).trim() : null,
                acheteur != null ? acheteur.getEmail() : null,
                commande.getItems().size(),
                commande.getCreatedAt(),
                commande.getPaidAt()
        );
    }

    private void ensureAdminRole(User user) {
        if (!EnumSet.of(Role.ADMIN).contains(user.getRole())) {
            throw new ForbiddenException("Cette action est reservee aux administrateurs.");
        }
    }

    private BigDecimal calculerFraisGeniusPay(BigDecimal montant) {
        return montant.multiply(TAUX_GENIUSPAY).add(FRAIS_FIXE_GENIUSPAY).setScale(0, RoundingMode.HALF_UP);
    }

    private BigDecimal calculerCommissionPlateforme(BigDecimal montant) {
        return montant.multiply(TAUX_COMMISSION_PLATEFORME).setScale(0, RoundingMode.HALF_UP);
    }

    /**
     * Relache les animaux des commandes abandonnees (creees puis jamais payees).
     *
     * Sans ce balayage, un acheteur qui ferme son navigateur avant de payer immobiliserait
     * ses animaux definitivement.
     *
     * Prudence deliberee : on interroge GeniusPay avant d'expirer quoi que ce soit. Un paiement
     * reellement abouti dont le webhook s'est perdu doit etre honore, jamais annule — expirer
     * a l'aveugle sur le seul critere du temps ferait perdre une vente deja payee.
     *
     * L'ensemble du balayage tient dans une transaction : en cas d'erreur, rien n'est applique
     * et la tentative suivante reprendra le travail.
     */
    @Scheduled(fixedDelayString = "${app.paiement.scan-expiration-ms:300000}")
    public void expirerCommandesAbandonnees() {
        LocalDateTime seuil = LocalDateTime.now().minusMinutes(VALIDITE_PAIEMENT_MINUTES);
        List<Commande> candidates =
                commandeRepository.findByStatutAndCreatedAtBefore(StatutCommande.EN_ATTENTE, seuil);

        if (candidates.isEmpty()) return;
        log.info("Balayage des commandes abandonnées : {} candidate(s).", candidates.size());

        for (Commande commande : candidates) {
            if (commande.getReference() != null) {
                reconcilierAupresDeGeniusPay(commande);
            }
            // Toujours EN_ATTENTE apres verification : le paiement n'a effectivement pas eu lieu.
            if (commande.getStatut() == StatutCommande.EN_ATTENTE) {
                log.info("Commande {} expirée après {} min sans paiement.",
                        commande.getId(), VALIDITE_PAIEMENT_MINUTES);
                appliquerEchec(commande, StatutCommande.EXPIREE);
            }
        }
    }

    /**
     * Verrouille chaque animal du panier en RESERVE.
     *
     * Le UPDATE conditionnel de AnimalRepository est atomique : si deux acheteurs commandent
     * le meme animal au meme instant, la base n'en laisse passer qu'un seul. Le perdant recoit
     * une erreur explicite, et le rollback de la transaction relache les animaux deja reserves
     * par cet appel — pas de reservation orpheline.
     */
    private void reserverAnimaux(Panier panier) {
        for (PanierItem item : panier.getItems()) {
            int reserve = animalRepository.changerStatutSi(
                    item.getAnimalId(), AnimalStatus.DISPONIBLE, AnimalStatus.RESERVE);

            if (reserve == 0) {
                log.info("Réservation refusée pour l'animal {} : déjà réservé ou plus en vente.",
                        item.getAnimalId());
                throw new BadRequestException(
                        "« " + item.getAnimalNom() + " » vient d'être réservé par un autre acheteur "
                        + "ou n'est plus en vente. Retirez-le de votre panier pour continuer.");
            }
        }
    }

    /** Remet en vente les animaux d'une commande qui n'aboutira pas. */
    private void libererAnimaux(Commande commande) {
        List<UUID> ids = animalIds(commande);
        if (ids.isEmpty()) return;
        int liberes = animalRepository.changerStatutSiEnMasse(
                ids, AnimalStatus.RESERVE, AnimalStatus.DISPONIBLE);
        log.info("Commande {} : {} animal(aux) remis en vente.", commande.getId(), liberes);
    }

    /** Solde les animaux d'une commande payee. */
    private void marquerAnimauxVendus(Commande commande) {
        List<UUID> ids = animalIds(commande);
        if (ids.isEmpty()) return;
        int vendus = animalRepository.changerStatutSiEnMasse(
                ids, AnimalStatus.RESERVE, AnimalStatus.VENDU);
        if (vendus < ids.size()) {
            log.warn("Commande {} : {} animal(aux) sur {} marqués vendus — les autres n'étaient plus réservés.",
                    commande.getId(), vendus, ids.size());
        }
    }

    private List<UUID> animalIds(Commande commande) {
        return commande.getItems().stream()
                .map(CommandeItem::getAnimalId)
                .filter(Objects::nonNull)
                .toList();
    }

    /**
     * Une commande en attente est-elle encore utilisable pour ce panier ?
     * Exige un contenu identique, un lien de paiement obtenu, et une commande assez recente
     * pour que le lien GeniusPay n'ait pas expire.
     */
    private boolean correspondAuPanier(Commande commande, Panier panier) {
        if (commande.getCheckoutUrl() == null) return false;
        if (commande.getCreatedAt() == null
                || commande.getCreatedAt().isBefore(LocalDateTime.now().minusMinutes(VALIDITE_PAIEMENT_MINUTES))) {
            return false;
        }
        if (commande.getMontant().compareTo(panier.getTotal()) != 0) return false;

        return quantitesParAnimal(commande.getItems(), CommandeItem::getAnimalId, CommandeItem::getQuantite)
                .equals(quantitesParAnimal(panier.getItems(), PanierItem::getAnimalId, PanierItem::getQuantite));
    }

    private <T> Map<UUID, Integer> quantitesParAnimal(List<T> items,
                                                      java.util.function.Function<T, UUID> idFn,
                                                      java.util.function.Function<T, Integer> qteFn) {
        return items.stream().collect(Collectors.toMap(idFn, qteFn, Integer::sum));
    }

    private Commande setStatut(Commande commande, StatutCommande statut) {
        commande.setStatut(statut);
        return commande;
    }

    private CommandeItem buildCommandeItem(Commande commande, PanierItem source) {
        CommandeItem item = new CommandeItem();
        item.setCommande(commande);
        item.setAnimalId(source.getAnimalId());
        item.setAnimalNom(source.getAnimalNom());
        item.setAnimalRace(source.getAnimalRace());
        item.setPrixUnitaire(source.getPrixUnitaire());
        item.setQuantite(source.getQuantite());
        item.setVendeurId(source.getVendeurId());
        item.setVendeurNom(source.getVendeurNom());
        item.setPhotoUrl(source.getPhotoUrl());
        item.setLocalisation(source.getLocalisation());
        return item;
    }

    private CommandeDTO toDTO(Commande commande) {
        return new CommandeDTO(
                commande.getId(),
                commande.getStatut(),
                commande.getMontant(),
                commande.getCheckoutUrl(),
                commande.getCreatedAt(),
                commande.getPaidAt()
        );
    }
}
