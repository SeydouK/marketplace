package com.marketplace.dto;

import com.marketplace.model.AuteurEvenement;
import com.marketplace.model.TypeEvenementLivraison;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Une ligne de la frise de suivi.
 *
 * Le libellé est calculé côté serveur : la formulation dépend de qui regarde
 * (« vous avez confirmé » n'a pas le même sens pour l'acheteur et le vendeur),
 * et c'est une règle métier, pas une affaire de gabarit.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EvenementLivraisonDTO {

    private Long id;
    private TypeEvenementLivraison type;
    private String libelle;
    private AuteurEvenement auteurType;
    private String commentaire;
    private String photoUrl;
    private LocalDateTime date;
}
