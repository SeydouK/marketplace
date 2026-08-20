package com.marketplace.model;

/**
 * Cycle de vie de la remise d'un animal, porte par chaque CommandeItem.
 *
 * C'est ce cycle qui commande le sequestre : l'argent encaisse reste du a la
 * plateforme tant que l'article n'est pas RECEPTIONNE (ou libere par delai).
 */
public enum StatutLivraison {
    /** Paye, mais le vendeur n'a pas encore remis l'animal. */
    A_REMETTRE,
    /** Pris en charge par le vendeur ou un transporteur, en route vers l'acheteur. */
    EN_LIVRAISON,
    /**
     * Depose chez l'acheteur d'apres le vendeur ou le transporteur.
     * Demarre le delai au terme duquel le versement se libere sans confirmation.
     */
    LIVRE,
    /** L'acheteur a confirme avoir l'animal en main : le versement peut partir. */
    RECEPTIONNE,
    /** L'acheteur conteste : le versement reste gele jusqu'a arbitrage d'un admin. */
    LITIGE
}
