package com.marketplace.service;

import com.marketplace.exception.BadRequestException;
import com.marketplace.exception.ForbiddenException;
import com.marketplace.exception.ResourceNotFoundException;
import com.marketplace.model.AnimalStatus;
import com.marketplace.model.Commande;
import com.marketplace.model.CommandeItem;
import com.marketplace.model.ModeReglement;
import com.marketplace.model.Remboursement;
import com.marketplace.model.Role;
import com.marketplace.model.StatutRemboursement;
import com.marketplace.model.StatutVersement;
import com.marketplace.model.User;
import com.marketplace.repository.AnimalRepository;
import com.marketplace.repository.CommandeItemRepository;
import com.marketplace.repository.CommandeRepository;
import com.marketplace.repository.RemboursementRepository;
import com.marketplace.repository.UserRepository;
import com.marketplace.repository.VersementRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

/**
 * Rendre l'argent à un acheteur quand la vente n'aboutit pas.
 *
 * <p><strong>Pourquoi le règlement est manuel.</strong> GeniusPay n'expose pas
 * encore de quoi verser — {@code geniuspay.wallet-id} est vide en production et
 * {@link GeniusPayService#initiatePayout} refuse tant qu'il l'est. Aujourd'hui
 * l'argent sort à la main, par Mobile Money. Ce service ne prétend donc pas
 * transférer des fonds : il tient le registre de ce qui est dû, et enregistre ce
 * qu'un administrateur a effectivement réglé, avec sa référence de transaction.
 *
 * <p>Le jour où l'API existe, seul {@link #reglerParApi} reste à écrire — le
 * registre, lui, ne change pas.
 */
@Service
@RequiredArgsConstructor
@Transactional
public class RemboursementService {

    private static final Logger log = LoggerFactory.getLogger(RemboursementService.class);

    private final RemboursementRepository remboursementRepository;
    private final CommandeRepository commandeRepository;
    private final CommandeItemRepository commandeItemRepository;
    private final VersementRepository versementRepository;
    private final AnimalRepository animalRepository;
    private final UserRepository userRepository;
    private final UserService userService;

    // ══ Création ════════════════════════════════════════════════════════════

    /**
     * Inscrit un remboursement au registre.
     *
     * @param remettreEnVente ramène les animaux en vente. À laisser faux quand
     *                        l'animal est mort ou perdu : le remettre au catalogue
     *                        vendrait une bête qui n'existe plus.
     */
    public Remboursement creer(Long commandeId, BigDecimal montant, String motif,
                               boolean remettreEnVente) {
        if (motif == null || motif.isBlank()) {
            throw new BadRequestException("Indiquez le motif du remboursement.");
        }
        if (montant == null || montant.signum() <= 0) {
            throw new BadRequestException("Le montant doit être supérieur à zéro.");
        }

        Commande commande = commandeRepository.findById(commandeId)
                .orElseThrow(() -> new ResourceNotFoundException("Commande introuvable : " + commandeId));

        BigDecimal dejaRembourse = totalDejaRembourse(commandeId);
        if (dejaRembourse.add(montant).compareTo(commande.getMontant()) > 0) {
            throw new BadRequestException(
                    "Le total des remboursements dépasserait le montant encaissé ("
                    + commande.getMontant().toPlainString() + " XOF, dont "
                    + dejaRembourse.toPlainString() + " déjà remboursés).");
        }

        // Rembourser un acheteur pendant qu'on paie le vendeur de la même commande
        // reviendrait a payer deux fois. On gele donc ce qui n'est pas encore parti.
        gelerVersementsNonEnvoyes(commandeId);

        User acheteur = userRepository.findById(commande.getUserId()).orElse(null);

        Remboursement remboursement = new Remboursement();
        remboursement.setCommandeId(commandeId);
        remboursement.setCommandeReference(commande.getReference());
        remboursement.setAcheteurId(commande.getUserId());
        remboursement.setAcheteurNom(acheteur != null
                ? (acheteur.getSurname() + " " + acheteur.getName()).trim() : null);
        remboursement.setAcheteurTelephone(acheteur != null ? acheteur.getPhone() : null);
        remboursement.setMontant(montant);
        remboursement.setMotif(motif.trim());
        remboursement.setStatut(StatutRemboursement.EN_ATTENTE);
        remboursement = remboursementRepository.save(remboursement);

        if (remettreEnVente) {
            remettreAnimauxEnVente(commandeId);
        }

        log.info("Remboursement {} inscrit : {} XOF a l'acheteur {} (commande {}) — {}",
                remboursement.getId(), montant, commande.getUserId(), commandeId, motif);
        return remboursement;
    }

