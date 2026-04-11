// veterinaire/services/veterinaire.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface VetStats {
  pendingInspections: number;
  certificatesIssued: number;
  healthAlerts: number;
}

export interface Certificate {
  id: number;
  animalId: number;
  animalName: string;
  type: string;
  issuedAt: string;
  expiresAt: string;
  status: 'VALID' | 'EXPIRED' | 'PENDING';
}

@Injectable({ providedIn: 'root' })
export class VeterinaireService {
  private base = `${environment.apiUrl}/veterinaire`;

  constructor(private http: HttpClient) {}

  getStats(): Observable<VetStats> {
    return this.http.get<VetStats>(`${this.base}/stats`);
  }

  getCertificates(): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(`${this.base}/certificats`);
  }

  issueCertificate(data: Partial<Certificate>): Observable<Certificate> {
    return this.http.post<Certificate>(`${this.base}/certificats`, data);
  }

  getInspections(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/inspections`);
  }
}
