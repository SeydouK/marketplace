package com.marketplace.model;

/** Cycle de vie d'un remboursement, calque sur celui du versement. */
public enum StatutRemboursement {
    /** Du a l'acheteur, en attente de reglement par un administrateur. */
    EN_ATTENTE,
    /** Envoi initie mais pas encore confirme. */
    EN_COURS,
    /** L'acheteur a recu l'argent. */
    CONFIRME,
    ECHOUE
}
