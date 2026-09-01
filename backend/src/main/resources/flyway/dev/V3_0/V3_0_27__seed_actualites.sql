-- ─────────────────────────────────────────────────────────────────────────────
-- Reprise des cinq articles qui vivaient en dur dans le service Angular.
--
-- Les basculer en base plutot que de les perdre : ce sont les seuls contenus
-- qu'ait jamais affiches l'onglet, ils servent de reference de mise en forme a
-- l'administrateur qui redigera le sixieme, et ils evitent d'ouvrir la
-- rubrique sur une page vide.
--
-- Les dates sont relatives a l'execution, comme elles l'etaient dans le code
-- (Date.now() - n jours). Une date absolue aurait fige la rubrique dans un
-- passe mort des la premiere installation, et la pastille « NOUVEAU » n'aurait
-- jamais pu etre vue a l'oeuvre.
--
-- Anti-jointure sur le titre plutot qu'un ON CONFLICT : la table n'a pas de
-- contrainte d'unicite sur le titre — deux annonces peuvent legitimement
-- porter le meme intitule a un an d'intervalle — mais rejouer cette migration
-- ne doit pas dupliquer le jeu initial.
-- ─────────────────────────────────────────────────────────────────────────────

INSERT INTO actualites (titre, resume, contenu, categorie, auteur, date_publication, publiee)
SELECT v.titre, v.resume, v.contenu, v.categorie, v.auteur,
       NOW() - (v.jours || ' days')::INTERVAL, TRUE
