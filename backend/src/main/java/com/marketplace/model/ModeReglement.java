package com.marketplace.model;

/**
 * Par quel canal l'argent est sorti de la plateforme.
 *
 * MANUEL n'est pas un pis-aller temporaire a masquer : tant que GeniusPay
 * n'expose pas de quoi verser, c'est le seul chemin reel. Le tracer explicitement
 * permet de rapprocher les sorties d'argent des transactions Mobile Money
 * correspondantes.
 */
public enum ModeReglement {
    GENIUSPAY,
    MANUEL
}
