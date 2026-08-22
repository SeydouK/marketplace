// livraison/services/itineraire.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { SKIP_GLOBAL_ERROR } from '../../../core/interceptors/error.interceptor';
import { environment } from '../../../../environments/environment';

/** Une consigne de navigation, telle qu'on l'affiche au livreur. */
export interface Etape {
  /** « Tournez à droite sur la rue des Jardins » */
  instruction: string;
  /** Longueur du tronçon menant à cette manœuvre, en mètres. */
  distanceM: number;
  /** Icône de manœuvre : gauche, droite, tout droit, arrivée… */
  manoeuvre: string;
  /**
   * Où la manœuvre a lieu.
   *
   * Sans elle, impossible de savoir laquelle des consignes est la prochaine :
   * on afficherait indéfiniment « Départ », y compris à trois kilomètres de là.
   */
  position: [number, number];
}

export interface Itineraire {
  /** Le tracé de la route, en points [lat, lng] — prêt pour une polyligne. */
  points: [number, number][];
  distanceM: number;
  dureeS: number;
  etapes: Etape[];
  /**
   * Numéro d'ordre du calcul.
   *
   * Deux recalculs peuvent se chevaucher — un lancé sur sortie d'itinéraire,
   * l'autre déjà en vol. Sans numéro, la réponse la plus lente écraserait la
   * plus récente et renverrait le livreur sur la route qu'il vient de quitter.
   */
  version: number;
}

/**
 * Calcul d'itinéraire routier.
 *
 * <p>Appuyé sur OSRM, adossé aux données OpenStreetMap : aucune clé, aucun quota
 * facturé, et cohérent avec les fonds de carte déjà utilisés. Une API Google
 * Directions donnerait de meilleurs temps de trajet mais deviendrait payante dès
 * les premiers volumes.
 *
 * <p><strong>Limite à connaître :</strong> le serveur public d'OSRM est une
 * démonstration, sans garantie de disponibilité ni de débit, et son usage en
 * production est découragé par le projet lui-même. L'adresse vient donc de
 * l'environnement : basculer sur une instance auto-hébergée est un changement de
 * configuration, pas de code (infra/osrm/README.md). Et l'échec du calcul
 * n'empêche jamais la livraison — l'adresse et les repères y suffisent.
 */
@Injectable({ providedIn: 'root' })
export class ItineraireService {
  /** Adresse du serveur, pilotée par l'environnement — voir infra/osrm/README.md. */
  private static readonly OSRM_BASE = environment.carte.osrm.replace(/\/+$/, '');
  private static readonly OSRM = `${ItineraireService.OSRM_BASE}/route/v1/driving`;
  private static readonly OSRM_MATCH = `${ItineraireService.OSRM_BASE}/match/v1/driving`;

  /**
   * Plafond de points par recalage.
   *
   * OSRM refuse les demandes trop longues sur son serveur public. Au-delà, on
   * ne garde que la fin du parcours : c'est la portion que l'on regarde.
   */
  private static readonly POINTS_RECALAGE_MAX = 100;

  private version = 0;

  constructor(private http: HttpClient) {}

  calculer(
    depart: [number, number],
    arrivee: [number, number],
  ): Observable<Itineraire> {
    // OSRM attend longitude,latitude — l'inverse de la convention habituelle.
    const de = `${depart[1]},${depart[0]}`;
    const vers = `${arrivee[1]},${arrivee[0]}`;
    const version = ++this.version;

    return this.http
      .get<any>(
        `${ItineraireService.OSRM}/${de};${vers}` +
          '?overview=full&geometries=geojson&steps=true&annotations=false',
        { context: new HttpContext().set(SKIP_GLOBAL_ERROR, true) },
      )
      .pipe(map((reponse) => this.convertir(reponse, version)));
  }

