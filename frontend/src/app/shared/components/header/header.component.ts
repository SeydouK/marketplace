// shared/components/header/header.component.ts
import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../../core/models/user.model';
import { Role } from '../../../core/models/role.enum';
import { AuthService } from '../../../core/services/auth.service';
import { MarketplaceUiService } from '../../../core/services/marketplace-ui.service';
import { NgOptimizedImage } from '@angular/common';

type TabKey = 'logements' | 'experiences' | 'services';

type AnimalFilterItem = {
  value: string;
  label: string;
  icon: string;
};

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
  activeSearchPanel: 'region' | 'date' | 'budget' | null = null;
  searchRegion = '';
  searchDate = '';
  searchBudget: number | null = null;
  dateMode: 'exact' | 'flexible' = 'exact';
  calYear = new Date().getFullYear();
  calMonth = new Date().getMonth();

  readonly animalFilters: AnimalFilterItem[] = [
    { value: '', label: 'Tout', icon: 'assets/images/infinity.png' },
    { value: 'BOVIN', label: 'Bovins', icon: 'assets/images/cow.png' },
    { value: 'OVIN', label: 'Ovins', icon: 'assets/images/sheep.png' },
    { value: 'CAPRIN', label: 'Caprins', icon: 'assets/images/sheep.png' },
    { value: 'PORCIN', label: 'Porcins', icon: 'assets/images/pig.png' },
  ];

  readonly calDays = ['L','M','M','J','V','S','D'];
  readonly flexDateOptions = ['7 derniers jours','30 derniers jours','3 derniers mois','6 derniers mois','Cette année'];
  readonly regionSuggestions = [
    { value: 'KORHOGO',      label: 'Korhogo',      sub: "Zone d'élevage principale" },
    { value: 'BOUAKE',       label: 'Bouaké',        sub: 'Marché central' },
    { value: 'ABIDJAN',      label: 'Abidjan',       sub: 'Grand marché' },
    { value: 'YAMOUSSOUKRO', label: 'Yamoussoukro',  sub: 'Capitale' },
    { value: 'SAN_PEDRO',    label: 'San-Pédro',     sub: 'Zone côtière' },
  ];
  readonly budgetPresets = [
    { label: '100 000',   value: 100000 },
    { label: '250 000',   value: 250000 },
    { label: '500 000',   value: 500000 },
    { label: '1 000 000', value: 1000000 },
    { label: 'Sans limite', value: 0 },
  ];

  constructor(
    public auth: AuthService,
    private readonly router: Router,
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly uiState: MarketplaceUiService
  ) {}

  ngOnInit(): void {
    this.currentUrl = this.router.url;
    this.syncTabFromUrl(this.currentUrl);

    this.subscriptions.add(
      this.auth.currentUser$.subscribe((user) => (this.currentUser = user))
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

    this.subscriptions.add(
      this.uiState.animalFilter$.subscribe((f) => (this.animalFilter = f))
    );

    this.subscriptions.add(
      this.uiState.searchTerm$.subscribe((t) => (this.searchTerm = t))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.menuOpen = false;
      this.activeSearchPanel = null;
    }
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  setAnimalFilter(filter: string): void {
    this.uiState.setAnimalFilter(filter);
  }

  setActiveTab(tab: TabKey): void {
    this.activeTab = tab;
  }

  focusSearch(): void {
    // Peut ouvrir un modal de recherche plus tard
  }

  private syncTabFromUrl(url: string): void {
    if (url.startsWith('/annonces')) this.activeTab = 'experiences';
    else if (url.startsWith('/services')) this.activeTab = 'services';
    else this.activeTab = 'logements';
  }

  // ── Getters ──────────────────────────────────

  get animalFilterLabel(): string {
    return this.animalFilters.find((f) => f.value === this.animalFilter)?.label ?? '';
  }

  get isAcheteur(): boolean {
    return this.auth.hasAnyRole([Role.USER, Role.ACHETEUR]);
  }

  get isVendeur(): boolean {
    return this.auth.hasRole(Role.VENDEUR);
  }

  get isVeterinaire(): boolean {
    return this.auth.hasRole(Role.VETERINAIRE);
  }

  get isAnader(): boolean {
    return this.auth.hasRole(Role.AGENT_ANADER);
  }

  get isAdmin(): boolean {
    return this.auth.hasAnyRole([Role.ADMIN, Role.ADMINISTRATEUR]);
  }

  get currentUserInitial(): string {
    return (this.currentUser?.name ?? '?').charAt(0).toUpperCase();
  }

  get isHomePage(): boolean {
    return (
      this.currentUrl === '/' ||
      this.currentUrl === '' ||
      this.currentUrl === '/home' ||
      this.currentUrl.startsWith('/home?')
    );
  }

  get roleLabel(): string {
    const labels: Partial<Record<Role, string>> = {
      [Role.USER]: 'Acheteur',
      [Role.ACHETEUR]: 'Acheteur',
      [Role.VENDEUR]: 'Vendeur',
      [Role.VETERINAIRE]: 'Vétérinaire',
      [Role.AGENT_ANADER]: 'Agent ANADER',
      [Role.ADMIN]: 'Administrateur',
      [Role.ADMINISTRATEUR]: 'Administrateur',
    };
    return this.currentUser?.role
      ? (labels[this.currentUser.role] ?? String(this.currentUser.role))
      : '';
  }

  get calMonthLabel(): string {
    return ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août',
      'Septembre','Octobre','Novembre','Décembre'][this.calMonth] + ' ' + this.calYear;
  }
  get calEmptyDays(): null[] {
    return Array((new Date(this.calYear, this.calMonth, 1).getDay() + 6) % 7).fill(null);
  }
  get calDaysInMonth(): number[] {
    return Array.from({ length: new Date(this.calYear, this.calMonth + 1, 0).getDate() }, (_, i) => i + 1);
  }
  isSelectedDay(d: number): boolean {
    return false;
  }
  isPastDay(d: number): boolean {
    return new Date(this.calYear, this.calMonth, d) < new Date(new Date().setHours(0,0,0,0));
  }
  
  openSearchPanel(panel: 'region' | 'date' | 'budget'): void {
    this.activeSearchPanel = this.activeSearchPanel === panel ? null : panel;
  }
  selectRegion(value: string): void {
    const r = this.regionSuggestions.find(x => x.value === value);
    this.searchRegion = r?.label ?? value;
    this.uiState.setSearchTerm(value);
    this.activeSearchPanel = 'date';
  }
  selectCalDay(d: number): void {
    const dt = new Date(this.calYear, this.calMonth, d);
    this.searchDate = `Depuis le ${d} ${this.calMonthLabel.split(' ')[0].slice(0,3)} ${this.calYear}`;
    this.activeSearchPanel = 'budget';
  }
  selectFlexDate(opt: string): void {
    this.searchDate = opt;
    this.activeSearchPanel = 'budget';
  }
  selectBudgetPreset(p: { label: string; value: number }): void {
    this.searchBudget = p.value || null;
  }
  prevCalMonth(): void { if (this.calMonth === 0) { this.calMonth = 11; this.calYear--; } else this.calMonth--; }
  nextCalMonth(): void { if (this.calMonth === 11) { this.calMonth = 0; this.calYear++; } else this.calMonth++; }
  submitSearch(): void {
    if (this.searchRegion) this.uiState.setSearchTerm(this.searchRegion);
    this.router.navigate(['/annonces']);
    this.activeSearchPanel = null;
  }
}
