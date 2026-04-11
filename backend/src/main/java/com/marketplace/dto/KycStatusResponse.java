package com.marketplace.dto;

import com.marketplace.model.KycStatus;

public record KycStatusResponse(
    KycStatus kycStatus,
    boolean emailVerified,
    boolean badgeVerifie,
    String message
) {}