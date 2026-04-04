import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { MarketplaceUiService } from '../../../core/services/marketplace-ui.service';
import { Listing } from '../models/listing.model';
import { ListingService } from '../services/listing.service';

@Component({
  selector: 'app-liste-annonces',
  templateUrl: './liste-annonces.component.html',
  styleUrls: ['./liste-annonces.component.css'],
  standalone: false,
})
export class ListeAnnoncesComponent implements OnInit, AfterViewInit, OnDestroy {
  private static leafletLoadPromise?: Promise<any>;

  @ViewChild('resultsPanel') resultsPanel?: ElementRef<HTMLElement>;

  @ViewChild('mapHost')
  set mapHostRef(value: ElementRef<HTMLDivElement> | undefined) {
    const hostChanged = this.mapHost?.nativeElement !== value?.nativeElement;
    this.mapHost = value;
    if (hostChanged && this.map) {
      this.destroyMap();
    }
    void this.ensureMapReady();
  }

  private mapHost?: ElementRef<HTMLDivElement>;

  private map?: any;
  private mapBootstrapping = false;
  private mapReadyRetry?: ReturnType<typeof setTimeout>;
  private readonly markers = new Map<string, any>();
  private readonly subscriptions = new Subscription();

  allListings: Listing[] = [];
  location = '';
  animalType = '';
  loading = true;
  mapUnavailable = false;
  activeListingId?: string;
  previewListing?: Listing;
  currentPage = 1;
  pageSize = 4;

  readonly placeholderImage = 'https://placehold.co/960x720/fde2e2/7f1d1d?text=Animal';
  readonly defaultMapCenter = {
    latitude: 7.539989,
    longitude: -5.54708,
  };

  readonly animalTypes: Array<{ value: string; label: string }> = [
    { value: '', label: 'Tous les animaux' },
    { value: 'BOVIN', label: 'Bovins' },
    { value: 'OVIN', label: 'Ovins' },
    { value: 'CAPRIN', label: 'Caprins' },
    { value: 'PORCIN', label: 'Porcins' },
    { value: 'AUTRE', label: 'Autres espèces' },
  ];

  constructor(
    private readonly listingService: ListingService,
    private readonly uiState: MarketplaceUiService,
    public readonly auth: AuthService,
    private readonly zone: NgZone,
    @Inject(DOCUMENT) private readonly document: Document
  ) {}

  ngOnInit(): void {
    this.pageSize = this.computePageSize();

    this.subscriptions.add(
      this.listingService.search({}).subscribe((listings) => {
        this.allListings = listings;
        this.loading = false;
        this.ensureSelectionStillVisible();
        this.ensurePaginationState();
        this.queueMapRefresh();
      })
    );

    this.subscriptions.add(
      this.uiState.searchTerm$.subscribe((term) => {
        this.location = term;
        this.ensureSelectionStillVisible();
        this.ensurePaginationState();
        this.queueMapRefresh();
      })
    );

    this.subscriptions.add(
      this.uiState.animalFilter$.subscribe((filter) => {
        this.animalType = filter;
        this.ensureSelectionStillVisible();
        this.ensurePaginationState();
        this.queueMapRefresh();
      })
    );
  }

  ngAfterViewInit(): void {
    void this.ensureMapReady();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.toggleBodyScroll(true);
    if (this.mapReadyRetry) {
      clearTimeout(this.mapReadyRetry);
      this.mapReadyRetry = undefined;
    }

    this.destroyMap();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closePreview();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.updatePageSize();

    if (!this.map) {
      return;
    }

    this.scheduleMapInvalidate();
  }

  get filteredListings(): Listing[] {
    const normalizedLocation = this.normalizeText(this.location);
    const normalizedAnimalType = this.normalizeText(this.animalType);

    return this.allListings.filter((listing) => {
      const matchesLocation =
        !normalizedLocation ||
        this.normalizeText(listing.location).includes(normalizedLocation) ||
        this.normalizeText(listing.title).includes(normalizedLocation) ||
        this.normalizeText(listing.breed || '').includes(normalizedLocation) ||
        this.normalizeText(listing.sellerName || '').includes(normalizedLocation);
      const matchesAnimal =
        !normalizedAnimalType ||
        this.normalizeText(listing.animalType) === normalizedAnimalType;

      return matchesLocation && matchesAnimal;
    });
  }

