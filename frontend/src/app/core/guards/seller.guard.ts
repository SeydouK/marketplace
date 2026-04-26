import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

@Injectable({ providedIn: 'root' })
export class SellerGuard implements CanActivate {
  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
    private readonly toast: ToastService
  ) {}

  canActivate(): boolean {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    if (this.auth.canAccessSellerArea) {
      return true;
    }

    this.toast.info(
      this.auth.isSellerRequestPending
        ? 'Votre demande vendeur est en attente de validation par un administrateur.'
        : "Vous devez d'abord obtenir l'acces vendeur pour ouvrir cet espace."
    );
    this.router.navigate(['/dashboard']);
    return false;
  }
}
