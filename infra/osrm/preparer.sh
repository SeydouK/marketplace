#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# Prepare les donnees OSRM pour la Cote d'Ivoire.
#
# A lancer AVANT le premier `docker compose up`, puis a chaque mise a jour des
# donnees OpenStreetMap (une fois par mois suffit : le reseau routier bouge
# lentement, mais les nouvelles voies d'Abidjan finissent par compter).
#
# Duree : quelques minutes sur l'extrait ivoirien. Prevoir ~2 Go de disque.
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

VERSION="v5.27.1"
IMAGE="ghcr.io/project-osrm/osrm-backend:${VERSION}"
EXTRAIT="cote-divoire-latest.osm.pbf"
SOURCE="https://download.geofabrik.de/africa/ivory-coast-latest.osm.pbf"
DATA="$(cd "$(dirname "$0")" && pwd)/data"

mkdir -p "$DATA"

# 1. Recuperer l'extrait. Geofabrik regenere les siens chaque nuit.
if [ ! -f "$DATA/$EXTRAIT" ]; then
  echo "→ Telechargement de l'extrait Cote d'Ivoire…"
  curl -fL --progress-bar -o "$DATA/$EXTRAIT" "$SOURCE"
else
  echo "→ Extrait deja present. Le supprimer pour forcer un rafraichissement."
fi

lancer() { docker run --rm -t -v "$DATA:/data" "$IMAGE" "$@"; }

# 2. Extraire le graphe routier avec le profil voiture.
#    car.lua porte les regles : sens interdits, vitesses par type de voie,
#    restrictions de tournage. C'est le profil qui fait la difference entre un
#    itineraire praticable et une ligne sur une carte.
echo "→ osrm-extract…"
lancer osrm-extract -p /opt/car.lua "/data/$EXTRAIT"

# 3. Partitionner puis personnaliser — les deux etapes du mode MLD.
#    Une mise a jour de peages ou de vitesses ne demande de rejouer que
#    osrm-customize, qui prend quelques secondes.
echo "→ osrm-partition…"
lancer osrm-partition "/data/cote-divoire-latest.osrm"
echo "→ osrm-customize…"
lancer osrm-customize "/data/cote-divoire-latest.osrm"

echo
echo "✓ Donnees pretes. Lancer : docker compose up -d"
echo "  Puis pointer environment.carte.osrm sur http://localhost:5000"
