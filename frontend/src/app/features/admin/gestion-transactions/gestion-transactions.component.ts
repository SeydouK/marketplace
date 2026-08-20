import { Component, OnInit } from '@angular/core';
import { AdminCommande, StatutCommande, AdminService } from '../services/admin.service';

@Component({
  selector: 'app-gestion-transactions',
  templateUrl: './gestion-transactions.component.html',
  standalone: false,
})
export class GestionTransactionsComponent implements OnInit {
  commandes: AdminCommande[] = [];
  activeFilter: StatutCommande | 'all' = 'all';
  currentPage = 0;
  totalPages = 1;
  totalElements = 0;
  loading = false;

  readonly filters: { label: string; value: StatutCommande | 'all' }[] = [
    { label: 'Toutes',    value: 'all' },
    { label: 'En attente', value: 'EN_ATTENTE' },
    { label: 'Payées',    value: 'PAYEE' },
    { label: 'Échouées',  value: 'ECHOUEE' },
    { label: 'Annulées',  value: 'ANNULEE' },
    { label: 'Expirées',  value: 'EXPIREE' },
  ];

  constructor(private readonly adminService: AdminService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.adminService
      .getCommandes({ statut: this.activeFilter, page: this.currentPage, size: 20 })
      .subscribe({
        next: (page) => {
          this.commandes = page.content;
          this.totalPages = page.totalPages;
          this.totalElements = page.totalElements;
          this.loading = false;
        },
        error: () => { this.loading = false; },
      });
  }

  setFilter(value: StatutCommande | 'all'): void {
    this.activeFilter = value;
    this.currentPage = 0;
    this.load();
  }

  prevPage(): void {
    if (this.currentPage <= 0) return;
    this.currentPage--;
    this.load();
  }

  nextPage(): void {
    if (this.currentPage >= this.totalPages - 1) return;
    this.currentPage++;
    this.load();
  }

  getStatutBadge(statut: StatutCommande): string {
    const map: Record<StatutCommande, string> = {
      EN_ATTENTE: 'bg-blue-100 text-blue-800',
      PAYEE:      'bg-green-100 text-green-800',
      ECHOUEE:    'bg-red-100 text-red-800',
      ANNULEE:    'bg-[#F6F1E7] text-gray-600',
      EXPIREE:    'bg-amber-100 text-amber-800',
    };
    return map[statut] ?? 'bg-[#F6F1E7] text-gray-600';
  }

  getStatutLabel(statut: StatutCommande): string {
    const map: Record<StatutCommande, string> = {
      EN_ATTENTE: 'En attente',
      PAYEE:      'Payée',
      ECHOUEE:    'Échouée',
      ANNULEE:    'Annulée',
      EXPIREE:    'Expirée',
    };
    return map[statut] ?? statut;
  }

  trackByCommandeId(_: number, commande: AdminCommande): number {
    return commande.id;
  }
}
