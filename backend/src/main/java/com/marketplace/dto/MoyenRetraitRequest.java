package com.marketplace.dto;

import com.marketplace.model.OperateurPayout;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

/** Declaration, par le vendeur, du compte a crediter lors d'un retrait. */
@Data
public class MoyenRetraitRequest {

    @NotNull(message = "Choisissez l'operateur qui doit recevoir vos fonds.")
    private OperateurPayout operateur;

    /**
     * Numero au format attendu par GeniusPay : indicatif compris.
     *
     * Le motif est volontairement large — espaces et tirets tolerés, longueur
     * ouverte : durcir davantage rejetterait des numeros valides d'operateurs
     * que la plateforme ne connait pas encore, et un numero mal forme est de
     * toute facon refuse par l'operateur, avec son propre message.
     */
    @NotNull(message = "Renseignez le numero a crediter.")
    @Pattern(regexp = "^[+]?[0-9 .-]{8,20}$",
             message = "Numero invalide : attendu par exemple +225 07 00 00 00 00.")
    private String numero;
}
