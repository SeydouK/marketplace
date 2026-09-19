// core/services/session-expiry.service.ts
import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';
import { ToastService } from './toast.service';

/**
 * Déconnecte l'utilisateur quand son jeton arrive à expiration.
 *
 * L'{@code ErrorInterceptor} traite déjà les 401, mais il est <em>réactif</em> :
 * il ne se déclenche qu'au moment où une requête échoue. Avec un jeton de 24 h,
 * quelqu'un qui laisse l'application ouverte reste devant une interface qui a
 * l'air connectée alors que la moindre action échouera — et pire, il peut saisir
 * un formulaire entier avant de l'apprendre.
 *
 * Ce service anticipe : il lit la date d'expiration inscrite dans le jeton et
 * programme la déconnexion, avec un avertissement quelques minutes avant.
 */
@Injectable({ providedIn: 'root' })
export class SessionExpiryService implements OnDestroy {

  /** Délai avant expiration auquel on prévient l'utilisateur. */
  private static readonly PREAVIS_MS = 2 * 60 * 1000;

  /**
   * Marge sous laquelle un jeton est considéré comme déjà mort.
   *
   * Évite de programmer une déconnexion dans 300 ms, et couvre les petits écarts
   * d'horloge entre le poste et le serveur.
   */
  private static readonly MARGE_MS = 5_000;

  /** Secondes restantes avant déconnexion, ou null hors période d'avertissement. */
  private readonly avertissementSujet = new BehaviorSubject<number | null>(null);
  readonly avertissement$ = this.avertissementSujet.asObservable();

  private minuterieDeconnexion?: ReturnType<typeof setTimeout>;
  private minuteriePreavis?: ReturnType<typeof setTimeout>;
  private deconnecter?: () => void;

  constructor(
    private storage: StorageService,
    private router: Router,
    private toast: ToastService,
    private zone: NgZone,
  ) {
    // Un onglet qui dort voit ses minuteries etirees par le navigateur : au
    // retour, on recalcule plutot que de faire confiance au reveil.
    document.addEventListener('visibilitychange', this.surRetourDOnglet);
    // Une deconnexion dans un onglet doit valoir pour tous les autres.
    window.addEventListener('storage', this.surChangementDeStockage);
  }

  ngOnDestroy(): void {
    this.annuler();
    document.removeEventListener('visibilitychange', this.surRetourDOnglet);
    window.removeEventListener('storage', this.surChangementDeStockage);
  }

  /**
   * Branche l'action de déconnexion.
   *
   * Passée de l'extérieur pour éviter un cycle : {@code AuthService} dépend déjà
   * de bien d'autres choses, et l'injecter ici formerait une boucle.
   */
  enregistrerDeconnexion(action: () => void): void {
    this.deconnecter = action;
  }

  /** À appeler après une connexion, et au démarrage de l'application. */
  demarrerSurveillance(): void {
    this.annuler();

    const expiration = this.expirationDuJeton();
    if (expiration === null) return;

    const restant = expiration - Date.now();

    if (restant <= SessionExpiryService.MARGE_MS) {
      this.expirer(true);
      return;
    }

    const preavis = restant - SessionExpiryService.PREAVIS_MS;
    if (preavis > 0) {
      this.minuteriePreavis = setTimeout(
        () => this.zone.run(() => this.avertir(SessionExpiryService.PREAVIS_MS)),
        preavis,
      );
    } else {
      this.avertir(restant);
    }

    this.minuterieDeconnexion = setTimeout(
      () => this.zone.run(() => this.expirer(false)),
      restant,
    );
  }

  annuler(): void {
    if (this.minuterieDeconnexion) clearTimeout(this.minuterieDeconnexion);
    if (this.minuteriePreavis) clearTimeout(this.minuteriePreavis);
    this.minuterieDeconnexion = undefined;
    this.minuteriePreavis = undefined;
    this.avertissementSujet.next(null);
  }

  /** Le jeton est-il encore valable ? Utilisé par le garde de route. */
  jetonValide(): boolean {
    const expiration = this.expirationDuJeton();
    // Un jeton sans date d'expiration lisible est laissé au serveur : lui seul
    // fait autorite, et le refuser ici bloquerait sur une simple anomalie de format.
    if (expiration === null) return !!this.storage.getToken();
    return expiration - Date.now() > SessionExpiryService.MARGE_MS;
  }

  // ── Interne ────────────────────────────────────────────────────────────────

  private avertir(restantMs: number): void {
    this.avertissementSujet.next(Math.round(restantMs / 1000));
    this.toast.info(
      `Votre session expire dans ${Math.max(1, Math.round(restantMs / 60000))} minute(s). `
      + `Enregistrez votre travail en cours.`,
      'Session bientôt expirée',
    );
  }

  private expirer(dejaExpire: boolean): void {
    this.annuler();
    if (!this.storage.getToken()) return;

    this.deconnecter?.();
    this.router.navigate(['/auth/login'], {
      // Permet de ramener la personne là où elle était après reconnexion.
      queryParams: { retour: this.router.url, raison: 'expiree' },
    });
    this.toast.error(
      dejaExpire
        ? 'Votre session avait expiré. Reconnectez-vous.'
        : 'Votre session a expiré. Reconnectez-vous pour continuer.',
    );
  }

  /**
   * Date d'expiration inscrite dans le jeton, en millisecondes.
   *
   * On décode sans vérifier la signature : ce n'est pas un contrôle de sécurité
   * — le serveur reste seul juge — mais une simple lecture pour savoir quand
   * cesser de faire semblant d'être connecté.
   */
  private expirationDuJeton(): number | null {
    const jeton = this.storage.getToken();
    if (!jeton) return null;

    const parties = jeton.split('.');
    if (parties.length !== 3) return null;

    try {
      const charge = JSON.parse(this.decoderBase64Url(parties[1]));
      return typeof charge.exp === 'number' ? charge.exp * 1000 : null;
    } catch {
      return null;
    }
  }

  private decoderBase64Url(segment: string): string {
    const base64 = segment.replace(/-/g, '+').replace(/_/g, '/');
    const complete = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
    // decodeURIComponent restitue correctement les caracteres non ASCII (accents
    // dans un nom, par exemple) que atob laisse en octets bruts.
    return decodeURIComponent(
      atob(complete)
        .split('')
        .map((c) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
        .join(''),
    );
  }

  private surRetourDOnglet = (): void => {
    if (document.visibilityState !== 'visible') return;
    if (!this.storage.getToken()) return;
    this.zone.run(() => this.demarrerSurveillance());
  };

  private surChangementDeStockage = (evenement: StorageEvent): void => {
    if (evenement.key !== null && !evenement.key.includes('token')) return;
    if (this.storage.getToken()) return;
    // Le jeton a disparu ailleurs : cet onglet suit.
    this.zone.run(() => {
      this.annuler();
      this.deconnecter?.();
      this.router.navigate(['/auth/login']);
    });
  };
}
