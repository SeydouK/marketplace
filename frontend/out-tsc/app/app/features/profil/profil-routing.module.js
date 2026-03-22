import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardProprietaireComponent } from './dashboard-proprietaire/dashboard-proprietaire.component';
import { MesAnnoncesComponent } from './mes-annonces/mes-annonces.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
const routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardProprietaireComponent },
    { path: 'mes-annonces', component: MesAnnoncesComponent },
];
export class ProfilRoutingModule {
    static { this.ɵfac = function ProfilRoutingModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ProfilRoutingModule)(); }; }
    static { this.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: ProfilRoutingModule }); }
    static { this.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [RouterModule.forChild(routes), RouterModule] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ProfilRoutingModule, [{
        type: NgModule,
        args: [{
                imports: [RouterModule.forChild(routes)],
                exports: [RouterModule],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(ProfilRoutingModule, { imports: [i1.RouterModule], exports: [RouterModule] }); })();
//# sourceMappingURL=profil-routing.module.js.map