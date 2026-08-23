package com.marketplace.service;

import com.marketplace.dto.PointTraceDTO;
import com.marketplace.dto.PositionLivreurDTO;
import com.marketplace.dto.SuiviLivraisonDTO;
import com.marketplace.exception.BadRequestException;
import com.marketplace.exception.ForbiddenException;
import com.marketplace.exception.ResourceNotFoundException;
import com.marketplace.model.AuteurEvenement;
import com.marketplace.model.CommandeItem;
import com.marketplace.model.ModeRemise;
import com.marketplace.model.Remise;
import com.marketplace.model.StatutAffectation;
import com.marketplace.model.StatutLivraison;
import com.marketplace.model.TypeEvenementLivraison;
import com.marketplace.model.User;
import com.marketplace.model.LivraisonPosition;
import com.marketplace.repository.CommandeItemRepository;
import com.marketplace.repository.LivraisonPositionRepository;
import com.marketplace.repository.RemiseRepository;
import com.marketplace.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

/**
 * Le suivi d'une livraison en cours : où en est le livreur, et où il va.
 *
 * Deux points de vue sur le même objet — le livreur pousse sa position, l'acheteur
 * la consulte. Ni l'un ni l'autre ne voient plus que nécessaire : le livreur n'a
 * pas accès au code de remise, l'acheteur ne voit une position que si elle est
 * récente.
 */
@Service
@RequiredArgsConstructor
@Transactional
public class SuiviLivraisonService {

    private static final Logger log = LoggerFactory.getLogger(SuiviLivraisonService.class);

    /** Rayon terrestre moyen, pour la distance à vol d'oiseau. */
    private static final double RAYON_TERRE_KM = 6371.0;

    /**
     * Au-delà de cette précision annoncée, le relevé n'est pas un GPS.
     *
     * Un point donné à 500 m près vient d'une triangulation par antenne ou d'une
     * base wifi : il peut désigner un quartier entier. L'accepter ferait bondir le
     * marqueur à travers la ville puis revenir — l'acheteur y lit un trajet qui
     * n'a pas eu lieu.
     */
    private static final int PRECISION_MAX_M = 500;

    /**
     * Vitesse au-delà de laquelle un déplacement est tenu pour impossible.
     *
     * Un bétaillère ne fait pas 200 km/h. Un saut à cette vitesse trahit soit un
     * relevé aberrant, soit deux points captés dans un ordre inversé.
     */
    private static final double VITESSE_MAX_KMH = 200.0;

    /**
     * Distance minimale entre deux points conservés du tracé, en mètres.
     *
     * Sans ce filtre, un livreur arrêté dans un embouteillage écrirait un point
     * toutes les vingt secondes sans avancer d'un mètre.
     */
    private static final double PAS_TRACE_M = 100;

    /** Au-delà, le tracé est éclairci : un trajet n'a pas besoin de mille points. */
    private static final long POINTS_MAX = 200;

    private final RemiseRepository remiseRepository;
    private final CommandeItemRepository commandeItemRepository;
    private final UserRepository userRepository;
    private final JournalLivraisonService journal;
    private final LivraisonPositionRepository positionRepository;
    private final NotificationLivraisonService notifications;

    /**
     * Canal de diffusion temps réel.
     *
     * <p>@Lazy volontairement : ce gabarit est créé par la configuration WebSocket,
     * qui a elle-même besoin de ce service pour autoriser les abonnements. Sans
     * cette rupture, Spring refuse de démarrer sur une dépendance circulaire.
     *
     * <p>ObjectProvider plutôt qu'injection directe pour que le service reste
     * utilisable dans un contexte sans WebSocket — les tests unitaires, notamment.
     */
    private final org.springframework.beans.factory.ObjectProvider<SimpMessagingTemplate> diffuseur;

    /**
     * Au-delà de ce délai, la dernière position est considérée périmée.
     *
     * Afficher un point vieux d'une heure sur une carte est pire que ne rien
     * afficher : l'acheteur croit voir le livreur là où il n'est plus.
     */
    @Value("${app.livraison.fraicheur-position-minutes:10}")
    private int fraicheurPositionMinutes;

    // ══ Côté livreur ════════════════════════════════════════════════════════

