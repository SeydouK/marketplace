package com.marketplace.dto;

public record AdminStatsDTO(
        long totalUsers,
        long pendingKyc,
        long activeListings,
        long openDisputes
) {
}
