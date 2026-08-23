-- ─────────────────────────────────────────────────────────────────────────────
-- V3.0.16 : le code de remise devient la condition de sortie du sequestre
--
-- Avant : les fonds se liberaient sur un bouton « J'ai recu l'animal », avec un
-- repli a 7 jours qui payait le vendeur SANS aucune preuve de remise. Un vendeur
-- de mauvaise foi n'avait qu'a attendre.
--
-- Apres : l'acheteur detient un code a 4 chiffres ; celui qui remet l'animal le
-- saisit, photo a l'appui. La remise physique devient elle-meme la preuve et
-- l'ordre de paiement. Le repli subsiste, reduit et reserve aux remises non codees.
-- ─────────────────────────────────────────────────────────────────────────────

-- ── Deux etats manquants ────────────────────────────────────────────────────
-- PRET            : le vendeur declare l'animal pret. Sans lui, l'acheteur qui
--                   vient chercher la bete ne sait pas quand se deplacer.
-- ECHEC_LIVRAISON : acheteur absent, animal refuse, acces impossible. Ce cas
--                   existe dans la realite et n'avait aucune representation :
--                   la livraison restait bloquee en silence.
ALTER TABLE commande_items
    DROP CONSTRAINT IF EXISTS chk_item_statut_livraison;

ALTER TABLE commande_items
    ADD CONSTRAINT chk_item_statut_livraison
        CHECK (statut_livraison IN ('A_REMETTRE', 'PRET', 'EN_LIVRAISON', 'LIVRE',
                                    'RECEPTIONNE', 'ECHEC_LIVRAISON', 'LITIGE'));

-- ── Mode de remise et preuve ────────────────────────────────────────────────
ALTER TABLE commande_items
    ADD COLUMN IF NOT EXISTS mode_remise          VARCHAR(20) NOT NULL DEFAULT 'RETRAIT_SUR_PLACE',
    ADD COLUMN IF NOT EXISTS photo_remise_url     TEXT,
    ADD COLUMN IF NOT EXISTS echec_motif          TEXT,
    ADD COLUMN IF NOT EXISTS tentatives_livraison INTEGER NOT NULL DEFAULT 0;

ALTER TABLE commande_items DROP CONSTRAINT IF EXISTS chk_item_mode_remise;

ALTER TABLE commande_items
    ADD CONSTRAINT chk_item_mode_remise
        CHECK (mode_remise IN ('RETRAIT_SUR_PLACE', 'TRANSPORT'));

-- ── Le code de remise ───────────────────────────────────────────────────────
-- Portee : un code par (commande, vendeur), et non par animal.
--
-- Un acheteur qui prend trois betes au meme eleveur fait UNE remise : trois codes
-- distincts seraient impraticables sur le terrain. Le code reste valable tant que
-- tous les animaux du vendeur ne sont pas remis, ce qui couvre aussi la remise en
-- plusieurs fois.
--
-- Cette portee epouse exactement celle du versement (commande, vendeur) : le code
-- valide libere donc precisement le versement correspondant.
--
-- Le code est stocke en clair. Un hachage n'apporterait presque rien — 4 chiffres
-- se retrouvent en 10 000 essais hors ligne — au prix d'une verification plus
-- lourde. La protection repose sur : jamais expose au vendeur, jamais journalise,
-- et 3 tentatives maximum (colonne tentatives).
CREATE TABLE IF NOT EXISTS remises (
    id               BIGSERIAL PRIMARY KEY,
    commande_id      BIGINT NOT NULL,
    vendeur_id       BIGINT NOT NULL,
    code             VARCHAR(8) NOT NULL,
    tentatives       INTEGER NOT NULL DEFAULT 0,
    bloquee_jusqu_a  TIMESTAMP,
    created_at       TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_remise_commande FOREIGN KEY (commande_id) REFERENCES commandes(id) ON DELETE CASCADE,
    CONSTRAINT fk_remise_vendeur  FOREIGN KEY (vendeur_id)  REFERENCES users(id)     ON DELETE CASCADE,
    CONSTRAINT uq_remise_commande_vendeur UNIQUE (commande_id, vendeur_id)
);

CREATE INDEX IF NOT EXISTS idx_remise_commande ON remises(commande_id);
CREATE INDEX IF NOT EXISTS idx_remise_vendeur  ON remises(vendeur_id);

-- ── Journal d'evenements ────────────────────────────────────────────────────
-- Table en ajout seul : on n'y modifie jamais une ligne.
--
-- Le statut porte par commande_items reste la valeur de travail (requetes,
-- filtres), mais l'historique fait foi. C'est ce qui permet d'afficher une frise
-- horodatee, d'arbitrer un litige sur pieces, et plus tard d'absorber les
-- notifications d'un transporteur sans toucher a la logique metier.
--
-- donnees (jsonb) accueille le detail propre a chaque type d'evenement sans
-- imposer une colonne par cas.
CREATE TABLE IF NOT EXISTS livraison_evenements (
    id               BIGSERIAL PRIMARY KEY,
    commande_item_id BIGINT NOT NULL,

    type             VARCHAR(40) NOT NULL,
    auteur_type      VARCHAR(20) NOT NULL,
    auteur_id        BIGINT,
    source           VARCHAR(20) NOT NULL,

    commentaire      TEXT,
    photo_url        TEXT,
    latitude         NUMERIC(10, 7),
    longitude        NUMERIC(10, 7),
    donnees          JSONB,

    created_at       TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_evenement_item FOREIGN KEY (commande_item_id) REFERENCES commande_items(id) ON DELETE CASCADE
);

ALTER TABLE livraison_evenements DROP CONSTRAINT IF EXISTS chk_evenement_auteur_type;

ALTER TABLE livraison_evenements
    ADD CONSTRAINT chk_evenement_auteur_type
        CHECK (auteur_type IN ('ACHETEUR', 'VENDEUR', 'TRANSPORTEUR', 'SYSTEME', 'ADMIN'));

ALTER TABLE livraison_evenements DROP CONSTRAINT IF EXISTS chk_evenement_source;

ALTER TABLE livraison_evenements
    ADD CONSTRAINT chk_evenement_source
        CHECK (source IN ('APP', 'WEBHOOK', 'SCHEDULER', 'ADMIN'));

-- La frise se lit par article, dans l'ordre chronologique : index composite.
CREATE INDEX IF NOT EXISTS idx_evenement_item ON livraison_evenements(commande_item_id, created_at);
CREATE INDEX IF NOT EXISTS idx_evenement_type ON livraison_evenements(type);

-- ── Reprise des commandes deja payees ───────────────────────────────────────
-- Les commandes payees avant cette migration n'ont pas de code. Elles restent
-- soldables par l'ancien chemin (confirmation dans l'application), qui devient
-- le recours prevu par la decision D5.
