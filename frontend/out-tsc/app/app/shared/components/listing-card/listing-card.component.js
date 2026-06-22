import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/router";
const _c0 = a0 => ["/annonces", a0];
function ListingCardComponent_span_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "s");
    i0.ɵɵelementEnd();
} }
export class ListingCardComponent {
    static { this.ɵfac = function ListingCardComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ListingCardComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ListingCardComponent, selectors: [["app-listing-card"]], inputs: { listing: "listing" }, standalone: false, decls: 27, vars: 19, consts: [[1, "group", "cursor-pointer", "block", 3, "routerLink"], [1, "relative", "aspect-square", "rounded-xl", "overflow-hidden", "mb-3"], [1, "w-full", "h-full", "object-cover", "group-hover:scale-105", "transition-transform", "duration-300", 3, "src", "alt"], ["type", "button", 1, "absolute", "top-3", "right-3", "p-2", "hover:scale-110", "transition-transform", 3, "click"], ["viewBox", "0 0 24 24", 1, "w-6", "h-6", "fill-none", "stroke-white", "stroke-2", "hover:fill-red-500", "hover:stroke-red-500"], ["d", "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"], [1, "absolute", "bottom-3", "left-3", "rounded-full", "bg-white", "px-3", "py-1", "text-xs", "font-semibold", "text-red-700", "shadow-md"], [1, "space-y-1"], [1, "flex", "justify-between", "items-start"], [1, "font-semibold", "text-gray-900", "truncate"], [1, "text-gray-500", "text-sm"], [4, "ngIf"], [1, "flex", "items-baseline", "gap-1"], [1, "font-semibold", "text-gray-900"]], template: function ListingCardComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "a", 0)(1, "div", 1);
            i0.ɵɵelement(2, "img", 2);
            i0.ɵɵelementStart(3, "button", 3);
            i0.ɵɵlistener("click", function ListingCardComponent_Template_button_click_3_listener($event) { $event.preventDefault(); return $event.stopPropagation(); });
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(4, "svg", 4);
            i0.ɵɵelement(5, "path", 5);
            i0.ɵɵelementEnd()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(6, "div", 6);
            i0.ɵɵtext(7);
            i0.ɵɵpipe(8, "titlecase");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "div", 7)(10, "div", 8)(11, "h3", 9);
            i0.ɵɵtext(12);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(13, "p", 10);
            i0.ɵɵtext(14);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "p", 10);
            i0.ɵɵtext(16);
            i0.ɵɵpipe(17, "titlecase");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "p", 10);
            i0.ɵɵtext(19);
            i0.ɵɵtemplate(20, ListingCardComponent_span_20_Template, 2, 0, "span", 11);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "div", 12)(22, "span", 13);
            i0.ɵɵtext(23);
            i0.ɵɵpipe(24, "number");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(25, "span", 10);
            i0.ɵɵtext(26, "/ dossier");
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(17, _c0, ctx.listing.id));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("src", ctx.listing.image || "https://placehold.co/640x640/fde2e2/7f1d1d?text=Animal", i0.ɵɵsanitizeUrl)("alt", ctx.listing.title);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(8, 10, ctx.listing.status), " ");
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.listing.title);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.listing.location);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(17, 12, ctx.listing.animalType));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1(" ", ctx.listing.quantity, " t\u00EAte");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.listing.quantity > 1);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(24, 14, ctx.listing.price, "1.0-0"), " FCFA");
        } }, dependencies: [i1.NgIf, i2.RouterLink, i1.DecimalPipe, i1.TitleCasePipe], styles: ["[_nghost-%COMP%] {\n  display: block;\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ListingCardComponent, [{
        type: Component,
        args: [{ selector: 'app-listing-card', standalone: false, template: "<a [routerLink]=\"['/annonces', listing.id]\" class=\"group cursor-pointer block\">\r\n  <div class=\"relative aspect-square rounded-xl overflow-hidden mb-3\">\r\n    <img\r\n      [src]=\"listing.image || 'https://placehold.co/640x640/fde2e2/7f1d1d?text=Animal'\"\r\n      [alt]=\"listing.title\"\r\n      class=\"w-full h-full object-cover group-hover:scale-105 transition-transform duration-300\"\r\n    />\r\n\r\n    <button\r\n      type=\"button\"\r\n      (click)=\"$event.preventDefault(); $event.stopPropagation()\"\r\n      class=\"absolute top-3 right-3 p-2 hover:scale-110 transition-transform\"\r\n    >\r\n      <svg class=\"w-6 h-6 fill-none stroke-white stroke-2 hover:fill-red-500 hover:stroke-red-500\" viewBox=\"0 0 24 24\">\r\n        <path d=\"M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z\" />\r\n      </svg>\r\n    </button>\r\n\r\n    <div class=\"absolute bottom-3 left-3 rounded-full bg-white px-3 py-1 text-xs font-semibold text-red-700 shadow-md\">\r\n      {{ listing.status | titlecase }}\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"space-y-1\">\r\n    <div class=\"flex justify-between items-start\">\r\n      <h3 class=\"font-semibold text-gray-900 truncate\">{{ listing.title }}</h3>\r\n    </div>\r\n    <p class=\"text-gray-500 text-sm\">{{ listing.location }}</p>\r\n    <p class=\"text-gray-500 text-sm\">{{ listing.animalType | titlecase }}</p>\r\n    <p class=\"text-gray-500 text-sm\">\r\n      {{ listing.quantity }} t&ecirc;te<span *ngIf=\"listing.quantity > 1\">s</span>\r\n    </p>\r\n    <div class=\"flex items-baseline gap-1\">\r\n      <span class=\"font-semibold text-gray-900\">{{ listing.price | number:'1.0-0' }} FCFA</span>\r\n      <span class=\"text-gray-500 text-sm\">/ dossier</span>\r\n    </div>\r\n  </div>\r\n</a>\r\n", styles: [":host {\n  display: block;\n}\n"] }]
    }], null, { listing: [{
            type: Input,
            args: [{ required: true }]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ListingCardComponent, { className: "ListingCardComponent", filePath: "src/app/shared/components/listing-card/listing-card.component.ts", lineNumber: 10 }); })();
//# sourceMappingURL=listing-card.component.js.map