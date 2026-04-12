package com.marketplace.dto;

public record CniVerificationResult(
    boolean estCni,  // true si c'est bien une CNI
    String confiance,          // "haute", "moyenne" ou "faible"
    String username,                // Nom extrait de la CNI (peut être null)
    String name,             // Prénom extrait
    String numero,             // Numéro de CNI extrait
    String raison              // Explication de la décision
) {}