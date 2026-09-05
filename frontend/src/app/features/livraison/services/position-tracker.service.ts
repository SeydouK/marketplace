// livraison/services/position-tracker.service.ts
import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LivraisonService, RelevePosition } from '../../../shared/services/livraison.service';

export interface EtatSuivi {
  actif: boolean;
  /** Dernière position acceptée par le navigateur. */
  latitude?: number;
  longitude?: number;
  precisionM?: number;
  vitesseKmh?: number;
  capDegres?: number;
  /** Cadence d'envoi retenue à l'instant, en secondes — affichée au livreur. */
  cadenceS?: number;
  /** Horodatage du dernier envoi réussi au serveur. */
  dernierEnvoi?: Date;
  /** Positions en attente parce que le réseau est tombé. */
  enAttente: number;
  erreur?: string;
}

/**
 * Transmet la position du livreur pendant un trajet.
 *
 * Trois contraintes de terrain gouvernent ce service :
 *
 * <ul>
 *   <li><strong>Les données coûtent cher.</strong> On n'envoie pas chaque point
 *       reçu du GPS — qui peut arriver plusieurs fois par seconde — mais au plus
 *       un toutes les {@link INTERVALLE_MS}.</li>
 *   <li><strong>Le réseau tombe.</strong> Sur la route, les coupures sont la
 *       règle. Une position non transmise est conservée et repartira, plutôt que
 *       d'être perdue.</li>
 *   <li><strong>L'écran s'éteint.</strong> Un verrou d'activation maintient
 *       l'onglet vivant tant que la livraison est en cours.</li>
 * </ul>
 */
@Injectable()
export class PositionTrackerService {
  /**
   * Cadence adaptée à l'allure, plutôt qu'un intervalle fixe.
   *
   * Un intervalle unique force un mauvais arbitrage : à 20 s, un véhicule lancé
   * parcourt 500 m entre deux points et le marqueur saute d'un bloc ; à l'arrêt,
   * la même cadence consomme forfait et batterie pour répéter la même position.
   *
   * On envoie donc souvent quand ça bouge vite, rarement quand ça ne bouge pas.
   */
  private static readonly CADENCE_RAPIDE_MS = 5_000;   // > 30 km/h : sur route
  private static readonly CADENCE_NORMALE_MS = 10_000; // en mouvement, en ville
  private static readonly CADENCE_ARRET_MS = 30_000;   // à l'arrêt ou au pas

  private static readonly SEUIL_RAPIDE_KMH = 30;
  private static readonly SEUIL_MOUVEMENT_KMH = 3;

  /** Au-delà, la position est trop imprécise pour être utile (tour cellulaire). */
  private static readonly PRECISION_MAX_M = 200;

  /** Plafond du tampon : au-delà, les points les plus anciens n'intéressent plus personne. */
  private static readonly TAMPON_MAX = 20;

  private readonly etatSujet = new BehaviorSubject<EtatSuivi>({ actif: false, enAttente: 0 });
  readonly etat$ = this.etatSujet.asObservable();

  private watchId?: number;
  private remiseId?: number;
  private dernierEnvoiMs = 0;
  private tampon: RelevePosition[] = [];
  private verrouEcran?: any;

  constructor(
    private livraisonService: LivraisonService,
    private zone: NgZone,
  ) {}

  get etat(): EtatSuivi {
    return this.etatSujet.value;
  }

  demarrer(remiseId: number): void {
    if (this.watchId !== undefined) return;

    if (!navigator.geolocation) {
      this.majEtat({ erreur: "Ce téléphone ne permet pas la géolocalisation." });
      return;
    }

    this.remiseId = remiseId;
    this.majEtat({ actif: true, erreur: undefined });
    this.verrouillerEcran();

    // Le callback vient hors de la zone Angular : sans run(), l'affichage ne
    // se rafraîchirait qu'au prochain événement utilisateur.
    this.watchId = navigator.geolocation.watchPosition(
      (pos) => this.zone.run(() => this.surPosition(pos)),
      (err) => this.zone.run(() => this.surErreur(err)),
      { enableHighAccuracy: true, maximumAge: 10_000, timeout: 30_000 },
    );

    window.addEventListener('online', this.viderTampon);
  }

  arreter(): void {
    if (this.watchId !== undefined) {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = undefined;
    }
    window.removeEventListener('online', this.viderTampon);
    this.libererEcran();
    this.majEtat({ actif: false });
  }

  // ── Réception ──────────────────────────────────────────────────────────────

