import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/router";
const _c0 = a0 => ["/annonces", a0];
function ListingCardComponent_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 13);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 14);
    i0.ɵɵelement(2, "path", 15);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(3, "span", 16);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r0.listing.rating);
} }
export class ListingCardComponent {
    static { this.ɵfac = function ListingCardComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ListingCardComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ListingCardComponent, selectors: [["app-listing-card"]], inputs: { listing: "listing" }, standalone: false, decls: 22, vars: 15, consts: [[1, "group", "cursor-pointer", "block", 3, "routerLink"], [1, "relative", "aspect-square", "rounded-xl", "overflow-hidden", "mb-3"], [1, "w-full", "h-full", "object-cover", "group-hover:scale-105", "transition-transform", "duration-300", 3, "src", "alt"], ["type", "button", 1, "absolute", "top-3", "right-3", "p-2", "hover:scale-110", "transition-transform", 3, "click"], ["viewBox", "0 0 24 24", 1, "w-6", "h-6", "fill-none", "stroke-white", "stroke-2", "hover:fill-red-500", "hover:stroke-red-500"], ["d", "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"], ["class", "absolute bottom-3 left-3 bg-white px-2 py-1 rounded-lg shadow-md flex items-center gap-1", 4, "ngIf"], [1, "space-y-1"], [1, "flex", "justify-between", "items-start"], [1, "font-semibold", "text-gray-900", "truncate"], [1, "text-gray-500", "text-sm"], [1, "flex", "items-baseline", "gap-1"], [1, "font-semibold", "text-gray-900"], [1, "absolute", "bottom-3", "left-3", "bg-white", "px-2", "py-1", "rounded-lg", "shadow-md", "flex", "items-center", "gap-1"], ["viewBox", "0 0 24 24", 1, "w-4", "h-4", "fill-current", "text-red-600"], ["d", "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"], [1, "text-sm", "font-semibold"]], template: function ListingCardComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "a", 0)(1, "div", 1);
            i0.ɵɵelement(2, "img", 2);
            i0.ɵɵelementStart(3, "button", 3);
            i0.ɵɵlistener("click", function ListingCardComponent_Template_button_click_3_listener($event) { $event.preventDefault(); return $event.stopPropagation(); });
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(4, "svg", 4);
            i0.ɵɵelement(5, "path", 5);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(6, ListingCardComponent_div_6_Template, 5, 1, "div", 6);
            i0.ɵɵelementEnd();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(7, "div", 7)(8, "div", 8)(9, "h3", 9);
            i0.ɵɵtext(10);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(11, "p", 10);
            i0.ɵɵtext(12);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "p", 10);
            i0.ɵɵtext(14);
            i0.ɵɵpipe(15, "titlecase");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "div", 11)(17, "span", 12);
            i0.ɵɵtext(18);
            i0.ɵɵpipe(19, "number");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "span", 10);
            i0.ɵɵtext(21, "/ unite");
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(13, _c0, ctx.listing.id));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("src", ctx.listing.image || "https://placehold.co/640x640?text=Annonce", i0.ɵɵsanitizeUrl)("alt", ctx.listing.title);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngIf", ctx.listing.rating);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(ctx.listing.title);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.listing.location);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(15, 8, ctx.listing.animalType));
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(19, 10, ctx.listing.price, "1.0-0"), " FCFA");
        } }, dependencies: [i1.NgIf, i2.RouterLink, i1.DecimalPipe, i1.TitleCasePipe], styles: ["[_nghost-%COMP%] {\n  display: block;\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ListingCardComponent, [{
        type: Component,
        args: [{ selector: 'app-listing-card', standalone: false, template: "<a [routerLink]=\"['/annonces', listing.id]\" class=\"group cursor-pointer block\">\n  <div class=\"relative aspect-square rounded-xl overflow-hidden mb-3\">\n    <img\n      [src]=\"listing.image || 'https://placehold.co/640x640?text=Annonce'\"\n      [alt]=\"listing.title\"\n      class=\"w-full h-full object-cover group-hover:scale-105 transition-transform duration-300\"\n    />\n\n    <button\n      type=\"button\"\n      (click)=\"$event.preventDefault(); $event.stopPropagation()\"\n      class=\"absolute top-3 right-3 p-2 hover:scale-110 transition-transform\"\n    >\n      <svg class=\"w-6 h-6 fill-none stroke-white stroke-2 hover:fill-red-500 hover:stroke-red-500\" viewBox=\"0 0 24 24\">\n        <path d=\"M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z\" />\n      </svg>\n    </button>\n\n    <div *ngIf=\"listing.rating\" class=\"absolute bottom-3 left-3 bg-white px-2 py-1 rounded-lg shadow-md flex items-center gap-1\">\n      <svg class=\"w-4 h-4 fill-current text-red-600\" viewBox=\"0 0 24 24\">\n        <path d=\"M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z\" />\n      </svg>\n      <span class=\"text-sm font-semibold\">{{ listing.rating }}</span>\n    </div>\n  </div>\n\n  <div class=\"space-y-1\">\n    <div class=\"flex justify-between items-start\">\n      <h3 class=\"font-semibold text-gray-900 truncate\">{{ listing.title }}</h3>\n    </div>\n    <p class=\"text-gray-500 text-sm\">{{ listing.location }}</p>\n    <p class=\"text-gray-500 text-sm\">{{ listing.animalType | titlecase }}</p>\n    <div class=\"flex items-baseline gap-1\">\n      <span class=\"font-semibold text-gray-900\">{{ listing.price | number:'1.0-0' }} FCFA</span>\n      <span class=\"text-gray-500 text-sm\">/ unite</span>\n    </div>\n  </div>\n</a>\n", styles: [":host {\n  display: block;\n}\n"] }]
    }], null, { listing: [{
            type: Input,
            args: [{ required: true }]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ListingCardComponent, { className: "ListingCardComponent", filePath: "src/app/shared/components/listing-card/listing-card.component.ts", lineNumber: 10 }); })();
//# sourceMappingURL=listing-card.component.js.map