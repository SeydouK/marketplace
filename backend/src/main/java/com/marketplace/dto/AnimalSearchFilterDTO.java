package com.marketplace.dto;

import com.marketplace.model.AnimalStatus;
import com.marketplace.model.AnimalType;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class AnimalSearchFilterDTO {
    private String location;
    private AnimalType type;
    private AnimalStatus status;
    private BigDecimal minPrice;
    private BigDecimal maxPrice;
}
