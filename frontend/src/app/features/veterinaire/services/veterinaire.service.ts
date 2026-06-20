// veterinaire/services/veterinaire.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
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

/**
 * ⚠️ TODO backend : le contrôleur /api/veterinaire n'existe pas encore.
 * Les appels HTTP sont commentés pour éviter des 404 ; les méthodes
 * renvoient des valeurs neutres en attendant l'implémentation serveur.
 */
@Injectable({ providedIn: 'root' })
export class VeterinaireService {
  private base = `${environment.apiUrl}/veterinaire`;

  constructor(private http: HttpClient) {}

  getStats(): Observable<VetStats> {
    // TODO backend : return this.http.get<VetStats>(`${this.base}/stats`);
    return of({ pendingInspections: 0, certificatesIssued: 0, healthAlerts: 0 });
  }

  getCertificates(): Observable<Certificate[]> {
    // TODO backend : return this.http.get<Certificate[]>(`${this.base}/certificats`);
    return of([]);
  }

  issueCertificate(data: Partial<Certificate>): Observable<Certificate> {
    // TODO backend : return this.http.post<Certificate>(`${this.base}/certificats`, data);
    return throwError(() => new Error('API vétérinaire non disponible : endpoint à développer.'));
  }

  getInspections(): Observable<any[]> {
    // TODO backend : return this.http.get<any[]>(`${this.base}/inspections`);
    return of([]);
  }
}
