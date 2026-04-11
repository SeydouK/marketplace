import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MarketplaceUiService } from '../../core/services/marketplace-ui.service';
import { Listing } from '../annonces/models/listing.model';
import { ListingService } from '../annonces/services/listing.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false,
})
export class HomeComponent implements OnInit, OnDestroy {
  searchTerm = '';
  animalFilter = '';
  allListings: Listing[] = [];
  private readonly subscriptions = new Subscription();

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
      this.uiState.animalFilter$.subscribe((animalFilter) => {
        this.animalFilter = animalFilter;
      })
    );

    this.subscriptions.add(
      this.uiState.searchTerm$.subscribe((searchTerm) => {
        this.searchTerm = searchTerm;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  get filteredListings(): Listing[] {
    const normalizedSearch = this.normalizeText(this.searchTerm);

    return this.allListings.filter((listing) => {
      const matchesAnimal =
        !this.animalFilter ||
        this.normalizeText(listing.animalType ?? '') === this.normalizeText(this.animalFilter);
      const matchesSearch =
        !normalizedSearch ||
        this.normalizeText(listing.title ?? '').includes(normalizedSearch) ||
        this.normalizeText(listing.location ?? '').includes(normalizedSearch);
      return matchesAnimal && matchesSearch;
    });
  }

  trackByListing(_: number, listing: Listing): string {
    return listing.id;
  }

  private normalizeText(value: string): string {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .toLowerCase();
  }
}
