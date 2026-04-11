// shared/services/sale.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export type EscrowStatus = 'PENDING' | 'FUNDS_LOCKED' | 'RELEASED' | 'DISPUTED' | 'REFUNDED';

export interface Sale {
  id: number;
  animalId: number;
  animalName: string;
  buyerName: string;
  sellerName: string;
  amount: number;
  escrowStatus: EscrowStatus;
  createdAt: string;
  updatedAt: string;
}

@Injectable({ providedIn: 'root' })
export class SaleService {
  private base = `${environment.apiUrl}/transactions`;

  constructor(private http: HttpClient) {}

  // Ventes (côté vendeur)
  getMySales(): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${this.base}/mes-ventes`);
  }

  // Achats (côté acheteur)
  getMyPurchases(): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${this.base}/mes-achats`);
  }

  // L'acheteur confirme la réception → libère les fonds
  confirmReception(transactionId: number): Observable<Sale> {
    return this.http.post<Sale>(`${this.base}/${transactionId}/confirmer`, {});
  }

  // L'acheteur ouvre un litige
  openDispute(transactionId: number, reason: string): Observable<Sale> {
    return this.http.post<Sale>(`${this.base}/${transactionId}/litige`, { reason });
  }
}
