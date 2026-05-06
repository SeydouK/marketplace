// features/anader/services/anader.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
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
  getPendingFarmers(): Observable<FarmerValidation[]> {
    return this.http.get<FarmerValidation[]>(`${this.base}/eleveurs/en-attente`);
  }

  validateFarmer(id: number): Observable<FarmerValidation> {
    return this.http.post<FarmerValidation>(`${this.base}/eleveurs/${id}/valider`, {});
  }

  rejectFarmer(id: number, reason: string): Observable<FarmerValidation> {
    return this.http.post<FarmerValidation>(`${this.base}/eleveurs/${id}/rejeter`, { reason });
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