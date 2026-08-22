package com.marketplace.model;

public enum Role {
    VENDEUR,       // éleveur/propriétaire qui vend
    ACHETEUR,      // acheteur (peut aussi être VENDEUR)
    VETERINAIRE,   // agent de santé animale
    ANADER,        // agent de contrôle ANADER
    TRANSPORTEUR,  // convoyeur d'animaux, valide par KYC + permis de conduire
    ADMIN          // administrateur plateforme
}