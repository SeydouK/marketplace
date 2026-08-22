-- ─────────────────────────────────────────────────────────────────────────────
-- V3.0.19 : confier un convoyage sans creer de compte
--
-- Le vendeur qui ne peut pas conduire lui-meme s'arrange avec un convoyeur qu'il
-- connait deja. Lui demander de creer un compte, de passer un KYC et d'attendre
-- une validation pour une seule course serait hors de proportion : il ne le fera
-- pas, et le vendeur reviendra au telephone.
--
-- On lui envoie donc un lien. Le jeton qu'il porte donne acces a une vue reduite
-- de la livraison — adresse, destinataire, bouton de depart, saisie du code — et
-- a rien d'autre. Ni le prix de l'animal, ni le montant du versement, ni surtout
-- le code de remise, que seul l'acheteur detient.
--
-- Le transporteur reste le sous-traitant du vendeur : leur arrangement ne regarde
-- pas la plateforme, et l'animal demeure la propriete du vendeur jusqu'a la
-- remise. C'est ce qui fait que le sequestre suffit, sans politique de sinistre.
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE remises
    ADD COLUMN convoyage_jeton        VARCHAR(64),
    ADD COLUMN transporteur_nom       VARCHAR(160),
    -- Format international complet (+225...), jamais l'indicatif seul : la
    -- plateforme n'est pas destinee a rester ivoirienne.
    ADD COLUMN transporteur_telephone VARCHAR(24),
    ADD COLUMN convoyage_confie_at    TIMESTAMP,
    ADD COLUMN convoyage_expire_at    TIMESTAMP;

-- Un jeton doit rester unique : c'est lui, et lui seul, qui autorise l'acces.
CREATE UNIQUE INDEX idx_remise_convoyage_jeton ON remises(convoyage_jeton)
    WHERE convoyage_jeton IS NOT NULL;
