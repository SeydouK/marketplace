import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "../services/listing.service";
import * as i3 from "../../../core/services/auth.service";
import * as i4 from "@angular/common";
function DetailAnnonceComponent_section_0_div_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 28);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 29);
    i0.ɵɵelement(2, "path", 30);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(3, "span", 31);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r0.listing.rating);
} }
function DetailAnnonceComponent_section_0_a_53_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 32);
    i0.ɵɵtext(1, " Contacter le vendeur ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("href", "tel:" + ctx_r0.listing.sellerPhone, i0.ɵɵsanitizeUrl);
} }
function DetailAnnonceComponent_section_0_ng_template_54_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 33);
    i0.ɵɵtext(1, " Se connecter ");
    i0.ɵɵelementEnd();
} }
function DetailAnnonceComponent_section_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 3)(1, "div", 4)(2, "a", 5);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(3, "svg", 6);
    i0.ɵɵelement(4, "path", 7);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(5, " Retour aux annonces ");
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(6, "span", 8);
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "titlecase");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 9);
    i0.ɵɵelement(10, "img", 10);
    i0.ɵɵtemplate(11, DetailAnnonceComponent_section_0_div_11_Template, 5, 1, "div", 11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 12)(13, "div", 13)(14, "h1", 14);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "p", 15);
    i0.ɵɵtext(17);
    i0.ɵɵpipe(18, "titlecase");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "div", 16)(20, "div", 17)(21, "p", 18);
    i0.ɵɵtext(22, "Race");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "p", 19);
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(25, "div", 17)(26, "p", 18);
    i0.ɵɵtext(27, "\u00C2ge");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "p", 19);
    i0.ɵɵtext(29);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(30, "div", 17)(31, "p", 18);
    i0.ɵɵtext(32, "Vendeur");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "p", 19);
    i0.ɵɵtext(34);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(35, "div", 17)(36, "p", 18);
    i0.ɵɵtext(37, "T\u00E9l\u00E9phone");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "p", 19);
    i0.ɵɵtext(39);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(40, "div")(41, "h2", 20);
    i0.ɵɵtext(42, "Description");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "p", 21);
    i0.ɵɵtext(44);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(45, "aside", 22)(46, "p", 23);
    i0.ɵɵtext(47);
    i0.ɵɵpipe(48, "number");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(49, "p", 24);
    i0.ɵɵtext(50);
    i0.ɵɵpipe(51, "titlecase");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(52, "div", 25);
    i0.ɵɵtemplate(53, DetailAnnonceComponent_section_0_a_53_Template, 2, 1, "a", 26)(54, DetailAnnonceComponent_section_0_ng_template_54_Template, 2, 0, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementStart(56, "a", 27);
    i0.ɵɵtext(57, " Voir d'autres annonces ");
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const loginPrompt_r2 = i0.ɵɵreference(55);
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate2("", ctx_r0.listing.location, " \u00B7 ", i0.ɵɵpipeBind1(8, 17, ctx_r0.listing.animalType));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("src", ctx_r0.listing.image || "https://placehold.co/1200x800?text=Annonce", i0.ɵɵsanitizeUrl)("alt", ctx_r0.listing.title);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.listing.rating);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r0.listing.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", ctx_r0.listing.location, " \u00B7 ", i0.ɵɵpipeBind1(18, 19, ctx_r0.listing.animalType));
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r0.listing.breed || "Non renseign\u00E9e");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("", ctx_r0.listing.ageMonths || "-", " mois");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r0.listing.sellerName);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r0.listing.sellerPhone);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.listing.description || ctx_r0.fallbackDescription, " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(48, 21, ctx_r0.listing.price, "1.0-0"), " FCFA");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(51, 24, ctx_r0.listing.status));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r0.auth.isLoggedIn())("ngIfElse", loginPrompt_r2);
} }
function DetailAnnonceComponent_ng_template_1_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Chargement de l'annonce...");
    i0.ɵɵelementEnd();
} }
function DetailAnnonceComponent_ng_template_1_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Annonce introuvable.");
    i0.ɵɵelementEnd();
} }
function DetailAnnonceComponent_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 3)(1, "div", 34);
    i0.ɵɵtemplate(2, DetailAnnonceComponent_ng_template_1_span_2_Template, 2, 0, "span", 35)(3, DetailAnnonceComponent_ng_template_1_span_3_Template, 2, 0, "span", 35);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r0.loading);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r0.loading);
} }
export class DetailAnnonceComponent {
    constructor(route, listingService, auth) {
        this.route = route;
        this.listingService = listingService;
        this.auth = auth;
        this.loading = true;
        this.fallbackDescription = "Aucune description n'a \u00E9t\u00E9 fournie pour cette annonce.";
    }
    ngOnInit() {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        if (!Number.isNaN(id)) {
            this.listingService.get(id).subscribe({
                next: (listing) => {
                    this.listing = listing;
                    this.loading = false;
                },
                error: () => {
                    this.loading = false;
                },
            });
            return;
        }
        this.loading = false;
    }
    static { this.ɵfac = function DetailAnnonceComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DetailAnnonceComponent)(i0.ɵɵdirectiveInject(i1.ActivatedRoute), i0.ɵɵdirectiveInject(i2.ListingService), i0.ɵɵdirectiveInject(i3.AuthService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DetailAnnonceComponent, selectors: [["app-detail-annonce"]], standalone: false, decls: 3, vars: 2, consts: [["detailState", ""], ["loginPrompt", ""], ["class", "max-w-7xl mx-auto py-8 px-4", 4, "ngIf", "ngIfElse"], [1, "max-w-7xl", "mx-auto", "py-8", "px-4"], [1, "flex", "flex-col", "sm:flex-row", "sm:items-center", "sm:justify-between", "gap-4", "mb-6"], ["routerLink", "/annonces", 1, "inline-flex", "items-center", "gap-2", "rounded-full", "border", "border-gray-300", "px-4", "py-2", "text-sm", "font-medium", "text-gray-700", "hover:border-gray-900", "hover:text-gray-900", "transition-colors"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-4", "h-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M15 19l-7-7 7-7"], [1, "text-sm", "text-gray-500"], [1, "relative", "overflow-hidden", "rounded-[2rem]", "bg-gray-100", "aspect-[16/8]"], [1, "w-full", "h-full", "object-cover", 3, "src", "alt"], ["class", "absolute bottom-4 left-4 bg-white px-3 py-2 rounded-xl shadow-md flex items-center gap-2", 4, "ngIf"], [1, "grid", "grid-cols-1", "lg:grid-cols-[1.6fr_0.9fr]", "gap-6", "mt-6"], [1, "bg-white", "border", "border-gray-200", "rounded-[2rem]", "p-6", "shadow-sm"], [1, "text-3xl", "font-semibold", "text-gray-900", "mb-3"], [1, "text-gray-500", "mb-6"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "gap-4", "mb-6"], [1, "rounded-2xl", "bg-gray-50", "p-4"], [1, "text-sm", "text-gray-500", "mb-1"], [1, "font-semibold", "text-gray-900"], [1, "text-xl", "font-semibold", "text-gray-900", "mb-3"], [1, "text-gray-600", "leading-7"], [1, "bg-white", "border", "border-gray-200", "rounded-[2rem]", "p-6", "shadow-sm", "h-fit"], [1, "text-3xl", "font-semibold", "text-gray-900", "mb-2"], [1, "text-sm", "text-gray-500", "mb-6"], [1, "flex", "flex-col", "gap-3"], ["class", "inline-flex items-center justify-center gap-2 rounded-2xl bg-red-600 px-4 py-3 font-medium text-white hover:bg-red-700 transition-colors", 3, "href", 4, "ngIf", "ngIfElse"], ["routerLink", "/annonces", 1, "inline-flex", "items-center", "justify-center", "gap-2", "rounded-2xl", "border", "border-gray-300", "bg-white", "px-4", "py-3", "font-medium", "text-gray-900", "hover:border-red-500", "hover:text-red-600", "transition-colors"], [1, "absolute", "bottom-4", "left-4", "bg-white", "px-3", "py-2", "rounded-xl", "shadow-md", "flex", "items-center", "gap-2"], ["viewBox", "0 0 24 24", 1, "w-4", "h-4", "fill-current", "text-red-600"], ["d", "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"], [1, "text-sm", "font-semibold"], [1, "inline-flex", "items-center", "justify-center", "gap-2", "rounded-2xl", "bg-red-600", "px-4", "py-3", "font-medium", "text-white", "hover:bg-red-700", "transition-colors", 3, "href"], ["routerLink", "/login", 1, "inline-flex", "items-center", "justify-center", "gap-2", "rounded-2xl", "border", "border-gray-300", "bg-white", "px-4", "py-3", "font-medium", "text-gray-900", "hover:border-red-500", "hover:text-red-600", "transition-colors"], [1, "rounded-[2rem]", "border", "border-dashed", "border-gray-300", "bg-white", "p-10", "text-center", "text-gray-500"], [4, "ngIf"]], template: function DetailAnnonceComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, DetailAnnonceComponent_section_0_Template, 58, 26, "section", 2)(1, DetailAnnonceComponent_ng_template_1_Template, 4, 2, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
        } if (rf & 2) {
            const detailState_r3 = i0.ɵɵreference(2);
            i0.ɵɵproperty("ngIf", ctx.listing)("ngIfElse", detailState_r3);
        } }, dependencies: [i4.NgIf, i1.RouterLink, i4.DecimalPipe, i4.TitleCasePipe], styles: ["[_nghost-%COMP%] {\n  display: block;\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DetailAnnonceComponent, [{
        type: Component,
        args: [{ selector: 'app-detail-annonce', standalone: false, template: "<section class=\"max-w-7xl mx-auto py-8 px-4\" *ngIf=\"listing; else detailState\">\n  <div class=\"flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6\">\n    <a\n      routerLink=\"/annonces\"\n      class=\"inline-flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-colors\"\n    >\n      <svg class=\"w-4 h-4\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n        <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M15 19l-7-7 7-7\" />\n      </svg>\n      Retour aux annonces\n    </a>\n\n    <span class=\"text-sm text-gray-500\">{{ listing.location }} &middot; {{ listing.animalType | titlecase }}</span>\n  </div>\n\n  <div class=\"relative overflow-hidden rounded-[2rem] bg-gray-100 aspect-[16/8]\">\n    <img\n      [src]=\"listing.image || 'https://placehold.co/1200x800?text=Annonce'\"\n      [alt]=\"listing.title\"\n      class=\"w-full h-full object-cover\"\n    />\n\n    <div *ngIf=\"listing.rating\" class=\"absolute bottom-4 left-4 bg-white px-3 py-2 rounded-xl shadow-md flex items-center gap-2\">\n      <svg class=\"w-4 h-4 fill-current text-red-600\" viewBox=\"0 0 24 24\">\n        <path d=\"M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z\" />\n      </svg>\n      <span class=\"text-sm font-semibold\">{{ listing.rating }}</span>\n    </div>\n  </div>\n\n  <div class=\"grid grid-cols-1 lg:grid-cols-[1.6fr_0.9fr] gap-6 mt-6\">\n    <div class=\"bg-white border border-gray-200 rounded-[2rem] p-6 shadow-sm\">\n      <h1 class=\"text-3xl font-semibold text-gray-900 mb-3\">{{ listing.title }}</h1>\n      <p class=\"text-gray-500 mb-6\">{{ listing.location }} &middot; {{ listing.animalType | titlecase }}</p>\n\n      <div class=\"grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6\">\n        <div class=\"rounded-2xl bg-gray-50 p-4\">\n          <p class=\"text-sm text-gray-500 mb-1\">Race</p>\n          <p class=\"font-semibold text-gray-900\">{{ listing.breed || 'Non renseign&eacute;e' }}</p>\n        </div>\n        <div class=\"rounded-2xl bg-gray-50 p-4\">\n          <p class=\"text-sm text-gray-500 mb-1\">&Acirc;ge</p>\n          <p class=\"font-semibold text-gray-900\">{{ listing.ageMonths || '-' }} mois</p>\n        </div>\n        <div class=\"rounded-2xl bg-gray-50 p-4\">\n          <p class=\"text-sm text-gray-500 mb-1\">Vendeur</p>\n          <p class=\"font-semibold text-gray-900\">{{ listing.sellerName }}</p>\n        </div>\n        <div class=\"rounded-2xl bg-gray-50 p-4\">\n          <p class=\"text-sm text-gray-500 mb-1\">T&eacute;l&eacute;phone</p>\n          <p class=\"font-semibold text-gray-900\">{{ listing.sellerPhone }}</p>\n        </div>\n      </div>\n\n      <div>\n        <h2 class=\"text-xl font-semibold text-gray-900 mb-3\">Description</h2>\n        <p class=\"text-gray-600 leading-7\">\n          {{ listing.description || fallbackDescription }}\n        </p>\n      </div>\n    </div>\n\n    <aside class=\"bg-white border border-gray-200 rounded-[2rem] p-6 shadow-sm h-fit\">\n      <p class=\"text-3xl font-semibold text-gray-900 mb-2\">{{ listing.price | number:'1.0-0' }} FCFA</p>\n      <p class=\"text-sm text-gray-500 mb-6\">{{ listing.status | titlecase }}</p>\n\n      <div class=\"flex flex-col gap-3\">\n        <a\n          *ngIf=\"auth.isLoggedIn(); else loginPrompt\"\n          [href]=\"'tel:' + listing.sellerPhone\"\n          class=\"inline-flex items-center justify-center gap-2 rounded-2xl bg-red-600 px-4 py-3 font-medium text-white hover:bg-red-700 transition-colors\"\n        >\n          Contacter le vendeur\n        </a>\n\n        <ng-template #loginPrompt>\n          <a\n            routerLink=\"/login\"\n            class=\"inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-300 bg-white px-4 py-3 font-medium text-gray-900 hover:border-red-500 hover:text-red-600 transition-colors\"\n          >\n            Se connecter\n          </a>\n        </ng-template>\n\n        <a\n          routerLink=\"/annonces\"\n          class=\"inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-300 bg-white px-4 py-3 font-medium text-gray-900 hover:border-red-500 hover:text-red-600 transition-colors\"\n        >\n          Voir d'autres annonces\n        </a>\n      </div>\n    </aside>\n  </div>\n</section>\n\n<ng-template #detailState>\n  <section class=\"max-w-7xl mx-auto py-8 px-4\">\n    <div class=\"rounded-[2rem] border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500\">\n      <span *ngIf=\"loading\">Chargement de l'annonce...</span>\n      <span *ngIf=\"!loading\">Annonce introuvable.</span>\n    </div>\n  </section>\n</ng-template>\n", styles: [":host {\n  display: block;\n}\n"] }]
    }], () => [{ type: i1.ActivatedRoute }, { type: i2.ListingService }, { type: i3.AuthService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DetailAnnonceComponent, { className: "DetailAnnonceComponent", filePath: "src/app/features/annonces/detail-annonce/detail-annonce.component.ts", lineNumber: 13 }); })();
//# sourceMappingURL=detail-annonce.component.js.map