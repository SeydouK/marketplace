package com.marketplace.dto;

import com.marketplace.model.KycStatus;
import com.marketplace.model.TypeVehicule;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/** L'etat du dossier d'un transporteur, pour lui-meme comme pour l'administration. */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransporteurDossierDTO {

    private Long id;
    private String nom;
    private String email;
    private String telephone;

    private KycStatus kycStatus;
    private String permisUrl;
    private boolean permisValide;
    private LocalDateTime permisValideAt;

    private TypeVehicule typeVehicule;
    private Integer capaciteTetes;

    /** Peut-il recevoir une course ? Identite verifiee ET permis valide. */
    private boolean habilite;

    /** Ce qui lui manque, formule pour lui. Null quand le dossier est complet. */
    private String prochaineEtape;
}
