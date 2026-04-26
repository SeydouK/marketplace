import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { RoleGuard } from '../../core/guards/role.guard';
import { SellerGuard } from '../../core/guards/seller.guard';
import { Role } from '../../core/models/role.enum';
import { CreerAnimalComponent } from './creer-animal/creer-animal.component';
import { MesAnimauxComponent } from './mes-animaux/mes-animaux.component';
import { ValidationSanitaireComponent } from './validation-sanitaire/validation-sanitaire.component';
import { KycGuard } from '../kyc/kyc.guard';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
const routes = [
    { path: '', redirectTo: 'mes-animaux', pathMatch: 'full' },
    { path: 'creer', component: CreerAnimalComponent, canActivate: [AuthGuard, SellerGuard, KycGuard] },
    { path: ':id/editer', component: CreerAnimalComponent, canActivate: [AuthGuard, SellerGuard, KycGuard] },
    { path: 'mes-animaux', component: MesAnimauxComponent, canActivate: [AuthGuard] },
    {
        path: 'validation',
        component: ValidationSanitaireComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {
            roles: [
                // Role.AGENT_ANADER,
                Role.VETERINAIRE,
                // Role.ADMIN,
                // Role.ADMINISTRATEUR,
            ],
        },
    },
];
export class AnimauxRoutingModule {
    static { this.ɵfac = function AnimauxRoutingModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AnimauxRoutingModule)(); }; }
    static { this.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AnimauxRoutingModule }); }
    static { this.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [RouterModule.forChild(routes), RouterModule] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AnimauxRoutingModule, [{
        type: NgModule,
        args: [{
                imports: [RouterModule.forChild(routes)],
                exports: [RouterModule],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AnimauxRoutingModule, { imports: [i1.RouterModule], exports: [RouterModule] }); })();
//# sourceMappingURL=animaux-routing.module.js.map