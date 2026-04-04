import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "./shared/components/header/header.component";
import * as i3 from "./shared/components/footer/footer.component";
import * as i4 from "./shared/components/loader/loader.component";
import * as i5 from "primeng/toast";
export class AppComponent {
    constructor() {
        this.title = 'marketplace-frontend';
    }
    static { this.ɵfac = function AppComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AppComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AppComponent, selectors: [["app-root"]], standalone: false, decls: 6, vars: 0, consts: [[1, "app-main"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelement(0, "app-header")(1, "p-toast")(2, "app-loader");
            i0.ɵɵelementStart(3, "main", 0);
            i0.ɵɵelement(4, "router-outlet");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(5, "app-footer");
        } }, dependencies: [i1.RouterOutlet, i2.HeaderComponent, i3.FooterComponent, i4.LoaderComponent, i5.Toast], styles: [".app-main[_ngcontent-%COMP%] {\n  min-height: calc(100vh - 140px);\n  padding: 0;\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AppComponent, [{
        type: Component,
        args: [{ selector: 'app-root', standalone: false, template: "<app-header></app-header>\r\n<p-toast></p-toast>\r\n<app-loader></app-loader>\r\n<main class=\"app-main\">\r\n  <router-outlet></router-outlet>\r\n</main>\r\n<app-footer></app-footer>\r\n", styles: [".app-main {\n  min-height: calc(100vh - 140px);\n  padding: 0;\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "src/app/app.component.ts", lineNumber: 9 }); })();
//# sourceMappingURL=app.component.js.map