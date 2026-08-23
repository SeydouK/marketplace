package com.marketplace.service;

import com.marketplace.dto.EvenementLivraisonDTO;
import com.marketplace.dto.MaVenteDTO;
import com.marketplace.dto.MonAchatDTO;
import com.marketplace.dto.MonAchatItemDTO;
import com.marketplace.exception.BadRequestException;
import com.marketplace.exception.ForbiddenException;
import com.marketplace.exception.ResourceNotFoundException;
import com.marketplace.model.AuteurEvenement;
import com.marketplace.model.Commande;
import com.marketplace.model.CommandeItem;
import com.marketplace.model.Remise;
import com.marketplace.model.Role;
import com.marketplace.model.StatutCommande;
import com.marketplace.model.StatutLivraison;
import com.marketplace.model.Transporteur;
import com.marketplace.model.TypeEvenementLivraison;
import com.marketplace.model.User;
import com.marketplace.model.Versement;
import com.marketplace.repository.CommandeItemRepository;
import com.marketplace.repository.CommandeRepository;
import com.marketplace.repository.RemiseRepository;
import com.marketplace.repository.UserRepository;
import com.marketplace.repository.VersementRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.EnumSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Sequestre et suivi de remise.
 *
 * L'encaissement ne solde pas la vente : l'argent reste du a la plateforme tant que
 * l'acheteur n'a pas l'animal en main. Ce service porte le cycle de vie de la remise
 * (cote vendeur puis cote acheteur) et, a son terme, libere le versement du vendeur.
 *
 * Les transitions EN_LIVRAISON / LIVRE sont aujourd'hui declarees a la main par le
 * vendeur. Elles sont volontairement modelisees comme des etats de transport, et non
 * comme un simple booleen "remis", pour que l'integration Yango puisse les alimenter
 * sans changer ni le schema ni les regles de liberation.
 */
@Service
@RequiredArgsConstructor
@Transactional
public class LivraisonService {

    private static final Logger log = LoggerFactory.getLogger(LivraisonService.class);

    /** Etats depuis lesquels l'acheteur peut confirmer avoir recu l'animal. */
    private static final Set<StatutLivraison> CONFIRMABLES =
            EnumSet.of(StatutLivraison.A_REMETTRE, StatutLivraison.EN_LIVRAISON, StatutLivraison.LIVRE);

    private final CommandeRepository commandeRepository;
    private final CommandeItemRepository commandeItemRepository;
    private final VersementRepository versementRepository;
    private final UserRepository userRepository;
    private final UserService userService;
    private final RemiseRepository remiseRepository;
    private final SequestreService sequestre;
    private final NotificationLivraisonService notifications;
    private final RemboursementService remboursementService;
    private final JournalLivraisonService journal;

    // ══ Consultation acheteur ═══════════════════════════════════════════════

    @Transactional(readOnly = true)
    public List<MonAchatDTO> listMesAchats(Long userId) {
        return commandeRepository.findMesCommandesAvecItems(userId).stream()
                .map(this::toAchatDTO)
                .toList();
    }

    /**
     * Le code de remise des articles d'une commande, indexe par vendeur.
     *
     * N'est appele que depuis la vue acheteur : le code ne doit jamais transiter
     * vers le vendeur, sous peine de perdre toute valeur de preuve.
     */
    private Map<Long, Remise> remisesParVendeur(Long commandeId) {
        return remiseRepository.findByCommandeId(commandeId).stream()
                .collect(Collectors.toMap(Remise::getVendeurId, r -> r, (a, b) -> a));
    }

    // ══ Consultation vendeur ════════════════════════════════════════════════

