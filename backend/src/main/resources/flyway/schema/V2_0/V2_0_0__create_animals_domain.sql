CREATE TABLE animal (
    id UUID PRIMARY KEY,
    qr_code VARCHAR(100) NOT NULL UNIQUE,
    type VARCHAR(20) NOT NULL,
    race VARCHAR(100),
    lieu_naissance VARCHAR(200),
    price NUMERIC(12, 2) NOT NULL,
    photos TEXT[],
    videos TEXT[],
    nombre INTEGER NOT NULL DEFAULT 1,
    longitude DOUBLE PRECISION,
    latitude DOUBLE PRECISION,
    statut VARCHAR(20) NOT NULL DEFAULT 'INDISPONIBLE',
    date_creation TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    date_modification TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_animal_type CHECK (type IN ('BOVIN', 'OVIN', 'CAPRIN', 'PORCIN', 'AUTRE')),
    CONSTRAINT chk_animal_status CHECK (statut IN ('DISPONIBLE', 'INDISPONIBLE', 'VENDU')),
    CONSTRAINT chk_animal_nombre CHECK (nombre >= 1)
);

CREATE TABLE animal_vendeur (
    id UUID PRIMARY KEY,
    animal_id UUID NOT NULL REFERENCES animal(id) ON DELETE CASCADE,
    vendeur_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    date_association TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_animal_vendeur_animal UNIQUE (animal_id)
);

CREATE TABLE fiche_sanitaire_animal (
    id UUID PRIMARY KEY,
    animal_id UUID NOT NULL REFERENCES animal(id) ON DELETE CASCADE,
    url_document TEXT NOT NULL,
    type_document VARCHAR(40) NOT NULL,
    valide_par BIGINT REFERENCES users(id) ON DELETE SET NULL,
    statut_validation VARCHAR(20) NOT NULL DEFAULT 'EN_ATTENTE',
    date_upload TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    date_validation TIMESTAMPTZ,
    CONSTRAINT chk_type_document CHECK (
        type_document IN ('CERTIFICAT_VETERINAIRE', 'FICHE_VACCINATION', 'ATTESTATION_DSV', 'AUTRE')
    ),
    CONSTRAINT chk_statut_validation CHECK (
        statut_validation IN ('EN_ATTENTE', 'VALIDE', 'REJETE')
    )
);

CREATE TABLE historique (
    id UUID PRIMARY KEY,
    animal_id UUID NOT NULL REFERENCES animal(id) ON DELETE CASCADE,
    acteur_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type_evenement VARCHAR(40) NOT NULL,
    description TEXT,
    longitude DOUBLE PRECISION,
    latitude DOUBLE PRECISION,
    date_evenement TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    hash_blockchain VARCHAR(255),
    CONSTRAINT chk_type_evenement CHECK (
        type_evenement IN ('ENREGISTREMENT', 'VISITE_VETERINAIRE', 'CHANGEMENT_STATUT', 'VENTE', 'TRANSPORT', 'INSPECTION')
    )
);

CREATE INDEX idx_animal_status ON animal(statut);
CREATE INDEX idx_animal_type ON animal(type);
CREATE INDEX idx_animal_location ON animal(lieu_naissance);
CREATE INDEX idx_animal_vendeur_user ON animal_vendeur(vendeur_id);
CREATE INDEX idx_fiche_sanitaire_animal_animal ON fiche_sanitaire_animal(animal_id);
CREATE INDEX idx_fiche_sanitaire_validation ON fiche_sanitaire_animal(statut_validation);
CREATE INDEX idx_historique_animal ON historique(animal_id);
CREATE INDEX idx_historique_type ON historique(type_evenement);
