import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnnoncesRoutingModule } from './annonces-routing.module';
import { ListeAnnoncesComponent } from './liste-annonces/liste-annonces.component';
import { DetailAnnonceComponent } from './detail-annonce/detail-annonce.component';
import { CreerAnnonceComponent } from './creer-annonce/creer-annonce.component';
import { SharedModule } from '../../shared/shared.module';
import * as i0 from "@angular/core";
export class AnnoncesModule {
    static { this.ɵfac = function AnnoncesModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AnnoncesModule)(); }; }
    static { this.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AnnoncesModule }); }
    static { this.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [SharedModule,
            FormsModule,
            ReactiveFormsModule,
            AnnoncesRoutingModule] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AnnoncesModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    ListeAnnoncesComponent,
                    DetailAnnonceComponent,
                    CreerAnnonceComponent,
                ],
                imports: [
                    SharedModule,
                    FormsModule,
                    ReactiveFormsModule,
                    AnnoncesRoutingModule,
                ],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AnnoncesModule, { declarations: [ListeAnnoncesComponent,
        DetailAnnonceComponent,
        CreerAnnonceComponent], imports: [SharedModule,
        FormsModule,
        ReactiveFormsModule,
        AnnoncesRoutingModule] }); })();
//# sourceMappingURL=annonces.module.js.map