    /**
     * Enregistre la position du livreur.
     *
     * Volontairement peu bavard : la position écrase la précédente et n'écrit rien
     * dans le journal. Un point toutes les vingt secondes sur trois heures de route
     * ferait plusieurs centaines de lignes de télémétrie dans une table conçue pour
     * les faits marquants.
     */
    public void enregistrerPosition(Long livreurId, Long remiseId,
                                    BigDecimal latitude, BigDecimal longitude) {
        enregistrerPosition(livreurId, remiseId, latitude, longitude, null, null, null);
    }

    /**
     * Enregistre la position du livreur, avec sa cinématique.
     *
     * <p>Vitesse, cap et précision viennent du même relevé que les coordonnées et
     * ne coûtent rien à transmettre. Ils servent deux fois : à écarter les relevés
     * aberrants ici, et à animer le marqueur côté client.
     *
     * <p>Le point est ensuite <strong>poussé</strong> sur le canal de la livraison.
     * C'est le changement de fond : l'acheteur ne sonde plus toutes les quinze
     * secondes, il reçoit le point à l'instant où il arrive.
     */
    public void enregistrerPosition(Long livreurId, Long remiseId,
                                    BigDecimal latitude, BigDecimal longitude,
                                    BigDecimal vitesseKmh, BigDecimal capDegres,
                                    Integer precisionM) {
        if (latitude == null || longitude == null) {
            throw new BadRequestException("Position incomplète.");
        }

        Remise remise = chargerRemisePourLivreur(livreurId, remiseId);

        // Un relevé douteux est ignoré sans erreur : le téléphone a fait son
        // travail, c'est la mesure qui ne vaut rien. Lever une exception ferait
        // croire à une panne et pousserait le client à réessayer en boucle.
        if (estAberrante(remise, latitude, longitude, precisionM)) {
            log.debug("Position ignorée sur la remise {} : relevé aberrant (précision {} m).",
                    remiseId, precisionM);
            return;
        }

        // Le tracé s'alimente AVANT l'écrasement : il a besoin du point précédent
        // pour mesurer la distance parcourue.
        enregistrerDansLeTrace(remise, latitude, longitude, vitesseKmh, capDegres, precisionM);

        LocalDateTime mesureeLe = LocalDateTime.now();
        remise.setLivreurLatitude(latitude);
        remise.setLivreurLongitude(longitude);
        remise.setLivreurPositionAt(mesureeLe);
        remise.setLivreurVitesseKmh(vitesseKmh);
        remise.setLivreurCapDegres(capDegres);
        remise.setLivreurPrecisionM(precisionM);
        remiseRepository.save(remise);

        diffuser(new PositionLivreurDTO(remiseId, latitude, longitude,
                vitesseKmh, capDegres, precisionM, mesureeLe));
    }

    /**
     * Pousse la position à ceux qui suivent cette livraison.
     *
     * <p>L'échec de diffusion n'interrompt rien : le point est déjà enregistré, et
     * le client sait retomber sur le sondage. Perdre un rafraîchissement d'écran
     * ne justifie pas de renvoyer une erreur au téléphone du livreur.
     */
    private void diffuser(PositionLivreurDTO point) {
        SimpMessagingTemplate gabarit = diffuseur.getIfAvailable();
        if (gabarit == null) return;
        try {
            gabarit.convertAndSend(
                    "/topic/livraisons/" + point.remiseId() + "/position", point);
        } catch (RuntimeException e) {
            log.warn("Diffusion de la position échouée sur la remise {} : {}",
                    point.remiseId(), e.getMessage());
        }
    }

    /**
     * Ce relevé est-il crédible ?
     *
     * <p>Deux motifs de rejet, tous deux constatés en usage réel : une précision
     * si mauvaise que le point désigne un quartier plutôt qu'une rue, et un saut
     * qui supposerait une vitesse impossible depuis le point précédent.
     */
    private boolean estAberrante(Remise remise, BigDecimal latitude, BigDecimal longitude,
                                 Integer precisionM) {
        if (precisionM != null && precisionM > PRECISION_MAX_M) {
            return true;
        }
        if (remise.getLivreurLatitude() == null || remise.getLivreurPositionAt() == null) {
            return false;
        }

        double secondes = java.time.Duration.between(
                remise.getLivreurPositionAt(), LocalDateTime.now()).toMillis() / 1000.0;
        if (secondes <= 1) return false;

        double metres = distanceMetres(
                remise.getLivreurLatitude().doubleValue(), remise.getLivreurLongitude().doubleValue(),
                latitude.doubleValue(), longitude.doubleValue());
        double kmh = (metres / secondes) * 3.6;
        return kmh > VITESSE_MAX_KMH;
    }

