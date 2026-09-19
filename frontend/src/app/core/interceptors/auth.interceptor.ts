import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { environment } from '../../../environments/environment';

/**
 * Ajoute le jeton d'authentification aux appels vers notre propre API.
 *
 * <p><strong>Uniquement vers la nôtre.</strong> L'intercepteur le posait
 * auparavant sur toute requête sortante, y compris vers des services tiers —
 * calcul d'itinéraire, tuiles de carte, n'importe quelle API externe. Deux
 * conséquences, l'une visible et l'autre non :
 *
 * <ul>
 *   <li>un en-tête Authorization déclenche une requête préliminaire CORS que la
 *       plupart des services publics refusent : l'appel échoue ;</li>
 *   <li>surtout, <strong>le jeton de l'utilisateur était transmis à des tiers</strong>.
 *       Quiconque exploite le service appelé pouvait le lire, et s'en servir
 *       jusqu'à son expiration.</li>
 * </ul>
 *
 * <p>Le second point est le vrai motif de ce filtre. Le premier n'en était que
 * le symptôme visible.
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  /** Origine de notre API — tout le reste est considéré comme extérieur. */
  private readonly origineApi = new URL(environment.apiUrl, window.location.origin).origin;

  constructor(private storage: StorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.storage.getToken();
    if (!token || !this.versNotreApi(req.url)) {
      return next.handle(req);
    }

    return next.handle(
      req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      }),
    );
  }

  /**
   * La requête part-elle vers notre serveur ?
   *
   * Une URL relative (« /api/... ») vise toujours notre propre origine, que ce
   * soit directement ou via le proxy de développement. Une URL absolue n'est
   * acceptée que si son origine correspond exactement à celle de l'API.
   */
  private versNotreApi(url: string): boolean {
    if (!/^https?:\/\//i.test(url)) return true;
    try {
      return new URL(url).origin === this.origineApi;
    } catch {
      return false;
    }
  }
}
