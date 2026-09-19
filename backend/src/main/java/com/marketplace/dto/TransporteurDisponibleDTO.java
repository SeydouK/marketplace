package com.marketplace.dto;

import com.marketplace.model.TypeVehicule;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Un transporteur tel que le vendeur le voit avant de lui proposer une course.
 *
 * Volontairement sommaire : le vendeur choisit un vehicule et un numero, il n'a
 * pas a consulter le dossier KYC de quelqu'un — la plateforme l'a deja valide,
 * c'est tout ce qu'il a besoin de savoir.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransporteurDisponibleDTO {
    private Long id;
    private String nom;
    private String telephone;
    private TypeVehicule typeVehicule;
    private Integer capaciteTetes;
}
