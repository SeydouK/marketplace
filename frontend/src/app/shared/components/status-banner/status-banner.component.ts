import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Router } from '@angular/router';
import { UserStatusService, UserStatus } from '../../../core/services/user-status.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-status-banner',
  templateUrl: './status-banner.component.html',
  standalone: false,
})
export class StatusBannerComponent implements OnInit, OnDestroy {
  status: UserStatus | null = null;
  private sub = new Subscription();

  constructor(
    private userStatusService: UserStatusService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sub.add(
      this.userStatusService.status$.subscribe(s => {
        this.status = s;
      })
    );
  }

  // Utilise AuthService au lieu du localStorage directement
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get showEmailBanner(): boolean {
    return this.isLoggedIn &&
           !!this.status &&
           !this.status.emailVerified &&
           !this.router.url.startsWith('/verify-email');
  }

  get showKycBanner(): boolean {
    return this.isLoggedIn &&
           !!this.status &&
           this.status.emailVerified &&
           this.status.kycStatus !== 'VALIDATED' &&
           !this.router.url.startsWith('/kyc');
  }

  goToVerifyEmail(): void { this.router.navigate(['/verify-email']); }
  goToKyc(): void { this.router.navigate(['/kyc']); }

  ngOnDestroy(): void { this.sub.unsubscribe(); }
}
