package com.marketplace.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Somme due à un acheteur sur une commande qui n'aboutira pas.
 *
 * Modelé à l'image du {@link Versement} : même cycle de vie, même surface
 * d'administration, même mécanique de règlement. Ce qui change, c'est le
 * destinataire et le fait qu'un motif soit obligatoire — rendre de l'argent
 * demande de dire pourquoi.
 *
 * Les cas qui en produisent un : animal mort ou perdu avant la remise, litige
 * arbitré en faveur de l'acheteur, commande annulée après encaissement.
 */
@Entity
@Table(name = "remboursements")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Remboursement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "commande_id", nullable = false)
    private Long commandeId;

    /** Snapshot de la référence, pour l'affichage sans jointure. */
    @Column(name = "commande_reference")
    private String commandeReference;

    @Column(name = "acheteur_id", nullable = false)
    private Long acheteurId;

    @Column(name = "acheteur_nom")
    private String acheteurNom;

    /**
     * Destination du remboursement, figée à la création.
     *
     * Comme pour le versement : si l'acheteur change de numéro entre-temps,
     * l'argent doit partir là où il était attendu au moment de la décision.
     */
    @Column(name = "acheteur_telephone")
    private String acheteurTelephone;

    @Column(name = "montant", nullable = false, columnDefinition = "numeric")
    private BigDecimal montant;

    /** Obligatoire : un remboursement sans raison écrite est inauditable. */
    @Column(name = "motif", nullable = false, columnDefinition = "text")
    private String motif;

    @Enumerated(EnumType.STRING)
    @Column(name = "statut", nullable = false)
    private StatutRemboursement statut = StatutRemboursement.EN_ATTENTE;

    @Enumerated(EnumType.STRING)
    @Column(name = "mode_reglement")
    private ModeReglement modeReglement;

    /** Référence de la transaction — API ou relevé Mobile Money. */
    @Column(name = "reference")
    private String reference;

    /** Quel administrateur a réglé, pour que la sortie d'argent ait un responsable. */
    @Column(name = "regle_par_id")
    private Long regleParId;

    @Column(name = "regle_at")
    private LocalDateTime regleAt;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
