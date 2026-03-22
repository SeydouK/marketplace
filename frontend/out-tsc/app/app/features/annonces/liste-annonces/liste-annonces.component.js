import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../services/listing.service";
import * as i2 from "../../../core/services/marketplace-ui.service";
import * as i3 from "../../../shared/components/listing-card/listing-card.component";
import * as i4 from "@angular/common";
import * as i5 from "@angular/forms";
import * as i6 from "@angular/router";
function ListeAnnoncesComponent_span_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "s");
    i0.ɵɵelementEnd();
} }
function ListeAnnoncesComponent_span_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "s");
    i0.ɵɵelementEnd();
} }
function ListeAnnoncesComponent_option_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 19);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "titlecase");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const animal_r1 = ctx.$implicit;
    i0.ɵɵproperty("value", animal_r1);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", animal_r1 ? i0.ɵɵpipeBind1(2, 2, animal_r1) : "Tous les animaux", " ");
} }
function ListeAnnoncesComponent_div_27_app_listing_card_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-listing-card", 22);
} if (rf & 2) {
    const listing_r2 = ctx.$implicit;
    i0.ɵɵproperty("listing", listing_r2);
} }
function ListeAnnoncesComponent_div_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 20);
    i0.ɵɵtemplate(1, ListeAnnoncesComponent_div_27_app_listing_card_1_Template, 1, 1, "app-listing-card", 21);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.filteredListings)("ngForTrackBy", ctx_r2.trackByListing);
} }
function ListeAnnoncesComponent_ng_template_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 23)(1, "h2", 24);
    i0.ɵɵtext(2, "Aucune annonce trouv\u00E9e");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4, "Essaie de modifier les filtres ou de revenir sur la page d'accueil.");
    i0.ɵɵelementEnd()();
} }
export class ListeAnnoncesComponent {
    constructor(listingService, uiState) {
        this.listingService = listingService;
        this.uiState = uiState;
        this.allListings = [];
        this.location = '';
        this.animalType = '';
        this.subscriptions = new Subscription();
        this.animalTypes = ['', 'poulet', 'boeuf', 'mouton', 'porc'];
    }
    ngOnInit() {
        this.subscriptions.add(this.listingService.search({}).subscribe((listings) => {
            this.allListings = listings;
        }));
        this.subscriptions.add(this.uiState.searchTerm$.subscribe((term) => {
            this.location = term;
        }));
        this.subscriptions.add(this.uiState.animalFilter$.subscribe((filter) => {
            this.animalType = filter;
        }));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    updateLocation(value) {
        this.location = value;
        this.uiState.setSearchTerm(value);
    }
    updateAnimalType(value) {
        this.animalType = value;
        this.uiState.setAnimalFilter(value);
    }
    resetFilters() {
        this.updateLocation('');
        this.updateAnimalType('');
    }
    trackByListing(_, listing) {
        return listing.id;
    }
    get filteredListings() {
        const normalizedLocation = this.normalizeText(this.location);
        const normalizedAnimalType = this.normalizeText(this.animalType);
        return this.allListings.filter((listing) => {
            const matchesLocation = !normalizedLocation ||
                this.normalizeText(listing.location).includes(normalizedLocation) ||
                this.normalizeText(listing.title).includes(normalizedLocation);
            const matchesAnimal = !normalizedAnimalType ||
                this.normalizeText(listing.animalType) === normalizedAnimalType;
            return matchesLocation && matchesAnimal;
        });
    }
    normalizeText(value) {
        return value
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .trim()
            .toLowerCase();
    }
    static { this.ɵfac = function ListeAnnoncesComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ListeAnnoncesComponent)(i0.ɵɵdirectiveInject(i1.ListingService), i0.ɵɵdirectiveInject(i2.MarketplaceUiService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ListeAnnoncesComponent, selectors: [["app-liste-annonces"]], standalone: false, decls: 30, vars: 8, consts: [["emptyState", ""], [1, "max-w-[2520px]", "mx-auto", "py-8", "px-4", "lg:px-8"], [1, "flex", "flex-col", "lg:flex-row", "lg:items-center", "lg:justify-between", "gap-4", "mb-8"], [1, "text-2xl", "lg:text-3xl", "font-semibold", "text-gray-900"], [1, "text-gray-500", "mt-2"], [4, "ngIf"], ["routerLink", "/", 1, "inline-flex", "items-center", "gap-2", "rounded-full", "border", "border-gray-300", "px-4", "py-2", "text-sm", "font-medium", "text-gray-700", "hover:border-gray-900", "hover:text-gray-900", "transition-colors"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-4", "h-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M15 19l-7-7 7-7"], [1, "bg-[#f7f7f7]", "border", "border-gray-200", "rounded-[2rem]", "p-4", "lg:p-6", "shadow-sm", "mb-8"], [1, "grid", "grid-cols-1", "lg:grid-cols-[2fr_1fr_auto]", "gap-4", "items-end"], [1, "flex", "flex-col", "gap-2"], ["for", "location", 1, "text-sm", "font-semibold", "text-gray-700"], ["id", "location", "type", "text", "placeholder", "Abidjan, Korhogo, vendeur...", 1, "w-full", "rounded-2xl", "border", "border-gray-300", "bg-white", "px-4", "py-3", "text-gray-900", "outline-none", "focus:border-red-500", 3, "ngModelChange", "ngModel"], ["for", "animalType", 1, "text-sm", "font-semibold", "text-gray-700"], ["id", "animalType", 1, "w-full", "rounded-2xl", "border", "border-gray-300", "bg-white", "px-4", "py-3", "text-gray-900", "outline-none", "focus:border-red-500", 3, "ngModelChange", "ngModel"], [3, "value", 4, "ngFor", "ngForOf"], ["type", "button", 1, "rounded-2xl", "border", "border-gray-300", "bg-white", "px-5", "py-3", "font-medium", "text-gray-900", "hover:border-red-500", "hover:text-red-600", "transition-colors", 3, "click"], ["class", "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6", 4, "ngIf", "ngIfElse"], [3, "value"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "xl:grid-cols-4", "gap-6"], [3, "listing", 4, "ngFor", "ngForOf", "ngForTrackBy"], [3, "listing"], [1, "rounded-[2rem]", "border", "border-dashed", "border-gray-300", "bg-white", "p-10", "text-center", "text-gray-500"], [1, "text-xl", "font-semibold", "text-gray-900", "mb-2"]], template: function ListeAnnoncesComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 1)(1, "div", 2)(2, "div")(3, "h1", 3);
            i0.ɵɵtext(4, "Toutes les annonces");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p", 4);
            i0.ɵɵtext(6);
            i0.ɵɵtemplate(7, ListeAnnoncesComponent_span_7_Template, 2, 0, "span", 5);
            i0.ɵɵtext(8, " disponible");
            i0.ɵɵtemplate(9, ListeAnnoncesComponent_span_9_Template, 2, 0, "span", 5);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(10, "a", 6);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(11, "svg", 7);
            i0.ɵɵelement(12, "path", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵtext(13, " Retour \u00E0 l'accueil ");
            i0.ɵɵelementEnd()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(14, "div", 9)(15, "div", 10)(16, "div", 11)(17, "label", 12);
            i0.ɵɵtext(18, "Ville ou recherche");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "input", 13);
            i0.ɵɵlistener("ngModelChange", function ListeAnnoncesComponent_Template_input_ngModelChange_19_listener($event) { return ctx.updateLocation($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(20, "div", 11)(21, "label", 14);
            i0.ɵɵtext(22, "Animal");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "select", 15);
            i0.ɵɵlistener("ngModelChange", function ListeAnnoncesComponent_Template_select_ngModelChange_23_listener($event) { return ctx.updateAnimalType($event); });
            i0.ɵɵtemplate(24, ListeAnnoncesComponent_option_24_Template, 3, 4, "option", 16);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(25, "button", 17);
            i0.ɵɵlistener("click", function ListeAnnoncesComponent_Template_button_click_25_listener() { return ctx.resetFilters(); });
            i0.ɵɵtext(26, " R\u00E9initialiser ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(27, ListeAnnoncesComponent_div_27_Template, 2, 2, "div", 18)(28, ListeAnnoncesComponent_ng_template_28_Template, 5, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            const emptyState_r4 = i0.ɵɵreference(29);
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate1(" ", ctx.filteredListings.length, " annonce");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.filteredListings.length > 1);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.filteredListings.length > 1);
            i0.ɵɵadvance(10);
            i0.ɵɵproperty("ngModel", ctx.location);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngModel", ctx.animalType);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.animalTypes);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.filteredListings.length)("ngIfElse", emptyState_r4);
        } }, dependencies: [i3.ListingCardComponent, i4.NgForOf, i4.NgIf, i5.NgSelectOption, i5.ɵNgSelectMultipleOption, i5.DefaultValueAccessor, i5.SelectControlValueAccessor, i5.NgControlStatus, i5.NgModel, i6.RouterLink, i4.TitleCasePipe], styles: ["[_nghost-%COMP%] {\n  display: block;\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ListeAnnoncesComponent, [{
        type: Component,
        args: [{ selector: 'app-liste-annonces', standalone: false, template: "<section class=\"max-w-[2520px] mx-auto py-8 px-4 lg:px-8\">\n  <div class=\"flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8\">\n    <div>\n      <h1 class=\"text-2xl lg:text-3xl font-semibold text-gray-900\">Toutes les annonces</h1>\n      <p class=\"text-gray-500 mt-2\">\n        {{ filteredListings.length }} annonce<span *ngIf=\"filteredListings.length > 1\">s</span> disponible<span *ngIf=\"filteredListings.length > 1\">s</span>\n      </p>\n    </div>\n\n    <a\n      routerLink=\"/\"\n      class=\"inline-flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-colors\"\n    >\n      <svg class=\"w-4 h-4\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n        <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M15 19l-7-7 7-7\" />\n      </svg>\n      Retour &agrave; l'accueil\n    </a>\n  </div>\n\n  <div class=\"bg-[#f7f7f7] border border-gray-200 rounded-[2rem] p-4 lg:p-6 shadow-sm mb-8\">\n    <div class=\"grid grid-cols-1 lg:grid-cols-[2fr_1fr_auto] gap-4 items-end\">\n      <div class=\"flex flex-col gap-2\">\n        <label for=\"location\" class=\"text-sm font-semibold text-gray-700\">Ville ou recherche</label>\n        <input\n          id=\"location\"\n          [ngModel]=\"location\"\n          (ngModelChange)=\"updateLocation($event)\"\n          type=\"text\"\n          placeholder=\"Abidjan, Korhogo, vendeur...\"\n          class=\"w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-red-500\"\n        />\n      </div>\n\n      <div class=\"flex flex-col gap-2\">\n        <label for=\"animalType\" class=\"text-sm font-semibold text-gray-700\">Animal</label>\n        <select\n          id=\"animalType\"\n          [ngModel]=\"animalType\"\n          (ngModelChange)=\"updateAnimalType($event)\"\n          class=\"w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-red-500\"\n        >\n          <option *ngFor=\"let animal of animalTypes\" [value]=\"animal\">\n            {{ animal ? (animal | titlecase) : 'Tous les animaux' }}\n          </option>\n        </select>\n      </div>\n\n      <button\n        type=\"button\"\n        (click)=\"resetFilters()\"\n        class=\"rounded-2xl border border-gray-300 bg-white px-5 py-3 font-medium text-gray-900 hover:border-red-500 hover:text-red-600 transition-colors\"\n      >\n        R&eacute;initialiser\n      </button>\n    </div>\n  </div>\n\n  <div class=\"grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6\" *ngIf=\"filteredListings.length; else emptyState\">\n    <app-listing-card\n      *ngFor=\"let listing of filteredListings; trackBy: trackByListing\"\n      [listing]=\"listing\"\n    ></app-listing-card>\n  </div>\n\n  <ng-template #emptyState>\n    <div class=\"rounded-[2rem] border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500\">\n      <h2 class=\"text-xl font-semibold text-gray-900 mb-2\">Aucune annonce trouv&eacute;e</h2>\n      <p>Essaie de modifier les filtres ou de revenir sur la page d'accueil.</p>\n    </div>\n  </ng-template>\n</section>\n", styles: [":host {\n  display: block;\n}\n"] }]
    }], () => [{ type: i1.ListingService }, { type: i2.MarketplaceUiService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ListeAnnoncesComponent, { className: "ListeAnnoncesComponent", filePath: "src/app/features/annonces/liste-annonces/liste-annonces.component.ts", lineNumber: 13 }); })();
//# sourceMappingURL=liste-annonces.component.js.map