  get mappedListings(): Listing[] {
    return this.filteredListings.filter((listing) => this.hasCoordinates(listing));
  }

  get paginatedListings(): Listing[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredListings.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages(): number {
    const total = Math.ceil(this.filteredListings.length / this.pageSize);
    return Math.max(1, total);
  }

  get visibleRangeStart(): number {
    if (!this.filteredListings.length) {
      return 0;
    }

    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get visibleRangeEnd(): number {
    if (!this.filteredListings.length) {
      return 0;
    }

    return Math.min(this.currentPage * this.pageSize, this.filteredListings.length);
  }

  get hasPreviousPage(): boolean {
    return this.currentPage > 1;
  }

  get hasNextPage(): boolean {
    return this.currentPage < this.totalPages;
  }

  get paginationItems(): Array<number | 'ellipsis-left' | 'ellipsis-right'> {
    const total = this.totalPages;

    if (total <= 1) {
      return [1];
    }

    if (total <= 7) {
      return Array.from({ length: total }, (_, index) => index + 1);
    }

    let start = Math.max(2, this.currentPage - 1);
    let end = Math.min(total - 1, this.currentPage + 1);

    if (this.currentPage <= 3) {
      start = 2;
      end = 4;
    }

    if (this.currentPage >= total - 2) {
      start = total - 3;
      end = total - 1;
    }

    const items: Array<number | 'ellipsis-left' | 'ellipsis-right'> = [1];

    if (start > 2) {
      items.push('ellipsis-left');
    }

    for (let page = start; page <= end; page += 1) {
      items.push(page);
    }

    if (end < total - 1) {
      items.push('ellipsis-right');
    }

    items.push(total);
    return items;
  }

  get missingCoordinatesCount(): number {
    return this.filteredListings.length - this.mappedListings.length;
  }

  get highlightedListing(): Listing | undefined {
    return this.filteredListings.find((listing) => listing.id === this.activeListingId);
  }

  get canEditPreview(): boolean {
    return !!this.previewListing && this.auth.currentUser?.id === this.previewListing.sellerId;
  }

  get animalTypeChips(): Array<{ label: string; count: number; value: string }> {
    return this.animalTypes
      .filter((type) => type.value)
      .map((type) => ({
        label: type.label,
        value: type.value,
        count: this.allListings.filter((listing) => listing.animalType === type.value).length,
      }))
      .filter((chip) => chip.count > 0);
  }

  trackByListing(_: number, listing: Listing): string {
    return listing.id;
  }

  updateLocation(value: string): void {
    this.location = value;
    this.uiState.setSearchTerm(value);
    this.ensureSelectionStillVisible();
    this.queueMapRefresh();
  }

  updateAnimalType(value: string): void {
    this.animalType = value;
    this.uiState.setAnimalFilter(value);
    this.ensureSelectionStillVisible();
    this.queueMapRefresh();
  }

  resetFilters(): void {
    this.location = '';
    this.animalType = '';
    this.uiState.setSearchTerm('');
    this.uiState.setAnimalFilter('');
    this.ensureSelectionStillVisible();
    this.queueMapRefresh();
  }

  openPreview(listing: Listing, event?: Event): void {
    event?.preventDefault();
    event?.stopPropagation();
    this.syncPageWithListing(listing);
    this.previewListing = listing;
    this.activeListingId = listing.id;
    this.toggleBodyScroll(false);
    this.focusListingOnMap(listing);
    this.refreshMarkerStyles();
  }

  closePreview(): void {
    this.previewListing = undefined;
    this.toggleBodyScroll(true);
  }

  focusListing(listing: Listing, event?: Event): void {
    event?.preventDefault();
    event?.stopPropagation();
    this.syncPageWithListing(listing);
    this.activeListingId = listing.id;
    this.focusListingOnMap(listing);
    this.refreshMarkerStyles();
  }

  goToPage(page: number): void {
    const nextPage = Math.min(Math.max(page, 1), this.totalPages);
    if (nextPage === this.currentPage) {
      return;
    }

    this.currentPage = nextPage;
    this.scrollResultsIntoView();
  }

  goToPreviousPage(): void {
    if (!this.hasPreviousPage) {
      return;
    }

    this.goToPage(this.currentPage - 1);
  }

  goToNextPage(): void {
    if (!this.hasNextPage) {
      return;
    }

    this.goToPage(this.currentPage + 1);
  }

  isPageItem(item: number | 'ellipsis-left' | 'ellipsis-right'): item is number {
    return typeof item === 'number';
  }

  recenterMap(): void {
    if (!this.map) {
      return;
    }

    if (!this.mappedListings.length) {
      this.map.flyTo(
        [this.defaultMapCenter.latitude, this.defaultMapCenter.longitude],
        7,
        { duration: 0.8 }
      );
      return;
    }

    this.fitMapToListings();
  }

  hasCoordinates(listing: Listing): boolean {
    return this.toLatLng(listing) !== null;
  }

  galleryFor(listing?: Listing): string[] {
    const gallery = (listing?.gallery ?? []).filter((image) => !!image);
    return gallery.length ? gallery : [this.placeholderImage];
  }

  private ensureSelectionStillVisible(): void {
    const visibleIds = new Set(this.filteredListings.map((listing) => listing.id));

    if (this.activeListingId && !visibleIds.has(this.activeListingId)) {
      this.activeListingId = undefined;
    }

    if (this.previewListing && !visibleIds.has(this.previewListing.id)) {
      this.closePreview();
    }
  }

  private ensurePaginationState(): void {
    if (!this.filteredListings.length) {
      this.currentPage = 1;
      return;
    }

    if (this.activeListingId) {
      const activeListing = this.filteredListings.find(
        (listing) => listing.id === this.activeListingId
      );

      if (activeListing) {
        this.currentPage = this.pageForListing(activeListing);
        return;
      }
    }

    this.currentPage = Math.min(Math.max(this.currentPage, 1), this.totalPages);
  }

  private queueMapRefresh(): void {
    setTimeout(() => {
      void this.ensureMapReady();
      if (this.map) {
        this.syncMapMarkers();
      }
    }, 0);
  }

  private syncPageWithListing(listing: Listing): void {
    this.currentPage = this.pageForListing(listing);
  }

  private async bootstrapMap(): Promise<void> {
    try {
      await this.ensureLeafletAssets();
      this.initializeMap();
      this.syncMapMarkers();
    } catch {
      this.mapUnavailable = true;
    }
  }

  private async ensureMapReady(): Promise<void> {
    if (this.map || this.mapUnavailable || this.mapBootstrapping || !this.mapHost?.nativeElement) {
      return;
    }

    if (!this.hasRenderableMapHost()) {
      this.scheduleEnsureMapReady();
      return;
    }

    this.mapBootstrapping = true;
    try {
      await this.bootstrapMap();
    } finally {
      this.mapBootstrapping = false;
    }
  }

  private ensureLeafletAssets(): Promise<any> {
    const leaflet = (window as any).L;
    if (leaflet) {
      return Promise.resolve(leaflet);
    }

    this.ensureLeafletStyles();

    if (ListeAnnoncesComponent.leafletLoadPromise) {
      return ListeAnnoncesComponent.leafletLoadPromise;
    }

    ListeAnnoncesComponent.leafletLoadPromise = new Promise((resolve, reject) => {
      const existingScript = this.document.querySelector(
        'script[data-leaflet-runtime="true"]'
      ) as HTMLScriptElement | null;

      if (existingScript) {
        existingScript.addEventListener('load', () => resolve((window as any).L), {
          once: true,
        });
        existingScript.addEventListener(
          'error',
          () => reject(new Error('Leaflet load failed')),
          { once: true }
        );
        return;
      }

      const script = this.document.createElement('script');
      script.src = '/assets/vendor/leaflet/leaflet.js';
      script.async = true;
      script.defer = true;
      script.dataset['leafletRuntime'] = 'true';
      script.onload = () => resolve((window as any).L);
      script.onerror = () => reject(new Error('Leaflet script could not be loaded'));
      this.document.body.appendChild(script);
    });

    return ListeAnnoncesComponent.leafletLoadPromise;
  }

  private ensureLeafletStyles(): void {
    const existingLink = this.document.querySelector(
      'link[data-leaflet-runtime="true"]'
    ) as HTMLLinkElement | null;

    if (existingLink) {
      return;
    }

    const link = this.document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/assets/vendor/leaflet/leaflet.css';
    link.dataset['leafletRuntime'] = 'true';
    this.document.head.appendChild(link);
  }

  private initializeMap(): void {
    const leaflet = (window as any).L;
    if (!this.mapHost?.nativeElement || !leaflet) {
      this.mapUnavailable = true;
      return;
    }

    if (!this.hasRenderableMapHost()) {
      this.scheduleEnsureMapReady();
      return;
    }

    this.mapUnavailable = false;
    this.map = leaflet
      .map(this.mapHost.nativeElement, {
        zoomControl: false,
        attributionControl: true,
        scrollWheelZoom: true,
      })
      .setView([this.defaultMapCenter.latitude, this.defaultMapCenter.longitude], 7);

    leaflet.control.zoom({ position: 'topright' }).addTo(this.map);

    leaflet
      .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
      })
      .addTo(this.map);

    this.scheduleMapInvalidate();
  }

