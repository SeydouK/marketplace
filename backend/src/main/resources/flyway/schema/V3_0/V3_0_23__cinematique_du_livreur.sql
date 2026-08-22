-- ─────────────────────────────────────────────────────────────────────────────
-- V3.0.23 : vitesse, cap et precision — ce qu'il faut pour animer un marqueur
--
-- Jusqu'ici un point n'etait qu'un couple de coordonnees. Cela suffit a poser une
-- epingle, pas a la faire avancer de facon credible entre deux envois : sans cap
-- le marqueur ne peut pas s'orienter, sans vitesse on ne sait pas ou il devrait
-- se trouver a l'instant present.
--
-- Ces trois valeurs sont fournies gratuitement par l'API de geolocalisation du
-- navigateur (coords.speed, coords.heading, coords.accuracy). On les jetait.
--
-- Elles servent aussi a ecarter un point aberrant : un saut de deux kilometres
-- annonce avec une precision de 2000 m est un releve par antenne, pas un
-- deplacement. Le filtrer evite de faire bondir le marqueur a travers la ville.
-- ─────────────────────────────────────────────────────────────────────────────

-- ── Sur le trace : chaque point garde sa cinematique ────────────────────────
ALTER TABLE livraison_positions
    ADD COLUMN vitesse_kmh NUMERIC(6, 2),
    ADD COLUMN cap_degres  NUMERIC(5, 2);

COMMENT ON COLUMN livraison_positions.vitesse_kmh IS
    'Vitesse instantanee annoncee par le GPS, en km/h. NULL si le materiel ne la fournit pas.';
COMMENT ON COLUMN livraison_positions.cap_degres IS
    'Direction du deplacement en degres (0 = nord, sens horaire). NULL a l''arret.';

-- ── Sur la remise : la derniere cinematique connue ──────────────────────────
-- Dupliquee ici pour la meme raison que la position courante : repondre a
-- « ou est-il, et dans quelle direction ? » sans relire tout le trace.
ALTER TABLE remises
    ADD COLUMN livreur_vitesse_kmh NUMERIC(6, 2),
    ADD COLUMN livreur_cap_degres  NUMERIC(5, 2),
    ADD COLUMN livreur_precision_m INTEGER;
