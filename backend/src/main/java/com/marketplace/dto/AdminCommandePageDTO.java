package com.marketplace.dto;

import java.util.List;

public record AdminCommandePageDTO(
        List<AdminCommandeDTO> content,
        long totalElements,
        int totalPages,
        int number
) {
}
