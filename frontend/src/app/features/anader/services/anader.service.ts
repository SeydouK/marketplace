// features/anader/services/anader.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';

// ── Stats ─────────────────────────────────────────────────────────────────────
export interface AnaderStats {
  rfidInseresMois:     number;
  rfidInseresTotal:    number;
  animauxSansRfid:     number;
  remunerationEstimee: number;
}

// ── Validation éleveurs (ancienne feature, conservée) ─────────────────────────
export interface FarmerValidation {
  id:           number;
  name:         string;
  phone:        string;
  zone:         string;
  status:       'PENDING' | 'VALIDATED' | 'REJECTED';
  animalsCount: number;
  submittedAt:  string;
}

// ── Animaux sans RFID ─────────────────────────────────────────────────────────
export interface OwnerSummary {
  id:    number;   // Long Java → number TypeScript
  name:  string;
  phone: string;
}

export interface AnimalSansRfid {
  id:        string;
  qrCode:    string;
  type:      string;
  race:      string | null;
  region:    string | null;
  ville:     string | null;
  latitude:  number | null;
  longitude: number | null;
  photos:    string[];
  owner:     OwnerSummary | null;
  createdAt: string;
}

export interface PageResponse<T> {
  content:       T[];
  totalElements: number;
  totalPages:    number;
  number:        number;
  size:          number;
}

// ─────────────────────────────────────────────────────────────────────────────

@Injectable({ providedIn: 'root' })
export class AnaderService {

  private readonly base = `${environment.apiUrl}/anader`;

  constructor(private http: HttpClient) {}

  // ── Stats ──────────────────────────────────────────────────────────────────
  getStats(): Observable<AnaderStats> {
    return this.http.get<AnaderStats>(`${this.base}/stats`);
  }

  // ── Validation éleveurs ────────────────────────────────────────────────────
  // ⚠️ TODO backend : /api/anader/eleveurs/* n'existe pas encore (équivalent
  // partiel : /api/admin/seller-requests, réservé à l'admin). Appels commentés
  // pour éviter des 404.
  getPendingFarmers(): Observable<FarmerValidation[]> {
    // TODO backend : return this.http.get<FarmerValidation[]>(`${this.base}/eleveurs/en-attente`);
    return of([]);
  }

  validateFarmer(id: number): Observable<FarmerValidation> {
    // TODO backend : return this.http.post<FarmerValidation>(`${this.base}/eleveurs/${id}/valider`, {});
    return throwError(() => new Error('API validation éleveurs non disponible : endpoint à développer.'));
  }

  rejectFarmer(id: number, reason: string): Observable<FarmerValidation> {
    // TODO backend : return this.http.post<FarmerValidation>(`${this.base}/eleveurs/${id}/rejeter`, { reason });
    return throwError(() => new Error('API validation éleveurs non disponible : endpoint à développer.'));
  }

  // ── Animaux sans RFID ──────────────────────────────────────────────────────
  getAnimauxSansRfid(
    region: string | null = null,
    page = 0,
    size = 20
  ): Observable<PageResponse<AnimalSansRfid>> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size);
    if (region) {
      params = params.set('region', region);
    }
    return this.http.get<PageResponse<AnimalSansRfid>>(
      `${this.base}/animaux-sans-rfid`,
      { params }
    );
  }

  // ── Insertion RFID ─────────────────────────────────────────────────────────
  insererRfid(animalId: string, rfidTag: string): Observable<AnimalSansRfid> {
    return this.http.patch<AnimalSansRfid>(
      `${this.base}/animaux/${animalId}/rfid`,
      { rfidTag }
    );
  }
}