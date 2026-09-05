package com.marketplace.dto;

import com.marketplace.model.OperateurPayout;
import com.marketplace.model.StatutVersement;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Ce qu'un vendeur voit de son propre versement.
 *
 * Distinct d'{@link AdminVersementDTO}, qui porte en plus la decomposition des
 * frais et de la commission : le vendeur la connait deja par « Mes ventes », et
 * la reproduire ici multiplierait les endroits ou un meme montant est calcule.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MonVersementDTO {
    private Long id;
    private Long commandeId;
    private String commandeReference;
    private BigDecimal montantNet;
    private StatutVersement statut;
    /** Quand les fonds sont sortis du sequestre — donc retirables. */
    private LocalDateTime libereAt;
    private LocalDateTime envoyeAt;
    /** Destination reellement creditee, une fois l'envoi initie. */
    private OperateurPayout destinationOperateur;
    private String destinationNumero;
    /** Reference GeniusPay, a rapprocher du releve Mobile Money. */
    private String reference;
}
