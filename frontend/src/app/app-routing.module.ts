import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { NoAuthGuard } from './core/guards/no-auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { Role } from './core/models/role.enum';

const routes: Routes = [
  { path: 'login', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'register', redirectTo: 'auth/register', pathMatch: 'full' },
  { path: 'dashboard', redirectTo: 'profil/dashboard', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () =>
      import('./features/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'auth',
    canActivate: [NoAuthGuard],
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'annonces',
    loadChildren: () =>
      import('./features/annonces/annonces.module').then(
        (m) => m.AnnoncesModule
      ),
  },
  {
    path: 'animaux',
    loadChildren: () =>
      import('./features/animaux/animaux.module').then((m) => m.AnimauxModule),
  },
  {
    path: 'profil',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/profil/profil.module').then((m) => m.ProfilModule),
  },
  {
    path: 'admin',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [Role.ADMIN] },
    loadChildren: () =>
      import('./features/admin/admin.module').then((m) => m.AdminModule),
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
