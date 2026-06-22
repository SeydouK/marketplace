ALTER TABLE historique
    DROP CONSTRAINT IF EXISTS chk_type_evenement;

ALTER TABLE historique
    ADD CONSTRAINT chk_type_evenement CHECK (
        type_evenement IN (
            'ENREGISTREMENT',
            'EDITION',
            'VISITE_VETERINAIRE',
            'CHANGEMENT_STATUT',
            'VENTE', /* Rajouter */
            'TRANSPORT',
            'INSPECTION'
        )
    );
