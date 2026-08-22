-- ─────────────────────────────────────────────────────────────────────────────
-- V3.0.17 : ou livrer, et ou en est le livreur
--
-- La plateforme ne savait pas ou livrer : aucune adresse n'existait, ni sur les
-- utilisateurs ni sur les commandes. Le champ `localisation` des articles designe
-- l'emplacement de l'animal chez le vendeur, pas la destination.
--
-- Le mode de remise migre de commande_items vers remises. Une remise est un
-- evenement physique unique — un vendeur remet a un acheteur, a un endroit, a un
-- moment : le mode, l'adresse et le code appartiennent au meme objet. Les porter
-- sur chaque article creerait autant de sources de verite que d'animaux.
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE remises
    ADD COLUMN mode_remise VARCHAR(20) NOT NULL DEFAULT 'RETRAIT_SUR_PLACE';

ALTER TABLE remises
    ADD CONSTRAINT chk_remise_mode
        CHECK (mode_remise IN ('RETRAIT_SUR_PLACE', 'TRANSPORT'));

-- ── Destination ─────────────────────────────────────────────────────────────
-- Renseignee uniquement en mode TRANSPORT.
--
-- `indications` n'est pas un confort : l'adressage postal est rare en Cote
-- d'Ivoire, et on se repere par points de reference (« apres le marche, portail
-- vert »). Sans ce champ, la moitie des livraisons se termine par un appel.
ALTER TABLE remises
    ADD COLUMN adresse_ligne          TEXT,
    ADD COLUMN adresse_ville          VARCHAR(120),
    ADD COLUMN adresse_indications    TEXT,
    ADD COLUMN destinataire_nom       VARCHAR(160),
    ADD COLUMN destinataire_telephone VARCHAR(20),
    ADD COLUMN destination_latitude   NUMERIC(10, 7),
    ADD COLUMN destination_longitude  NUMERIC(10, 7);

-- ── Position du livreur ─────────────────────────────────────────────────────
-- Denormalisee ici plutot que journalisee dans livraison_evenements.
--
-- Un point toutes les 20 secondes sur une livraison de 3 heures produit 540
-- lignes de telemetrie ; le journal est fait pour les faits marquants (depart,
-- remise, echec), pas pour le flux GPS. On ne conserve donc que le dernier point
-- connu. Un historique de trajet, s'il devient utile, mérite sa propre table.
ALTER TABLE remises
    ADD COLUMN livreur_latitude   NUMERIC(10, 7),
    ADD COLUMN livreur_longitude  NUMERIC(10, 7),
    ADD COLUMN livreur_position_at TIMESTAMP,
    ADD COLUMN depart_at          TIMESTAMP;

-- ── Retrait du mode porte par les articles ──────────────────────────────────
-- Report de l'information vers les remises avant suppression, pour ne rien perdre
-- des commandes deja passees.
UPDATE remises r
SET mode_remise = sous.mode_remise
FROM (
    SELECT DISTINCT ON (i.commande_id, i.vendeur_id)
           i.commande_id, i.vendeur_id, i.mode_remise
    FROM commande_items i
    WHERE i.vendeur_id IS NOT NULL
) AS sous
WHERE r.commande_id = sous.commande_id
  AND r.vendeur_id = sous.vendeur_id;

ALTER TABLE commande_items DROP CONSTRAINT IF EXISTS chk_item_mode_remise;
ALTER TABLE commande_items DROP COLUMN IF EXISTS mode_remise;

-- Le suivi acheteur interroge la remise par commande : l'index existe deja
-- (idx_remise_commande). On ajoute seulement de quoi balayer les livraisons en
-- cours sans parcourir toute la table.
CREATE INDEX idx_remise_en_route ON remises (livreur_position_at)
    WHERE livreur_position_at IS NOT NULL;
