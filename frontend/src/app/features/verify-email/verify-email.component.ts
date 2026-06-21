import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserStatusService } from '../../core/services/user-status.service';
import { StorageService } from '../../core/services/storage.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  standalone: false,
})
export class VerifyEmailComponent implements OnInit {
  status: 'pending' | 'success' | 'error' | 'already_verified' = 'pending';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private userStatusService: UserStatusService,
    private storage: StorageService
  ) {}

  ngOnInit(): void {
    const s = this.route.snapshot.queryParamMap.get('status');

    if (s === 'success') {
      this.status = 'success';
      // Mettre à jour le statut — la bannière disparaît immédiatement
      this.userStatusService.update({ emailVerified: true });

    } else if (s === 'error') {
      this.status = 'error';

    } else {
      // Pas de paramètre — vérifier le vrai statut en base
      this.checkRealStatus();
    }
  }

  private checkRealStatus(): void {
    if (!this.storage.getToken()) {
      this.router.navigate(['/login']);
      return;
    }

    // L'AuthInterceptor ajoute automatiquement l'en-tete Authorization.
    this.http.get<any>(`${environment.apiUrl}/kyc/status`).subscribe({
      next: (res) => {
        if (res.emailVerified) {
          // Email déjà vérifié — rediriger directement vers KYC
          this.userStatusService.update({ emailVerified: true });
          this.status = 'already_verified';
        } else {
          this.status = 'pending';
        }
      },
      error: () => {
        this.status = 'pending';
      }
    });
  }

  goToKyc(): void { this.router.navigate(['/kyc']); }
  goToLogin(): void { this.router.navigate(['/login']); }
}