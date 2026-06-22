import { Component, ElementRef, HostListener, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../../core/models/user.model';
import { Role } from '../../../core/models/role.enum';
import { AuthService } from '../../../core/services/auth.service';
import { MarketplaceUiService } from '../../../core/services/marketplace-ui.service';
import { PanierService } from '../../../features/panier/services/panier.service';

type TabKey = 'logements' | 'experiences' | 'services';
type AnimalFilterItem = { value: string; label: string; icon: string };

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: false,
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentUser: User | null = null;
  currentUrl = '/';
  menuOpen = false;
  animalFilter = '';
  searchTerm = '';
  activeTab: TabKey = 'logements';
  private readonly subscriptions = new Subscription();

  // ── Panier ───────────────────────────────────────────────────────────────
  panierCount$!: Observable<number>;

  // ── Recherche desktop ────────────────────────────────────────────────────
  activeSearchPanel: 'region' | 'date' | 'budget' | null = null;
  searchRegion = '';
  searchDate = '';
  searchBudget: number | null = null;
  dateMode: 'exact' | 'flexible' = 'exact';
  calYear = new Date().getFullYear();
  calMonth = new Date().getMonth();
  private selectedCalDate: Date | null = null;

  // ── Recherche mobile ─────────────────────────────────────────────────────
  mobileSearchOpen = false;
  mobileSearchTab: 'annonces' | 'services' = 'annonces';
  mobileActiveSection: 'region' | 'date' | 'budget' | null = 'region';
  mobileRegionInput = '';

  // ── Données statiques ────────────────────────────────────────────────────
  readonly animalFilters: AnimalFilterItem[] = [
    { value: '',       label: 'Tout',     icon: 'assets/images/infinity.png' },
    { value: 'BOVIN',  label: 'Bovins',   icon: 'assets/images/cow.png' },
    { value: 'OVIN',   label: 'Ovins',    icon: 'assets/images/sheep.png' },
    { value: 'CAPRIN', label: 'Caprins',  icon: 'assets/images/sheep.png' },
    { value: 'PORCIN', label: 'Porcins',  icon: 'assets/images/pig.png' },
  ];

  readonly calDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  readonly flexDateOptions = [
    '7 derniers jours',
    '30 derniers jours',
    '3 derniers mois',
    '6 derniers mois',
    'Cette année',
  ];

  readonly regionSuggestions = [
    { value: 'KORHOGO',      label: 'Korhogo',      sub: "Zone d'élevage principale" },
    { value: 'BOUAKE',       label: 'Bouaké',        sub: 'Marché central' },
    { value: 'ABIDJAN',      label: 'Abidjan',       sub: 'Grand marché' },
    { value: 'YAMOUSSOUKRO', label: 'Yamoussoukro',  sub: 'Capitale' },
    { value: 'SAN_PEDRO',    label: 'San-Pédro',     sub: 'Zone côtière' },
  ];

  readonly budgetPresets = [
    { label: '100 000',     value: 100000 },
    { label: '250 000',     value: 250000 },
    { label: '500 000',     value: 500000 },
    { label: '1 000 000',   value: 1000000 },
    { label: 'Sans limite', value: 0 },
  ];

  readonly allMobileRegions = [
    { value: 'KORHOGO',      label: 'Korhogo',      sub: "Zone d'élevage principale", icon: 'assets/images/region-korhogo.png' },
    { value: 'BOUAKE',       label: 'Bouaké',        sub: 'Marché central',            icon: 'assets/images/region-bouake.png' },
    { value: 'ABIDJAN',      label: 'Abidjan',       sub: 'Grand marché',              icon: 'assets/images/region-abidjan.png' },
    { value: 'YAMOUSSOUKRO', label: 'Yamoussoukro',  sub: 'Capitale',                  icon: 'assets/images/region-yamoussoukro.png' },
    { value: 'SAN_PEDRO',    label: 'San-Pédro',     sub: 'Zone côtière',              icon: 'assets/images/region-sanpedro.png' },
  ];

  filteredMobileRegions = [...this.allMobileRegions];

  // ── Constructor ──────────────────────────────────────────────────────────
  constructor(
    public readonly auth: AuthService,
    private readonly router: Router,
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly uiState: MarketplaceUiService,
    private readonly panierService: PanierService,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {}

  // ── Lifecycle ────────────────────────────────────────────────────────────
  ngOnInit(): void {
    this.currentUrl = this.router.url;
    this.syncTabFromUrl(this.currentUrl);

    // Panier count réactif
    this.panierCount$ = this.panierService.count$;

    this.subscriptions.add(
      this.auth.currentUser$.subscribe((user) => {
        this.currentUser = user;
        // Charger le count dès que l'acheteur se connecte
        if (user && this.isAcheteur) {
          this.panierService.rafraichirCount().subscribe();
        }
      })
    );
    this.subscriptions.add(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.currentUrl = event.urlAfterRedirects;
          this.menuOpen = false;
          this.syncTabFromUrl(this.currentUrl);
        }
      })
    );
    this.subscriptions.add(this.uiState.animalFilter$.subscribe((f) => (this.animalFilter = f)));
    this.subscriptions.add(this.uiState.searchTerm$.subscribe((t) => (this.searchTerm = t)));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.document.body.style.overflow = '';
  }

  // ── Listeners ────────────────────────────────────────────────────────────
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.menuOpen = false;
      this.activeSearchPanel = null;
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.activeSearchPanel = null;
    this.closeMobileSearch();
  }

  // ── Menu ─────────────────────────────────────────────────────────────────
  toggleMenu(): void { this.menuOpen = !this.menuOpen; }
  closeMenu(): void  { this.menuOpen = false; }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  // ── Filtres animal / tab ─────────────────────────────────────────────────
  setAnimalFilter(filter: string): void { this.uiState.setAnimalFilter(filter); }
  setActiveTab(tab: TabKey): void       { this.activeTab = tab; }

  // ── Recherche desktop ────────────────────────────────────────────────────
  openSearchPanel(panel: 'region' | 'date' | 'budget'): void {
    this.activeSearchPanel = this.activeSearchPanel === panel ? null : panel;
  }

  selectRegion(value: string): void {
    const r = this.regionSuggestions.find((x) => x.value === value);
    this.searchRegion = r?.label ?? value;
    this.activeSearchPanel = 'date';
  }

  selectCalDay(d: number): void {
    this.selectedCalDate = new Date(this.calYear, this.calMonth, d);
    const months = ['Jan','Fév','Mar','Avr','Mai','Juin','Juil','Aoû','Sep','Oct','Nov','Déc'];
    this.searchDate = `Depuis le ${d} ${months[this.calMonth]} ${this.calYear}`;
    if (!this.mobileSearchOpen) {
      this.activeSearchPanel = 'budget';
    } else {
      this.mobileActiveSection = 'budget';
    }
  }

  selectFlexDate(opt: string): void {
    this.searchDate = opt;
    if (!this.mobileSearchOpen) {
      this.activeSearchPanel = 'budget';
    } else {
      this.mobileActiveSection = 'budget';
    }
  }

  selectBudgetPreset(p: { label: string; value: number }): void {
    this.searchBudget = p.value || null;
  }

  prevCalMonth(): void {
    if (this.calMonth === 0) { this.calMonth = 11; this.calYear--; }
    else this.calMonth--;
  }

  nextCalMonth(): void {
    if (this.calMonth === 11) { this.calMonth = 0; this.calYear++; }
    else this.calMonth++;
  }

  isSelectedDay(d: number): boolean {
    if (!this.selectedCalDate) return false;
    return (
      this.selectedCalDate.getFullYear() === this.calYear &&
      this.selectedCalDate.getMonth() === this.calMonth &&
      this.selectedCalDate.getDate() === d
    );
  }

  isPastDay(d: number): boolean {
    return new Date(this.calYear, this.calMonth, d) < new Date(new Date().setHours(0, 0, 0, 0));
  }

  submitSearch(): void {
    this.uiState.setRegion(this.searchRegion ?? '');
    this.uiState.setMaxPrice(this.searchBudget);
    this.uiState.setDateFrom(this.searchDate ?? '');
    this.activeSearchPanel = null;
    this.router.navigate(['/annonces']);
  }

  resetDesktopSearch(): void {
    this.searchRegion = '';
    this.searchDate   = '';
    this.searchBudget = null;
    this.activeSearchPanel = null;
    this.uiState.resetAll();
  }

  // ── Recherche mobile ─────────────────────────────────────────────────────
  openMobileSearch(): void {
    this.mobileSearchOpen = true;
    this.mobileActiveSection = 'region';
    this.document.body.style.overflow = 'hidden';
  }

  closeMobileSearch(): void {
    this.mobileSearchOpen = false;
    this.document.body.style.overflow = '';
  }

  toggleMobileSection(section: 'region' | 'date' | 'budget'): void {
    this.mobileActiveSection = this.mobileActiveSection === section ? null : section;
  }

  filterMobileRegions(input: string): void {
    const q = input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    this.filteredMobileRegions = this.allMobileRegions.filter((r) =>
      r.label.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(q)
    );
  }

  selectMobileRegion(r: { value: string; label: string }): void {
    this.searchRegion = r.label;
    this.uiState.setSearchTerm(r.value);
    this.mobileActiveSection = 'date';
  }

  clearMobileSearch(): void {
    this.searchRegion = '';
    this.searchDate = '';
    this.searchBudget = null;
    this.mobileRegionInput = '';
    this.selectedCalDate = null;
    this.filteredMobileRegions = [...this.allMobileRegions];
    this.uiState.setSearchTerm('');
    this.mobileActiveSection = 'region';
  }

  submitMobileSearch(): void {
    if (this.searchRegion) this.uiState.setSearchTerm(this.searchRegion);
    this.closeMobileSearch();
    this.router.navigate(['/annonces']);
  }

  // ── Getters ──────────────────────────────────────────────────────────────
  get calMonthLabel(): string {
    const months = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet',
      'Août','Septembre','Octobre','Novembre','Décembre'];
    return `${months[this.calMonth]} ${this.calYear}`;
  }

  get calEmptyDays(): null[] {
    return Array((new Date(this.calYear, this.calMonth, 1).getDay() + 6) % 7).fill(null);
  }

  get calDaysInMonth(): number[] {
    return Array.from(
      { length: new Date(this.calYear, this.calMonth + 1, 0).getDate() },
      (_, i) => i + 1
    );
  }

  get animalFilterLabel(): string {
    return this.animalFilters.find((f) => f.value === this.animalFilter)?.label ?? '';
  }

  get isAcheteur(): boolean   { return this.auth.hasAnyRole([Role.USER, Role.ACHETEUR]); }
  get isVendeur(): boolean    { return this.auth.hasRole(Role.VENDEUR); }
  get isVeterinaire(): boolean { return this.auth.hasRole(Role.VETERINAIRE); }
  get isAnader(): boolean     { return this.auth.hasRole(Role.AGENT_ANADER); }
  get isAdmin(): boolean      { return this.auth.hasAnyRole([Role.ADMIN, Role.ADMINISTRATEUR]); }

  get currentUserInitial(): string {
    return (this.currentUser?.name ?? '?').charAt(0).toUpperCase();
  }

  get isHomePage(): boolean {
    return ['/', '', '/home'].includes(this.currentUrl) || this.currentUrl.startsWith('/home?');
  }

  get roleLabel(): string {
    const labels: Partial<Record<Role, string>> = {
      [Role.USER]:           'Acheteur',
      [Role.ACHETEUR]:       'Acheteur',
      [Role.VENDEUR]:        'Vendeur',
      [Role.VETERINAIRE]:    'Vétérinaire',
      [Role.AGENT_ANADER]:   'Agent ANADER',
      [Role.ADMIN]:          'Administrateur',
      [Role.ADMINISTRATEUR]: 'Administrateur',
    };
    return this.currentUser?.role
      ? (labels[this.currentUser.role] ?? String(this.currentUser.role))
      : '';
  }

  // ── Privé ────────────────────────────────────────────────────────────────
  private syncTabFromUrl(url: string): void {
    if (url.startsWith('/annonces'))   this.activeTab = 'experiences';
    else if (url.startsWith('/services')) this.activeTab = 'services';
    else this.activeTab = 'logements';
  }
}