    @Transactional(readOnly = true)
    public List<MaVenteDTO> listMesVentes(Long vendeurId) {
        List<CommandeItem> items =
                commandeItemRepository.findVentesPayees(vendeurId, StatutCommande.PAYEE);
        if (items.isEmpty()) return List.of();

        // Un versement couvre tous les articles d'un meme vendeur dans une commande :
        // on l'indexe par commande pour ne pas requeter par article.
        Map<Long, Versement> versementsParCommande = versementRepository.findByVendeurId(vendeurId).stream()
                .collect(Collectors.toMap(Versement::getCommandeId, v -> v, (a, b) -> a));

        Map<Long, User> acheteurs = userRepository.findAllById(
                items.stream().map(i -> i.getCommande().getUserId()).distinct().toList()
        ).stream().collect(Collectors.toMap(User::getId, u -> u));

        Map<Long, List<EvenementLivraisonDTO>> frises =
                journal.frises(items.stream().map(CommandeItem::getId).toList());

        // Une seule requete de remises pour toutes les ventes affichees.
        Map<String, Remise> remises = remiseRepository.findByVendeurId(vendeurId).stream()
                .collect(Collectors.toMap(r -> r.getCommandeId() + ":" + r.getVendeurId(), r -> r, (a, b) -> a));

        return items.stream()
                .map(item -> toVenteDTO(item, versementsParCommande.get(item.getCommande().getId()),
                        acheteurs.get(item.getCommande().getUserId()),
                        frises.getOrDefault(item.getId(), List.of()),
                        remises.get(item.getCommande().getId() + ":" + vendeurId)))
                .toList();
    }

    // ══ Transitions vendeur ═════════════════════════════════════════════════

    /** Le vendeur (ou plus tard le transporteur) declare avoir pris l'animal en charge. */
    public MaVenteDTO declarerPriseEnCharge(Long vendeurId, Long itemId,
                                            Transporteur transporteur, String trackingReference) {
        CommandeItem item = chargerItemDuVendeur(vendeurId, itemId);

        if (item.getStatutLivraison() != StatutLivraison.A_REMETTRE) {
            throw new BadRequestException("Cet animal n'est plus en attente de remise.");
        }

        item.setStatutLivraison(StatutLivraison.EN_LIVRAISON);
        item.setTransporteur(transporteur != null ? transporteur : Transporteur.MANUEL);
        item.setTrackingReference(trackingReference);
        item.setRemisAt(LocalDateTime.now());
        return toVenteDTO(commandeItemRepository.save(item));
    }

    /**
     * Depot constate chez l'acheteur.
     *
     * Ne libere pas l'argent : seule la confirmation de l'acheteur le fait, ou
     * l'expiration du delai qui demarre ici.
     */
    public MaVenteDTO declarerDepot(Long vendeurId, Long itemId) {
        CommandeItem item = chargerItemDuVendeur(vendeurId, itemId);

        if (item.getStatutLivraison() != StatutLivraison.EN_LIVRAISON
                && item.getStatutLivraison() != StatutLivraison.A_REMETTRE) {
            throw new BadRequestException("Cet animal ne peut plus etre declare livre.");
        }

        LocalDateTime maintenant = LocalDateTime.now();
        if (item.getRemisAt() == null) item.setRemisAt(maintenant);
        if (item.getTransporteur() == null) item.setTransporteur(Transporteur.MANUEL);
        item.setStatutLivraison(StatutLivraison.LIVRE);
        item.setLivreAt(maintenant);
        return toVenteDTO(commandeItemRepository.save(item));
    }

    /**
     * Le vendeur declare l'animal pret a partir.
     *
     * Sans cet etat, l'acheteur d'un retrait sur place ne sait pas quand se
     * deplacer et doit appeler le vendeur.
     */
    public MaVenteDTO declarerPret(Long vendeurId, Long itemId) {
        CommandeItem item = chargerItemDuVendeur(vendeurId, itemId);

        if (item.getStatutLivraison() != StatutLivraison.A_REMETTRE) {
            throw new BadRequestException("Cet animal n'est plus en attente de preparation.");
        }

        item.setStatutLivraison(StatutLivraison.PRET);
        commandeItemRepository.save(item);
        journal.enregistrer(item.getId(), TypeEvenementLivraison.ANIMAL_PRET,
                AuteurEvenement.VENDEUR, vendeurId, "Animal pret a etre remis");
        notifications.notifierAnimalPret(item.getCommande().getUserId(), item);
        return toVenteDTO(item);
    }