    /**
     * Ajoute un point au tracé, si le livreur a réellement avancé.
     *
     * Deux garde-fous contre l'accumulation : un pas minimal en distance, et un
     * plafond au-delà duquel les points les plus anciens sont éclaircis un sur
     * deux — le début du trajet garde sa forme, il perd seulement en finesse.
     */
    private void enregistrerDansLeTrace(Remise remise, BigDecimal latitude, BigDecimal longitude,
                                        BigDecimal vitesseKmh, BigDecimal capDegres,
                                        Integer precisionM) {
        if (remise.getLivreurLatitude() != null && remise.getLivreurLongitude() != null) {
            double metres = distanceMetres(
                    remise.getLivreurLatitude().doubleValue(), remise.getLivreurLongitude().doubleValue(),
                    latitude.doubleValue(), longitude.doubleValue());
            if (metres < PAS_TRACE_M) return;
        }

        LivraisonPosition point = new LivraisonPosition();
        point.setRemiseId(remise.getId());
        point.setLatitude(latitude);
        point.setLongitude(longitude);
        point.setVitesseKmh(vitesseKmh);
        point.setCapDegres(capDegres);
        point.setPrecisionM(precisionM);
        positionRepository.save(point);

        if (positionRepository.countByRemiseId(remise.getId()) > POINTS_MAX) {
            eclaircirLeTrace(remise.getId());
        }
    }

    /** Supprime un point sur deux dans la première moitié du tracé. */
    private void eclaircirLeTrace(Long remiseId) {
        List<LivraisonPosition> points = positionRepository.findByRemiseIdOrderByEnregistreLeAsc(remiseId);
        List<LivraisonPosition> aSupprimer = new java.util.ArrayList<>();
        for (int i = 1; i < points.size() / 2; i += 2) {
            aSupprimer.add(points.get(i));
        }
        if (!aSupprimer.isEmpty()) {
            positionRepository.deleteAll(aSupprimer);
            log.debug("Tracé de la remise {} éclairci : {} point(s) retirés.", remiseId, aSupprimer.size());
        }
    }

    /** Le tracé complet, pour l'afficher en polyligne. */
    @Transactional(readOnly = true)
    public List<PointTraceDTO> trace(Long userId, Long remiseId) {
        Remise remise = remiseRepository.findById(remiseId)
                .orElseThrow(() -> new ResourceNotFoundException("Livraison introuvable."));
        if (roleObservateur(remise, articles(remise), userId) == null) {
            throw new ForbiddenException("Cette livraison ne vous concerne pas.");
        }
        return positionRepository.findByRemiseIdOrderByEnregistreLeAsc(remiseId).stream()
                .map(p -> new PointTraceDTO(p.getLatitude(), p.getLongitude(), p.getEnregistreLe()))
                .toList();
    }

    /** Haversine en mètres — sert au pas du tracé. */
    private double distanceMetres(double lat1, double lon1, double lat2, double lon2) {
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        return RAYON_TERRE_KM * 1000 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    }

