-- ─────────────────────────────────────────────────────────
-- V3.0.7 : photo de profil utilisateur
-- Colonne avatar_url consommée par POST /api/users/me/avatar
-- et renvoyée dans GET /api/users/me.
-- ─────────────────────────────────────────────────────────

ALTER TABLE users
    ADD COLUMN IF NOT EXISTS avatar_url VARCHAR(500);
