-- Migrer les utilisateurs ADMINISTRATEUR vers ADMIN avant de supprimer le rôle
UPDATE users SET role = 'ADMIN' WHERE role = 'ADMINISTRATEUR';
UPDATE users SET role = 'ACHETEUR'      WHERE role = 'USER';
UPDATE users SET role = 'ANADER'        WHERE role = 'AGENT_ANADER';
UPDATE users SET role = 'ADMIN'         WHERE role = 'ADMINISTRATEUR';