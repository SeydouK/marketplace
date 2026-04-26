import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { NoAuthGuard } from './core/guards/no-auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { Role } from './core/models/role.enum';
import { VerifyEmailComponent } from './features/verify-email/verify-email.component';
import { KycComponent } from './features/kyc/kyc.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { KycGuard } from './features/kyc/kyc.guard';
import { DashboardProprietaireComponent } from './features/profil/dashboard-proprietaire/dashboard-proprietaire.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
const routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'verify-email', component: VerifyEmailComponent },
    { path: 'kyc', component: KycComponent, canActivate: [AuthGuard] },
    {
        path: '',
        loadChildren: () => import('./features/home/home.module').then((m) => m.HomeModule),
    },
    {
        path: 'auth',
        canActivate: [NoAuthGuard],
        loadChildren: () => import('./features/auth/auth.module').then((m) => m.AuthModule),
    },
    {
        path: 'annonces',
        loadChildren: () => import('./features/annonces/annonces.module').then((m) => m.AnnoncesModule),
    },
    {
        path: 'animaux',
        loadChildren: () => import('./features/animaux/animaux.module').then((m) => m.AnimauxModule),
    },
    {
        path: 'profil',
        canActivate: [AuthGuard, KycGuard],
        loadChildren: () => import('./features/profil/profil.module').then((m) => m.ProfilModule),
    },
    {
        path: 'verify-email',
        component: VerifyEmailComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'dashboard',
        component: DashboardProprietaireComponent,
        canActivate: [AuthGuard, KycGuard]
    },
    {
        path: 'kyc',
        component: KycComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'admin',
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: [Role.ADMIN, Role.ADMINISTRATEUR] },
        loadChildren: () => import('./features/admin/admin.module').then((m) => m.AdminModule),
    },
    { path: '**', redirectTo: '' },
];
export class AppRoutingModule {
    static { this.ɵfac = function AppRoutingModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AppRoutingModule)(); }; }
    static { this.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AppRoutingModule }); }
    static { this.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [RouterModule.forRoot(routes, {
                preloadingStrategy: PreloadAllModules,
                onSameUrlNavigation: 'reload'
            }), RouterModule] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AppRoutingModule, [{
        type: NgModule,
        args: [{
                imports: [RouterModule.forRoot(routes, {
                        preloadingStrategy: PreloadAllModules,
                        onSameUrlNavigation: 'reload'
                    })],
                exports: [RouterModule],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AppRoutingModule, { imports: [i1.RouterModule], exports: [RouterModule] }); })();
//# sourceMappingURL=app-routing.module.js.map