package com.marketplace.dto;

import com.marketplace.model.StatutVersement;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record AdminVersementDTO(
        Long id,
        Long commandeId,
        String commandeReference,
        Long vendeurId,
        String vendeurNom,
        String vendeurTelephone,
        BigDecimal montantBrut,
        BigDecimal fraisGeniusPayAlloue,
        BigDecimal commissionPlateformeAlloue,
        BigDecimal montantNet,
        StatutVersement statut,
        String reference,
        LocalDateTime createdAt,
        LocalDateTime envoyeAt
) {
}
