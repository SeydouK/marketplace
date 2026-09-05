package com.marketplace.dto;

import com.marketplace.model.StatutAffectation;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Une course, vue par le transporteur.
 *
 * Meme frontiere que le lien de convoyage : ni prix de l'animal, ni montant du
 * versement, ni code de remise. Il transporte, il ne negocie pas — et le code,
 * c'est l'acheteur qui le lui dira sur place.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseTransporteurDTO {

    private Long remiseId;
    private Long commandeId;
    private StatutAffectation statut;
    private LocalDateTime proposeeLe;

    private List<String> animaux;
    /** Necessaires pour la saisie du code a l'arrivee. */
    private List<Long> articleIds;

    /** Ou charger, et aupres de qui. */
    private String lieuChargement;
    private String vendeurNom;
    private String vendeurTelephone;

    private String adresseLigne;
    private String adresseVille;
    private String adresseIndications;
    private String destinataireNom;
    /** Le transporteur doit pouvoir appeler en arrivant. */
    private String destinataireTelephone;
    private BigDecimal destinationLatitude;
    private BigDecimal destinationLongitude;

    private LocalDateTime departAt;
    private boolean termine;
}
