package com.marketplace.dto;

import com.marketplace.model.HealthDocumentType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AnimalHealthDocumentInput {

    @NotBlank
    private String documentUrl;

    @NotNull
    private HealthDocumentType documentType;
}
