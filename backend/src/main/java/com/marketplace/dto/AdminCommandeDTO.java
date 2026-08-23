package com.marketplace.dto;

import com.marketplace.model.StatutCommande;

import java.math.BigDecimal;
import java.time.LocalDateTime;
//
public record AdminCommandeDTO(
        Long id,
        String reference,
        StatutCommande statut,
        BigDecimal montant,
        BigDecimal fraisGeniusPay,
        BigDecimal commissionPlateforme,
        BigDecimal montantNetVendeur,
        Long acheteurId,
        String acheteurNom,
        String acheteurEmail,
        int nombreArticles,
        LocalDateTime createdAt,
        LocalDateTime paidAt,

        /**
         * Renseigne quand l'operateur declare payee une commande que nous avons
         * abandonnee. Sans ce drapeau, la ligne est indistinguable d'une
         * annulation ordinaire — et c'est de l'argent recu.
         */
        LocalDateTime paiementOrphelinDetecteAt
) {
}
