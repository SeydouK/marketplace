INSERT INTO listings (
    user_id,
    title,
    description,
    animal_type,
    price,
    location,
    seller_name,
    seller_phone,
    image,
    rating,
    age_months,
    breed,
    status
)
VALUES
    (2, 'Mouton tabaski de qualite', 'Mouton en bonne sante pret pour la vente.', 'mouton', 180000.00, 'Abidjan', 'Test User', '+225 07 07 07 07', 'https://placehold.co/640x480/e7dbc2/5f4b32?text=Mouton', 4.8, 14, 'Tabaski', 'DISPONIBLE'),
    (2, 'Boeuf zebu excellent etat', 'Boeuf robuste pour elevage ou boucherie.', 'boeuf', 650000.00, U&'Bouak\00E9', 'Test User', '+225 07 07 07 07', 'https://placehold.co/640x480/d8c3a5/4f372d?text=Boeuf', 4.6, 30, 'Zebu', 'DISPONIBLE'),
    (2, 'Poulets fermiers plein air', 'Lot de poulets fermiers nourris au grain.', 'poulet', 7000.00, 'Korhogo', 'Test User', '+225 07 07 07 07', 'https://placehold.co/640x480/f0e0b5/785b28?text=Poulet', 4.4, 6, 'Fermier', 'RESERVE'),
    (2, 'Porc large white pret a livrer', 'Porc eleve dans de bonnes conditions.', 'porc', 120000.00, U&'Ferkess\00E9dougou', 'Test User', '+225 07 07 07 07', 'https://placehold.co/640x480/f1d5d8/8a4d57?text=Porc', 4.5, 10, 'Large White', 'DISPONIBLE'),
    (2, 'Chevre sahelienne en bonne sante', 'Chevre jeune et active disponible immediatement.', 'chevre', 55000.00, 'Yamoussoukro', 'Test User', '+225 07 07 07 07', 'https://placehold.co/640x480/e7e3d6/5b5347?text=Chevre', 4.2, 8, 'Sahelienne', 'VENDU');

SELECT setval('listings_id_seq', (SELECT MAX(id) FROM listings));
