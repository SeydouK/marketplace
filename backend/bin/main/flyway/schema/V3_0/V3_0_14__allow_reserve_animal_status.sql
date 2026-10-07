-- ─────────────────────────────────────────────────────────
-- V3.0.14 : autoriser le statut RESERVE sur animal
--
-- RESERVE est pose des la creation d'une commande (et non au
-- paiement) : il sert de verrou empechant deux acheteurs de
-- commander simultanement le meme animal. Il est relache si le
-- paiement echoue/expire, et devient VENDU si le paiement aboutit.
--
-- Ne pas confondre avec EN_ATTENTE, qui designe un animal en
-- attente de validation avant publication.
-- ─────────────────────────────────────────────────────────

ALTER TABLE animal
    DROP CONSTRAINT IF EXISTS chk_animal_status;

ALTER TABLE animal
    ADD CONSTRAINT chk_animal_status
        CHECK (statut IN ('EN_ATTENTE', 'DISPONIBLE', 'RESERVE', 'INDISPONIBLE', 'VENDU'));

-- Index partiel : la liberation des reservations expirees balaie
-- regulierement les animaux RESERVE, qui restent une petite minorite.
CREATE INDEX IF NOT EXISTS idx_animal_reserve
    ON animal (statut) WHERE statut = 'RESERVE';
