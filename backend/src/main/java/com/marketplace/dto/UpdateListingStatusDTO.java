package com.marketplace.dto;

import com.marketplace.model.AnimalStatus;
import jakarta.validation.constraints.NotNull;

public record UpdateListingStatusDTO(
        @NotNull AnimalStatus status
) {}