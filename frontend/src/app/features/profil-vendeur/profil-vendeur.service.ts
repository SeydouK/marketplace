import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ProfilVendeur } from './profil-vendeur.model';
import { Listing } from '../annonces/models/listing.model';

@Injectable({ providedIn: 'root' })
export class ProfilVendeurService {
  private readonly base = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  getProfil(vendeurId: string): Observable<ProfilVendeur> {
    return this.http.get<ProfilVendeur>(`${this.base}/${vendeurId}/profil-public`);
  }

  getAnnonces(vendeurId: string): Observable<Listing[]> {
    return this.http.get<Listing[]>(`${this.base}/${vendeurId}/annonces`);
  }
}