FROM (VALUES
(
  $t$Alerte : Foyer de fièvre aphteuse signalé dans la région de Korhogo$t$,
  $r$Les services vétérinaires du MIRAH signalent un foyer de fièvre aphteuse affectant des bovins dans plusieurs villages de la sous-préfecture de Korhogo. Les éleveurs sont invités à la vigilance.$r$,
  $c$Les services vétérinaires du Ministère des Ressources Animales et Halieutiques (MIRAH) ont confirmé la présence d'un foyer de fièvre aphteuse dans la région du Poro, précisément dans plusieurs villages de la sous-préfecture de Korhogo.

Les animaux affectés présentent des lésions buccales, une hypersalivation et une boiterie marquée. Le MIRAH a mis en place un périmètre de surveillance et des équipes de vaccination d'urgence ont été déployées sur le terrain.

**Recommandations pour les éleveurs :**
- Éviter tout déplacement de bovins depuis ou vers les zones identifiées
- Signaler immédiatement tout animal présentant des symptômes suspects au service vétérinaire local
- S'assurer que les animaux sont à jour de leurs vaccinations

Contact MIRAH Korhogo : +225 36 86 XX XX$c$,
  $g$SANTE_ANIMALE$g$, $a$Équipe BétailMarket$a$, 1
),
(
  $t$Prix du bétail : la demande monte à l'approche de la Tabaski$t$,
  $r$Comme chaque année, le marché du bétail s'anime fortement à l'approche de la fête de l'Aïd el-Kébir. Les prix des ovins connaissent une hausse de 15 à 25 % sur les marchés d'Abidjan.$r$,
  $c$À deux semaines de la Tabaski (Aïd el-Kébir), les marchés à bétail d'Abidjan et des grandes villes de Côte d'Ivoire enregistrent une forte affluence. Les prix des moutons, particulièrement les races Djallonké et Peulh, sont en hausse significative.

**Relevé de prix observés sur le marché d'Abobo-gare :**
- Mouton Djallonké (20-30 kg) : 75 000 - 120 000 FCFA
- Mouton Peulh (30-45 kg) : 130 000 - 200 000 FCFA
- Bélier de prestige (plus de 50 kg) : 250 000 - 400 000 FCFA

Les éleveurs du nord (Korhogo, Ferkessédougou) anticipent une forte demande et organisent des convois vers Abidjan dès cette semaine. Les acheteurs sont conseillés de ne pas attendre les derniers jours pour éviter la pression tarifaire.$c$,
  $g$MARCHE$g$, $a$Équipe BétailMarket$a$, 3
),
(
  $t$Bien nourrir ses bovins en saison sèche : les conseils de nos vétérinaires$t$,
  $r$La saison sèche est une période critique pour l'alimentation du bétail. Voici les pratiques recommandées pour maintenir la condition corporelle de vos animaux et prévenir les pertes.$r$,
  $c$La saison sèche représente un défi majeur pour les éleveurs de bovins en Côte d'Ivoire. La raréfaction des pâturages naturels expose les animaux à des carences nutritionnelles qui affectent leur productivité, leur immunité et leur valeur marchande.

**Stratégies d'alimentation recommandées :**

**1. La complémentation alimentaire**
Distribuez des sous-produits agro-industriels disponibles localement : son de riz, tourteau de coton, drèches de brasserie. Ces aliments sont riches en énergie et protéines à coût réduit.

**2. La fenaison et l'ensilage**
Constituez des réserves fourragères en saison des pluies. Le foin de Brachiaria et le maïs ensilé permettent de traverser la saison sèche sans pertes de poids excessives.

**3. L'abreuvement**
Un bovin adulte consomme entre 30 et 50 litres d'eau par jour. Assurez un accès permanent à une eau propre : la déshydratation est souvent la première cause de baisse de production.

**4. La complémentation minérale**
Le manque de phosphore et de calcium est fréquent en saison sèche. Des blocs à lécher (pierres à sel enrichies) placés dans les enclos corrigent ces déficits à faible coût.$c$,
  $g$ELEVAGE$g$, $a$Dr Kouamé Yao, Vétérinaire$a$, 7
),
(
  $t$Nouvelle réglementation : obligations sanitaires pour le transport inter-régional de bétail$t$,
  $r$Le MIRAH a mis à jour les textes régissant le transport d'animaux vivants entre les régions. Le laissez-passer sanitaire devient obligatoire pour tout lot de plus de 5 têtes.$r$,
  $c$Le Ministère des Ressources Animales et Halieutiques (MIRAH) a publié un décret qui renforce les obligations sanitaires liées au transport inter-régional d'animaux d'élevage en Côte d'Ivoire.

**Principales dispositions :**

**Laissez-passer sanitaire obligatoire**
Tout lot de plus de 5 têtes (bovins, ovins, caprins) doit être accompagné d'un laissez-passer sanitaire délivré par un vétérinaire ou un agent de l'élevage agréé. Ce document doit mentionner : l'origine du troupeau, le nombre et l'espèce des animaux, l'état sanitaire général, les vaccinations réalisées dans les 30 jours précédents.

**Contrôles renforcés aux barrières**
Des points de contrôle vétérinaire sont désormais opérationnels sur les axes Abidjan-Bouaké, Bouaké-Korhogo et Abidjan-Daloa. Les camions transportant du bétail sans laissez-passer peuvent être interceptés et les animaux mis en quarantaine.

**Sanctions**
Les infractions sont passibles d'une amende de 50 000 à 500 000 FCFA selon la gravité.$c$,
  $g$REGLEMENTATION$g$, $a$Équipe BétailMarket$a$, 14
),
(
  $t$Vaccination Newcastle : programme gratuit pour les aviculteurs de la région des Lagunes$t$,
  $r$L'ANADER et le MIRAH lancent une campagne de vaccination gratuite contre la maladie de Newcastle pour les petits aviculteurs de la région des Lagunes.$r$,
  $c$Dans le cadre du Programme National de Développement de l'Aviculture Villageoise (PNDAV), l'ANADER en partenariat avec le MIRAH organise une campagne de vaccination gratuite contre la maladie de Newcastle, très contagieuse et souvent mortelle pour la volaille.

**Qui est concerné ?**
Tous les aviculteurs de la région des Lagunes disposant d'un effectif inférieur à 500 sujets (poules, pintades, dindes, canards).

**Où et quand se faire vacciner ?**
Les équipes mobiles se déplaceront dans les sous-préfectures selon le calendrier suivant :
- Semaine 1 : Songon, Jacqueville, Grand-Lahou
- Semaine 2 : Dabou, Tiassalé
- Semaine 3 : Aboisso, Adiaké
- Semaine 4 : sessions de rattrapage sur demande

**Comment bénéficier du programme ?**
Contacter votre antenne ANADER locale ou vous inscrire directement auprès des équipes sur le terrain. Aucun document spécial n'est requis.$c$,
  $g$CONSEIL$g$, $a$ANADER Côte d'Ivoire$a$, 20
)
) AS v(titre, resume, contenu, categorie, auteur, jours)
WHERE NOT EXISTS (SELECT 1 FROM actualites a WHERE a.titre = v.titre);
