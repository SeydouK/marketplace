// shared/services/sale.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
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

/**
 * ⚠️ TODO backend : le contrôleur /api/transactions n'existe pas encore.
 * Les appels HTTP sont commentés pour éviter des 404 ; les méthodes
 * renvoient des valeurs neutres en attendant l'implémentation serveur.
 */
@Injectable({ providedIn: 'root' })
export class SaleService {
  private base = `${environment.apiUrl}/transactions`;

  constructor(private http: HttpClient) {}

  // Ventes (côté vendeur)
  getMySales(): Observable<Sale[]> {
    // TODO backend : return this.http.get<Sale[]>(`${this.base}/mes-ventes`);
    return of([]);
  }

  // Achats (côté acheteur)
  getMyPurchases(): Observable<Sale[]> {
    // TODO backend : return this.http.get<Sale[]>(`${this.base}/mes-achats`);
    return of([]);
  }

  // L'acheteur confirme la réception → libère les fonds
  confirmReception(transactionId: number): Observable<Sale> {
    // TODO backend : return this.http.post<Sale>(`${this.base}/${transactionId}/confirmer`, {});
    return throwError(() => new Error('API transactions non disponible : endpoint à développer.'));
  }

  // L'acheteur ouvre un litige
  openDispute(transactionId: number, reason: string): Observable<Sale> {
    // TODO backend : return this.http.post<Sale>(`${this.base}/${transactionId}/litige`, { reason });
    return throwError(() => new Error('API transactions non disponible : endpoint à développer.'));
  }
}