  /**
   * Recale un parcours brut sur le réseau routier.
   *
   * <p>Les points GPS tombent rarement pile sur la chaussée : ils dérivent de
   * quelques mètres, traversent un pâté de maisons, coupent un carrefour en
   * diagonale. Tracés tels quels, ils donnent une ligne qui zigzague à travers
   * les bâtiments — l'acheteur y voit du bruit là où il y a eu un trajet.
   *
   * <p>Le service de recalage d'OSRM rattache chaque point à la route la plus
   * plausible, en tenant compte de l'enchaînement. Le résultat suit les rues.
   *
   * <p>Purement cosmétique : en cas d'échec, le parcours brut reste affichable,
   * et c'est ce que fait l'appelant.
   */
  recaler(points: [number, number][]): Observable<[number, number][]> {
    const retenus = points.slice(-ItineraireService.POINTS_RECALAGE_MAX);
    const coordonnees = retenus.map((p) => `${p[1]},${p[0]}`).join(';');

    return this.http
      .get<any>(
        `${ItineraireService.OSRM_MATCH}/${coordonnees}` +
          '?geometries=geojson&overview=full&tidy=true',
        { context: new HttpContext().set(SKIP_GLOBAL_ERROR, true) },
      )
      .pipe(
        map((reponse) => {
          // OSRM découpe en « matchings » dès qu'il perd le fil — un tunnel, un
          // arrêt prolongé. On les remet bout à bout dans l'ordre.
          const segments: [number, number][] = [];
          for (const m of reponse?.matchings ?? []) {
            for (const c of m.geometry?.coordinates ?? []) {
              segments.push([c[1], c[0]]);
            }
          }
          if (!segments.length) throw new Error('Recalage sans résultat');
          return segments;
        }),
      );
  }

  private convertir(reponse: any, version: number): Itineraire {
    const route = reponse?.routes?.[0];
    if (!route) throw new Error('Aucun itinéraire trouvé');

    const etapes: Etape[] = (route.legs?.[0]?.steps ?? []).map((s: any) => {
      const l = s.maneuver?.location ?? [0, 0];
      return {
        instruction: this.formuler(s),
        distanceM: Math.round(s.distance ?? 0),
        manoeuvre: s.maneuver?.modifier ?? s.maneuver?.type ?? 'straight',
        position: [l[1], l[0]] as [number, number],
      };
    });

    return {
      version,
      // GeoJSON donne [lng, lat] : on rétablit l'ordre attendu par Leaflet.
      points: (route.geometry?.coordinates ?? []).map(
        (c: number[]) => [c[1], c[0]] as [number, number],
      ),
      distanceM: Math.round(route.distance ?? 0),
      dureeS: Math.round(route.duration ?? 0),
      etapes,
    };
  }

  /**
   * Formule une consigne en français.
   *
   * OSRM renvoie un type de manœuvre et un nom de voie, pas une phrase. La
   * traduction est faite ici pour que le livreur lise une instruction, et non
   * un code technique.
   */
  private formuler(step: any): string {
    const voie = step.name ? ` sur ${step.name}` : '';
    const type = step.maneuver?.type;
    const modifier = step.maneuver?.modifier;

    if (type === 'depart') return `Départ${voie}`;
    if (type === 'arrive') return "Vous êtes arrivé à destination";
    if (type === 'roundabout' || type === 'rotary') {
      const sortie = step.maneuver?.exit;
      return sortie ? `Au rond-point, prenez la ${sortie}e sortie${voie}` : `Au rond-point${voie}`;
    }
    if (type === 'merge') return `Rejoignez la voie${voie}`;

    switch (modifier) {
      case 'left': return `Tournez à gauche${voie}`;
      case 'right': return `Tournez à droite${voie}`;
      case 'slight left': return `Serrez à gauche${voie}`;
      case 'slight right': return `Serrez à droite${voie}`;
      case 'sharp left': return `Tournez franchement à gauche${voie}`;
      case 'sharp right': return `Tournez franchement à droite${voie}`;
      case 'uturn': return `Faites demi-tour${voie}`;
      default: return `Continuez tout droit${voie}`;
    }
  }

  /** « 1,2 km » ou « 350 m » — ce qu'on lit sur un panneau. */
  formaterDistance(metres: number): string {
    return metres >= 1000
      ? `${(metres / 1000).toFixed(1).replace('.', ',')} km`
      : `${Math.round(metres)} m`;
  }

  /** « 1 h 25 » ou « 12 min ». */
  formaterDuree(secondes: number): string {
    const minutes = Math.round(secondes / 60);
    if (minutes < 60) return `${minutes} min`;
    const h = Math.floor(minutes / 60);
    return `${h} h ${(minutes % 60).toString().padStart(2, '0')}`;
  }
}
