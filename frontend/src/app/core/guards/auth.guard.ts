import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SessionExpiryService } from '../services/session-expiry.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private sessionExpiry: SessionExpiryService,
    private router: Router,
  ) {}

  canActivate(): boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/auth/login']);
      return false;
    }

    // Presence du jeton ne vaut pas validite : un jeton expire laissait entrer
    // sur une page qui echouait ensuite requete apres requete.
    if (!this.sessionExpiry.jetonValide()) {
      this.authService.logout();
      this.router.navigate(['/auth/login'], { queryParams: { raison: 'expiree' } });
      return false;
    }
    return true;
  }
}