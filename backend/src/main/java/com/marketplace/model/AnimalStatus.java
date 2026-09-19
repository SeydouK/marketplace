package com.marketplace.model;

public enum AnimalStatus {
    /** En attente de validation avant publication. */
    EN_ATTENTE,
    /** Publie et achetable. */
    DISPONIBLE,
    /**
     * Verrouille par une commande en attente de paiement.
     * Pose a la creation de la commande, relache si le paiement echoue ou expire.
     * Empeche deux acheteurs de commander le meme animal simultanement.
     */
    RESERVE,
    INDISPONIBLE,
    VENDU
}
