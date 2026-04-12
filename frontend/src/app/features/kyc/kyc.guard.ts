import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { UserStatusService } from '../../core/services/user-status.service';

@Injectable({ providedIn: 'root' })
export class KycGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private userStatusService: UserStatusService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    const status = this.userStatusService.snapshot;

    if (!status.emailVerified) {
      this.router.navigate(['/verify-email']);
      return false;
    }

    if (status.kycStatus !== 'VALIDATED') {
      this.router.navigate(['/kyc']);
      return false;
    }

    return true;
  }
}