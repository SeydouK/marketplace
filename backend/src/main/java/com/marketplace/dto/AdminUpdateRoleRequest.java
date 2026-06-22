package com.marketplace.dto;

import com.marketplace.model.Role;
import jakarta.validation.constraints.NotNull;

public record AdminUpdateRoleRequest(@NotNull Role role) {
}
