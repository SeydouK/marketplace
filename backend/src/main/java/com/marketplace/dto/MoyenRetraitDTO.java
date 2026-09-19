package com.marketplace.dto;

import com.marketplace.model.OperateurPayout;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/** Destination de retrait declaree par un vendeur. */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MoyenRetraitDTO {
    private OperateurPayout operateur;
    private String numero;
    private String operateurLibelle;

    /** La destination est-elle renseignee ? */
    private boolean complet;

    /**
     * La plateforme peut-elle envoyer de l'argent aujourd'hui ?
     *
     * Faux tant que le wallet marchand n'est pas configure. Distinct de
     * {@link #complet} a dessein : l'un dit ce qui manque au vendeur, l'autre ce
     * qui manque a la plateforme, et confondre les deux ferait accuser le vendeur
     * d'un defaut qui n'est pas le sien.
     */
    private boolean retraitsOuverts;
}
