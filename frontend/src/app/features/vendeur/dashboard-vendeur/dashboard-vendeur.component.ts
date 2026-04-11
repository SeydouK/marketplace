// vendeur/dashboard-vendeur/dashboard-vendeur.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../core/services/auth.service';
import { Role } from '../../../core/models/role.enum';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-dashboard-vendeur',
  templateUrl: './dashboard-vendeur.component.html',
  standalone: false,
})
export class DashboardVendeurComponent implements OnInit {
  profile = this.auth.currentUser;

  // Compteurs cheptel
  animalsCount = 0;
  availableCount = 0;        // statut DISPONIBLE
  soldCount = 0;             // statut VENDU
  escrowCount = 0;           // transactions escrow en cours

  constructor(
    private auth: AuthService,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.http.get<any>(`${environment.apiUrl}/users/me`).subscribe(d => {
      this.profile = d;
    });

    this.http.get<any>(`${environment.apiUrl}/animals/stats`).subscribe(stats => {
      this.animalsCount              = stats.total          ?? 0;
      this.availableCount            = stats.available      ?? 0;
      this.soldCount                 = stats.sold           ?? 0;
      this.escrowCount               = stats.escrowPending  ?? 0;
    });
  }

  // ── Nombre d'animaux EN_ATTENTE de validation sanitaire ──
  get pendingHealthValidationCount(): number {
    return Math.max(0, this.animalsCount - this.availableCount - this.soldCount);
  }

  // ── Pourcentages pour la barre de progression ──
  get availablePercent(): number {
    return this.animalsCount ? Math.round((this.availableCount / this.animalsCount) * 100) : 0;
  }

  get pendingPercent(): number {
    return this.animalsCount ? Math.round((this.pendingHealthValidationCount / this.animalsCount) * 100) : 0;
  }

  get soldPercent(): number {
    return this.animalsCount ? Math.round((this.soldCount / this.animalsCount) * 100) : 0;
  }

  // ── KYC ──
  get kycApproved(): boolean {
    return (this.profile as any)?.kycStatus === 'APPROVED';
  }

  // ── Accès validation sanitaire (vendeur vérifié seulement) ──
  get canAccessHealthValidation(): boolean {
    return this.profile?.role === Role.VENDEUR && this.kycApproved;
  }
}