import { Component, HostListener, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Role } from '../../../core/models/role.enum';
import { User } from '../../../core/models/user.model';
import { AuthService } from '../../../core/services/auth.service';
import { SellerRequestService } from '../../../core/services/seller-request.service';
import { PanierService } from '../../../features/panier/services/panier.service';

/** Chemins SVG (viewBox 24, trait) des icônes du menu. */
const ICONS = {
  home:     'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  search:   'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
  list:     'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
  chat:     'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
  heart:    'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
  cart:     'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
  user:     'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
  users:    'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
  badge:    'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
  warning:  'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
  news:     'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z',
  truck:    'M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1',
  doc:      'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  sales:    'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z',
  check:    'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  calendar: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  cog:      'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z',
  switch:   'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4',
  shop:     'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
  logout:   'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1',
  menu:     'M4 6h16M4 12h16M4 18h16',
  close:    'M6 18L18 6M6 6l12 12',
} as const;

export type NavIcon = keyof typeof ICONS;

export interface NavItem {
  label: string;
  route: string;
  icon: NavIcon;
  /** Affiche le nombre d'animaux du panier à droite de l'entrée. */
  badge?: 'panier';
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

/**
 * Navigation mobile : un seul bouton flottant "Menu" qui ouvre la liste des
 * destinations disponibles pour le rôle de l'utilisateur connecté.
 *
 * Remplace l'ancienne barre du bas. Composant autonome : le bouton et la fenêtre
 * vivent ici, sans dépendance au HeaderComponent.
 */
@Component({
  selector: 'app-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  standalone: false,
})
export class MobileNavComponent implements OnInit, OnDestroy {
  readonly icons = ICONS;

  open = false;
  user: User | null = null;
  sections: NavSection[] = [];
  switchingRole = false;
  panierCount$!: Observable<number>;

  private readonly destroy$ = new Subject<void>();

  constructor(
    public readonly auth: AuthService,
    private readonly router: Router,
    private readonly http: HttpClient,
    private readonly panierService: PanierService,
    private readonly sellerRequestSvc: SellerRequestService,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {}

  ngOnInit(): void {
    this.panierCount$ = this.panierService.count$;

    this.auth.currentUser$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      this.user = user;
      this.sections = this.buildSections();
    });

