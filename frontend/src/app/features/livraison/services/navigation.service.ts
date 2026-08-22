// livraison/services/navigation.service.ts
import { Injectable } from '@angular/core';

export type Point = [number, number];

/**
 * La géométrie dont la navigation a besoin.
 *
 * <p>Regroupée ici, hors de tout composant, pour deux raisons : ces calculs se
 * vérifient au cas par cas alors qu'un composant ne se vérifie qu'à l'écran, et
 * ils servent à la fois au livreur qui navigue et à l'acheteur qui regarde.
 *
 * <p>Toutes les distances sont en mètres. Aux échelles concernées — quelques
 * centaines de mètres autour d'un véhicule — la Terre est traitée comme plate.
 * Vérifié contre une haversine : moins d'un mètre d'écart sur 500 m, 13 m sur
 * 12 km, pour un seuil de décision fixé à 40 m. La formule est en revanche bien
 * plus rapide, et elle s'applique à chaque segment de l'itinéraire à chaque
 * relevé.
 */
@Injectable({ providedIn: 'root' })
export class NavigationService {

  /** Un degré de latitude, en mètres. Constant partout sur le globe. */
  private static readonly METRES_PAR_DEGRE = 111_320;

  /**
   * Distance entre deux points.
   *
   * L'écart en longitude rétrécit avec la latitude — à Abidjan (5° N) un degré
   * de longitude vaut encore 99 % d'un degré de latitude, mais la correction
   * coûte un cosinus et évite un biais systématique.
   */
  distanceM(a: Point, b: Point): number {
    const dLat = (b[0] - a[0]) * NavigationService.METRES_PAR_DEGRE;
    const dLon = (b[1] - a[1]) * NavigationService.METRES_PAR_DEGRE
      * Math.cos(((a[0] + b[0]) / 2) * Math.PI / 180);
    return Math.hypot(dLat, dLon);
  }

  /**
   * À quelle distance ce point se trouve-t-il de l'itinéraire ?
   *
   * <p>Mesurée par rapport aux <em>segments</em>, pas aux sommets. Comparer aux
   * seuls sommets donnerait des écarts fantaisistes sur une ligne droite : entre
   * deux sommets distants de 800 m, un véhicule parfaitement sur la route
   * paraîtrait à 400 m de l'itinéraire.
   *
   * @returns la distance au segment le plus proche, ou Infinity si l'itinéraire
   *          est vide — un itinéraire absent ne permet de conclure à rien.
   */
  distanceAuTraceM(point: Point, trace: Point[]): number {
    if (!trace.length) return Infinity;
    if (trace.length === 1) return this.distanceM(point, trace[0]);

    let minimum = Infinity;
    for (let i = 0; i < trace.length - 1; i++) {
      const d = this.distanceAuSegmentM(point, trace[i], trace[i + 1]);
      if (d < minimum) minimum = d;
    }
    return minimum;
  }

  /** Projection orthogonale du point sur le segment, bornée à ses extrémités. */
  private distanceAuSegmentM(p: Point, a: Point, b: Point): number {
    const cos = Math.cos((a[0] * Math.PI) / 180);

    // Passage en mètres locaux : la projection n'a de sens que sur un plan.
    const px = (p[1] - a[1]) * cos, py = p[0] - a[0];
    const bx = (b[1] - a[1]) * cos, by = b[0] - a[0];

    const carre = bx * bx + by * by;
    // Segment dégénéré (deux sommets confondus) : on retombe sur une distance
    // point à point plutôt que de diviser par zéro.
    if (carre === 0) return this.distanceM(p, a);

    // t borné à [0,1] : au-delà, le pied de la perpendiculaire tomberait hors
    // du segment, et c'est l'extrémité qui est le point le plus proche.
    const t = Math.max(0, Math.min(1, (px * bx + py * by) / carre));
    const dx = px - t * bx, dy = py - t * by;
    return Math.hypot(dx, dy) * NavigationService.METRES_PAR_DEGRE;
  }

  /**
   * Indice du premier sommet situé <em>devant</em> le point.
   *
   * <p>Sert à ne montrer que ce qui reste à parcourir. La tentation est de
   * chercher le sommet le plus proche — c'est faux, et de façon visible : entre
   * deux sommets éloignés, le plus proche peut se trouver <strong>derrière</strong>
   * le véhicule. La distance restante augmente alors alors qu'on avance, et
   * l'heure d'arrivée recule.
   *
   * <p>On cherche donc le <em>segment</em> sur lequel le véhicule se trouve, et
   * on repart de son extrémité aval. Même distinction que pour la détection de
   * sortie d'itinéraire : les sommets mentent, les segments non.
   *
   * @returns un indice utilisable tel quel dans un slice()
   */
  indexDevant(point: Point, trace: Point[]): number {
    if (trace.length < 2) return 0;

    let segment = 0;
    let minimum = Infinity;
    for (let i = 0; i < trace.length - 1; i++) {
      const d = this.distanceAuSegmentM(point, trace[i], trace[i + 1]);
      if (d < minimum) {
        minimum = d;
        segment = i;
      }
    }
    // L'extremite aval du segment courant : le sommet i est derriere nous.
    return segment + 1;
  }

  /**
   * Longueur cumulée d'une suite de points, en mètres.
   *
   * Sert à mesurer ce qu'il reste de route devant le véhicule. Une distance à
   * vol d'oiseau sous-estime toujours, et d'autant plus que le trajet contourne
   * — un fleuve, une lagune, et l'écart double.
   */
  longueurM(points: Point[]): number {
    let total = 0;
    for (let i = 1; i < points.length; i++) {
      total += this.distanceM(points[i - 1], points[i]);
    }
    return total;
  }

  /**
   * Cap de a vers b, en degrés depuis le nord.
   *
   * Utile quand le GPS ne fournit pas de cap — matériel bas de gamme, ou
   * position issue du réseau plutôt que du satellite : deux points successifs
   * suffisent alors à déduire la direction.
   */
  cap(a: Point, b: Point): number {
    const φ1 = (a[0] * Math.PI) / 180, φ2 = (b[0] * Math.PI) / 180;
    const Δλ = ((b[1] - a[1]) * Math.PI) / 180;
    const y = Math.sin(Δλ) * Math.cos(φ2);
    const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
    return (((Math.atan2(y, x) * 180) / Math.PI) + 360) % 360;
  }
}
