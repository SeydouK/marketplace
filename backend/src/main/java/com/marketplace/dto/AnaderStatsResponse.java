package com.marketplace.dto;

import java.math.BigDecimal;

public record AnaderStatsResponse(
    long rfidInseresMois,
    long rfidInseresTotal,
    long animauxSansRfid,
    BigDecimal remunerationEstimee
) {}