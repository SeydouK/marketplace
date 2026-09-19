package com.marketplace.dto;

import com.marketplace.model.ModeRemise;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Ce que l'acheteur voit pendant que son animal est en route.
 *
 * Volontairement séparé de « Mes achats » : cette vue est rafraîchie toutes les
 * quelques secondes pendant une livraison, et n'a pas besoin de recharger tout
 * l'historique de commandes à chaque fois.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SuiviLivraisonDTO {

    private Long remiseId;
    private Long commandeId;
    private ModeRemise modeRemise;

    private String vendeurNom;
    private String vendeurTelephone;
    private List<String> animaux;
    /** Identifiants des articles — necessaires pour valider la remise depuis le suivi. */
    private List<Long> articleIds;

    /** Où l'animal est attendu. Null en retrait sur place. */
    private String adresseLigne;
    private String adresseVille;
    private String adresseIndications;
    /**
     * Qui receptionne. Renvoye pour que l'acheteur retrouve sa saisie au
     * rechargement, et pour que le livreur sache qui demander sur place.
     */
    private String destinataireNom;
    private String destinataireTelephone;
    private BigDecimal destinationLatitude;
    private BigDecimal destinationLongitude;

    /** Où se trouve le livreur, si la position est récente. */
    private BigDecimal livreurLatitude;
    private BigDecimal livreurLongitude;
    private LocalDateTime livreurPositionAt;

    /** La position est-elle assez fraîche pour être affichée sur la carte ? */
    private boolean positionDisponible;

    /** Distance à vol d'oiseau, en kilomètres. Approximation assumée. */
    private BigDecimal distanceKm;

    private LocalDateTime departAt;
    private String etat;
    private String etatLibelle;

    /** A quel titre celui qui consulte regarde : ACHETEUR, VENDEUR ou TRANSPORTEUR. */
    private String roleObservateur;

    /**
     * Celui qui consulte est-il le livreur ?
     *
     * Determine cote serveur : un transporteur ayant accepte conduit a la place
     * du vendeur. Sans cette distinction, le vendeur verrait un bouton « Je pars »
     * sur une course qu'il ne fait pas.
     */
    private boolean estLeLivreur;

    /** Nom du transporteur, quand la course lui a ete confiee. */
    private String transporteurNom;
}
