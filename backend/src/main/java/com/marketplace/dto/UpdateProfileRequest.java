package com.marketplace.dto;

import jakarta.validation.constraints.NotBlank;

/** Corps de PATCH /api/users/me — mise à jour du profil courant. */
public record UpdateProfileRequest(@NotBlank String name) {
}
