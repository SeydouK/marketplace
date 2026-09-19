package com.marketplace.dto;

import java.util.List;

public record AdminVersementPageDTO(
        List<AdminVersementDTO> content,
        long totalElements,
        int totalPages,
        int number
) {
}
