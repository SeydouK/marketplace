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

const routes: Routes = [
  // Redirect racine
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // Raccourcis legacy
  { path: 'login',    redirectTo: 'auth/login',    pathMatch: 'full' },
  { path: 'register', redirectTo: 'auth/register', pathMatch: 'full' },

  // Page d'accueil publique
  {
    path: 'home',
    loadChildren: () =>
      import('./features/home/home.module').then((m) => m.HomeModule),
  },

  // Auth
  {
    path: 'auth',
    canActivate: [NoAuthGuard],
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },

  // Vérification e-mail
  {
    path: 'verify-email',
    component: VerifyEmailComponent,
    canActivate: [AuthGuard],
  },

  // KYC
  {
    path: 'kyc',
    component: KycComponent,
    canActivate: [AuthGuard],
  },

  // Annonces publiques
  {
    path: 'annonces',
    loadChildren: () =>
      import('./features/annonces/annonces.module').then((m) => m.AnnoncesModule),
  },

  // Dashboard : redirect vers le bon espace selon le rôle
  {
    path: 'dashboard',
    canActivate: [AuthGuard, RoleRedirectGuard],
    children: [],
  },

  // Acheteur (USER / ACHETEUR)
  {
    path: 'acheteur',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [Role.USER, Role.ACHETEUR] },
    loadChildren: () =>
      import('./features/acheteur/acheteur.module').then((m) => m.AcheteurModule),
  },

  // Vendeur
  {
    path: 'vendeur',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [Role.VENDEUR] },
    loadChildren: () =>
      import('./features/vendeur/vendeur.module').then((m) => m.VendeurModule),
  },

  // Vétérinaire
  {
    path: 'veterinaire',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [Role.VETERINAIRE] },
    loadChildren: () =>
      import('./features/veterinaire/veterinaire.module').then((m) => m.VeterinaireModule),
  },

  // Agent ANADER
  {
    path: 'anader',
    loadChildren: () =>
      import('./features/anader/anader.module').then(m => m.AnaderModule),
    canActivate: [AuthGuard],
    data: { roles: ['AGENT_ANADER'] }
  },

  // Admin
  {
    path: 'admin',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [Role.ADMIN, Role.ADMINISTRATEUR] },
    loadChildren: () =>
      import('./features/admin/admin.module').then((m) => m.AdminModule),
  },

  // Animaux (vendeur + vétérinaire + anader + admin)
  {
    path: 'animaux',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [Role.VENDEUR, Role.VETERINAIRE, Role.AGENT_ANADER, Role.ADMIN, Role.ADMINISTRATEUR] },
    loadChildren: () =>
      import('./features/animaux/animaux.module').then((m) => m.AnimauxModule),
  },

  // Profil
  {
    path: 'profil',
    canActivate: [AuthGuard, KycGuard],
    loadChildren: () =>
      import('./features/profil/profil.module').then((m) => m.ProfilModule),
  },

  // Favoris 
  {
    path: 'favoris',
    loadChildren: () =>
      import('./features/favoris/favoris.module').then((m) => m.FavorisModule),
  },
  // Fallback
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    onSameUrlNavigation: 'reload',
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}