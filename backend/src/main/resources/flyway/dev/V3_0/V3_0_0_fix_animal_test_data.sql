-- ─────────────────────────────────────────────────────────
-- Correction des données de test
-- Ajoute region, ville et owner_id aux animaux existants
-- ─────────────────────────────────────────────────────────

-- Vendeur de test = user id=2 (Test User, role USER)
-- Agent ANADER   = user id=5 (kabore)

UPDATE animal SET
    region   = 'ABIDJAN',
    ville    = 'Abidjan',
    owner_id = 2
WHERE qr_code = 'LEGACY-1';

UPDATE animal SET
    region   = 'GBÊKÊ',
    ville    = 'Bouaké',
    owner_id = 2
WHERE qr_code = 'LEGACY-2';

UPDATE animal SET
    region   = 'PORO',
    ville    = 'Korhogo',
    owner_id = 2
WHERE qr_code = 'LEGACY-3';

UPDATE animal SET
    region   = 'TCHOLOGO',
    ville    = 'Ferkessédougou',
    owner_id = 2
WHERE qr_code = 'LEGACY-4';

UPDATE animal SET
    region   = 'MARAHOUÉ',
    ville    = 'Yamoussoukro',
    owner_id = 2
WHERE qr_code = 'LEGACY-5';

UPDATE animal SET
    region   = 'PORO',
    ville    = 'Korhogo',
    owner_id = 2
WHERE qr_code = 'POC-KORHOGO-0001';

UPDATE animal SET
    region   = 'ABIDJAN',
    ville    = 'Abidjan',
    owner_id = 2
WHERE qr_code = 'POC-ABIDJAN-0002';

-- Vérification
SELECT qr_code, statut, rfid_tag, region, ville, owner_id
FROM animal
ORDER BY qr_code;