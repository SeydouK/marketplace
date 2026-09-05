package com.marketplace.model;

public enum StatutVersement {
    /** Encaisse, mais pas encore du : l'animal n'est pas confirme recu par l'acheteur. */
    BLOQUE,
    /** Liberable : reception confirmee ou delai ecoule, en attente d'envoi par l'admin. */
    EN_ATTENTE,
    EN_COURS,
    CONFIRME,
    ECHOUE
}
