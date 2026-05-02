// acheteur/mes-achats/mes-achats.component.ts
import { Component, OnInit } from '@angular/core';
import { SaleService, Sale, EscrowStatus } from '../../../shared/services/sale.service';

@Component({
  selector: 'app-mes-achats',
  templateUrl: './mes-achats.component.html',
  standalone: false,
})
export class MesAchatsComponent implements OnInit {
  purchases: Sale[] = [];

  constructor(private saleService: SaleService) {}

  ngOnInit(): void {
    /*this.saleService.getMyPurchases().subscribe((p) => (this.purchases = p));*/
  }

  confirmReception(purchase: Sale): void {
    this.saleService.confirmReception(purchase.id).subscribe(() => {
      purchase.escrowStatus = 'RELEASED';
    });
  }

  openDispute(purchase: Sale): void {
    const reason = prompt('Décrivez le problème avec cette transaction :');
    if (!reason) return;
    this.saleService.openDispute(purchase.id, reason).subscribe(() => {
      purchase.escrowStatus = 'DISPUTED';
    });
  }

  getLabel(status: EscrowStatus): string {
    const labels: Record<EscrowStatus, string> = {
      PENDING: 'En attente de paiement',
      FUNDS_LOCKED: 'Fonds sécurisés',
      RELEASED: 'Terminé',
      DISPUTED: 'Litige',
      REFUNDED: 'Remboursé',
    };
    return labels[status];
  }

  getBadgeClass(status: EscrowStatus): string {
    const map: Record<EscrowStatus, string> = {
      PENDING: 'bg-gray-100 text-gray-600',
      FUNDS_LOCKED: 'bg-amber-100 text-amber-800',
      RELEASED: 'bg-green-100 text-green-800',
      DISPUTED: 'bg-red-100 text-red-800',
      REFUNDED: 'bg-blue-100 text-blue-800',
    };
    return map[status];
  }
}
