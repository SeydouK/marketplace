// admin/services/admin-dispute.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

@Injectable({ providedIn: 'root' })
export class AdminDisputeService {
  private base = `${environment.apiUrl}/admin/litiges`;

  constructor(private http: HttpClient) {}

  getOpenDisputes(): Observable<Dispute[]> {
    return this.http.get<Dispute[]>(this.base);
  }

  releaseFunds(disputeId: number): Observable<void> {
    return this.http.post<void>(`${this.base}/${disputeId}/liberer`, {});
  }

  refundBuyer(disputeId: number): Observable<void> {
    return this.http.post<void>(`${this.base}/${disputeId}/rembourser`, {});
  }
}
