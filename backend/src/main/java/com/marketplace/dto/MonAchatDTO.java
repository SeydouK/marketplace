package com.marketplace.dto;

import com.marketplace.model.StatutCommande;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

/** Une commande de l'acheteur, telle qu'affichee dans « Mes achats ». */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MonAchatDTO {

    private Long id;
    private String reference;
    private StatutCommande statut;
    private BigDecimal montant;
    /** Renseigne uniquement tant que la commande est payable. */
    private String checkoutUrl;
    private LocalDateTime createdAt;
    private LocalDateTime paidAt;

    /**
     * Etat de synthese affichable tel quel, deduit du statut de commande et de
     * l'avancement des livraisons. Evite que le front reimplemente la regle.
     * Valeurs : EN_ATTENTE_PAIEMENT, EN_ATTENTE_LIVRAISON, EN_LIVRAISON,
     *           A_CONFIRMER, TERMINE, LITIGE, ANNULE.
     */
    private String etatGlobal;
    private String etatLibelle;

    private List<MonAchatItemDTO> items;
}
