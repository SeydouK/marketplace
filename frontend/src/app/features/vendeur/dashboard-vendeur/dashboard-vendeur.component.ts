// vendeur/dashboard-vendeur/dashboard-vendeur.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../core/services/auth.service';
import { environment } from '../../../../environments/environment';
import { UserStatusService } from '../../../core/services/user-status.service';
import { LivraisonService } from '../../../shared/services/livraison.service';

interface SellerAnimalStats {
  total: number;
  available: number;
  unavailable: number;
  pending: number;
  reserved: number;
  sold: number;
}

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
  pendingCount = 0;          // statut EN_ATTENTE — validation sanitaire
  unavailableCount = 0;      // statut INDISPONIBLE — retire de la vente
  reservedCount = 0;         // statut RESERVE — commande en cours de paiement
  soldCount = 0;             // statut VENDU

  // Argent en attente de deblocage, agrege depuis les ventes.
  ventesSousSequestre = 0;
  montantSousSequestre = 0;

  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private userStatusService: UserStatusService,
    private livraisonService: LivraisonService,
  ) {}

  ngOnInit(): void {
    this.http.get<any>(`${environment.apiUrl}/users/me`).subscribe(d => {
      this.profile = d;
    });

    this.http.get<SellerAnimalStats>(`${environment.apiUrl}/animals/stats`).subscribe(stats => {
      this.animalsCount = stats.total ?? 0;
      this.availableCount = stats.available ?? 0;
      // pending = EN_ATTENTE (validation sanitaire). L'ancien code lisait `unavailable`,
      // ce qui comptait les annonces desactivees comme en attente de veterinaire.
      this.pendingCount = stats.pending ?? 0;
      this.unavailableCount = stats.unavailable ?? 0;
      this.reservedCount = stats.reserved ?? 0;
      this.soldCount = stats.sold ?? 0;
    });

    // Rappel argent : ce qui est vendu mais pas encore debloque.
    this.livraisonService.getMesVentes().subscribe({
      next: (ventes) => {
        const bloquees = ventes.filter(v => v.statutVersement === 'BLOQUE');
        this.ventesSousSequestre = bloquees.length;
        this.montantSousSequestre = bloquees.reduce((s, v) => s + (v.montantNet ?? 0), 0);
      },
      error: () => {
        // Non bloquant : le dashboard reste utilisable sans ce rappel.
      },
    });
  }

  // ── Nombre d'animaux EN_ATTENTE de validation sanitaire ──
  get pendingHealthValidationCount(): number {
    return this.pendingCount;
  }

  // ── Pourcentages pour la barre de progression ──
  get availablePercent(): number {
    return this.animalsCount ? Math.round((this.availableCount / this.animalsCount) * 100) : 0;
  }

  get pendingPercent(): number {
    return this.animalsCount ? Math.round((this.pendingHealthValidationCount / this.animalsCount) * 100) : 0;
  }

  // ── KYC ──
  get kycApproved(): boolean {
    const status = this.userStatusService.snapshot?.kycStatus
                ?? (this.profile as any)?.kycStatus;
    return status === 'VALIDATED' || status === 'APPROVED';
  }
}
