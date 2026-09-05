package com.marketplace.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Le code que l'acheteur détient et que celui qui remet l'animal doit saisir.
 *
 * Portée : un code par (commande, vendeur), et non par animal. Un acheteur qui
 * prend trois bêtes au même éleveur fait une seule remise ; trois codes seraient
 * impraticables sur le terrain. Le code reste valable tant que tous les animaux
 * du vendeur ne sont pas remis, ce qui couvre la remise en plusieurs fois.
 *
 * Cette portée épouse celle du {@link Versement} : valider le code libère
 * exactement le versement correspondant.
 */
@Entity
@Table(name = "remises")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Remise {

    /** Nombre de saisies erronées au-delà duquel la remise se bloque. */
    public static final int TENTATIVES_MAX = 3;

    /** Durée du blocage après épuisement des tentatives. */
    public static final int BLOCAGE_MINUTES = 30;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "commande_id", nullable = false)
    private Long commandeId;

    @Column(name = "vendeur_id", nullable = false)
    private Long vendeurId;

    /**
     * Code à 4 chiffres, stocké en clair.
     *
     * Un hachage n'apporterait presque rien — 4 chiffres se retrouvent en 10 000
     * essais hors ligne — au prix d'une vérification plus lourde. La protection
     * tient à trois règles : jamais renvoyé au vendeur, jamais journalisé, et
     * {@link #TENTATIVES_MAX} saisies au maximum.
     */
    @Column(name = "code", nullable = false, length = 8)
    private String code;

    @Column(name = "tentatives", nullable = false)
    private Integer tentatives = 0;

    /** Renseigné quand les tentatives sont épuisées ; la saisie est refusée jusque-là. */
    @Column(name = "bloquee_jusqu_a")
    private LocalDateTime bloqueeJusquA;

    // ── Ou et comment ───────────────────────────────────────────────────────

    @Enumerated(EnumType.STRING)
    @Column(name = "mode_remise", nullable = false)
    private ModeRemise modeRemise = ModeRemise.RETRAIT_SUR_PLACE;

    @Column(name = "adresse_ligne", columnDefinition = "text")
    private String adresseLigne;

    @Column(name = "adresse_ville", length = 120)
    private String adresseVille;

    /**
     * Points de reperage libres.
     *
     * L'adressage postal etant rare, une livraison se guide par reperes
     * (« apres le marche, portail vert »). Sans ce champ, le livreur telephone.
     */
    @Column(name = "adresse_indications", columnDefinition = "text")
    private String adresseIndications;

    /** Qui receptionne sur place — l'acheteur ou la personne qu'il mandate. */
    @Column(name = "destinataire_nom", length = 160)
    private String destinataireNom;

    @Column(name = "destinataire_telephone", length = 20)
    private String destinataireTelephone;

    @Column(name = "destination_latitude")
    private BigDecimal destinationLatitude;

    @Column(name = "destination_longitude")
    private BigDecimal destinationLongitude;

    // ── Ou en est le livreur ────────────────────────────────────────────────

    @Column(name = "livreur_latitude")
    private BigDecimal livreurLatitude;

    @Column(name = "livreur_longitude")
    private BigDecimal livreurLongitude;

    @Column(name = "livreur_position_at")
    private LocalDateTime livreurPositionAt;

    /**
     * Derniere cinematique connue.
     *
     * Sans cap ni vitesse, un marqueur ne peut qu'apparaitre au point recu ; avec
     * eux, il peut s'orienter et glisser jusqu'a lui. C'est toute la difference
     * entre une epingle qui saute et un vehicule qui avance.
     */
    @Column(name = "livreur_vitesse_kmh")
    private BigDecimal livreurVitesseKmh;

    @Column(name = "livreur_cap_degres")
    private BigDecimal livreurCapDegres;

    @Column(name = "livreur_precision_m")
    private Integer livreurPrecisionM;

    @Column(name = "depart_at")
    private LocalDateTime departAt;

    // ── Convoyage confie a un tiers ─────────────────────────────────────────
    // Le vendeur qui ne conduit pas lui-meme envoie un lien a un convoyeur qu'il
    // connait. Le jeton tient lieu d'authentification : pas de compte a creer
    // pour une seule course.

    @Column(name = "convoyage_jeton", length = 64)
    private String convoyageJeton;

    @Column(name = "transporteur_nom", length = 160)
    private String transporteurNom;

    /** Format international complet — l'application n'est pas destinee a un seul pays. */
    @Column(name = "transporteur_telephone", length = 24)
    private String transporteurTelephone;

    @Column(name = "convoyage_confie_at")
    private LocalDateTime convoyageConfieAt;

    @Column(name = "convoyage_expire_at")
    private LocalDateTime convoyageExpireAt;

    // ── Affectation a un transporteur inscrit ───────────────────────────────

    @Column(name = "transporteur_id")
    private Long transporteurId;

    @Enumerated(EnumType.STRING)
    @Column(name = "affectation_statut", length = 20)
    private StatutAffectation affectationStatut;

    @Column(name = "affectation_at")
    private LocalDateTime affectationAt;

    @Column(name = "affectation_reponse_at")
    private LocalDateTime affectationReponseAt;

    @Column(name = "affectation_refus_motif", columnDefinition = "text")
    private String affectationRefusMotif;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    /** La course est-elle prise en charge par un transporteur inscrit ? */
    public boolean priseEnCharge() {
        return transporteurId != null && affectationStatut == StatutAffectation.ACCEPTEE;
    }

    /** Le lien de convoyage est-il encore utilisable ? */
    public boolean convoyageActif(LocalDateTime maintenant) {
        return convoyageJeton != null
                && (convoyageExpireAt == null || convoyageExpireAt.isAfter(maintenant));
    }

    /** Une position est-elle disponible et assez fraiche pour etre affichee ? */
    public boolean positionExploitable(LocalDateTime maintenant, int fraicheurMinutes) {
        return livreurPositionAt != null
                && livreurLatitude != null
                && livreurLongitude != null
                && livreurPositionAt.isAfter(maintenant.minusMinutes(fraicheurMinutes));
    }

    /** La saisie est-elle refusée pour cause de tentatives épuisées ? */
    public boolean estBloquee(LocalDateTime maintenant) {
        return bloqueeJusquA != null && bloqueeJusquA.isAfter(maintenant);
    }
}
