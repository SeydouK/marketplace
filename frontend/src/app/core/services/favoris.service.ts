// core/services/favoris.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Listing } from '../../features/annonces/models/listing.model';

const STORAGE_KEY = 'betail_favoris';

@Injectable({ providedIn: 'root' })
export class FavorisService {
  private readonly _favoris = new BehaviorSubject<Listing[]>(this.loadFromStorage());

  readonly favoris$ = this._favoris.asObservable();

  get favoris(): Listing[] {
    return this._favoris.getValue();
  }

  isFavori(id: string): boolean {
    return this.favoris.some((l) => l.id === id);
  }

  toggle(listing: Listing): void {
    const current = this.favoris;
    const next = this.isFavori(listing.id)
      ? current.filter((l) => l.id !== listing.id)
      : [...current, listing];
    this._favoris.next(next);
    this.saveToStorage(next);
  }

  remove(id: string): void {
    const next = this.favoris.filter((l) => l.id !== id);
    this._favoris.next(next);
    this.saveToStorage(next);
  }

  clearAll(): void {
    this._favoris.next([]);
    localStorage.removeItem(STORAGE_KEY);
  }

  private loadFromStorage(): Listing[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  private saveToStorage(listings: Listing[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(listings));
    } catch {
      // silently fail if localStorage unavailable
    }
  }
}