  private syncMapMarkers(): void {
    if (!this.map) {
      return;
    }

    const leaflet = (window as any).L;
    this.markers.forEach((marker) => marker.remove());
    this.markers.clear();

    for (const listing of this.mappedListings) {
      const coordinates = this.toLatLng(listing);
      if (!coordinates) {
        continue;
      }

      const marker = leaflet
        .marker(coordinates, {
          icon: this.buildMarkerIcon(listing, listing.id === this.activeListingId),
        })
        .addTo(this.map);

      marker.on('click', () => {
        this.zone.run(() => {
          this.openPreview(listing);
        });
      });

      this.markers.set(listing.id, marker);
    }

    this.refreshMarkerStyles();
    this.fitMapToListings();
  }

  private fitMapToListings(): void {
    if (!this.map) {
      return;
    }

    const activeListing = this.mappedListings.find(
      (listing) => listing.id === this.activeListingId
    );

    if (activeListing) {
      this.focusListingOnMap(activeListing);
      return;
    }

    if (!this.mappedListings.length) {
      this.map.setView([this.defaultMapCenter.latitude, this.defaultMapCenter.longitude], 7);
      return;
    }

    const leaflet = (window as any).L;
    const bounds = leaflet.latLngBounds(
      this.mappedListings
        .map((listing) => this.toLatLng(listing))
        .filter((coordinates): coordinates is [number, number] => coordinates !== null)
    );
    if (!bounds.isValid()) {
      this.map.setView([this.defaultMapCenter.latitude, this.defaultMapCenter.longitude], 7);
      return;
    }

    this.map.fitBounds(bounds, {
      padding: [34, 34],
      maxZoom: 11,
    });
  }

