package com.marketplace.model;

/**
 * Destination d'un versement vendeur, cote GeniusPay.
 *
 * L'API de payout exige un {@code destination.provider} : sans lui, la demande
 * est rejetee. Or un numero de telephone ne dit pas son operateur — un +225 07
 * peut etre servi par Orange comme par Wave. C'est donc au vendeur de le
 * declarer, et c'est ce que cette enumeration transporte.
 *
 * Le nom de la constante est le notre, {@link #getProvider()} est celui de
 * GeniusPay : les deux ne coincident pas (ORANGE_MONEY / « orange_money ») et
 * les separer evite qu'un renommage cote operateur oblige a migrer la base.
 */
public enum OperateurPayout {
    WAVE("wave", "Wave"),
    ORANGE_MONEY("orange_money", "Orange Money"),
    MTN("mtn", "MTN MoMo"),
    MOOV("moov", "Moov Money");

    private final String provider;
    private final String libelle;

    OperateurPayout(String provider, String libelle) {
        this.provider = provider;
        this.libelle = libelle;
    }

    /** Valeur attendue par le champ {@code destination.provider} de GeniusPay. */
    public String getProvider() {
        return provider;
    }

    public String getLibelle() {
        return libelle;
    }
}
