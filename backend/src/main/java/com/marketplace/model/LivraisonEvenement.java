package com.marketplace.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Une ligne du journal de livraison — jamais modifiée après écriture.
 *
 * Le statut porté par {@link CommandeItem} reste la valeur de travail (filtres,
 * requêtes), mais c'est cet historique qui fait foi : il permet d'afficher une
 * frise horodatée, d'arbitrer un litige sur pièces plutôt que sur parole, et
 * d'absorber plus tard les notifications d'un transporteur sans toucher à la
 * logique métier.
 */
@Entity
@Table(name = "livraison_evenements")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LivraisonEvenement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "commande_item_id", nullable = false)
    private Long commandeItemId;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false, length = 40)
    private TypeEvenementLivraison type;

    @Enumerated(EnumType.STRING)
    @Column(name = "auteur_type", nullable = false, length = 20)
    private AuteurEvenement auteurType;

    /** Null pour les événements produits par le système. */
    @Column(name = "auteur_id")
    private Long auteurId;

    @Enumerated(EnumType.STRING)
    @Column(name = "source", nullable = false, length = 20)
    private SourceEvenement source;

    @Column(name = "commentaire", columnDefinition = "text")
    private String commentaire;

    @Column(name = "photo_url", columnDefinition = "text")
    private String photoUrl;

    @Column(name = "latitude")
    private BigDecimal latitude;

    @Column(name = "longitude")
    private BigDecimal longitude;

    /** Détail propre au type d'événement, pour éviter une colonne par cas. */
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "donnees", columnDefinition = "jsonb")
    private String donnees;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
