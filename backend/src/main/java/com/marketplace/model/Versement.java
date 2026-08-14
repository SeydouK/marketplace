package com.marketplace.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Versement dû à un vendeur pour sa part dans une commande payée.
 * Une Commande peut contenir des articles de plusieurs vendeurs : un Versement
 * est calculé par (commande, vendeur), avec la part de frais GeniusPay et de
 * commission plateforme allouée au prorata du montant brut de ce vendeur.
 */
@Entity
@Table(name = "versements")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Versement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "commande_id", nullable = false)
    private Long commandeId;

    /** Snapshot de la référence de commande, pour affichage sans jointure. */
    @Column(name = "commande_reference")
    private String commandeReference;

    @Column(name = "vendeur_id", nullable = false)
    private Long vendeurId;

    @Column(name = "vendeur_nom")
    private String vendeurNom;

    /** Numéro Mobile Money utilisé comme destination du payout (snapshot au moment de la création). */
    @Column(name = "vendeur_telephone")
    private String vendeurTelephone;

    @Column(name = "montant_brut", nullable = false, columnDefinition = "numeric")
    private BigDecimal montantBrut;

    @Column(name = "frais_geniuspay_alloue", nullable = false, columnDefinition = "numeric")
    private BigDecimal fraisGeniusPayAlloue;

    @Column(name = "commission_plateforme_alloue", nullable = false, columnDefinition = "numeric")
    private BigDecimal commissionPlateformeAlloue;

    @Column(name = "montant_net", nullable = false, columnDefinition = "numeric")
    private BigDecimal montantNet;

    @Enumerated(EnumType.STRING)
    @Column(name = "statut", nullable = false)
    private StatutVersement statut = StatutVersement.EN_ATTENTE;

    /** Référence du payout GeniusPay, renseignée une fois l'envoi initié. */
    @Column(name = "reference")
    private String reference;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "envoye_at")
    private LocalDateTime envoyeAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