  private focusListingOnMap(listing: Listing): void {
    const coordinates = this.toLatLng(listing);
    if (!this.map || !coordinates) {
      return;
    }

    this.map.flyTo(coordinates, 12, {
      duration: 0.8,
    });
  }

  private refreshMarkerStyles(): void {
    const leaflet = (window as any).L;
    if (!leaflet) {
      return;
    }

    for (const listing of this.mappedListings) {
      const marker = this.markers.get(listing.id);
      if (!marker) {
        continue;
      }

      marker.setIcon(this.buildMarkerIcon(listing, listing.id === this.activeListingId));
    }
  }

  private buildMarkerIcon(listing: Listing, active: boolean): any {
    const badgeBackground = active
      ? 'linear-gradient(135deg,#7f1d1d 0%,#dc2626 100%)'
      : 'rgba(255,255,255,0.96)';
    const badgeColor = active ? '#ffffff' : '#7f1d1d';
    const badgeShadow = active
      ? '0 18px 34px rgba(127,29,29,0.32)'
      : '0 16px 30px rgba(127,29,29,0.14)';
    const typeLabel = this.formatAnimalType(listing.animalType);
    const priceLabel = new Intl.NumberFormat('fr-FR', {
      maximumFractionDigits: 0,
    }).format(listing.price);

    return (window as any).L.divIcon({
      className: 'animal-marker-shell',
      html: `
        <div style="
          min-width: 110px;
          padding: 10px 12px;
          border-radius: 18px;
          background: ${badgeBackground};
          color: ${badgeColor};
          border: 1px solid rgba(255,255,255,0.18);
          box-shadow: ${badgeShadow};
          text-align: left;
          position: relative;
          font-family: inherit;
        ">
          <div style="font-size: 10px; font-weight: 800; letter-spacing: 0.16em; text-transform: uppercase; opacity: ${active ? 0.78 : 0.66};">
            ${typeLabel}
          </div>
          <div style="font-size: 15px; font-weight: 800; line-height: 1.1; margin-top: 3px;">
            ${priceLabel} FCFA
          </div>
          <div style="
            position: absolute;
            left: 16px;
            bottom: -8px;
            width: 16px;
            height: 16px;
            background: ${active ? '#991b1b' : '#ffffff'};
            transform: rotate(45deg);
            border-right: 1px solid rgba(220,38,38,0.14);
            border-bottom: 1px solid rgba(220,38,38,0.14);
          "></div>
        </div>
      `,
      iconSize: [110, 54],
      iconAnchor: [55, 54],
      popupAnchor: [0, -42],
    });
  }