    /** Création par un administrateur depuis la console. */
    public Remboursement creerParAdmin(Long commandeId, BigDecimal montant, String motif,
                                       boolean remettreEnVente) {
        ensureAdmin();
        return creer(commandeId, montant, motif, remettreEnVente);
    }

    // ══ Règlement ═══════════════════════════════════════════════════════════

    /**
     * Enregistre un remboursement réglé à la main.
     *
     * L'administrateur a fait le transfert Mobile Money lui-même ; on en garde la
     * référence pour que la sortie d'argent soit rapprochable du relevé.
     */
    public Remboursement reglerManuellement(Long remboursementId, String reference) {
        User admin = ensureAdmin();

        if (reference == null || reference.isBlank()) {
            throw new BadRequestException(
                    "Renseignez la référence de la transaction : sans elle, le règlement n'est pas vérifiable.");
        }

        Remboursement remboursement = remboursementRepository.findById(remboursementId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Remboursement introuvable : " + remboursementId));

        if (remboursement.getStatut() == StatutRemboursement.CONFIRME) {
            throw new BadRequestException("Ce remboursement a déjà été réglé.");
        }

        remboursement.setStatut(StatutRemboursement.CONFIRME);
        remboursement.setModeReglement(ModeReglement.MANUEL);
        remboursement.setReference(reference.trim());
        remboursement.setRegleParId(admin.getId());
        remboursement.setRegleAt(LocalDateTime.now());

        log.info("Remboursement {} réglé manuellement par l'admin {} — référence {}",
                remboursementId, admin.getId(), reference);
        return remboursementRepository.save(remboursement);
    }

    /**
     * Point d'entrée du règlement par API, à écrire quand GeniusPay exposera un
     * transfert. Volontairement présent et explicite plutôt qu'absent : c'est la
     * seule partie qui changera.
     */
    public Remboursement reglerParApi(Long remboursementId) {
        ensureAdmin();
        throw new BadRequestException(
                "Le versement automatique n'est pas disponible : GeniusPay n'expose pas encore "
                + "de transfert sortant. Réglez par Mobile Money, puis enregistrez la référence.");
    }

    // ══ Consultation ════════════════════════════════════════════════════════

    @Transactional(readOnly = true)
    public List<Remboursement> listAdmin(StatutRemboursement statut) {
        ensureAdmin();
        return statut == null
                ? remboursementRepository.findAllByOrderByCreatedAtDesc()
                : remboursementRepository.findByStatutOrderByCreatedAtDesc(statut);
    }

    @Transactional(readOnly = true)
    public List<Remboursement> mesRemboursements(Long acheteurId) {
        return remboursementRepository.findByAcheteurIdOrderByCreatedAtDesc(acheteurId);
    }

    // ══ Effets de bord ══════════════════════════════════════════════════════

    private BigDecimal totalDejaRembourse(Long commandeId) {
        return remboursementRepository.findByCommandeId(commandeId).stream()
                .filter(r -> r.getStatut() != StatutRemboursement.ECHOUE)
                .map(Remboursement::getMontant)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    /**
     * Regèle les versements pas encore envoyés sur cette commande.
     *
     * Un versement déjà parti est hors de portée : il devra être récupéré hors
     * système, et c'est précisément pour éviter ce cas que le séquestre existe.
     */
    private void gelerVersementsNonEnvoyes(Long commandeId) {
        versementRepository.findByCommandeId(commandeId).stream()
                .filter(v -> v.getStatut() == StatutVersement.EN_ATTENTE)
                .forEach(v -> {
                    v.setStatut(StatutVersement.BLOQUE);
                    v.setLibereAt(null);
                    versementRepository.save(v);
                    log.info("Versement {} regelé : remboursement en cours sur la commande {}.",
                            v.getId(), commandeId);
                });
    }

    private void remettreAnimauxEnVente(Long commandeId) {
        List<UUID> ids = commandeItemRepository.findByCommandeId(commandeId).stream()
                .map(CommandeItem::getAnimalId)
                .filter(java.util.Objects::nonNull)
                .toList();
        if (ids.isEmpty()) return;

        int remis = animalRepository.changerStatutSiEnMasse(ids, AnimalStatus.VENDU, AnimalStatus.DISPONIBLE);
        log.info("Commande {} : {} animal(aux) remis en vente après remboursement.", commandeId, remis);
    }

    private User ensureAdmin() {
        User utilisateur = userService.getCurrentUser();
        if (utilisateur.getRole() != Role.ADMIN) {
            throw new ForbiddenException("Cette action est reservee aux administrateurs.");
        }
        return utilisateur;
    }
}
