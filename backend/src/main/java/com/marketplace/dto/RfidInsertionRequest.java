package com.marketplace.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record RfidInsertionRequest(

    /**
     * Numéro de la boucle auriculaire RFID.
     * Standard ISO 11784 : 15 chiffres numériques, ex : "982000123456789".
     * On accepte 8–20 caractères alphanumériques pour couvrir
     * les différents formats de boucles du marché ivoirien.
     */
    @NotBlank(message = "Le numéro RFID est obligatoire")
    @Pattern(
        regexp = "^[0-9A-Za-z]{8,20}$",
        message = "Format RFID invalide (8 à 20 caractères alphanumériques)"
    )
    String rfidTag

) {}