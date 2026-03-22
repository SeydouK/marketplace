import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { NoAuthGuard } from './core/guards/no-auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { Role } from './core/models/role.enum';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
const routes = [
    { path: 'login', redirectTo: 'auth/login', pathMatch: 'full' },
    { path: 'register', redirectTo: 'auth/register', pathMatch: 'full' },
    { path: 'dashboard', redirectTo: 'profil/dashboard', pathMatch: 'full' },
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
        path: 'profil',
        canActivate: [AuthGuard],
        loadChildren: () => import('./features/profil/profil.module').then((m) => m.ProfilModule),
    },
    {
        path: 'admin',
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: [Role.ADMIN] },
        loadChildren: () => import('./features/admin/admin.module').then((m) => m.AdminModule),
    },
    { path: '**', redirectTo: '' },
];
export class AppRoutingModule {
    static { this.ɵfac = function AppRoutingModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AppRoutingModule)(); }; }
    static { this.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AppRoutingModule }); }
    static { this.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [RouterModule.forRoot(routes, {
                preloadingStrategy: PreloadAllModules
            }), RouterModule] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AppRoutingModule, [{
        type: NgModule,
        args: [{
                imports: [RouterModule.forRoot(routes, {
                        preloadingStrategy: PreloadAllModules
                    })],
                exports: [RouterModule],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AppRoutingModule, { imports: [i1.RouterModule], exports: [RouterModule] }); })();
//# sourceMappingURL=app-routing.module.js.map