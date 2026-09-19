-- ─────────────────────────────────────────────────────────
-- V3.0.11 (dev) : définit un mot de passe connu pour les comptes
-- admin & vétérinaire de référence (créés en V3_0_10).
--
--   Mot de passe en clair : betailmarket@2026
--   Hash bcrypt (strength 10) compatible Spring Security.
--
-- Écrase le hash précédent (hérité du seed d'origine).
-- ─────────────────────────────────────────────────────────

UPDATE users
SET password = '$2b$10$LqA0rJtv3F7NkKbAAhcg8OvMovUkDVTLL.Cb3moNaGweGdCJeJDXi'
WHERE email IN ('abfly84@gmail.com', 'inconitoinconito311@gmail.com');
