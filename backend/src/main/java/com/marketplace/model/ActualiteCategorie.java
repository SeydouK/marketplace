package com.marketplace.model;

/**
 * Rubrique d'une actualite.
 *
 * Volontairement ferme : le lecteur filtre par rubrique depuis une barre
 * d'onglets, et une liste libre transformerait cette barre en inventaire
 * ingerable des le dixieme article. Ajouter une rubrique se fait ici et dans
 * le libelle correspondant cote front — c'est le prix a payer pour que la
 * navigation reste lisible.
 */
public enum ActualiteCategorie {
    SANTE_ANIMALE,
    ELEVAGE,
    MARCHE,
    REGLEMENTATION,
    CONSEIL
}
