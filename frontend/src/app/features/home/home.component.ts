import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MarketplaceUiService } from '../../core/services/marketplace-ui.service';
import { AuthService } from '../../core/services/auth.service';
import { SellerRequestService } from '../../core/services/seller-request.service';
import { Role } from '../../core/models/role.enum';
import { Listing } from '../annonces/models/listing.model';
import { ListingService } from '../annonces/services/listing.service';

interface HomeCategory {
  value: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false,
})
export class HomeComponent implements OnInit, OnDestroy {
  searchTerm = '';
  heroSearchInput = '';
  animalFilter = '';
  allListings: Listing[] = [];
  private readonly subscriptions = new Subscription();

  readonly categories: HomeCategory[] = [
    { value: '',        label: 'Tout voir',  icon: 'assets/images/infinity.png' },
    { value: 'BOVIN',   label: 'Bovins',     icon: 'assets/images/cow.png' },
    { value: 'OVIN',    label: 'Ovins',      icon: 'assets/images/sheep.png' },
    { value: 'CAPRIN',  label: 'Caprins',    icon: 'assets/images/sheep.png' },
    { value: 'PORCIN',  label: 'Porcins',    icon: 'assets/images/pig.png' },
    { value: 'AVICOLE', label: 'Volailles',  icon: 'assets/images/chicken.png' },
  ];

  constructor(
    private readonly listingService: ListingService,
    private readonly uiState: MarketplaceUiService,
    public readonly auth: AuthService,
    public readonly sellerRequestSvc: SellerRequestService,
    private readonly router: Router
  ) {}

  get isAcheteur(): boolean {
    return this.auth.hasRole(Role.ACHETEUR) || this.auth.hasRole(Role.USER);
  }

  handlePublishClick(): void {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/auth/login']);
    } else if (this.isAcheteur) {
      this.sellerRequestSvc.open();
    } else {
      this.router.navigate(['/annonces/creer']);
    }
  }

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
        this.heroSearchInput = searchTerm;
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

  submitHeroSearch(): void {
    this.uiState.setSearchTerm(this.heroSearchInput.trim());
  }

  setCategory(value: string): void {
    this.uiState.setAnimalFilter(value);
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