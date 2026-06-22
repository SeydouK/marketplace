-- ─────────────────────────────────────────────────────────
-- V3.0.6 : autoriser le type AVICOLE sur animal
-- Aligne la contrainte chk_animal_type sur l'enum Java
-- AnimalType (BOVIN, OVIN, CAPRIN, PORCIN, AVICOLE, AUTRE)
-- et sur le filtre « Volailles » du frontend.
-- ─────────────────────────────────────────────────────────

ALTER TABLE animal
    DROP CONSTRAINT IF EXISTS chk_animal_type;

ALTER TABLE animal
    ADD CONSTRAINT chk_animal_type
        CHECK (type IN ('BOVIN', 'OVIN', 'CAPRIN', 'PORCIN', 'AVICOLE', 'AUTRE'));
