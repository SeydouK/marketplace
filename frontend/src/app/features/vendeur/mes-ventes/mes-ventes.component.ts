// vendeur/mes-ventes/mes-ventes.component.ts
import { Component, OnInit } from '@angular/core';
import { SaleService, Sale, EscrowStatus } from '../../../shared/services/sale.service';

@Component({
  selector: 'app-mes-ventes',
  templateUrl: './mes-ventes.component.html',
  standalone: false,
})
export class MesVentesComponent implements OnInit {
  sales: Sale[] = [];
  activeTab: EscrowStatus | 'ALL' = 'ALL';

  tabs: { label: string; value: EscrowStatus | 'ALL'; count?: number }[] = [
    { label: 'Toutes', value: 'ALL' },
    { label: 'Fonds bloqués', value: 'FUNDS_LOCKED' },
    { label: 'Terminées', value: 'RELEASED' },
    { label: 'Litiges', value: 'DISPUTED' },
  ];

  constructor(private saleService: SaleService) {}

  ngOnInit(): void {
    /*this.saleService.getMySales().subscribe((sales) => {
      this.sales = sales;
      this.updateTabCounts();
    });*/
  }

  updateTabCounts(): void {
    this.tabs = this.tabs.map((tab) => ({
      ...tab,
      count: tab.value === 'ALL'
        ? undefined
        : this.sales.filter((s) => s.escrowStatus === tab.value).length || undefined,
    }));
  }

  setTab(tab: EscrowStatus | 'ALL'): void {
    this.activeTab = tab;
  }

  get filteredSales(): Sale[] {
    if (this.activeTab === 'ALL') return this.sales;
    return this.sales.filter((s) => s.escrowStatus === this.activeTab);
  }

  getEscrowLabel(status: EscrowStatus): string {
    const labels: Record<EscrowStatus, string> = {
      PENDING: 'En attente',
      FUNDS_LOCKED: 'Fonds bloqués',
      RELEASED: 'Libéré',
      DISPUTED: 'Litige',
      REFUNDED: 'Remboursé',
    };
    return labels[status] ?? status;
  }

  getEscrowBadgeClass(status: EscrowStatus): string {
    const map: Record<EscrowStatus, string> = {
      PENDING: 'bg-gray-100 text-gray-600',
      FUNDS_LOCKED: 'bg-amber-100 text-amber-800',
      RELEASED: 'bg-green-100 text-green-800',
      DISPUTED: 'bg-red-100 text-red-800',
      REFUNDED: 'bg-blue-100 text-blue-800',
    };
    return map[status] ?? 'bg-gray-100 text-gray-600';
  }

  getEscrowSteps(status: EscrowStatus): { label: string; done: boolean }[] {
    const order: EscrowStatus[] = ['PENDING', 'FUNDS_LOCKED', 'RELEASED'];
    const currentIndex = order.indexOf(status);
    return [
      { label: 'Commande', done: currentIndex >= 0 },
      { label: 'Paiement bloqué', done: currentIndex >= 1 },
      { label: 'Livraison', done: currentIndex >= 1 },
      { label: 'Confirmation', done: currentIndex >= 2 },
      { label: 'Fonds libérés', done: currentIndex >= 2 },
    ];
  }
}
