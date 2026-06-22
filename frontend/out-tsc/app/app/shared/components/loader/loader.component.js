import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/loading.service";
import * as i2 from "@angular/common";
import * as i3 from "primeng/progressspinner";
function LoaderComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵelement(1, "p-progressSpinner", 2);
    i0.ɵɵelementEnd();
} }
export class LoaderComponent {
    constructor(loadingService) {
        this.loadingService = loadingService;
        this.loading$ = this.loadingService.loading$();
    }
    static { this.ɵfac = function LoaderComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LoaderComponent)(i0.ɵɵdirectiveInject(i1.LoadingService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LoaderComponent, selectors: [["app-loader"]], standalone: false, decls: 2, vars: 3, consts: [["class", "loader-overlay", 4, "ngIf"], [1, "loader-overlay"], ["strokeWidth", "4", "styleClass", "loader-spinner"]], template: function LoaderComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, LoaderComponent_div_0_Template, 2, 0, "div", 0);
            i0.ɵɵpipe(1, "async");
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(1, 1, ctx.loading$));
        } }, dependencies: [i2.NgIf, i3.ProgressSpinner, i2.AsyncPipe], styles: [".loader-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.2);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 9999;\n}\n\n.loader-spinner[_ngcontent-%COMP%] {\n  width: 60px;\n  height: 60px;\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LoaderComponent, [{
        type: Component,
        args: [{ selector: 'app-loader', standalone: false, template: "<div class=\"loader-overlay\" *ngIf=\"loading$ | async\">\n  <p-progressSpinner strokeWidth=\"4\" styleClass=\"loader-spinner\"></p-progressSpinner>\n</div>\n", styles: [".loader-overlay {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.2);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 9999;\n}\n\n.loader-spinner {\n  width: 60px;\n  height: 60px;\n}\n"] }]
    }], () => [{ type: i1.LoadingService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(LoaderComponent, { className: "LoaderComponent", filePath: "src/app/shared/components/loader/loader.component.ts", lineNumber: 10 }); })();
//# sourceMappingURL=loader.component.js.map