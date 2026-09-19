-- ─────────────────────────────────────────────────────────────────────────────
-- V3.0.26 : sortir les actualites du code
--
-- L'onglet Actualites servait un tableau code en dur dans le service Angular.
-- Publier demandait donc une modification de source, une revue et un
-- deploiement — soit plusieurs jours pour une alerte de fievre aphteuse dont la
-- valeur se mesure en heures. La table rend la redaction administrable.
--
-- Deux dates, et ce n'est pas de la redondance : created_at dit quand la ligne
-- est apparue, date_publication dit la date que le lecteur voit et sur laquelle
-- la liste est triee. Un brouillon repris trois semaines plus tard ne doit pas
-- se presenter comme frais, et une annonce reglementaire peut etre redigee la
-- veille pour une date d'effet arretee.
--
-- publiee est un drapeau distinct de la date, et non une date de publication
-- nulle qui vaudrait brouillon : la combinaison des deux permet de programmer
-- (publiee = true, date future, invisible jusqu'au jour dit) et de retirer un
-- article deja en ligne sans perdre sa date d'origine.
--
-- La rubrique reste un VARCHAR contraint plutot qu'un type ENUM Postgres :
-- toutes les enumerations du schema sont deja modelisees ainsi, et ajouter une
-- rubrique ne doit pas dependre d'un ALTER TYPE non transactionnel.
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS actualites (
    id                  BIGSERIAL PRIMARY KEY,
    titre               VARCHAR(255) NOT NULL,
    resume              TEXT NOT NULL,
    contenu             TEXT NOT NULL,
    categorie           VARCHAR(30) NOT NULL,
    image_url           TEXT,
    -- Signature libre, volontairement sans cle etrangere : « ANADER Cote
    -- d'Ivoire » ou un veterinaire invite signent des articles sans avoir de
    -- compte. La tracabilite interne passe par redige_par_id.
    auteur              VARCHAR(255) NOT NULL,
    redige_par_id       BIGINT,
    date_publication    TIMESTAMP NOT NULL DEFAULT NOW(),
    publiee             BOOLEAN NOT NULL DEFAULT FALSE,
    created_at          TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ON DELETE SET NULL : la suppression d'un compte administrateur ne doit pas
-- emporter les articles qu'il a rediges.
ALTER TABLE actualites DROP CONSTRAINT IF EXISTS fk_actualite_redacteur;
ALTER TABLE actualites
    ADD CONSTRAINT fk_actualite_redacteur
    FOREIGN KEY (redige_par_id) REFERENCES users(id) ON DELETE SET NULL;

ALTER TABLE actualites DROP CONSTRAINT IF EXISTS chk_actualite_categorie;
ALTER TABLE actualites
    ADD CONSTRAINT chk_actualite_categorie
    CHECK (categorie IN ('SANTE_ANIMALE', 'ELEVAGE', 'MARCHE', 'REGLEMENTATION', 'CONSEIL'));

-- La liste publique est la seule requete chaude : filtree sur publiee, triee
-- sur la date. Index partiel — les brouillons n'y ont rien a faire.
CREATE INDEX IF NOT EXISTS idx_actualite_publication
    ON actualites (date_publication DESC)
    WHERE publiee = TRUE;

COMMENT ON COLUMN actualites.date_publication IS
    'Date affichee au lecteur et clef de tri. Une date future sur un article publie le tient hors ligne jusqu''a son echeance.';
COMMENT ON COLUMN actualites.publiee IS
    'FALSE = brouillon, invisible du public quelle que soit sa date.';
