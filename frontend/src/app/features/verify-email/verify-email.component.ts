import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserStatusService } from '../../core/services/user-status.service';

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
    private userStatusService: UserStatusService
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
    const token = localStorage.getItem('marketplace_token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    this.http.get<any>('/api/kyc/status', {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    }).subscribe({
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