package com.marketplace.dto;

import com.marketplace.model.AnimalStatus;
import com.marketplace.model.AnimalType;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

public record AdminListingDTO(
        UUID id,
        String displayName,
        AnimalType type,
        String race,
        String lieuNaissance,
        BigDecimal price,
        Integer quantity,
        AnimalStatus status,
        List<String> photos,
        Long sellerId,
        String sellerName,
        String sellerEmail,
        Instant createdAt,
        Instant updatedAt
) {
}