    /**
     * Le livreur prend la route.
     *
     * Fait basculer les animaux concernés en EN_LIVRAISON et ouvre le suivi côté
     * acheteur. C'est le seul moment de la livraison qui mérite une trace.
     */
    public SuiviLivraisonDTO demarrerLivraison(Long vendeurId, Long remiseId) {
        Remise remise = chargerRemisePourLivreur(vendeurId, remiseId);

        if (remise.getModeRemise() != ModeRemise.TRANSPORT) {
            throw new BadRequestException(
                    "Cette vente est en retrait sur place : il n'y a pas de trajet à suivre.");
        }
        if (remise.getDepartAt() != null) {
            throw new BadRequestException("La livraison a déjà démarré.");
        }

        LocalDateTime maintenant = LocalDateTime.now();
        remise.setDepartAt(maintenant);
        remiseRepository.save(remise);

        List<CommandeItem> articles = articles(remise);
        articles.stream()
                .filter(i -> i.getStatutLivraison() == StatutLivraison.A_REMETTRE
                        || i.getStatutLivraison() == StatutLivraison.PRET
                        || i.getStatutLivraison() == StatutLivraison.ECHEC_LIVRAISON)
                .forEach(i -> {
                    i.setStatutLivraison(StatutLivraison.EN_LIVRAISON);
                    i.setRemisAt(maintenant);
                    commandeItemRepository.save(i);
                    // Tracer le bon auteur : « le vendeur est parti » serait faux
                    // quand c'est un transporteur qui prend la route.
                    boolean parTransporteur = Objects.equals(remise.getTransporteurId(), vendeurId);
                    journal.enregistrer(i.getId(), TypeEvenementLivraison.PRIS_EN_CHARGE,
                            parTransporteur ? AuteurEvenement.TRANSPORTEUR : AuteurEvenement.VENDEUR,
                            vendeurId,
                            parTransporteur
                                    ? "Départ du transporteur " + (remise.getTransporteurNom() != null
                                            ? remise.getTransporteurNom() : "")
                                    : "Départ pour la livraison");
                });

        // L'acheteur avait le suivi en direct sans que rien ne lui dise d'aller le
        // regarder. C'est le seul moment du parcours ou il a une raison d'ouvrir
        // la carte.
        if (!articles.isEmpty()) {
            boolean parTransporteur = Objects.equals(remise.getTransporteurId(), vendeurId);
            notifications.notifierDepartLivraison(
                    articles.get(0).getCommande().getUserId(), remiseId, articles,
                    parTransporteur ? remise.getTransporteurNom() : articles.get(0).getVendeurNom());
        }

        log.info("Livraison démarrée (remise {}, vendeur {}).", remiseId, vendeurId);
        return toDTO(remise, articles, vendeurId);
    }

    // ══ Côté acheteur ═══════════════════════════════════════════════════════

    /**
     * Suivi d'une livraison, ouvert aux trois parties concernées.
     *
     * L'acheteur attend son animal, le vendeur reste responsable de sa vente
     * jusqu'à la remise, et le transporteur conduit. Réserver le suivi à
     * l'acheteur privait le vendeur de toute visibilité sur sa propre livraison —
     * y compris quand c'est lui qui la fait.
     *
     * Aucun des trois n'en voit plus : le DTO ne porte ni prix, ni montant de
     * versement, ni code de remise.
     */
    @Transactional(readOnly = true)
    public SuiviLivraisonDTO suivre(Long userId, Long remiseId) {
        Remise remise = remiseRepository.findById(remiseId)
                .orElseThrow(() -> new ResourceNotFoundException("Livraison introuvable."));

        List<CommandeItem> articles = articles(remise);
        if (roleObservateur(remise, articles, userId) == null) {
            throw new ForbiddenException("Cette livraison ne vous concerne pas.");
        }
        return toDTO(remise, articles, userId);
    }

    /**
     * Contrôle d'accès pour le canal temps réel, identifié par e-mail.
     *
     * <p>Le canal STOMP ne passe pas par la chaîne HTTP : au moment de
     * l'abonnement, il n'y a qu'un jeton validé et l'e-mail qu'il porte. Cette
     * méthode fait le pont, puis retombe exactement sur la même règle que le suivi
     * consulté en HTTP — trois parties admises, personne d'autre.
     *
     * <p>Sans elle, un sujet public laisserait n'importe quel compte connecté lire
     * en direct la position et l'adresse de livraison d'un inconnu.
     *
     * @return le rôle de l'observateur (« ACHETEUR », « VENDEUR », « TRANSPORTEUR »)
     * @throws ForbiddenException si cette personne n'a rien à voir avec la livraison
     */
    @Transactional(readOnly = true)
    public String verifierAccesParEmail(String email, Long remiseId) {
        User utilisateur = userRepository.findByEmail(email)
                .orElseThrow(() -> new ForbiddenException("Utilisateur inconnu."));

        Remise remise = remiseRepository.findById(remiseId)
                .orElseThrow(() -> new ResourceNotFoundException("Livraison introuvable."));

        String role = roleObservateur(remise, articles(remise), utilisateur.getId());
        if (role == null) {
            throw new ForbiddenException("Cette livraison ne vous concerne pas.");
        }
        return role;
    }

