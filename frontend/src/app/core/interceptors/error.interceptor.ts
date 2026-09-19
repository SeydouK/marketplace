import { Injectable } from '@angular/core';
import {
  HttpContextToken,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

/**
 * Quand ce token vaut `true` sur une requête, l'ErrorInterceptor ne fait
 * AUCUN traitement (ni toast global, ni logout/redirect 401) : le composant
 * appelant prend en charge l'erreur lui-même. Évite les toasts en double.
 */
export const SKIP_GLOBAL_ERROR = new HttpContextToken<boolean>(() => false);

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    private router: Router,
    private toast: ToastService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // Le composant gère lui-même cette erreur → on relaie sans rien afficher
        if (req.context.get(SKIP_GLOBAL_ERROR)) {
          return throwError(() => error);
        }

        const backendMessage = this.resolveBackendMessage(error);

        if (error.status === 401) {
          this.auth.logout();
          this.router.navigate(['/auth/login']);
          this.toast.error(
            backendMessage || 'Session expirée. Veuillez vous reconnecter.'
          );
        } else if (error.status === 403) {
          this.toast.error(backendMessage || 'Accès non autorisé.');
        } else if (error.status === 404) {
          this.toast.error(backendMessage || 'Ressource introuvable.');
        } else if (error.status >= 400 && error.status < 500) {
          this.toast.error(backendMessage || 'Données invalides.');
        } else if (error.status >= 500) {
          this.toast.error(
            backendMessage || 'Erreur serveur. Veuillez réessayer plus tard.'
          );
        } else if (error.status === 0) {
          this.toast.error('Impossible de joindre le serveur.');
        } else {
          this.toast.error(backendMessage || 'Erreur inattendue.');
        }
        return throwError(() => error);
      })
    );
  }

  private resolveBackendMessage(error: HttpErrorResponse): string | null {
    return this.extractMessage(error.error);
  }

  private extractMessage(payload: unknown): string | null {
    if (typeof payload === 'string') {
      const message = payload.trim();
      return message || null;
    }

    if (Array.isArray(payload)) {
      for (const item of payload) {
        const message = this.extractMessage(item);
        if (message) {
          return message;
        }
      }
      return null;
    }

    if (!payload || typeof payload !== 'object') {
      return null;
    }

    const record = payload as Record<string, unknown>;
    const directMessage = this.readString(record['message']);
    if (directMessage) {
      return directMessage;
    }

    const nestedErrorsMessage = this.extractObjectMessage(record['errors']);
    if (nestedErrorsMessage) {
      return nestedErrorsMessage;
    }

    return this.extractObjectMessage(record);
  }

  private extractObjectMessage(payload: unknown): string | null {
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
      return null;
    }

    const values = Object.values(payload as Record<string, unknown>);
    for (const value of values) {
      const message = this.readString(value) || this.extractMessage(value);
      if (message) {
        return message;
      }
    }

    return null;
  }

  private readString(value: unknown): string | null {
    if (typeof value !== 'string') {
      return null;
    }

    const normalized = value.trim();
    return normalized || null;
  }
}
