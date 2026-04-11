// anader/services/anader.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface AnaderStats {
  accompagnedFarmers: number;
  registeredAnimals: number;
  pendingRfid: number;
}

export interface FarmerValidation {
  id: number;
  name: string;
  phone: string;
  zone: string;
  status: 'PENDING' | 'VALIDATED' | 'REJECTED';
  animalsCount: number;
  submittedAt: string;
}

@Injectable({ providedIn: 'root' })
export class AnaderService {
  private base = `${environment.apiUrl}/anader`;

  constructor(private http: HttpClient) {}

  getStats(): Observable<AnaderStats> {
    return this.http.get<AnaderStats>(`${this.base}/stats`);
  }

  getPendingFarmers(): Observable<FarmerValidation[]> {
    return this.http.get<FarmerValidation[]>(`${this.base}/eleveurs/en-attente`);
  }

  validateFarmer(id: number): Observable<FarmerValidation> {
    return this.http.post<FarmerValidation>(`${this.base}/eleveurs/${id}/valider`, {});
  }

  rejectFarmer(id: number, reason: string): Observable<FarmerValidation> {
    return this.http.post<FarmerValidation>(`${this.base}/eleveurs/${id}/rejeter`, { reason });
  }

  confirmRfidInsertion(animalId: number, rfidTag: string): Observable<any> {
    return this.http.post(`${this.base}/animaux/${animalId}/rfid`, { rfidTag });
  }
}
