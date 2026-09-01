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
    private StatutVersement statut = StatutVersement.BLOQUE;

    /** Référence du payout GeniusPay, renseignée une fois l'envoi initié. */
    @Column(name = "reference")
    private String reference;

    /**
     * Destination reellement creditee, figee au moment de l'envoi.
     *
     * Snapshot et non lecture du profil vendeur, pour la meme raison que
     * {@link #vendeurTelephone} : si le vendeur change d'operateur trois mois
     * plus tard, la trace doit continuer de dire ou l'argent est parti.
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "destination_operateur", length = 20)
    private OperateurPayout destinationOperateur;

    @Column(name = "destination_numero", length = 20)
    private String destinationNumero;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "envoye_at")
    private LocalDateTime envoyeAt;

    /** Sortie du sequestre : reception confirmee par l'acheteur, ou delai ecoule. */
    @Column(name = "libere_at")
    private LocalDateTime libereAt;

    /**
     * Par quel canal l'argent est sorti.
     *
     * MANUEL tant que GeniusPay n'expose pas de transfert sortant : le tracer
     * permet de rapprocher chaque versement du releve Mobile Money.
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "mode_reglement")
    private ModeReglement modeReglement;

    /** Quel administrateur a regle — une sortie d'argent doit avoir un responsable. */
    @Column(name = "regle_par_id")
    private Long regleParId;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
