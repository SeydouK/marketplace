import { Component } from '@angular/core';
import * as i0 from "@angular/core";
export class AdminHomeComponent {
    static { this.ɵfac = function AdminHomeComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AdminHomeComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AdminHomeComponent, selectors: [["app-admin-home"]], standalone: false, decls: 12, vars: 0, consts: [[1, "max-w-7xl", "mx-auto", "py-6", "px-4"], [1, "text-2xl", "font-bold", "mb-6"], [1, "grid", "grid-cols-1", "md:grid-cols-3", "gap-6"], [1, "bg-white", "rounded-lg", "shadow", "p-6"], [1, "text-gray-500", "text-sm", "font-medium"], [1, "text-3xl", "font-bold", "text-gray-900", "mt-2"], [1, "bg-white", "rounded-lg", "shadow", "p-6", "md:col-span-2"], [1, "text-gray-600", "leading-7"]], template: function AdminHomeComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "h1", 1);
            i0.ɵɵtext(2, "Espace admin");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "div", 2)(4, "div", 3)(5, "h2", 4);
            i0.ɵɵtext(6, "Administration");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "p", 5);
            i0.ɵɵtext(8, "...");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "div", 6)(10, "p", 7);
            i0.ɵɵtext(11, " Le tableau de bord administrateur n'existe pas dans le Laravel actuel. Cette page reste volontairement simple et align\u00E9e visuellement sur le dashboard pour ne pas introduire un design divergent. ");
            i0.ɵɵelementEnd()()()();
        } }, styles: ["[_nghost-%COMP%] {\n  display: block;\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AdminHomeComponent, [{
        type: Component,
        args: [{ selector: 'app-admin-home', standalone: false, template: "<section class=\"max-w-7xl mx-auto py-6 px-4\">\n  <h1 class=\"text-2xl font-bold mb-6\">Espace admin</h1>\n\n  <div class=\"grid grid-cols-1 md:grid-cols-3 gap-6\">\n    <div class=\"bg-white rounded-lg shadow p-6\">\n      <h2 class=\"text-gray-500 text-sm font-medium\">Administration</h2>\n      <p class=\"text-3xl font-bold text-gray-900 mt-2\">...</p>\n    </div>\n\n    <div class=\"bg-white rounded-lg shadow p-6 md:col-span-2\">\n      <p class=\"text-gray-600 leading-7\">\n        Le tableau de bord administrateur n'existe pas dans le Laravel actuel. Cette page reste volontairement simple\n        et align&eacute;e visuellement sur le dashboard pour ne pas introduire un design divergent.\n      </p>\n    </div>\n  </div>\n</section>\n", styles: [":host {\n  display: block;\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AdminHomeComponent, { className: "AdminHomeComponent", filePath: "src/app/features/admin/admin-home.component.ts", lineNumber: 9 }); })();
//# sourceMappingURL=admin-home.component.js.map