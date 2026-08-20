-- ─────────────────────────────────────────────────────────────────────────────
-- Migration : Création des tables commandes (paiement GeniusPay)
-- Chemin   : flyway/schema/V3_0/V3_0_12__create_commandes_tables.sql
-- ─────────────────────────────────────────────────────────────────────────────

-- Table principale des commandes (une commande = une tentative de paiement)
CREATE TABLE commandes (
    id              BIGSERIAL PRIMARY KEY,
    user_id         BIGINT NOT NULL,
    reference       VARCHAR(255) UNIQUE,
    checkout_url    TEXT,
    montant                 DECIMAL(15, 2) NOT NULL,
    -- Snapshot des frais/commission au moment du paiement (independants d'une evolution future des taux)
    frais_geniuspay         DECIMAL(15, 2) NOT NULL,
    commission_plateforme   DECIMAL(15, 2) NOT NULL,
    montant_net_vendeur     DECIMAL(15, 2) NOT NULL,
    statut          VARCHAR(20) NOT NULL DEFAULT 'EN_ATTENTE',
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    paid_at         TIMESTAMP,

    CONSTRAINT fk_commande_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Articles de la commande (snapshot au moment du paiement)
CREATE TABLE commande_items (
    id              BIGSERIAL PRIMARY KEY,
    commande_id     BIGINT NOT NULL,
    animal_id       UUID   NOT NULL,

    animal_nom      VARCHAR(255) NOT NULL,
    animal_race     VARCHAR(100),
    prix_unitaire   DECIMAL(15, 2) NOT NULL,
    quantite        INTEGER NOT NULL DEFAULT 1 CHECK (quantite > 0),

    vendeur_id      BIGINT,
    vendeur_nom     VARCHAR(255),
    photo_url       TEXT,
    localisation    VARCHAR(255),

    CONSTRAINT fk_item_commande FOREIGN KEY (commande_id) REFERENCES commandes(id) ON DELETE CASCADE,
    CONSTRAINT fk_item_animal   FOREIGN KEY (animal_id)   REFERENCES animal(id)     ON DELETE CASCADE
);

CREATE INDEX idx_commande_user_id        ON commandes(user_id);
CREATE INDEX idx_commande_reference      ON commandes(reference);
CREATE INDEX idx_commande_item_commande  ON commande_items(commande_id);
