package com.marketplace.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AnimalStatsDTO {
    private long total;
    /** DISPONIBLE : fiche validee et en vente. */
    private long available;
    /** INDISPONIBLE : retiree de la vente par le vendeur, ou rejetee. */
    private long unavailable;
    /** EN_ATTENTE : en attente de validation sanitaire. */
    private long pending;
    /** RESERVE : verrouille par une commande en cours de paiement. */
    private long reserved;
    /** VENDU : commande payee. */
    private long sold;
}
