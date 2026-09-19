-- ─────────────────────────────────────────────────────────────────────────────
-- V3.0.21 : pouvoir redemander son email de verification
--
-- L'email n'etait envoye qu'une fois, a l'inscription, et aucun endpoint ne
-- permettait de le redemander. Un utilisateur dont l'email se perd — spam,
-- adresse mal saisie, panne SMTP — ou dont le jeton expire au bout de 24 h
-- restait non verifie definitivement, sans aucun recours.
--
-- La date du dernier envoi est conservee pour espacer les renvois : sans ce
-- garde-fou, un clic repete transformerait le bouton en outil d'envoi massif
-- vers une adresse arbitraire.
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE users
    ADD COLUMN IF NOT EXISTS verification_email_sent_at TIMESTAMP;

-- Les comptes existants n'ont pas d'historique d'envoi : les laisser a NULL
-- autorise un premier renvoi immediat, ce qui est le comportement souhaite.
