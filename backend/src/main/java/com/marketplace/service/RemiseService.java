package com.marketplace.service;

import com.marketplace.exception.BadRequestException;
import com.marketplace.exception.ForbiddenException;
import com.marketplace.exception.ResourceNotFoundException;
import com.marketplace.model.AuteurEvenement;
import com.marketplace.model.Commande;
import com.marketplace.model.CommandeItem;
import com.marketplace.model.Remise;
import com.marketplace.model.StatutAffectation;
import com.marketplace.model.StatutCommande;
import com.marketplace.model.StatutLivraison;
import com.marketplace.model.TypeEvenementLivraison;
import com.marketplace.repository.CommandeItemRepository;
import com.marketplace.repository.RemiseRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.EnumSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

/**
 * Le code de remise : génération à l'encaissement, vérification au moment où
 * l'animal change de mains.
 *
 * C'est la pièce qui referme le séquestre. Avant, les fonds se libéraient sur un
 * bouton que l'acheteur pouvait ne jamais presser, avec un repli qui payait le
 * vendeur sans preuve. Désormais la remise physique <em>est</em> la preuve : seul
 * quelqu'un se tenant devant l'acheteur peut connaître son code.
 */
@Service
@RequiredArgsConstructor
@Transactional
public class RemiseService {

    private static final Logger log = LoggerFactory.getLogger(RemiseService.class);

    /** Le générateur doit être imprévisible : un code devinable annule tout le dispositif. */
    private static final SecureRandom ALEA = new SecureRandom();

    /** États depuis lesquels une remise peut encore être validée. */
    private static final Set<StatutLivraison> REMISABLES = EnumSet.of(
            StatutLivraison.A_REMETTRE,
            StatutLivraison.PRET,
            StatutLivraison.EN_LIVRAISON,
            StatutLivraison.LIVRE,
            StatutLivraison.ECHEC_LIVRAISON);

    private final RemiseRepository remiseRepository;
    private final CommandeItemRepository commandeItemRepository;
    private final JournalLivraisonService journal;
    private final SequestreService sequestre;
    private final NotificationLivraisonService notifications;

    // ══ Génération ══════════════════════════════════════════════════════════

    /**
     * Crée un code par vendeur présent dans la commande, au moment où le paiement
     * est confirmé.
     *
     * Idempotent : le webhook GeniusPay et la réconciliation peuvent tous deux
     * aboutir ici, et regénérer un code invaliderait celui déjà communiqué à
     * l'acheteur.
     */
    public void genererPourCommande(Commande commande) {
        commande.getItems().stream()
                .map(CommandeItem::getVendeurId)
                .filter(Objects::nonNull)
                .distinct()
                .forEach(vendeurId -> genererPourVendeur(commande, vendeurId));
    }

    private void genererPourVendeur(Commande commande, Long vendeurId) {
        if (remiseRepository.findByCommandeIdAndVendeurId(commande.getId(), vendeurId).isPresent()) {
            return;
        }

        Remise remise = new Remise();
        remise.setCommandeId(commande.getId());
        remise.setVendeurId(vendeurId);
        remise.setCode(genererCode());
        remiseRepository.save(remise);

        List<CommandeItem> articles = commande.getItems().stream()
                .filter(i -> vendeurId.equals(i.getVendeurId()))
                .toList();

        // Le code lui-même n'est jamais journalisé : le journal est lisible par
        // l'administration, et un code visible ailleurs que chez l'acheteur perd
        // sa valeur de preuve.
        articles.forEach(i -> journal.enregistrerSysteme(i.getId(),
                TypeEvenementLivraison.CODE_GENERE,
                "Code de remise généré pour le vendeur " + vendeurId));

        notifications.envoyerCodeDeRemise(commande.getUserId(), commande.getId(),
                articles.isEmpty() ? null : articles.get(0).getVendeurNom(),
                remise.getCode(), articles);
        articles.forEach(i -> journal.enregistrerSysteme(i.getId(),
                TypeEvenementLivraison.CODE_ENVOYE, "Code transmis à l'acheteur"));

        log.info("Code de remise créé (commande {}, vendeur {}).", commande.getId(), vendeurId);
    }

