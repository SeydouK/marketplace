import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExperiencesComponent } from './experiences.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ServicesComponent } from './services.component';
import { SharedModule } from '../../shared/shared.module';
import * as i0 from "@angular/core";
export class HomeModule {
    static { this.ɵfac = function HomeModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || HomeModule)(); }; }
    static { this.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: HomeModule }); }
    static { this.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [SharedModule, FormsModule, HomeRoutingModule] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HomeModule, [{
        type: NgModule,
        args: [{
                declarations: [HomeComponent, ExperiencesComponent, ServicesComponent],
                imports: [SharedModule, FormsModule, HomeRoutingModule],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(HomeModule, { declarations: [HomeComponent, ExperiencesComponent, ServicesComponent], imports: [SharedModule, FormsModule, HomeRoutingModule] }); })();
//# sourceMappingURL=home.module.js.map