import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MarketplaceUiService {
  private readonly animalFilterSubject = new BehaviorSubject<string>('');
  private readonly searchTermSubject = new BehaviorSubject<string>('');

  readonly animalFilter$ = this.animalFilterSubject.asObservable();
  readonly searchTerm$ = this.searchTermSubject.asObservable();

  get animalFilter(): string {
    return this.animalFilterSubject.value;
  }

  get searchTerm(): string {
    return this.searchTermSubject.value;
  }

  setAnimalFilter(value: string): void {
    this.animalFilterSubject.next(value);
  }

  setSearchTerm(value: string): void {
    this.searchTermSubject.next(value);
  }
}