    /** À quel titre cette personne regarde-t-elle, ou null si elle n'a rien à y voir. */
    private String roleObservateur(Remise remise, List<CommandeItem> articles, Long userId) {
        if (!articles.isEmpty()
                && Objects.equals(articles.get(0).getCommande().getUserId(), userId)) {
            return "ACHETEUR";
        }
        if (Objects.equals(remise.getVendeurId(), userId)) {
            return "VENDEUR";
        }
        if (Objects.equals(remise.getTransporteurId(), userId)
                && remise.getAffectationStatut() == StatutAffectation.ACCEPTEE) {
            return "TRANSPORTEUR";
        }
        return null;
    }

    /**
     * Qui doit partager sa position ?
     *
     * Un transporteur ayant accepté conduit à la place du vendeur : c'est alors
     * lui, et lui seul. Sans cette distinction, le vendeur verrait un bouton
     * « Je pars » sur une course qu'il ne fait pas.
     */
    private boolean estLeLivreur(Remise remise, Long userId) {
        if (remise.getTransporteurId() != null
                && remise.getAffectationStatut() == StatutAffectation.ACCEPTEE) {
            return Objects.equals(remise.getTransporteurId(), userId);
        }
        return Objects.equals(remise.getVendeurId(), userId);
    }

    // ══ Destination ═════════════════════════════════════════════════════════

    /**
     * Définit où livrer, ou bascule en retrait sur place.
     *
     * L'acheteur seul décide : c'est chez lui que ça arrive.
     */
    public SuiviLivraisonDTO definirDestination(Long userId, Long remiseId, ModeRemise mode,
                                                String adresseLigne, String ville, String indications,
                                                String destinataireNom, String destinataireTelephone,
                                                BigDecimal latitude, BigDecimal longitude) {
        Remise remise = remiseRepository.findById(remiseId)
                .orElseThrow(() -> new ResourceNotFoundException("Livraison introuvable."));

        List<CommandeItem> articles = articles(remise);
        if (articles.isEmpty() || !Objects.equals(articles.get(0).getCommande().getUserId(), userId)) {
            throw new ForbiddenException("Cette livraison ne vous concerne pas.");
        }
        if (remise.getDepartAt() != null) {
            throw new BadRequestException(
                    "Le livreur est déjà en route : contactez-le pour modifier l'adresse.");
        }

        remise.setModeRemise(mode == null ? ModeRemise.RETRAIT_SUR_PLACE : mode);

        if (remise.getModeRemise() == ModeRemise.TRANSPORT) {
            if (adresseLigne == null || adresseLigne.isBlank()) {
                throw new BadRequestException("Indiquez où livrer l'animal.");
            }
            remise.setAdresseLigne(adresseLigne.trim());
            remise.setAdresseVille(ville);
            remise.setAdresseIndications(indications);
            remise.setDestinataireNom(destinataireNom);
            remise.setDestinataireTelephone(destinataireTelephone);
            remise.setDestinationLatitude(latitude);
            remise.setDestinationLongitude(longitude);
        } else {
            // Retour au retrait : on efface la destination pour ne pas laisser une
            // adresse orpheline visible au vendeur.
            remise.setAdresseLigne(null);
            remise.setAdresseVille(null);
            remise.setAdresseIndications(null);
            remise.setDestinationLatitude(null);
            remise.setDestinationLongitude(null);
        }

        remiseRepository.save(remise);
        return toDTO(remise, articles, userId);
    }

    // ══ Interne ═════════════════════════════════════════════════════════════

    private List<CommandeItem> articles(Remise remise) {
        return commandeItemRepository.findByCommandeIdAndVendeurId(
                remise.getCommandeId(), remise.getVendeurId());
    }

    /**
     * Charge une remise en verifiant que l'appelant est bien celui qui conduit.
     *
     * Le controle portait sur « etes-vous le vendeur ? », ce qui refusait un
     * transporteur pourtant valide et affecte a la course. Il porte desormais sur
     * « etes-vous le livreur ? » — le transporteur ayant accepte, sinon le vendeur.
     */
    private Remise chargerRemisePourLivreur(Long userId, Long remiseId) {
        Remise remise = remiseRepository.findById(remiseId)
                .orElseThrow(() -> new ResourceNotFoundException("Livraison introuvable."));

        if (!estLeLivreur(remise, userId)) {
            throw new ForbiddenException(
                    remise.getTransporteurId() != null
                            ? "Cette course est assuree par le transporteur affecte."
                            : "Cette livraison ne fait pas partie de vos ventes.");
        }
        return remise;
    }

