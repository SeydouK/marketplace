package com.marketplace.dto;

import com.marketplace.model.AnimalType;

import java.time.Instant;
import java.util.UUID;

public record AnimalSansRfidResponse(
    UUID id,
    String qrCode,
    AnimalType type,
    String race,
    String region,
    String ville,
    Double latitude,
    Double longitude,
    String[] photos,
    OwnerSummary owner,
    Instant createdAt
) {
    public record OwnerSummary(
        Long id,
        String name,
        String phone
    ) {}
}