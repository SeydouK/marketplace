package com.marketplace.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "commande_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommandeItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "commande_id", nullable = false)
    private Commande commande;

    @Column(name = "animal_id", nullable = false, columnDefinition = "uuid")
    private UUID animalId;

    @Column(name = "animal_nom", nullable = false)
    private String animalNom;

    @Column(name = "animal_race")
    private String animalRace;

    @Column(name = "prix_unitaire", nullable = false, columnDefinition = "numeric")
    private BigDecimal prixUnitaire;

    @Column(name = "quantite", nullable = false)
    private Integer quantite = 1;

    @Column(name = "vendeur_id")
    private Long vendeurId;

    @Column(name = "vendeur_nom")
    private String vendeurNom;

    @Column(name = "photo_url")
    private String photoUrl;

    @Column(name = "localisation")
    private String localisation;

    // ── Sequestre : suivi de la remise de l'animal ──────────────────────────
    // Un item = un animal = une livraison. Le versement du vendeur ne se debloque
    // que lorsque tous ses items d'une meme commande sont sortis du sequestre.

    @Enumerated(EnumType.STRING)
    @Column(name = "statut_livraison", nullable = false)
    private StatutLivraison statutLivraison = StatutLivraison.A_REMETTRE;

    /** Null tant qu'aucune prise en charge n'a ete declaree. */
    @Enumerated(EnumType.STRING)
    @Column(name = "transporteur")
    private Transporteur transporteur;

    /** Identifiant de suivi cote transporteur — reserve a l'integration Yango. */
    @Column(name = "tracking_reference")
    private String trackingReference;

    @Column(name = "remis_at")
    private LocalDateTime remisAt;

    /** Depot constate. Point de depart du delai de liberation automatique. */
    @Column(name = "livre_at")
    private LocalDateTime livreAt;

    @Column(name = "receptionne_at")
    private LocalDateTime receptionneAt;

    @Column(name = "litige_motif", columnDefinition = "text")
    private String litigeMotif;

    @Column(name = "litige_ouvert_at")
    private LocalDateTime litigeOuvertAt;

    /** Preuve de remise, obligatoire a la validation du code. */
    @Column(name = "photo_remise_url", columnDefinition = "text")
    private String photoRemiseUrl;

    @Column(name = "echec_motif", columnDefinition = "text")
    private String echecMotif;

    /** Nombre de remises tentees sans succes — sert au suivi, pas au blocage. */
    @Column(name = "tentatives_livraison", nullable = false)
    private Integer tentativesLivraison = 0;

    public BigDecimal getSousTotal() {
        if (prixUnitaire == null) return BigDecimal.ZERO;
        return prixUnitaire.multiply(BigDecimal.valueOf(quantite));
    }
}
