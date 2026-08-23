import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class VerifyEmailComponent implements OnInit, OnDestroy {
  status: 'pending' | 'success' | 'error' | 'already_verified' = 'pending';

  // ── Renvoi de l'email ──────────────────────────────────────────────────────
  renvoiEnCours = false;
  renvoiMessage: string | null = null;
  /** Secondes avant qu'un nouveau renvoi soit possible. */
  attenteSecondes = 0;
  private minuterie?: ReturnType<typeof setInterval>;

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

  // ── Renvoi ─────────────────────────────────────────────────────────────────

  renvoyer(): void {
    if (this.renvoiEnCours || this.attenteSecondes > 0) return;
    this.renvoiEnCours = true;
    this.renvoiMessage = null;

    this.http
      .post<{ envoye: boolean; secondesAvantProchainEnvoi: number }>(
        `${environment.apiUrl}/auth/verification/renvoyer`, {})
      .subscribe({
        next: (res) => {
          this.renvoiEnCours = false;
          this.demarrerDecompte(res.secondesAvantProchainEnvoi);
          this.renvoiMessage = res.envoye
            ? 'Email renvoyé. Pensez à regarder dans vos courriers indésirables.'
            : 'Un email a déjà été envoyé récemment.';
        },
        error: (e) => {
          this.renvoiEnCours = false;
          this.renvoiMessage = e?.error?.message ?? "L'envoi a échoué. Réessayez plus tard.";
        },
      });
  }

  /** Décompte visible : dire « dans 7 min » vaut mieux qu'un bouton inerte. */
  private demarrerDecompte(secondes: number): void {
    this.attenteSecondes = secondes;
    if (this.minuterie) clearInterval(this.minuterie);

    this.minuterie = setInterval(() => {
      this.attenteSecondes = Math.max(0, this.attenteSecondes - 1);
      if (this.attenteSecondes === 0 && this.minuterie) {
        clearInterval(this.minuterie);
        this.minuterie = undefined;
      }
    }, 1000);
  }

  get attenteLisible(): string {
    const m = Math.floor(this.attenteSecondes / 60);
    const s = this.attenteSecondes % 60;
    return m > 0 ? `${m} min ${s.toString().padStart(2, '0')} s` : `${s} s`;
  }

  ngOnDestroy(): void {
    if (this.minuterie) clearInterval(this.minuterie);
  }

  goToKyc(): void { this.router.navigate(['/kyc']); }
  goToLogin(): void { this.router.navigate(['/login']); }
}