    /** Quatre chiffres, zéros de tête inclus : lisible à voix haute, retenu le temps d'être dit. */
    private String genererCode() {
        return String.format("%04d", ALEA.nextInt(10_000));
    }

    // ══ Consultation acheteur ═══════════════════════════════════════════════

    /** Le code, réservé à l'acheteur de la commande. */
    @Transactional(readOnly = true)
    public String codePourAcheteur(Long userId, Long commandeId, Long vendeurId) {
        Remise remise = remiseRepository.findByCommandeIdAndVendeurId(commandeId, vendeurId)
                .orElseThrow(() -> new ResourceNotFoundException("Aucun code de remise pour cette commande."));

        List<CommandeItem> items = commandeItemRepository.findByCommandeIdAndVendeurId(commandeId, vendeurId);
        if (items.isEmpty() || !Objects.equals(items.get(0).getCommande().getUserId(), userId)) {
            throw new ForbiddenException("Ce code ne vous appartient pas.");
        }
        return remise.getCode();
    }

    // ══ Validation ══════════════════════════════════════════════════════════

    /**
     * Validation par celui qui remet effectivement l'animal.
     *
     * Le transporteur affecté agit pour le compte du vendeur : c'est lui qui se
     * tient devant l'acheteur, donc lui qui reçoit le code. Sans ce chemin, une
     * course confiée ne pouvait jamais être soldée — le transporteur n'ayant accès
     * ni à « Mes ventes », ni au contrôle fondé sur l'identité du vendeur.
     *
     * Tous les garde-fous de {@link #validerCode} restent appliqués : photo
     * obligatoire, tentatives limitées, refus si litige ou remise déjà faite.
     */
    public int validerCodeParLivreur(Long userId, Long commandeId, List<Long> itemIds,
                                     String code, String photoUrl) {
        Long vendeurId = remiseRepository.findByCommandeIdAndVendeurId(commandeId, userId)
                .map(Remise::getVendeurId)
                .orElseGet(() -> remiseRepository.findByCommandeId(commandeId).stream()
                        .filter(r -> Objects.equals(r.getTransporteurId(), userId)
                                && r.getAffectationStatut() == StatutAffectation.ACCEPTEE)
                        .map(Remise::getVendeurId)
                        .findFirst()
                        .orElseThrow(() -> new ForbiddenException(
                                "Cette remise ne vous a pas été confiée.")));

        return validerCode(vendeurId, commandeId, itemIds, code, photoUrl);
    }