  private toggleBodyScroll(enable: boolean): void {
    this.document.body.style.overflow = enable ? '' : 'hidden';
  }

  private toLatLng(listing: Listing): [number, number] | null {
    const latitude = Number(listing.latitude);
    const longitude = Number(listing.longitude);

    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      return null;
    }

    if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
      return null;
    }

    return [latitude, longitude];
  }

  private hasRenderableMapHost(): boolean {
    const host = this.mapHost?.nativeElement;
    return !!host && host.clientWidth > 0 && host.clientHeight > 0;
  }

  private scheduleEnsureMapReady(): void {
    if (this.mapReadyRetry) {
      clearTimeout(this.mapReadyRetry);
    }

    this.mapReadyRetry = setTimeout(() => {
      this.mapReadyRetry = undefined;
      void this.ensureMapReady();
    }, 120);
  }

  private scheduleMapInvalidate(): void {
    setTimeout(() => {
      if (!this.map || !this.hasRenderableMapHost()) {
        return;
      }

      this.map.invalidateSize(false);
      this.fitMapToListings();
    }, 0);

    setTimeout(() => {
      if (!this.map || !this.hasRenderableMapHost()) {
        return;
      }

      this.map.invalidateSize(false);
    }, 220);
  }

  private formatAnimalType(value: string): string {
    return value.charAt(0) + value.slice(1).toLowerCase();
  }

  private normalizeText(value: string): string {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .toLowerCase();
  }

  private pageForListing(listing: Listing): number {
    const index = this.filteredListings.findIndex((item) => item.id === listing.id);
    if (index < 0) {
      return this.currentPage;
    }

    return Math.floor(index / this.pageSize) + 1;
  }

  private computePageSize(): number {
    const viewportWidth = this.document.defaultView?.innerWidth ?? 1440;

    if (viewportWidth >= 1680) {
      return 6;
    }

    if (viewportWidth >= 1280) {
      return 4;
    }

    if (viewportWidth >= 768) {
      return 3;
    }

    return 2;
  }

  private updatePageSize(): void {
    const nextPageSize = this.computePageSize();
    if (nextPageSize === this.pageSize) {
      return;
    }

    const anchorIndex = (this.currentPage - 1) * this.pageSize;
    this.pageSize = nextPageSize;

    if (!this.filteredListings.length) {
      this.currentPage = 1;
      return;
    }

    this.currentPage = Math.floor(anchorIndex / this.pageSize) + 1;
    this.ensurePaginationState();
  }

  private scrollResultsIntoView(): void {
    this.resultsPanel?.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  private destroyMap(): void {
    this.markers.forEach((marker) => marker.remove());
    this.markers.clear();

    if (this.map) {
      this.map.remove();
      this.map = undefined;
    }
  }
}
