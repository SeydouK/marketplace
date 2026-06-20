// admin/services/admin-dispute.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface Dispute {
  id: number;
  animalId: number;
  animalName: string;
  buyerName: string;
  sellerName: string;
  amount: number;
  disputeReason: string;
  openedAt: string;
}

/**
 * ⚠️ TODO backend : /api/admin/litiges n'existe pas encore.
 * Les appels HTTP sont commentés pour éviter des 404 ; les méthodes
 * renvoient des valeurs neutres en attendant l'implémentation serveur.
 */
@Injectable({ providedIn: 'root' })
export class AdminDisputeService {
  private base = `${environment.apiUrl}/admin/litiges`;

  constructor(private http: HttpClient) {}

  getOpenDisputes(): Observable<Dispute[]> {
    // TODO backend : return this.http.get<Dispute[]>(this.base);
    return of([]);
  }

  releaseFunds(disputeId: number): Observable<void> {
    // TODO backend : return this.http.post<void>(`${this.base}/${disputeId}/liberer`, {});
    return throwError(() => new Error('API litiges non disponible : endpoint à développer.'));
  }

  refundBuyer(disputeId: number): Observable<void> {
    // TODO backend : return this.http.post<void>(`${this.base}/${disputeId}/rembourser`, {});
    return throwError(() => new Error('API litiges non disponible : endpoint à développer.'));
  }
}
