package com.marketplace.dto;

import com.marketplace.model.StatutLivraison;
import com.marketplace.model.Transporteur;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
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

    /**
     * Code a communiquer a celui qui remet l'animal.
     *
     * Present uniquement dans la vue acheteur, et efface une fois l'animal recu.
     * Ne doit jamais figurer dans une reponse destinee au vendeur.
     */
    private String codeRemise;

    /** Identifiant de la remise — sert a ouvrir le suivi et le choix d'adresse. */
    private Long remiseId;
    private com.marketplace.model.ModeRemise modeRemise;

    /** Frise de suivi, du plus ancien au plus recent. */
    private List<EvenementLivraisonDTO> evenements;
}
