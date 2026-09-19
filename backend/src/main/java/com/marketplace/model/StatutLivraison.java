package com.marketplace.model;

/**
 * Cycle de vie de la remise d'un animal, porte par chaque CommandeItem.
 *
 * C'est ce cycle qui commande le sequestre : l'argent encaisse reste du a la
 * plateforme tant que l'article n'est pas RECEPTIONNE (ou libere par delai).
 */
public enum StatutLivraison {
    /** Paye, mais le vendeur n'a pas encore prepare l'animal. */
    A_REMETTRE,
    /**
     * Le vendeur declare l'animal pret a partir.
     * Indispensable au retrait sur place : sans lui, l'acheteur ne sait pas
     * quand se deplacer et doit appeler le vendeur.
     */
    PRET,
    /** Pris en charge par le vendeur ou un transporteur, en route vers l'acheteur. */
    EN_LIVRAISON,
    /**
     * Depose chez l'acheteur d'apres le vendeur ou le transporteur.
     * Demarre le delai au terme duquel le versement se libere sans confirmation.
     */
    LIVRE,
    /** L'acheteur a confirme avoir l'animal en main : le versement peut partir. */
    RECEPTIONNE,
    /**
     * Remise tentee sans succes : acheteur absent, animal refuse, acces impossible.
     * Etat non terminal — une nouvelle tentative peut repartir de EN_LIVRAISON.
     */
    ECHEC_LIVRAISON,
    /** L'acheteur conteste : le versement reste gele jusqu'a arbitrage d'un admin. */
    LITIGE
}
