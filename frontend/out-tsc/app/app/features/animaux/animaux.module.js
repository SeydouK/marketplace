import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AnimauxRoutingModule } from './animaux-routing.module';
import { CreerAnimalComponent } from './creer-animal/creer-animal.component';
import { MesAnimauxComponent } from './mes-animaux/mes-animaux.component';
import { ValidationSanitaireComponent } from './validation-sanitaire/validation-sanitaire.component';
import { StepsModule } from 'primeng/steps';
import * as i0 from "@angular/core";
export class AnimauxModule {
    static { this.ɵfac = function AnimauxModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AnimauxModule)(); }; }
    static { this.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AnimauxModule }); }
    static { this.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [SharedModule, FormsModule, ReactiveFormsModule, AnimauxRoutingModule, StepsModule] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AnimauxModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    CreerAnimalComponent,
                    MesAnimauxComponent,
                    ValidationSanitaireComponent,
                ],
                imports: [SharedModule, FormsModule, ReactiveFormsModule, AnimauxRoutingModule, StepsModule],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AnimauxModule, { declarations: [CreerAnimalComponent,
        MesAnimauxComponent,
        ValidationSanitaireComponent], imports: [SharedModule, FormsModule, ReactiveFormsModule, AnimauxRoutingModule, StepsModule] }); })();
//# sourceMappingURL=animaux.module.js.map