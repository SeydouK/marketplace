package com.marketplace.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Ce que voit le convoyeur, et rien de plus.
 *
 * Aucun champ commercial n'y figure : ni prix de l'animal, ni montant du
 * versement, ni surtout le code de remise — que seul l'acheteur détient et lui
 * dira sur place. C'est ce qui empêche un convoyeur de valider une livraison qui
 * n'a pas eu lieu.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConvoyageDTO {

    private Long remiseId;
    private String transporteurNom;

    private List<String> animaux;
    /** Nécessaires pour la saisie du code à l'arrivée. */
    private List<Long> articleIds;

    /** Où charger : l'emplacement de l'animal chez le vendeur. */
    private String lieuChargement;

    private String adresseLigne;
    private String adresseVille;
    private String adresseIndications;
    private String destinataireNom;
    /** Le convoyeur doit pouvoir appeler en arrivant. */
    private String destinataireTelephone;
    private BigDecimal destinationLatitude;
    private BigDecimal destinationLongitude;

    private LocalDateTime departAt;
    private Long commandeId;
    private boolean termine;
}
