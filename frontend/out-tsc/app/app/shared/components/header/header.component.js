import { Component, HostListener } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/auth.service";
import * as i2 from "@angular/router";
import * as i3 from "../../../core/services/marketplace-ui.service";
import * as i4 from "../../../core/services/toast.service";
import * as i5 from "@angular/common";
function HeaderComponent_div_7_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 36)(1, "a", 37);
    i0.ɵɵlistener("click", function HeaderComponent_div_7_Template_a_click_1_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeMenu()); });
    i0.ɵɵelement(2, "img", 38);
    i0.ɵɵelementStart(3, "span", 39);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", ctx_r1.isPageActive(item_r3.key) ? "text-red-600" : "text-gray-500");
    i0.ɵɵadvance();
    i0.ɵɵproperty("routerLink", item_r3.route);
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", item_r3.icon, i0.ɵɵsanitizeUrl)("alt", item_r3.mobileLabel);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r3.mobileLabel);
} }
function HeaderComponent_a_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 40);
    i0.ɵɵelement(1, "img", 41);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("routerLink", item_r4.route)("ngClass", ctx_r1.isPageActive(item_r4.key) ? "bg-red-50 text-red-600" : "text-gray-700 hover:bg-gray-100");
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", item_r4.icon, i0.ɵɵsanitizeUrl)("alt", item_r4.desktopLabel);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r4.desktopLabel);
} }
function HeaderComponent_div_20_ng_container_18_p_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 69);
    i0.ɵɵtext(1, " Demandez l'acc\u00E8s vendeur pour publier vos animaux et ouvrir votre espace de vente. ");
    i0.ɵɵelementEnd();
} }
function HeaderComponent_div_20_ng_container_18_p_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 69);
    i0.ɵɵtext(1, " Votre demande a \u00E9t\u00E9 envoy\u00E9e. Un administrateur doit maintenant la valider. ");
    i0.ɵɵelementEnd();
} }
function HeaderComponent_div_20_ng_container_18_p_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 69);
    i0.ɵɵtext(1, " Votre compte dispose d\u00E9j\u00E0 de l'acc\u00E8s vendeur. ");
    i0.ɵɵelementEnd();
} }
function HeaderComponent_div_20_ng_container_18_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 70);
    i0.ɵɵlistener("click", function HeaderComponent_div_20_ng_container_18_button_4_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.openSellerRequestModal()); });
    i0.ɵɵtext(1, " Faire ma demande ");
    i0.ɵɵelementEnd();
} }
function HeaderComponent_div_20_ng_container_18_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 71);
    i0.ɵɵtext(1, " Demande en attente ");
    i0.ɵɵelementEnd();
} }
function HeaderComponent_div_20_ng_container_18_span_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 72);
    i0.ɵɵtext(1, " Acc\u00E8s vendeur actif ");
    i0.ɵɵelementEnd();
} }
function HeaderComponent_div_20_ng_container_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, HeaderComponent_div_20_ng_container_18_p_1_Template, 2, 0, "p", 65)(2, HeaderComponent_div_20_ng_container_18_p_2_Template, 2, 0, "p", 65)(3, HeaderComponent_div_20_ng_container_18_p_3_Template, 2, 0, "p", 65)(4, HeaderComponent_div_20_ng_container_18_button_4_Template, 2, 0, "button", 66)(5, HeaderComponent_div_20_ng_container_18_span_5_Template, 2, 0, "span", 67)(6, HeaderComponent_div_20_ng_container_18_span_6_Template, 2, 0, "span", 68);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.canAccessSellerArea && !ctx_r1.sellerRequestPending);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.sellerRequestPending);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.canAccessSellerArea);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.canAccessSellerArea && !ctx_r1.sellerRequestPending);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.sellerRequestPending);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.canAccessSellerArea);
} }
function HeaderComponent_div_20_ng_template_19_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "p", 69);
    i0.ɵɵtext(1, " Connectez-vous pour envoyer votre demande et faire valider votre passage vendeur. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "a", 73);
    i0.ɵɵlistener("click", function HeaderComponent_div_20_ng_template_19_Template_a_click_2_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.closeMenu()); });
    i0.ɵɵtext(3, " Se connecter ");
    i0.ɵɵelementEnd();
} }
function HeaderComponent_div_20_ng_container_38_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 74)(2, "a", 75);
    i0.ɵɵlistener("click", function HeaderComponent_div_20_ng_container_38_Template_a_click_2_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.closeMenu()); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(3, "svg", 76);
    i0.ɵɵelement(4, "path", 77);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(5, " Connexion ");
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(6, "a", 78);
    i0.ɵɵlistener("click", function HeaderComponent_div_20_ng_container_38_Template_a_click_6_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.closeMenu()); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(7, "svg", 76);
    i0.ɵɵelement(8, "path", 79);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(9, " Inscription ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} }
function HeaderComponent_div_20_ng_template_39_a_13_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 95);
    i0.ɵɵlistener("click", function HeaderComponent_div_20_ng_template_39_a_13_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.closeMenu()); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 76);
    i0.ɵɵelement(2, "path", 96);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3, " Mes animaux ");
    i0.ɵɵelementEnd();
} }
function HeaderComponent_div_20_ng_template_39_a_14_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 97);
    i0.ɵɵlistener("click", function HeaderComponent_div_20_ng_template_39_a_14_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.closeMenu()); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 76);
    i0.ɵɵelement(2, "path", 98);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3, " Enregistrer un animal ");
    i0.ɵɵelementEnd();
} }
function HeaderComponent_div_20_ng_template_39_button_15_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 99);
    i0.ɵɵlistener("click", function HeaderComponent_div_20_ng_template_39_button_15_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r11); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.openSellerRequestModal()); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 76);
    i0.ɵɵelement(2, "path", 100);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3, " Demander l'acc\u00E8s vendeur ");
    i0.ɵɵelementEnd();
} }
function HeaderComponent_div_20_ng_template_39_div_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 101);
    i0.ɵɵtext(1, " Demande vendeur en attente de validation. ");
    i0.ɵɵelementEnd();
} }
function HeaderComponent_div_20_ng_template_39_a_17_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 102);
    i0.ɵɵlistener("click", function HeaderComponent_div_20_ng_template_39_a_17_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r12); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.closeMenu()); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 76);
    i0.ɵɵelement(2, "path", 103);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3, " Validation sanitaire ");
    i0.ɵɵelementEnd();
} }
function HeaderComponent_div_20_ng_template_39_a_18_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 104);
    i0.ɵɵlistener("click", function HeaderComponent_div_20_ng_template_39_a_18_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r13); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.closeMenu()); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 76);
    i0.ɵɵelement(2, "path", 105);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3, " Administration ");
    i0.ɵɵelementEnd();
} }
function HeaderComponent_div_20_ng_template_39_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 74)(1, "div", 80)(2, "div", 81);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 82)(5, "p", 83);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 84);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(9, "a", 85);
    i0.ɵɵlistener("click", function HeaderComponent_div_20_ng_template_39_Template_a_click_9_listener() { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.closeMenu()); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(10, "svg", 76);
    i0.ɵɵelement(11, "path", 86);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(12, " Mon Dashboard ");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(13, HeaderComponent_div_20_ng_template_39_a_13_Template, 4, 0, "a", 87)(14, HeaderComponent_div_20_ng_template_39_a_14_Template, 4, 0, "a", 88)(15, HeaderComponent_div_20_ng_template_39_button_15_Template, 4, 0, "button", 89)(16, HeaderComponent_div_20_ng_template_39_div_16_Template, 2, 0, "div", 90)(17, HeaderComponent_div_20_ng_template_39_a_17_Template, 4, 0, "a", 91)(18, HeaderComponent_div_20_ng_template_39_a_18_Template, 4, 0, "a", 92);
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(19, "button", 93);
    i0.ɵɵlistener("click", function HeaderComponent_div_20_ng_template_39_Template_button_click_19_listener() { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.logout()); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(20, "svg", 76);
    i0.ɵɵelement(21, "path", 94);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(22, " D\u00E9connexion ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.currentUserInitial, " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.currentUser == null ? null : ctx_r1.currentUser.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.currentUser == null ? null : ctx_r1.currentUser.email);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngIf", ctx_r1.canAccessSellerArea);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.canAccessSellerArea);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.canAccessSellerArea && !ctx_r1.sellerRequestPending);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.sellerRequestPending);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.auth.canAccessHealthValidation);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.canAccessAdminArea);
} }
function HeaderComponent_div_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 42)(1, "div", 43)(2, "div", 44);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(3, "svg", 45);
    i0.ɵɵelement(4, "path", 46);
    i0.ɵɵelementEnd()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(5, "div", 47)(6, "h2", 48);
    i0.ɵɵtext(7, "Centre d'aide");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p", 49);
    i0.ɵɵtext(9, "Besoin d'assistance ?");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(10, "div", 50)(11, "div", 51)(12, "div", 52);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(13, "svg", 53);
    i0.ɵɵelement(14, "path", 54);
    i0.ɵɵelementEnd()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(15, "div", 47)(16, "h3", 55);
    i0.ɵɵtext(17, "Devenir vendeur");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(18, HeaderComponent_div_20_ng_container_18_Template, 7, 6, "ng-container", 56)(19, HeaderComponent_div_20_ng_template_19_Template, 4, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(21, "div", 57)(22, "a", 58);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(23, "svg", 59);
    i0.ɵɵelement(24, "path", 60);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(25, "span", 61);
    i0.ɵɵtext(26, "Parrainez un vendeur");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(27, "a", 58);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(28, "svg", 59);
    i0.ɵɵelement(29, "path", 62);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(30, "span", 61);
    i0.ɵɵtext(31, "Trouver un co-vendeur");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(32, "a", 58);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(33, "svg", 59);
    i0.ɵɵelement(34, "path", 63);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(35, "span", 61);
    i0.ɵɵtext(36, "Cartes cadeaux");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(37, "div", 64);
    i0.ɵɵtemplate(38, HeaderComponent_div_20_ng_container_38_Template, 10, 0, "ng-container", 56)(39, HeaderComponent_div_20_ng_template_39_Template, 23, 9, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const guestSellerCard_r14 = i0.ɵɵreference(20);
    const authenticatedMenu_r15 = i0.ɵɵreference(40);
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(18);
    i0.ɵɵproperty("ngIf", ctx_r1.currentUser)("ngIfElse", guestSellerCard_r14);
    i0.ɵɵadvance(20);
    i0.ɵɵproperty("ngIf", !ctx_r1.currentUser)("ngIfElse", authenticatedMenu_r15);
} }
function HeaderComponent_button_41_Template(rf, ctx) { if (rf & 1) {
    const _r16 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 106);
    i0.ɵɵlistener("click", function HeaderComponent_button_41_Template_button_click_0_listener() { const filter_r17 = i0.ɵɵrestoreView(_r16).$implicit; const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.setAnimalFilter(filter_r17.value)); });
    i0.ɵɵelementStart(1, "div", 107);
    i0.ɵɵelement(2, "img", 108);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 109);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const filter_r17 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", ctx_r1.animalFilter === filter_r17.value ? "border-red-500 bg-red-50" : "border-gray-200 bg-white group-hover:border-red-500");
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", filter_r17.icon, i0.ɵɵsanitizeUrl)("alt", filter_r17.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(filter_r17.label);
} }
function HeaderComponent_div_42_Template(rf, ctx) { if (rf & 1) {
    const _r18 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 110);
    i0.ɵɵlistener("click", function HeaderComponent_div_42_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r18); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeSellerRequestModal()); });
    i0.ɵɵelementStart(1, "div", 111);
    i0.ɵɵlistener("click", function HeaderComponent_div_42_Template_div_click_1_listener($event) { return $event.stopPropagation(); });
    i0.ɵɵelementStart(2, "div", 112);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(3, "svg", 113);
    i0.ɵɵelement(4, "path", 100);
    i0.ɵɵelementEnd()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(5, "h2", 114);
    i0.ɵɵtext(6, "Envoyer une demande vendeur");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 115);
    i0.ɵɵtext(8, " Vous \u00EAtes sur le point de demander l'acc\u00E8s vendeur. Votre demande sera transmise \u00E0 l'administration pour validation avant le passage de votre compte au r\u00F4le ");
    i0.ɵɵelementStart(9, "strong");
    i0.ɵɵtext(10, "VENDEUR");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(11, ". ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 116)(13, "p");
    i0.ɵɵtext(14, "Une fois valid\u00E9, vous pourrez cr\u00E9er vos annonces et enregistrer vos animaux.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "p");
    i0.ɵɵtext(16, "Les pages vendeur resteront prot\u00E9g\u00E9es tant que la demande n'est pas approuv\u00E9e.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "div", 117)(18, "button", 118);
    i0.ɵɵlistener("click", function HeaderComponent_div_42_Template_button_click_18_listener() { i0.ɵɵrestoreView(_r18); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeSellerRequestModal()); });
    i0.ɵɵtext(19, " Annuler ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "button", 119);
    i0.ɵɵlistener("click", function HeaderComponent_div_42_Template_button_click_20_listener() { i0.ɵɵrestoreView(_r18); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.submitSellerRequest()); });
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(20);
    i0.ɵɵproperty("disabled", ctx_r1.sellerRequestSubmitting);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.sellerRequestSubmitting ? "Envoi..." : "Confirmer la demande", " ");
} }
export class HeaderComponent {
    constructor(auth, router, elementRef, uiState, toast) {
        this.auth = auth;
        this.router = router;
        this.elementRef = elementRef;
        this.uiState = uiState;
        this.toast = toast;
        this.currentUser = null;
        this.currentUrl = '/';
        this.menuOpen = false;
        this.sellerRequestModalOpen = false;
        this.sellerRequestSubmitting = false;
        this.animalFilter = '';
        this.searchTerm = '';
        this.subscriptions = new Subscription();
        this.navItems = [
            {
                key: 'homes',
                route: '/',
                desktopLabel: 'Accueil',
                mobileLabel: 'Accueil',
                icon: 'assets/images/home.png',
            },
            {
                key: 'experiences',
                route: '/experiences',
                desktopLabel: 'Annonces',
                mobileLabel: 'Exp\u00E9riences',
                icon: 'assets/images/light-bulb.png',
            },
            {
                key: 'services',
                route: '/services',
                desktopLabel: 'Services',
                mobileLabel: 'Services',
                icon: 'assets/images/bell.png',
            },
        ];
        this.animalFilters = [
            { value: '', label: 'Tout', icon: 'assets/images/infinity.png' },
            { value: 'BOVIN', label: 'Bovins', icon: 'assets/images/cow.png' },
            { value: 'OVIN', label: 'Ovins', icon: 'assets/images/sheep.png' },
            { value: 'CAPRIN', label: 'Caprins', icon: 'assets/images/sheep.png' },
            { value: 'PORCIN', label: 'Porcins', icon: 'assets/images/pig.png' },
            { value: 'AUTRE', label: 'Autres', icon: 'assets/images/infinity.png' },
        ];
    }
    ngOnInit() {
        this.currentUrl = this.router.url;
        this.subscriptions.add(this.auth.currentUser$.subscribe((user) => {
            this.currentUser = user;
        }));
        if (this.auth.isLoggedIn()) {
            this.subscriptions.add(this.auth.refreshCurrentUser().subscribe());
        }
        this.subscriptions.add(this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.currentUrl = event.urlAfterRedirects;
                this.menuOpen = false;
            }
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
    onDocumentClick(event) {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.menuOpen = false;
        }
    }
    logout() {
        this.sellerRequestModalOpen = false;
        this.auth.logout();
        this.router.navigate(['/']);
    }
    toggleMenu() {
        this.menuOpen = !this.menuOpen;
    }
    closeMenu() {
        this.menuOpen = false;
    }
    openSellerRequestModal() {
        if (!this.currentUser) {
            this.closeMenu();
            void this.router.navigate(['/login']);
            return;
        }
        if (this.auth.canAccessSellerArea || this.auth.isSellerRequestPending) {
            return;
        }
        this.closeMenu();
        this.sellerRequestModalOpen = true;
    }
    closeSellerRequestModal() {
        if (this.sellerRequestSubmitting) {
            return;
        }
        this.sellerRequestModalOpen = false;
    }
    submitSellerRequest() {
        if (this.sellerRequestSubmitting || !this.currentUser) {
            return;
        }
        this.sellerRequestSubmitting = true;
        this.auth.requestSellerAccess().subscribe({
            next: () => {
                this.sellerRequestSubmitting = false;
                this.sellerRequestModalOpen = false;
                this.toast.success('Votre demande vendeur a ete transmise a l administration.');
            },
            error: () => {
                this.sellerRequestSubmitting = false;
            },
        });
    }
    setAnimalFilter(filter) {
        this.uiState.setAnimalFilter(filter);
    }
    updateSearchTerm(value) {
        this.uiState.setSearchTerm(value);
    }
    isPageActive(key) {
        if (key === 'homes') {
            return this.currentUrl === '/';
        }
        return this.currentUrl.startsWith(`/${key}`);
    }
    get currentUserInitial() {
        return (this.currentUser?.name ?? '?').charAt(0).toUpperCase();
    }
    get canAccessSellerArea() {
        return this.auth.canAccessSellerArea;
    }
    get canAccessAdminArea() {
        return this.auth.canAccessAdminArea;
    }
    get sellerRequestPending() {
        return this.auth.isSellerRequestPending;
    }
    static { this.ɵfac = function HeaderComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || HeaderComponent)(i0.ɵɵdirectiveInject(i1.AuthService), i0.ɵɵdirectiveInject(i2.Router), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i3.MarketplaceUiService), i0.ɵɵdirectiveInject(i4.ToastService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: HeaderComponent, selectors: [["app-header"]], hostBindings: function HeaderComponent_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("click", function HeaderComponent_click_HostBindingHandler($event) { return ctx.onDocumentClick($event); }, i0.ɵɵresolveDocument);
        } }, standalone: false, decls: 43, vars: 6, consts: [["guestSellerCard", ""], ["authenticatedMenu", ""], [1, "border", "border-transparent", "md:border-2", "w-full", "px-4", "bg-[#f7f7f7]"], [1, "flex", "flex-col", "md:hidden"], ["type", "button", 1, "flex", "items-center", "gap-3", "mx-4", "my-4", "px-4", "py-3", "bg-white", "rounded-full", "shadow-md", "border", "border-gray-200", "hover:shadow-lg", "transition-shadow"], ["src", "assets/images/find_black.png", "alt", "search", 1, "w-5", "h-5"], [1, "text-gray-600", "text-sm"], [1, "flex", "justify-around", "border-t", "border-gray-200", "pt-2", "pb-3"], ["class", "flex flex-col items-center gap-1", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "hidden", "md:flex", "justify-between", "items-center", "w-full", "px-8", "py-4"], [1, "flex-shrink-0"], ["routerLink", "/"], ["src", "assets/images/airbnb-desktop.png", "alt", "Marketplace Betail", 1, "h-10", "w-auto"], [1, "flex", "gap-8", "text-base", "font-medium"], ["class", "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors", 3, "routerLink", "ngClass", 4, "ngFor", "ngForOf"], [1, "flex", "gap-3"], ["type", "button", 1, "flex", "items-center", "justify-center", "bg-white", "border", "border-gray-200", "rounded-lg", "w-10", "h-10", "hover:shadow-md", "transition-shadow"], ["src", "assets/images/globe.png", "alt", "language", 1, "h-5", "w-5"], [1, "relative"], ["type", "button", 1, "flex", "items-center", "justify-center", "bg-white", "border", "border-gray-200", "rounded-lg", "w-10", "h-10", "hover:shadow-md", "transition-shadow", 3, "click"], ["src", "assets/images/menu.png", "alt", "menu", 1, "h-5", "w-5"], ["class", "absolute right-0 top-full mt-2 bg-white w-80 shadow-xl rounded-2xl border border-gray-200 overflow-hidden z-50 animate-fadeIn", 4, "ngIf"], [1, "hidden", "md:flex", "justify-center", "mt-5"], [1, "w-full", "max-w-4xl", "border", "rounded-full", "shadow-xl", "px-6", "py-3", "bg-white"], [1, "flex", "justify-between", "items-center"], [1, "flex", "flex-col"], ["type", "text", "placeholder", "Search city or landmark", 1, "flex-1", "outline-none", "bg-[#f7f7f7]", 3, "input", "value"], [1, "h-6", "w-px", "bg-gray-300"], [1, "flex", "flex-col", "m-[10px]"], ["type", "text", "placeholder", "Add dates", 1, "flex-1", "outline-none", "border-0", "bg-[#f7f7f7]"], ["type", "text", "placeholder", "Add guests", 1, "flex-1", "outline-none", "bg-[#f7f7f7]"], ["type", "button", 1, "flex", "justify-center", "items-center", "rounded-full", "hover:bg-red-800", "bg-red-600", "w-[60px]", "h-[60px]"], ["src", "assets/images/find.png", "alt", "search", 1, "w-auto", "h-[45px]"], [1, "flex", "gap-4", "py-6", "px-4", "overflow-x-auto", "scrollbar-hide", "md:justify-center"], ["type", "button", "class", "group flex-shrink-0 bg-transparent border-0 p-0", 3, "click", 4, "ngFor", "ngForOf"], ["class", "seller-modal-backdrop", 3, "click", 4, "ngIf"], [1, "flex", "flex-col", "items-center", "gap-1", 3, "ngClass"], [1, "flex", "flex-col", "items-center", 3, "click", "routerLink"], [1, "h-6", "w-6", 3, "src", "alt"], [1, "text-xs", "mt-1"], [1, "flex", "items-center", "gap-2", "px-4", "py-2", "rounded-lg", "transition-colors", 3, "routerLink", "ngClass"], [1, "h-5", "w-5", 3, "src", "alt"], [1, "absolute", "right-0", "top-full", "mt-2", "bg-white", "w-80", "shadow-xl", "rounded-2xl", "border", "border-gray-200", "overflow-hidden", "z-50", "animate-fadeIn"], [1, "flex", "items-center", "gap-3", "p-4", "border-b", "border-gray-100", "hover:bg-gray-50", "transition-colors", "cursor-pointer"], [1, "flex", "items-center", "justify-center", "w-10", "h-10", "bg-red-50", "rounded-full"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-5", "h-5", "text-red-600"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"], [1, "flex-1"], [1, "font-semibold", "text-gray-900"], [1, "text-xs", "text-gray-500"], [1, "p-4", "bg-gradient-to-br", "from-red-50", "to-orange-50", "border-b", "border-gray-100"], [1, "flex", "items-start", "gap-3"], [1, "flex-shrink-0", "w-10", "h-10", "bg-red-600", "rounded-lg", "flex", "items-center", "justify-center"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-5", "h-5", "text-white"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"], [1, "font-semibold", "text-gray-900", "mb-1"], [4, "ngIf", "ngIfElse"], [1, "py-2"], ["href", "#", 1, "flex", "items-center", "gap-3", "px-4", "py-3", "hover:bg-gray-50", "transition-colors", "group"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-5", "h-5", "text-gray-400", "group-hover:text-red-600", "transition-colors"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"], [1, "text-sm", "font-medium", "text-gray-700", "group-hover:text-gray-900"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"], [1, "border-t", "border-gray-100", "p-4"], ["class", "text-xs text-gray-600 leading-relaxed mb-3", 4, "ngIf"], ["type", "button", "class", "seller-promo-button", 3, "click", 4, "ngIf"], ["class", "seller-status-badge seller-status-badge--pending", 4, "ngIf"], ["class", "seller-status-badge seller-status-badge--active", 4, "ngIf"], [1, "text-xs", "text-gray-600", "leading-relaxed", "mb-3"], ["type", "button", 1, "seller-promo-button", 3, "click"], [1, "seller-status-badge", "seller-status-badge--pending"], [1, "seller-status-badge", "seller-status-badge--active"], ["routerLink", "/login", 1, "seller-promo-button", 3, "click"], [1, "flex", "flex-col", "gap-3"], ["routerLink", "/login", 1, "w-full", "bg-red-600", "hover:bg-red-700", "text-white", "font-medium", "py-2.5", "px-4", "rounded-lg", "transition-colors", "shadow-sm", "hover:shadow-md", "flex", "items-center", "justify-center", "gap-2", 3, "click"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-5", "h-5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"], ["routerLink", "/register", 1, "w-full", "bg-white", "hover:bg-gray-50", "text-gray-900", "font-medium", "py-2.5", "px-4", "rounded-lg", "transition-colors", "border", "border-gray-300", "flex", "items-center", "justify-center", "gap-2", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"], [1, "flex", "items-center", "gap-3", "p-3", "bg-gray-50", "rounded-lg"], [1, "w-10", "h-10", "bg-red-600", "rounded-full", "flex", "items-center", "justify-center", "text-white", "font-semibold"], [1, "flex-1", "min-w-0"], [1, "font-medium", "text-gray-900", "truncate"], [1, "text-sm", "text-gray-500", "truncate"], ["routerLink", "/dashboard", 1, "w-full", "bg-white", "hover:bg-gray-50", "text-gray-900", "font-medium", "py-2.5", "px-4", "rounded-lg", "transition-colors", "border", "border-gray-300", "flex", "items-center", "gap-2", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"], ["routerLink", "/animaux/mes-animaux", "class", "w-full bg-white hover:bg-gray-50 text-gray-900 font-medium py-2.5 px-4 rounded-lg transition-colors border border-gray-300 flex items-center gap-2", 3, "click", 4, "ngIf"], ["routerLink", "/animaux/creer", "class", "w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors shadow-sm hover:shadow-md flex items-center justify-center gap-2", 3, "click", 4, "ngIf"], ["type", "button", "class", "w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors shadow-sm hover:shadow-md flex items-center justify-center gap-2", 3, "click", 4, "ngIf"], ["class", "w-full bg-amber-50 text-amber-800 font-medium py-2.5 px-4 rounded-lg border border-amber-200", 4, "ngIf"], ["routerLink", "/animaux/validation", "class", "w-full bg-white hover:bg-gray-50 text-gray-900 font-medium py-2.5 px-4 rounded-lg transition-colors border border-gray-300 flex items-center gap-2", 3, "click", 4, "ngIf"], ["routerLink", "/admin", "class", "w-full bg-white hover:bg-gray-50 text-gray-900 font-medium py-2.5 px-4 rounded-lg transition-colors border border-gray-300 flex items-center gap-2", 3, "click", 4, "ngIf"], ["type", "button", 1, "w-full", "bg-white", "hover:bg-red-50", "text-red-600", "font-medium", "py-2.5", "px-4", "rounded-lg", "transition-colors", "border", "border-red-200", "flex", "items-center", "justify-center", "gap-2", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"], ["routerLink", "/animaux/mes-animaux", 1, "w-full", "bg-white", "hover:bg-gray-50", "text-gray-900", "font-medium", "py-2.5", "px-4", "rounded-lg", "transition-colors", "border", "border-gray-300", "flex", "items-center", "gap-2", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"], ["routerLink", "/animaux/creer", 1, "w-full", "bg-red-600", "hover:bg-red-700", "text-white", "font-medium", "py-2.5", "px-4", "rounded-lg", "transition-colors", "shadow-sm", "hover:shadow-md", "flex", "items-center", "justify-center", "gap-2", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 4v16m8-8H4"], ["type", "button", 1, "w-full", "bg-red-600", "hover:bg-red-700", "text-white", "font-medium", "py-2.5", "px-4", "rounded-lg", "transition-colors", "shadow-sm", "hover:shadow-md", "flex", "items-center", "justify-center", "gap-2", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V6m0 2v8m0 0v2"], [1, "w-full", "bg-amber-50", "text-amber-800", "font-medium", "py-2.5", "px-4", "rounded-lg", "border", "border-amber-200"], ["routerLink", "/animaux/validation", 1, "w-full", "bg-white", "hover:bg-gray-50", "text-gray-900", "font-medium", "py-2.5", "px-4", "rounded-lg", "transition-colors", "border", "border-gray-300", "flex", "items-center", "gap-2", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M9 12l2 2 4-4m5-2a9 9 0 11-18 0 9 9 0 0118 0z"], ["routerLink", "/admin", 1, "w-full", "bg-white", "hover:bg-gray-50", "text-gray-900", "font-medium", "py-2.5", "px-4", "rounded-lg", "transition-colors", "border", "border-gray-300", "flex", "items-center", "gap-2", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M9 17v-6m4 6V7m4 10v-4M5 21h14M7 5h10l1 4H6l1-4z"], ["type", "button", 1, "group", "flex-shrink-0", "bg-transparent", "border-0", "p-0", 3, "click"], [1, "flex", "items-center", "justify-center", "rounded-full", "h-16", "w-16", "border-2", "transition-colors", 3, "ngClass"], [1, "h-8", "w-8", 3, "src", "alt"], [1, "text-xs", "text-gray-600", "group-hover:text-red-600"], [1, "seller-modal-backdrop", 3, "click"], [1, "seller-modal", 3, "click"], [1, "seller-modal__icon"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-6", "h-6"], [1, "seller-modal__title"], [1, "seller-modal__copy"], [1, "seller-modal__details"], [1, "seller-modal__actions"], ["type", "button", 1, "seller-modal__button", "seller-modal__button--ghost", 3, "click"], ["type", "button", 1, "seller-modal__button", "seller-modal__button--solid", 3, "click", "disabled"]], template: function HeaderComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 2)(1, "div", 3)(2, "button", 4);
            i0.ɵɵelement(3, "img", 5);
            i0.ɵɵelementStart(4, "span", 6);
            i0.ɵɵtext(5, "Rechercher un animal...");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(6, "div", 7);
            i0.ɵɵtemplate(7, HeaderComponent_div_7_Template, 5, 5, "div", 8);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(8, "div", 9)(9, "div", 10)(10, "a", 11);
            i0.ɵɵelement(11, "img", 12);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(12, "div", 13);
            i0.ɵɵtemplate(13, HeaderComponent_a_13_Template, 4, 5, "a", 14);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "div", 15)(15, "button", 16);
            i0.ɵɵelement(16, "img", 17);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "div", 18)(18, "button", 19);
            i0.ɵɵlistener("click", function HeaderComponent_Template_button_click_18_listener() { return ctx.toggleMenu(); });
            i0.ɵɵelement(19, "img", 20);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(20, HeaderComponent_div_20_Template, 41, 4, "div", 21);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(21, "div", 22)(22, "div", 23)(23, "div", 24)(24, "div", 25)(25, "h2");
            i0.ɵɵtext(26, "Where");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(27, "input", 26);
            i0.ɵɵlistener("input", function HeaderComponent_Template_input_input_27_listener($event) { return ctx.updateSearchTerm($event.target.value); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(28, "div", 27);
            i0.ɵɵelementStart(29, "div", 28)(30, "h2");
            i0.ɵɵtext(31, "When");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(32, "input", 29);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(33, "div", 27);
            i0.ɵɵelementStart(34, "div", 28)(35, "h2");
            i0.ɵɵtext(36, "Who");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(37, "input", 30);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(38, "button", 31);
            i0.ɵɵelement(39, "img", 32);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(40, "div", 33);
            i0.ɵɵtemplate(41, HeaderComponent_button_41_Template, 5, 4, "button", 34);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(42, HeaderComponent_div_42_Template, 22, 2, "div", 35);
        } if (rf & 2) {
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("ngForOf", ctx.navItems);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("ngForOf", ctx.navItems);
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("ngIf", ctx.menuOpen);
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("value", ctx.searchTerm);
            i0.ɵɵadvance(14);
            i0.ɵɵproperty("ngForOf", ctx.animalFilters);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.sellerRequestModalOpen);
        } }, dependencies: [i5.NgClass, i5.NgForOf, i5.NgIf, i2.RouterLink], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n\n.seller-promo-button[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0.6rem 0.9rem;\n  border-radius: 999px;\n  background: linear-gradient(135deg, #be123c 0%, #e11d48 100%);\n  color: #fff;\n  font-size: 0.78rem;\n  font-weight: 700;\n}\n\n.seller-status-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.4rem 0.7rem;\n  border-radius: 999px;\n  font-size: 0.75rem;\n  font-weight: 700;\n}\n\n.seller-status-badge--pending[_ngcontent-%COMP%] {\n  background: #fef3c7;\n  color: #92400e;\n}\n\n.seller-status-badge--active[_ngcontent-%COMP%] {\n  background: #dcfce7;\n  color: #166534;\n}\n\n.seller-modal-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 70;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 1.5rem;\n  background: rgba(15, 23, 42, 0.55);\n  backdrop-filter: blur(4px);\n}\n\n.seller-modal[_ngcontent-%COMP%] {\n  width: min(100%, 34rem);\n  padding: 1.5rem;\n  border-radius: 28px;\n  border: 1px solid rgba(225, 29, 72, 0.2);\n  background:\n    radial-gradient(circle at top right, rgba(251, 191, 36, 0.18), transparent 28%),\n    linear-gradient(180deg, #fff8f8 0%, #ffffff 100%);\n  box-shadow: 0 32px 80px rgba(15, 23, 42, 0.24);\n}\n\n.seller-modal__icon[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 3rem;\n  height: 3rem;\n  border-radius: 1rem;\n  background: linear-gradient(135deg, #be123c 0%, #fb7185 100%);\n  color: #fff;\n}\n\n.seller-modal__title[_ngcontent-%COMP%] {\n  margin: 1rem 0 0;\n  color: #611a24;\n  font-size: 1.4rem;\n  font-weight: 800;\n}\n\n.seller-modal__copy[_ngcontent-%COMP%] {\n  margin: 0.85rem 0 0;\n  color: #7f1d1d;\n  line-height: 1.7;\n}\n\n.seller-modal__details[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.65rem;\n  margin-top: 1.15rem;\n  padding: 1rem;\n  border-radius: 1rem;\n  background: rgba(255, 255, 255, 0.78);\n  border: 1px solid rgba(190, 24, 93, 0.12);\n  color: #4c0519;\n  font-size: 0.95rem;\n}\n\n.seller-modal__details[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n}\n\n.seller-modal__actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  margin-top: 1.25rem;\n}\n\n.seller-modal__button[_ngcontent-%COMP%] {\n  border: 0;\n  border-radius: 999px;\n  padding: 0.8rem 1rem;\n  font-weight: 700;\n}\n\n.seller-modal__button--ghost[_ngcontent-%COMP%] {\n  background: #fdf2f8;\n  color: #9d174d;\n}\n\n.seller-modal__button--solid[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #be123c 0%, #e11d48 100%);\n  color: #fff;\n}\n\n.seller-modal__button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.65;\n  cursor: not-allowed;\n}\n\n@media (max-width: 640px) {\n  .seller-modal[_ngcontent-%COMP%] {\n    padding: 1.25rem;\n    border-radius: 22px;\n  }\n\n  .seller-modal__actions[_ngcontent-%COMP%] {\n    flex-direction: column-reverse;\n  }\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HeaderComponent, [{
        type: Component,
        args: [{ selector: 'app-header', standalone: false, template: "<div class=\"border border-transparent md:border-2 w-full px-4 bg-[#f7f7f7]\">\r\n  <div class=\"flex flex-col md:hidden\">\r\n    <button\r\n      type=\"button\"\r\n      class=\"flex items-center gap-3 mx-4 my-4 px-4 py-3 bg-white rounded-full shadow-md border border-gray-200 hover:shadow-lg transition-shadow\"\r\n    >\r\n      <img src=\"assets/images/find_black.png\" alt=\"search\" class=\"w-5 h-5\" />\r\n      <span class=\"text-gray-600 text-sm\">Rechercher un animal...</span>\r\n    </button>\r\n\r\n    <div class=\"flex justify-around border-t border-gray-200 pt-2 pb-3\">\r\n      <div\r\n        *ngFor=\"let item of navItems\"\r\n        class=\"flex flex-col items-center gap-1\"\r\n        [ngClass]=\"isPageActive(item.key) ? 'text-red-600' : 'text-gray-500'\"\r\n      >\r\n        <a [routerLink]=\"item.route\" class=\"flex flex-col items-center\" (click)=\"closeMenu()\">\r\n          <img [src]=\"item.icon\" class=\"h-6 w-6\" [alt]=\"item.mobileLabel\" />\r\n          <span class=\"text-xs mt-1\">{{ item.mobileLabel }}</span>\r\n        </a>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"hidden md:flex justify-between items-center w-full px-8 py-4\">\r\n    <div class=\"flex-shrink-0\">\r\n      <a routerLink=\"/\">\r\n        <img src=\"assets/images/airbnb-desktop.png\" class=\"h-10 w-auto\" alt=\"Marketplace Betail\" />\r\n      </a>\r\n    </div>\r\n\r\n    <div class=\"flex gap-8 text-base font-medium\">\r\n      <a\r\n        *ngFor=\"let item of navItems\"\r\n        [routerLink]=\"item.route\"\r\n        class=\"flex items-center gap-2 px-4 py-2 rounded-lg transition-colors\"\r\n        [ngClass]=\"\r\n          isPageActive(item.key)\r\n            ? 'bg-red-50 text-red-600'\r\n            : 'text-gray-700 hover:bg-gray-100'\r\n        \"\r\n      >\r\n        <img [src]=\"item.icon\" class=\"h-5 w-5\" [alt]=\"item.desktopLabel\" />\r\n        <span>{{ item.desktopLabel }}</span>\r\n      </a>\r\n    </div>\r\n\r\n    <div class=\"flex gap-3\">\r\n      <button\r\n        type=\"button\"\r\n        class=\"flex items-center justify-center bg-white border border-gray-200 rounded-lg w-10 h-10 hover:shadow-md transition-shadow\"\r\n      >\r\n        <img src=\"assets/images/globe.png\" alt=\"language\" class=\"h-5 w-5\" />\r\n      </button>\r\n\r\n      <div class=\"relative\">\r\n        <button\r\n          type=\"button\"\r\n          (click)=\"toggleMenu()\"\r\n          class=\"flex items-center justify-center bg-white border border-gray-200 rounded-lg w-10 h-10 hover:shadow-md transition-shadow\"\r\n        >\r\n          <img src=\"assets/images/menu.png\" class=\"h-5 w-5\" alt=\"menu\" />\r\n        </button>\r\n\r\n        <div\r\n          *ngIf=\"menuOpen\"\r\n          class=\"absolute right-0 top-full mt-2 bg-white w-80 shadow-xl rounded-2xl border border-gray-200 overflow-hidden z-50 animate-fadeIn\"\r\n        >\r\n          <div class=\"flex items-center gap-3 p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer\">\r\n            <div class=\"flex items-center justify-center w-10 h-10 bg-red-50 rounded-full\">\r\n              <svg class=\"w-5 h-5 text-red-600\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\r\n                <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z\" />\r\n              </svg>\r\n            </div>\r\n            <div class=\"flex-1\">\r\n              <h2 class=\"font-semibold text-gray-900\">Centre d'aide</h2>\r\n              <p class=\"text-xs text-gray-500\">Besoin d'assistance ?</p>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"p-4 bg-gradient-to-br from-red-50 to-orange-50 border-b border-gray-100\">\n            <div class=\"flex items-start gap-3\">\n              <div class=\"flex-shrink-0 w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center\">\n                <svg class=\"w-5 h-5 text-white\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n                  <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z\" />\n                </svg>\n              </div>\n              <div class=\"flex-1\">\n                <h3 class=\"font-semibold text-gray-900 mb-1\">Devenir vendeur</h3>\n                <ng-container *ngIf=\"currentUser; else guestSellerCard\">\n                  <p class=\"text-xs text-gray-600 leading-relaxed mb-3\" *ngIf=\"!canAccessSellerArea && !sellerRequestPending\">\n                    Demandez l'acc&egrave;s vendeur pour publier vos animaux et ouvrir votre espace de vente.\n                  </p>\n                  <p class=\"text-xs text-gray-600 leading-relaxed mb-3\" *ngIf=\"sellerRequestPending\">\n                    Votre demande a &eacute;t&eacute; envoy&eacute;e. Un administrateur doit maintenant la valider.\n                  </p>\n                  <p class=\"text-xs text-gray-600 leading-relaxed mb-3\" *ngIf=\"canAccessSellerArea\">\n                    Votre compte dispose d&eacute;j&agrave; de l'acc&egrave;s vendeur.\n                  </p>\n\n                  <button\n                    *ngIf=\"!canAccessSellerArea && !sellerRequestPending\"\n                    type=\"button\"\n                    (click)=\"openSellerRequestModal()\"\n                    class=\"seller-promo-button\"\n                  >\n                    Faire ma demande\n                  </button>\n\n                  <span *ngIf=\"sellerRequestPending\" class=\"seller-status-badge seller-status-badge--pending\">\n                    Demande en attente\n                  </span>\n\n                  <span *ngIf=\"canAccessSellerArea\" class=\"seller-status-badge seller-status-badge--active\">\n                    Acc&egrave;s vendeur actif\n                  </span>\n                </ng-container>\n\n                <ng-template #guestSellerCard>\n                  <p class=\"text-xs text-gray-600 leading-relaxed mb-3\">\n                    Connectez-vous pour envoyer votre demande et faire valider votre passage vendeur.\n                  </p>\n                  <a\n                    routerLink=\"/login\"\n                    (click)=\"closeMenu()\"\n                    class=\"seller-promo-button\"\n                  >\n                    Se connecter\n                  </a>\n                </ng-template>\n              </div>\n            </div>\n          </div>\n\r\n          <div class=\"py-2\">\r\n            <a href=\"#\" class=\"flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group\">\r\n              <svg class=\"w-5 h-5 text-gray-400 group-hover:text-red-600 transition-colors\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\r\n                <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z\" />\r\n              </svg>\r\n              <span class=\"text-sm font-medium text-gray-700 group-hover:text-gray-900\">Parrainez un vendeur</span>\r\n            </a>\r\n\r\n            <a href=\"#\" class=\"flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group\">\r\n              <svg class=\"w-5 h-5 text-gray-400 group-hover:text-red-600 transition-colors\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\r\n                <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z\" />\r\n              </svg>\r\n              <span class=\"text-sm font-medium text-gray-700 group-hover:text-gray-900\">Trouver un co-vendeur</span>\r\n            </a>\r\n\r\n            <a href=\"#\" class=\"flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group\">\r\n              <svg class=\"w-5 h-5 text-gray-400 group-hover:text-red-600 transition-colors\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\r\n                <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7\" />\r\n              </svg>\r\n              <span class=\"text-sm font-medium text-gray-700 group-hover:text-gray-900\">Cartes cadeaux</span>\r\n            </a>\r\n          </div>\r\n\r\n          <div class=\"border-t border-gray-100 p-4\">\r\n            <ng-container *ngIf=\"!currentUser; else authenticatedMenu\">\r\n              <div class=\"flex flex-col gap-3\">\r\n                <a\r\n                  routerLink=\"/login\"\r\n                  (click)=\"closeMenu()\"\r\n                  class=\"w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors shadow-sm hover:shadow-md flex items-center justify-center gap-2\"\r\n                >\r\n                  <svg class=\"w-5 h-5\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\r\n                    <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1\" />\r\n                  </svg>\r\n                  Connexion\r\n                </a>\r\n\r\n                <a\r\n                  routerLink=\"/register\"\r\n                  (click)=\"closeMenu()\"\r\n                  class=\"w-full bg-white hover:bg-gray-50 text-gray-900 font-medium py-2.5 px-4 rounded-lg transition-colors border border-gray-300 flex items-center justify-center gap-2\"\r\n                >\r\n                  <svg class=\"w-5 h-5\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\r\n                    <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z\" />\r\n                  </svg>\r\n                  Inscription\r\n                </a>\r\n              </div>\r\n            </ng-container>\r\n\r\n            <ng-template #authenticatedMenu>\r\n              <div class=\"flex flex-col gap-3\">\r\n                <div class=\"flex items-center gap-3 p-3 bg-gray-50 rounded-lg\">\r\n                  <div class=\"w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold\">\r\n                    {{ currentUserInitial }}\r\n                  </div>\r\n                  <div class=\"flex-1 min-w-0\">\r\n                    <p class=\"font-medium text-gray-900 truncate\">{{ currentUser?.name }}</p>\r\n                    <p class=\"text-sm text-gray-500 truncate\">{{ currentUser?.email }}</p>\r\n                  </div>\r\n                </div>\r\n\r\n                <a\r\n                  routerLink=\"/dashboard\"\r\n                  (click)=\"closeMenu()\"\r\n                  class=\"w-full bg-white hover:bg-gray-50 text-gray-900 font-medium py-2.5 px-4 rounded-lg transition-colors border border-gray-300 flex items-center gap-2\"\r\n                >\r\n                  <svg class=\"w-5 h-5\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\r\n                    <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z\" />\r\n                  </svg>\r\n                  Mon Dashboard\r\n                </a>\r\n\r\n                <a\n                  routerLink=\"/animaux/mes-animaux\"\n                  *ngIf=\"canAccessSellerArea\"\n                  (click)=\"closeMenu()\"\n                  class=\"w-full bg-white hover:bg-gray-50 text-gray-900 font-medium py-2.5 px-4 rounded-lg transition-colors border border-gray-300 flex items-center gap-2\"\n                >\n                  <svg class=\"w-5 h-5\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\r\n                    <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z\" />\r\n                  </svg>\r\n                  Mes animaux\r\n                </a>\r\n\r\n                <a\n                  routerLink=\"/animaux/creer\"\n                  *ngIf=\"canAccessSellerArea\"\n                  (click)=\"closeMenu()\"\n                  class=\"w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors shadow-sm hover:shadow-md flex items-center justify-center gap-2\"\n                >\n                  <svg class=\"w-5 h-5\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\r\n                    <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M12 4v16m8-8H4\" />\r\n                  </svg>\r\n                  Enregistrer un animal\n                </a>\n\n                <button\n                  *ngIf=\"!canAccessSellerArea && !sellerRequestPending\"\n                  type=\"button\"\n                  (click)=\"openSellerRequestModal()\"\n                  class=\"w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors shadow-sm hover:shadow-md flex items-center justify-center gap-2\"\n                >\n                  <svg class=\"w-5 h-5\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n                    <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V6m0 2v8m0 0v2\" />\n                  </svg>\n                  Demander l'acc&egrave;s vendeur\n                </button>\n\n                <div\n                  *ngIf=\"sellerRequestPending\"\n                  class=\"w-full bg-amber-50 text-amber-800 font-medium py-2.5 px-4 rounded-lg border border-amber-200\"\n                >\n                  Demande vendeur en attente de validation.\n                </div>\n\n                <a\n                  *ngIf=\"auth.canAccessHealthValidation\"\n                  routerLink=\"/animaux/validation\"\n                  (click)=\"closeMenu()\"\r\n                  class=\"w-full bg-white hover:bg-gray-50 text-gray-900 font-medium py-2.5 px-4 rounded-lg transition-colors border border-gray-300 flex items-center gap-2\"\r\n                >\r\n                  <svg class=\"w-5 h-5\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\r\n                    <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M9 12l2 2 4-4m5-2a9 9 0 11-18 0 9 9 0 0118 0z\" />\r\n                  </svg>\r\n                  Validation sanitaire\n                </a>\n\n                <a\n                  *ngIf=\"canAccessAdminArea\"\n                  routerLink=\"/admin\"\n                  (click)=\"closeMenu()\"\n                  class=\"w-full bg-white hover:bg-gray-50 text-gray-900 font-medium py-2.5 px-4 rounded-lg transition-colors border border-gray-300 flex items-center gap-2\"\n                >\n                  <svg class=\"w-5 h-5\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n                    <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M9 17v-6m4 6V7m4 10v-4M5 21h14M7 5h10l1 4H6l1-4z\" />\n                  </svg>\n                  Administration\n                </a>\n\r\n                <button\r\n                  type=\"button\"\r\n                  (click)=\"logout()\"\r\n                  class=\"w-full bg-white hover:bg-red-50 text-red-600 font-medium py-2.5 px-4 rounded-lg transition-colors border border-red-200 flex items-center justify-center gap-2\"\r\n                >\r\n                  <svg class=\"w-5 h-5\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\r\n                    <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1\" />\r\n                  </svg>\r\n                  D&eacute;connexion\r\n                </button>\r\n              </div>\r\n            </ng-template>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"hidden md:flex justify-center mt-5\">\r\n    <div class=\"w-full max-w-4xl border rounded-full shadow-xl px-6 py-3 bg-white\">\r\n      <div class=\"flex justify-between items-center\">\r\n        <div class=\"flex flex-col\">\r\n          <h2>Where</h2>\r\n          <input\r\n            type=\"text\"\r\n            placeholder=\"Search city or landmark\"\r\n            class=\"flex-1 outline-none bg-[#f7f7f7]\"\r\n            [value]=\"searchTerm\"\r\n            (input)=\"updateSearchTerm(($any($event.target)).value)\"\r\n          />\r\n        </div>\r\n        <div class=\"h-6 w-px bg-gray-300\"></div>\r\n        <div class=\"flex flex-col m-[10px]\">\r\n          <h2>When</h2>\r\n          <input type=\"text\" placeholder=\"Add dates\" class=\"flex-1 outline-none border-0 bg-[#f7f7f7]\" />\r\n        </div>\r\n        <div class=\"h-6 w-px bg-gray-300\"></div>\r\n        <div class=\"flex flex-col m-[10px]\">\r\n          <h2>Who</h2>\r\n          <input type=\"text\" placeholder=\"Add guests\" class=\"flex-1 outline-none bg-[#f7f7f7]\" />\r\n        </div>\r\n        <button\r\n          type=\"button\"\r\n          class=\"flex justify-center items-center rounded-full hover:bg-red-800 bg-red-600 w-[60px] h-[60px]\"\r\n        >\r\n          <img src=\"assets/images/find.png\" alt=\"search\" class=\"w-auto h-[45px]\" />\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"flex gap-4 py-6 px-4 overflow-x-auto scrollbar-hide md:justify-center\">\n    <button\r\n      *ngFor=\"let filter of animalFilters\"\r\n      type=\"button\"\r\n      (click)=\"setAnimalFilter(filter.value)\"\r\n      class=\"group flex-shrink-0 bg-transparent border-0 p-0\"\r\n    >\r\n      <div\r\n        class=\"flex items-center justify-center rounded-full h-16 w-16 border-2 transition-colors\"\r\n        [ngClass]=\"\r\n          animalFilter === filter.value\r\n            ? 'border-red-500 bg-red-50'\r\n            : 'border-gray-200 bg-white group-hover:border-red-500'\r\n        \"\r\n      >\r\n        <img [src]=\"filter.icon\" class=\"h-8 w-8\" [alt]=\"filter.label\" />\r\n      </div>\r\n      <span class=\"text-xs text-gray-600 group-hover:text-red-600\">{{ filter.label }}</span>\r\n    </button>\r\n  </div>\n</div>\n\n<div *ngIf=\"sellerRequestModalOpen\" class=\"seller-modal-backdrop\" (click)=\"closeSellerRequestModal()\">\n  <div class=\"seller-modal\" (click)=\"$event.stopPropagation()\">\n    <div class=\"seller-modal__icon\">\n      <svg class=\"w-6 h-6\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n        <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V6m0 2v8m0 0v2\" />\n      </svg>\n    </div>\n\n    <h2 class=\"seller-modal__title\">Envoyer une demande vendeur</h2>\n    <p class=\"seller-modal__copy\">\n      Vous &ecirc;tes sur le point de demander l'acc&egrave;s vendeur. Votre demande sera transmise &agrave;\n      l'administration pour validation avant le passage de votre compte au r&ocirc;le <strong>VENDEUR</strong>.\n    </p>\n\n    <div class=\"seller-modal__details\">\n      <p>Une fois valid&eacute;, vous pourrez cr&eacute;er vos annonces et enregistrer vos animaux.</p>\n      <p>Les pages vendeur resteront prot&eacute;g&eacute;es tant que la demande n'est pas approuv&eacute;e.</p>\n    </div>\n\n    <div class=\"seller-modal__actions\">\n      <button type=\"button\" class=\"seller-modal__button seller-modal__button--ghost\" (click)=\"closeSellerRequestModal()\">\n        Annuler\n      </button>\n      <button\n        type=\"button\"\n        class=\"seller-modal__button seller-modal__button--solid\"\n        [disabled]=\"sellerRequestSubmitting\"\n        (click)=\"submitSellerRequest()\"\n      >\n        {{ sellerRequestSubmitting ? 'Envoi...' : 'Confirmer la demande' }}\n      </button>\n    </div>\n  </div>\n</div>\n", styles: [":host {\n  display: block;\n}\n\n.seller-promo-button {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0.6rem 0.9rem;\n  border-radius: 999px;\n  background: linear-gradient(135deg, #be123c 0%, #e11d48 100%);\n  color: #fff;\n  font-size: 0.78rem;\n  font-weight: 700;\n}\n\n.seller-status-badge {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.4rem 0.7rem;\n  border-radius: 999px;\n  font-size: 0.75rem;\n  font-weight: 700;\n}\n\n.seller-status-badge--pending {\n  background: #fef3c7;\n  color: #92400e;\n}\n\n.seller-status-badge--active {\n  background: #dcfce7;\n  color: #166534;\n}\n\n.seller-modal-backdrop {\n  position: fixed;\n  inset: 0;\n  z-index: 70;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 1.5rem;\n  background: rgba(15, 23, 42, 0.55);\n  backdrop-filter: blur(4px);\n}\n\n.seller-modal {\n  width: min(100%, 34rem);\n  padding: 1.5rem;\n  border-radius: 28px;\n  border: 1px solid rgba(225, 29, 72, 0.2);\n  background:\n    radial-gradient(circle at top right, rgba(251, 191, 36, 0.18), transparent 28%),\n    linear-gradient(180deg, #fff8f8 0%, #ffffff 100%);\n  box-shadow: 0 32px 80px rgba(15, 23, 42, 0.24);\n}\n\n.seller-modal__icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 3rem;\n  height: 3rem;\n  border-radius: 1rem;\n  background: linear-gradient(135deg, #be123c 0%, #fb7185 100%);\n  color: #fff;\n}\n\n.seller-modal__title {\n  margin: 1rem 0 0;\n  color: #611a24;\n  font-size: 1.4rem;\n  font-weight: 800;\n}\n\n.seller-modal__copy {\n  margin: 0.85rem 0 0;\n  color: #7f1d1d;\n  line-height: 1.7;\n}\n\n.seller-modal__details {\n  display: grid;\n  gap: 0.65rem;\n  margin-top: 1.15rem;\n  padding: 1rem;\n  border-radius: 1rem;\n  background: rgba(255, 255, 255, 0.78);\n  border: 1px solid rgba(190, 24, 93, 0.12);\n  color: #4c0519;\n  font-size: 0.95rem;\n}\n\n.seller-modal__details p {\n  margin: 0;\n}\n\n.seller-modal__actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  margin-top: 1.25rem;\n}\n\n.seller-modal__button {\n  border: 0;\n  border-radius: 999px;\n  padding: 0.8rem 1rem;\n  font-weight: 700;\n}\n\n.seller-modal__button--ghost {\n  background: #fdf2f8;\n  color: #9d174d;\n}\n\n.seller-modal__button--solid {\n  background: linear-gradient(135deg, #be123c 0%, #e11d48 100%);\n  color: #fff;\n}\n\n.seller-modal__button:disabled {\n  opacity: 0.65;\n  cursor: not-allowed;\n}\n\n@media (max-width: 640px) {\n  .seller-modal {\n    padding: 1.25rem;\n    border-radius: 22px;\n  }\n\n  .seller-modal__actions {\n    flex-direction: column-reverse;\n  }\n}\n"] }]
    }], () => [{ type: i1.AuthService }, { type: i2.Router }, { type: i0.ElementRef }, { type: i3.MarketplaceUiService }, { type: i4.ToastService }], { onDocumentClick: [{
            type: HostListener,
            args: ['document:click', ['$event']]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(HeaderComponent, { className: "HeaderComponent", filePath: "src/app/shared/components/header/header.component.ts", lineNumber: 29 }); })();
//# sourceMappingURL=header.component.js.map