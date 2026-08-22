# Calcul d'itinéraire auto-hébergé

## Pourquoi

L'application appelle deux services externes pour ses cartes :

| Usage | Service par défaut | Statut |
|---|---|---|
| Itinéraires et recalage | `router.project-osrm.org` | Démonstration — usage en production **découragé par le projet** |
| Fonds de carte | `tile.openstreetmap.org` | Soumis à une [politique d'usage](https://operations.osmfoundation.org/policies/tiles/) qui **exclut les applications à trafic soutenu** |

Les deux tiennent tant que la charge reste anecdotique. Ils ne tiendront pas
au-delà, et l'échec ne sera pas progressif : un blocage coupe la carte pour
tout le monde, sans préavis.

Ce dossier traite le premier. Le second demande une décision séparée, exposée
plus bas.

## Ce que cela change dans le code

Rien. Les deux adresses viennent de `frontend/src/environments/environment*.ts`,
sous la clé `carte`. Basculer, c'est changer une valeur :

```ts
carte: {
  osrm: 'http://localhost:5000',   // au lieu de https://router.project-osrm.org
  ...
}
```

## Mise en place

```bash
cd infra/osrm
./preparer.sh          # télécharge l'extrait ivoirien et compile le graphe
docker compose up -d
```

`preparer.sh` est à rejouer à chaque mise à jour des données OpenStreetMap.
Une fois par mois suffit : le réseau routier bouge lentement, mais les
nouvelles voies d'Abidjan finissent par compter.

Vérifier que le service répond :

```bash
curl 'http://localhost:5000/route/v1/driving/-4.0083,5.3364;-3.9962,5.3199?overview=false'
```

Une réponse `{"code":"Ok",...}` signifie que les données sont chargées, pas
seulement que le processus tourne.

## Dimensionnement

L'extrait Côte d'Ivoire est petit à l'échelle d'OSRM :

- téléchargement : ~50 Mo
- graphe compilé : ~400 Mo sur disque
- mémoire à l'exécution : bien en dessous de la limite de 2 Go du compose
- préparation : quelques minutes

Un conteneur suffit. La question du dimensionnement ne se pose pas avant
plusieurs dizaines de livraisons simultanées.

## Exposition réseau

Le port est publié sur `127.0.0.1` uniquement, **et c'est délibéré**. OSRM n'a
ni authentification ni limitation de débit : l'exposer sur l'extérieur revient
à offrir un service de calcul à qui le trouve. Le frontend étant un navigateur,
il ne peut pas atteindre la boucle locale du serveur — il faut donc un
mandataire inverse qui :

1. expose un chemin dédié (`/osrm/`) sur le domaine de l'API ;
2. limite le débit par adresse ;
3. n'autorise que `GET` sur `/route/` et `/match/`.

Sans ces trois points, l'auto-hébergement remplace une dépendance fragile par
une porte ouverte.

## Fonds de carte : la décision qui reste

Le serveur de tuiles n'est pas traité ici, parce que l'auto-héberger est d'un
autre ordre de grandeur : le rendu mondial demande plusieurs centaines de Go et
une base PostGIS, hors de proportion avec le besoin.

Trois options réalistes, par ordre de coût croissant :

1. **Un fournisseur avec palier gratuit** — MapTiler, Stadia, Jawg, Protomaps.
   Quelques milliers à quelques dizaines de milliers de tuiles par mois sans
   frais, une clé à poser dans `environment.carte.tuiles.url`. C'est le
   changement le plus faible pour le risque supprimé.
2. **Des tuiles vectorielles servies depuis un fichier PMTiles** de l'Afrique
   de l'Ouest, posé sur le stockage objet déjà en place. Pas de serveur à tenir,
   mais un changement de bibliothèque de rendu côté client.
3. **Un rendu raster auto-hébergé**, seulement si le trafic le justifie un jour.

Tant que la décision n'est pas prise, l'attribution OpenStreetMap doit rester
visible sur chaque carte : la licence ODbL l'exige, et elle s'applique aux
données quelle que soit la source des tuiles.
