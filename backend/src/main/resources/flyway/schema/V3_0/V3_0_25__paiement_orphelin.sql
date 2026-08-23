-- ─────────────────────────────────────────────────────────────────────────────
-- V3.0.24 : signaler les paiements encaisses sur des commandes abandonnees
--
-- Annuler une commande chez nous n'annule pas la session de paiement chez
-- GeniusPay : leur API n'expose aucun moyen de le faire. Il reste donc une
-- fenetre etroite ou un acheteur paie un lien juste apres son abandon.
--
-- Un balayage detecte ces cas en interrogeant l'operateur. Il les journalisait,
-- et un journal est un fichier que personne n'ouvre. Cette colonne les fait
-- remonter dans l'ecran des transactions, ou un administrateur regarde deja :
-- sans elle, la ligne est indistinguable d'une annulation ordinaire, alors que
-- l'argent a bel et bien ete preleve.
--
-- Une date plutot qu'un booleen : savoir QUAND la contradiction a ete constatee
-- compte autant que de savoir qu'elle existe, et c'est ce qui permet de ne pas
-- re-signaler le meme cas a chaque passage.
--
-- Pas de nouveau statut de commande, volontairement : le statut dit ce que NOUS
-- avons decide, cette colonne dit ce que l'operateur constate. Les confondre
-- reviendrait a effacer la contradiction qu'on cherche justement a exposer.
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE commandes
    ADD COLUMN IF NOT EXISTS paiement_orphelin_detecte_at TIMESTAMP;

COMMENT ON COLUMN commandes.paiement_orphelin_detecte_at IS
    'Date a laquelle on a constate que l''operateur avait encaisse cette commande alors que nous l''avions abandonnee. NULL dans le cas normal.';

-- Le filtre admin ne cherche que les lignes renseignees : un index partiel
-- suffit, et il reste minuscule puisque le cas est rare par nature.
CREATE INDEX IF NOT EXISTS idx_commande_paiement_orphelin
    ON commandes (paiement_orphelin_detecte_at)
    WHERE paiement_orphelin_detecte_at IS NOT NULL;
