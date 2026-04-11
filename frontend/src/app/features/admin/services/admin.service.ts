// admin/services/admin.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { User } from '../../../core/models/user.model';
import { Role } from '../../../core/models/role.enum';

export interface AdminStats {
  totalUsers: number;
  pendingKyc: number;
  activeListings: number;
  openDisputes: number;
}

export interface UserPage {
  content: User[];
  totalElements: number;
  totalPages: number;
  number: number;
}

@Injectable({ providedIn: 'root' })
export class AdminService {
  private base = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) {}

  getStats(): Observable<AdminStats> {
    return this.http.get<AdminStats>(`${this.base}/stats`);
  }

  getUsers(params?: { filter?: string; page?: number; size?: number }): Observable<UserPage> {
    let httpParams = new HttpParams();
    if (params?.filter) httpParams = httpParams.set('filter', params.filter);
    if (params?.page !== undefined) httpParams = httpParams.set('page', params.page);
    if (params?.size !== undefined) httpParams = httpParams.set('size', params.size);
    return this.http.get<UserPage>(`${this.base}/users`, { params: httpParams });
  }

  updateUserRole(userId: number, role: Role): Observable<User> {
    return this.http.patch<User>(`${this.base}/users/${userId}/role`, { role });
  }

  validateKyc(userId: number): Observable<User> {
    return this.http.post<User>(`${this.base}/users/${userId}/kyc/validate`, {});
  }

  rejectKyc(userId: number, reason: string): Observable<User> {
    return this.http.post<User>(`${this.base}/users/${userId}/kyc/reject`, { reason });
  }

  suspendUser(userId: number): Observable<User> {
    return this.http.post<User>(`${this.base}/users/${userId}/suspend`, {});
  }
}
