-- ─────────────────────────────────────────────────────────────────────────────
-- V3.0.22 : garder le parcours, pas seulement le dernier point
--
-- Jusqu'ici seule la position courante etait conservee, ecrasee a chaque envoi.
-- L'acheteur voyait donc un camion qui se teleporte, sans savoir d'ou il vient
-- ni dans quelle direction il va. Un trace change la lecture : on suit une
-- progression au lieu de constater un point.
--
-- J'avais ecarte cette table en jugeant qu'un point toutes les 20 s produirait
-- des milliers de lignes. C'est vrai sans filtrage — d'ou les deux regles
-- appliquees a l'ecriture :
--
--   1. un point n'est retenu que si le livreur a parcouru une distance minimale
--      depuis le precedent. A l'arret dans un embouteillage, on n'ecrit rien.
--   2. le nombre de points par course est plafonne ; au-dela, les plus anciens
--      sont eclaircis un sur deux.
--
-- Sur un trajet de huit heures, cela donne quelques centaines de lignes.
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS livraison_positions (
    id            BIGSERIAL PRIMARY KEY,
    remise_id     BIGINT NOT NULL,

    latitude      NUMERIC(10, 7) NOT NULL,
    longitude     NUMERIC(10, 7) NOT NULL,
    /** Precision annoncee par le GPS, en metres — utile pour ecarter un point aberrant. */
    precision_m   INTEGER,

    enregistre_le TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_position_remise FOREIGN KEY (remise_id) REFERENCES remises(id) ON DELETE CASCADE
);

-- Le trace se lit toujours par remise, dans l'ordre chronologique.
CREATE INDEX IF NOT EXISTS idx_position_remise ON livraison_positions(remise_id, enregistre_le);
