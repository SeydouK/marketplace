-- ─────────────────────────────────────────────────────────────────────────────
-- V3.0.20 : les transporteurs deviennent des acteurs de la plateforme
--
-- Changement de modele. Jusqu'ici le convoyeur etait le sous-traitant du vendeur,
-- joint par un lien : la plateforme ne le connaissait pas et n'avait rien a
-- garantir. Desormais il s'inscrit, passe un KYC et fournit un permis de
-- conduire ; le vendeur choisit parmi ceux que la plateforme a valides.
--
-- Consequence a ne pas perdre de vue : en validant un transporteur, la plateforme
-- le cautionne. Le jour ou un animal meurt en transit, le vendeur se retournera
-- vers elle, pas vers un convoyeur qu'il aurait choisi seul. La question de la
-- responsabilite (D1) redevient donc a trancher avant la premiere course.
--
-- Regles retenues :
--   - une seule livraison a la fois par transporteur ;
--   - le vendeur propose, le transporteur accepte ou refuse.
-- ─────────────────────────────────────────────────────────────────────────────

-- ── Permis de conduire ──────────────────────────────────────────────────────
-- S'ajoute au KYC existant (piece d'identite + selfie compare). Un transporteur
-- n'est proposable qu'une fois son permis valide : c'est le signal minimal avant
-- de lui confier un animal de plusieurs centaines de milliers de francs.
ALTER TABLE users
    ADD COLUMN permis_url          TEXT,
    ADD COLUMN permis_valide       BOOLEAN NOT NULL DEFAULT FALSE,
    ADD COLUMN permis_valide_at    TIMESTAMP,
    ADD COLUMN permis_valide_par_id BIGINT,
    -- Nombre de tetes transportables : affiche au vendeur pour qu'il choisisse
    -- un vehicule adapte, sans bloquer quoi que ce soit a ce stade.
    ADD COLUMN capacite_tetes      INTEGER,
    ADD COLUMN type_vehicule       VARCHAR(40);

ALTER TABLE users
    ADD CONSTRAINT fk_permis_valide_par FOREIGN KEY (permis_valide_par_id)
        REFERENCES users(id) ON DELETE SET NULL;

ALTER TABLE users
    ADD CONSTRAINT chk_type_vehicule
        CHECK (type_vehicule IS NULL OR type_vehicule IN
               ('BETAILLERE', 'CAMION', 'PICKUP', 'TRICYCLE', 'AUTRE'));

-- ── Affectation d'une livraison ─────────────────────────────────────────────
-- PROPOSEE  : le vendeur a propose la course, le transporteur n'a pas repondu
-- ACCEPTEE  : il l'a prise en charge — il n'est plus disponible
-- REFUSEE   : il a decline, la place se libere aussitot
-- ANNULEE   : le vendeur a retire sa proposition
ALTER TABLE remises
    ADD COLUMN transporteur_id         BIGINT,
    ADD COLUMN affectation_statut      VARCHAR(20),
    ADD COLUMN affectation_at          TIMESTAMP,
    ADD COLUMN affectation_reponse_at  TIMESTAMP,
    ADD COLUMN affectation_refus_motif TEXT;

ALTER TABLE remises
    ADD CONSTRAINT fk_remise_transporteur FOREIGN KEY (transporteur_id)
        REFERENCES users(id) ON DELETE SET NULL;

ALTER TABLE remises
    ADD CONSTRAINT chk_affectation_statut
        CHECK (affectation_statut IS NULL OR affectation_statut IN
               ('PROPOSEE', 'ACCEPTEE', 'REFUSEE', 'ANNULEE'));

-- La disponibilite se deduit de cette table plutot que d'un drapeau sur users :
-- un indicateur maintenu a la main finit toujours par desynchroniser, et laisser
-- un transporteur « occupe » sur une course terminee le prive de travail.
CREATE INDEX idx_remise_transporteur ON remises(transporteur_id, affectation_statut);
