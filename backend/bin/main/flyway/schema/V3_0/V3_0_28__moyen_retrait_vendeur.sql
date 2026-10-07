-- ─────────────────────────────────────────────────────────────────────────────
-- V3.0.28 : le vendeur declare ou il veut etre paye
--
-- L'API de payout GeniusPay exige un destination.provider (wave, orange_money,
-- mtn, moov) en plus du numero. Le code l'omettait — il n'avait rien a y mettre :
-- un numero de telephone ne dit pas son operateur. Les numeros sont portables
-- entre reseaux, et Wave sert des numeros emis par d'autres operateurs ; deduire
-- l'operateur du prefixe enverrait donc l'argent au mauvais endroit dans les cas
-- exacts ou l'erreur coute le plus cher.
--
-- Deux colonnes sur users plutot qu'une table dediee : un vendeur a une
-- destination de retrait, pas un portefeuille de destinations. Le jour ou il en
-- faudra plusieurs, la table se creera avec ces deux colonnes pour point de
-- depart.
--
-- payout_numero est distinct de phone a dessein : le numero de contact et celui
-- qui recoit l'argent n'ont aucune raison d'etre le meme, et les confondre
-- obligerait un vendeur a changer son numero de connexion pour encaisser
-- ailleurs.
--
-- Le meme couple est recopie sur versements a l'envoi. Redondance assumee : le
-- versement doit continuer de dire ou l'argent est parti meme si le vendeur
-- change d'operateur ensuite — c'est exactement le role que joue deja
-- vendeur_telephone a cote.
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE users
    ADD COLUMN IF NOT EXISTS payout_operateur VARCHAR(20),
    ADD COLUMN IF NOT EXISTS payout_numero    VARCHAR(20);

ALTER TABLE versements
    ADD COLUMN IF NOT EXISTS destination_operateur VARCHAR(20),
    ADD COLUMN IF NOT EXISTS destination_numero    VARCHAR(20);

ALTER TABLE users DROP CONSTRAINT IF EXISTS chk_users_payout_operateur;
ALTER TABLE users
    ADD CONSTRAINT chk_users_payout_operateur
    CHECK (payout_operateur IS NULL
           OR payout_operateur IN ('WAVE', 'ORANGE_MONEY', 'MTN', 'MOOV'));

ALTER TABLE versements DROP CONSTRAINT IF EXISTS chk_versements_destination_operateur;
ALTER TABLE versements
    ADD CONSTRAINT chk_versements_destination_operateur
    CHECK (destination_operateur IS NULL
           OR destination_operateur IN ('WAVE', 'ORANGE_MONEY', 'MTN', 'MOOV'));

COMMENT ON COLUMN users.payout_operateur IS
    'Operateur credite lors d''un retrait. Alimente destination.provider chez GeniusPay.';
COMMENT ON COLUMN users.payout_numero IS
    'Numero credite lors d''un retrait. Independant de users.phone.';
COMMENT ON COLUMN versements.destination_operateur IS
    'Operateur reellement credite, fige a l''envoi. Ne suit pas les changements ulterieurs du profil vendeur.';
