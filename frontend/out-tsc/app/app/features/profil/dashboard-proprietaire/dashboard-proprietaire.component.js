import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../services/dashboard.service";
import * as i2 from "@angular/router";
export class DashboardProprietaireComponent {
    constructor(dashboardService) {
        this.dashboardService = dashboardService;
    }
    ngOnInit() {
        this.dashboardService.me().subscribe((profile) => {
            this.profile = profile;
        });
    }
    static { this.ɵfac = function DashboardProprietaireComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DashboardProprietaireComponent)(i0.ɵɵdirectiveInject(i1.DashboardService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DashboardProprietaireComponent, selectors: [["app-dashboard-proprietaire"]], standalone: false, decls: 33, vars: 1, consts: [[1, "max-w-7xl", "mx-auto", "py-6", "px-4"], [1, "text-2xl", "font-bold", "mb-6"], [1, "grid", "grid-cols-1", "md:grid-cols-3", "gap-6"], [1, "bg-white", "rounded-lg", "shadow", "p-6"], [1, "text-gray-500", "text-sm", "font-medium"], [1, "text-3xl", "font-bold", "text-gray-900", "mt-2"], [1, "mt-8"], [1, "text-xl", "font-semibold", "mb-4"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-4"], ["routerLink", "/annonces/creer", 1, "bg-red-600", "text-white", "p-4", "rounded-lg", "hover:bg-red-700", "transition", "flex", "items-center", "gap-3"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-6", "h-6"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 4v16m8-8H4"], [1, "font-medium"], ["routerLink", "/profil/mes-annonces", 1, "bg-white", "border-2", "border-gray-300", "p-4", "rounded-lg", "hover:border-red-600", "transition", "flex", "items-center", "gap-3"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"]], template: function DashboardProprietaireComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "h1", 1);
            i0.ɵɵtext(2, "Mon Dashboard");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "div", 2)(4, "div", 3)(5, "h3", 4);
            i0.ɵɵtext(6, "Mes Annonces");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "p", 5);
            i0.ɵɵtext(8);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "div", 3)(10, "h3", 4);
            i0.ɵɵtext(11, "Vues Totales");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "p", 5);
            i0.ɵɵtext(13, "0");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(14, "div", 3)(15, "h3", 4);
            i0.ɵɵtext(16, "Messages");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "p", 5);
            i0.ɵɵtext(18, "0");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(19, "div", 6)(20, "h2", 7);
            i0.ɵɵtext(21, "Actions rapides");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "div", 8)(23, "a", 9);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(24, "svg", 10);
            i0.ɵɵelement(25, "path", 11);
            i0.ɵɵelementEnd();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(26, "span", 12);
            i0.ɵɵtext(27, "Cr\u00E9er une annonce");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(28, "a", 13);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(29, "svg", 10);
            i0.ɵɵelement(30, "path", 14);
            i0.ɵɵelementEnd();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(31, "span", 12);
            i0.ɵɵtext(32, "Voir mes annonces");
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate1(" ", (ctx.profile == null ? null : ctx.profile.listingsCount) || 0, " ");
        } }, dependencies: [i2.RouterLink], styles: ["[_nghost-%COMP%] {\n  display: block;\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DashboardProprietaireComponent, [{
        type: Component,
        args: [{ selector: 'app-dashboard-proprietaire', standalone: false, template: "<div class=\"max-w-7xl mx-auto py-6 px-4\">\n  <h1 class=\"text-2xl font-bold mb-6\">Mon Dashboard</h1>\n\n  <div class=\"grid grid-cols-1 md:grid-cols-3 gap-6\">\n    <div class=\"bg-white rounded-lg shadow p-6\">\n      <h3 class=\"text-gray-500 text-sm font-medium\">Mes Annonces</h3>\n      <p class=\"text-3xl font-bold text-gray-900 mt-2\">\n        {{ profile?.listingsCount || 0 }}\n      </p>\n    </div>\n\n    <div class=\"bg-white rounded-lg shadow p-6\">\n      <h3 class=\"text-gray-500 text-sm font-medium\">Vues Totales</h3>\n      <p class=\"text-3xl font-bold text-gray-900 mt-2\">0</p>\n    </div>\n\n    <div class=\"bg-white rounded-lg shadow p-6\">\n      <h3 class=\"text-gray-500 text-sm font-medium\">Messages</h3>\n      <p class=\"text-3xl font-bold text-gray-900 mt-2\">0</p>\n    </div>\n  </div>\n\n  <div class=\"mt-8\">\n    <h2 class=\"text-xl font-semibold mb-4\">Actions rapides</h2>\n    <div class=\"grid grid-cols-1 md:grid-cols-2 gap-4\">\n      <a\n        routerLink=\"/annonces/creer\"\n        class=\"bg-red-600 text-white p-4 rounded-lg hover:bg-red-700 transition flex items-center gap-3\"\n      >\n        <svg class=\"w-6 h-6\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n          <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M12 4v16m8-8H4\" />\n        </svg>\n        <span class=\"font-medium\">Cr&eacute;er une annonce</span>\n      </a>\n\n      <a\n        routerLink=\"/profil/mes-annonces\"\n        class=\"bg-white border-2 border-gray-300 p-4 rounded-lg hover:border-red-600 transition flex items-center gap-3\"\n      >\n        <svg class=\"w-6 h-6\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n          <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z\" />\n        </svg>\n        <span class=\"font-medium\">Voir mes annonces</span>\n      </a>\n    </div>\n  </div>\n</div>\n", styles: [":host {\n  display: block;\n}\n"] }]
    }], () => [{ type: i1.DashboardService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DashboardProprietaireComponent, { className: "DashboardProprietaireComponent", filePath: "src/app/features/profil/dashboard-proprietaire/dashboard-proprietaire.component.ts", lineNumber: 11 }); })();
//# sourceMappingURL=dashboard-proprietaire.component.js.map