import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { NoAuthGuard } from './core/guards/no-auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { RoleRedirectGuard } from './core/guards/role-redirect.guard';
import { Role } from './core/models/role.enum';
import { VerifyEmailComponent } from './features/verify-email/verify-email.component';
import { KycComponent } from './features/kyc/kyc.component';
import { KycGuard } from './features/kyc/kyc.guard';

// Import direct du composant standalone pour forcer son inclusion dans le module graph
// sans charger le module au démarrage de l'app
import { PanierComponent } from './features/panier/panier.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login',    redirectTo: 'auth/login',    pathMatch: 'full' },
  { path: 'register', redirectTo: 'auth/register', pathMatch: 'full' },

  {
    path: 'home',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'auth',
    canActivate: [NoAuthGuard],
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'verify-email',
    component: VerifyEmailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'kyc',
    component: KycComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'annonces',
    loadChildren: () => import('./features/annonces/annonces.module').then(m => m.AnnoncesModule),
  },
  {
    path: 'actualites',
    loadChildren: () => import('./features/actualites/actualites.module').then(m => m.ActualitesModule),
  },

  // ── PANIER — composant standalone, route protégée ────────────────────────
  {
    path: 'panier',
    component: PanierComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [Role.USER, Role.ACHETEUR] },
    title: 'Mon Panier — BétailMarket',
  },

  {
    path: 'dashboard',
    canActivate: [AuthGuard, RoleRedirectGuard],
    children: [],
  },
  {
    path: 'acheteur',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [Role.USER, Role.ACHETEUR] },
    loadChildren: () => import('./features/acheteur/acheteur.module').then(m => m.AcheteurModule),
  },
  {
    path: 'vendeur',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [Role.VENDEUR] },
    loadChildren: () => import('./features/vendeur/vendeur.module').then(m => m.VendeurModule),
  },
  {
    path: 'veterinaire',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [Role.VETERINAIRE] },
    loadChildren: () => import('./features/veterinaire/veterinaire.module').then(m => m.VeterinaireModule),
  },
  {
    path: 'anader',
    loadChildren: () => import('./features/anader/anader.module').then(m => m.AnaderModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.AGENT_ANADER] },
  },
  {
    path: 'admin',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [Role.ADMIN, Role.ADMINISTRATEUR] },
    loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule),
  },
  {
    path: 'animaux',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [Role.VENDEUR, Role.VETERINAIRE, Role.AGENT_ANADER, Role.ADMIN, Role.ADMINISTRATEUR] },
    loadChildren: () => import('./features/animaux/animaux.module').then(m => m.AnimauxModule),
  },
  {
    path: 'profil',
    canActivate: [AuthGuard, KycGuard],
    loadChildren: () => import('./features/profil/profil.module').then(m => m.ProfilModule),
  },
  {
    path: 'favoris',
    loadChildren: () => import('./features/favoris/favoris.module').then(m => m.FavorisModule),
  },

  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}