// annonces/services/listing.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Listing } from '../models/listing.model';
import { map } from 'rxjs/operators';

export interface ListingPage {
  content: Listing[];
  totalElements: number;
  totalPages: number;
  number: number;
}

export interface ListingSearchParams {
  species?: string;
  region?: string;
  maxPrice?: number | null;
  certified?: string;
  page?: number;
  size?: number;
}

@Injectable({ providedIn: 'root' })
export class ListingService {
  private base = `${environment.apiUrl}/animals`;
  private readonly apiOrigin = environment.apiUrl.replace(/\/api$/, '');

  constructor(private http: HttpClient) {}

  /** Préfixe l'origine du backend aux URLs relatives /api/files/... (cross-origin en prod). */
  private resolveAssetUrl(url?: string | null): string {
    if (!url) return '';
    if (/^https?:\/\//i.test(url)) return url;
    return `${this.apiOrigin}${url}`;
  }

  // Annonces du vendeur connecté
  myListings(): Observable<Listing[]> {
    return this.http.get<any[]>(`${this.base}/mine`).pipe(
      map((animals) => animals.map((animal) => this.toListingFrontend(animal)))
    );
  }

  // Recherche marketplace publique
  searchListings(params: ListingSearchParams): Observable<ListingPage> {
    let httpParams = new HttpParams();
    if (params.species) httpParams = httpParams.set('type', params.species);
    if (params.region) httpParams = httpParams.set('location', params.region);
    if (params.maxPrice) httpParams = httpParams.set('maxPrice', params.maxPrice);
    if (params.page !== undefined) httpParams = httpParams.set('page', params.page);
    if (params.size !== undefined) httpParams = httpParams.set('size', params.size);
    return this.http.get<any[] | ListingPage>(`${this.base}`, { params: httpParams }).pipe(
      map((response) => {
        if (Array.isArray(response)) {
          const listings = response.map((animal) => this.toListingFrontend(animal));
          const page = params.page ?? 0;
          const size = (params.size ?? listings.length) || 1;
          const start = page * size;

          return {
            content: listings.slice(start, start + size),
            totalElements: listings.length,
            totalPages: Math.max(1, Math.ceil(listings.length / size)),
            number: page,
          };
        }

        return {
          ...response,
          content: response.content.map((animal) => this.toListingFrontend(animal)),
        };
      })
    );
  }


  search(params: { location?: string; animalType?: string }): Observable<Listing[]> {
    let httpParams = new HttpParams();
    if (params.location) httpParams = httpParams.set('location', params.location);
    if (params.animalType) httpParams = httpParams.set('type', params.animalType);

    return this.http.get<any[]>(`${this.base}`, { params: httpParams }).pipe(
      map(animals => animals.map(a => this.toListingFrontend(a)))
    );
  }

  private toListingFrontend(a: any): Listing {
    const photos = (a.photos || []).map((url: string) => this.resolveAssetUrl(url));
    return {
      ...a,
      id: String(a.id),
      title: a.displayName || a.race || a.type || 'Animal',
      animalType: a.type,
      location: a.lieuNaissance || '',
      breed: a.race,
      image: photos[0] || '',
      gallery: photos,
    };
  }

  getListing(id: number): Observable<Listing> {
    return this.http.get<Listing>(`${this.base}/${id}`);
  }

  deleteListing(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

  toggleStatus(id: string, status: 'DISPONIBLE' | 'INDISPONIBLE'): Observable<Listing> {
    return this.http.patch<any>(`${this.base}/${id}/status`, { status }).pipe(
      map(a => this.toListingFrontend(a))
    );
  }

  // Ajouter cette méthode au service
  get(id: string): Observable<Listing> {
    return this.http.get<any>(`${this.base}/${id}`).pipe(
      map(a => this.toListingFrontend(a))
    );
  }
}
