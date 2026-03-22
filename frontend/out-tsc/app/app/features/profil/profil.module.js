import { NgModule } from '@angular/core';
import { ProfilRoutingModule } from './profil-routing.module';
import { DashboardProprietaireComponent } from './dashboard-proprietaire/dashboard-proprietaire.component';
import { MesAnnoncesComponent } from './mes-annonces/mes-annonces.component';
import { SharedModule } from '../../shared/shared.module';
import * as i0 from "@angular/core";
export class ProfilModule {
    static { this.ɵfac = function ProfilModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ProfilModule)(); }; }
    static { this.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: ProfilModule }); }
    static { this.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [SharedModule, ProfilRoutingModule] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ProfilModule, [{
        type: NgModule,
        args: [{
                declarations: [DashboardProprietaireComponent, MesAnnoncesComponent],
                imports: [SharedModule, ProfilRoutingModule],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(ProfilModule, { declarations: [DashboardProprietaireComponent, MesAnnoncesComponent], imports: [SharedModule, ProfilRoutingModule] }); })();
//# sourceMappingURL=profil.module.js.map