package com.marketplace.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

/** Corps des requetes du parcours « mot de passe oublie ». */
public final class MotDePasseRequests {

    private MotDePasseRequests() {
    }

    public record Demande(@NotBlank @Email String email) {
    }

    /** Le jeton voyage dans un corps POST, jamais dans une URL d'API journalisee. */
    public record Verification(@NotBlank String jeton) {
    }

    public record Reinitialisation(@NotBlank String jeton, @NotBlank String motDePasse) {
    }
}
