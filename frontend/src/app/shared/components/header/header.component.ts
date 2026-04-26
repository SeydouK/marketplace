import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../../core/models/user.model';
import { AuthService } from '../../../core/services/auth.service';
import { MarketplaceUiService } from '../../../core/services/marketplace-ui.service';
import { ToastService } from '../../../core/services/toast.service';

type HeaderNavItem = {
  key: 'homes' | 'experiences' | 'services';
  route: string;
  desktopLabel: string;
  mobileLabel: string;
  icon: string;
};

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
  sellerRequestModalOpen = false;
  sellerRequestSubmitting = false;
  animalFilter = '';
  searchTerm = '';
  private readonly subscriptions = new Subscription();

  readonly navItems: HeaderNavItem[] = [
    {
      key: 'homes',
      route: '/',
      desktopLabel: 'Accueil',
      mobileLabel: 'Accueil',
      icon: 'assets/images/home.png',
    },
    {
      key: 'experiences',
      route: '/experiences',
      desktopLabel: 'Annonces',
      mobileLabel: 'Exp\u00E9riences',
      icon: 'assets/images/light-bulb.png',
    },
    {
      key: 'services',
      route: '/services',
      desktopLabel: 'Services',
      mobileLabel: 'Services',
      icon: 'assets/images/bell.png',
    },
  ];

  readonly animalFilters: AnimalFilterItem[] = [
    { value: '', label: 'Tout', icon: 'assets/images/infinity.png' },
    { value: 'BOVIN', label: 'Bovins', icon: 'assets/images/cow.png' },
    { value: 'OVIN', label: 'Ovins', icon: 'assets/images/sheep.png' },
    { value: 'CAPRIN', label: 'Caprins', icon: 'assets/images/sheep.png' },
    { value: 'PORCIN', label: 'Porcins', icon: 'assets/images/pig.png' },
    { value: 'AUTRE', label: 'Autres', icon: 'assets/images/infinity.png' },
  ];

  constructor(
    public auth: AuthService,
    private readonly router: Router,
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly uiState: MarketplaceUiService,
    private readonly toast: ToastService
  ) {}

  ngOnInit(): void {
    this.currentUrl = this.router.url;

    this.subscriptions.add(
      this.auth.currentUser$.subscribe((user) => {
        this.currentUser = user;
      })
    );

    if (this.auth.isLoggedIn()) {
      this.subscriptions.add(this.auth.refreshCurrentUser().subscribe());
    }

    this.subscriptions.add(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.currentUrl = event.urlAfterRedirects;
          this.menuOpen = false;
        }
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

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.menuOpen = false;
    }
  }

  logout(): void {
    this.sellerRequestModalOpen = false;
    this.auth.logout();
    this.router.navigate(['/']);
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  openSellerRequestModal(): void {
    if (!this.currentUser) {
      this.closeMenu();
      void this.router.navigate(['/login']);
      return;
    }

    if (this.auth.canAccessSellerArea || this.auth.isSellerRequestPending) {
      return;
    }

    this.closeMenu();
    this.sellerRequestModalOpen = true;
  }

  closeSellerRequestModal(): void {
    if (this.sellerRequestSubmitting) {
      return;
    }

    this.sellerRequestModalOpen = false;
  }

  submitSellerRequest(): void {
    if (this.sellerRequestSubmitting || !this.currentUser) {
      return;
    }

    this.sellerRequestSubmitting = true;
    this.auth.requestSellerAccess().subscribe({
      next: () => {
        this.sellerRequestSubmitting = false;
        this.sellerRequestModalOpen = false;
        this.toast.success('Votre demande vendeur a ete transmise a l administration.');
      },
      error: () => {
        this.sellerRequestSubmitting = false;
      },
    });
  }

  setAnimalFilter(filter: string): void {
    this.uiState.setAnimalFilter(filter);
  }

  updateSearchTerm(value: string): void {
    this.uiState.setSearchTerm(value);
  }

  isPageActive(key: HeaderNavItem['key']): boolean {
    if (key === 'homes') {
      return this.currentUrl === '/';
    }

    return this.currentUrl.startsWith(`/${key}`);
  }

  get currentUserInitial(): string {
    return (this.currentUser?.name ?? '?').charAt(0).toUpperCase();
  }

  get canAccessSellerArea(): boolean {
    return this.auth.canAccessSellerArea;
  }

  get canAccessAdminArea(): boolean {
    return this.auth.canAccessAdminArea;
  }

  get sellerRequestPending(): boolean {
    return this.auth.isSellerRequestPending;
  }
}
