import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MarketplaceUiService } from '../../core/services/marketplace-ui.service';
import { AuthService } from '../../core/services/auth.service';
import { SellerRequestService } from '../../core/services/seller-request.service';
import { Role } from '../../core/models/role.enum';
import { Listing } from '../annonces/models/listing.model';
import { ListingService } from '../annonces/services/listing.service';
import { TABASKI } from '../../core/config/temps-forts';
import { environment } from '../../../environments/environment';

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
    { value: '',        label: 'Tout voir',  icon: '' },
    { value: 'BOVIN',   label: 'Bovins',     icon: 'assets/icons/especes/bovin.svg' },
    { value: 'OVIN',    label: 'Ovins',      icon: 'assets/icons/especes/ovin.svg' },
    { value: 'CAPRIN',  label: 'Caprins',    icon: 'assets/icons/especes/caprin.svg' },
    { value: 'PORCIN',  label: 'Porcins',    icon: 'assets/icons/especes/porcin.svg' },
    { value: 'AVICOLE', label: 'Volailles',  icon: 'assets/icons/especes/avicole.svg' },
  ];

  constructor(
    private readonly listingService: ListingService,
    private readonly uiState: MarketplaceUiService,
    public readonly auth: AuthService,
    public readonly sellerRequestSvc: SellerRequestService,
    private readonly router: Router
  ) {}

  // ── Temps fort Tabaski ──────────────────────────────────────────────────

  /** Jours restants avant la Tabaski (0 le jour même, négatif une fois passée). */
  get joursAvantTabaski(): number {
    const fete = new Date(TABASKI.date + 'T00:00:00');
    const aujourdhui = new Date();
    aujourdhui.setHours(0, 0, 0, 0);
    return Math.round((fete.getTime() - aujourdhui.getTime()) / 86_400_000);
  }

  /** L'encart s'ouvre quelques semaines avant la fête et se referme deux jours après. */
  get tabaskiVisible(): boolean {
    const jours = this.joursAvantTabaski;
    if (jours < -2) return false;
    return environment.apercuTempsForts || jours <= TABASKI.ouvertureJours;
  }

  get tabaskiDate(): Date {
    return new Date(TABASKI.date + 'T00:00:00');
  }

  get tabaskiDateEstimee(): boolean {
    return TABASKI.estimee;
  }

  /** Les moutons réellement en vente : trois au plus, pour l'encart. */
  get moutonsEnVente(): Listing[] {
    return this.allListings.filter((l) => (l.animalType ?? '').toUpperCase() === TABASKI.espece).slice(0, 3);
  }

  get nombreMoutons(): number {
    return this.allListings.filter((l) => (l.animalType ?? '').toUpperCase() === TABASKI.espece).length;
  }

  voirMoutons(cible?: HTMLElement): void {
    this.setCategory(TABASKI.espece);
    cible?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

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