    /**
     * La remise a echoue : acheteur absent, animal refuse, acces impossible.
     *
     * Etat non terminal — l'article redevient remisable, et le compteur de
     * tentatives permet de reperer les livraisons qui s'enlisent.
     */
    public MaVenteDTO declarerEchec(Long vendeurId, Long itemId, String motif) {
        if (motif == null || motif.isBlank()) {
            throw new BadRequestException("Indiquez pourquoi la remise n'a pas pu avoir lieu.");
        }

        CommandeItem item = chargerItemDuVendeur(vendeurId, itemId);

        if (item.getStatutLivraison() == StatutLivraison.RECEPTIONNE
                || item.getStatutLivraison() == StatutLivraison.LITIGE) {
            throw new BadRequestException("Cet animal ne peut plus etre declare en echec.");
        }

        item.setStatutLivraison(StatutLivraison.ECHEC_LIVRAISON);
        item.setEchecMotif(motif.trim());
        item.setTentativesLivraison(item.getTentativesLivraison() + 1);
        // livreAt est efface : rien n'a ete livre, le compte a rebours de
        // liberation automatique ne doit surtout pas courir.
        item.setLivreAt(null);
        commandeItemRepository.save(item);

        journal.enregistrer(item.getId(), TypeEvenementLivraison.ECHEC_LIVRAISON,
                AuteurEvenement.VENDEUR, vendeurId,
                "Tentative " + item.getTentativesLivraison() + " : " + motif.trim());
        notifications.notifierEchecLivraison(item.getCommande().getUserId(), item, motif.trim());
        return toVenteDTO(item);
    }

    // ══ Transitions acheteur ════════════════════════════════════════════════

    /**
     * L'acheteur atteste avoir l'animal en main. C'est le seul evenement qui solde
     * la vente de plein droit — tout le reste n'est qu'un repli.
     *
     * Autorise meme depuis A_REMETTRE : un vendeur qui remet l'animal de la main a la
     * main sans rien declarer ne doit pas pouvoir bloquer sa propre remuneration.
     */
    public MonAchatDTO confirmerReception(Long userId, Long itemId) {
        CommandeItem item = chargerItemDeLAcheteur(userId, itemId);

        if (item.getStatutLivraison() == StatutLivraison.RECEPTIONNE) {
            throw new BadRequestException("Vous avez deja confirme la reception de cet animal.");
        }
        if (!CONFIRMABLES.contains(item.getStatutLivraison())) {
            throw new BadRequestException(
                    "Un litige est ouvert sur cet animal : la reception ne peut plus etre confirmee seule.");
        }

        item.setStatutLivraison(StatutLivraison.RECEPTIONNE);
        item.setReceptionneAt(LocalDateTime.now());
        commandeItemRepository.save(item);

        sequestre.libererSiLeve(item.getCommande().getId(), item.getVendeurId());

        return toAchatDTO(item.getCommande());
    }

    /** L'acheteur conteste : gele l'argent tant qu'un admin n'a pas tranche. */
    public MonAchatDTO ouvrirLitige(Long userId, Long itemId, String motif) {
        if (motif == null || motif.isBlank()) {
            throw new BadRequestException("Merci de decrire le probleme rencontre.");
        }

        CommandeItem item = chargerItemDeLAcheteur(userId, itemId);

        if (item.getStatutLivraison() == StatutLivraison.LITIGE) {
            throw new BadRequestException("Un litige est deja ouvert sur cet animal.");
        }

        item.setStatutLivraison(StatutLivraison.LITIGE);
        item.setLitigeMotif(motif.trim());
        item.setLitigeOuvertAt(LocalDateTime.now());
        commandeItemRepository.save(item);

        sequestre.regelerSiPossible(item.getCommande().getId(), item.getVendeurId(), item.getId());

        return toAchatDTO(item.getCommande());
    }

    // ══ Arbitrage admin ═════════════════════════════════════════════════════

