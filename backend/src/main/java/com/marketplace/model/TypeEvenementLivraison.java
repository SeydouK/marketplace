package com.marketplace.model;

/**
 * Vocabulaire du journal de livraison.
 *
 * Volontairement plus large que les états : un événement note ce qui s'est passé,
 * y compris quand cela ne fait pas changer d'état (tentative de code refusée,
 * relance envoyée, position reçue).
 */
public enum TypeEvenementLivraison {
    PAIEMENT_CONFIRME,
    CODE_GENERE,
    CODE_ENVOYE,
    ANIMAL_PRET,
    PRIS_EN_CHARGE,
    POSITION,
    CODE_REFUSE,
    CODE_VALIDE,
    ECHEC_LIVRAISON,
    LITIGE_OUVERT,
    LITIGE_ARBITRE,
    FONDS_LIBERES
}
