package com.marketplace.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AnimalStatsDTO {
    private long total;
    private long available;
    private long unavailable;
}
