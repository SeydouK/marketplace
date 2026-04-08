WITH source_data AS (
    SELECT
        l.*,
        (
            SUBSTRING(MD5('animal-' || l.id) FROM 1 FOR 8) || '-' ||
            SUBSTRING(MD5('animal-' || l.id) FROM 9 FOR 4) || '-' ||
            SUBSTRING(MD5('animal-' || l.id) FROM 13 FOR 4) || '-' ||
            SUBSTRING(MD5('animal-' || l.id) FROM 17 FOR 4) || '-' ||
            SUBSTRING(MD5('animal-' || l.id) FROM 21 FOR 12)
        )::UUID AS animal_uuid,
        (
            SUBSTRING(MD5('animal-vendeur-' || l.id) FROM 1 FOR 8) || '-' ||
            SUBSTRING(MD5('animal-vendeur-' || l.id) FROM 9 FOR 4) || '-' ||
            SUBSTRING(MD5('animal-vendeur-' || l.id) FROM 13 FOR 4) || '-' ||
            SUBSTRING(MD5('animal-vendeur-' || l.id) FROM 17 FOR 4) || '-' ||
            SUBSTRING(MD5('animal-vendeur-' || l.id) FROM 21 FOR 12)
        )::UUID AS animal_vendeur_uuid,
        (
            SUBSTRING(MD5('historique-enregistrement-' || l.id) FROM 1 FOR 8) || '-' ||
            SUBSTRING(MD5('historique-enregistrement-' || l.id) FROM 9 FOR 4) || '-' ||
            SUBSTRING(MD5('historique-enregistrement-' || l.id) FROM 13 FOR 4) || '-' ||
            SUBSTRING(MD5('historique-enregistrement-' || l.id) FROM 17 FOR 4) || '-' ||
            SUBSTRING(MD5('historique-enregistrement-' || l.id) FROM 21 FOR 12)
        )::UUID AS historique_uuid
    FROM listings l
)
INSERT INTO animal (
    id,
    qr_code,
    type,
    race,
    lieu_naissance,
    price,
    photos,
    videos,
    nombre,
    longitude,
    latitude,
    statut,
    date_creation,
    date_modification
)
SELECT
    source_data.animal_uuid,
    'LEGACY-' || source_data.id,
    CASE source_data.animal_type
        WHEN 'boeuf' THEN 'BOVIN'
        WHEN 'mouton' THEN 'OVIN'
        WHEN 'chevre' THEN 'CAPRIN'
        WHEN 'porc' THEN 'PORCIN'
        ELSE 'AUTRE'
    END,
    source_data.breed,
    source_data.location,
    source_data.price,
    CASE
        WHEN source_data.image IS NULL OR BTRIM(source_data.image) = '' THEN NULL
        ELSE ARRAY[source_data.image]::TEXT[]
    END,
    NULL,
    1,
    NULL,
    NULL,
    CASE source_data.status
        WHEN 'DISPONIBLE' THEN 'DISPONIBLE'
        WHEN 'VENDU' THEN 'VENDU'
        ELSE 'INDISPONIBLE'
    END,
    source_data.created_at,
    source_data.updated_at
FROM source_data
WHERE NOT EXISTS (
    SELECT 1
    FROM animal existing_animal
    WHERE existing_animal.id = source_data.animal_uuid
);

WITH source_data AS (
    SELECT
        l.id AS listing_id,
        l.user_id,
        l.created_at,
        (
            SUBSTRING(MD5('animal-' || l.id) FROM 1 FOR 8) || '-' ||
            SUBSTRING(MD5('animal-' || l.id) FROM 9 FOR 4) || '-' ||
            SUBSTRING(MD5('animal-' || l.id) FROM 13 FOR 4) || '-' ||
            SUBSTRING(MD5('animal-' || l.id) FROM 17 FOR 4) || '-' ||
            SUBSTRING(MD5('animal-' || l.id) FROM 21 FOR 12)
        )::UUID AS animal_uuid,
        (
            SUBSTRING(MD5('animal-vendeur-' || l.id) FROM 1 FOR 8) || '-' ||
            SUBSTRING(MD5('animal-vendeur-' || l.id) FROM 9 FOR 4) || '-' ||
            SUBSTRING(MD5('animal-vendeur-' || l.id) FROM 13 FOR 4) || '-' ||
            SUBSTRING(MD5('animal-vendeur-' || l.id) FROM 17 FOR 4) || '-' ||
            SUBSTRING(MD5('animal-vendeur-' || l.id) FROM 21 FOR 12)
        )::UUID AS animal_vendeur_uuid
    FROM listings l
)
INSERT INTO animal_vendeur (id, animal_id, vendeur_id, date_association)
SELECT
    source_data.animal_vendeur_uuid,
    source_data.animal_uuid,
    source_data.user_id,
    source_data.created_at
FROM source_data
WHERE NOT EXISTS (
    SELECT 1
    FROM animal_vendeur existing_link
    WHERE existing_link.id = source_data.animal_vendeur_uuid
);

WITH source_data AS (
    SELECT
        l.id,
        l.user_id,
        l.title,
        l.description,
        l.location,
        l.created_at,
        (
            SUBSTRING(MD5('animal-' || l.id) FROM 1 FOR 8) || '-' ||
            SUBSTRING(MD5('animal-' || l.id) FROM 9 FOR 4) || '-' ||
            SUBSTRING(MD5('animal-' || l.id) FROM 13 FOR 4) || '-' ||
            SUBSTRING(MD5('animal-' || l.id) FROM 17 FOR 4) || '-' ||
            SUBSTRING(MD5('animal-' || l.id) FROM 21 FOR 12)
        )::UUID AS animal_uuid,
        (
            SUBSTRING(MD5('historique-enregistrement-' || l.id) FROM 1 FOR 8) || '-' ||
            SUBSTRING(MD5('historique-enregistrement-' || l.id) FROM 9 FOR 4) || '-' ||
            SUBSTRING(MD5('historique-enregistrement-' || l.id) FROM 13 FOR 4) || '-' ||
            SUBSTRING(MD5('historique-enregistrement-' || l.id) FROM 17 FOR 4) || '-' ||
            SUBSTRING(MD5('historique-enregistrement-' || l.id) FROM 21 FOR 12)
        )::UUID AS historique_uuid
    FROM listings l
)
INSERT INTO historique (
    id,
    animal_id,
    acteur_id,
    type_evenement,
    description,
    longitude,
    latitude,
    date_evenement,
    hash_blockchain
)
SELECT
    source_data.historique_uuid,
    source_data.animal_uuid,
    source_data.user_id,
    'ENREGISTREMENT',
    CONCAT('Migration legacy listing: ', source_data.title, COALESCE(' - ' || source_data.description, '')),
    NULL,
    NULL,
    source_data.created_at,
    NULL
FROM source_data
WHERE NOT EXISTS (
    SELECT 1
    FROM historique existing_history
    WHERE existing_history.id = source_data.historique_uuid
);
