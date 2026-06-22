package com.marketplace.dto;

import com.marketplace.model.HealthDocumentType;
import com.marketplace.model.HealthValidationStatus;
import lombok.Data;

import java.time.Instant;
import java.util.UUID;

@Data
public class AnimalHealthRecordDTO {
    private UUID id;
    private String documentUrl;
    private HealthDocumentType documentType;
    private HealthValidationStatus validationStatus;
    private Long validatedById;
    private String validatedByName;
    private Instant uploadedAt;
    private Instant validatedAt;
}
