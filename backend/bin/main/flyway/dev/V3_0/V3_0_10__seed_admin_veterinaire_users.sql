-- ─────────────────────────────────────────────────────────
-- V3.0.8 (dev) : comptes admin & vétérinaire de référence
--   • Admin       : ALI KOFFI ANSELME  — abfly84@gmail.com
--   • Vétérinaire : TOKPA HERVE        — inconitoinconito311@gmail.com
--
-- Mot de passe identique aux autres comptes de seed (même hash bcrypt
-- que admin@marketplace.local). ON CONFLICT pour rester ré-exécutable.
-- ─────────────────────────────────────────────────────────

INSERT INTO users (name, surname, email, password, role,
                   email_verified, verified, kyc_status, badge_verifie)
VALUES
    ('ALI KOFFI ANSELME', 'Administrateur',
     'abfly84@gmail.com',
     '$2y$10$8rcGDEtLuz0SMtoLZ4XmQO22WeYTH36klbn.PEqglcMJ90coYsFI6',
     'ADMIN', TRUE, TRUE, 'VALIDATED', TRUE),

    ('TOKPA HERVE', 'Vétérinaire',
     'inconitoinconito311@gmail.com',
     '$2y$10$8rcGDEtLuz0SMtoLZ4XmQO22WeYTH36klbn.PEqglcMJ90coYsFI6',
     'VETERINAIRE', TRUE, TRUE, 'VALIDATED', TRUE)
ON CONFLICT (email) DO NOTHING;

-- Garde la séquence d'id cohérente après insertion
SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));
