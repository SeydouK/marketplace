package com.marketplace.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;
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

    public BigDecimal getSousTotal() {
        if (prixUnitaire == null) return BigDecimal.ZERO;
        return prixUnitaire.multiply(BigDecimal.valueOf(quantite));
    }
}
