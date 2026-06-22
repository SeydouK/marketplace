import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "../services/listing.service";
import * as i3 from "../../../core/services/auth.service";
import * as i4 from "@angular/common";
const _c0 = a0 => ["/animaux", a0, "editer"];
function DetailAnnonceComponent_section_0_span_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "s");
    i0.ɵɵelementEnd();
} }
function DetailAnnonceComponent_section_0_div_65_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 45);
    i0.ɵɵelement(1, "img", 46);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const image_r1 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", image_r1, i0.ɵɵsanitizeUrl)("alt", ctx_r1.listing.title);
} }
function DetailAnnonceComponent_section_0_div_65_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 25)(1, "div", 40)(2, "h2", 41);
    i0.ɵɵtext(3, "Galerie");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 42);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 43);
    i0.ɵɵtemplate(7, DetailAnnonceComponent_section_0_div_65_div_7_Template, 2, 2, "div", 44);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("", ctx_r1.listing.gallery == null ? null : ctx_r1.listing.gallery.length, " m\u00E9dia(s)");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r1.listing.gallery);
} }
function DetailAnnonceComponent_section_0_ng_container_73_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 47);
    i0.ɵɵtext(2, " Vous \u00EAtes le propri\u00E9taire de ce dossier. Toute modification repasse ensuite au contr\u00F4le sanitaire. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "a", 48);
    i0.ɵɵtext(4, " Modifier cet animal ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "a", 49);
    i0.ɵɵtext(6, " Ouvrir mon espace \u00E9leveur ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(1, _c0, ctx_r1.listing.id));
} }
function DetailAnnonceComponent_section_0_ng_template_74_a_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 52);
    i0.ɵɵtext(1, " Contacter le vendeur ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("href", ctx_r1.listing.sellerEmail ? "mailto:" + ctx_r1.listing.sellerEmail : null, i0.ɵɵsanitizeUrl);
} }
function DetailAnnonceComponent_section_0_ng_template_74_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 53);
    i0.ɵɵtext(1, " Se connecter ");
    i0.ɵɵelementEnd();
} }
function DetailAnnonceComponent_section_0_ng_template_74_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, DetailAnnonceComponent_section_0_ng_template_74_a_0_Template, 2, 1, "a", 50)(1, DetailAnnonceComponent_section_0_ng_template_74_ng_template_1_Template, 2, 0, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementStart(3, "a", 51);
    i0.ɵɵtext(4, " D\u00E9poser un animal ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const loginPrompt_r3 = i0.ɵɵreference(2);
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngIf", ctx_r1.auth.isLoggedIn())("ngIfElse", loginPrompt_r3);
} }
function DetailAnnonceComponent_section_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 4)(1, "div", 5)(2, "a", 6);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(3, "svg", 7);
    i0.ɵɵelement(4, "path", 8);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(5, " Retour aux annonces ");
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(6, "div", 9)(7, "span", 10);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "titlecase");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "span", 11);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(12, "div", 12);
    i0.ɵɵelement(13, "img", 13);
    i0.ɵɵelementStart(14, "div", 14)(15, "div", 15)(16, "div")(17, "p", 16);
    i0.ɵɵtext(18, "Dossier animal");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "h1", 17);
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "p", 18);
    i0.ɵɵtext(22);
    i0.ɵɵtemplate(23, DetailAnnonceComponent_section_0_span_23_Template, 2, 0, "span", 19);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(24, "div", 20)(25, "p", 21);
    i0.ɵɵtext(26, "Prix indicatif");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "p", 22);
    i0.ɵɵtext(28);
    i0.ɵɵpipe(29, "number");
    i0.ɵɵelementEnd()()()()();
    i0.ɵɵelementStart(30, "div", 23)(31, "div", 24)(32, "div", 25)(33, "div", 26)(34, "div", 27)(35, "p", 28);
    i0.ɵɵtext(36, "Race");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "p", 29);
    i0.ɵɵtext(38);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(39, "div", 27)(40, "p", 28);
    i0.ɵɵtext(41, "Statut de publication");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(42, "p", 29);
    i0.ɵɵtext(43);
    i0.ɵɵpipe(44, "titlecase");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(45, "div", 27)(46, "p", 28);
    i0.ɵɵtext(47, "Propri\u00E9taire");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(48, "p", 29);
    i0.ɵɵtext(49);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(50, "div", 27)(51, "p", 28);
    i0.ɵɵtext(52, "Contact");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(53, "p", 29);
    i0.ɵɵtext(54);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(55, "div", 30)(56, "p", 28);
    i0.ɵɵtext(57, "R\u00E9f\u00E9rence de tra\u00E7abilit\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(58, "p", 31);
    i0.ɵɵtext(59);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(60, "div", 25)(61, "h2", 32);
    i0.ɵɵtext(62, "Pr\u00E9sentation");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(63, "p", 33);
    i0.ɵɵtext(64);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(65, DetailAnnonceComponent_section_0_div_65_Template, 8, 2, "div", 34);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(66, "aside", 35)(67, "div", 25)(68, "p", 36);
    i0.ɵɵtext(69, "Actions");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(70, "p", 37);
    i0.ɵɵtext(71, " Acc\u00E9dez au dossier complet, contactez le vendeur ou mettez \u00E0 jour votre propre animal depuis cette fiche. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(72, "div", 38);
    i0.ɵɵtemplate(73, DetailAnnonceComponent_section_0_ng_container_73_Template, 7, 3, "ng-container", 39)(74, DetailAnnonceComponent_section_0_ng_template_74_Template, 5, 2, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const publicActions_r4 = i0.ɵɵreference(75);
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(9, 18, ctx_r1.listing.animalType), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.listing.location);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("src", ctx_r1.listing.image || "https://placehold.co/1200x800/fde2e2/7f1d1d?text=Animal", i0.ɵɵsanitizeUrl)("alt", ctx_r1.listing.title);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r1.listing.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", ctx_r1.listing.location, " \u2022 ", ctx_r1.listing.quantity, " t\u00EAte");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.listing.quantity > 1);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(29, 20, ctx_r1.listing.price, "1.0-0"), " FCFA ");
    i0.ɵɵadvance(10);
    i0.ɵɵtextInterpolate(ctx_r1.listing.breed || "Non renseign\u00E9e");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(44, 23, ctx_r1.listing.status));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r1.listing.sellerName);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.listing.sellerEmail || "Non renseign\u00E9");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.listing.qrCode || "Non renseign\u00E9e");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.listing.description || ctx_r1.fallbackDescription, " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.listing.gallery == null ? null : ctx_r1.listing.gallery.length);
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("ngIf", ctx_r1.canEdit)("ngIfElse", publicActions_r4);
} }
function DetailAnnonceComponent_ng_template_1_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Chargement du dossier animal...");
    i0.ɵɵelementEnd();
} }
function DetailAnnonceComponent_ng_template_1_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Animal introuvable.");
    i0.ɵɵelementEnd();
} }
function DetailAnnonceComponent_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 54)(1, "div", 55);
    i0.ɵɵtemplate(2, DetailAnnonceComponent_ng_template_1_span_2_Template, 2, 0, "span", 19)(3, DetailAnnonceComponent_ng_template_1_span_3_Template, 2, 0, "span", 19);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.loading);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.loading);
} }
export class DetailAnnonceComponent {
    constructor(route, listingService, auth) {
        this.route = route;
        this.listingService = listingService;
        this.auth = auth;
        this.loading = true;
        this.fallbackDescription = "Aucune description n'a été fournie pour ce dossier animal.";
    }
    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
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
    get canEdit() {
        return !!this.listing && this.auth.currentUser?.id === this.listing.sellerId;
    }
    static { this.ɵfac = function DetailAnnonceComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DetailAnnonceComponent)(i0.ɵɵdirectiveInject(i1.ActivatedRoute), i0.ɵɵdirectiveInject(i2.ListingService), i0.ɵɵdirectiveInject(i3.AuthService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DetailAnnonceComponent, selectors: [["app-detail-annonce"]], standalone: false, decls: 3, vars: 2, consts: [["detailState", ""], ["publicActions", ""], ["loginPrompt", ""], ["class", "max-w-7xl mx-auto py-6 px-4 sm:py-8", 4, "ngIf", "ngIfElse"], [1, "max-w-7xl", "mx-auto", "py-6", "px-4", "sm:py-8"], [1, "flex", "flex-col", "gap-4", "mb-6", "lg:flex-row", "lg:items-center", "lg:justify-between"], ["routerLink", "/annonces", 1, "inline-flex", "items-center", "gap-2", "self-start", "rounded-full", "border", "border-gray-300", "px-4", "py-2", "text-sm", "font-medium", "text-gray-700", "transition-colors", "hover:border-red-500", "hover:text-red-700"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-4", "h-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M15 19l-7-7 7-7"], [1, "flex", "flex-wrap", "items-center", "gap-2", "text-sm"], [1, "rounded-full", "bg-red-50", "px-3", "py-1", "font-medium", "text-red-700"], [1, "text-gray-500"], [1, "relative", "overflow-hidden", "rounded-[2rem]", "bg-gray-100", "aspect-[16/10]", "sm:aspect-[16/8]"], [1, "w-full", "h-full", "object-cover", 3, "src", "alt"], [1, "absolute", "inset-x-0", "bottom-0", "bg-gradient-to-t", "from-black/65", "via-black/15", "to-transparent", "p-5", "sm:p-8"], [1, "flex", "flex-col", "gap-3", "lg:flex-row", "lg:items-end", "lg:justify-between"], [1, "mb-2", "text-xs", "font-semibold", "uppercase", "tracking-[0.24em]", "text-red-100"], [1, "text-2xl", "font-semibold", "text-white", "sm:text-4xl"], [1, "mt-2", "max-w-2xl", "text-sm", "text-red-50", "sm:text-base"], [4, "ngIf"], [1, "rounded-3xl", "bg-white/12", "px-4", "py-3", "backdrop-blur-sm"], [1, "text-xs", "uppercase", "tracking-[0.2em]", "text-red-100"], [1, "mt-1", "text-2xl", "font-semibold", "text-white", "sm:text-3xl"], [1, "grid", "grid-cols-1", "gap-6", "mt-6", "xl:grid-cols-[1.6fr_0.95fr]"], [1, "space-y-6"], [1, "rounded-[2rem]", "border", "border-red-100", "bg-white", "p-5", "shadow-sm", "sm:p-6"], [1, "grid", "grid-cols-1", "gap-4", "sm:grid-cols-2"], [1, "rounded-2xl", "bg-red-50/70", "p-4"], [1, "text-sm", "text-gray-500", "mb-1"], [1, "font-semibold", "text-gray-900"], [1, "rounded-2xl", "bg-red-50/70", "p-4", "sm:col-span-2"], [1, "font-semibold", "text-gray-900", "break-all"], [1, "text-xl", "font-semibold", "text-gray-900", "mb-3"], [1, "text-gray-600", "leading-7"], ["class", "rounded-[2rem] border border-red-100 bg-white p-5 shadow-sm sm:p-6", 4, "ngIf"], [1, "space-y-4", "xl:sticky", "xl:top-6", "h-fit"], [1, "text-sm", "font-semibold", "uppercase", "tracking-[0.2em]", "text-red-600"], [1, "mt-3", "text-sm", "leading-6", "text-gray-600"], [1, "mt-5", "flex", "flex-col", "gap-3"], [4, "ngIf", "ngIfElse"], [1, "flex", "items-center", "justify-between", "gap-3", "mb-4"], [1, "text-xl", "font-semibold", "text-gray-900"], [1, "text-sm", "text-gray-500"], [1, "grid", "grid-cols-2", "gap-3", "sm:grid-cols-3"], ["class", "overflow-hidden rounded-2xl bg-red-50 aspect-square", 4, "ngFor", "ngForOf"], [1, "overflow-hidden", "rounded-2xl", "bg-red-50", "aspect-square"], [1, "h-full", "w-full", "object-cover", 3, "src", "alt"], [1, "rounded-2xl", "bg-red-50", "px-4", "py-3", "text-sm", "text-red-800"], [1, "inline-flex", "items-center", "justify-center", "gap-2", "rounded-2xl", "bg-red-600", "px-4", "py-3", "font-medium", "text-white", "transition-colors", "hover:bg-red-700", 3, "routerLink"], ["routerLink", "/animaux/mes-animaux", 1, "inline-flex", "items-center", "justify-center", "gap-2", "rounded-2xl", "border", "border-red-200", "bg-white", "px-4", "py-3", "font-medium", "text-red-700", "transition-colors", "hover:border-red-400", "hover:bg-red-50"], ["class", "inline-flex items-center justify-center gap-2 rounded-2xl bg-red-600 px-4 py-3 font-medium text-white transition-colors hover:bg-red-700", 3, "href", 4, "ngIf", "ngIfElse"], ["routerLink", "/animaux/creer", 1, "inline-flex", "items-center", "justify-center", "gap-2", "rounded-2xl", "border", "border-red-200", "bg-white", "px-4", "py-3", "font-medium", "text-red-700", "transition-colors", "hover:border-red-400", "hover:bg-red-50"], [1, "inline-flex", "items-center", "justify-center", "gap-2", "rounded-2xl", "bg-red-600", "px-4", "py-3", "font-medium", "text-white", "transition-colors", "hover:bg-red-700", 3, "href"], ["routerLink", "/login", 1, "inline-flex", "items-center", "justify-center", "gap-2", "rounded-2xl", "border", "border-gray-300", "bg-white", "px-4", "py-3", "font-medium", "text-gray-900", "transition-colors", "hover:border-red-500", "hover:text-red-700"], [1, "max-w-7xl", "mx-auto", "py-8", "px-4"], [1, "rounded-[2rem]", "border", "border-dashed", "border-red-200", "bg-white", "p-10", "text-center", "text-gray-500"]], template: function DetailAnnonceComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, DetailAnnonceComponent_section_0_Template, 76, 25, "section", 3)(1, DetailAnnonceComponent_ng_template_1_Template, 4, 2, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
        } if (rf & 2) {
            const detailState_r5 = i0.ɵɵreference(2);
            i0.ɵɵproperty("ngIf", ctx.listing)("ngIfElse", detailState_r5);
        } }, dependencies: [i4.NgForOf, i4.NgIf, i1.RouterLink, i4.DecimalPipe, i4.TitleCasePipe], styles: ["[_nghost-%COMP%] {\n  display: block;\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DetailAnnonceComponent, [{
        type: Component,
        args: [{ selector: 'app-detail-annonce', standalone: false, template: "<section class=\"max-w-7xl mx-auto py-6 px-4 sm:py-8\" *ngIf=\"listing; else detailState\">\r\n  <div class=\"flex flex-col gap-4 mb-6 lg:flex-row lg:items-center lg:justify-between\">\r\n    <a\r\n      routerLink=\"/annonces\"\r\n      class=\"inline-flex items-center gap-2 self-start rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-red-500 hover:text-red-700\"\r\n    >\r\n      <svg class=\"w-4 h-4\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\r\n        <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M15 19l-7-7 7-7\" />\r\n      </svg>\r\n      Retour aux annonces\r\n    </a>\r\n\r\n    <div class=\"flex flex-wrap items-center gap-2 text-sm\">\r\n      <span class=\"rounded-full bg-red-50 px-3 py-1 font-medium text-red-700\">\r\n        {{ listing.animalType | titlecase }}\r\n      </span>\r\n      <span class=\"text-gray-500\">{{ listing.location }}</span>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"relative overflow-hidden rounded-[2rem] bg-gray-100 aspect-[16/10] sm:aspect-[16/8]\">\r\n    <img\r\n      [src]=\"listing.image || 'https://placehold.co/1200x800/fde2e2/7f1d1d?text=Animal'\"\r\n      [alt]=\"listing.title\"\r\n      class=\"w-full h-full object-cover\"\r\n    />\r\n    <div class=\"absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent p-5 sm:p-8\">\r\n      <div class=\"flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between\">\r\n        <div>\r\n          <p class=\"mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-red-100\">Dossier animal</p>\r\n          <h1 class=\"text-2xl font-semibold text-white sm:text-4xl\">{{ listing.title }}</h1>\r\n          <p class=\"mt-2 max-w-2xl text-sm text-red-50 sm:text-base\">\r\n            {{ listing.location }} \u2022 {{ listing.quantity }} t\u00EAte<span *ngIf=\"listing.quantity > 1\">s</span>\r\n          </p>\r\n        </div>\r\n\r\n        <div class=\"rounded-3xl bg-white/12 px-4 py-3 backdrop-blur-sm\">\r\n          <p class=\"text-xs uppercase tracking-[0.2em] text-red-100\">Prix indicatif</p>\r\n          <p class=\"mt-1 text-2xl font-semibold text-white sm:text-3xl\">\r\n            {{ listing.price | number:'1.0-0' }} FCFA\r\n          </p>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"grid grid-cols-1 gap-6 mt-6 xl:grid-cols-[1.6fr_0.95fr]\">\r\n    <div class=\"space-y-6\">\r\n      <div class=\"rounded-[2rem] border border-red-100 bg-white p-5 shadow-sm sm:p-6\">\r\n        <div class=\"grid grid-cols-1 gap-4 sm:grid-cols-2\">\r\n          <div class=\"rounded-2xl bg-red-50/70 p-4\">\r\n            <p class=\"text-sm text-gray-500 mb-1\">Race</p>\r\n            <p class=\"font-semibold text-gray-900\">{{ listing.breed || 'Non renseign\u00E9e' }}</p>\r\n          </div>\r\n          <div class=\"rounded-2xl bg-red-50/70 p-4\">\r\n            <p class=\"text-sm text-gray-500 mb-1\">Statut de publication</p>\r\n            <p class=\"font-semibold text-gray-900\">{{ listing.status | titlecase }}</p>\r\n          </div>\r\n          <div class=\"rounded-2xl bg-red-50/70 p-4\">\r\n            <p class=\"text-sm text-gray-500 mb-1\">Propri\u00E9taire</p>\r\n            <p class=\"font-semibold text-gray-900\">{{ listing.sellerName }}</p>\r\n          </div>\r\n          <div class=\"rounded-2xl bg-red-50/70 p-4\">\r\n            <p class=\"text-sm text-gray-500 mb-1\">Contact</p>\r\n            <p class=\"font-semibold text-gray-900\">{{ listing.sellerEmail || 'Non renseign\u00E9' }}</p>\r\n          </div>\r\n          <div class=\"rounded-2xl bg-red-50/70 p-4 sm:col-span-2\">\r\n            <p class=\"text-sm text-gray-500 mb-1\">R\u00E9f\u00E9rence de tra\u00E7abilit\u00E9</p>\r\n            <p class=\"font-semibold text-gray-900 break-all\">{{ listing.qrCode || 'Non renseign\u00E9e' }}</p>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"rounded-[2rem] border border-red-100 bg-white p-5 shadow-sm sm:p-6\">\r\n        <h2 class=\"text-xl font-semibold text-gray-900 mb-3\">Pr\u00E9sentation</h2>\r\n        <p class=\"text-gray-600 leading-7\">\r\n          {{ listing.description || fallbackDescription }}\r\n        </p>\r\n      </div>\r\n\r\n      <div *ngIf=\"listing.gallery?.length\" class=\"rounded-[2rem] border border-red-100 bg-white p-5 shadow-sm sm:p-6\">\r\n        <div class=\"flex items-center justify-between gap-3 mb-4\">\r\n          <h2 class=\"text-xl font-semibold text-gray-900\">Galerie</h2>\r\n          <span class=\"text-sm text-gray-500\">{{ listing.gallery?.length }} m\u00E9dia(s)</span>\r\n        </div>\r\n\r\n        <div class=\"grid grid-cols-2 gap-3 sm:grid-cols-3\">\r\n          <div\r\n            *ngFor=\"let image of listing.gallery\"\r\n            class=\"overflow-hidden rounded-2xl bg-red-50 aspect-square\"\r\n          >\r\n            <img [src]=\"image\" [alt]=\"listing.title\" class=\"h-full w-full object-cover\" />\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <aside class=\"space-y-4 xl:sticky xl:top-6 h-fit\">\r\n      <div class=\"rounded-[2rem] border border-red-100 bg-white p-5 shadow-sm sm:p-6\">\r\n        <p class=\"text-sm font-semibold uppercase tracking-[0.2em] text-red-600\">Actions</p>\r\n        <p class=\"mt-3 text-sm leading-6 text-gray-600\">\r\n          Acc\u00E9dez au dossier complet, contactez le vendeur ou mettez \u00E0 jour votre propre animal depuis cette fiche.\r\n        </p>\r\n\r\n        <div class=\"mt-5 flex flex-col gap-3\">\r\n          <ng-container *ngIf=\"canEdit; else publicActions\">\r\n            <div class=\"rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-800\">\r\n              Vous \u00EAtes le propri\u00E9taire de ce dossier. Toute modification repasse ensuite au contr\u00F4le sanitaire.\r\n            </div>\r\n\r\n            <a\r\n              [routerLink]=\"['/animaux', listing.id, 'editer']\"\r\n              class=\"inline-flex items-center justify-center gap-2 rounded-2xl bg-red-600 px-4 py-3 font-medium text-white transition-colors hover:bg-red-700\"\r\n            >\r\n              Modifier cet animal\r\n            </a>\r\n\r\n            <a\r\n              routerLink=\"/animaux/mes-animaux\"\r\n              class=\"inline-flex items-center justify-center gap-2 rounded-2xl border border-red-200 bg-white px-4 py-3 font-medium text-red-700 transition-colors hover:border-red-400 hover:bg-red-50\"\r\n            >\r\n              Ouvrir mon espace \u00E9leveur\r\n            </a>\r\n          </ng-container>\r\n\r\n          <ng-template #publicActions>\r\n            <a\r\n              *ngIf=\"auth.isLoggedIn(); else loginPrompt\"\r\n              [href]=\"listing.sellerEmail ? ('mailto:' + listing.sellerEmail) : null\"\r\n              class=\"inline-flex items-center justify-center gap-2 rounded-2xl bg-red-600 px-4 py-3 font-medium text-white transition-colors hover:bg-red-700\"\r\n            >\r\n              Contacter le vendeur\r\n            </a>\r\n\r\n            <ng-template #loginPrompt>\r\n              <a\r\n                routerLink=\"/login\"\r\n                class=\"inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-300 bg-white px-4 py-3 font-medium text-gray-900 transition-colors hover:border-red-500 hover:text-red-700\"\r\n              >\r\n                Se connecter\r\n              </a>\r\n            </ng-template>\r\n\r\n            <a\r\n              routerLink=\"/animaux/creer\"\r\n              class=\"inline-flex items-center justify-center gap-2 rounded-2xl border border-red-200 bg-white px-4 py-3 font-medium text-red-700 transition-colors hover:border-red-400 hover:bg-red-50\"\r\n            >\r\n              D\u00E9poser un animal\r\n            </a>\r\n          </ng-template>\r\n        </div>\r\n      </div>\r\n    </aside>\r\n  </div>\r\n</section>\r\n\r\n<ng-template #detailState>\r\n  <section class=\"max-w-7xl mx-auto py-8 px-4\">\r\n    <div class=\"rounded-[2rem] border border-dashed border-red-200 bg-white p-10 text-center text-gray-500\">\r\n      <span *ngIf=\"loading\">Chargement du dossier animal...</span>\r\n      <span *ngIf=\"!loading\">Animal introuvable.</span>\r\n    </div>\r\n  </section>\r\n</ng-template>\r\n", styles: [":host {\n  display: block;\n}\n"] }]
    }], () => [{ type: i1.ActivatedRoute }, { type: i2.ListingService }, { type: i3.AuthService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DetailAnnonceComponent, { className: "DetailAnnonceComponent", filePath: "src/app/features/annonces/detail-annonce/detail-annonce.component.ts", lineNumber: 13 }); })();
//# sourceMappingURL=detail-annonce.component.js.map