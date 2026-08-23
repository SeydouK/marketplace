import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Role } from '../models/role.enum';

@Injectable({ providedIn: 'root' })
export class RoleRedirectGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/auth/login']);
      return false;
    }

    const role = this.auth.currentUser?.role;

    switch (role) {
      case Role.ADMIN:
      case Role.ADMINISTRATEUR:
        this.router.navigate(['/admin/dashboard']);
        break;
      case Role.VENDEUR:
        this.router.navigate(['/vendeur/dashboard']);
        break;
      case Role.VETERINAIRE:
        this.router.navigate(['/veterinaire/dashboard']);
        break;
      case Role.AGENT_ANADER:
        this.router.navigate(['/anader/dashboard']);
        break;
      case Role.TRANSPORTEUR:
        // Ses courses, pas un tableau de bord : c'est la seule chose qu'il vient
        // faire, et l'attente d'une proposition est son etat normal.
        this.router.navigate(['/transporteur/mes-courses']);
        break;
      case Role.USER:
      case Role.ACHETEUR:
      default:
        this.router.navigate(['/acheteur/dashboard']);
        break;
    }

    return false;
  }
}
