package com.marketplace.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/** Un point du trace, tel qu'affiche sur la carte. */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PointTraceDTO {
    private BigDecimal latitude;
    private BigDecimal longitude;
    private LocalDateTime le;
}
