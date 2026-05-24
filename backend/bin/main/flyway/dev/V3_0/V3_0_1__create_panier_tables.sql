-- ─────────────────────────────────────────────────────────────────────────────
-- Migration : Création des tables panier
-- Chemin   : flyway/dev/V3_0/V3_0_1__create_panier_tables.sql
-- ─────────────────────────────────────────────────────────────────────────────

-- Table principale du panier (un panier par utilisateur)
CREATE TABLE paniers (
    id          BIGSERIAL PRIMARY KEY,
    user_id     BIGINT NOT NULL UNIQUE,
    created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_panier_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Articles du panier
-- animal_id est un UUID (cohérent avec Animal.id = GenerationType.UUID)
CREATE TABLE panier_items (
    id              BIGSERIAL PRIMARY KEY,
    panier_id       BIGINT NOT NULL,
    animal_id       UUID   NOT NULL,

    -- Snapshot des données au moment de l'ajout
    animal_nom      VARCHAR(255) NOT NULL,
    animal_race     VARCHAR(100),
    prix_unitaire   DECIMAL(15, 2) NOT NULL,
    quantite        INTEGER NOT NULL DEFAULT 1 CHECK (quantite > 0),

    -- Infos vendeur (snapshot)
    vendeur_id      BIGINT,
    vendeur_nom     VARCHAR(255),
    photo_url       TEXT,
    localisation    VARCHAR(255),

    added_at        TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_item_panier FOREIGN KEY (panier_id) REFERENCES paniers(id)  ON DELETE CASCADE,
    CONSTRAINT fk_item_animal FOREIGN KEY (animal_id) REFERENCES animal(id)   ON DELETE CASCADE,
    CONSTRAINT uq_panier_animal UNIQUE (panier_id, animal_id)
);

-- Index pour les requêtes fréquentes
CREATE INDEX idx_panier_user_id      ON paniers(user_id);
CREATE INDEX idx_panier_item_panier  ON panier_items(panier_id);
CREATE INDEX idx_panier_item_animal  ON panier_items(animal_id);
CREATE INDEX idx_panier_item_vendeur ON panier_items(vendeur_id);