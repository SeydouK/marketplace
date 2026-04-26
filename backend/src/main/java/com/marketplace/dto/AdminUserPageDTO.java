package com.marketplace.dto;

import java.util.List;

public record AdminUserPageDTO(
        List<AdminUserDTO> content,
        long totalElements,
        int totalPages,
        int number
) {
}
