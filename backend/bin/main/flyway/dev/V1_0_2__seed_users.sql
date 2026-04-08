INSERT INTO users (id, name, email, password, role)
VALUES
    (1, 'Admin Marketplace', 'admin@marketplace.local', '$2y$10$8rcGDEtLuz0SMtoLZ4XmQO22WeYTH36klbn.PEqglcMJ90coYsFI6', 'ADMIN'),
    (2, 'Test User', 'test@example.com', '$2y$10$8rcGDEtLuz0SMtoLZ4XmQO22WeYTH36klbn.PEqglcMJ90coYsFI6', 'USER');

SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));
