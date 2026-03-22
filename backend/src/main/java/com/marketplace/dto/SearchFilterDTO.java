package com.marketplace.dto;

import com.marketplace.model.ListingStatus;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class SearchFilterDTO {
    private String location;
    private String animalType;
    private ListingStatus status;
    private BigDecimal minPrice;
    private BigDecimal maxPrice;
}
