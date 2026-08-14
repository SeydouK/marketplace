-- ─────────────────────────────────────────────────────────────────────────────
-- Migration : Création de la table versements (paiement des vendeurs via GeniusPay)
-- Chemin   : flyway/schema/V3_0/V3_0_13__create_versements_table.sql
-- ─────────────────────────────────────────────────────────────────────────────

-- Un versement = la part due a un vendeur pour sa participation a une commande
-- payee. Une commande multi-vendeurs genere plusieurs versements (un par vendeur).
CREATE TABLE versements (
    id                              BIGSERIAL PRIMARY KEY,
    commande_id                     BIGINT NOT NULL,
    commande_reference              VARCHAR(255),

    vendeur_id                      BIGINT NOT NULL,
    vendeur_nom                     VARCHAR(255),
    vendeur_telephone               VARCHAR(20),

    montant_brut                    DECIMAL(15, 2) NOT NULL,
    frais_geniuspay_alloue          DECIMAL(15, 2) NOT NULL,
    commission_plateforme_alloue    DECIMAL(15, 2) NOT NULL,
    montant_net                     DECIMAL(15, 2) NOT NULL,

    statut                          VARCHAR(20) NOT NULL DEFAULT 'EN_ATTENTE',
    reference                       VARCHAR(255) UNIQUE,

    created_at                      TIMESTAMP NOT NULL DEFAULT NOW(),
    envoye_at                       TIMESTAMP,

    CONSTRAINT fk_versement_commande FOREIGN KEY (commande_id) REFERENCES commandes(id) ON DELETE CASCADE,
    CONSTRAINT fk_versement_vendeur  FOREIGN KEY (vendeur_id)  REFERENCES users(id)      ON DELETE CASCADE
);

CREATE INDEX idx_versement_commande  ON versements(commande_id);
CREATE INDEX idx_versement_vendeur   ON versements(vendeur_id);
CREATE INDEX idx_versement_statut    ON versements(statut);
CREATE INDEX idx_versement_reference ON versements(reference);
