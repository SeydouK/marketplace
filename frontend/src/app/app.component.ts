import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from './core/services/auth.service';
import { PanierService } from './features/panier/services/panier.service';
import { Role } from './core/models/role.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false,
})
export class AppComponent implements OnInit {
  title = 'marketplace-frontend';
  showHeader = true;
  currentUrl = '/';

  // Panier count pour le badge dans la bottom nav
  panierCount$!: Observable<number>;

  private readonly noHeaderRoutes: string[] = [];

  mobileNoNavRoutes = [
    '/profil/parametres',
  ];

  constructor(
    private router: Router,
    public auth: AuthService,
    private panierService: PanierService,
  ) {}

  ngOnInit(): void {
    this.panierCount$ = this.panierService.count$;

    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        this.currentUrl = e.urlAfterRedirects;
        this.showHeader = !this.noHeaderRoutes.some((route) =>
          this.currentUrl.startsWith(route)
        );
      });
  }

  get isLoggedIn(): boolean {
    return !!this.auth.currentUser;
  }

  get isAcheteur(): boolean {
    return this.auth.hasAnyRole([Role.USER, Role.ACHETEUR]);
  }

  get isVendeur(): boolean {
    return this.auth.hasRole(Role.VENDEUR);
  }

  get isAnaderOrVet(): boolean {
    return this.auth.hasAnyRole([Role.AGENT_ANADER, Role.VETERINAIRE]);
  }

  get isMobileNoNav(): boolean {
    return this.mobileNoNavRoutes.some(route => this.currentUrl.startsWith(route));
  }
}