package com.marketplace.model;

/** Par quel canal l'événement est entré dans le système. */
public enum SourceEvenement {
    /** Action d'un utilisateur dans l'application. */
    APP,
    /** Notification d'un transporteur externe. */
    WEBHOOK,
    /** Traitement automatique (libération par délai, relance). */
    SCHEDULER,
    /** Intervention d'un administrateur. */
    ADMIN
}
