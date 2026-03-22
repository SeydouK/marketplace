import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../annonces/services/listing.service";
import * as i2 from "../../core/services/marketplace-ui.service";
import * as i3 from "../../shared/components/listing-card/listing-card.component";
import * as i4 from "@angular/common";
import * as i5 from "@angular/router";
function HomeComponent_span_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "s");
    i0.ɵɵelementEnd();
} }
function HomeComponent_span_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "s");
    i0.ɵɵelementEnd();
} }
function HomeComponent_div_16_app_listing_card_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-listing-card", 13);
} if (rf & 2) {
    const listing_r1 = ctx.$implicit;
    i0.ɵɵproperty("listing", listing_r1);
} }
function HomeComponent_div_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 11);
    i0.ɵɵtemplate(1, HomeComponent_div_16_app_listing_card_1_Template, 1, 1, "app-listing-card", 12);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.filteredListings)("ngForTrackBy", ctx_r1.trackByListing);
} }
function HomeComponent_ng_template_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14)(1, "h2", 15);
    i0.ɵɵtext(2, "Aucune annonce trouvee");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4, "Essaie de modifier la recherche ou les filtres depuis l'en-tete.");
    i0.ɵɵelementEnd()();
} }
export class HomeComponent {
    constructor(listingService, uiState) {
        this.listingService = listingService;
        this.uiState = uiState;
        this.searchTerm = '';
        this.animalFilter = '';
        this.allListings = [];
        this.subscriptions = new Subscription();
    }
    ngOnInit() {
        this.subscriptions.add(this.listingService.search({}).subscribe((listings) => {
            this.allListings = listings;
        }));
        this.subscriptions.add(this.uiState.animalFilter$.subscribe((animalFilter) => {
            this.animalFilter = animalFilter;
        }));
        this.subscriptions.add(this.uiState.searchTerm$.subscribe((searchTerm) => {
            this.searchTerm = searchTerm;
        }));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    get filteredListings() {
        const normalizedSearch = this.normalizeText(this.searchTerm);
        return this.allListings.filter((listing) => {
            const matchesAnimal = !this.animalFilter ||
                this.normalizeText(listing.animalType) === this.normalizeText(this.animalFilter);
            const matchesSearch = !normalizedSearch ||
                this.normalizeText(listing.title).includes(normalizedSearch) ||
                this.normalizeText(listing.location).includes(normalizedSearch);
            return matchesAnimal && matchesSearch;
        });
    }
    trackByListing(_, listing) {
        return listing.id;
    }
    normalizeText(value) {
        return value
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .trim()
            .toLowerCase();
    }
    static { this.ɵfac = function HomeComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || HomeComponent)(i0.ɵɵdirectiveInject(i1.ListingService), i0.ɵɵdirectiveInject(i2.MarketplaceUiService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: HomeComponent, selectors: [["app-home"]], standalone: false, decls: 19, vars: 5, consts: [["emptyState", ""], [1, "flex-1", "overflow-auto", "bg-white"], [1, "max-w-[2520px]", "mx-auto", "py-8", "px-4", "lg:px-8"], [1, "flex", "flex-col", "lg:flex-row", "lg:items-center", "lg:justify-between", "gap-4", "mb-8"], [1, "text-2xl", "lg:text-3xl", "font-semibold", "text-gray-900"], [1, "text-gray-500", "mt-2"], [4, "ngIf"], ["routerLink", "/annonces", 1, "inline-flex", "items-center", "gap-2", "rounded-full", "border", "border-gray-300", "px-4", "py-2", "text-sm", "font-medium", "text-gray-700", "hover:border-gray-900", "hover:text-gray-900", "transition-colors"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-4", "h-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M9 5l7 7-7 7"], ["class", "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6", 4, "ngIf", "ngIfElse"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "xl:grid-cols-4", "gap-6"], [3, "listing", 4, "ngFor", "ngForOf", "ngForTrackBy"], [3, "listing"], [1, "rounded-[2rem]", "border", "border-dashed", "border-gray-300", "bg-white", "p-10", "text-center", "text-gray-500"], [1, "text-xl", "font-semibold", "text-gray-900", "mb-2"]], template: function HomeComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "main", 1)(1, "div", 2)(2, "section")(3, "div", 3)(4, "div")(5, "h1", 4);
            i0.ɵɵtext(6, "Annonces a la une");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "p", 5);
            i0.ɵɵtext(8);
            i0.ɵɵtemplate(9, HomeComponent_span_9_Template, 2, 0, "span", 6);
            i0.ɵɵtext(10, " disponible");
            i0.ɵɵtemplate(11, HomeComponent_span_11_Template, 2, 0, "span", 6);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(12, "a", 7);
            i0.ɵɵtext(13, " Voir toutes les annonces ");
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(14, "svg", 8);
            i0.ɵɵelement(15, "path", 9);
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(16, HomeComponent_div_16_Template, 2, 2, "div", 10)(17, HomeComponent_ng_template_17_Template, 5, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            const emptyState_r3 = i0.ɵɵreference(18);
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate1(" ", ctx.filteredListings.length, " annonce");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.filteredListings.length > 1);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.filteredListings.length > 1);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngIf", ctx.filteredListings.length)("ngIfElse", emptyState_r3);
        } }, dependencies: [i3.ListingCardComponent, i4.NgForOf, i4.NgIf, i5.RouterLink], styles: ["[_nghost-%COMP%] {\n  display: block;\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HomeComponent, [{
        type: Component,
        args: [{ selector: 'app-home', standalone: false, template: "<main class=\"flex-1 overflow-auto bg-white\">\n  <div class=\"max-w-[2520px] mx-auto py-8 px-4 lg:px-8\">\n    <section>\n      <div class=\"flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8\">\n        <div>\n          <h1 class=\"text-2xl lg:text-3xl font-semibold text-gray-900\">Annonces a la une</h1>\n          <p class=\"text-gray-500 mt-2\">\n            {{ filteredListings.length }} annonce<span *ngIf=\"filteredListings.length > 1\">s</span> disponible<span *ngIf=\"filteredListings.length > 1\">s</span>\n          </p>\n        </div>\n\n        <a\n          routerLink=\"/annonces\"\n          class=\"inline-flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-colors\"\n        >\n          Voir toutes les annonces\n          <svg class=\"w-4 h-4\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n            <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M9 5l7 7-7 7\" />\n          </svg>\n        </a>\n      </div>\n\n      <div class=\"grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6\" *ngIf=\"filteredListings.length; else emptyState\">\n        <app-listing-card\n          *ngFor=\"let listing of filteredListings; trackBy: trackByListing\"\n          [listing]=\"listing\"\n        ></app-listing-card>\n      </div>\n\n      <ng-template #emptyState>\n        <div class=\"rounded-[2rem] border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500\">\n          <h2 class=\"text-xl font-semibold text-gray-900 mb-2\">Aucune annonce trouvee</h2>\n          <p>Essaie de modifier la recherche ou les filtres depuis l'en-tete.</p>\n        </div>\n      </ng-template>\n    </section>\n  </div>\n</main>\n", styles: [":host {\n  display: block;\n}\n"] }]
    }], () => [{ type: i1.ListingService }, { type: i2.MarketplaceUiService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(HomeComponent, { className: "HomeComponent", filePath: "src/app/features/home/home.component.ts", lineNumber: 13 }); })();
//# sourceMappingURL=home.component.js.map