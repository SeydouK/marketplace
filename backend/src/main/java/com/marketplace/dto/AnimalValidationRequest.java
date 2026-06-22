package com.marketplace.dto;

import com.marketplace.model.HealthDocumentType;
import com.marketplace.model.HealthValidationStatus;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;

@Data
public class AnimalValidationRequest {

    private UUID healthRecordId;

    private String documentUrl;

    private HealthDocumentType documentType;

    @NotNull
    private HealthValidationStatus validationStatus;

    @NotBlank
    private String visitResult;

    @DecimalMin(value = "-180.0")
    @DecimalMax(value = "180.0")
    private Double longitude;

    @DecimalMin(value = "-90.0")
    @DecimalMax(value = "90.0")
    private Double latitude;
}
