-- ─────────────────────────────────────────────────────────
-- V3.0.2 : autoriser le statut EN_ATTENTE sur animal
-- Aligne la contrainte chk_animal_status sur l'enum Java
-- AnimalStatus (EN_ATTENTE, DISPONIBLE, INDISPONIBLE, VENDU).
-- ─────────────────────────────────────────────────────────

ALTER TABLE animal
    DROP CONSTRAINT IF EXISTS chk_animal_status;

ALTER TABLE animal
    ADD CONSTRAINT chk_animal_status
        CHECK (statut IN ('EN_ATTENTE', 'DISPONIBLE', 'INDISPONIBLE', 'VENDU'));
