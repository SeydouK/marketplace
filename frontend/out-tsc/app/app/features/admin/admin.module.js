import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home.component';
import * as i0 from "@angular/core";
export class AdminModule {
    static { this.ɵfac = function AdminModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AdminModule)(); }; }
    static { this.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AdminModule }); }
    static { this.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [CommonModule, AdminRoutingModule] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AdminModule, [{
        type: NgModule,
        args: [{
                declarations: [AdminHomeComponent],
                imports: [CommonModule, AdminRoutingModule],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AdminModule, { declarations: [AdminHomeComponent], imports: [CommonModule, AdminRoutingModule] }); })();
//# sourceMappingURL=admin.module.js.map