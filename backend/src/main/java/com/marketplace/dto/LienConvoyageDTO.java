package com.marketplace.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/** Ce que le vendeur obtient après avoir confié un convoyage. */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LienConvoyageDTO {

    /** Lien à ouvrir par le convoyeur. Affiché aussi à l'écran, pour un repli par SMS ou dictée. */
    private String lien;

    /**
     * Lien « click-to-chat » ouvrant WhatsApp avec le message prérempli.
     * Le vendeur reste maître de l'envoi : rien ne part sans qu'il appuie.
     */
    private String lienWhatsApp;

    private String transporteurTelephone;
    private String transporteurNom;
    private LocalDateTime expireLe;
}
