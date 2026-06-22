package com.marketplace.model;

public enum Role {
    VENDEUR,       // éleveur/propriétaire qui vend
    ACHETEUR,      // acheteur (peut aussi être VENDEUR)
    VETERINAIRE,   // agent de santé animale
    ANADER,        // agent de contrôle ANADER
    ADMIN          // administrateur plateforme
}