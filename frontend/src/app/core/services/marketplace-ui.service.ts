// core/services/marketplace-ui.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MarketplaceUiService {
  private readonly _searchTerm  = new BehaviorSubject<string>('');
  private readonly _animalFilter = new BehaviorSubject<string>('');
  private readonly _maxPrice    = new BehaviorSubject<number | null>(null);
  private readonly _dateFrom    = new BehaviorSubject<string>('');

  readonly searchTerm$   = this._searchTerm.asObservable();
  readonly animalFilter$ = this._animalFilter.asObservable();
  readonly maxPrice$     = this._maxPrice.asObservable();
  readonly dateFrom$     = this._dateFrom.asObservable();

  setSearchTerm(value: string): void   { this._searchTerm.next(value); }
  setAnimalFilter(value: string): void { this._animalFilter.next(value); }
  setMaxPrice(value: number | null): void { this._maxPrice.next(value); }
  setDateFrom(value: string): void     { this._dateFrom.next(value); }

  resetAll(): void {
    this._searchTerm.next('');
    this._animalFilter.next('');
    this._maxPrice.next(null);
    this._dateFrom.next('');
  }
}