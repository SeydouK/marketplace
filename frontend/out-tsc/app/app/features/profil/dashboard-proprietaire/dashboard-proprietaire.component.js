import { Component } from '@angular/core';
import { Role } from '../../../core/models/role.enum';
import * as i0 from "@angular/core";
import * as i1 from "../services/dashboard.service";
import * as i2 from "../../../core/services/auth.service";
import * as i3 from "@angular/common";
import * as i4 from "@angular/router";
function DashboardProprietaireComponent_a_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 19);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 15);
    i0.ɵɵelement(2, "path", 20);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(3, "span", 17);
    i0.ɵɵtext(4, "Enregistrer un animal");
    i0.ɵɵelementEnd()();
} }
function DashboardProprietaireComponent_a_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 21);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 15);
    i0.ɵɵelement(2, "path", 22);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(3, "span", 17);
    i0.ɵɵtext(4, "Ouvrir la validation ANADER");
    i0.ɵɵelementEnd()();
} }
function DashboardProprietaireComponent_ng_template_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 23);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 15);
    i0.ɵɵelement(2, "path", 24);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(3, "div")(4, "span", 17);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 25);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.sellerRequestPending ? "Demande vendeur en attente" : "Acces vendeur requis", " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.sellerRequestPending ? "Votre demande a bien ete transmise. Vous pourrez creer vos annonces apres validation par un administrateur." : "Utilisez le menu Devenir vendeur pour envoyer votre demande avant de publier vos animaux.", " ");
} }
export class DashboardProprietaireComponent {
    constructor(dashboardService, auth) {
        this.dashboardService = dashboardService;
        this.auth = auth;
    }
    ngOnInit() {
        this.dashboardService.me().subscribe((profile) => {
            this.profile = profile;
        });
    }
    get animalsCount() {
        return this.profile?.animalsCount ?? 0;
    }
    get pendingHealthValidationCount() {
        return this.profile?.pendingHealthValidationCount ?? 0;
    }
    get canAccessHealthValidation() {
        return this.auth.canAccessHealthValidation;
    }
    get canAccessSellerArea() {
        return !!this.profile?.role && [Role.VENDEUR, Role.ADMIN, Role.ADMINISTRATEUR].includes(this.profile.role);
    }
    get sellerRequestPending() {
        return !!this.profile?.devenirVendeur;
    }
    static { this.ɵfac = function DashboardProprietaireComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DashboardProprietaireComponent)(i0.ɵɵdirectiveInject(i1.DashboardService), i0.ɵɵdirectiveInject(i2.AuthService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DashboardProprietaireComponent, selectors: [["app-dashboard-proprietaire"]], standalone: false, decls: 41, vars: 6, consts: [["sellerAccessNotice", ""], [1, "dashboard-shell", "max-w-7xl", "mx-auto", "py-8", "px-4"], [1, "dashboard-hero"], [1, "dashboard-eyebrow"], [1, "dashboard-copy"], [1, "grid", "grid-cols-1", "md:grid-cols-3", "gap-6", "mt-8"], [1, "dashboard-card"], [1, "dashboard-label"], [1, "dashboard-value"], [1, "dashboard-value", "dashboard-value--small"], [1, "mt-8"], [1, "text-xl", "font-semibold", "text-[#611a24]", "mb-4"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-4"], ["routerLink", "/animaux/creer", "class", "dashboard-action dashboard-action--solid", 4, "ngIf", "ngIfElse"], ["routerLink", "/animaux/mes-animaux", 1, "dashboard-action"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-6", "h-6"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"], [1, "font-medium"], ["routerLink", "/animaux/validation", "class", "dashboard-action dashboard-action--wide", 4, "ngIf"], ["routerLink", "/animaux/creer", 1, "dashboard-action", "dashboard-action--solid"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 4v16m8-8H4"], ["routerLink", "/animaux/validation", 1, "dashboard-action", "dashboard-action--wide"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M9 12l2 2 4-4m5-2a9 9 0 11-18 0 9 9 0 0118 0z"], [1, "dashboard-action", "dashboard-action--notice"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V6m0 2v8m0 0v2"], [1, "dashboard-action__copy"]], template: function DashboardProprietaireComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 1)(1, "div", 2)(2, "div")(3, "p", 3);
            i0.ɵɵtext(4, "Pilotage POC");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "h1");
            i0.ɵɵtext(6, "Tableau de bord du cheptel");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "p", 4);
            i0.ɵɵtext(8, " Le suivi vendeur et la validation ANADER passent d\u00E9sormais par l'espace ");
            i0.ɵɵelementStart(9, "strong");
            i0.ɵɵtext(10, "animaux");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(11, ", centr\u00E9 sur le QR code, les pi\u00E8ces sanitaires et la tra\u00E7abilit\u00E9. ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(12, "div", 5)(13, "article", 6)(14, "span", 7);
            i0.ɵɵtext(15, "Mes animaux");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "strong", 8);
            i0.ɵɵtext(17);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(18, "article", 6)(19, "span", 7);
            i0.ɵɵtext(20, "Validations en attente");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "strong", 8);
            i0.ɵɵtext(22);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(23, "article", 6)(24, "span", 7);
            i0.ɵɵtext(25, "R\u00F4le actif");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "strong", 9);
            i0.ɵɵtext(27);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(28, "div", 10)(29, "h2", 11);
            i0.ɵɵtext(30, "Actions rapides");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "div", 12);
            i0.ɵɵtemplate(32, DashboardProprietaireComponent_a_32_Template, 5, 0, "a", 13);
            i0.ɵɵelementStart(33, "a", 14);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(34, "svg", 15);
            i0.ɵɵelement(35, "path", 16);
            i0.ɵɵelementEnd();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(36, "span", 17);
            i0.ɵɵtext(37, "Voir mes animaux");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(38, DashboardProprietaireComponent_a_38_Template, 5, 0, "a", 18);
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(39, DashboardProprietaireComponent_ng_template_39_Template, 8, 2, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
        } if (rf & 2) {
            const sellerAccessNotice_r2 = i0.ɵɵreference(40);
            i0.ɵɵadvance(17);
            i0.ɵɵtextInterpolate(ctx.animalsCount);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.pendingHealthValidationCount);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate((ctx.profile == null ? null : ctx.profile.role) || "N/A");
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngIf", ctx.canAccessSellerArea)("ngIfElse", sellerAccessNotice_r2);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("ngIf", ctx.canAccessHealthValidation);
        } }, dependencies: [i3.NgIf, i4.RouterLink], styles: ["[_nghost-%COMP%] {\r\n  display: block;\r\n}\r\n\r\n.dashboard-shell[_ngcontent-%COMP%] {\r\n  min-height: 100%;\r\n}\r\n\r\n.dashboard-hero[_ngcontent-%COMP%], \r\n.dashboard-card[_ngcontent-%COMP%], \r\n.dashboard-action[_ngcontent-%COMP%] {\r\n  border: 1px solid rgba(136, 19, 55, 0.12);\r\n  background: rgba(255, 250, 250, 0.92);\r\n  box-shadow: 0 20px 56px rgba(136, 19, 55, 0.08);\r\n}\r\n\r\n.dashboard-hero[_ngcontent-%COMP%] {\r\n  border-radius: 30px;\r\n  padding: 1.5rem;\r\n  background:\r\n    radial-gradient(circle at top right, rgba(244, 63, 94, 0.14), transparent 24%),\r\n    rgba(255, 250, 250, 0.96);\r\n}\r\n\r\n.dashboard-eyebrow[_ngcontent-%COMP%] {\r\n  margin: 0 0 0.4rem;\r\n  font-size: 0.72rem;\r\n  font-weight: 800;\r\n  letter-spacing: 0.18em;\r\n  text-transform: uppercase;\r\n  color: #be123c;\r\n}\r\n\r\n.dashboard-hero[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\r\n  margin: 0;\r\n  color: #611a24;\r\n  font-family: \"Trebuchet MS\", \"Segoe UI Variable\", sans-serif;\r\n}\r\n\r\n.dashboard-copy[_ngcontent-%COMP%] {\r\n  margin-top: 0.75rem;\r\n  color: #881337;\r\n  line-height: 1.65;\r\n  max-width: 60ch;\r\n}\r\n\r\n.dashboard-card[_ngcontent-%COMP%] {\r\n  border-radius: 24px;\r\n  padding: 1.15rem 1.2rem;\r\n}\r\n\r\n.dashboard-label[_ngcontent-%COMP%] {\r\n  display: block;\r\n  color: #9f1239;\r\n  font-size: 0.82rem;\r\n  font-weight: 700;\r\n  text-transform: uppercase;\r\n}\r\n\r\n.dashboard-value[_ngcontent-%COMP%] {\r\n  display: block;\r\n  margin-top: 0.45rem;\r\n  color: #611a24;\r\n  font-size: 2rem;\r\n  font-weight: 800;\r\n}\r\n\r\n.dashboard-value--small[_ngcontent-%COMP%] {\r\n  font-size: 1.2rem;\r\n}\r\n\r\n.dashboard-action[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 0.85rem;\r\n  border-radius: 24px;\r\n  padding: 1rem 1.1rem;\r\n  color: #611a24;\r\n}\r\n\r\n.dashboard-action--solid[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #be123c 0%, #e11d48 100%);\n  color: #fff;\n  border-color: transparent;\n}\n\n.dashboard-action--notice[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(135deg, rgba(253, 230, 138, 0.42) 0%, rgba(255, 248, 220, 0.9) 100%);\n  color: #78350f;\n}\n\n.dashboard-action--wide[_ngcontent-%COMP%] {\n  grid-column: 1 / -1;\n}\n\n.dashboard-action__copy[_ngcontent-%COMP%] {\n  margin: 0.3rem 0 0;\n  color: inherit;\n  line-height: 1.55;\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DashboardProprietaireComponent, [{
        type: Component,
        args: [{ selector: 'app-dashboard-proprietaire', standalone: false, template: "<section class=\"dashboard-shell max-w-7xl mx-auto py-8 px-4\">\r\n  <div class=\"dashboard-hero\">\r\n    <div>\r\n      <p class=\"dashboard-eyebrow\">Pilotage POC</p>\r\n      <h1>Tableau de bord du cheptel</h1>\r\n      <p class=\"dashboard-copy\">\r\n        Le suivi vendeur et la validation ANADER passent d\u00E9sormais par l'espace\r\n        <strong>animaux</strong>, centr\u00E9 sur le QR code, les pi\u00E8ces sanitaires\r\n        et la tra\u00E7abilit\u00E9.\r\n      </p>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"grid grid-cols-1 md:grid-cols-3 gap-6 mt-8\">\r\n    <article class=\"dashboard-card\">\r\n      <span class=\"dashboard-label\">Mes animaux</span>\r\n      <strong class=\"dashboard-value\">{{ animalsCount }}</strong>\r\n    </article>\r\n\r\n    <article class=\"dashboard-card\">\r\n      <span class=\"dashboard-label\">Validations en attente</span>\r\n      <strong class=\"dashboard-value\">{{ pendingHealthValidationCount }}</strong>\r\n    </article>\r\n\r\n    <article class=\"dashboard-card\">\r\n      <span class=\"dashboard-label\">R\u00F4le actif</span>\r\n      <strong class=\"dashboard-value dashboard-value--small\">{{ profile?.role || 'N/A' }}</strong>\r\n    </article>\r\n  </div>\r\n\r\n  <div class=\"mt-8\">\n    <h2 class=\"text-xl font-semibold text-[#611a24] mb-4\">Actions rapides</h2>\n    <div class=\"grid grid-cols-1 md:grid-cols-2 gap-4\">\n      <a\n        *ngIf=\"canAccessSellerArea; else sellerAccessNotice\"\n        routerLink=\"/animaux/creer\"\n        class=\"dashboard-action dashboard-action--solid\"\n      >\n        <svg class=\"w-6 h-6\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n          <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M12 4v16m8-8H4\" />\n        </svg>\n        <span class=\"font-medium\">Enregistrer un animal</span>\n      </a>\n\n      <a\n        routerLink=\"/animaux/mes-animaux\"\n        class=\"dashboard-action\"\n      >\r\n        <svg class=\"w-6 h-6\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\r\n          <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z\" />\r\n        </svg>\r\n        <span class=\"font-medium\">Voir mes animaux</span>\r\n      </a>\r\n\r\n      <a\r\n        *ngIf=\"canAccessHealthValidation\"\r\n        routerLink=\"/animaux/validation\"\r\n        class=\"dashboard-action dashboard-action--wide\"\r\n      >\r\n        <svg class=\"w-6 h-6\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\r\n          <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M9 12l2 2 4-4m5-2a9 9 0 11-18 0 9 9 0 0118 0z\" />\r\n        </svg>\r\n        <span class=\"font-medium\">Ouvrir la validation ANADER</span>\n      </a>\n    </div>\n  </div>\n</section>\n\n<ng-template #sellerAccessNotice>\n  <article class=\"dashboard-action dashboard-action--notice\">\n    <svg class=\"w-6 h-6\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n      <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V6m0 2v8m0 0v2\" />\n    </svg>\n    <div>\n      <span class=\"font-medium\">\n        {{ sellerRequestPending ? 'Demande vendeur en attente' : 'Acces vendeur requis' }}\n      </span>\n      <p class=\"dashboard-action__copy\">\n        {{ sellerRequestPending\n          ? 'Votre demande a bien ete transmise. Vous pourrez creer vos annonces apres validation par un administrateur.'\n          : 'Utilisez le menu Devenir vendeur pour envoyer votre demande avant de publier vos animaux.' }}\n      </p>\n    </div>\n  </article>\n</ng-template>\n", styles: [":host {\r\n  display: block;\r\n}\r\n\r\n.dashboard-shell {\r\n  min-height: 100%;\r\n}\r\n\r\n.dashboard-hero,\r\n.dashboard-card,\r\n.dashboard-action {\r\n  border: 1px solid rgba(136, 19, 55, 0.12);\r\n  background: rgba(255, 250, 250, 0.92);\r\n  box-shadow: 0 20px 56px rgba(136, 19, 55, 0.08);\r\n}\r\n\r\n.dashboard-hero {\r\n  border-radius: 30px;\r\n  padding: 1.5rem;\r\n  background:\r\n    radial-gradient(circle at top right, rgba(244, 63, 94, 0.14), transparent 24%),\r\n    rgba(255, 250, 250, 0.96);\r\n}\r\n\r\n.dashboard-eyebrow {\r\n  margin: 0 0 0.4rem;\r\n  font-size: 0.72rem;\r\n  font-weight: 800;\r\n  letter-spacing: 0.18em;\r\n  text-transform: uppercase;\r\n  color: #be123c;\r\n}\r\n\r\n.dashboard-hero h1 {\r\n  margin: 0;\r\n  color: #611a24;\r\n  font-family: \"Trebuchet MS\", \"Segoe UI Variable\", sans-serif;\r\n}\r\n\r\n.dashboard-copy {\r\n  margin-top: 0.75rem;\r\n  color: #881337;\r\n  line-height: 1.65;\r\n  max-width: 60ch;\r\n}\r\n\r\n.dashboard-card {\r\n  border-radius: 24px;\r\n  padding: 1.15rem 1.2rem;\r\n}\r\n\r\n.dashboard-label {\r\n  display: block;\r\n  color: #9f1239;\r\n  font-size: 0.82rem;\r\n  font-weight: 700;\r\n  text-transform: uppercase;\r\n}\r\n\r\n.dashboard-value {\r\n  display: block;\r\n  margin-top: 0.45rem;\r\n  color: #611a24;\r\n  font-size: 2rem;\r\n  font-weight: 800;\r\n}\r\n\r\n.dashboard-value--small {\r\n  font-size: 1.2rem;\r\n}\r\n\r\n.dashboard-action {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 0.85rem;\r\n  border-radius: 24px;\r\n  padding: 1rem 1.1rem;\r\n  color: #611a24;\r\n}\r\n\r\n.dashboard-action--solid {\n  background: linear-gradient(135deg, #be123c 0%, #e11d48 100%);\n  color: #fff;\n  border-color: transparent;\n}\n\n.dashboard-action--notice {\n  background:\n    linear-gradient(135deg, rgba(253, 230, 138, 0.42) 0%, rgba(255, 248, 220, 0.9) 100%);\n  color: #78350f;\n}\n\n.dashboard-action--wide {\n  grid-column: 1 / -1;\n}\n\n.dashboard-action__copy {\n  margin: 0.3rem 0 0;\n  color: inherit;\n  line-height: 1.55;\n}\n"] }]
    }], () => [{ type: i1.DashboardService }, { type: i2.AuthService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DashboardProprietaireComponent, { className: "DashboardProprietaireComponent", filePath: "src/app/features/profil/dashboard-proprietaire/dashboard-proprietaire.component.ts", lineNumber: 13 }); })();
//# sourceMappingURL=dashboard-proprietaire.component.js.map