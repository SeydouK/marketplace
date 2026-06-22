import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../annonces/services/listing.service";
import * as i2 from "../../../shared/components/listing-card/listing-card.component";
import * as i3 from "@angular/common";
import * as i4 from "@angular/router";
function MesAnnoncesComponent_div_9_app_listing_card_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-listing-card", 11);
} if (rf & 2) {
    const listing_r1 = ctx.$implicit;
    i0.ɵɵproperty("listing", listing_r1);
} }
function MesAnnoncesComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9);
    i0.ɵɵtemplate(1, MesAnnoncesComponent_div_9_app_listing_card_1_Template, 1, 1, "app-listing-card", 10);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.listings);
} }
function MesAnnoncesComponent_ng_template_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 12);
    i0.ɵɵtext(1, "Vous n'avez encore aucun animal publi\u00E9 dans le catalogue.");
    i0.ɵɵelementEnd();
} }
export class MesAnnoncesComponent {
    constructor(listingService) {
        this.listingService = listingService;
        this.listings = [];
    }
    ngOnInit() {
        this.listingService.myListings().subscribe((listings) => {
            this.listings = listings;
        });
    }
    static { this.ɵfac = function MesAnnoncesComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || MesAnnoncesComponent)(i0.ɵɵdirectiveInject(i1.ListingService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: MesAnnoncesComponent, selectors: [["app-mes-annonces"]], standalone: false, decls: 12, vars: 2, consts: [["emptyState", ""], [1, "max-w-7xl", "mx-auto", "py-6", "px-4"], [1, "flex", "flex-col", "sm:flex-row", "sm:items-center", "sm:justify-between", "gap-4", "mb-6"], [1, "text-2xl", "font-bold"], ["routerLink", "/animaux/creer", 1, "bg-red-600", "text-white", "p-4", "rounded-lg", "hover:bg-red-700", "transition", "inline-flex", "items-center", "gap-3"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-6", "h-6"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 4v16m8-8H4"], [1, "font-medium"], ["class", "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", 4, "ngIf", "ngIfElse"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "lg:grid-cols-4", "gap-6"], [3, "listing", 4, "ngFor", "ngForOf"], [3, "listing"], [1, "text-gray-500"]], template: function MesAnnoncesComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 1)(1, "div", 2)(2, "h1", 3);
            i0.ɵɵtext(3, "Mes animaux publi\u00E9s");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "a", 4);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(5, "svg", 5);
            i0.ɵɵelement(6, "path", 6);
            i0.ɵɵelementEnd();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(7, "span", 7);
            i0.ɵɵtext(8, "Enregistrer un animal");
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(9, MesAnnoncesComponent_div_9_Template, 2, 1, "div", 8)(10, MesAnnoncesComponent_ng_template_10_Template, 2, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            const emptyState_r3 = i0.ɵɵreference(11);
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("ngIf", ctx.listings.length)("ngIfElse", emptyState_r3);
        } }, dependencies: [i2.ListingCardComponent, i3.NgForOf, i3.NgIf, i4.RouterLink], styles: ["[_nghost-%COMP%] {\n  display: block;\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MesAnnoncesComponent, [{
        type: Component,
        args: [{ selector: 'app-mes-annonces', standalone: false, template: "<div class=\"max-w-7xl mx-auto py-6 px-4\">\r\n  <div class=\"flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6\">\r\n    <h1 class=\"text-2xl font-bold\">Mes animaux publi&eacute;s</h1>\r\n    <a\r\n      routerLink=\"/animaux/creer\"\r\n      class=\"bg-red-600 text-white p-4 rounded-lg hover:bg-red-700 transition inline-flex items-center gap-3\"\r\n    >\r\n      <svg class=\"w-6 h-6\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\r\n        <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M12 4v16m8-8H4\" />\r\n      </svg>\r\n      <span class=\"font-medium\">Enregistrer un animal</span>\r\n    </a>\r\n  </div>\r\n\r\n  <div class=\"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6\" *ngIf=\"listings.length; else emptyState\">\r\n    <app-listing-card *ngFor=\"let listing of listings\" [listing]=\"listing\"></app-listing-card>\r\n  </div>\r\n\r\n  <ng-template #emptyState>\r\n    <p class=\"text-gray-500\">Vous n'avez encore aucun animal publi&eacute; dans le catalogue.</p>\r\n  </ng-template>\r\n</div>\r\n", styles: [":host {\n  display: block;\n}\n"] }]
    }], () => [{ type: i1.ListingService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(MesAnnoncesComponent, { className: "MesAnnoncesComponent", filePath: "src/app/features/profil/mes-annonces/mes-annonces.component.ts", lineNumber: 11 }); })();
//# sourceMappingURL=mes-annonces.component.js.map