    /**
     * Tranche un litige.
     *
     * @param enFaveurDuVendeur true : le litige est ecarte, l'article repasse LIVRE et
     *                          l'argent reprend son cours. false : l'article reste en
     *                          litige, le versement demeure gele en vue d'un remboursement.
     */
    public MaVenteDTO arbitrerLitige(Long itemId, boolean enFaveurDuVendeur) {
        ensureAdmin();

        CommandeItem item = commandeItemRepository.findByIdWithCommande(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Article introuvable : " + itemId));

        if (item.getStatutLivraison() != StatutLivraison.LITIGE) {
            throw new BadRequestException("Aucun litige ouvert sur cet article.");
        }
        if (!enFaveurDuVendeur) {
            // Trancher contre le vendeur ne suffisait pas : l'argent restait gele
            // sans chemin de retour. On inscrit desormais la somme due a l'acheteur.
            remboursementService.creer(
                    item.getCommande().getId(),
                    item.getSousTotal(),
                    "Litige tranche en faveur de l'acheteur — " + item.getAnimalNom()
                            + (item.getLitigeMotif() != null ? " : " + item.getLitigeMotif() : ""),
                    false);
            journal.enregistrer(item.getId(), TypeEvenementLivraison.LITIGE_ARBITRE,
                    AuteurEvenement.ADMIN, null,
                    "Litige tranche en faveur de l'acheteur : remboursement inscrit");
            return toVenteDTO(item);
        }

        item.setStatutLivraison(StatutLivraison.LIVRE);
        if (item.getLivreAt() == null) item.setLivreAt(LocalDateTime.now());
        commandeItemRepository.save(item);

        sequestre.libererSiLeve(item.getCommande().getId(), item.getVendeurId());
        journal.enregistrer(item.getId(), TypeEvenementLivraison.LITIGE_ARBITRE,
                AuteurEvenement.ADMIN, null, "Litige ecarte : la livraison reprend son cours");
        return toVenteDTO(item);
    }

    // ══ Acces et garde-fous ═════════════════════════════════════════════════

    private CommandeItem chargerItemDeLAcheteur(Long userId, Long itemId) {
        CommandeItem item = commandeItemRepository.findByIdWithCommande(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Article introuvable : " + itemId));

        if (!Objects.equals(item.getCommande().getUserId(), userId)) {
            throw new ForbiddenException("Cet article n'appartient pas a vos commandes.");
        }
        if (item.getCommande().getStatut() != StatutCommande.PAYEE) {
            throw new BadRequestException("Cette commande n'est pas payee.");
        }
        return item;
    }

    private CommandeItem chargerItemDuVendeur(Long vendeurId, Long itemId) {
        CommandeItem item = commandeItemRepository.findByIdWithCommande(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Article introuvable : " + itemId));

        if (!Objects.equals(item.getVendeurId(), vendeurId)) {
            throw new ForbiddenException("Cet article ne fait pas partie de vos ventes.");
        }
        if (item.getCommande().getStatut() != StatutCommande.PAYEE) {
            throw new BadRequestException("Cette commande n'est pas payee.");
        }
        return item;
    }

    private void ensureAdmin() {
        if (userService.getCurrentUser().getRole() != Role.ADMIN) {
            throw new ForbiddenException("Cette action est reservee aux administrateurs.");
        }
    }

    // ══ Mapping ═════════════════════════════════════════════════════════════

    private MonAchatDTO toAchatDTO(Commande commande) {
        Map<Long, Remise> remises = commande.getStatut() == StatutCommande.PAYEE
                ? remisesParVendeur(commande.getId())
                : Map.of();
        Map<Long, List<EvenementLivraisonDTO>> frises = journal.frises(
                commande.getItems().stream().map(CommandeItem::getId).toList());
        List<MonAchatItemDTO> items = commande.getItems().stream()
                .map(item -> toAchatItemDTO(item, commande, remises.get(item.getVendeurId()),
                        frises.getOrDefault(item.getId(), List.of())))
                .toList();

        String etat = etatGlobalAchat(commande);
        return new MonAchatDTO(
                commande.getId(),
                commande.getReference(),
                commande.getStatut(),
                commande.getMontant(),
                commande.getStatut() == StatutCommande.EN_ATTENTE ? commande.getCheckoutUrl() : null,
                commande.getCreatedAt(),
                commande.getPaidAt(),
                etat,
                libelleAchat(etat),
                items
        );
    }

    private MonAchatItemDTO toAchatItemDTO(CommandeItem item, Commande commande, Remise remise,
                                           List<EvenementLivraisonDTO> evenements) {
        boolean payee = commande.getStatut() == StatutCommande.PAYEE;
        StatutLivraison statut = item.getStatutLivraison();

        return new MonAchatItemDTO(
                item.getId(),
                item.getAnimalId(),
                item.getAnimalNom(),
                item.getAnimalRace(),
                item.getPhotoUrl(),
                item.getLocalisation(),
                item.getPrixUnitaire(),
                item.getQuantite(),
                item.getSousTotal(),
                item.getVendeurId(),
                item.getVendeurNom(),
                statut,
                item.getTransporteur(),
                item.getTrackingReference(),
                item.getRemisAt(),
                item.getLivreAt(),
                item.getReceptionneAt(),
                item.getLitigeMotif(),
                payee && CONFIRMABLES.contains(statut),
                payee && statut != StatutLivraison.LITIGE && statut != StatutLivraison.RECEPTIONNE,
                sequestre.liberationAutomatiqueLe(item),
                statut == StatutLivraison.RECEPTIONNE || remise == null ? null : remise.getCode(),
                remise != null ? remise.getId() : null,
                remise != null ? remise.getModeRemise() : null,
                evenements
        );
    }

    /**
     * Variante pour les reponses de transition.
     *
     * Recharge le versement et l'acheteur : le front remplace la ligne par ce qu'il
     * recoit, et un DTO ampute ferait disparaitre de l'ecran le montant net et l'etat
     * du sequestre juste apres que le vendeur a agi.
     */
    private MaVenteDTO toVenteDTO(CommandeItem item) {
        Versement versement = item.getVendeurId() == null ? null
                : versementRepository
                        .findByCommandeIdAndVendeurId(item.getCommande().getId(), item.getVendeurId())
                        .orElse(null);
        User acheteur = userRepository.findById(item.getCommande().getUserId()).orElse(null);
        return toVenteDTO(item, versement, acheteur, journal.friseDTO(item.getId()),
                remiseRepository.findByCommandeIdAndVendeurId(
                        item.getCommande().getId(), item.getVendeurId()).orElse(null));
    }

    private MaVenteDTO toVenteDTO(CommandeItem item, Versement versement, User acheteur,
                                  List<EvenementLivraisonDTO> evenements, Remise remise) {
        Commande commande = item.getCommande();
        StatutLivraison statut = item.getStatutLivraison();
        String etat = etatGlobalVente(item, versement);

        return new MaVenteDTO(
                item.getId(),
                commande.getId(),
                commande.getReference(),
                item.getAnimalId(),
                item.getAnimalNom(),
                item.getAnimalRace(),
                item.getPhotoUrl(),
                acheteur != null ? (acheteur.getSurname() + " " + acheteur.getName()).trim() : null,
                commande.getPaidAt(),
                item.getSousTotal(),
                partNetteDeLArticle(item, versement),
                statut,
                item.getTransporteur(),
                item.getTrackingReference(),
                item.getRemisAt(),
                item.getLivreAt(),
                item.getReceptionneAt(),
                item.getLitigeMotif(),
                versement != null ? versement.getStatut() : null,
                versement != null ? versement.getLibereAt() : null,
                versement != null ? versement.getEnvoyeAt() : null,
                etat,
                libelleVente(etat),
                statut == StatutLivraison.A_REMETTRE,
                statut == StatutLivraison.A_REMETTRE || statut == StatutLivraison.EN_LIVRAISON,
                remise != null ? remise.getId() : null,
                remise != null ? remise.getModeRemise() : null,
                remise != null
                        && remise.getTransporteurId() != null
                        && remise.getAffectationStatut() == com.marketplace.model.StatutAffectation.ACCEPTEE,
                remise != null ? remise.getTransporteurNom() : null,
                evenements
        );
    }

    /**
     * Part nette revenant a un article donne.
     *
     * Le versement est calcule par (commande, vendeur) : quand il couvre plusieurs
     * animaux, on repartit son net au prorata du brut de chacun, pour afficher un
     * montant par ligne sans jamais depasser le total reellement du.
     */
    private BigDecimal partNetteDeLArticle(CommandeItem item, Versement versement) {
        if (versement == null || versement.getMontantBrut() == null
                || versement.getMontantBrut().signum() == 0) {
            return null;
        }
        return versement.getMontantNet()
                .multiply(item.getSousTotal())
                .divide(versement.getMontantBrut(), 0, RoundingMode.HALF_UP);
    }

    private String etatGlobalAchat(Commande commande) {
        switch (commande.getStatut()) {
            case EN_ATTENTE:
                return "EN_ATTENTE_PAIEMENT";
            case ECHOUEE:
            case ANNULEE:
            case EXPIREE:
                return "ANNULE";
            default:
                break;
        }

        List<CommandeItem> items = commande.getItems();
        if (items.stream().anyMatch(i -> i.getStatutLivraison() == StatutLivraison.LITIGE)) {
            return "LITIGE";
        }
        // Un echec doit remonter avant tout etat d'attente : c'est le seul cas
        // ou l'acheteur a quelque chose a faire.
        if (items.stream().anyMatch(i -> i.getStatutLivraison() == StatutLivraison.ECHEC_LIVRAISON)) {
            return "ECHEC_LIVRAISON";
        }
        if (items.stream().allMatch(i -> i.getStatutLivraison() == StatutLivraison.RECEPTIONNE)) {
            return "TERMINE";
        }
        if (items.stream().anyMatch(i -> i.getStatutLivraison() == StatutLivraison.LIVRE)) {
            return "A_CONFIRMER";
        }
        if (items.stream().anyMatch(i -> i.getStatutLivraison() == StatutLivraison.EN_LIVRAISON)) {
            return "EN_LIVRAISON";
        }
        if (items.stream().anyMatch(i -> i.getStatutLivraison() == StatutLivraison.PRET)) {
            return "PRET";
        }
        return "EN_ATTENTE_LIVRAISON";
    }

    private String libelleAchat(String etat) {
        return switch (etat) {
            case "EN_ATTENTE_PAIEMENT" -> "En attente de paiement";
            case "EN_ATTENTE_LIVRAISON" -> "Payé — en attente de livraison";
            case "PRET" -> "Prêt — à récupérer";
            case "EN_LIVRAISON" -> "En cours de livraison";
            case "ECHEC_LIVRAISON" -> "Remise échouée — à replanifier";
            case "A_CONFIRMER" -> "Livré — confirmez la réception";
            case "TERMINE" -> "Réceptionné — terminé";
            case "LITIGE" -> "Litige en cours";
            case "ANNULE" -> "Annulé";
            default -> etat;
        };
    }

    private String etatGlobalVente(CommandeItem item, Versement versement) {
        if (item.getStatutLivraison() == StatutLivraison.LITIGE) return "LITIGE";

        if (versement != null) {
            switch (versement.getStatut()) {
                case CONFIRME:
                    return "VERSE";
                case EN_COURS:
                    return "VERSEMENT_EN_COURS";
                case ECHOUE:
                    return "VERSEMENT_ECHOUE";
                case EN_ATTENTE:
                    return "FONDS_LIBERES";
                default:
                    break;
            }
        }

        return switch (item.getStatutLivraison()) {
            case A_REMETTRE -> "A_REMETTRE";
            case PRET -> "PRET";
            case EN_LIVRAISON -> "EN_LIVRAISON";
            case LIVRE -> "EN_ATTENTE_CONFIRMATION";
            case RECEPTIONNE -> "FONDS_LIBERES";
            case ECHEC_LIVRAISON -> "ECHEC_LIVRAISON";
            case LITIGE -> "LITIGE";
        };
    }

    private String libelleVente(String etat) {
        return switch (etat) {
            case "A_REMETTRE" -> "Payé — à préparer";
            case "PRET" -> "Prêt — en attente de remise";
            case "EN_LIVRAISON" -> "En cours de livraison";
            case "ECHEC_LIVRAISON" -> "Remise échouée — à replanifier";
            case "EN_ATTENTE_CONFIRMATION" -> "Livré — en attente de confirmation de l'acheteur";
            case "FONDS_LIBERES" -> "Fonds débloqués — versement à venir";
            case "VERSEMENT_EN_COURS" -> "Versement en cours";
            case "VERSE" -> "Versement reçu";
            case "VERSEMENT_ECHOUE" -> "Versement échoué — contactez le support";
            case "LITIGE" -> "Litige en cours — fonds gelés";
            default -> etat;
        };
    }
}
