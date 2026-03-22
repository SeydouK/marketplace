import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListeAnnoncesComponent } from './liste-annonces/liste-annonces.component';
import { DetailAnnonceComponent } from './detail-annonce/detail-annonce.component';
import { CreerAnnonceComponent } from './creer-annonce/creer-annonce.component';
import { AuthGuard } from '../../core/guards/auth.guard';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
const routes = [
    { path: '', component: ListeAnnoncesComponent },
    { path: 'creer', component: CreerAnnonceComponent, canActivate: [AuthGuard] },
    { path: ':id', component: DetailAnnonceComponent },
];
export class AnnoncesRoutingModule {
    static { this.ɵfac = function AnnoncesRoutingModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AnnoncesRoutingModule)(); }; }
    static { this.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AnnoncesRoutingModule }); }
    static { this.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [RouterModule.forChild(routes), RouterModule] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AnnoncesRoutingModule, [{
        type: NgModule,
        args: [{
                imports: [RouterModule.forChild(routes)],
                exports: [RouterModule],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AnnoncesRoutingModule, { imports: [i1.RouterModule], exports: [RouterModule] }); })();
//# sourceMappingURL=annonces-routing.module.js.map