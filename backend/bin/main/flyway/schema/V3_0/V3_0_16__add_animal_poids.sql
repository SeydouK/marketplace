-- Ajout du poids (en kg) sur la fiche animal.
ALTER TABLE animal ADD COLUMN animal_poids NUMERIC(8, 2);

COMMENT ON COLUMN animal.animal_poids IS 'Poids de l''animal en kilogrammes.';
