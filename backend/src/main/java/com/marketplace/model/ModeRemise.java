package com.marketplace.model;

/** Comment l'animal rejoint l'acheteur. Le code de remise s'applique aux deux. */
public enum ModeRemise {
    /** L'acheteur (ou son mandataire) vient chercher l'animal chez le vendeur. */
    RETRAIT_SUR_PLACE,
    /** L'animal est acheminé par le vendeur ou un transporteur. */
    TRANSPORT
}
