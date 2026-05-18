package com.marketplace.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "panier_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PanierItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "panier_id", nullable = false)
    private Panier panier;

    @Column(name = "animal_id", nullable = false, columnDefinition = "uuid")
    private UUID animalId;

    @Column(name = "animal_nom", nullable = false)
    private String animalNom;

    @Column(name = "animal_race")
    private String animalRace;

    // columnDefinition = "numeric" : dit à Hibernate d'accepter NUMERIC/DECIMAL
    // sans précision/scale forcés, évitant le conflit float8 vs numeric
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

    @Column(name = "added_at")
    private LocalDateTime addedAt;

    @PrePersist
    protected void onCreate() {
        addedAt = LocalDateTime.now();
        if (quantite == null) quantite = 1;
    }

    public BigDecimal getSousTotal() {
        if (prixUnitaire == null) return BigDecimal.ZERO;
        return prixUnitaire.multiply(BigDecimal.valueOf(quantite));
    }
}