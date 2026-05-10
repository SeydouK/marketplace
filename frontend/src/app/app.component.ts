import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './core/services/auth.service';
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

  // Routes où le header est caché sur TOUS les écrans (ex: auth)
  private readonly noHeaderRoutes: string[] = [];

  // Routes où le header ET la navbar sont cachés sur MOBILE uniquement
  // (le header reste visible sur desktop)
  mobileNoNavRoutes = [
    '/profil/parametres',
  ];

  currentUrl = '/';

  constructor(private router: Router, public auth: AuthService) {}

  ngOnInit(): void {
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

  get isAnaderOrVet(): boolean {
    return this.auth.hasAnyRole([Role.AGENT_ANADER, Role.VETERINAIRE]);
  }

  // True si on est sur une route où mobile cache header + navbar
  get isMobileNoNav(): boolean {
    return this.mobileNoNavRoutes.some(route => this.currentUrl.startsWith(route));
  }
}