package com.marketplace.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PanierDTO {

    private Long id;
    private Long userId;
    private List<PanierItemDTO> items;
    private BigDecimal total;
    private int nombreArticles;
    private LocalDateTime updatedAt;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PanierItemDTO {
        private Long id;
        private UUID animalId;
        private String animalNom;
        private String animalRace;
        private BigDecimal prixUnitaire;
        private Integer quantite;
        private BigDecimal sousTotal;
        private Long vendeurId;
        private String vendeurNom;
        private String photoUrl;
        private String localisation;
        private LocalDateTime addedAt;
    }
}