package com.marketplace.service;

import com.marketplace.dto.MaVenteDTO;
import com.marketplace.dto.MonAchatDTO;
import com.marketplace.dto.MonAchatItemDTO;
import com.marketplace.exception.BadRequestException;
import com.marketplace.exception.ForbiddenException;
import com.marketplace.exception.ResourceNotFoundException;
import com.marketplace.model.Commande;
import com.marketplace.model.CommandeItem;
import com.marketplace.model.Role;
import com.marketplace.model.StatutCommande;
import com.marketplace.model.StatutLivraison;
import com.marketplace.model.StatutVersement;
import com.marketplace.model.Transporteur;
import com.marketplace.model.User;
import com.marketplace.model.Versement;
import com.marketplace.repository.CommandeItemRepository;
import com.marketplace.repository.CommandeRepository;
import com.marketplace.repository.UserRepository;
import com.marketplace.repository.VersementRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
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

    /**
     * Delai au terme duquel un article livre libere le versement sans confirmation.
     *
     * Sans lui, un acheteur passif ou de mauvaise foi immobiliserait indefiniment
     * l'argent du vendeur. Le compte a rebours part de la date de depot constatee,
     * et un litige ouvert le suspend.
     */
    @Value("${app.livraison.delai-liberation-jours:7}")
    private int delaiLiberationJours;

    // ══ Consultation acheteur ═══════════════════════════════════════════════

    @Transactional(readOnly = true)
    public List<MonAchatDTO> listMesAchats(Long userId) {
        return commandeRepository.findMesCommandesAvecItems(userId).stream()
                .map(this::toAchatDTO)
                .toList();
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

        return items.stream()
                .map(item -> toVenteDTO(item, versementsParCommande.get(item.getCommande().getId()),
                        acheteurs.get(item.getCommande().getUserId())))
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

        libererVersementSiSequestreLeve(item.getCommande().getId(), item.getVendeurId());

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

        regelerVersementSiPossible(item);

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
            return toVenteDTO(item);
        }

        item.setStatutLivraison(StatutLivraison.LIVRE);
        if (item.getLivreAt() == null) item.setLivreAt(LocalDateTime.now());
        commandeItemRepository.save(item);

        libererVersementSiSequestreLeve(item.getCommande().getId(), item.getVendeurId());
        return toVenteDTO(item);
    }

    // ══ Liberation du sequestre ═════════════════════════════════════════════

    /**
     * Un article a-t-il quitte le sequestre ?
     *
     * LIVRE au-dela du delai compte comme leve sans etre requalifie en RECEPTIONNE :
     * l'acheteur n'a rien confirme, et la trace doit rester exacte en cas de litige
     * ulterieur.
     */
    private boolean sequestreLeve(CommandeItem item, LocalDateTime maintenant) {
        return switch (item.getStatutLivraison()) {
            case RECEPTIONNE -> true;
            case LIVRE -> item.getLivreAt() != null
                    && !item.getLivreAt().plusDays(delaiLiberationJours).isAfter(maintenant);
            case A_REMETTRE, EN_LIVRAISON, LITIGE -> false;
        };
    }

    /**
     * Libere le versement d'un vendeur des que tous SES articles de la commande sont
     * sortis du sequestre. Un vendeur n'attend donc jamais la livraison d'un autre.
     */
    private void libererVersementSiSequestreLeve(Long commandeId, Long vendeurId) {
        if (vendeurId == null) return;

        LocalDateTime maintenant = LocalDateTime.now();
        List<CommandeItem> items = commandeItemRepository.findByCommandeIdAndVendeurId(commandeId, vendeurId);
        if (items.isEmpty() || !items.stream().allMatch(i -> sequestreLeve(i, maintenant))) {
            return;
        }

        Versement versement = versementRepository.findByCommandeIdAndVendeurId(commandeId, vendeurId).orElse(null);
        if (versement == null) {
            log.error("Commande {} / vendeur {} : sequestre leve mais aucun versement a liberer. "
                    + "Intervention manuelle requise.", commandeId, vendeurId);
            return;
        }
        if (versement.getStatut() != StatutVersement.BLOQUE) {
            return;
        }

        versement.setStatut(StatutVersement.EN_ATTENTE);
        versement.setLibereAt(maintenant);
        versementRepository.save(versement);
        log.info("Versement {} libere (commande {}, vendeur {}) : {} XOF en attente d'envoi.",
                versement.getId(), commandeId, vendeurId, versement.getMontantNet());
    }

    /**
     * Re-gele un versement libere mais pas encore parti, quand un litige survient
     * dans l'intervalle. Une fois l'envoi initie, l'argent est hors de portee :
     * le litige est alors trace, et son traitement revient a l'admin.
     */
    private void regelerVersementSiPossible(CommandeItem item) {
        if (item.getVendeurId() == null) return;

        versementRepository.findByCommandeIdAndVendeurId(item.getCommande().getId(), item.getVendeurId())
                .filter(v -> v.getStatut() == StatutVersement.EN_ATTENTE)
                .ifPresent(v -> {
                    v.setStatut(StatutVersement.BLOQUE);
                    v.setLibereAt(null);
                    versementRepository.save(v);
                    log.info("Versement {} re-gele : litige ouvert sur l'article {}.", v.getId(), item.getId());
                });
    }

    /**
     * Libere les versements dont la livraison est constatee depuis assez longtemps
     * sans reaction de l'acheteur.
     */
    @Scheduled(fixedDelayString = "${app.livraison.scan-liberation-ms:3600000}")
    public void libererVersementsEchus() {
        LocalDateTime seuil = LocalDateTime.now().minusDays(delaiLiberationJours);
        List<CommandeItem> echus = commandeItemRepository
                .findByStatutLivraisonAndLivreAtBefore(StatutLivraison.LIVRE, seuil);
        if (echus.isEmpty()) return;

        // Le versement etant par (commande, vendeur), plusieurs articles echus d'un
        // meme vendeur ne doivent declencher qu'une seule tentative de liberation.
        echus.stream()
                .filter(i -> i.getVendeurId() != null)
                .map(i -> Map.entry(i.getCommande().getId(), i.getVendeurId()))
                .distinct()
                .forEach(cle -> libererVersementSiSequestreLeve(cle.getKey(), cle.getValue()));
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
        List<MonAchatItemDTO> items = commande.getItems().stream()
                .map(item -> toAchatItemDTO(item, commande))
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

    private MonAchatItemDTO toAchatItemDTO(CommandeItem item, Commande commande) {
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
                statut == StatutLivraison.LIVRE && item.getLivreAt() != null
                        ? item.getLivreAt().plusDays(delaiLiberationJours)
                        : null
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
        return toVenteDTO(item, versement, acheteur);
    }

    private MaVenteDTO toVenteDTO(CommandeItem item, Versement versement, User acheteur) {
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
                statut == StatutLivraison.A_REMETTRE || statut == StatutLivraison.EN_LIVRAISON
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
        if (items.stream().allMatch(i -> i.getStatutLivraison() == StatutLivraison.RECEPTIONNE)) {
            return "TERMINE";
        }
        if (items.stream().anyMatch(i -> i.getStatutLivraison() == StatutLivraison.LIVRE)) {
            return "A_CONFIRMER";
        }
        if (items.stream().anyMatch(i -> i.getStatutLivraison() == StatutLivraison.EN_LIVRAISON)) {
            return "EN_LIVRAISON";
        }
        return "EN_ATTENTE_LIVRAISON";
    }

    private String libelleAchat(String etat) {
        return switch (etat) {
            case "EN_ATTENTE_PAIEMENT" -> "En attente de paiement";
            case "EN_ATTENTE_LIVRAISON" -> "Payé — en attente de livraison";
            case "EN_LIVRAISON" -> "En cours de livraison";
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
            case EN_LIVRAISON -> "EN_LIVRAISON";
            case LIVRE -> "EN_ATTENTE_CONFIRMATION";
            case RECEPTIONNE -> "FONDS_LIBERES";
            case LITIGE -> "LITIGE";
        };
    }

    private String libelleVente(String etat) {
        return switch (etat) {
            case "A_REMETTRE" -> "Payé — à remettre à l'acheteur";
            case "EN_LIVRAISON" -> "En cours de livraison";
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
