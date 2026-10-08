import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SessionExpiryService } from '../services/session-expiry.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private sessionExpiry: SessionExpiryService,
    private router: Router,
  ) {}

  canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // La page demandée est rouverte après connexion : un lien d'email (ticket
    // de remise, suivi de livraison) ne doit pas se perdre sur l'accueil.
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/auth/login'], { queryParams: { retour: state.url } });
      return false;
    }

    // Presence du jeton ne vaut pas validite : un jeton expire laissait entrer
    // sur une page qui echouait ensuite requete apres requete.
    if (!this.sessionExpiry.jetonValide()) {
      this.authService.logout();
      this.router.navigate(['/auth/login'], { queryParams: { raison: 'expiree', retour: state.url } });
      return false;
    }
    return true;
  }
}