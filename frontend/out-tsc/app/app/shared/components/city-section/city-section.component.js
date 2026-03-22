import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/router";
import * as i3 from "../listing-card/listing-card.component";
function CitySectionComponent_section_0_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelement(1, "app-listing-card", 10);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const listing_r1 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("listing", listing_r1);
} }
function CitySectionComponent_section_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 1)(1, "div", 2)(2, "div", 3)(3, "h2", 4);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "a", 5);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(6, "svg", 6);
    i0.ɵɵelement(7, "path", 7);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(8, "div", 8);
    i0.ɵɵtemplate(9, CitySectionComponent_section_0_div_9_Template, 2, 1, "div", 9);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.city);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngForOf", ctx_r1.listings)("ngForTrackBy", ctx_r1.trackByListing);
} }
export class CitySectionComponent {
    constructor() {
        this.listings = [];
    }
    trackByListing(_, listing) {
        return listing.id;
    }
    static { this.ɵfac = function CitySectionComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CitySectionComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CitySectionComponent, selectors: [["app-city-section"]], inputs: { city: "city", listings: "listings" }, standalone: false, decls: 1, vars: 1, consts: [["class", "mb-12", 4, "ngIf"], [1, "mb-12"], [1, "flex", "items-center", "justify-between", "mb-6", "px-4", "lg:px-8"], [1, "flex", "items-center", "gap-3"], [1, "text-2xl", "lg:text-3xl", "font-semibold", "text-gray-900"], ["routerLink", "/annonces", 1, "text-gray-600", "hover:text-gray-900", "transition-colors"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-6", "h-6"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M9 5l7 7-7 7"], [1, "grid", "grid-cols-1", "gap-6", "px-4", "sm:grid-cols-2", "lg:px-8", "xl:grid-cols-4"], [4, "ngFor", "ngForOf", "ngForTrackBy"], [3, "listing"]], template: function CitySectionComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, CitySectionComponent_section_0_Template, 10, 3, "section", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.listings.length > 0);
        } }, dependencies: [i1.NgForOf, i1.NgIf, i2.RouterLink, i3.ListingCardComponent], styles: ["[_nghost-%COMP%] {\n  display: block;\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CitySectionComponent, [{
        type: Component,
        args: [{ selector: 'app-city-section', standalone: false, template: "<section class=\"mb-12\" *ngIf=\"listings.length > 0\">\n  <div class=\"flex items-center justify-between mb-6 px-4 lg:px-8\">\n    <div class=\"flex items-center gap-3\">\n      <h2 class=\"text-2xl lg:text-3xl font-semibold text-gray-900\">{{ city }}</h2>\n      <a routerLink=\"/annonces\" class=\"text-gray-600 hover:text-gray-900 transition-colors\">\n        <svg class=\"w-6 h-6\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n          <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M9 5l7 7-7 7\" />\n        </svg>\n      </a>\n    </div>\n  </div>\n\n  <div class=\"grid grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:px-8 xl:grid-cols-4\">\n    <div *ngFor=\"let listing of listings; trackBy: trackByListing\">\n      <app-listing-card [listing]=\"listing\"></app-listing-card>\n    </div>\n  </div>\n</section>\n", styles: [":host {\n  display: block;\n}\n"] }]
    }], null, { city: [{
            type: Input,
            args: [{ required: true }]
        }], listings: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CitySectionComponent, { className: "CitySectionComponent", filePath: "src/app/shared/components/city-section/city-section.component.ts", lineNumber: 10 }); })();
//# sourceMappingURL=city-section.component.js.map