    private SuiviLivraisonDTO toDTO(Remise remise, List<CommandeItem> articles, Long observateurId) {
        LocalDateTime maintenant = LocalDateTime.now();
        boolean positionFraiche = remise.positionExploitable(maintenant, fraicheurPositionMinutes);

        User vendeur = userRepository.findById(remise.getVendeurId()).orElse(null);
        String etat = etat(remise, articles, positionFraiche);

        return new SuiviLivraisonDTO(
                remise.getId(),
                remise.getCommandeId(),
                remise.getModeRemise(),
                vendeur != null ? (vendeur.getSurname() + " " + vendeur.getName()).trim() : null,
                vendeur != null ? vendeur.getPhone() : null,
                articles.stream().map(CommandeItem::getAnimalNom).toList(),
                articles.stream().map(CommandeItem::getId).toList(),
                remise.getAdresseLigne(),
                remise.getAdresseVille(),
                remise.getAdresseIndications(),
                remise.getDestinataireNom(),
                remise.getDestinataireTelephone(),
                remise.getDestinationLatitude(),
                remise.getDestinationLongitude(),
                positionFraiche ? remise.getLivreurLatitude() : null,
                positionFraiche ? remise.getLivreurLongitude() : null,
                remise.getLivreurPositionAt(),
                positionFraiche,
                positionFraiche ? distanceKm(remise) : null,
                remise.getDepartAt(),
                etat,
                libelle(etat, roleObservateur(remise, articles, observateurId)),
                roleObservateur(remise, articles, observateurId),
                estLeLivreur(remise, observateurId),
                remise.getTransporteurNom()
        );
    }

    private String etat(Remise remise, List<CommandeItem> articles, boolean positionFraiche) {
        if (articles.stream().allMatch(i -> i.getStatutLivraison() == StatutLivraison.RECEPTIONNE)) {
            return "REMIS";
        }
        if (articles.stream().anyMatch(i -> i.getStatutLivraison() == StatutLivraison.LITIGE)) {
            return "LITIGE";
        }
        if (remise.getModeRemise() == ModeRemise.RETRAIT_SUR_PLACE) {
            return articles.stream().anyMatch(i -> i.getStatutLivraison() == StatutLivraison.PRET)
                    ? "A_RETIRER" : "PREPARATION";
        }
        if (remise.getDepartAt() == null) return "PREPARATION";
        return positionFraiche ? "EN_ROUTE" : "EN_ROUTE_SANS_POSITION";
    }

    private String libelle(String etat, String role) {
        // « En route vers vous » est vrai pour l'acheteur et faux pour tous les
        // autres : l'animal ne va pas vers le vendeur, il en part. Le meme ecran
        // sert les trois parties, l'etat doit donc se dire depuis la place de
        // celui qui lit.
        boolean versLui = !"VENDEUR".equals(role) && !"TRANSPORTEUR".equals(role);

        return switch (etat) {
            case "PREPARATION" -> "En préparation";
            case "A_RETIRER" -> versLui ? "Prêt — à venir récupérer" : "Prêt — l'acheteur vient le chercher";
            case "EN_ROUTE" -> versLui ? "En route vers vous" : "En route vers l'acheteur";
            case "EN_ROUTE_SANS_POSITION" -> "En route — position momentanément indisponible";
            case "REMIS" -> "Remis";
            case "LITIGE" -> "Litige en cours";
            default -> etat;
        };
    }

    /**
     * Distance à vol d'oiseau entre le livreur et la destination (formule de
     * haversine).
     *
     * Assumée comme approximation : elle sous-estime toujours le trajet réel, ce
     * qui est le bon sens de l'erreur — mieux vaut annoncer plus loin que promettre
     * plus près. Un calcul d'itinéraire viendra si le besoin se confirme.
     */
    private BigDecimal distanceKm(Remise remise) {
        if (remise.getDestinationLatitude() == null || remise.getDestinationLongitude() == null) {
            return null;
        }

        double lat1 = Math.toRadians(remise.getLivreurLatitude().doubleValue());
        double lat2 = Math.toRadians(remise.getDestinationLatitude().doubleValue());
        double dLat = lat2 - lat1;
        double dLon = Math.toRadians(remise.getDestinationLongitude().doubleValue()
                - remise.getLivreurLongitude().doubleValue());

        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        double km = RAYON_TERRE_KM * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return BigDecimal.valueOf(km).setScale(1, RoundingMode.HALF_UP);
    }
}
