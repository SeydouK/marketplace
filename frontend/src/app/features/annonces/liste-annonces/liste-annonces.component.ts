import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MarketplaceUiService } from '../../../core/services/marketplace-ui.service';
import { Listing } from '../models/listing.model';
import { ListingService } from '../services/listing.service';

@Component({
  selector: 'app-liste-annonces',
  templateUrl: './liste-annonces.component.html',
  styleUrls: ['./liste-annonces.component.css'],
  standalone: false,
})
export class ListeAnnoncesComponent implements OnInit, OnDestroy {
  allListings: Listing[] = [];
  location = '';
  animalType = '';
  private readonly subscriptions = new Subscription();

  readonly animalTypes = ['', 'poulet', 'boeuf', 'mouton', 'porc'];

  constructor(
    private readonly listingService: ListingService,
    private readonly uiState: MarketplaceUiService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.listingService.search({}).subscribe((listings) => {
        this.allListings = listings;
      })
    );

    this.subscriptions.add(
      this.uiState.searchTerm$.subscribe((term) => {
        this.location = term;
      })
    );

    this.subscriptions.add(
      this.uiState.animalFilter$.subscribe((filter) => {
        this.animalType = filter;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  updateLocation(value: string): void {
    this.location = value;
    this.uiState.setSearchTerm(value);
  }

  updateAnimalType(value: string): void {
    this.animalType = value;
    this.uiState.setAnimalFilter(value);
  }

  resetFilters(): void {
    this.updateLocation('');
    this.updateAnimalType('');
  }

  trackByListing(_: number, listing: Listing): number {
    return listing.id;
  }

  get filteredListings(): Listing[] {
    const normalizedLocation = this.normalizeText(this.location);
    const normalizedAnimalType = this.normalizeText(this.animalType);

    return this.allListings.filter((listing) => {
      const matchesLocation =
        !normalizedLocation ||
        this.normalizeText(listing.location).includes(normalizedLocation) ||
        this.normalizeText(listing.title).includes(normalizedLocation);
      const matchesAnimal =
        !normalizedAnimalType ||
        this.normalizeText(listing.animalType) === normalizedAnimalType;

      return matchesLocation && matchesAnimal;
    });
  }

  private normalizeText(value: string): string {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .toLowerCase();
  }
}
