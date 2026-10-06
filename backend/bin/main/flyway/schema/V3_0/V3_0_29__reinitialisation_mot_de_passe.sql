-- ─────────────────────────────────────────────────────────────────────────────
-- V3.0.29 : reinitialisation du mot de passe oublie
--
-- Jusqu'ici, un utilisateur ayant perdu son mot de passe n'avait aucun recours
-- applicatif. Le parcours ajoute repose sur un lien a usage unique envoye par
-- email.
--
-- Le jeton n'est JAMAIS stocke en clair : seule son empreinte SHA-256 l'est. Une
-- fuite de la base (sauvegarde, export, acces en lecture) ne doit pas suffire a
-- prendre la main sur un compte — le jeton en clair n'existe que dans l'email.
-- C'est la difference avec email_verification_token, dont la fuite n'expose
-- qu'une confirmation d'adresse.
--
-- Colonnes sur users plutot qu'une table dediee : un compte a au plus une
-- demande en cours, et une nouvelle demande remplace la precedente.
--
-- mot_de_passe_modifie_at sert a revoquer les sessions : un jeton JWT emis avant
-- cette date est refuse. Sans elle, changer un mot de passe vole laisserait le
-- voleur connecte jusqu'a l'expiration de son jeton.
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE users
    ADD COLUMN IF NOT EXISTS reinitialisation_jeton_hash  VARCHAR(64),
    ADD COLUMN IF NOT EXISTS reinitialisation_expire_at   TIMESTAMP,
    ADD COLUMN IF NOT EXISTS reinitialisation_demandee_at TIMESTAMP,
    ADD COLUMN IF NOT EXISTS mot_de_passe_modifie_at      TIMESTAMP;

-- Unicite partielle : seules les demandes en cours portent une empreinte.
CREATE UNIQUE INDEX IF NOT EXISTS ux_users_reinitialisation_jeton_hash
    ON users (reinitialisation_jeton_hash)
    WHERE reinitialisation_jeton_hash IS NOT NULL;

COMMENT ON COLUMN users.reinitialisation_jeton_hash IS
    'Empreinte SHA-256 (hexadecimal) du jeton de reinitialisation. Le jeton en clair n''est jamais stocke.';
COMMENT ON COLUMN users.reinitialisation_expire_at IS
    'Echeance du jeton de reinitialisation en cours.';
COMMENT ON COLUMN users.reinitialisation_demandee_at IS
    'Derniere demande de reinitialisation, pour espacer les envois.';
COMMENT ON COLUMN users.mot_de_passe_modifie_at IS
    'Dernier changement de mot de passe. Les jetons JWT emis avant cette date sont refuses.';
