package com.marketplace.dto;

import com.marketplace.model.StatutLivraison;
import com.marketplace.model.Transporteur;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

/** Un animal d'une commande, vu par l'acheteur, avec l'etat de sa remise. */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MonAchatItemDTO {

    private Long id;
    private UUID animalId;
    private String animalNom;
    private String animalRace;
    private String photoUrl;
    private String localisation;
    private BigDecimal prixUnitaire;
    private Integer quantite;
    private BigDecimal sousTotal;

    private Long vendeurId;
    private String vendeurNom;

    private StatutLivraison statutLivraison;
    private Transporteur transporteur;
    private String trackingReference;
    private LocalDateTime remisAt;
    private LocalDateTime livreAt;
    private LocalDateTime receptionneAt;
    private String litigeMotif;

    /** L'acheteur peut-il confirmer la reception maintenant ? */
    private boolean confirmable;
    /** Un litige est-il encore ouvrable sur cet article ? */
    private boolean litigeOuvrable;
    /**
     * Date a laquelle le versement se liberera sans confirmation de l'acheteur.
     * Null tant que l'article n'est pas LIVRE.
     */
    private LocalDateTime liberationAutomatiqueLe;
}
