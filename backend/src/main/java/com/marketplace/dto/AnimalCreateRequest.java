package com.marketplace.dto;

import com.marketplace.model.AnimalType;
import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Data
public class AnimalCreateRequest {

    @NotNull
    private AnimalType type;

    private String race;

    private String lieuNaissance;

    @NotNull
    @DecimalMin(value = "1.0", inclusive = true)
    private BigDecimal price;

    private List<String> photos = new ArrayList<>();

    private List<String> videos = new ArrayList<>();

    @NotNull
    @Min(1)
    private Integer quantity = 1;

    @DecimalMin(value = "0.1")
    private BigDecimal animalPoids;

    @DecimalMin(value = "-180.0")
    @DecimalMax(value = "180.0")
    private Double longitude;

    @DecimalMin(value = "-90.0")
    @DecimalMax(value = "90.0")
    private Double latitude;

    @Valid
    private List<AnimalHealthDocumentInput> healthDocuments = new ArrayList<>();
}
