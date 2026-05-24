-- ─────────────────────────────────────────────────────────
-- V3 : RFID + localisation + owner sur animal + phone sur users
-- ─────────────────────────────────────────────────────────

-- 1. Puce RFID
ALTER TABLE animal
    ADD COLUMN IF NOT EXISTS rfid_tag VARCHAR(50) UNIQUE;

-- 2. Localisation textuelle
ALTER TABLE animal
    ADD COLUMN IF NOT EXISTS region VARCHAR(100),
    ADD COLUMN IF NOT EXISTS ville  VARCHAR(100);

-- 3. Vendeur propriétaire (BIGINT — users.id est IDENTITY)
ALTER TABLE animal
    ADD COLUMN IF NOT EXISTS owner_id BIGINT
        REFERENCES users(id) ON DELETE SET NULL;

-- 4. Horodatage insertion RFID
ALTER TABLE animal
    ADD COLUMN IF NOT EXISTS rfid_inserted_at TIMESTAMPTZ;

-- 5. Agent ANADER qui a inséré la puce
ALTER TABLE animal
    ADD COLUMN IF NOT EXISTS rfid_inserted_by BIGINT
        REFERENCES users(id) ON DELETE SET NULL;

-- 6. Numéro de téléphone sur users
ALTER TABLE users
    ADD COLUMN IF NOT EXISTS phone VARCHAR(20);

-- 7. Index
CREATE INDEX IF NOT EXISTS idx_animal_rfid_tag     ON animal(rfid_tag);
CREATE INDEX IF NOT EXISTS idx_animal_region        ON animal(region);
CREATE INDEX IF NOT EXISTS idx_animal_owner         ON animal(owner_id);
CREATE INDEX IF NOT EXISTS idx_animal_rfid_inserted ON animal(rfid_inserted_by);