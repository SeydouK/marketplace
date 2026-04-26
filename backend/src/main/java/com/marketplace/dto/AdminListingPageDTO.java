package com.marketplace.dto;

import java.util.List;

public record AdminListingPageDTO(
        List<AdminListingDTO> content,
        long totalElements,
        int totalPages,
        int number
) {
}
