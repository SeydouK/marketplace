package com.marketplace.dto;

import com.marketplace.model.StatutLivraison;
import com.marketplace.model.StatutVersement;
import com.marketplace.model.Transporteur;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

/**
 * Une vente, vue par le vendeur : un animal vendu, l'etat de sa remise et le
 * sort de l'argent correspondant.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MaVenteDTO {

    private Long itemId;
    private Long commandeId;
    private String commandeReference;

    private UUID animalId;
    private String animalNom;
    private String animalRace;
    private String photoUrl;

    private String acheteurNom;
    private LocalDateTime paidAt;

    /** Prix de vente affiche a l'acheteur. */
    private BigDecimal montantBrut;
    /**
     * Ce que le vendeur touchera pour cet article, frais et commission deduits
     * au prorata. Null si le versement n'a pas pu etre calcule.
     */
    private BigDecimal montantNet;

    private StatutLivraison statutLivraison;
    private Transporteur transporteur;
    private String trackingReference;
    private LocalDateTime remisAt;
    private LocalDateTime livreAt;
    private LocalDateTime receptionneAt;
    private String litigeMotif;

    /** Etat de l'argent pour la commande dont cet article fait partie. */
    private StatutVersement statutVersement;
    private LocalDateTime versementLibereAt;
    private LocalDateTime versementEnvoyeAt;

    private String etatGlobal;
    private String etatLibelle;

    /** Le vendeur peut-il declarer une prise en charge / un depot maintenant ? */
    private boolean remisable;
    private boolean depotDeclarable;

    /** Identifiant de la remise — sert a ouvrir l'ecran livreur. */
    private Long remiseId;
    private com.marketplace.model.ModeRemise modeRemise;

    /**
     * Un transporteur conduit-il a la place du vendeur ?
     *
     * Change ce que le vendeur doit voir : quand il conduit lui-meme il lui faut
     * l'ecran de navigation, avec « Je pars » et le partage de position. Quand un
     * tiers conduit, il n'a rien a piloter — il a besoin de regarder.
     */
    private boolean livreParTransporteur;
    private String transporteurNom;

    /** Frise de suivi, du plus ancien au plus recent. */
    private List<EvenementLivraisonDTO> evenements;
}
