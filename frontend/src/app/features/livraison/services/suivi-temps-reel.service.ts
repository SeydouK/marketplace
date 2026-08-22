// livraison/services/suivi-temps-reel.service.ts
import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { Client, IMessage, StompSubscription } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { StorageService } from '../../../core/services/storage.service';

/** Une position poussée par le serveur, telle qu'elle arrive sur le canal. */
export interface PositionLivreur {
  remiseId: number;
  latitude: number;
  longitude: number;
  vitesseKmh?: number;
  capDegres?: number;
  precisionM?: number;
  mesureeLe: string;
}

/**
 * Reçoit les positions du livreur au fil de l'eau.
 *
 * <p>Remplace le sondage : au lieu de redemander « où en est-il ? » toutes les
 * quinze secondes — le plus souvent pour s'entendre répondre « au même endroit
 * qu'avant » —, on ouvre un canal et le serveur pousse chaque point à l'instant
 * où il arrive. L'écart se voit à l'écran : le marqueur avance au lieu de sauter.
 *
 * <p><strong>Le sondage reste en place.</strong> Ce canal ne le remplace pas, il
 * le devance. Un mandataire d'entreprise, un réseau mobile capricieux, un
 * serveur redémarré : autant de cas où la connexion ne s'établit pas. Le suivi
 * doit alors continuer de fonctionner, plus lentement, sans que l'acheteur ait
 * à comprendre pourquoi.
 */
@Injectable()
export class SuiviTempsReelService implements OnDestroy {

  /** Au-delà, on cesse d'insister et on laisse le sondage faire le travail. */
  private static readonly TENTATIVES_MAX = 5;

  private client?: Client;
  private abonnement?: StompSubscription;
  private readonly positions = new Subject<PositionLivreur>();
  private readonly connecte = new Subject<boolean>();
  private tentatives = 0;

  /** Positions reçues en direct. */
  readonly positions$: Observable<PositionLivreur> = this.positions.asObservable();

  /** Passe à false dès que le canal tombe : l'écran peut alors reprendre le sondage. */
  readonly connecte$: Observable<boolean> = this.connecte.asObservable();

  constructor(
    private storage: StorageService,
    private zone: NgZone,
  ) {}

  /**
   * Ouvre le canal et s'abonne à cette livraison.
   *
   * Sans jeton, on n'essaie même pas : le serveur refuserait la connexion, et
   * une tentative vouée à l'échec ne ferait que retarder le repli sur le sondage.
   */
  connecter(remiseId: number): void {
    const jeton = this.storage.getToken();
    if (!jeton || this.client) return;

    this.client = new Client({
      brokerURL: this.adresseCanal(),

      // Le jeton voyage dans la trame CONNECT, pas dans l'URL : une adresse est
      // journalisée par les mandataires et reste dans l'historique.
      connectHeaders: { Authorization: `Bearer ${jeton}` },

      // Le navigateur endort les onglets en arrière-plan ; sans battement, le
      // serveur croit le client parti et ferme la session.
      heartbeatIncoming: 20_000,
      heartbeatOutgoing: 20_000,
      reconnectDelay: 5_000,

      onConnect: () => this.zone.run(() => {
        this.tentatives = 0;
        this.connecte.next(true);
        this.abonner(remiseId);
      }),

      onWebSocketClose: () => this.zone.run(() => {
        this.connecte.next(false);
        if (++this.tentatives > SuiviTempsReelService.TENTATIVES_MAX) {
          this.deconnecter();
        }
      }),

      // Un refus d'abonnement — livraison qui ne nous concerne pas, jeton expiré —
      // n'a pas à s'afficher : le sondage donnera la même réponse, en clair.
      onStompError: () => this.zone.run(() => this.deconnecter()),
    });

    this.client.activate();
  }

  deconnecter(): void {
    this.abonnement?.unsubscribe();
    this.abonnement = undefined;
    this.client?.deactivate();
    this.client = undefined;
    this.connecte.next(false);
  }

  ngOnDestroy(): void {
    this.deconnecter();
  }

  // ── Interne ────────────────────────────────────────────────────────────────

  private abonner(remiseId: number): void {
    this.abonnement = this.client?.subscribe(
      `/topic/livraisons/${remiseId}/position`,
      (message: IMessage) => this.zone.run(() => this.surMessage(message)),
    );
  }

  private surMessage(message: IMessage): void {
    try {
      this.positions.next(JSON.parse(message.body) as PositionLivreur);
    } catch {
      // Une trame illisible ne doit pas casser le canal : le point suivant
      // arrivera dans quelques secondes.
    }
  }

  /**
   * Adresse du canal, déduite de celle de l'API.
   *
   * Une constante séparée finirait par diverger : c'est le même serveur, et il
   * change d'hôte entre le poste de développement et la production.
   */
  private adresseCanal(): string {
    const api = new URL(environment.apiUrl, window.location.origin);
    const protocole = api.protocol === 'https:' ? 'wss:' : 'ws:';
    return `${protocole}//${api.host}/ws`;
  }
}
