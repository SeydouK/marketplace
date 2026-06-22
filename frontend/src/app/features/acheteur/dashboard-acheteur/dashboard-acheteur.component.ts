// acheteur/dashboard-acheteur/dashboard-acheteur.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../core/services/auth.service';
import { environment } from '../../../../environments/environment';
import { UserStatusService } from '../../../core/services/user-status.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-dashboard-acheteur',
  templateUrl: './dashboard-acheteur.component.html',
  standalone: false,
})
export class DashboardAcheteurComponent implements OnInit {
  profile = this.auth.currentUser;

  activeOrdersCount = 0;
  completedOrdersCount = 0;
  escrowCount = 0;
  favoritesCount = 0;
  sellerRequestModalOpen = false;
  sellerRequestSubmitting = false;

  constructor(
    public auth: AuthService,
    private http: HttpClient,
    private userStatusService: UserStatusService,
    private toast: ToastService,
  ) {}

  ngOnInit(): void {
    this.auth.refreshCurrentUser().subscribe(d => {
      this.profile = d;
    });

   /* this.http.get<any>(`${environment.apiUrl}/transactions/mes-achats/stats`).subscribe({
      next: (stats) => {
        this.activeOrdersCount    = stats?.active    ?? 0;
        this.completedOrdersCount = stats?.completed ?? 0;
        this.escrowCount          = stats?.escrow    ?? 0;
        this.favoritesCount       = stats?.favorites ?? 0;
      },
      error: () => {
        // Stats non disponibles — on garde les 0 par défaut
      }
    });*/
  }

  // ── KYC ──
  get kycApproved(): boolean {
    const status = this.userStatusService.snapshot?.kycStatus
                ?? (this.profile as any)?.kycStatus;
    return status === 'VALIDATED' || status === 'APPROVED';
  }

  // ── Pourcentages pour la barre de progression ──
  private get totalOrders(): number {
    return this.activeOrdersCount + this.completedOrdersCount + this.escrowCount;
  }

  get escrowPercent(): number {
    return this.totalOrders ? Math.round((this.escrowCount / this.totalOrders) * 100) : 0;
  }

  get completedPercent(): number {
    return this.totalOrders ? Math.round((this.completedOrdersCount / this.totalOrders) * 100) : 0;
  }

  get activePercent(): number {
    return this.totalOrders ? Math.round((this.activeOrdersCount / this.totalOrders) * 100) : 0;
  }

  openSellerRequestModal(): void {
    if (this.auth.canAccessSellerArea || this.auth.isSellerRequestPending) {
      return;
    }

    this.sellerRequestModalOpen = true;
  }

  closeSellerRequestModal(): void {
    if (this.sellerRequestSubmitting) {
      return;
    }

    this.sellerRequestModalOpen = false;
  }

  submitSellerRequest(): void {
    if (this.sellerRequestSubmitting || this.auth.canAccessSellerArea || this.auth.isSellerRequestPending) {
      return;
    }

    this.sellerRequestSubmitting = true;
    this.auth.requestSellerAccess().subscribe({
      next: (user) => {
        this.profile = user;
        this.sellerRequestSubmitting = false;
        this.sellerRequestModalOpen = false;
        this.toast.success('Votre demande vendeur a été transmise à l’administration.');
      },
      error: () => {
        this.sellerRequestSubmitting = false;
      },
    });
  }
}
