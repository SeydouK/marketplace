package com.marketplace.dto;

import com.marketplace.model.KycStatus;
import com.marketplace.model.Role;

import java.time.Instant;

public record SellerRequestDTO(
        Long id,
        String name,
        String surname,
        String email,
        Role role,
        boolean emailVerified,
        KycStatus kycStatus,
        boolean devenirVendeur,
        Instant createdAt,
        Instant updatedAt
) {
}
