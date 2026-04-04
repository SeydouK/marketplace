import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Animal } from '../../animaux/models/animal.model';
import { AnimalService } from '../../animaux/services/animal.service';
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
  constructor(private readonly animalService: AnimalService) {}

  search(filter: ListingFilter = {}): Observable<Listing[]> {
    return this.list(filter);
  }

  list(filter: ListingFilter = {}): Observable<Listing[]> {
    return this.animalService
      .list({
        location: filter.location,
        type: (filter.animalType as any) || '',
        status: (filter.status as any) || '',
        minPrice: filter.minPrice ?? null,
        maxPrice: filter.maxPrice ?? null,
      })
      .pipe(map((animals) => animals.map((animal) => this.toListing(animal))));
  }

  get(id: string): Observable<Listing> {
    return this.animalService
      .get(id)
      .pipe(map((animal) => this.toListing(animal)));
  }

  myListings(): Observable<Listing[]> {
    return this.animalService
      .mine()
      .pipe(map((animals) => animals.map((animal) => this.toListing(animal))));
  }

  private toListing(animal: Animal): Listing {
    const location = animal.lieuNaissance?.trim() || 'Localisation non renseignée';
    const quantity = animal.quantity ?? 1;
    const latestHistory = animal.history?.[0]?.description?.trim();

    return {
      id: animal.id,
      title: animal.displayName || this.buildTitle(animal),
      description: latestHistory || this.buildDescription(animal, location, quantity),
      animalType: animal.type,
      price: animal.price,
      location,
      sellerId: animal.sellerId,
      sellerName: animal.sellerName,
      sellerEmail: animal.sellerEmail,
      image: animal.photos[0] || '',
      gallery: animal.photos,
      breed: animal.race || '',
      quantity,
      status: animal.status,
      qrCode: animal.qrCode,
      groupedLot: animal.groupedLot,
      latitude: this.toCoordinate(animal.latitude),
      longitude: this.toCoordinate(animal.longitude),
    };
  }

  private buildTitle(animal: Animal): string {
    if (animal.race?.trim()) {
      return `${this.formatAnimalType(animal.type)} ${animal.race.trim()}`;
    }

    return `${this.formatAnimalType(animal.type)} ${animal.qrCode}`;
  }

  private buildDescription(animal: Animal, location: string, quantity: number): string {
    const lotLabel = quantity > 1 ? `${quantity} têtes` : '1 tête';
    const groupedSuffix = animal.groupedLot
      ? 'Ce lot est suivi sous une référence commune dans le POC.'
      : 'Le dossier sanitaire reste associé à cet animal.';

    return `${lotLabel} enregistré à ${location}. ${groupedSuffix}`;
  }

  private formatAnimalType(animalType: string): string {
    return animalType.charAt(0) + animalType.slice(1).toLowerCase();
  }

  private toCoordinate(value: unknown): number | null {
    if (value == null || value === '') {
      return null;
    }

    const normalized = Number(value);
    return Number.isFinite(normalized) ? normalized : null;
  }
}