  private surPosition(position: GeolocationPosition): void {
    const { latitude, longitude, accuracy, speed, heading } = position.coords;

    // speed vient en m/s, et vaut null quand le matériel ne la mesure pas.
    const vitesseKmh = speed != null && !isNaN(speed)
      ? Math.round(speed * 3.6 * 10) / 10
      : undefined;
    // heading n'a pas de sens à l'arrêt : le GPS y renvoie NaN ou une valeur figée.
    const capDegres = heading != null && !isNaN(heading) && (vitesseKmh ?? 0) > 1
      ? Math.round(heading * 10) / 10
      : undefined;

    const cadenceMs = this.cadence(vitesseKmh);

    this.majEtat({
      latitude, longitude,
      precisionM: Math.round(accuracy),
      vitesseKmh, capDegres,
      cadenceS: cadenceMs / 1000,
      erreur: undefined,
    });

    // Une position à 2 km près ferait sautiller le marqueur sur la carte de
    // l'acheteur sans rien lui apprendre.
    if (accuracy > PositionTrackerService.PRECISION_MAX_M) return;

    const maintenant = Date.now();
    if (maintenant - this.dernierEnvoiMs < cadenceMs) return;
    this.dernierEnvoiMs = maintenant;

    this.envoyer({
      latitude, longitude,
      vitesseKmh, capDegres,
      precisionM: Math.round(accuracy),
    });
  }

  /**
   * À quelle fréquence envoyer, vu l'allure actuelle.
   *
   * Sans vitesse mesurée, on retient la cadence normale : c'est le compromis, et
   * l'absence de mesure ne dit rien sur le fait qu'on roule ou non.
   */
  private cadence(vitesseKmh?: number): number {
    if (vitesseKmh == null) return PositionTrackerService.CADENCE_NORMALE_MS;
    if (vitesseKmh >= PositionTrackerService.SEUIL_RAPIDE_KMH) {
      return PositionTrackerService.CADENCE_RAPIDE_MS;
    }
    if (vitesseKmh >= PositionTrackerService.SEUIL_MOUVEMENT_KMH) {
      return PositionTrackerService.CADENCE_NORMALE_MS;
    }
    return PositionTrackerService.CADENCE_ARRET_MS;
  }

  private envoyer(releve: RelevePosition): void {
    if (!this.remiseId) return;

    this.livraisonService.envoyerPosition(this.remiseId, releve).subscribe({
      next: () => this.majEtat({ dernierEnvoi: new Date(), erreur: undefined }),
      error: (e) => {
        // Une session expiree ne se rattrape pas en reessayant : continuer
        // laisserait le livreur croire qu'il est suivi alors que plus rien ne
        // part. On arrete et on le dit.
        if (e?.status === 401) {
          this.arreter();
          this.majEtat({ erreur: 'Session expirée — reconnectez-vous pour reprendre le suivi.' });
          return;
        }
        this.mettreEnAttente(releve);
      },
    });
  }

  /**
   * Conserve une position que le réseau n'a pas laissée partir.
   *
   * Le tampon est borné : sur une coupure longue, les points anciens n'ont plus
   * d'intérêt — seule la position récente compte pour l'acheteur qui regarde.
   */
  private mettreEnAttente(releve: RelevePosition): void {
    this.tampon.push(releve);
    if (this.tampon.length > PositionTrackerService.TAMPON_MAX) {
      this.tampon.shift();
    }
    this.majEtat({
      enAttente: this.tampon.length,
      erreur: 'Réseau indisponible — position mise en attente.',
    });
  }

  /** À la reconnexion, seule la position la plus récente est envoyée. */
  private viderTampon = (): void => {
    const dernier = this.tampon[this.tampon.length - 1];
    this.tampon = [];
    this.majEtat({ enAttente: 0 });
    if (dernier) this.envoyer(dernier);
  };

  private surErreur(erreur: GeolocationPositionError): void {
    const messages: Record<number, string> = {
      1: "Autorisez la localisation pour que l'acheteur puisse vous suivre.",
      2: 'Position indisponible. Vérifiez que le GPS est activé.',
      3: 'Le GPS met trop de temps à répondre.',
    };
    this.majEtat({ erreur: messages[erreur.code] ?? 'Localisation impossible.' });
  }

  // ── Verrou d'écran ─────────────────────────────────────────────────────────

  /** Empêche la mise en veille pendant le trajet. Absent sur certains navigateurs. */
  private async verrouillerEcran(): Promise<void> {
    try {
      const wakeLock = (navigator as any).wakeLock;
      if (wakeLock?.request) {
        this.verrouEcran = await wakeLock.request('screen');
      }
    } catch {
      // Refusé ou non supporté : le suivi fonctionne, l'écran s'éteindra.
    }
  }

  private libererEcran(): void {
    try {
      this.verrouEcran?.release?.();
    } catch {
      // Sans conséquence.
    }
    this.verrouEcran = undefined;
  }

  private majEtat(partiel: Partial<EtatSuivi>): void {
    this.etatSujet.next({ ...this.etatSujet.value, ...partiel });
  }
}
