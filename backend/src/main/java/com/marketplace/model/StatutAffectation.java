package com.marketplace.model;

/**
 * Ou en est la proposition de course faite a un transporteur.
 *
 * Le vendeur propose, le transporteur repond. Sans cette etape, un vendeur
 * pourrait assigner une course de 400 km un dimanche soir sans demander, et la
 * livraison s'enliserait sans que personne ne sache pourquoi.
 */
public enum StatutAffectation {
    /** Proposee, en attente de reponse. Le transporteur reste disponible. */
    PROPOSEE,
    /** Prise en charge : le transporteur n'est plus disponible. */
    ACCEPTEE,
    /** Decline — la place se libere aussitot. */
    REFUSEE,
    /** Le vendeur a retire sa proposition. */
    ANNULEE
}
