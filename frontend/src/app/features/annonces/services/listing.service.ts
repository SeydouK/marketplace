import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Listing } from '../models/listing.model';

export interface ListingFilter {
  location?: string;
  animalType?: string;
  status?: string;
  minPrice?: number | null;
  maxPrice?: number | null;
}

@Injectable({ providedIn: 'root' })
export class ListingService {
  private readonly baseUrl = `${environment.apiUrl}/listings`;

  constructor(private http: HttpClient) {}

  search(filter: ListingFilter): Observable<Listing[]> {
    return this.http.post<Listing[]>(`${this.baseUrl}/search`, filter ?? {});
  }

  list(filter: ListingFilter = {}): Observable<Listing[]> {
    return this.http.get<Listing[]>(this.baseUrl, {
      params: {
        ...(filter.location ? { location: filter.location } : {}),
        ...(filter.animalType ? { animalType: filter.animalType } : {}),
        ...(filter.status ? { status: filter.status } : {}),
        ...(filter.minPrice != null ? { minPrice: String(filter.minPrice) } : {}),
        ...(filter.maxPrice != null ? { maxPrice: String(filter.maxPrice) } : {}),
      },
    });
  }

  get(id: number): Observable<Listing> {
    return this.http.get<Listing>(`${this.baseUrl}/${id}`);
  }

  create(listing: Partial<Listing>): Observable<Listing> {
    return this.http.post<Listing>(this.baseUrl, listing);
  }

  update(id: number, listing: Partial<Listing>): Observable<Listing> {
    return this.http.put<Listing>(`${this.baseUrl}/${id}`, listing);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  myListings(): Observable<Listing[]> {
    return this.http.get<Listing[]>(`${environment.apiUrl}/users/me/listings`);
  }
}
