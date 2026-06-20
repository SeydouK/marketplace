import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { MarketplaceUiService } from '../../../core/services/marketplace-ui.service';
import { Listing } from '../models/listing.model';
import { ListingService } from '../services/listing.service';

type ListingCatalogMode = 'public' | 'mine';

@Component({
  selector: 'app-liste-annonces',
  templateUrl: './liste-annonces.component.html',
  styleUrls: ['./liste-annonces.component.css'],
  standalone: false,
})
export class ListeAnnoncesComponent implements OnInit, AfterViewInit, OnDestroy {
  private static leafletLoadPromise?: Promise<any>;

  @Input() mode?: ListingCatalogMode;

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

  // ── Filtres texte/espèce ──
  location = '';
  animalType = '';

  // ── Filtres supplémentaires ──
  region = '';
  maxPrice: number | null = null;
  statusFilter = '';
  dateFrom = '';
  dateTo = '';
  sortBy: 'recent' | 'prix-asc' | 'prix-desc' = 'recent';

  loading = true;
  mapUnavailable = false;
  activeListingId?: string;
  previewListing?: Listing;
  currentPage = 1;
  pageSize = 4;
  catalogMode: ListingCatalogMode = 'public';

  readonly placeholderImage = 'https://placehold.co/960x720/F6F1E7/2D6A4F?text=Animal';
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
    { value: 'AVICOLE', label: 'Avicoles' },
    { value: 'AUTRE', label: 'Autres espèces' },
  ];

  constructor(
    private readonly listingService: ListingService,
    private readonly uiState: MarketplaceUiService,
    public readonly auth: AuthService,
    private readonly zone: NgZone,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    @Inject(DOCUMENT) private readonly document: Document
  ) {}

  ngOnInit(): void {
    this.pageSize = this.computePageSize();
    this.catalogMode = this.resolveCatalogMode();

    this.loadListings();

    if (this.isMineCatalog) {
      return;
    }

    this.bindGlobalSearchState();
  }

  get isMineCatalog(): boolean {
    return this.catalogMode === 'mine';
  }

  get heroKicker(): string {
    return this.isMineCatalog ? 'Espace vendeur' : 'Marché bétail';
  }

  get heroTitle(): string {
    return this.isMineCatalog
      ? 'Mes animaux publiés'
      : 'Parcourir les animaux disponibles avec une vraie lecture terrain';
  }

  get heroCopy(): string {
    return this.isMineCatalog
      ? 'Retrouvez uniquement les dossiers animaux rattachés à votre compte vendeur.'
      : 'Ce catalogue réunit les dossiers validés, leur implantation sur la carte et un aperçu rapide avant consultation complète.';
  }

  get publishedStatLabel(): string {
    return this.isMineCatalog ? 'mes dossiers' : 'dossiers publiés';
  }

  get resultsTitle(): string {
    return this.isMineCatalog ? 'Mes animaux' : 'Catalogue disponible';
  }

  get resultsCaption(): string {
    return this.isMineCatalog
      ? 'Consultez vos dossiers, ouvrez un aperçu ou modifiez un animal depuis sa fiche.'
      : "Cliquez sur un dossier pour l'ouvrir en aperçu, ou utilisez la carte pour cibler un animal.";
  }

  get emptyTitle(): string {
    return this.isMineCatalog ? 'Aucun animal enregistré' : 'Aucun animal trouvé';
  }

  get emptyMessage(): string {
    return this.isMineCatalog
      ? 'Enregistrez un animal pour le voir apparaître dans votre espace vendeur.'
      : 'Modifiez vos critères de recherche pour relancer le catalogue.';
  }

  private loadListings(): void {
    this.loading = true;
    this.subscriptions.add(
      (this.isMineCatalog ? this.listingService.myListings() : this.listingService.search({})).subscribe({
        next: (listings) => {
          this.allListings = listings;
          this.loading = false;
          this.ensureSelectionStillVisible();
          this.ensurePaginationState();
          this.queueMapRefresh();
        },
        error: () => {
          this.allListings = [];
          this.loading = false;
          this.ensureSelectionStillVisible();
          this.ensurePaginationState();
          this.queueMapRefresh();
        },
      })
    );
  }

  private bindGlobalSearchState(): void {
    this.subscriptions.add(
      this.uiState.searchTerm$.subscribe((term) => {
        this.location = term;
        this.onFilterChange();
      })
    );

    this.subscriptions.add(
      this.uiState.animalFilter$.subscribe((filter) => {
        this.animalType = filter;
        this.onFilterChange();
      })
    );

    this.subscriptions.add(
      this.uiState.region$.subscribe((r) => {
        this.region = r;
        this.onFilterChange();
      })
    );

    this.subscriptions.add(
      this.uiState.maxPrice$.subscribe((price) => {
        this.maxPrice = price;
        this.onFilterChange();
      })
    );

    this.subscriptions.add(
      this.uiState.dateFrom$.subscribe((date) => {
        this.dateFrom = date;
        this.onFilterChange();
      })
    );
  }

  private resolveCatalogMode(): ListingCatalogMode {
    const routeMode = this.route.snapshot.data['listingSource'];
    return this.mode === 'mine' || routeMode === 'mine' ? 'mine' : 'public';
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
    if (!this.map) return;
    this.scheduleMapInvalidate();
  }

  // ── Computed ────────────────────────────────────────────────────────────────

  get filteredListings(): Listing[] {
    const normalizedLocation = this.normalizeText(this.location);
    const normalizedAnimalType = this.normalizeText(this.animalType);
    const normalizedRegion = this.normalizeText(this.region);

    return this.allListings.filter((listing) => {
      const matchesLocation =
        !normalizedLocation ||
        this.normalizeText(listing.sellerName ?? '').includes(normalizedLocation);

      const matchesAnimal =
        !normalizedAnimalType ||
        this.normalizeText(listing.animalType ?? '') === normalizedAnimalType;

      const matchesRegion =
        !normalizedRegion ||
        this.normalizeText(listing.location ?? '').includes(normalizedRegion);

      const matchesPrice =
        this.maxPrice === null ||
        this.maxPrice <= 0 ||
        listing.price <= this.maxPrice;

      const matchesStatus =
        !this.statusFilter ||
        this.normalizeText(listing.status ?? '') === this.normalizeText(this.statusFilter);

      const createdAt = listing.createdAt ? new Date(listing.createdAt).getTime() : null;
      const matchesDateFrom =
        !this.dateFrom || (createdAt !== null && createdAt >= new Date(this.dateFrom).getTime());
      const matchesDateTo =
        !this.dateTo || (createdAt !== null && createdAt <= new Date(this.dateTo + 'T23:59:59').getTime());

      return matchesLocation && matchesAnimal && matchesRegion && matchesPrice && matchesStatus && matchesDateFrom && matchesDateTo;
    }).sort((a, b) => {
      switch (this.sortBy) {
        case 'prix-asc':  return (a.price ?? 0) - (b.price ?? 0);
        case 'prix-desc': return (b.price ?? 0) - (a.price ?? 0);
        default: {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        }
      }
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
    return Math.max(1, Math.ceil(this.filteredListings.length / this.pageSize));
  }

  get visibleRangeStart(): number {
    return this.filteredListings.length ? (this.currentPage - 1) * this.pageSize + 1 : 0;
  }

  get visibleRangeEnd(): number {
    return this.filteredListings.length
      ? Math.min(this.currentPage * this.pageSize, this.filteredListings.length)
      : 0;
  }

  get hasPreviousPage(): boolean {
    return this.currentPage > 1;
  }

  get hasNextPage(): boolean {
    return this.currentPage < this.totalPages;
  }

  get paginationItems(): Array<number | 'ellipsis-left' | 'ellipsis-right'> {
    const total = this.totalPages;
    if (total <= 1) return [1];
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

    let start = Math.max(2, this.currentPage - 1);
    let end = Math.min(total - 1, this.currentPage + 1);

    if (this.currentPage <= 3) { start = 2; end = 4; }
    if (this.currentPage >= total - 2) { start = total - 3; end = total - 1; }

    const items: Array<number | 'ellipsis-left' | 'ellipsis-right'> = [1];
    if (start > 2) items.push('ellipsis-left');
    for (let p = start; p <= end; p++) items.push(p);
    if (end < total - 1) items.push('ellipsis-right');
    items.push(total);
    return items;
  }

  get missingCoordinatesCount(): number {
    return this.filteredListings.length - this.mappedListings.length;
  }

  get highlightedListing(): Listing | undefined {
    return this.filteredListings.find((l) => l.id === this.activeListingId);
  }

  get canEditPreview(): boolean {
    return !!this.previewListing && this.auth.currentUser?.id === this.previewListing.sellerId;
  }

  get animalTypeChips(): Array<{ label: string; count: number; value: string }> {
    return this.animalTypes
      .filter((t) => t.value)
      .map((t) => ({
        label: t.label,
        value: t.value,
        count: this.allListings.filter((l) => l.animalType === t.value).length,
      }))
      .filter((c) => c.count > 0);
  }

  // ── Actions filtres ──────────────────────────────────────────────────────────

  trackByListing(_: number, listing: Listing): string {
    return listing.id;
  }

  updateLocation(value: string): void {
    this.location = value;
    if (!this.isMineCatalog) {
      this.uiState.setSearchTerm(value);
    }
    this.ensureSelectionStillVisible();
    this.queueMapRefresh();
  }

  updateAnimalType(value: string): void {
    this.animalType = value;
    if (!this.isMineCatalog) {
      this.uiState.setAnimalFilter(value);
    }
    this.ensureSelectionStillVisible();
    this.queueMapRefresh();
  }

  updateRegion(value: string): void {
    this.region = value;
    this.onFilterChange();
  }

  updateMaxPrice(value: number | null): void {
    this.maxPrice = value;
    this.onFilterChange();
  }

  updateStatusFilter(value: string): void {
    this.statusFilter = value;
    this.onFilterChange();
  }

  updateDateFrom(value: string): void {
    this.dateFrom = value;
    this.onFilterChange();
  }

  updateDateTo(value: string): void {
    this.dateTo = value;
    this.onFilterChange();
  }

  updateSortBy(value: 'recent' | 'prix-asc' | 'prix-desc'): void {
    this.sortBy = value;
    this.onFilterChange();
  }

  resetFilters(): void {
    this.location     = '';
    this.animalType   = '';
    this.region       = '';
    this.maxPrice     = null;
    this.statusFilter = '';
    this.dateFrom     = '';
    this.dateTo       = '';
    this.sortBy       = 'recent';
    if (!this.isMineCatalog) {
      this.uiState.setSearchTerm('');
      this.uiState.setAnimalFilter('');
    }
    this.ensureSelectionStillVisible();
    this.queueMapRefresh();
  }

  goToCreateAnimal(): void {
    void this.router.navigate(['/animaux/creer']);
  }

  openListingDetails(listing: Listing, event?: Event): void {
    event?.preventDefault();
    event?.stopPropagation();
    this.closePreview();
    void this.router.navigate(['/annonces', listing.id]);
  }

  editListing(listing: Listing, event?: Event): void {
    event?.preventDefault();
    event?.stopPropagation();
    this.closePreview();
    void this.router.navigate(['/animaux', listing.id, 'editer']);
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

  // ── Pagination ───────────────────────────────────────────────────────────────

  goToPage(page: number): void {
    const next = Math.min(Math.max(page, 1), this.totalPages);
    if (next === this.currentPage) return;
    this.currentPage = next;
    this.scrollResultsIntoView();
  }

  goToPreviousPage(): void {
    if (this.hasPreviousPage) this.goToPage(this.currentPage - 1);
  }

  goToNextPage(): void {
    if (this.hasNextPage) this.goToPage(this.currentPage + 1);
  }

  isPageItem(item: number | 'ellipsis-left' | 'ellipsis-right'): item is number {
    return typeof item === 'number';
  }

  // ── Carte ────────────────────────────────────────────────────────────────────

  recenterMap(): void {
    if (!this.map) return;
    if (!this.mappedListings.length) {
      this.map.flyTo([this.defaultMapCenter.latitude, this.defaultMapCenter.longitude], 7, { duration: 0.8 });
      return;
    }
    this.fitMapToListings();
  }

  hasCoordinates(listing: Listing): boolean {
    return this.toLatLng(listing) !== null;
  }

  galleryFor(listing?: Listing): string[] {
    const gallery = (listing?.gallery ?? []).filter((img) => !!img);
    return gallery.length ? gallery : [this.placeholderImage];
  }

  // ── Privé ────────────────────────────────────────────────────────────────────

  private onFilterChange(): void {
    this.ensureSelectionStillVisible();
    this.currentPage = 1;
    this.queueMapRefresh();
  }

  private ensureSelectionStillVisible(): void {
    const visibleIds = new Set(this.filteredListings.map((l) => l.id));
    if (this.activeListingId && !visibleIds.has(this.activeListingId)) {
      this.activeListingId = undefined;
    }
    if (this.previewListing && !visibleIds.has(this.previewListing.id)) {
      this.closePreview();
    }
  }

  private ensurePaginationState(): void {
    if (!this.filteredListings.length) { this.currentPage = 1; return; }

    if (this.activeListingId) {
      const active = this.filteredListings.find((l) => l.id === this.activeListingId);
      if (active) { this.currentPage = this.pageForListing(active); return; }
    }

    this.currentPage = Math.min(Math.max(this.currentPage, 1), this.totalPages);
  }

  private queueMapRefresh(): void {
    setTimeout(() => {
      void this.ensureMapReady();
      if (this.map) this.syncMapMarkers();
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
    if (this.map || this.mapUnavailable || this.mapBootstrapping || !this.mapHost?.nativeElement) return;
    if (!this.hasRenderableMapHost()) { this.scheduleEnsureMapReady(); return; }

    this.mapBootstrapping = true;
    try {
      await this.bootstrapMap();
    } finally {
      this.mapBootstrapping = false;
    }
  }

  private ensureLeafletAssets(): Promise<any> {
    const L = (window as any).L;
    if (L) return Promise.resolve(L);

    this.ensureLeafletStyles();

    if (ListeAnnoncesComponent.leafletLoadPromise) return ListeAnnoncesComponent.leafletLoadPromise;

    ListeAnnoncesComponent.leafletLoadPromise = new Promise((resolve, reject) => {
      const existing = this.document.querySelector('script[data-leaflet-runtime="true"]') as HTMLScriptElement | null;
      if (existing) {
        existing.addEventListener('load', () => resolve((window as any).L), { once: true });
        existing.addEventListener('error', () => reject(new Error('Leaflet load failed')), { once: true });
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

    // Ne pas mettre en cache un échec : permettre une nouvelle tentative au prochain passage
    ListeAnnoncesComponent.leafletLoadPromise = ListeAnnoncesComponent.leafletLoadPromise.catch((error) => {
      ListeAnnoncesComponent.leafletLoadPromise = undefined;
      throw error;
    });

    return ListeAnnoncesComponent.leafletLoadPromise;
  }

  private ensureLeafletStyles(): void {
    if (this.document.querySelector('link[data-leaflet-runtime="true"]')) return;
    const link = this.document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/assets/vendor/leaflet/leaflet.css';
    link.dataset['leafletRuntime'] = 'true';
    this.document.head.appendChild(link);
  }

  private initializeMap(): void {
    const L = (window as any).L;
    if (!this.mapHost?.nativeElement || !L) { this.mapUnavailable = true; return; }
    if (!this.hasRenderableMapHost()) { this.scheduleEnsureMapReady(); return; }

    this.mapUnavailable = false;
    this.map = L.map(this.mapHost.nativeElement, {
      zoomControl: false,
      attributionControl: true,
      scrollWheelZoom: true,
    }).setView([this.defaultMapCenter.latitude, this.defaultMapCenter.longitude], 7);

    L.control.zoom({ position: 'topright' }).addTo(this.map);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);

    this.scheduleMapInvalidate();
  }

  private syncMapMarkers(): void {
    if (!this.map) return;
    const L = (window as any).L;
    this.markers.forEach((m) => m.remove());
    this.markers.clear();

    for (const listing of this.mappedListings) {
      const coords = this.toLatLng(listing);
      if (!coords) continue;

      const marker = L.marker(coords, {
        icon: this.buildMarkerIcon(listing, listing.id === this.activeListingId),
      }).addTo(this.map);

      marker.on('click', () => this.zone.run(() => this.openPreview(listing)));
      this.markers.set(listing.id, marker);
    }

    this.refreshMarkerStyles();
    this.fitMapToListings();
  }

  private fitMapToListings(): void {
    if (!this.map) return;

    const active = this.mappedListings.find((l) => l.id === this.activeListingId);
    if (active) { this.focusListingOnMap(active); return; }

    if (!this.mappedListings.length) {
      this.map.setView([this.defaultMapCenter.latitude, this.defaultMapCenter.longitude], 7);
      return;
    }

    const L = (window as any).L;
    const bounds = L.latLngBounds(
      this.mappedListings
        .map((l) => this.toLatLng(l))
        .filter((c): c is [number, number] => c !== null)
    );
    if (!bounds.isValid()) {
      this.map.setView([this.defaultMapCenter.latitude, this.defaultMapCenter.longitude], 7);
      return;
    }
    this.map.fitBounds(bounds, { padding: [34, 34], maxZoom: 11 });
  }

  private focusListingOnMap(listing: Listing): void {
    const coords = this.toLatLng(listing);
    if (!this.map || !coords) return;
    this.map.flyTo(coords, 12, { duration: 0.8 });
  }

  private refreshMarkerStyles(): void {
    const L = (window as any).L;
    if (!L) return;
    for (const listing of this.mappedListings) {
      const marker = this.markers.get(listing.id);
      if (marker) marker.setIcon(this.buildMarkerIcon(listing, listing.id === this.activeListingId));
    }
  }

  private buildMarkerIcon(listing: Listing, active: boolean): any {
    const bg = active ? 'linear-gradient(135deg,#1B4332 0%,#2D6A4F 100%)' : 'rgba(255,255,255,0.96)';
    const color = active ? '#ffffff' : '#1B4332';
    const shadow = active ? '0 18px 34px rgba(27,67,50,0.32)' : '0 16px 30px rgba(27,67,50,0.14)';
    const typeLabel = this.formatAnimalType(listing.animalType ?? '');
    const priceLabel = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(listing.price);

    return (window as any).L.divIcon({
      className: 'animal-marker-shell',
      html: `
        <div style="min-width:110px;padding:10px 12px;border-radius:18px;background:${bg};color:${color};border:1px solid rgba(255,255,255,0.18);box-shadow:${shadow};text-align:left;position:relative;font-family:inherit;">
          <div style="font-size:10px;font-weight:800;letter-spacing:0.16em;text-transform:uppercase;opacity:${active ? 0.78 : 0.66};">${typeLabel}</div>
          <div style="font-size:15px;font-weight:800;line-height:1.1;margin-top:3px;">${priceLabel} FCFA</div>
          <div style="position:absolute;left:16px;bottom:-8px;width:16px;height:16px;background:${active ? '#245540' : '#ffffff'};transform:rotate(45deg);border-right:1px solid rgba(45,106,79,0.14);border-bottom:1px solid rgba(45,106,79,0.14);"></div>
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
    const lat = Number(listing.latitude);
    const lng = Number(listing.longitude);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) return null;
    return [lat, lng];
  }

  private hasRenderableMapHost(): boolean {
    const host = this.mapHost?.nativeElement;
    return !!host && host.clientWidth > 0 && host.clientHeight > 0;
  }

  private scheduleEnsureMapReady(): void {
    if (this.mapReadyRetry) clearTimeout(this.mapReadyRetry);
    this.mapReadyRetry = setTimeout(() => {
      this.mapReadyRetry = undefined;
      void this.ensureMapReady();
    }, 120);
  }

  private scheduleMapInvalidate(): void {
    setTimeout(() => {
      if (!this.map || !this.hasRenderableMapHost()) return;
      this.map.invalidateSize(false);
      this.fitMapToListings();
    }, 0);
    setTimeout(() => {
      if (!this.map || !this.hasRenderableMapHost()) return;
      this.map.invalidateSize(false);
    }, 220);
  }

  private formatAnimalType(value: string): string {
    return value.charAt(0) + value.slice(1).toLowerCase();
  }

  private normalizeText(value: string): string {
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase();
  }

  private pageForListing(listing: Listing): number {
    const index = this.filteredListings.findIndex((l) => l.id === listing.id);
    return index < 0 ? this.currentPage : Math.floor(index / this.pageSize) + 1;
  }

  private computePageSize(): number {
    const w = this.document.defaultView?.innerWidth ?? 1440;
    if (w >= 1680) return 6;
    if (w >= 1280) return 4;
    if (w >= 768) return 3;
    return 2;
  }

  private updatePageSize(): void {
    const next = this.computePageSize();
    if (next === this.pageSize) return;
    const anchor = (this.currentPage - 1) * this.pageSize;
    this.pageSize = next;
    this.currentPage = this.filteredListings.length
      ? Math.floor(anchor / this.pageSize) + 1
      : 1;
    this.ensurePaginationState();
  }

  private scrollResultsIntoView(): void {
    this.resultsPanel?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  private destroyMap(): void {
    this.markers.forEach((m) => m.remove());
    this.markers.clear();
    if (this.map) { this.map.remove(); this.map = undefined; }
  }

  private toggleStatus(listing: Listing, event?: Event): void {
    event?.preventDefault();
    event?.stopPropagation();
    const newStatus = listing.status === 'DISPONIBLE' ? 'INDISPONIBLE' : 'DISPONIBLE';
    this.listingService.toggleStatus(listing.id, newStatus).subscribe({
      next: (updated) => {
        const index = this.allListings.findIndex(l => l.id === updated.id);
        if (index !== -1) this.allListings[index] = { ...this.allListings[index], ...updated };
        if (this.previewListing?.id === updated.id) this.previewListing = updated;
      }
    });
  }
}