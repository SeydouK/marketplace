INSERT INTO users (id, name, email, password, role)
VALUES
    (3, 'Agent ANADER Korhogo', 'anader@marketplace.local', '$2y$10$8rcGDEtLuz0SMtoLZ4XmQO22WeYTH36klbn.PEqglcMJ90coYsFI6', 'AGENT_ANADER'),
    (4, 'Veterinaire POC', 'vet@marketplace.local', '$2y$10$8rcGDEtLuz0SMtoLZ4XmQO22WeYTH36klbn.PEqglcMJ90coYsFI6', 'VETERINAIRE')
ON CONFLICT (email) DO NOTHING;

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
VALUES
    (
        '6b8294bb-431a-4d60-a39b-9acde7df0c41',
        'POC-KORHOGO-0001',
        'BOVIN',
        'N''Dama',
        'Korhogo',
        825000.00,
        ARRAY[]::TEXT[],
        ARRAY[]::TEXT[],
        12,
        9.4585,
        -5.6296,
        'INDISPONIBLE',
        NOW() - INTERVAL '2 day',
        NOW() - INTERVAL '2 day'
    ),
    (
        'f7565821-88fa-4204-91dc-56381f57bcdc',
        'POC-ABIDJAN-0002',
        'CAPRIN',
        'Sahelienne',
        'Abidjan',
        145000.00,
        ARRAY[]::TEXT[],
        ARRAY[]::TEXT[],
        1,
        5.3364,
        -4.0267,
        'DISPONIBLE',
        NOW() - INTERVAL '6 day',
        NOW() - INTERVAL '1 day'
    )
ON CONFLICT (id) DO NOTHING;

INSERT INTO animal_vendeur (id, animal_id, vendeur_id, date_association)
VALUES
    ('0e5839dc-91db-4d33-9d9c-bc9166b3fa2a', '6b8294bb-431a-4d60-a39b-9acde7df0c41', 2, NOW() - INTERVAL '2 day'),
    ('c8f2f6d2-8d11-4381-9e64-6693e2eaf9c4', 'f7565821-88fa-4204-91dc-56381f57bcdc', 2, NOW() - INTERVAL '6 day')
ON CONFLICT (id) DO NOTHING;

INSERT INTO fiche_sanitaire_animal (
    id,
    animal_id,
    url_document,
    type_document,
    valide_par,
    statut_validation,
    date_upload,
    date_validation
)
VALUES
    (
        'e58b8f16-34c3-4e24-b3a6-e913c9c1038f',
        '6b8294bb-431a-4d60-a39b-9acde7df0c41',
        '/api/files/sanitary-document/demo-fiche-vaccination-korhogo.pdf',
        'FICHE_VACCINATION',
        NULL,
        'EN_ATTENTE',
        NOW() - INTERVAL '2 day',
        NULL
    ),
    (
        '983f93cb-7307-4667-9ddb-784523f5f711',
        'f7565821-88fa-4204-91dc-56381f57bcdc',
        '/api/files/sanitary-document/demo-certificat-abidjan.pdf',
        'CERTIFICAT_VETERINAIRE',
        3,
        'VALIDE',
        NOW() - INTERVAL '5 day',
        NOW() - INTERVAL '1 day'
    )
ON CONFLICT (id) DO NOTHING;

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
VALUES
    (
        '0e6eb52c-35ba-4557-bf7a-ddb0d5b11a8b',
        '6b8294bb-431a-4d60-a39b-9acde7df0c41',
        2,
        'ENREGISTREMENT',
        'Lot de 12 bovins en attente de controle sanitaire ANADER.',
        9.4585,
        -5.6296,
        NOW() - INTERVAL '2 day',
        NULL
    ),
    (
        '3cdfc5b9-1b62-4ed2-9e4a-69e8ff6d53e3',
        'f7565821-88fa-4204-91dc-56381f57bcdc',
        2,
        'ENREGISTREMENT',
        'Chevre enregistree et transmise a l''agent ANADER.',
        5.3364,
        -4.0267,
        NOW() - INTERVAL '6 day',
        NULL
    ),
    (
        '734ec35a-b4fc-43a7-b54d-1c758652b4b6',
        'f7565821-88fa-4204-91dc-56381f57bcdc',
        3,
        'VISITE_VETERINAIRE',
        'Inspection physique realisee et certificat valide par l''agent ANADER.',
        5.3364,
        -4.0267,
        NOW() - INTERVAL '1 day',
        NULL
    ),
    (
        '38ba9f20-7fd6-44a9-9030-11140ca2d59d',
        'f7565821-88fa-4204-91dc-56381f57bcdc',
        3,
        'CHANGEMENT_STATUT',
        'Le statut sanitaire de l''animal est passe a DISPONIBLE.',
        5.3364,
        -4.0267,
        NOW() - INTERVAL '1 day',
        NULL
    )
ON CONFLICT (id) DO NOTHING;

SELECT setval('users_id_seq', (SELECT GREATEST(COALESCE(MAX(id), 1), 4) FROM users));