    /**
     * Vérifie le code et solde les articles remis.
     *
     * @param vendeurId celui qui remet — seul le vendeur des articles peut saisir.
     * @param itemIds   les animaux effectivement remis ; permet la remise en
     *                  plusieurs fois sans invalider le code pour le reste.
     * @param photoUrl  preuve obligatoire (décision actée).
     * @return le nombre d'articles soldés.
     */
    public int validerCode(Long vendeurId, Long commandeId, List<Long> itemIds,
                           String code, String photoUrl) {

        if (photoUrl == null || photoUrl.isBlank()) {
            throw new BadRequestException("Une photo de la remise est obligatoire.");
        }
        if (itemIds == null || itemIds.isEmpty()) {
            throw new BadRequestException("Indiquez au moins un animal remis.");
        }

        Remise remise = remiseRepository.findByCommandeIdAndVendeurId(commandeId, vendeurId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Aucun code de remise n'est associé à cette vente."));

        LocalDateTime maintenant = LocalDateTime.now();
        if (remise.estBloquee(maintenant)) {
            throw new BadRequestException(
                    "Trop de tentatives. Réessayez dans quelques minutes ou contactez le support.");
        }

        List<CommandeItem> items = chargerArticles(vendeurId, commandeId, itemIds);

        if (!codeCorrespond(remise, code)) {
            enregistrerEchecDeCode(remise, items, maintenant);
            throw new BadRequestException("Code incorrect. "
                    + (Remise.TENTATIVES_MAX - remise.getTentatives()) + " tentative(s) restante(s).");
        }

        // Succès : le compteur repart à zéro pour les remises suivantes de la même vente.
        remise.setTentatives(0);
        remise.setBloqueeJusquA(null);
        remiseRepository.save(remise);

        for (CommandeItem item : items) {
            item.setStatutLivraison(StatutLivraison.RECEPTIONNE);
            item.setReceptionneAt(maintenant);
            item.setPhotoRemiseUrl(photoUrl);
            if (item.getLivreAt() == null) item.setLivreAt(maintenant);
            commandeItemRepository.save(item);

            journal.enregistrer(item.getId(), TypeEvenementLivraison.CODE_VALIDE,
                    AuteurEvenement.VENDEUR, vendeurId,
                    com.marketplace.model.SourceEvenement.APP,
                    "Remise confirmée par code", photoUrl);
        }

        if (sequestre.libererSiLeve(commandeId, vendeurId)) {
            items.forEach(i -> journal.enregistrerSysteme(i.getId(),
                    TypeEvenementLivraison.FONDS_LIBERES,
                    "Séquestre levé : versement en attente d'envoi"));
            notifications.notifierFondsLiberes(vendeurId, commandeId,
                    sequestre.montantNet(commandeId, vendeurId));
        }

        log.info("Remise validée : commande {}, vendeur {}, {} article(s).",
                commandeId, vendeurId, items.size());
        return items.size();
    }

    /**
     * Comparaison à durée constante.
     *
     * Sur quatre chiffres le gain est théorique, mais la règle est de ne jamais
     * comparer un secret avec equals — le jour où le code s'allonge, la protection
     * est déjà en place.
     */
    private boolean codeCorrespond(Remise remise, String saisi) {
        if (saisi == null) return false;
        byte[] attendu = remise.getCode().getBytes(java.nio.charset.StandardCharsets.UTF_8);
        byte[] fourni = saisi.trim().getBytes(java.nio.charset.StandardCharsets.UTF_8);
        return java.security.MessageDigest.isEqual(attendu, fourni);
    }

    private void enregistrerEchecDeCode(Remise remise, List<CommandeItem> items, LocalDateTime maintenant) {
        remise.setTentatives(remise.getTentatives() + 1);
        if (remise.getTentatives() >= Remise.TENTATIVES_MAX) {
            remise.setBloqueeJusquA(maintenant.plusMinutes(Remise.BLOCAGE_MINUTES));
            log.warn("Remise {} bloquée après {} tentatives (commande {}, vendeur {}).",
                    remise.getId(), remise.getTentatives(), remise.getCommandeId(), remise.getVendeurId());
        }
        remiseRepository.save(remise);

        items.forEach(i -> journal.enregistrer(i.getId(), TypeEvenementLivraison.CODE_REFUSE,
                AuteurEvenement.VENDEUR, remise.getVendeurId(),
                "Tentative " + remise.getTentatives() + " sur " + Remise.TENTATIVES_MAX));
    }

    private List<CommandeItem> chargerArticles(Long vendeurId, Long commandeId, List<Long> itemIds) {
        List<CommandeItem> items = commandeItemRepository.findByCommandeIdAndVendeurId(commandeId, vendeurId)
                .stream()
                .filter(i -> itemIds.contains(i.getId()))
                .toList();

        if (items.size() != itemIds.size()) {
            throw new ForbiddenException("Certains animaux ne font pas partie de cette vente.");
        }
        if (items.get(0).getCommande().getStatut() != StatutCommande.PAYEE) {
            throw new BadRequestException("Cette commande n'est pas payée.");
        }

        CommandeItem dejaSolde = items.stream()
                .filter(i -> !REMISABLES.contains(i.getStatutLivraison()))
                .findFirst().orElse(null);
        if (dejaSolde != null) {
            throw new BadRequestException(dejaSolde.getStatutLivraison() == StatutLivraison.RECEPTIONNE
                    ? "« " + dejaSolde.getAnimalNom() + " » a déjà été remis."
                    : "« " + dejaSolde.getAnimalNom() + " » est en litige : la remise ne peut pas être validée.");
        }
        return items;
    }
}
