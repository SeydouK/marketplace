import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { SellerRequest } from '../models/seller-request.model';

@Injectable({ providedIn: 'root' })
export class AdminService {
  constructor(private readonly http: HttpClient) {}

  listSellerRequests(): Observable<SellerRequest[]> {
    return this.http.get<SellerRequest[]>(`${environment.apiUrl}/admin/seller-requests`);
  }

  approveSellerRequest(userId: number): Observable<SellerRequest> {
    return this.http.post<SellerRequest>(
      `${environment.apiUrl}/admin/seller-requests/${userId}/approve`,
      {}
    );
  }
}
