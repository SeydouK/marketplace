package com.marketplace.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import com.marketplace.model.Role;

@Data
@Getter
@Setter
public class RegisterRequest {

    @NotBlank
    private String surname;

    @NotBlank
    private String name;

    @Email
    @NotBlank
    private String email;

    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    /**
     * Numero au format international, indicatif compris.
     *
     * Facultatif pour un acheteur, exige d'un transporteur : c'est par la qu'on
     * le joint pendant une course, et le jour ou les payouts s'ouvriront, c'est
     * sa destination.
     */
    private String phone;

    /**
     * Role demande a l'inscription.
     *
     * Limite volontairement a ACHETEUR et TRANSPORTEUR : laisser passer une
     * valeur libre permettrait de s'inscrire administrateur.
     */
    private Role role;
}
