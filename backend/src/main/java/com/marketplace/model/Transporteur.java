package com.marketplace.model;

/**
 * Canal d'acheminement d'un animal.
 *
 * MANUEL couvre le cas actuel : le vendeur remet l'animal de la main a la main et
 * declare lui-meme les etapes. YANGO est reserve a l'integration a venir, ou les
 * transitions EN_LIVRAISON / LIVRE seront alimentees par le transporteur.
 */
public enum Transporteur {
    MANUEL,
    YANGO
}
