// features/kyc/kyc-done.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { UserStatusService } from '../../core/services/user-status.service';

@Injectable({ providedIn: 'root' })
export class KycDoneGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private userStatusService: UserStatusService,
    private router: Router
  ) {}

  canActivate(): boolean {
    const status = this.userStatusService.snapshot;

    // Si déjà validé → rediriger vers profil
    if (status?.kycStatus === 'VALIDATED') {
      this.router.navigate(['/profil']);
      return false;
    }

    return true;
  }
}