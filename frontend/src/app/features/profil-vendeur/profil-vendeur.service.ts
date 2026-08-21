import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ProfilVendeur } from './profil-vendeur.model';
import { Listing } from '../annonces/models/listing.model';
import { ListingService } from '../annonces/services/listing.service';

@Injectable({ providedIn: 'root' })
export class ProfilVendeurService {
  private readonly base = `${environment.apiUrl}/users`;

  constructor(
    private http: HttpClient,
    private listingService: ListingService,
  ) {}

  getProfil(vendeurId: string): Observable<ProfilVendeur> {
    return this.http.get<ProfilVendeur>(`${this.base}/${vendeurId}/profil-public`);
  }

  getAnnonces(vendeurId: string): Observable<Listing[]> {
    // Le backend renvoie des AnimalDTO : sans ce mapping, le template lirait
    // imageUrls/title/location/animalType, qui n'existent pas dans le DTO.
    return this.http.get<any[]>(`${this.base}/${vendeurId}/annonces`).pipe(
      map(annonces => annonces.map(a => this.listingService.toListingFrontend(a))),
    );
  }
}
