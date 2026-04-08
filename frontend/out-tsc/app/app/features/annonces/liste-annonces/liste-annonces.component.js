import { Component, HostListener, Inject, ViewChild, } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../services/listing.service";
import * as i2 from "../../../core/services/marketplace-ui.service";
import * as i3 from "../../../core/services/auth.service";
import * as i4 from "@angular/common";
import * as i5 from "@angular/forms";
import * as i6 from "@angular/router";
import * as i7 from "primeng/carousel";
const _c0 = ["resultsPanel"];
const _c1 = ["mapHost"];
const _c2 = a0 => ["/annonces", a0];
const _c3 = a0 => ["/animaux", a0, "editer"];
function ListeAnnoncesComponent_div_10_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 40);
    i0.ɵɵlistener("click", function ListeAnnoncesComponent_div_10_button_1_Template_button_click_0_listener() { const chip_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.updateAnimalType(chip_r2.value)); });
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const chip_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("hero-chip--active", ctx_r2.animalType === chip_r2.value);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(chip_r2.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(chip_r2.count);
} }
function ListeAnnoncesComponent_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 38);
    i0.ɵɵtemplate(1, ListeAnnoncesComponent_div_10_button_1_Template, 5, 4, "button", 39);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.animalTypeChips);
} }
function ListeAnnoncesComponent_option_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 41);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const animal_r4 = ctx.$implicit;
    i0.ɵɵproperty("value", animal_r4.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", animal_r4.label, " ");
} }
function ListeAnnoncesComponent_ng_container_42_article_10_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 70);
} if (rf & 2) {
    const image_r6 = ctx.$implicit;
    const listing_r7 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("src", image_r6, i0.ɵɵsanitizeUrl)("alt", listing_r7.title);
} }
function ListeAnnoncesComponent_ng_container_42_article_10_button_12_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 71);
    i0.ɵɵlistener("click", function ListeAnnoncesComponent_ng_container_42_article_10_button_12_Template_button_click_0_listener($event) { i0.ɵɵrestoreView(_r8); const listing_r7 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.focusListing(listing_r7, $event)); });
    i0.ɵɵelement(1, "i", 58);
    i0.ɵɵelementEnd();
} }
function ListeAnnoncesComponent_ng_container_42_article_10_span_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "s");
    i0.ɵɵelementEnd();
} }
function ListeAnnoncesComponent_ng_container_42_article_10_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 49)(1, "div", 50)(2, "p-carousel", 51);
    i0.ɵɵtemplate(3, ListeAnnoncesComponent_ng_container_42_article_10_ng_template_3_Template, 1, 2, "ng-template", null, 3, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 52)(6, "span", 53);
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "titlecase");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span", 54);
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "titlecase");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(12, ListeAnnoncesComponent_ng_container_42_article_10_button_12_Template, 2, 0, "button", 55);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 56)(14, "div", 57);
    i0.ɵɵelement(15, "i", 58);
    i0.ɵɵelementStart(16, "span");
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "h2", 59);
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "p", 60);
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "div", 61)(23, "div", 62)(24, "span", 63);
    i0.ɵɵtext(25, "Race");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "strong");
    i0.ɵɵtext(27);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(28, "div", 62)(29, "span", 63);
    i0.ɵɵtext(30, "Quantit\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "strong");
    i0.ɵɵtext(32);
    i0.ɵɵtemplate(33, ListeAnnoncesComponent_ng_container_42_article_10_span_33_Template, 2, 0, "span", 35);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(34, "div", 62)(35, "span", 63);
    i0.ɵɵtext(36, "Propri\u00E9taire");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "strong");
    i0.ɵɵtext(38);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(39, "div", 64)(40, "div", 65)(41, "span", 66);
    i0.ɵɵtext(42, "Prix indicatif");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "strong");
    i0.ɵɵtext(44);
    i0.ɵɵpipe(45, "number");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(46, "div", 67)(47, "button", 68);
    i0.ɵɵlistener("click", function ListeAnnoncesComponent_ng_container_42_article_10_Template_button_click_47_listener($event) { const listing_r7 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.openPreview(listing_r7, $event)); });
    i0.ɵɵtext(48, " Aper\u00E7u ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(49, "a", 69);
    i0.ɵɵtext(50, " Voir le dossier ");
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const listing_r7 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("animal-card--active", listing_r7.id === ctx_r2.activeListingId);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", ctx_r2.galleryFor(listing_r7))("numVisible", 1)("numScroll", 1)("circular", ctx_r2.galleryFor(listing_r7).length > 1)("showIndicators", ctx_r2.galleryFor(listing_r7).length > 1)("showNavigators", ctx_r2.galleryFor(listing_r7).length > 1);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(8, 20, listing_r7.animalType), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(11, 22, listing_r7.status), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r2.hasCoordinates(listing_r7));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(listing_r7.location);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(listing_r7.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", listing_r7.description || "Dossier animal valid\u00E9 et pr\u00EAt \u00E0 \u00EAtre consult\u00E9.", " ");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(listing_r7.breed || "Non renseign\u00E9e");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("", listing_r7.quantity, " t\u00EAte");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", listing_r7.quantity > 1);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(listing_r7.sellerName);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(45, 24, listing_r7.price, "1.0-0"), " FCFA");
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(27, _c2, listing_r7.id));
} }
function ListeAnnoncesComponent_ng_container_42_div_11_ng_container_6_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 78);
    i0.ɵɵlistener("click", function ListeAnnoncesComponent_ng_container_42_div_11_ng_container_6_button_1_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r10); const item_r11 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.goToPage(item_r11)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r11 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("pagination-btn--active", item_r11 === ctx_r2.currentPage);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", item_r11, " ");
} }
function ListeAnnoncesComponent_ng_container_42_div_11_ng_container_6_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 79);
    i0.ɵɵtext(1, "\u2026");
    i0.ɵɵelementEnd();
} }
function ListeAnnoncesComponent_ng_container_42_div_11_ng_container_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, ListeAnnoncesComponent_ng_container_42_div_11_ng_container_6_button_1_Template, 2, 3, "button", 77)(2, ListeAnnoncesComponent_ng_container_42_div_11_ng_container_6_ng_template_2_Template, 2, 0, "ng-template", null, 4, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const item_r11 = ctx.$implicit;
    const paginationEllipsis_r12 = i0.ɵɵreference(3);
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.isPageItem(item_r11))("ngIfElse", paginationEllipsis_r12);
} }
function ListeAnnoncesComponent_ng_container_42_div_11_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 72)(1, "div", 73);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 74)(4, "button", 75);
    i0.ɵɵlistener("click", function ListeAnnoncesComponent_ng_container_42_div_11_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r9); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.goToPreviousPage()); });
    i0.ɵɵtext(5, " Pr\u00E9c\u00E9dent ");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, ListeAnnoncesComponent_ng_container_42_div_11_ng_container_6_Template, 4, 2, "ng-container", 76);
    i0.ɵɵelementStart(7, "button", 75);
    i0.ɵɵlistener("click", function ListeAnnoncesComponent_ng_container_42_div_11_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r9); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.goToNextPage()); });
    i0.ɵɵtext(8, " Suivant ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" Page ", ctx_r2.currentPage, " sur ", ctx_r2.totalPages, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !ctx_r2.hasPreviousPage);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r2.paginationItems);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", !ctx_r2.hasNextPage);
} }
function ListeAnnoncesComponent_ng_container_42_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 42)(2, "div")(3, "p", 43);
    i0.ɵɵtext(4, "Catalogue disponible");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 44);
    i0.ɵɵtext(6, " Cliquez sur un dossier pour l\u2019ouvrir en aper\u00E7u, ou utilisez la carte pour cibler un animal. ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 45);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 46);
    i0.ɵɵtemplate(10, ListeAnnoncesComponent_ng_container_42_article_10_Template, 51, 29, "article", 47);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(11, ListeAnnoncesComponent_ng_container_42_div_11_Template, 9, 5, "div", 48);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate3(" ", ctx_r2.visibleRangeStart, "-", ctx_r2.visibleRangeEnd, " sur ", ctx_r2.filteredListings.length, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r2.paginatedListings)("ngForTrackBy", ctx_r2.trackByListing);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.filteredListings.length > ctx_r2.pageSize);
} }
function ListeAnnoncesComponent_div_53_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 80, 5);
} }
function ListeAnnoncesComponent_ng_template_54_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 81)(1, "strong");
    i0.ɵɵtext(2, "Carte indisponible");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Le catalogue reste consultable, m\u00EAme sans fond cartographique.");
    i0.ɵɵelementEnd()();
} }
function ListeAnnoncesComponent_span_59_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "s");
    i0.ɵɵelementEnd();
} }
function ListeAnnoncesComponent_span_61_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "s");
    i0.ɵɵelementEnd();
} }
function ListeAnnoncesComponent_span_62_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", ctx_r2.missingCoordinatesCount, " sans coordonn\u00E9es");
} }
function ListeAnnoncesComponent_div_63_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 82)(1, "div", 83);
    i0.ɵɵelement(2, "img", 84);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 85)(4, "p", 86);
    i0.ɵɵtext(5, "Rep\u00E8re s\u00E9lectionn\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "h3");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p");
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "number");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 87)(12, "button", 68);
    i0.ɵɵlistener("click", function ListeAnnoncesComponent_div_63_Template_button_click_12_listener() { i0.ɵɵrestoreView(_r13); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.openPreview(ctx_r2.highlightedListing)); });
    i0.ɵɵtext(13, " Aper\u00E7u ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "a", 69);
    i0.ɵɵtext(15, " Fiche compl\u00E8te ");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("src", ctx_r2.galleryFor(ctx_r2.highlightedListing)[0], i0.ɵɵsanitizeUrl)("alt", ctx_r2.highlightedListing.title);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.highlightedListing.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", ctx_r2.highlightedListing.location, " \u2022 ", i0.ɵɵpipeBind2(10, 6, ctx_r2.highlightedListing.price, "1.0-0"), " FCFA");
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(9, _c2, ctx_r2.highlightedListing.id));
} }
function ListeAnnoncesComponent_ng_template_64_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 88);
    i0.ɵɵelement(1, "i", 89);
    i0.ɵɵelementStart(2, "h2");
    i0.ɵɵtext(3, "Aucun animal trouv\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5, "Modifiez vos crit\u00E8res de recherche pour relancer le catalogue.");
    i0.ɵɵelementEnd()();
} }
function ListeAnnoncesComponent_div_66_ng_template_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 107);
} if (rf & 2) {
    const image_r15 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("src", image_r15, i0.ɵɵsanitizeUrl)("alt", ctx_r2.previewListing.title);
} }
function ListeAnnoncesComponent_div_66_span_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "s");
    i0.ɵɵelementEnd();
} }
function ListeAnnoncesComponent_div_66_a_52_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 108);
    i0.ɵɵtext(1, " Contacter le vendeur ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("href", "mailto:" + ctx_r2.previewListing.sellerEmail, i0.ɵɵsanitizeUrl);
} }
function ListeAnnoncesComponent_div_66_a_53_Template(rf, ctx) { if (rf & 1) {
    const _r16 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 109);
    i0.ɵɵlistener("click", function ListeAnnoncesComponent_div_66_a_53_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r16); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.closePreview()); });
    i0.ɵɵtext(1, " Modifier ce dossier ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(1, _c3, ctx_r2.previewListing.id));
} }
function ListeAnnoncesComponent_div_66_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 90);
    i0.ɵɵlistener("click", function ListeAnnoncesComponent_div_66_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r14); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closePreview()); });
    i0.ɵɵelementStart(1, "div", 91);
    i0.ɵɵlistener("click", function ListeAnnoncesComponent_div_66_Template_div_click_1_listener($event) { return $event.stopPropagation(); });
    i0.ɵɵelementStart(2, "button", 92);
    i0.ɵɵlistener("click", function ListeAnnoncesComponent_div_66_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r14); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closePreview()); });
    i0.ɵɵelement(3, "i", 93);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 94)(5, "p-carousel", 95);
    i0.ɵɵtemplate(6, ListeAnnoncesComponent_div_66_ng_template_6_Template, 1, 2, "ng-template", null, 3, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 96)(9, "div", 97)(10, "span", 53);
    i0.ɵɵtext(11);
    i0.ɵɵpipe(12, "titlecase");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "span", 54);
    i0.ɵɵtext(14);
    i0.ɵɵpipe(15, "titlecase");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "h2");
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "p", 98);
    i0.ɵɵelement(19, "i", 58);
    i0.ɵɵelementStart(20, "span");
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "div", 99);
    i0.ɵɵtext(23);
    i0.ɵɵpipe(24, "number");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "p", 100);
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "div", 101)(28, "div", 102)(29, "span");
    i0.ɵɵtext(30, "Race");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "strong");
    i0.ɵɵtext(32);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(33, "div", 102)(34, "span");
    i0.ɵɵtext(35, "Quantit\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "strong");
    i0.ɵɵtext(37);
    i0.ɵɵtemplate(38, ListeAnnoncesComponent_div_66_span_38_Template, 2, 0, "span", 35);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(39, "div", 102)(40, "span");
    i0.ɵɵtext(41, "Propri\u00E9taire");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(42, "strong");
    i0.ɵɵtext(43);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(44, "div", 102)(45, "span");
    i0.ɵɵtext(46, "R\u00E9f\u00E9rence");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(47, "strong");
    i0.ɵɵtext(48);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(49, "div", 103)(50, "a", 104);
    i0.ɵɵlistener("click", function ListeAnnoncesComponent_div_66_Template_a_click_50_listener() { i0.ɵɵrestoreView(_r14); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closePreview()); });
    i0.ɵɵtext(51, " Ouvrir la fiche compl\u00E8te ");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(52, ListeAnnoncesComponent_div_66_a_52_Template, 2, 1, "a", 105)(53, ListeAnnoncesComponent_div_66_a_53_Template, 2, 3, "a", 106);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("value", ctx_r2.galleryFor(ctx_r2.previewListing))("numVisible", 1)("numScroll", 1)("circular", ctx_r2.galleryFor(ctx_r2.previewListing).length > 1)("showIndicators", ctx_r2.galleryFor(ctx_r2.previewListing).length > 1)("showNavigators", ctx_r2.galleryFor(ctx_r2.previewListing).length > 1);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(12, 20, ctx_r2.previewListing.animalType));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(15, 22, ctx_r2.previewListing.status));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r2.previewListing.title);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r2.previewListing.location);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(24, 24, ctx_r2.previewListing.price, "1.0-0"), " FCFA ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.previewListing.description || "Dossier animal valid\u00E9 et pr\u00EAt \u00E0 \u00EAtre consult\u00E9.", " ");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r2.previewListing.breed || "Non renseign\u00E9e");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("", ctx_r2.previewListing.quantity, " t\u00EAte");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.previewListing.quantity > 1);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.previewListing.sellerName);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.previewListing.qrCode || "Non renseign\u00E9e");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(27, _c2, ctx_r2.previewListing.id));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r2.auth.isLoggedIn() && ctx_r2.previewListing.sellerEmail);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.canEditPreview);
} }
export class ListeAnnoncesComponent {
    set mapHostRef(value) {
        const hostChanged = this.mapHost?.nativeElement !== value?.nativeElement;
        this.mapHost = value;
        if (hostChanged && this.map) {
            this.destroyMap();
        }
        void this.ensureMapReady();
    }
    constructor(listingService, uiState, auth, zone, document) {
        this.listingService = listingService;
        this.uiState = uiState;
        this.auth = auth;
        this.zone = zone;
        this.document = document;
        this.mapBootstrapping = false;
        this.markers = new Map();
        this.subscriptions = new Subscription();
        this.allListings = [];
        this.location = '';
        this.animalType = '';
        this.loading = true;
        this.mapUnavailable = false;
        this.currentPage = 1;
        this.pageSize = 4;
        this.placeholderImage = 'https://placehold.co/960x720/fde2e2/7f1d1d?text=Animal';
        this.defaultMapCenter = {
            latitude: 7.539989,
            longitude: -5.54708,
        };
        this.animalTypes = [
            { value: '', label: 'Tous les animaux' },
            { value: 'BOVIN', label: 'Bovins' },
            { value: 'OVIN', label: 'Ovins' },
            { value: 'CAPRIN', label: 'Caprins' },
            { value: 'PORCIN', label: 'Porcins' },
            { value: 'AUTRE', label: 'Autres espèces' },
        ];
    }
    ngOnInit() {
        this.pageSize = this.computePageSize();
        this.subscriptions.add(this.listingService.search({}).subscribe((listings) => {
            this.allListings = listings;
            this.loading = false;
            this.ensureSelectionStillVisible();
            this.ensurePaginationState();
            this.queueMapRefresh();
        }));
        this.subscriptions.add(this.uiState.searchTerm$.subscribe((term) => {
            this.location = term;
            this.ensureSelectionStillVisible();
            this.ensurePaginationState();
            this.queueMapRefresh();
        }));
        this.subscriptions.add(this.uiState.animalFilter$.subscribe((filter) => {
            this.animalType = filter;
            this.ensureSelectionStillVisible();
            this.ensurePaginationState();
            this.queueMapRefresh();
        }));
    }
    ngAfterViewInit() {
        void this.ensureMapReady();
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
        this.toggleBodyScroll(true);
        if (this.mapReadyRetry) {
            clearTimeout(this.mapReadyRetry);
            this.mapReadyRetry = undefined;
        }
        this.destroyMap();
    }
    onEscape() {
        this.closePreview();
    }
    onWindowResize() {
        this.updatePageSize();
        if (!this.map) {
            return;
        }
        this.scheduleMapInvalidate();
    }
    get filteredListings() {
        const normalizedLocation = this.normalizeText(this.location);
        const normalizedAnimalType = this.normalizeText(this.animalType);
        return this.allListings.filter((listing) => {
            const matchesLocation = !normalizedLocation ||
                this.normalizeText(listing.location).includes(normalizedLocation) ||
                this.normalizeText(listing.title).includes(normalizedLocation) ||
                this.normalizeText(listing.breed || '').includes(normalizedLocation) ||
                this.normalizeText(listing.sellerName || '').includes(normalizedLocation);
            const matchesAnimal = !normalizedAnimalType ||
                this.normalizeText(listing.animalType) === normalizedAnimalType;
            return matchesLocation && matchesAnimal;
        });
    }
    get mappedListings() {
        return this.filteredListings.filter((listing) => this.hasCoordinates(listing));
    }
    get paginatedListings() {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        return this.filteredListings.slice(startIndex, startIndex + this.pageSize);
    }
    get totalPages() {
        const total = Math.ceil(this.filteredListings.length / this.pageSize);
        return Math.max(1, total);
    }
    get visibleRangeStart() {
        if (!this.filteredListings.length) {
            return 0;
        }
        return (this.currentPage - 1) * this.pageSize + 1;
    }
    get visibleRangeEnd() {
        if (!this.filteredListings.length) {
            return 0;
        }
        return Math.min(this.currentPage * this.pageSize, this.filteredListings.length);
    }
    get hasPreviousPage() {
        return this.currentPage > 1;
    }
    get hasNextPage() {
        return this.currentPage < this.totalPages;
    }
    get paginationItems() {
        const total = this.totalPages;
        if (total <= 1) {
            return [1];
        }
        if (total <= 7) {
            return Array.from({ length: total }, (_, index) => index + 1);
        }
        let start = Math.max(2, this.currentPage - 1);
        let end = Math.min(total - 1, this.currentPage + 1);
        if (this.currentPage <= 3) {
            start = 2;
            end = 4;
        }
        if (this.currentPage >= total - 2) {
            start = total - 3;
            end = total - 1;
        }
        const items = [1];
        if (start > 2) {
            items.push('ellipsis-left');
        }
        for (let page = start; page <= end; page += 1) {
            items.push(page);
        }
        if (end < total - 1) {
            items.push('ellipsis-right');
        }
        items.push(total);
        return items;
    }
    get missingCoordinatesCount() {
        return this.filteredListings.length - this.mappedListings.length;
    }
    get highlightedListing() {
        return this.filteredListings.find((listing) => listing.id === this.activeListingId);
    }
    get canEditPreview() {
        return !!this.previewListing && this.auth.currentUser?.id === this.previewListing.sellerId;
    }
    get animalTypeChips() {
        return this.animalTypes
            .filter((type) => type.value)
            .map((type) => ({
            label: type.label,
            value: type.value,
            count: this.allListings.filter((listing) => listing.animalType === type.value).length,
        }))
            .filter((chip) => chip.count > 0);
    }
    trackByListing(_, listing) {
        return listing.id;
    }
    updateLocation(value) {
        this.location = value;
        this.uiState.setSearchTerm(value);
        this.ensureSelectionStillVisible();
        this.queueMapRefresh();
    }
    updateAnimalType(value) {
        this.animalType = value;
        this.uiState.setAnimalFilter(value);
        this.ensureSelectionStillVisible();
        this.queueMapRefresh();
    }
    resetFilters() {
        this.location = '';
        this.animalType = '';
        this.uiState.setSearchTerm('');
        this.uiState.setAnimalFilter('');
        this.ensureSelectionStillVisible();
        this.queueMapRefresh();
    }
    openPreview(listing, event) {
        event?.preventDefault();
        event?.stopPropagation();
        this.syncPageWithListing(listing);
        this.previewListing = listing;
        this.activeListingId = listing.id;
        this.toggleBodyScroll(false);
        this.focusListingOnMap(listing);
        this.refreshMarkerStyles();
    }
    closePreview() {
        this.previewListing = undefined;
        this.toggleBodyScroll(true);
    }
    focusListing(listing, event) {
        event?.preventDefault();
        event?.stopPropagation();
        this.syncPageWithListing(listing);
        this.activeListingId = listing.id;
        this.focusListingOnMap(listing);
        this.refreshMarkerStyles();
    }
    goToPage(page) {
        const nextPage = Math.min(Math.max(page, 1), this.totalPages);
        if (nextPage === this.currentPage) {
            return;
        }
        this.currentPage = nextPage;
        this.scrollResultsIntoView();
    }
    goToPreviousPage() {
        if (!this.hasPreviousPage) {
            return;
        }
        this.goToPage(this.currentPage - 1);
    }
    goToNextPage() {
        if (!this.hasNextPage) {
            return;
        }
        this.goToPage(this.currentPage + 1);
    }
    isPageItem(item) {
        return typeof item === 'number';
    }
    recenterMap() {
        if (!this.map) {
            return;
        }
        if (!this.mappedListings.length) {
            this.map.flyTo([this.defaultMapCenter.latitude, this.defaultMapCenter.longitude], 7, { duration: 0.8 });
            return;
        }
        this.fitMapToListings();
    }
    hasCoordinates(listing) {
        return this.toLatLng(listing) !== null;
    }
    galleryFor(listing) {
        const gallery = (listing?.gallery ?? []).filter((image) => !!image);
        return gallery.length ? gallery : [this.placeholderImage];
    }
    ensureSelectionStillVisible() {
        const visibleIds = new Set(this.filteredListings.map((listing) => listing.id));
        if (this.activeListingId && !visibleIds.has(this.activeListingId)) {
            this.activeListingId = undefined;
        }
        if (this.previewListing && !visibleIds.has(this.previewListing.id)) {
            this.closePreview();
        }
    }
    ensurePaginationState() {
        if (!this.filteredListings.length) {
            this.currentPage = 1;
            return;
        }
        if (this.activeListingId) {
            const activeListing = this.filteredListings.find((listing) => listing.id === this.activeListingId);
            if (activeListing) {
                this.currentPage = this.pageForListing(activeListing);
                return;
            }
        }
        this.currentPage = Math.min(Math.max(this.currentPage, 1), this.totalPages);
    }
    queueMapRefresh() {
        setTimeout(() => {
            void this.ensureMapReady();
            if (this.map) {
                this.syncMapMarkers();
            }
        }, 0);
    }
    syncPageWithListing(listing) {
        this.currentPage = this.pageForListing(listing);
    }
    async bootstrapMap() {
        try {
            await this.ensureLeafletAssets();
            this.initializeMap();
            this.syncMapMarkers();
        }
        catch {
            this.mapUnavailable = true;
        }
    }
    async ensureMapReady() {
        if (this.map || this.mapUnavailable || this.mapBootstrapping || !this.mapHost?.nativeElement) {
            return;
        }
        if (!this.hasRenderableMapHost()) {
            this.scheduleEnsureMapReady();
            return;
        }
        this.mapBootstrapping = true;
        try {
            await this.bootstrapMap();
        }
        finally {
            this.mapBootstrapping = false;
        }
    }
    ensureLeafletAssets() {
        const leaflet = window.L;
        if (leaflet) {
            return Promise.resolve(leaflet);
        }
        this.ensureLeafletStyles();
        if (ListeAnnoncesComponent.leafletLoadPromise) {
            return ListeAnnoncesComponent.leafletLoadPromise;
        }
        ListeAnnoncesComponent.leafletLoadPromise = new Promise((resolve, reject) => {
            const existingScript = this.document.querySelector('script[data-leaflet-runtime="true"]');
            if (existingScript) {
                existingScript.addEventListener('load', () => resolve(window.L), {
                    once: true,
                });
                existingScript.addEventListener('error', () => reject(new Error('Leaflet load failed')), { once: true });
                return;
            }
            const script = this.document.createElement('script');
            script.src = '/assets/vendor/leaflet/leaflet.js';
            script.async = true;
            script.defer = true;
            script.dataset['leafletRuntime'] = 'true';
            script.onload = () => resolve(window.L);
            script.onerror = () => reject(new Error('Leaflet script could not be loaded'));
            this.document.body.appendChild(script);
        });
        return ListeAnnoncesComponent.leafletLoadPromise;
    }
    ensureLeafletStyles() {
        const existingLink = this.document.querySelector('link[data-leaflet-runtime="true"]');
        if (existingLink) {
            return;
        }
        const link = this.document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/assets/vendor/leaflet/leaflet.css';
        link.dataset['leafletRuntime'] = 'true';
        this.document.head.appendChild(link);
    }
    initializeMap() {
        const leaflet = window.L;
        if (!this.mapHost?.nativeElement || !leaflet) {
            this.mapUnavailable = true;
            return;
        }
        if (!this.hasRenderableMapHost()) {
            this.scheduleEnsureMapReady();
            return;
        }
        this.mapUnavailable = false;
        this.map = leaflet
            .map(this.mapHost.nativeElement, {
            zoomControl: false,
            attributionControl: true,
            scrollWheelZoom: true,
        })
            .setView([this.defaultMapCenter.latitude, this.defaultMapCenter.longitude], 7);
        leaflet.control.zoom({ position: 'topright' }).addTo(this.map);
        leaflet
            .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; OpenStreetMap contributors',
        })
            .addTo(this.map);
        this.scheduleMapInvalidate();
    }
    syncMapMarkers() {
        if (!this.map) {
            return;
        }
        const leaflet = window.L;
        this.markers.forEach((marker) => marker.remove());
        this.markers.clear();
        for (const listing of this.mappedListings) {
            const coordinates = this.toLatLng(listing);
            if (!coordinates) {
                continue;
            }
            const marker = leaflet
                .marker(coordinates, {
                icon: this.buildMarkerIcon(listing, listing.id === this.activeListingId),
            })
                .addTo(this.map);
            marker.on('click', () => {
                this.zone.run(() => {
                    this.openPreview(listing);
                });
            });
            this.markers.set(listing.id, marker);
        }
        this.refreshMarkerStyles();
        this.fitMapToListings();
    }
    fitMapToListings() {
        if (!this.map) {
            return;
        }
        const activeListing = this.mappedListings.find((listing) => listing.id === this.activeListingId);
        if (activeListing) {
            this.focusListingOnMap(activeListing);
            return;
        }
        if (!this.mappedListings.length) {
            this.map.setView([this.defaultMapCenter.latitude, this.defaultMapCenter.longitude], 7);
            return;
        }
        const leaflet = window.L;
        const bounds = leaflet.latLngBounds(this.mappedListings
            .map((listing) => this.toLatLng(listing))
            .filter((coordinates) => coordinates !== null));
        if (!bounds.isValid()) {
            this.map.setView([this.defaultMapCenter.latitude, this.defaultMapCenter.longitude], 7);
            return;
        }
        this.map.fitBounds(bounds, {
            padding: [34, 34],
            maxZoom: 11,
        });
    }
    focusListingOnMap(listing) {
        const coordinates = this.toLatLng(listing);
        if (!this.map || !coordinates) {
            return;
        }
        this.map.flyTo(coordinates, 12, {
            duration: 0.8,
        });
    }
    refreshMarkerStyles() {
        const leaflet = window.L;
        if (!leaflet) {
            return;
        }
        for (const listing of this.mappedListings) {
            const marker = this.markers.get(listing.id);
            if (!marker) {
                continue;
            }
            marker.setIcon(this.buildMarkerIcon(listing, listing.id === this.activeListingId));
        }
    }
    buildMarkerIcon(listing, active) {
        const badgeBackground = active
            ? 'linear-gradient(135deg,#7f1d1d 0%,#dc2626 100%)'
            : 'rgba(255,255,255,0.96)';
        const badgeColor = active ? '#ffffff' : '#7f1d1d';
        const badgeShadow = active
            ? '0 18px 34px rgba(127,29,29,0.32)'
            : '0 16px 30px rgba(127,29,29,0.14)';
        const typeLabel = this.formatAnimalType(listing.animalType);
        const priceLabel = new Intl.NumberFormat('fr-FR', {
            maximumFractionDigits: 0,
        }).format(listing.price);
        return window.L.divIcon({
            className: 'animal-marker-shell',
            html: `
        <div style="
          min-width: 110px;
          padding: 10px 12px;
          border-radius: 18px;
          background: ${badgeBackground};
          color: ${badgeColor};
          border: 1px solid rgba(255,255,255,0.18);
          box-shadow: ${badgeShadow};
          text-align: left;
          position: relative;
          font-family: inherit;
        ">
          <div style="font-size: 10px; font-weight: 800; letter-spacing: 0.16em; text-transform: uppercase; opacity: ${active ? 0.78 : 0.66};">
            ${typeLabel}
          </div>
          <div style="font-size: 15px; font-weight: 800; line-height: 1.1; margin-top: 3px;">
            ${priceLabel} FCFA
          </div>
          <div style="
            position: absolute;
            left: 16px;
            bottom: -8px;
            width: 16px;
            height: 16px;
            background: ${active ? '#991b1b' : '#ffffff'};
            transform: rotate(45deg);
            border-right: 1px solid rgba(220,38,38,0.14);
            border-bottom: 1px solid rgba(220,38,38,0.14);
          "></div>
        </div>
      `,
            iconSize: [110, 54],
            iconAnchor: [55, 54],
            popupAnchor: [0, -42],
        });
    }
    toggleBodyScroll(enable) {
        this.document.body.style.overflow = enable ? '' : 'hidden';
    }
    toLatLng(listing) {
        const latitude = Number(listing.latitude);
        const longitude = Number(listing.longitude);
        if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
            return null;
        }
        if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
            return null;
        }
        return [latitude, longitude];
    }
    hasRenderableMapHost() {
        const host = this.mapHost?.nativeElement;
        return !!host && host.clientWidth > 0 && host.clientHeight > 0;
    }
    scheduleEnsureMapReady() {
        if (this.mapReadyRetry) {
            clearTimeout(this.mapReadyRetry);
        }
        this.mapReadyRetry = setTimeout(() => {
            this.mapReadyRetry = undefined;
            void this.ensureMapReady();
        }, 120);
    }
    scheduleMapInvalidate() {
        setTimeout(() => {
            if (!this.map || !this.hasRenderableMapHost()) {
                return;
            }
            this.map.invalidateSize(false);
            this.fitMapToListings();
        }, 0);
        setTimeout(() => {
            if (!this.map || !this.hasRenderableMapHost()) {
                return;
            }
            this.map.invalidateSize(false);
        }, 220);
    }
    formatAnimalType(value) {
        return value.charAt(0) + value.slice(1).toLowerCase();
    }
    normalizeText(value) {
        return value
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .trim()
            .toLowerCase();
    }
    pageForListing(listing) {
        const index = this.filteredListings.findIndex((item) => item.id === listing.id);
        if (index < 0) {
            return this.currentPage;
        }
        return Math.floor(index / this.pageSize) + 1;
    }
    computePageSize() {
        const viewportWidth = this.document.defaultView?.innerWidth ?? 1440;
        if (viewportWidth >= 1680) {
            return 6;
        }
        if (viewportWidth >= 1280) {
            return 4;
        }
        if (viewportWidth >= 768) {
            return 3;
        }
        return 2;
    }
    updatePageSize() {
        const nextPageSize = this.computePageSize();
        if (nextPageSize === this.pageSize) {
            return;
        }
        const anchorIndex = (this.currentPage - 1) * this.pageSize;
        this.pageSize = nextPageSize;
        if (!this.filteredListings.length) {
            this.currentPage = 1;
            return;
        }
        this.currentPage = Math.floor(anchorIndex / this.pageSize) + 1;
        this.ensurePaginationState();
    }
    scrollResultsIntoView() {
        this.resultsPanel?.nativeElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    }
    destroyMap() {
        this.markers.forEach((marker) => marker.remove());
        this.markers.clear();
        if (this.map) {
            this.map.remove();
            this.map = undefined;
        }
    }
    static { this.ɵfac = function ListeAnnoncesComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ListeAnnoncesComponent)(i0.ɵɵdirectiveInject(i1.ListingService), i0.ɵɵdirectiveInject(i2.MarketplaceUiService), i0.ɵɵdirectiveInject(i3.AuthService), i0.ɵɵdirectiveInject(i0.NgZone), i0.ɵɵdirectiveInject(DOCUMENT)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ListeAnnoncesComponent, selectors: [["app-liste-annonces"]], viewQuery: function ListeAnnoncesComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 5)(_c1, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.resultsPanel = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.mapHostRef = _t.first);
        } }, hostBindings: function ListeAnnoncesComponent_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("keydown.escape", function ListeAnnoncesComponent_keydown_escape_HostBindingHandler() { return ctx.onEscape(); }, i0.ɵɵresolveDocument)("resize", function ListeAnnoncesComponent_resize_HostBindingHandler() { return ctx.onWindowResize(); }, i0.ɵɵresolveWindow);
        } }, standalone: false, decls: 67, vars: 17, consts: [["resultsPanel", ""], ["mapFallback", ""], ["emptyState", ""], ["item", ""], ["paginationEllipsis", ""], ["mapHost", ""], [1, "catalog-shell", "py-6", "px-4", "sm:py-8", "lg:px-8"], [1, "max-w-[1600px]", "mx-auto"], [1, "catalog-hero", "mb-8"], [1, "catalog-kicker"], [1, "catalog-copy"], ["class", "hero-chips", 4, "ngIf"], [1, "hero-stats"], [1, "hero-stat"], [1, "hero-stat__value"], [1, "hero-stat__label"], [1, "catalog-toolbar", "mb-6"], [1, "toolbar-field", "toolbar-field--wide"], ["for", "location"], ["id", "location", "type", "text", "placeholder", "Korhogo, Bouak\u00E9, N'Dama, \u00E9leveur...", 3, "ngModelChange", "ngModel"], [1, "toolbar-field"], ["for", "animalType"], ["id", "animalType", 3, "ngModelChange", "ngModel"], [3, "value", 4, "ngFor", "ngForOf"], ["type", "button", 1, "toolbar-reset", 3, "click"], [1, "catalog-layout"], [1, "catalog-results"], [4, "ngIf", "ngIfElse"], [1, "catalog-map-wrap"], [1, "catalog-map-panel"], [1, "map-panel__header"], [1, "map-panel__kicker"], ["type", "button", 1, "map-panel__action", 3, "click"], ["class", "catalog-map", 4, "ngIf", "ngIfElse"], [1, "map-panel__footer"], [4, "ngIf"], ["class", "map-focus-card", 4, "ngIf"], ["class", "preview-backdrop", 3, "click", 4, "ngIf"], [1, "hero-chips"], ["type", "button", "class", "hero-chip", 3, "hero-chip--active", "click", 4, "ngFor", "ngForOf"], ["type", "button", 1, "hero-chip", 3, "click"], [3, "value"], [1, "results-header"], [1, "results-title"], [1, "results-caption"], [1, "results-badge"], [1, "animal-grid"], ["class", "animal-card", 3, "animal-card--active", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["class", "catalog-pagination", 4, "ngIf"], [1, "animal-card"], [1, "animal-card__media"], ["styleClass", "animal-carousel", 3, "value", "numVisible", "numScroll", "circular", "showIndicators", "showNavigators"], [1, "animal-card__badges"], [1, "animal-badge", "animal-badge--solid"], [1, "animal-badge"], ["type", "button", "class", "map-focus-btn", "title", "Voir sur la carte", 3, "click", 4, "ngIf"], [1, "animal-card__content"], [1, "animal-location"], [1, "pi", "pi-map-marker"], [1, "animal-title"], [1, "animal-description"], [1, "animal-meta"], [1, "animal-meta__item"], [1, "animal-meta__label"], [1, "animal-footer"], [1, "animal-price"], [1, "animal-price__label"], [1, "animal-actions"], ["type", "button", 1, "animal-action", "animal-action--ghost", 3, "click"], [1, "animal-action", "animal-action--solid", 3, "routerLink"], [1, "animal-card__image", 3, "src", "alt"], ["type", "button", "title", "Voir sur la carte", 1, "map-focus-btn", 3, "click"], [1, "catalog-pagination"], [1, "catalog-pagination__summary"], [1, "catalog-pagination__controls"], ["type", "button", 1, "pagination-btn", "pagination-btn--nav", 3, "click", "disabled"], [4, "ngFor", "ngForOf"], ["type", "button", "class", "pagination-btn", 3, "pagination-btn--active", "click", 4, "ngIf", "ngIfElse"], ["type", "button", 1, "pagination-btn", 3, "click"], [1, "pagination-ellipsis"], [1, "catalog-map"], [1, "catalog-map", "catalog-map--empty"], [1, "map-focus-card"], [1, "map-focus-card__media"], [3, "src", "alt"], [1, "map-focus-card__content"], [1, "map-focus-card__eyebrow"], [1, "map-focus-card__actions"], [1, "empty-state", "empty-state--inline"], [1, "pi", "pi-inbox"], [1, "preview-backdrop", 3, "click"], [1, "preview-modal", 3, "click"], ["type", "button", "aria-label", "Fermer", 1, "preview-close", 3, "click"], [1, "pi", "pi-times"], [1, "preview-modal__media"], ["styleClass", "preview-carousel", 3, "value", "numVisible", "numScroll", "circular", "showIndicators", "showNavigators"], [1, "preview-modal__content"], [1, "preview-topline"], [1, "preview-location"], [1, "preview-price"], [1, "preview-description"], [1, "preview-grid"], [1, "preview-tile"], [1, "preview-actions"], [1, "animal-action", "animal-action--solid", 3, "click", "routerLink"], ["class", "animal-action animal-action--ghost", 3, "href", 4, "ngIf"], ["class", "animal-action animal-action--ghost", 3, "routerLink", "click", 4, "ngIf"], [1, "preview-modal__image", 3, "src", "alt"], [1, "animal-action", "animal-action--ghost", 3, "href"], [1, "animal-action", "animal-action--ghost", 3, "click", "routerLink"]], template: function ListeAnnoncesComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 6)(1, "div", 7)(2, "div", 8)(3, "div")(4, "p", 9);
            i0.ɵɵtext(5, "March\u00E9 b\u00E9tail");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "h1");
            i0.ɵɵtext(7, "Parcourir les animaux disponibles avec une vraie lecture terrain");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "p", 10);
            i0.ɵɵtext(9, " Ce catalogue r\u00E9unit les dossiers valid\u00E9s, leur implantation sur la carte et un aper\u00E7u rapide avant consultation compl\u00E8te. ");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(10, ListeAnnoncesComponent_div_10_Template, 2, 1, "div", 11);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "div", 12)(12, "div", 13)(13, "span", 14);
            i0.ɵɵtext(14);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "span", 15);
            i0.ɵɵtext(16, "dossiers publi\u00E9s");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(17, "div", 13)(18, "span", 14);
            i0.ɵɵtext(19);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "span", 15);
            i0.ɵɵtext(21, "rep\u00E8res cartographiques");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(22, "div", 13)(23, "span", 14);
            i0.ɵɵtext(24);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(25, "span", 15);
            i0.ɵɵtext(26, "dossiers sans rep\u00E8re cartographique");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(27, "div", 16)(28, "div", 17)(29, "label", 18);
            i0.ɵɵtext(30, "Zone ou recherche");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "input", 19);
            i0.ɵɵlistener("ngModelChange", function ListeAnnoncesComponent_Template_input_ngModelChange_31_listener($event) { return ctx.updateLocation($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(32, "div", 20)(33, "label", 21);
            i0.ɵɵtext(34, "Esp\u00E8ce");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(35, "select", 22);
            i0.ɵɵlistener("ngModelChange", function ListeAnnoncesComponent_Template_select_ngModelChange_35_listener($event) { return ctx.updateAnimalType($event); });
            i0.ɵɵtemplate(36, ListeAnnoncesComponent_option_36_Template, 2, 2, "option", 23);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(37, "button", 24);
            i0.ɵɵlistener("click", function ListeAnnoncesComponent_Template_button_click_37_listener() { return ctx.resetFilters(); });
            i0.ɵɵtext(38, " R\u00E9initialiser ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(39, "div", 25)(40, "div", 26, 0);
            i0.ɵɵtemplate(42, ListeAnnoncesComponent_ng_container_42_Template, 12, 6, "ng-container", 27);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(43, "aside", 28)(44, "div", 29)(45, "div", 30)(46, "div")(47, "p", 31);
            i0.ɵɵtext(48, "Vue cartographique");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(49, "h2");
            i0.ɵɵtext(50, "Animaux positionn\u00E9s sur la carte");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(51, "button", 32);
            i0.ɵɵlistener("click", function ListeAnnoncesComponent_Template_button_click_51_listener() { return ctx.recenterMap(); });
            i0.ɵɵtext(52, " Recentrer ");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(53, ListeAnnoncesComponent_div_53_Template, 2, 0, "div", 33)(54, ListeAnnoncesComponent_ng_template_54_Template, 5, 0, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementStart(56, "div", 34)(57, "span");
            i0.ɵɵtext(58);
            i0.ɵɵtemplate(59, ListeAnnoncesComponent_span_59_Template, 2, 0, "span", 35);
            i0.ɵɵtext(60, " g\u00E9olocalis\u00E9");
            i0.ɵɵtemplate(61, ListeAnnoncesComponent_span_61_Template, 2, 0, "span", 35);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(62, ListeAnnoncesComponent_span_62_Template, 2, 1, "span", 35);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(63, ListeAnnoncesComponent_div_63_Template, 16, 11, "div", 36);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵtemplate(64, ListeAnnoncesComponent_ng_template_64_Template, 6, 0, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor)(66, ListeAnnoncesComponent_div_66_Template, 54, 29, "div", 37);
        } if (rf & 2) {
            const mapFallback_r17 = i0.ɵɵreference(55);
            const emptyState_r18 = i0.ɵɵreference(65);
            i0.ɵɵadvance(10);
            i0.ɵɵproperty("ngIf", ctx.animalTypeChips.length);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(ctx.filteredListings.length);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.mappedListings.length);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.missingCoordinatesCount);
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("ngModel", ctx.location);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngModel", ctx.animalType);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.animalTypes);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("ngIf", ctx.filteredListings.length)("ngIfElse", emptyState_r18);
            i0.ɵɵadvance(11);
            i0.ɵɵproperty("ngIf", !ctx.mapUnavailable)("ngIfElse", mapFallback_r17);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate1("", ctx.mappedListings.length, " dossier");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.mappedListings.length > 1);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.mappedListings.length > 1);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.missingCoordinatesCount > 0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.highlightedListing);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.previewListing);
        } }, dependencies: [i4.NgForOf, i4.NgIf, i5.NgSelectOption, i5.ɵNgSelectMultipleOption, i5.DefaultValueAccessor, i5.SelectControlValueAccessor, i5.NgControlStatus, i5.NgModel, i6.RouterLink, i7.Carousel, i4.DecimalPipe, i4.TitleCasePipe], styles: ["[_nghost-%COMP%] {\r\n  display: block;\r\n}\r\n\r\n.catalog-shell[_ngcontent-%COMP%] {\r\n  min-height: 100%;\r\n  background:\r\n    radial-gradient(circle at top left, rgba(239, 68, 68, 0.14), transparent 26%),\r\n    radial-gradient(circle at 85% 0%, rgba(190, 24, 93, 0.12), transparent 22%),\r\n    linear-gradient(180deg, #fff8f8 0%, #fff3f4 42%, #fffafa 100%);\r\n}\r\n\r\n.catalog-hero[_ngcontent-%COMP%], \r\n.catalog-toolbar[_ngcontent-%COMP%], \r\n.catalog-results[_ngcontent-%COMP%], \r\n.catalog-map-panel[_ngcontent-%COMP%], \r\n.map-focus-card[_ngcontent-%COMP%], \r\n.empty-state[_ngcontent-%COMP%], \r\n.preview-modal[_ngcontent-%COMP%] {\r\n  border: 1px solid rgba(190, 24, 93, 0.12);\r\n  background: rgba(255, 255, 255, 0.92);\r\n  box-shadow: 0 24px 80px rgba(136, 19, 55, 0.08);\r\n  backdrop-filter: blur(18px);\r\n}\r\n\r\n.catalog-hero[_ngcontent-%COMP%] {\r\n  border-radius: 36px;\r\n  padding: 2rem;\r\n  display: grid;\r\n  grid-template-columns: minmax(0, 1.4fr) minmax(290px, 0.7fr);\r\n  gap: 1.5rem;\r\n}\r\n\r\n.catalog-kicker[_ngcontent-%COMP%], \r\n.map-panel__kicker[_ngcontent-%COMP%], \r\n.results-title[_ngcontent-%COMP%] {\r\n  margin: 0 0 0.5rem;\r\n  font-size: 0.76rem;\r\n  font-weight: 800;\r\n  letter-spacing: 0.24em;\r\n  text-transform: uppercase;\r\n  color: #b91c1c;\r\n}\r\n\r\n.catalog-hero[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], \r\n.catalog-map-panel[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], \r\n.preview-modal[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\r\n  margin: 0;\r\n  color: #611a24;\r\n  font-family: 'Trebuchet MS', 'Segoe UI Variable', sans-serif;\r\n  font-weight: 800;\r\n  letter-spacing: -0.03em;\r\n}\r\n\r\n.catalog-hero[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\r\n  font-size: clamp(2rem, 3vw, 3.5rem);\r\n  line-height: 1.02;\r\n}\r\n\r\n.catalog-copy[_ngcontent-%COMP%], \r\n.results-caption[_ngcontent-%COMP%] {\r\n  margin: 1rem 0 0;\r\n  color: #7f1d1d;\r\n  line-height: 1.7;\r\n  max-width: 64ch;\r\n}\r\n\r\n.hero-chips[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n  gap: 0.75rem;\r\n  margin-top: 1.5rem;\r\n}\r\n\r\n.hero-chip[_ngcontent-%COMP%] {\r\n  border: 1px solid rgba(220, 38, 38, 0.12);\r\n  border-radius: 999px;\r\n  background: rgba(255, 255, 255, 0.88);\r\n  color: #881337;\r\n  padding: 0.75rem 1rem;\r\n  display: inline-flex;\r\n  align-items: center;\r\n  gap: 0.75rem;\r\n  font-weight: 700;\r\n}\r\n\r\n.hero-chip[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  min-width: 30px;\r\n  height: 30px;\r\n  border-radius: 999px;\r\n  background: #ffe4e6;\r\n  color: #b91c1c;\r\n}\r\n\r\n.hero-chip--active[_ngcontent-%COMP%] {\r\n  background: linear-gradient(135deg, #b91c1c 0%, #e11d48 100%);\r\n  color: #fff;\r\n  box-shadow: 0 16px 30px rgba(185, 28, 28, 0.2);\r\n}\r\n\r\n.hero-chip--active[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\r\n  background: rgba(255, 255, 255, 0.18);\r\n  color: #fff;\r\n}\r\n\r\n.hero-stats[_ngcontent-%COMP%] {\r\n  display: grid;\r\n  gap: 0.9rem;\r\n}\r\n\r\n.hero-stat[_ngcontent-%COMP%] {\r\n  border-radius: 28px;\r\n  padding: 1.25rem;\r\n  background: linear-gradient(160deg, rgba(255, 241, 242, 0.96), rgba(255, 255, 255, 0.88));\r\n}\r\n\r\n.hero-stat__value[_ngcontent-%COMP%] {\r\n  display: block;\r\n  color: #9f1239;\r\n  font-size: clamp(1.8rem, 3vw, 2.6rem);\r\n  font-weight: 800;\r\n  line-height: 1;\r\n}\r\n\r\n.hero-stat__label[_ngcontent-%COMP%] {\r\n  display: block;\r\n  margin-top: 0.45rem;\r\n  color: #7f1d1d;\r\n  line-height: 1.5;\r\n}\r\n\r\n.catalog-toolbar[_ngcontent-%COMP%] {\r\n  border-radius: 30px;\r\n  padding: 1.25rem;\r\n  display: grid;\r\n  grid-template-columns: minmax(0, 1.6fr) minmax(220px, 0.8fr) auto;\r\n  gap: 1rem;\r\n  align-items: end;\r\n}\r\n\r\n.toolbar-field[_ngcontent-%COMP%] {\r\n  display: grid;\r\n  gap: 0.55rem;\r\n}\r\n\r\n.toolbar-field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\r\n  color: #7f1d1d;\r\n  font-size: 0.92rem;\r\n  font-weight: 700;\r\n}\r\n\r\n.toolbar-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \r\n.toolbar-field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  border: 1px solid rgba(190, 24, 93, 0.14);\r\n  border-radius: 18px;\r\n  padding: 0.95rem 1rem;\r\n  background: rgba(255, 255, 255, 0.96);\r\n  color: #4c0519;\r\n  outline: none;\r\n}\r\n\r\n.toolbar-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \r\n.toolbar-field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus {\r\n  border-color: #dc2626;\r\n  box-shadow: 0 0 0 4px rgba(220, 38, 38, 0.12);\r\n}\r\n\r\n.toolbar-reset[_ngcontent-%COMP%], \r\n.map-panel__action[_ngcontent-%COMP%] {\r\n  border: 1px solid rgba(190, 24, 93, 0.14);\r\n  border-radius: 18px;\r\n  background: #fff;\r\n  color: #991b1b;\r\n  font-weight: 700;\r\n  padding: 0.95rem 1.2rem;\r\n  transition: all 160ms ease;\r\n}\r\n\r\n.toolbar-reset[_ngcontent-%COMP%]:hover, \r\n.map-panel__action[_ngcontent-%COMP%]:hover {\r\n  border-color: #ef4444;\r\n  background: #fff1f2;\r\n}\r\n\r\n.catalog-layout[_ngcontent-%COMP%] {\r\n  display: grid;\r\n  grid-template-columns: minmax(0, 1.08fr) minmax(360px, 0.92fr);\r\n  gap: 1.5rem;\r\n  align-items: start;\r\n}\r\n\r\n.catalog-results[_ngcontent-%COMP%], \r\n.catalog-map-panel[_ngcontent-%COMP%], \r\n.map-focus-card[_ngcontent-%COMP%] {\r\n  border-radius: 32px;\r\n}\r\n\r\n.catalog-results[_ngcontent-%COMP%] {\r\n  padding: 1.35rem;\r\n}\r\n\r\n.results-header[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: start;\r\n  gap: 1rem;\r\n  margin-bottom: 1.25rem;\r\n}\r\n\r\n.results-title[_ngcontent-%COMP%] {\r\n  color: #be123c;\r\n}\r\n\r\n.results-badge[_ngcontent-%COMP%] {\r\n  border-radius: 999px;\r\n  padding: 0.75rem 1rem;\r\n  background: #fff1f2;\r\n  color: #9f1239;\r\n  font-weight: 700;\r\n  white-space: nowrap;\r\n}\r\n\r\n.animal-grid[_ngcontent-%COMP%] {\r\n  display: grid;\r\n  gap: 1.15rem;\r\n}\r\n\r\n.catalog-pagination[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  gap: 1rem;\r\n  flex-wrap: wrap;\r\n  margin-top: 1.4rem;\r\n  padding-top: 1.1rem;\r\n  border-top: 1px solid rgba(220, 38, 38, 0.1);\r\n}\r\n\r\n.catalog-pagination__summary[_ngcontent-%COMP%] {\r\n  color: #881337;\r\n  font-weight: 700;\r\n}\r\n\r\n.catalog-pagination__controls[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  flex-wrap: wrap;\r\n  justify-content: flex-end;\r\n  gap: 0.55rem;\r\n}\r\n\r\n.pagination-btn[_ngcontent-%COMP%] {\r\n  min-width: 44px;\r\n  height: 44px;\r\n  border: 1px solid rgba(190, 24, 93, 0.14);\r\n  border-radius: 14px;\r\n  padding: 0 0.95rem;\r\n  background: #fff;\r\n  color: #881337;\r\n  font-weight: 800;\r\n  transition: all 160ms ease;\r\n}\r\n\r\n.pagination-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\r\n  transform: translateY(-1px);\r\n  border-color: rgba(220, 38, 38, 0.28);\r\n  background: #fff1f2;\r\n}\r\n\r\n.pagination-btn[_ngcontent-%COMP%]:disabled {\r\n  opacity: 0.46;\r\n  cursor: not-allowed;\r\n}\r\n\r\n.pagination-btn--active[_ngcontent-%COMP%] {\r\n  border-color: transparent;\r\n  background: linear-gradient(135deg, #b91c1c 0%, #e11d48 100%);\r\n  color: #fff;\r\n  box-shadow: 0 16px 28px rgba(185, 28, 28, 0.2);\r\n}\r\n\r\n.pagination-btn--nav[_ngcontent-%COMP%] {\r\n  min-width: 110px;\r\n}\r\n\r\n.pagination-ellipsis[_ngcontent-%COMP%] {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  min-width: 28px;\r\n  color: #9f1239;\r\n  font-weight: 800;\r\n}\r\n\r\n.animal-card[_ngcontent-%COMP%] {\r\n  display: grid;\r\n  grid-template-columns: minmax(280px, 0.96fr) minmax(0, 1.04fr);\r\n  border-radius: 28px;\r\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(255, 248, 248, 0.96));\r\n  border: 1px solid rgba(220, 38, 38, 0.08);\r\n  overflow: hidden;\r\n  transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;\r\n}\r\n\r\n.animal-card[_ngcontent-%COMP%]:hover, \r\n.animal-card--active[_ngcontent-%COMP%] {\r\n  transform: translateY(-2px);\r\n  border-color: rgba(220, 38, 38, 0.2);\r\n  box-shadow: 0 22px 50px rgba(127, 29, 29, 0.12);\r\n}\r\n\r\n.animal-card__media[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  min-height: 100%;\r\n  background: #fee2e2;\r\n}\r\n\r\n.animal-card__image[_ngcontent-%COMP%], \r\n.preview-modal__image[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  height: 100%;\r\n  object-fit: cover;\r\n}\r\n\r\n.animal-card__badges[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  top: 1rem;\r\n  left: 1rem;\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 0.5rem;\r\n  z-index: 2;\r\n}\r\n\r\n.animal-badge[_ngcontent-%COMP%] {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  border-radius: 999px;\r\n  padding: 0.5rem 0.9rem;\r\n  background: rgba(255, 255, 255, 0.88);\r\n  color: #7f1d1d;\r\n  font-size: 0.78rem;\r\n  font-weight: 800;\r\n  letter-spacing: 0.04em;\r\n  box-shadow: 0 12px 24px rgba(127, 29, 29, 0.12);\r\n}\r\n\r\n.animal-badge--solid[_ngcontent-%COMP%] {\r\n  background: linear-gradient(135deg, #b91c1c 0%, #e11d48 100%);\r\n  color: #fff;\r\n}\r\n\r\n.map-focus-btn[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  right: 1rem;\r\n  top: 1rem;\r\n  width: 44px;\r\n  height: 44px;\r\n  border-radius: 999px;\r\n  border: 0;\r\n  background: rgba(255, 255, 255, 0.92);\r\n  color: #b91c1c;\r\n  display: inline-flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  box-shadow: 0 14px 28px rgba(127, 29, 29, 0.16);\r\n  transition: transform 160ms ease, background 160ms ease;\r\n}\r\n\r\n.map-focus-btn[_ngcontent-%COMP%]:hover {\r\n  transform: scale(1.06);\r\n  background: #fff1f2;\r\n}\r\n\r\n.animal-card__content[_ngcontent-%COMP%] {\r\n  padding: 1.35rem;\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 1rem;\r\n}\r\n\r\n.animal-location[_ngcontent-%COMP%], \r\n.preview-location[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 0.55rem;\r\n  color: #881337;\r\n  font-size: 0.95rem;\r\n}\r\n\r\n.animal-title[_ngcontent-%COMP%] {\r\n  margin: 0;\r\n  color: #611a24;\r\n  font-size: 1.45rem;\r\n  line-height: 1.15;\r\n}\r\n\r\n.animal-description[_ngcontent-%COMP%], \r\n.preview-description[_ngcontent-%COMP%] {\r\n  margin: 0;\r\n  color: #6b1b26;\r\n  line-height: 1.65;\r\n}\r\n\r\n.animal-description[_ngcontent-%COMP%] {\r\n  display: -webkit-box;\r\n  -webkit-box-orient: vertical;\r\n  -webkit-line-clamp: 3;\r\n  overflow: hidden;\r\n}\r\n\r\n.animal-meta[_ngcontent-%COMP%], \r\n.preview-grid[_ngcontent-%COMP%] {\r\n  display: grid;\r\n  grid-template-columns: repeat(3, minmax(0, 1fr));\r\n  gap: 0.75rem;\r\n}\r\n\r\n.preview-grid[_ngcontent-%COMP%] {\r\n  grid-template-columns: repeat(2, minmax(0, 1fr));\r\n}\r\n\r\n.animal-meta__item[_ngcontent-%COMP%], \r\n.preview-tile[_ngcontent-%COMP%] {\r\n  border-radius: 20px;\r\n  padding: 0.95rem 1rem;\r\n  background: rgba(255, 241, 242, 0.86);\r\n}\r\n\r\n.animal-meta__label[_ngcontent-%COMP%], \r\n.preview-tile[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\r\n  display: block;\r\n  color: #9f1239;\r\n  font-size: 0.78rem;\r\n  font-weight: 700;\r\n  text-transform: uppercase;\r\n  letter-spacing: 0.08em;\r\n}\r\n\r\n.animal-meta__item[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \r\n.preview-tile[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\r\n  display: block;\r\n  margin-top: 0.4rem;\r\n  color: #611a24;\r\n  line-height: 1.45;\r\n}\r\n\r\n.animal-footer[_ngcontent-%COMP%], \r\n.preview-actions[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  gap: 1rem;\r\n  margin-top: auto;\r\n}\r\n\r\n.animal-price__label[_ngcontent-%COMP%] {\r\n  display: block;\r\n  color: #9f1239;\r\n  font-size: 0.78rem;\r\n  font-weight: 700;\r\n  text-transform: uppercase;\r\n  letter-spacing: 0.08em;\r\n}\r\n\r\n.animal-price[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \r\n.preview-price[_ngcontent-%COMP%] {\r\n  display: block;\r\n  margin-top: 0.3rem;\r\n  font-size: 1.65rem;\r\n  font-weight: 800;\r\n  color: #b91c1c;\r\n}\r\n\r\n.animal-actions[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n  justify-content: flex-end;\r\n  gap: 0.75rem;\r\n}\r\n\r\n.animal-action[_ngcontent-%COMP%] {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  min-height: 48px;\r\n  padding: 0.85rem 1.15rem;\r\n  border-radius: 16px;\r\n  font-weight: 800;\r\n  transition: transform 160ms ease, box-shadow 160ms ease, background 160ms ease;\r\n}\r\n\r\n.animal-action[_ngcontent-%COMP%]:hover {\r\n  transform: translateY(-1px);\r\n}\r\n\r\n.animal-action--solid[_ngcontent-%COMP%] {\r\n  background: linear-gradient(135deg, #b91c1c 0%, #e11d48 100%);\r\n  color: #fff;\r\n  box-shadow: 0 18px 34px rgba(185, 28, 28, 0.22);\r\n}\r\n\r\n.animal-action--ghost[_ngcontent-%COMP%] {\r\n  border: 1px solid rgba(220, 38, 38, 0.16);\r\n  background: #fff;\r\n  color: #9f1239;\r\n}\r\n\r\n.catalog-map-wrap[_ngcontent-%COMP%] {\r\n  display: grid;\r\n  gap: 1rem;\r\n  position: sticky;\r\n  top: 1.5rem;\r\n}\r\n\r\n.catalog-map-panel[_ngcontent-%COMP%] {\r\n  padding: 1.25rem;\r\n}\r\n\r\n.map-panel__header[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  gap: 1rem;\r\n  align-items: start;\r\n  margin-bottom: 1rem;\r\n}\r\n\r\n.map-panel__header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\r\n  font-size: 1.35rem;\r\n}\r\n\r\n.catalog-map[_ngcontent-%COMP%] {\r\n  min-height: 540px;\r\n  border-radius: 24px;\r\n  overflow: hidden;\r\n  background: linear-gradient(180deg, rgba(255, 241, 242, 0.96), rgba(255, 255, 255, 0.92));\r\n}\r\n\r\n.catalog-map--empty[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  gap: 0.5rem;\r\n  color: #881337;\r\n  text-align: center;\r\n  padding: 1rem;\r\n}\r\n\r\n.map-panel__footer[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  gap: 1rem;\r\n  flex-wrap: wrap;\r\n  margin-top: 0.9rem;\r\n  color: #881337;\r\n  font-weight: 600;\r\n}\r\n\r\n.map-focus-card[_ngcontent-%COMP%] {\r\n  display: grid;\r\n  grid-template-columns: 120px minmax(0, 1fr);\r\n  overflow: hidden;\r\n}\r\n\r\n.map-focus-card__media[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  height: 100%;\r\n  object-fit: cover;\r\n}\r\n\r\n.map-focus-card__content[_ngcontent-%COMP%] {\r\n  padding: 1rem 1.1rem;\r\n}\r\n\r\n.map-focus-card__eyebrow[_ngcontent-%COMP%] {\r\n  margin: 0;\r\n  color: #b91c1c;\r\n  font-size: 0.72rem;\r\n  font-weight: 800;\r\n  letter-spacing: 0.2em;\r\n  text-transform: uppercase;\r\n}\r\n\r\n.map-focus-card__content[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\r\n  margin: 0.45rem 0 0;\r\n  color: #611a24;\r\n}\r\n\r\n.map-focus-card__content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\r\n  margin: 0.4rem 0 0;\r\n  color: #7f1d1d;\r\n  line-height: 1.55;\r\n}\r\n\r\n.map-focus-card__actions[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  gap: 0.65rem;\r\n  flex-wrap: wrap;\r\n  margin-top: 0.9rem;\r\n}\r\n\r\n.empty-state[_ngcontent-%COMP%] {\n  border-radius: 32px;\n  padding: 3rem 1.5rem;\n  text-align: center;\n  color: #7f1d1d;\n}\n\n.empty-state--inline[_ngcontent-%COMP%] {\n  min-height: 420px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  border: 0;\n  background: transparent;\n  box-shadow: none;\n  backdrop-filter: none;\n}\n\r\n.empty-state[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\r\n  font-size: 3.4rem;\r\n  color: #f43f5e;\r\n}\r\n\r\n.empty-state[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\r\n  margin: 1rem 0 0.45rem;\r\n  color: #611a24;\r\n}\r\n\r\n.preview-backdrop[_ngcontent-%COMP%] {\r\n  position: fixed;\r\n  inset: 0;\r\n  z-index: 1200;\r\n  background: rgba(30, 10, 10, 0.58);\r\n  backdrop-filter: blur(10px);\r\n  display: grid;\r\n  place-items: center;\r\n  padding: 1rem;\r\n}\r\n\r\n.preview-modal[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  width: min(1120px, 100%);\r\n  max-height: calc(100vh - 2rem);\r\n  border-radius: 34px;\r\n  overflow: auto;\r\n  display: grid;\r\n  grid-template-columns: minmax(0, 1.08fr) minmax(340px, 0.92fr);\r\n}\r\n\r\n.preview-close[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  top: 1rem;\r\n  right: 1rem;\r\n  z-index: 4;\r\n  width: 46px;\r\n  height: 46px;\r\n  border-radius: 999px;\r\n  border: 0;\r\n  background: rgba(255, 255, 255, 0.92);\r\n  color: #9f1239;\r\n  box-shadow: 0 14px 28px rgba(127, 29, 29, 0.16);\r\n}\r\n\r\n.preview-modal__media[_ngcontent-%COMP%] {\r\n  min-height: 100%;\r\n  background: #ffe4e6;\r\n}\r\n\r\n.preview-modal__content[_ngcontent-%COMP%] {\r\n  padding: 1.5rem;\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 1rem;\r\n}\r\n\r\n.preview-topline[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n  gap: 0.6rem;\r\n}\r\n\r\n.preview-price[_ngcontent-%COMP%] {\r\n  font-size: 2rem;\r\n}\r\n\r\n.preview-carousel[_ngcontent-%COMP%], \r\n.animal-carousel[_ngcontent-%COMP%] {\r\n  height: 100%;\r\n}\r\n\r\n  .animal-carousel .p-carousel-container, \r\n  .preview-carousel .p-carousel-container, \r\n  .animal-carousel .p-carousel-content, \r\n  .preview-carousel .p-carousel-content, \r\n  .animal-carousel .p-carousel-items-container, \r\n  .preview-carousel .p-carousel-items-container, \r\n  .animal-carousel .p-carousel-item, \r\n  .preview-carousel .p-carousel-item {\r\n  height: 100%;\r\n}\r\n\r\n  .animal-carousel .p-carousel-indicators, \r\n  .preview-carousel .p-carousel-indicators {\r\n  position: absolute;\r\n  bottom: 1rem;\r\n  left: 50%;\r\n  transform: translateX(-50%);\r\n  display: flex;\r\n  gap: 0.45rem;\r\n  z-index: 3;\r\n}\r\n\r\n  .animal-carousel .p-carousel-indicator button, \r\n  .preview-carousel .p-carousel-indicator button {\r\n  width: 8px;\r\n  height: 8px;\r\n  padding: 0;\r\n  border: 0;\r\n  border-radius: 999px;\r\n  background: rgba(255, 255, 255, 0.56);\r\n}\r\n\r\n  .animal-carousel .p-carousel-indicator.p-highlight button, \r\n  .preview-carousel .p-carousel-indicator.p-highlight button {\r\n  width: 24px;\r\n  background: #fff;\r\n}\r\n\r\n  .animal-carousel .p-carousel-prev, \r\n  .animal-carousel .p-carousel-next, \r\n  .preview-carousel .p-carousel-prev, \r\n  .preview-carousel .p-carousel-next {\r\n  width: 38px;\r\n  height: 38px;\r\n  border-radius: 999px;\r\n  background: rgba(255, 255, 255, 0.9);\r\n  color: #7f1d1d;\r\n  border: 0;\r\n  box-shadow: 0 14px 28px rgba(127, 29, 29, 0.16);\r\n}\r\n\r\n  .animal-carousel .p-carousel-prev:hover, \r\n  .animal-carousel .p-carousel-next:hover, \r\n  .preview-carousel .p-carousel-prev:hover, \r\n  .preview-carousel .p-carousel-next:hover {\r\n  background: #fff1f2;\r\n  color: #b91c1c;\r\n}\r\n\r\n  .catalog-map .leaflet-control-attribution {\r\n  background: rgba(255, 255, 255, 0.88);\r\n  color: #9f1239;\r\n  border-radius: 12px 0 0 0;\r\n}\r\n\r\n  .catalog-map .leaflet-control-attribution a {\r\n  color: #9f1239;\r\n}\r\n\r\n  .catalog-map .leaflet-control-zoom {\r\n  border: 0;\r\n  box-shadow: 0 18px 30px rgba(136, 19, 55, 0.12);\r\n}\r\n\r\n  .catalog-map .leaflet-control-zoom a {\r\n  color: #611a24;\r\n  border: 0;\r\n}\r\n\r\n  .catalog-map .leaflet-container {\r\n  font-family: inherit;\r\n}\r\n\r\n@media (max-width: 1400px) {\r\n  .catalog-layout[_ngcontent-%COMP%] {\r\n    grid-template-columns: 1fr;\r\n  }\r\n\r\n  .catalog-map-wrap[_ngcontent-%COMP%] {\r\n    position: static;\r\n  }\r\n}\r\n\r\n@media (max-width: 1024px) {\r\n  .catalog-hero[_ngcontent-%COMP%] {\r\n    grid-template-columns: 1fr;\r\n  }\r\n\r\n  .catalog-toolbar[_ngcontent-%COMP%] {\r\n    grid-template-columns: 1fr 1fr;\r\n  }\r\n\r\n  .toolbar-field--wide[_ngcontent-%COMP%], \r\n   .toolbar-reset[_ngcontent-%COMP%] {\r\n    grid-column: 1 / -1;\r\n  }\r\n\r\n  .animal-card[_ngcontent-%COMP%], \r\n   .preview-modal[_ngcontent-%COMP%] {\r\n    grid-template-columns: 1fr;\r\n  }\r\n\r\n  .catalog-map[_ngcontent-%COMP%] {\r\n    min-height: 440px;\r\n  }\r\n}\r\n\r\n@media (max-width: 767px) {\r\n  .catalog-hero[_ngcontent-%COMP%], \r\n   .catalog-toolbar[_ngcontent-%COMP%], \r\n   .catalog-results[_ngcontent-%COMP%], \r\n   .catalog-map-panel[_ngcontent-%COMP%], \r\n   .map-focus-card[_ngcontent-%COMP%], \r\n   .preview-modal[_ngcontent-%COMP%], \r\n   .empty-state[_ngcontent-%COMP%] {\r\n    border-radius: 24px;\r\n  }\r\n\r\n  .catalog-hero[_ngcontent-%COMP%], \r\n   .catalog-toolbar[_ngcontent-%COMP%], \r\n   .catalog-results[_ngcontent-%COMP%], \r\n   .catalog-map-panel[_ngcontent-%COMP%], \r\n   .preview-modal__content[_ngcontent-%COMP%] {\r\n    padding: 1.1rem;\r\n  }\r\n\r\n  .results-header[_ngcontent-%COMP%], \r\n   .map-panel__header[_ngcontent-%COMP%], \r\n   .animal-footer[_ngcontent-%COMP%], \r\n   .preview-actions[_ngcontent-%COMP%], \r\n   .catalog-pagination[_ngcontent-%COMP%] {\r\n    flex-direction: column;\r\n    align-items: stretch;\r\n  }\r\n\r\n  .animal-meta[_ngcontent-%COMP%], \r\n   .preview-grid[_ngcontent-%COMP%] {\r\n    grid-template-columns: 1fr;\r\n  }\r\n\r\n  .animal-actions[_ngcontent-%COMP%], \r\n   .map-focus-card__actions[_ngcontent-%COMP%], \r\n   .catalog-pagination__controls[_ngcontent-%COMP%] {\r\n    justify-content: stretch;\r\n  }\r\n\r\n  .animal-action[_ngcontent-%COMP%], \r\n   .pagination-btn--nav[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n  }\r\n\r\n  .map-focus-card[_ngcontent-%COMP%] {\r\n    grid-template-columns: 1fr;\r\n  }\r\n\r\n  .map-focus-card__media[_ngcontent-%COMP%] {\r\n    min-height: 180px;\r\n  }\r\n\r\n  .catalog-map[_ngcontent-%COMP%] {\r\n    min-height: 360px;\r\n  }\r\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ListeAnnoncesComponent, [{
        type: Component,
        args: [{ selector: 'app-liste-annonces', standalone: false, template: "<section class=\"catalog-shell py-6 px-4 sm:py-8 lg:px-8\">\r\n  <div class=\"max-w-[1600px] mx-auto\">\r\n    <div class=\"catalog-hero mb-8\">\r\n      <div>\r\n        <p class=\"catalog-kicker\">March\u00E9 b\u00E9tail</p>\r\n        <h1>Parcourir les animaux disponibles avec une vraie lecture terrain</h1>\r\n        <p class=\"catalog-copy\">\r\n          Ce catalogue r\u00E9unit les dossiers valid\u00E9s, leur implantation sur la carte\r\n          et un aper\u00E7u rapide avant consultation compl\u00E8te.\r\n        </p>\r\n\r\n        <div class=\"hero-chips\" *ngIf=\"animalTypeChips.length\">\r\n          <button\r\n            *ngFor=\"let chip of animalTypeChips\"\r\n            type=\"button\"\r\n            class=\"hero-chip\"\r\n            [class.hero-chip--active]=\"animalType === chip.value\"\r\n            (click)=\"updateAnimalType(chip.value)\"\r\n          >\r\n            <span>{{ chip.label }}</span>\r\n            <strong>{{ chip.count }}</strong>\r\n          </button>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"hero-stats\">\r\n        <div class=\"hero-stat\">\r\n          <span class=\"hero-stat__value\">{{ filteredListings.length }}</span>\r\n          <span class=\"hero-stat__label\">dossiers publi\u00E9s</span>\r\n        </div>\r\n        <div class=\"hero-stat\">\r\n          <span class=\"hero-stat__value\">{{ mappedListings.length }}</span>\r\n          <span class=\"hero-stat__label\">rep\u00E8res cartographiques</span>\r\n        </div>\r\n        <div class=\"hero-stat\">\r\n          <span class=\"hero-stat__value\">{{ missingCoordinatesCount }}</span>\r\n          <span class=\"hero-stat__label\">dossiers sans rep\u00E8re cartographique</span>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"catalog-toolbar mb-6\">\r\n      <div class=\"toolbar-field toolbar-field--wide\">\r\n        <label for=\"location\">Zone ou recherche</label>\r\n        <input\r\n          id=\"location\"\r\n          [ngModel]=\"location\"\r\n          (ngModelChange)=\"updateLocation($event)\"\r\n          type=\"text\"\r\n          placeholder=\"Korhogo, Bouak\u00E9, N'Dama, \u00E9leveur...\"\r\n        />\r\n      </div>\r\n\r\n      <div class=\"toolbar-field\">\r\n        <label for=\"animalType\">Esp\u00E8ce</label>\r\n        <select\r\n          id=\"animalType\"\r\n          [ngModel]=\"animalType\"\r\n          (ngModelChange)=\"updateAnimalType($event)\"\r\n        >\r\n          <option *ngFor=\"let animal of animalTypes\" [value]=\"animal.value\">\r\n            {{ animal.label }}\r\n          </option>\r\n        </select>\r\n      </div>\r\n\r\n      <button type=\"button\" class=\"toolbar-reset\" (click)=\"resetFilters()\">\r\n        R\u00E9initialiser\r\n      </button>\r\n    </div>\r\n\r\n    <div class=\"catalog-layout\">\n      <div class=\"catalog-results\" #resultsPanel>\n        <ng-container *ngIf=\"filteredListings.length; else emptyState\">\n          <div class=\"results-header\">\n            <div>\n              <p class=\"results-title\">Catalogue disponible</p>\n              <p class=\"results-caption\">\n                Cliquez sur un dossier pour l\u2019ouvrir en aper\u00E7u, ou utilisez la carte pour cibler un animal.\n              </p>\n            </div>\n            <div class=\"results-badge\">\n              {{ visibleRangeStart }}-{{ visibleRangeEnd }} sur {{ filteredListings.length }}\n            </div>\n          </div>\n\n          <div class=\"animal-grid\">\n            <article\n              *ngFor=\"let listing of paginatedListings; trackBy: trackByListing\"\n              class=\"animal-card\"\n              [class.animal-card--active]=\"listing.id === activeListingId\"\n            >\n              <div class=\"animal-card__media\">\n                <p-carousel\n                  [value]=\"galleryFor(listing)\"\n                  [numVisible]=\"1\"\n                  [numScroll]=\"1\"\n                  [circular]=\"galleryFor(listing).length > 1\"\n                  [showIndicators]=\"galleryFor(listing).length > 1\"\n                  [showNavigators]=\"galleryFor(listing).length > 1\"\n                  styleClass=\"animal-carousel\"\n                >\n                  <ng-template let-image #item>\n                    <img [src]=\"image\" [alt]=\"listing.title\" class=\"animal-card__image\" />\n                  </ng-template>\n                </p-carousel>\n\n                <div class=\"animal-card__badges\">\n                  <span class=\"animal-badge animal-badge--solid\">\n                    {{ listing.animalType | titlecase }}\n                  </span>\n                  <span class=\"animal-badge\">\n                    {{ listing.status | titlecase }}\n                  </span>\n                </div>\n\n                <button\n                  *ngIf=\"hasCoordinates(listing)\"\n                  type=\"button\"\n                  class=\"map-focus-btn\"\n                  (click)=\"focusListing(listing, $event)\"\n                  title=\"Voir sur la carte\"\n                >\n                  <i class=\"pi pi-map-marker\"></i>\n                </button>\n              </div>\n\n              <div class=\"animal-card__content\">\n                <div class=\"animal-location\">\n                  <i class=\"pi pi-map-marker\"></i>\n                  <span>{{ listing.location }}</span>\n                </div>\n\n                <h2 class=\"animal-title\">{{ listing.title }}</h2>\n                <p class=\"animal-description\">\n                  {{ listing.description || \"Dossier animal valid\u00E9 et pr\u00EAt \u00E0 \u00EAtre consult\u00E9.\" }}\n                </p>\n\n                <div class=\"animal-meta\">\n                  <div class=\"animal-meta__item\">\n                    <span class=\"animal-meta__label\">Race</span>\n                    <strong>{{ listing.breed || 'Non renseign\u00E9e' }}</strong>\n                  </div>\n                  <div class=\"animal-meta__item\">\n                    <span class=\"animal-meta__label\">Quantit\u00E9</span>\n                    <strong>{{ listing.quantity }} t\u00EAte<span *ngIf=\"listing.quantity > 1\">s</span></strong>\n                  </div>\n                  <div class=\"animal-meta__item\">\n                    <span class=\"animal-meta__label\">Propri\u00E9taire</span>\n                    <strong>{{ listing.sellerName }}</strong>\n                  </div>\n                </div>\n\n                <div class=\"animal-footer\">\n                  <div class=\"animal-price\">\n                    <span class=\"animal-price__label\">Prix indicatif</span>\n                    <strong>{{ listing.price | number:'1.0-0' }} FCFA</strong>\n                  </div>\n\n                  <div class=\"animal-actions\">\n                    <button type=\"button\" class=\"animal-action animal-action--ghost\" (click)=\"openPreview(listing, $event)\">\n                      Aper\u00E7u\n                    </button>\n                    <a [routerLink]=\"['/annonces', listing.id]\" class=\"animal-action animal-action--solid\">\n                      Voir le dossier\n                    </a>\n                  </div>\n                </div>\n              </div>\n            </article>\n          </div>\n\n          <div class=\"catalog-pagination\" *ngIf=\"filteredListings.length > pageSize\">\n            <div class=\"catalog-pagination__summary\">\n              Page {{ currentPage }} sur {{ totalPages }}\n            </div>\n\n            <div class=\"catalog-pagination__controls\">\n              <button\n                type=\"button\"\n                class=\"pagination-btn pagination-btn--nav\"\n                (click)=\"goToPreviousPage()\"\n                [disabled]=\"!hasPreviousPage\"\n              >\n                Pr\u00E9c\u00E9dent\n              </button>\n\n              <ng-container *ngFor=\"let item of paginationItems\">\n                <button\n                  *ngIf=\"isPageItem(item); else paginationEllipsis\"\n                  type=\"button\"\n                  class=\"pagination-btn\"\n                  [class.pagination-btn--active]=\"item === currentPage\"\n                  (click)=\"goToPage(item)\"\n                >\n                  {{ item }}\n                </button>\n\n                <ng-template #paginationEllipsis>\n                  <span class=\"pagination-ellipsis\">\u2026</span>\n                </ng-template>\n              </ng-container>\n\n              <button\n                type=\"button\"\n                class=\"pagination-btn pagination-btn--nav\"\n                (click)=\"goToNextPage()\"\n                [disabled]=\"!hasNextPage\"\n              >\n                Suivant\n              </button>\n            </div>\n          </div>\n        </ng-container>\n      </div>\n\r\n      <aside class=\"catalog-map-wrap\">\r\n        <div class=\"catalog-map-panel\">\r\n          <div class=\"map-panel__header\">\r\n            <div>\r\n              <p class=\"map-panel__kicker\">Vue cartographique</p>\r\n              <h2>Animaux positionn\u00E9s sur la carte</h2>\r\n            </div>\r\n\r\n            <button type=\"button\" class=\"map-panel__action\" (click)=\"recenterMap()\">\r\n              Recentrer\r\n            </button>\r\n          </div>\r\n\r\n          <div *ngIf=\"!mapUnavailable; else mapFallback\" #mapHost class=\"catalog-map\"></div>\r\n\r\n          <ng-template #mapFallback>\r\n            <div class=\"catalog-map catalog-map--empty\">\r\n              <strong>Carte indisponible</strong>\r\n              <span>Le catalogue reste consultable, m\u00EAme sans fond cartographique.</span>\r\n            </div>\r\n          </ng-template>\r\n\r\n          <div class=\"map-panel__footer\">\r\n            <span>{{ mappedListings.length }} dossier<span *ngIf=\"mappedListings.length > 1\">s</span> g\u00E9olocalis\u00E9<span *ngIf=\"mappedListings.length > 1\">s</span></span>\r\n            <span *ngIf=\"missingCoordinatesCount > 0\">{{ missingCoordinatesCount }} sans coordonn\u00E9es</span>\r\n          </div>\r\n        </div>\r\n\r\n        <div *ngIf=\"highlightedListing\" class=\"map-focus-card\">\r\n          <div class=\"map-focus-card__media\">\r\n            <img\r\n              [src]=\"galleryFor(highlightedListing)[0]\"\r\n              [alt]=\"highlightedListing.title\"\r\n            />\r\n          </div>\r\n\r\n          <div class=\"map-focus-card__content\">\r\n            <p class=\"map-focus-card__eyebrow\">Rep\u00E8re s\u00E9lectionn\u00E9</p>\r\n            <h3>{{ highlightedListing.title }}</h3>\r\n            <p>{{ highlightedListing.location }} \u2022 {{ highlightedListing.price | number:'1.0-0' }} FCFA</p>\r\n            <div class=\"map-focus-card__actions\">\r\n              <button type=\"button\" class=\"animal-action animal-action--ghost\" (click)=\"openPreview(highlightedListing)\">\r\n                Aper\u00E7u\r\n              </button>\r\n              <a [routerLink]=\"['/annonces', highlightedListing.id]\" class=\"animal-action animal-action--solid\">\r\n                Fiche compl\u00E8te\r\n              </a>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </aside>\r\n    </div>\r\n  </div>\r\n</section>\n\n<ng-template #emptyState>\n  <div class=\"empty-state empty-state--inline\">\n    <i class=\"pi pi-inbox\"></i>\n    <h2>Aucun animal trouv\u00E9</h2>\n    <p>Modifiez vos crit\u00E8res de recherche pour relancer le catalogue.</p>\n  </div>\n</ng-template>\n\r\n<div class=\"preview-backdrop\" *ngIf=\"previewListing\" (click)=\"closePreview()\">\r\n  <div class=\"preview-modal\" (click)=\"$event.stopPropagation()\">\r\n    <button type=\"button\" class=\"preview-close\" (click)=\"closePreview()\" aria-label=\"Fermer\">\r\n      <i class=\"pi pi-times\"></i>\r\n    </button>\r\n\r\n    <div class=\"preview-modal__media\">\r\n      <p-carousel\r\n        [value]=\"galleryFor(previewListing)\"\r\n        [numVisible]=\"1\"\r\n        [numScroll]=\"1\"\r\n        [circular]=\"galleryFor(previewListing).length > 1\"\r\n        [showIndicators]=\"galleryFor(previewListing).length > 1\"\r\n        [showNavigators]=\"galleryFor(previewListing).length > 1\"\r\n        styleClass=\"preview-carousel\"\r\n      >\r\n        <ng-template let-image #item>\r\n          <img [src]=\"image\" [alt]=\"previewListing.title\" class=\"preview-modal__image\" />\r\n        </ng-template>\r\n      </p-carousel>\r\n    </div>\r\n\r\n    <div class=\"preview-modal__content\">\r\n      <div class=\"preview-topline\">\r\n        <span class=\"animal-badge animal-badge--solid\">{{ previewListing.animalType | titlecase }}</span>\r\n        <span class=\"animal-badge\">{{ previewListing.status | titlecase }}</span>\r\n      </div>\r\n\r\n      <h2>{{ previewListing.title }}</h2>\r\n      <p class=\"preview-location\">\r\n        <i class=\"pi pi-map-marker\"></i>\r\n        <span>{{ previewListing.location }}</span>\r\n      </p>\r\n\r\n      <div class=\"preview-price\">\r\n        {{ previewListing.price | number:'1.0-0' }} FCFA\r\n      </div>\r\n\r\n      <p class=\"preview-description\">\r\n        {{ previewListing.description || \"Dossier animal valid\u00E9 et pr\u00EAt \u00E0 \u00EAtre consult\u00E9.\" }}\r\n      </p>\r\n\r\n      <div class=\"preview-grid\">\r\n        <div class=\"preview-tile\">\r\n          <span>Race</span>\r\n          <strong>{{ previewListing.breed || 'Non renseign\u00E9e' }}</strong>\r\n        </div>\r\n        <div class=\"preview-tile\">\r\n          <span>Quantit\u00E9</span>\r\n          <strong>{{ previewListing.quantity }} t\u00EAte<span *ngIf=\"previewListing.quantity > 1\">s</span></strong>\r\n        </div>\r\n        <div class=\"preview-tile\">\r\n          <span>Propri\u00E9taire</span>\r\n          <strong>{{ previewListing.sellerName }}</strong>\r\n        </div>\r\n        <div class=\"preview-tile\">\r\n          <span>R\u00E9f\u00E9rence</span>\r\n          <strong>{{ previewListing.qrCode || 'Non renseign\u00E9e' }}</strong>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"preview-actions\">\r\n        <a [routerLink]=\"['/annonces', previewListing.id]\" class=\"animal-action animal-action--solid\" (click)=\"closePreview()\">\r\n          Ouvrir la fiche compl\u00E8te\r\n        </a>\r\n\r\n        <a\r\n          *ngIf=\"auth.isLoggedIn() && previewListing.sellerEmail\"\r\n          [href]=\"'mailto:' + previewListing.sellerEmail\"\r\n          class=\"animal-action animal-action--ghost\"\r\n        >\r\n          Contacter le vendeur\r\n        </a>\r\n\r\n        <a\r\n          *ngIf=\"canEditPreview\"\r\n          [routerLink]=\"['/animaux', previewListing.id, 'editer']\"\r\n          class=\"animal-action animal-action--ghost\"\r\n          (click)=\"closePreview()\"\r\n        >\r\n          Modifier ce dossier\r\n        </a>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [":host {\r\n  display: block;\r\n}\r\n\r\n.catalog-shell {\r\n  min-height: 100%;\r\n  background:\r\n    radial-gradient(circle at top left, rgba(239, 68, 68, 0.14), transparent 26%),\r\n    radial-gradient(circle at 85% 0%, rgba(190, 24, 93, 0.12), transparent 22%),\r\n    linear-gradient(180deg, #fff8f8 0%, #fff3f4 42%, #fffafa 100%);\r\n}\r\n\r\n.catalog-hero,\r\n.catalog-toolbar,\r\n.catalog-results,\r\n.catalog-map-panel,\r\n.map-focus-card,\r\n.empty-state,\r\n.preview-modal {\r\n  border: 1px solid rgba(190, 24, 93, 0.12);\r\n  background: rgba(255, 255, 255, 0.92);\r\n  box-shadow: 0 24px 80px rgba(136, 19, 55, 0.08);\r\n  backdrop-filter: blur(18px);\r\n}\r\n\r\n.catalog-hero {\r\n  border-radius: 36px;\r\n  padding: 2rem;\r\n  display: grid;\r\n  grid-template-columns: minmax(0, 1.4fr) minmax(290px, 0.7fr);\r\n  gap: 1.5rem;\r\n}\r\n\r\n.catalog-kicker,\r\n.map-panel__kicker,\r\n.results-title {\r\n  margin: 0 0 0.5rem;\r\n  font-size: 0.76rem;\r\n  font-weight: 800;\r\n  letter-spacing: 0.24em;\r\n  text-transform: uppercase;\r\n  color: #b91c1c;\r\n}\r\n\r\n.catalog-hero h1,\r\n.catalog-map-panel h2,\r\n.preview-modal h2 {\r\n  margin: 0;\r\n  color: #611a24;\r\n  font-family: 'Trebuchet MS', 'Segoe UI Variable', sans-serif;\r\n  font-weight: 800;\r\n  letter-spacing: -0.03em;\r\n}\r\n\r\n.catalog-hero h1 {\r\n  font-size: clamp(2rem, 3vw, 3.5rem);\r\n  line-height: 1.02;\r\n}\r\n\r\n.catalog-copy,\r\n.results-caption {\r\n  margin: 1rem 0 0;\r\n  color: #7f1d1d;\r\n  line-height: 1.7;\r\n  max-width: 64ch;\r\n}\r\n\r\n.hero-chips {\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n  gap: 0.75rem;\r\n  margin-top: 1.5rem;\r\n}\r\n\r\n.hero-chip {\r\n  border: 1px solid rgba(220, 38, 38, 0.12);\r\n  border-radius: 999px;\r\n  background: rgba(255, 255, 255, 0.88);\r\n  color: #881337;\r\n  padding: 0.75rem 1rem;\r\n  display: inline-flex;\r\n  align-items: center;\r\n  gap: 0.75rem;\r\n  font-weight: 700;\r\n}\r\n\r\n.hero-chip strong {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  min-width: 30px;\r\n  height: 30px;\r\n  border-radius: 999px;\r\n  background: #ffe4e6;\r\n  color: #b91c1c;\r\n}\r\n\r\n.hero-chip--active {\r\n  background: linear-gradient(135deg, #b91c1c 0%, #e11d48 100%);\r\n  color: #fff;\r\n  box-shadow: 0 16px 30px rgba(185, 28, 28, 0.2);\r\n}\r\n\r\n.hero-chip--active strong {\r\n  background: rgba(255, 255, 255, 0.18);\r\n  color: #fff;\r\n}\r\n\r\n.hero-stats {\r\n  display: grid;\r\n  gap: 0.9rem;\r\n}\r\n\r\n.hero-stat {\r\n  border-radius: 28px;\r\n  padding: 1.25rem;\r\n  background: linear-gradient(160deg, rgba(255, 241, 242, 0.96), rgba(255, 255, 255, 0.88));\r\n}\r\n\r\n.hero-stat__value {\r\n  display: block;\r\n  color: #9f1239;\r\n  font-size: clamp(1.8rem, 3vw, 2.6rem);\r\n  font-weight: 800;\r\n  line-height: 1;\r\n}\r\n\r\n.hero-stat__label {\r\n  display: block;\r\n  margin-top: 0.45rem;\r\n  color: #7f1d1d;\r\n  line-height: 1.5;\r\n}\r\n\r\n.catalog-toolbar {\r\n  border-radius: 30px;\r\n  padding: 1.25rem;\r\n  display: grid;\r\n  grid-template-columns: minmax(0, 1.6fr) minmax(220px, 0.8fr) auto;\r\n  gap: 1rem;\r\n  align-items: end;\r\n}\r\n\r\n.toolbar-field {\r\n  display: grid;\r\n  gap: 0.55rem;\r\n}\r\n\r\n.toolbar-field label {\r\n  color: #7f1d1d;\r\n  font-size: 0.92rem;\r\n  font-weight: 700;\r\n}\r\n\r\n.toolbar-field input,\r\n.toolbar-field select {\r\n  width: 100%;\r\n  border: 1px solid rgba(190, 24, 93, 0.14);\r\n  border-radius: 18px;\r\n  padding: 0.95rem 1rem;\r\n  background: rgba(255, 255, 255, 0.96);\r\n  color: #4c0519;\r\n  outline: none;\r\n}\r\n\r\n.toolbar-field input:focus,\r\n.toolbar-field select:focus {\r\n  border-color: #dc2626;\r\n  box-shadow: 0 0 0 4px rgba(220, 38, 38, 0.12);\r\n}\r\n\r\n.toolbar-reset,\r\n.map-panel__action {\r\n  border: 1px solid rgba(190, 24, 93, 0.14);\r\n  border-radius: 18px;\r\n  background: #fff;\r\n  color: #991b1b;\r\n  font-weight: 700;\r\n  padding: 0.95rem 1.2rem;\r\n  transition: all 160ms ease;\r\n}\r\n\r\n.toolbar-reset:hover,\r\n.map-panel__action:hover {\r\n  border-color: #ef4444;\r\n  background: #fff1f2;\r\n}\r\n\r\n.catalog-layout {\r\n  display: grid;\r\n  grid-template-columns: minmax(0, 1.08fr) minmax(360px, 0.92fr);\r\n  gap: 1.5rem;\r\n  align-items: start;\r\n}\r\n\r\n.catalog-results,\r\n.catalog-map-panel,\r\n.map-focus-card {\r\n  border-radius: 32px;\r\n}\r\n\r\n.catalog-results {\r\n  padding: 1.35rem;\r\n}\r\n\r\n.results-header {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: start;\r\n  gap: 1rem;\r\n  margin-bottom: 1.25rem;\r\n}\r\n\r\n.results-title {\r\n  color: #be123c;\r\n}\r\n\r\n.results-badge {\r\n  border-radius: 999px;\r\n  padding: 0.75rem 1rem;\r\n  background: #fff1f2;\r\n  color: #9f1239;\r\n  font-weight: 700;\r\n  white-space: nowrap;\r\n}\r\n\r\n.animal-grid {\r\n  display: grid;\r\n  gap: 1.15rem;\r\n}\r\n\r\n.catalog-pagination {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  gap: 1rem;\r\n  flex-wrap: wrap;\r\n  margin-top: 1.4rem;\r\n  padding-top: 1.1rem;\r\n  border-top: 1px solid rgba(220, 38, 38, 0.1);\r\n}\r\n\r\n.catalog-pagination__summary {\r\n  color: #881337;\r\n  font-weight: 700;\r\n}\r\n\r\n.catalog-pagination__controls {\r\n  display: flex;\r\n  align-items: center;\r\n  flex-wrap: wrap;\r\n  justify-content: flex-end;\r\n  gap: 0.55rem;\r\n}\r\n\r\n.pagination-btn {\r\n  min-width: 44px;\r\n  height: 44px;\r\n  border: 1px solid rgba(190, 24, 93, 0.14);\r\n  border-radius: 14px;\r\n  padding: 0 0.95rem;\r\n  background: #fff;\r\n  color: #881337;\r\n  font-weight: 800;\r\n  transition: all 160ms ease;\r\n}\r\n\r\n.pagination-btn:hover:not(:disabled) {\r\n  transform: translateY(-1px);\r\n  border-color: rgba(220, 38, 38, 0.28);\r\n  background: #fff1f2;\r\n}\r\n\r\n.pagination-btn:disabled {\r\n  opacity: 0.46;\r\n  cursor: not-allowed;\r\n}\r\n\r\n.pagination-btn--active {\r\n  border-color: transparent;\r\n  background: linear-gradient(135deg, #b91c1c 0%, #e11d48 100%);\r\n  color: #fff;\r\n  box-shadow: 0 16px 28px rgba(185, 28, 28, 0.2);\r\n}\r\n\r\n.pagination-btn--nav {\r\n  min-width: 110px;\r\n}\r\n\r\n.pagination-ellipsis {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  min-width: 28px;\r\n  color: #9f1239;\r\n  font-weight: 800;\r\n}\r\n\r\n.animal-card {\r\n  display: grid;\r\n  grid-template-columns: minmax(280px, 0.96fr) minmax(0, 1.04fr);\r\n  border-radius: 28px;\r\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(255, 248, 248, 0.96));\r\n  border: 1px solid rgba(220, 38, 38, 0.08);\r\n  overflow: hidden;\r\n  transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;\r\n}\r\n\r\n.animal-card:hover,\r\n.animal-card--active {\r\n  transform: translateY(-2px);\r\n  border-color: rgba(220, 38, 38, 0.2);\r\n  box-shadow: 0 22px 50px rgba(127, 29, 29, 0.12);\r\n}\r\n\r\n.animal-card__media {\r\n  position: relative;\r\n  min-height: 100%;\r\n  background: #fee2e2;\r\n}\r\n\r\n.animal-card__image,\r\n.preview-modal__image {\r\n  width: 100%;\r\n  height: 100%;\r\n  object-fit: cover;\r\n}\r\n\r\n.animal-card__badges {\r\n  position: absolute;\r\n  top: 1rem;\r\n  left: 1rem;\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 0.5rem;\r\n  z-index: 2;\r\n}\r\n\r\n.animal-badge {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  border-radius: 999px;\r\n  padding: 0.5rem 0.9rem;\r\n  background: rgba(255, 255, 255, 0.88);\r\n  color: #7f1d1d;\r\n  font-size: 0.78rem;\r\n  font-weight: 800;\r\n  letter-spacing: 0.04em;\r\n  box-shadow: 0 12px 24px rgba(127, 29, 29, 0.12);\r\n}\r\n\r\n.animal-badge--solid {\r\n  background: linear-gradient(135deg, #b91c1c 0%, #e11d48 100%);\r\n  color: #fff;\r\n}\r\n\r\n.map-focus-btn {\r\n  position: absolute;\r\n  right: 1rem;\r\n  top: 1rem;\r\n  width: 44px;\r\n  height: 44px;\r\n  border-radius: 999px;\r\n  border: 0;\r\n  background: rgba(255, 255, 255, 0.92);\r\n  color: #b91c1c;\r\n  display: inline-flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  box-shadow: 0 14px 28px rgba(127, 29, 29, 0.16);\r\n  transition: transform 160ms ease, background 160ms ease;\r\n}\r\n\r\n.map-focus-btn:hover {\r\n  transform: scale(1.06);\r\n  background: #fff1f2;\r\n}\r\n\r\n.animal-card__content {\r\n  padding: 1.35rem;\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 1rem;\r\n}\r\n\r\n.animal-location,\r\n.preview-location {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 0.55rem;\r\n  color: #881337;\r\n  font-size: 0.95rem;\r\n}\r\n\r\n.animal-title {\r\n  margin: 0;\r\n  color: #611a24;\r\n  font-size: 1.45rem;\r\n  line-height: 1.15;\r\n}\r\n\r\n.animal-description,\r\n.preview-description {\r\n  margin: 0;\r\n  color: #6b1b26;\r\n  line-height: 1.65;\r\n}\r\n\r\n.animal-description {\r\n  display: -webkit-box;\r\n  -webkit-box-orient: vertical;\r\n  -webkit-line-clamp: 3;\r\n  overflow: hidden;\r\n}\r\n\r\n.animal-meta,\r\n.preview-grid {\r\n  display: grid;\r\n  grid-template-columns: repeat(3, minmax(0, 1fr));\r\n  gap: 0.75rem;\r\n}\r\n\r\n.preview-grid {\r\n  grid-template-columns: repeat(2, minmax(0, 1fr));\r\n}\r\n\r\n.animal-meta__item,\r\n.preview-tile {\r\n  border-radius: 20px;\r\n  padding: 0.95rem 1rem;\r\n  background: rgba(255, 241, 242, 0.86);\r\n}\r\n\r\n.animal-meta__label,\r\n.preview-tile span {\r\n  display: block;\r\n  color: #9f1239;\r\n  font-size: 0.78rem;\r\n  font-weight: 700;\r\n  text-transform: uppercase;\r\n  letter-spacing: 0.08em;\r\n}\r\n\r\n.animal-meta__item strong,\r\n.preview-tile strong {\r\n  display: block;\r\n  margin-top: 0.4rem;\r\n  color: #611a24;\r\n  line-height: 1.45;\r\n}\r\n\r\n.animal-footer,\r\n.preview-actions {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  gap: 1rem;\r\n  margin-top: auto;\r\n}\r\n\r\n.animal-price__label {\r\n  display: block;\r\n  color: #9f1239;\r\n  font-size: 0.78rem;\r\n  font-weight: 700;\r\n  text-transform: uppercase;\r\n  letter-spacing: 0.08em;\r\n}\r\n\r\n.animal-price strong,\r\n.preview-price {\r\n  display: block;\r\n  margin-top: 0.3rem;\r\n  font-size: 1.65rem;\r\n  font-weight: 800;\r\n  color: #b91c1c;\r\n}\r\n\r\n.animal-actions {\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n  justify-content: flex-end;\r\n  gap: 0.75rem;\r\n}\r\n\r\n.animal-action {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  min-height: 48px;\r\n  padding: 0.85rem 1.15rem;\r\n  border-radius: 16px;\r\n  font-weight: 800;\r\n  transition: transform 160ms ease, box-shadow 160ms ease, background 160ms ease;\r\n}\r\n\r\n.animal-action:hover {\r\n  transform: translateY(-1px);\r\n}\r\n\r\n.animal-action--solid {\r\n  background: linear-gradient(135deg, #b91c1c 0%, #e11d48 100%);\r\n  color: #fff;\r\n  box-shadow: 0 18px 34px rgba(185, 28, 28, 0.22);\r\n}\r\n\r\n.animal-action--ghost {\r\n  border: 1px solid rgba(220, 38, 38, 0.16);\r\n  background: #fff;\r\n  color: #9f1239;\r\n}\r\n\r\n.catalog-map-wrap {\r\n  display: grid;\r\n  gap: 1rem;\r\n  position: sticky;\r\n  top: 1.5rem;\r\n}\r\n\r\n.catalog-map-panel {\r\n  padding: 1.25rem;\r\n}\r\n\r\n.map-panel__header {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  gap: 1rem;\r\n  align-items: start;\r\n  margin-bottom: 1rem;\r\n}\r\n\r\n.map-panel__header h2 {\r\n  font-size: 1.35rem;\r\n}\r\n\r\n.catalog-map {\r\n  min-height: 540px;\r\n  border-radius: 24px;\r\n  overflow: hidden;\r\n  background: linear-gradient(180deg, rgba(255, 241, 242, 0.96), rgba(255, 255, 255, 0.92));\r\n}\r\n\r\n.catalog-map--empty {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  gap: 0.5rem;\r\n  color: #881337;\r\n  text-align: center;\r\n  padding: 1rem;\r\n}\r\n\r\n.map-panel__footer {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  gap: 1rem;\r\n  flex-wrap: wrap;\r\n  margin-top: 0.9rem;\r\n  color: #881337;\r\n  font-weight: 600;\r\n}\r\n\r\n.map-focus-card {\r\n  display: grid;\r\n  grid-template-columns: 120px minmax(0, 1fr);\r\n  overflow: hidden;\r\n}\r\n\r\n.map-focus-card__media img {\r\n  width: 100%;\r\n  height: 100%;\r\n  object-fit: cover;\r\n}\r\n\r\n.map-focus-card__content {\r\n  padding: 1rem 1.1rem;\r\n}\r\n\r\n.map-focus-card__eyebrow {\r\n  margin: 0;\r\n  color: #b91c1c;\r\n  font-size: 0.72rem;\r\n  font-weight: 800;\r\n  letter-spacing: 0.2em;\r\n  text-transform: uppercase;\r\n}\r\n\r\n.map-focus-card__content h3 {\r\n  margin: 0.45rem 0 0;\r\n  color: #611a24;\r\n}\r\n\r\n.map-focus-card__content p {\r\n  margin: 0.4rem 0 0;\r\n  color: #7f1d1d;\r\n  line-height: 1.55;\r\n}\r\n\r\n.map-focus-card__actions {\r\n  display: flex;\r\n  gap: 0.65rem;\r\n  flex-wrap: wrap;\r\n  margin-top: 0.9rem;\r\n}\r\n\r\n.empty-state {\n  border-radius: 32px;\n  padding: 3rem 1.5rem;\n  text-align: center;\n  color: #7f1d1d;\n}\n\n.empty-state--inline {\n  min-height: 420px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  border: 0;\n  background: transparent;\n  box-shadow: none;\n  backdrop-filter: none;\n}\n\r\n.empty-state i {\r\n  font-size: 3.4rem;\r\n  color: #f43f5e;\r\n}\r\n\r\n.empty-state h2 {\r\n  margin: 1rem 0 0.45rem;\r\n  color: #611a24;\r\n}\r\n\r\n.preview-backdrop {\r\n  position: fixed;\r\n  inset: 0;\r\n  z-index: 1200;\r\n  background: rgba(30, 10, 10, 0.58);\r\n  backdrop-filter: blur(10px);\r\n  display: grid;\r\n  place-items: center;\r\n  padding: 1rem;\r\n}\r\n\r\n.preview-modal {\r\n  position: relative;\r\n  width: min(1120px, 100%);\r\n  max-height: calc(100vh - 2rem);\r\n  border-radius: 34px;\r\n  overflow: auto;\r\n  display: grid;\r\n  grid-template-columns: minmax(0, 1.08fr) minmax(340px, 0.92fr);\r\n}\r\n\r\n.preview-close {\r\n  position: absolute;\r\n  top: 1rem;\r\n  right: 1rem;\r\n  z-index: 4;\r\n  width: 46px;\r\n  height: 46px;\r\n  border-radius: 999px;\r\n  border: 0;\r\n  background: rgba(255, 255, 255, 0.92);\r\n  color: #9f1239;\r\n  box-shadow: 0 14px 28px rgba(127, 29, 29, 0.16);\r\n}\r\n\r\n.preview-modal__media {\r\n  min-height: 100%;\r\n  background: #ffe4e6;\r\n}\r\n\r\n.preview-modal__content {\r\n  padding: 1.5rem;\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 1rem;\r\n}\r\n\r\n.preview-topline {\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n  gap: 0.6rem;\r\n}\r\n\r\n.preview-price {\r\n  font-size: 2rem;\r\n}\r\n\r\n.preview-carousel,\r\n.animal-carousel {\r\n  height: 100%;\r\n}\r\n\r\n::ng-deep .animal-carousel .p-carousel-container,\r\n::ng-deep .preview-carousel .p-carousel-container,\r\n::ng-deep .animal-carousel .p-carousel-content,\r\n::ng-deep .preview-carousel .p-carousel-content,\r\n::ng-deep .animal-carousel .p-carousel-items-container,\r\n::ng-deep .preview-carousel .p-carousel-items-container,\r\n::ng-deep .animal-carousel .p-carousel-item,\r\n::ng-deep .preview-carousel .p-carousel-item {\r\n  height: 100%;\r\n}\r\n\r\n::ng-deep .animal-carousel .p-carousel-indicators,\r\n::ng-deep .preview-carousel .p-carousel-indicators {\r\n  position: absolute;\r\n  bottom: 1rem;\r\n  left: 50%;\r\n  transform: translateX(-50%);\r\n  display: flex;\r\n  gap: 0.45rem;\r\n  z-index: 3;\r\n}\r\n\r\n::ng-deep .animal-carousel .p-carousel-indicator button,\r\n::ng-deep .preview-carousel .p-carousel-indicator button {\r\n  width: 8px;\r\n  height: 8px;\r\n  padding: 0;\r\n  border: 0;\r\n  border-radius: 999px;\r\n  background: rgba(255, 255, 255, 0.56);\r\n}\r\n\r\n::ng-deep .animal-carousel .p-carousel-indicator.p-highlight button,\r\n::ng-deep .preview-carousel .p-carousel-indicator.p-highlight button {\r\n  width: 24px;\r\n  background: #fff;\r\n}\r\n\r\n::ng-deep .animal-carousel .p-carousel-prev,\r\n::ng-deep .animal-carousel .p-carousel-next,\r\n::ng-deep .preview-carousel .p-carousel-prev,\r\n::ng-deep .preview-carousel .p-carousel-next {\r\n  width: 38px;\r\n  height: 38px;\r\n  border-radius: 999px;\r\n  background: rgba(255, 255, 255, 0.9);\r\n  color: #7f1d1d;\r\n  border: 0;\r\n  box-shadow: 0 14px 28px rgba(127, 29, 29, 0.16);\r\n}\r\n\r\n::ng-deep .animal-carousel .p-carousel-prev:hover,\r\n::ng-deep .animal-carousel .p-carousel-next:hover,\r\n::ng-deep .preview-carousel .p-carousel-prev:hover,\r\n::ng-deep .preview-carousel .p-carousel-next:hover {\r\n  background: #fff1f2;\r\n  color: #b91c1c;\r\n}\r\n\r\n::ng-deep .catalog-map .leaflet-control-attribution {\r\n  background: rgba(255, 255, 255, 0.88);\r\n  color: #9f1239;\r\n  border-radius: 12px 0 0 0;\r\n}\r\n\r\n::ng-deep .catalog-map .leaflet-control-attribution a {\r\n  color: #9f1239;\r\n}\r\n\r\n::ng-deep .catalog-map .leaflet-control-zoom {\r\n  border: 0;\r\n  box-shadow: 0 18px 30px rgba(136, 19, 55, 0.12);\r\n}\r\n\r\n::ng-deep .catalog-map .leaflet-control-zoom a {\r\n  color: #611a24;\r\n  border: 0;\r\n}\r\n\r\n::ng-deep .catalog-map .leaflet-container {\r\n  font-family: inherit;\r\n}\r\n\r\n@media (max-width: 1400px) {\r\n  .catalog-layout {\r\n    grid-template-columns: 1fr;\r\n  }\r\n\r\n  .catalog-map-wrap {\r\n    position: static;\r\n  }\r\n}\r\n\r\n@media (max-width: 1024px) {\r\n  .catalog-hero {\r\n    grid-template-columns: 1fr;\r\n  }\r\n\r\n  .catalog-toolbar {\r\n    grid-template-columns: 1fr 1fr;\r\n  }\r\n\r\n  .toolbar-field--wide,\r\n  .toolbar-reset {\r\n    grid-column: 1 / -1;\r\n  }\r\n\r\n  .animal-card,\r\n  .preview-modal {\r\n    grid-template-columns: 1fr;\r\n  }\r\n\r\n  .catalog-map {\r\n    min-height: 440px;\r\n  }\r\n}\r\n\r\n@media (max-width: 767px) {\r\n  .catalog-hero,\r\n  .catalog-toolbar,\r\n  .catalog-results,\r\n  .catalog-map-panel,\r\n  .map-focus-card,\r\n  .preview-modal,\r\n  .empty-state {\r\n    border-radius: 24px;\r\n  }\r\n\r\n  .catalog-hero,\r\n  .catalog-toolbar,\r\n  .catalog-results,\r\n  .catalog-map-panel,\r\n  .preview-modal__content {\r\n    padding: 1.1rem;\r\n  }\r\n\r\n  .results-header,\r\n  .map-panel__header,\r\n  .animal-footer,\r\n  .preview-actions,\r\n  .catalog-pagination {\r\n    flex-direction: column;\r\n    align-items: stretch;\r\n  }\r\n\r\n  .animal-meta,\r\n  .preview-grid {\r\n    grid-template-columns: 1fr;\r\n  }\r\n\r\n  .animal-actions,\r\n  .map-focus-card__actions,\r\n  .catalog-pagination__controls {\r\n    justify-content: stretch;\r\n  }\r\n\r\n  .animal-action,\r\n  .pagination-btn--nav {\r\n    width: 100%;\r\n  }\r\n\r\n  .map-focus-card {\r\n    grid-template-columns: 1fr;\r\n  }\r\n\r\n  .map-focus-card__media {\r\n    min-height: 180px;\r\n  }\r\n\r\n  .catalog-map {\r\n    min-height: 360px;\r\n  }\r\n}\r\n"] }]
    }], () => [{ type: i1.ListingService }, { type: i2.MarketplaceUiService }, { type: i3.AuthService }, { type: i0.NgZone }, { type: Document, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }], { resultsPanel: [{
            type: ViewChild,
            args: ['resultsPanel']
        }], mapHostRef: [{
            type: ViewChild,
            args: ['mapHost']
        }], onEscape: [{
            type: HostListener,
            args: ['document:keydown.escape']
        }], onWindowResize: [{
            type: HostListener,
            args: ['window:resize']
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ListeAnnoncesComponent, { className: "ListeAnnoncesComponent", filePath: "src/app/features/annonces/liste-annonces/liste-annonces.component.ts", lineNumber: 25 }); })();
//# sourceMappingURL=liste-annonces.component.js.map