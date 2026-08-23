-- ─────────────────────────────────────────────────────────────────────────────
-- V3.0.18 : rendre l'argent, et tracer comment il sort
--
-- Deux manques que la mise en place du sequestre a rendus visibles.
--
-- 1. AUCUN REMBOURSEMENT N'EXISTAIT. Un animal qui meurt avant la remise, un
--    litige tranche en faveur de l'acheteur, une commande annulee apres paiement :
--    dans tous ces cas l'argent etait encaisse, sequestre, et sans chemin de
--    retour. Un administrateur devait detourner le versement vendeur pour payer
--    l'acheteur — un bricolage sur de l'argent reel.
--
-- 2. LES PAYOUTS NE SONT PAS OPERATIONNELS. GeniusPay n'expose pas encore de quoi
--    verser (cf. geniuspay.wallet-id, laisse vide en production, et le garde-fou
--    de GeniusPayService.initiatePayout). Tant que l'API n'est pas disponible,
--    l'argent sort a la main par Mobile Money : il faut au minimum en garder une
--    trace verifiable — qui a regle, quand, avec quelle reference de transaction.
--
-- Le remboursement est modele a l'image du versement : meme cycle de vie, meme
-- surface d'administration, meme mecanique de reglement. Ce qui change, c'est le
-- destinataire et le motif.
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS remboursements (
    id                  BIGSERIAL PRIMARY KEY,
    commande_id         BIGINT NOT NULL,
    commande_reference  VARCHAR(255),

    acheteur_id         BIGINT NOT NULL,
    acheteur_nom        VARCHAR(255),
    /** Destination du remboursement, figee au moment de la creation. */
    acheteur_telephone  VARCHAR(20),

    montant             DECIMAL(15, 2) NOT NULL CHECK (montant > 0),
    motif               TEXT NOT NULL,

    statut              VARCHAR(20) NOT NULL DEFAULT 'EN_ATTENTE',

    -- Comment l'argent est effectivement sorti.
    mode_reglement      VARCHAR(20),
    reference           VARCHAR(255),
    regle_par_id        BIGINT,
    regle_at            TIMESTAMP,

    created_at          TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_remboursement_commande FOREIGN KEY (commande_id) REFERENCES commandes(id) ON DELETE CASCADE,
    CONSTRAINT fk_remboursement_acheteur FOREIGN KEY (acheteur_id) REFERENCES users(id)     ON DELETE CASCADE,
    CONSTRAINT fk_remboursement_admin    FOREIGN KEY (regle_par_id) REFERENCES users(id)    ON DELETE SET NULL,

    CONSTRAINT chk_remboursement_statut
        CHECK (statut IN ('EN_ATTENTE', 'EN_COURS', 'CONFIRME', 'ECHOUE')),
    CONSTRAINT chk_remboursement_mode
        CHECK (mode_reglement IS NULL OR mode_reglement IN ('GENIUSPAY', 'MANUEL'))
);

CREATE INDEX IF NOT EXISTS idx_remboursement_commande ON remboursements(commande_id);
CREATE INDEX IF NOT EXISTS idx_remboursement_acheteur ON remboursements(acheteur_id);
CREATE INDEX IF NOT EXISTS idx_remboursement_statut   ON remboursements(statut);

-- ── Tracabilite du reglement des versements ─────────────────────────────────
-- Les memes colonnes cote vendeur : un versement paye a la main doit etre aussi
-- verifiable qu'un versement passe par l'API.
ALTER TABLE versements
    ADD COLUMN IF NOT EXISTS mode_reglement VARCHAR(20),
    ADD COLUMN IF NOT EXISTS regle_par_id   BIGINT;

ALTER TABLE versements DROP CONSTRAINT IF EXISTS chk_versement_mode;

ALTER TABLE versements
    ADD CONSTRAINT chk_versement_mode
        CHECK (mode_reglement IS NULL OR mode_reglement IN ('GENIUSPAY', 'MANUEL'));

ALTER TABLE versements DROP CONSTRAINT IF EXISTS fk_versement_admin;

ALTER TABLE versements
    ADD CONSTRAINT fk_versement_admin FOREIGN KEY (regle_par_id) REFERENCES users(id) ON DELETE SET NULL;

-- Les versements deja envoyes l'ont ete par l'API : on le note plutot que de
-- laisser une colonne vide qui laisserait croire a un reglement manuel.
-- `mode_reglement IS NULL` borne le rattrapage aux lignes jamais qualifiees : au
-- rejeu, un versement passe a MANUEL depuis lors n'est pas ramene a GENIUSPAY.
UPDATE versements SET mode_reglement = 'GENIUSPAY'
WHERE statut IN ('EN_COURS', 'CONFIRME')
  AND reference IS NOT NULL
  AND mode_reglement IS NULL;
