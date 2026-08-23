// core/services/pwa.service.ts
import { Injectable, NgZone } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Role } from '../models/role.enum';

/**
 * L'installation de l'application sur l'écran d'accueil, et sa mise à jour.
 *
 * <p><strong>L'invitation à installer est réservée aux transporteurs.</strong>
 * Ce n'est pas une restriction technique — une seule application est publiée,
 * pour tout le monde — mais un choix : l'installation ne change pratiquement
 * rien à l'usage d'un acheteur, qui vient consulter des annonces depuis un lien.
 * Elle change beaucoup pour un transporteur, qui ouvre l'application plusieurs
 * fois par jour, souvent en mobilité, parfois sur un réseau incertain.
 *
 * <p>Proposer l'installation à tout le monde reviendrait à afficher une bannière
 * de plus à des gens qui n'en tireront rien — et les bannières que l'on ignore
 * apprennent à ignorer les suivantes.
 */
@Injectable({ providedIn: 'root' })
export class PwaService {

  /** L'événement d'installation, mis de côté jusqu'à ce qu'on décide de s'en servir. */
  private invite: any = null;

  private readonly installable = new BehaviorSubject<boolean>(false);
  /** Vrai quand le navigateur accepterait d'installer, et que l'utilisateur est concerné. */
  readonly installable$ = this.installable.asObservable();

  private readonly majPrete = new BehaviorSubject<boolean>(false);
  /** Vrai quand une nouvelle version est téléchargée et n'attend qu'un rechargement. */
  readonly majPrete$ = this.majPrete.asObservable();

  constructor(
    private auth: AuthService,
    private updates: SwUpdate,
    private zone: NgZone,
  ) {}

  /** Appelé une fois au démarrage de l'application. */
  initialiser(): void {
    this.ecouterInstallation();
    this.ecouterMisesAJour();
  }

  // ── Installation ───────────────────────────────────────────────────────────

  private ecouterInstallation(): void {
    window.addEventListener('beforeinstallprompt', (e: Event) => {
      // Sans preventDefault, Chrome affiche sa propre invite, au moment qui
      // l'arrange. On la met de côté pour la présenter dans le contexte où
      // elle a du sens : l'écran des courses.
      e.preventDefault();
      this.zone.run(() => {
        this.invite = e;
        this.reevaluer();
      });
    });

    window.addEventListener('appinstalled', () => {
      this.zone.run(() => {
        this.invite = null;
        this.installable.next(false);
      });
    });

    // Le rôle n'est pas connu au chargement de la page : il arrive avec la
    // session. Sans cette réévaluation, un transporteur qui vient de se
    // connecter ne verrait jamais l'invitation.
    this.auth.currentUser$.subscribe(() => this.reevaluer());
  }

  private reevaluer(): void {
    this.installable.next(!!this.invite && this.concerne());
  }

  /** L'installation vaut-elle la peine d'être proposée à cette personne ? */
  private concerne(): boolean {
    return this.auth.currentUser?.role === Role.TRANSPORTEUR;
  }

  /**
   * Déclenche l'invite native du navigateur.
   *
   * L'événement mis de côté ne sert qu'une fois : après usage, il faut attendre
   * que le navigateur en émette un nouveau.
   */
  async installer(): Promise<boolean> {
    if (!this.invite) return false;
    const invite = this.invite;
    this.invite = null;
    this.installable.next(false);

    invite.prompt();
    const choix = await invite.userChoice;
    return choix?.outcome === 'accepted';
  }

  /**
   * Déjà installée et lancée depuis l'écran d'accueil ?
   *
   * Sert à ne pas proposer l'installation d'une application déjà installée —
   * cas où beforeinstallprompt ne se déclenche pas, mais où d'anciens iOS
   * demandent tout de même un traitement à part.
   */
  estInstallee(): boolean {
    return window.matchMedia('(display-mode: standalone)').matches
      || (window.navigator as any).standalone === true;
  }

  // ── Mises à jour ───────────────────────────────────────────────────────────

  /**
   * Une application installée ne se met pas à jour toute seule au rechargement.
   *
   * Sans ce mécanisme, un transporteur pourrait garder pendant des semaines une
   * version dépassée — y compris après une correction touchant la remise ou le
   * suivi. On ne recharge pas dans son dos pour autant : le faire pendant une
   * saisie de code lui ferait perdre ce qu'il tape.
   */
  private ecouterMisesAJour(): void {
    if (!this.updates.isEnabled) return;

    this.updates.versionUpdates
      .pipe(filter((e) => e.type === 'VERSION_READY'))
      .subscribe(() => this.zone.run(() => this.majPrete.next(true)));

    // Une application ouverte des heures ne redemande jamais le manifeste de
    // version : sans vérification périodique, la mise à jour attend le prochain
    // démarrage à froid.
    setInterval(() => this.updates.checkForUpdate().catch(() => {}), 6 * 60 * 60 * 1000);
  }

  /** Applique la version téléchargée. */
  appliquerMaj(): void {
    this.updates.activateUpdate().then(() => document.location.reload());
  }
}
