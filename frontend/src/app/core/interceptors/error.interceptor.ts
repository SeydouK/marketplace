import { Injectable } from '@angular/core';
import {
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
        if (error.status === 401) {
          this.auth.logout();
          this.router.navigate(['/auth/login']);
          this.toast.error('Session expirée. Veuillez vous reconnecter.');
        } else if (error.status === 403) {
          this.toast.error('Accès non autorisé');
        } else if (error.status === 404) {
          this.toast.error('Ressource introuvable');
        } else if (error.status >= 400 && error.status < 500) {
          const message = error.error?.message || 'Données invalides';
          this.toast.error(message);
        } else if (error.status >= 500) {
          this.toast.error('Erreur serveur. Veuillez réessayer plus tard.');
        } else {
          this.toast.error(error.error?.message || 'Erreur inattendue');
        }
        return throwError(() => error);
      })
    );
  }
}