    // Toute navigation referme le menu.
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd), takeUntil(this.destroy$))
      .subscribe(() => this.close());
  }

  ngOnDestroy(): void {
    this.unlockScroll();
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ── Ouverture / fermeture ────────────────────────────────────────────────
  toggle(): void { this.open ? this.close() : this.openMenu(); }

  openMenu(): void {
    this.sections = this.buildSections();
    this.open = true;
    this.document.body.style.overflow = 'hidden';
  }

  close(): void {
    if (!this.open) return;
    this.open = false;
    this.unlockScroll();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void { this.close(); }

  private unlockScroll(): void {
    this.document.body.style.overflow = '';
  }

  // ── Rôles ────────────────────────────────────────────────────────────────
  get isAcheteur(): boolean     { return this.auth.hasAnyRole([Role.USER, Role.ACHETEUR]); }
  get isVendeur(): boolean      { return this.auth.hasRole(Role.VENDEUR); }
  get isVeterinaire(): boolean  { return this.auth.hasRole(Role.VETERINAIRE); }
  get isAnader(): boolean       { return this.auth.hasRole(Role.AGENT_ANADER); }
  get isTransporteur(): boolean { return this.auth.hasRole(Role.TRANSPORTEUR); }
  get isAdmin(): boolean        { return this.auth.hasAnyRole([Role.ADMIN, Role.ADMINISTRATEUR]); }

  get initial(): string {
    return (this.user?.name ?? '?').charAt(0).toUpperCase();
  }

  get roleLabel(): string {
    const labels: Partial<Record<Role, string>> = {
      [Role.USER]: 'Acheteur',
      [Role.ACHETEUR]: 'Acheteur',
      [Role.VENDEUR]: 'Vendeur',
      [Role.VETERINAIRE]: 'Vétérinaire',
      [Role.AGENT_ANADER]: 'Agent ANADER',
      [Role.TRANSPORTEUR]: 'Transporteur',
      [Role.ADMIN]: 'Administrateur',
      [Role.ADMINISTRATEUR]: 'Administrateur',
    };
    return this.user?.role ? (labels[this.user.role] ?? String(this.user.role)) : '';
  }

  /** Vendeur ou transporteur : peut repasser en mode acheteur. */
  get canSwitchToAcheteur(): boolean { return this.isVendeur || this.isTransporteur; }

  /** Ex-transporteur revenu en mode acheteur : peut y retourner sans nouvelle demande. */
  get canSwitchBackToTransporteur(): boolean { return this.isAcheteur && !!this.user?.estTransporteur; }

  /** Acheteur pouvant faire une demande vendeur (aucune en cours, pas transporteur). */
  get canRequestSeller(): boolean {
    return this.isAcheteur && !this.user?.devenirVendeur && !this.user?.estTransporteur;
  }

  /** Demande vendeur déjà envoyée, en attente de l'administration. */
  get sellerRequestPending(): boolean {
    return this.isAcheteur && !!this.user?.devenirVendeur && !this.user?.estTransporteur;
  }

  // ── Contenu du menu selon le rôle ────────────────────────────────────────
  private buildSections(): NavSection[] {
    if (!this.user) return [];

    const sections: NavSection[] = [];

    if (this.isAdmin) {
      sections.push({ title: 'Administration', items: [
        { label: 'Utilisateurs',         route: '/admin/utilisateurs',  icon: 'users' },
        { label: 'Modération',           route: '/admin/annonces',      icon: 'list' },
        { label: 'Permis transporteurs', route: '/admin/transporteurs', icon: 'badge' },
        { label: 'Litiges',              route: '/admin/litiges',       icon: 'warning' },
        { label: 'Actualités',           route: '/admin/actualites',    icon: 'news' },
      ]});
    } else if (this.isVendeur) {
      sections.push({ title: 'Espace vendeur', items: [
        { label: 'Mes annonces', route: '/vendeur/mes-annonces', icon: 'list' },
        { label: 'Mes ventes',   route: '/vendeur/mes-ventes',   icon: 'sales' },
      ]});
    } else if (this.isVeterinaire) {
      sections.push({ title: 'Espace vétérinaire', items: [
        { label: 'Tableau de bord',       route: '/veterinaire/dashboard',   icon: 'home' },
        { label: 'Certificats sanitaires', route: '/veterinaire/certificats', icon: 'check' },
        { label: 'Inspections',           route: '/veterinaire/inspections', icon: 'calendar' },
      ]});
    } else if (this.isAnader) {
      sections.push({ title: 'Espace ANADER', items: [
        { label: 'Tableau de bord', route: '/anader/dashboard', icon: 'home' },
      ]});
    } else if (this.isTransporteur) {
      sections.push({ title: 'Espace transporteur', items: [
        { label: 'Mes courses', route: '/transporteur/mes-courses', icon: 'truck' },
        { label: 'Mon dossier', route: '/transporteur/dossier',     icon: 'doc' },
      ]});
    } else if (this.isAcheteur) {
      sections.push({ title: 'Espace acheteur', items: [
        { label: 'Mon espace acheteur', route: '/acheteur/dashboard',  icon: 'home' },
        { label: 'Mon panier',          route: '/panier',              icon: 'cart', badge: 'panier' },
        { label: 'Mes achats',          route: '/acheteur/mes-achats', icon: 'list' },
        { label: 'Favoris',             route: '/favoris',             icon: 'heart' },
      ]});
    }

    sections.push({ title: 'Naviguer', items: [
      { label: 'Explorer',  route: '/',         icon: 'search' },
      { label: 'Annonces',  route: '/annonces', icon: 'list' },
      { label: 'Messages',  route: '/messages', icon: 'chat' },
    ]});

    sections.push({ title: 'Mon compte', items: [
      { label: 'Profil',               route: '/profil',            icon: 'user' },
      { label: 'Paramètres du compte', route: '/profil/parametres', icon: 'cog' },
    ]});

    return sections;
  }

  trackSection = (_: number, s: NavSection) => s.title;
  trackItem = (_: number, i: NavItem) => i.route + i.label;

  // ── Actions ──────────────────────────────────────────────────────────────
  switchRole(targetRole: 'ACHETEUR' | 'TRANSPORTEUR'): void {
    if (this.switchingRole) return;
    this.switchingRole = true;
    this.http.post<any>(`${environment.apiUrl}/auth/switch-role`, { targetRole })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.auth.updateSession(res.token, {
            id: res.id,
            email: res.email,
            role: res.role,
            name: res.name,
            emailVerified: res.emailVerified,
            kycStatus: res.kycStatus,
            devenirVendeur: res.devenirVendeur,
            estTransporteur: res.estTransporteur,
          });
          this.switchingRole = false;
          this.close();
          this.router.navigate([targetRole === 'TRANSPORTEUR' ? '/transporteur/dashboard' : '/home']);
        },
        error: () => { this.switchingRole = false; },
      });
  }

  requestSeller(): void {
    this.close();
    this.sellerRequestSvc.open();
  }

  logout(): void {
    this.close();
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
