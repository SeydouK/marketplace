package com.marketplace.dto;

import com.marketplace.model.StatutCommande;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommandeDTO {

    private Long id;
    private StatutCommande statut;
    private BigDecimal montant;
    private String checkoutUrl;
    private LocalDateTime createdAt;
    private LocalDateTime paidAt;
}
