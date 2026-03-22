package com.marketplace.dto;

import com.marketplace.model.ListingStatus;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ListingDTO {
    private Long id;
    private Long userId;
    private String ownerName;

    @NotBlank
    private String title;

    private String description;

    @NotBlank
    private String animalType;

    @NotNull
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal price;

    @NotBlank
    private String location;

    private String sellerName;

    @NotBlank
    private String sellerPhone;

    private String image;
    private BigDecimal rating;
    private Integer ageMonths;
    private String breed;
    private ListingStatus status = ListingStatus.DISPONIBLE;
}
