-- ─────────────────────────────────────────────────────────────────────────────
-- V3.0.15 : sequestre (escrow) — les fonds encaisses ne sont dus au vendeur
--           qu'une fois l'animal effectivement remis a l'acheteur.
--
-- Avant cette migration, une commande payee generait immediatement un versement
-- EN_ATTENTE, qu'un admin pouvait envoyer sans qu'aucune trace n'atteste que
-- l'acheteur avait recu son animal.
--
-- Le suivi est porte par commande_items (un item = un animal = une livraison) :
-- une commande multi-vendeurs se livre en plusieurs fois, et le versement d'un
-- vendeur ne se debloque que lorsque TOUS ses animaux sont receptionnes.
--
-- transporteur / tracking_reference sont nullables et inexploites pour l'instant :
-- ils accueilleront l'integration Yango sans nouvelle migration.
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE commande_items
    ADD COLUMN statut_livraison   VARCHAR(30) NOT NULL DEFAULT 'A_REMETTRE',
    ADD COLUMN transporteur       VARCHAR(20),
    ADD COLUMN tracking_reference VARCHAR(255),
    ADD COLUMN remis_at           TIMESTAMP,
    ADD COLUMN livre_at           TIMESTAMP,
    ADD COLUMN receptionne_at     TIMESTAMP,
    ADD COLUMN litige_motif       TEXT,
    ADD COLUMN litige_ouvert_at   TIMESTAMP;

-- A_REMETTRE   : paye, le vendeur doit encore remettre l'animal
-- EN_LIVRAISON : pris en charge (vendeur ou transporteur), en route
-- LIVRE        : depose chez l'acheteur — demarre le delai de liberation automatique
-- RECEPTIONNE  : l'acheteur a confirme avoir l'animal en main — debloque le versement
-- LITIGE       : l'acheteur conteste — gele le versement jusqu'a arbitrage admin
ALTER TABLE commande_items
    ADD CONSTRAINT chk_item_statut_livraison
        CHECK (statut_livraison IN ('A_REMETTRE', 'EN_LIVRAISON', 'LIVRE', 'RECEPTIONNE', 'LITIGE'));

ALTER TABLE commande_items
    ADD CONSTRAINT chk_item_transporteur
        CHECK (transporteur IS NULL OR transporteur IN ('MANUEL', 'YANGO'));

-- Le tableau de bord vendeur interroge ses articles par vendeur_id : sans cet
-- index, chaque affichage scanne l'integralite de commande_items.
CREATE INDEX idx_commande_item_vendeur   ON commande_items(vendeur_id);
CREATE INDEX idx_commande_item_livraison ON commande_items(statut_livraison);

-- ── Versements : etat BLOQUE ────────────────────────────────────────────────
-- Nouvel etat initial. EN_ATTENTE prend desormais le sens de "liberable, en
-- attente d'envoi par l'admin" ; BLOQUE signifie "encaisse mais pas encore du".
ALTER TABLE versements
    ADD COLUMN libere_at TIMESTAMP;

ALTER TABLE versements
    ALTER COLUMN statut SET DEFAULT 'BLOQUE';

-- Les versements deja generes ne sont volontairement pas retro-bloques : ils ont
-- ete crees sous l'ancienne regle, ou l'admin arbitrait seul. Les retrograder
-- reviendrait a suspendre un du deja constate.
UPDATE versements SET libere_at = created_at WHERE statut = 'EN_ATTENTE';
