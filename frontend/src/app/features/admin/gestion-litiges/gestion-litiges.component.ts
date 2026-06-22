// admin/gestion-litiges/gestion-litiges.component.ts
import { Component, OnInit } from '@angular/core';
import { AdminDisputeService, Dispute } from '../services/admin-dispute.service';

@Component({
  selector: 'app-gestion-litiges',
  templateUrl: './gestion-litiges.component.html',
  standalone: false,
})
export class GestionLitigesComponent implements OnInit {
  disputes: Dispute[] = [];

  constructor(private disputeService: AdminDisputeService) {}

  ngOnInit(): void {
    /*this.load();*/
  }

  load(): void {
    this.disputeService.getOpenDisputes().subscribe((d) => (this.disputes = d));
  }

  releaseFunds(dispute: Dispute): void {
    if (!confirm(`Libérer ${dispute.amount} FCFA vers le vendeur ?`)) return;
    this.disputeService.releaseFunds(dispute.id).subscribe(() => this.load());
  }

  refundBuyer(dispute: Dispute): void {
    if (!confirm(`Rembourser ${dispute.amount} FCFA à l'acheteur ?`)) return;
    this.disputeService.refundBuyer(dispute.id).subscribe(() => this.load());
  }
}
