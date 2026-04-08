import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../services/animal.service";
import * as i2 from "../../../core/services/auth.service";
import * as i3 from "@angular/common";
import * as i4 from "@angular/router";
function MesAnimauxComponent_a_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 13);
    i0.ɵɵtext(1, " Acc\u00E8s validation ANADER ");
    i0.ɵɵelementEnd();
} }
function MesAnimauxComponent_div_30_article_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 16)(1, "div", 17);
    i0.ɵɵelement(2, "img", 18);
    i0.ɵɵelementStart(3, "span", 19);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "div", 20)(6, "div", 21)(7, "div")(8, "p", 22);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "h2");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "div", 23);
    i0.ɵɵtext(13);
    i0.ɵɵpipe(14, "number");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "div", 24)(16, "div")(17, "span", 25);
    i0.ɵɵtext(18, "QR code");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "strong");
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(21, "div")(22, "span", 25);
    i0.ɵɵtext(23, "Lieu");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "strong");
    i0.ɵɵtext(25);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(26, "div")(27, "span", 25);
    i0.ɵɵtext(28, "Quantit\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "strong");
    i0.ɵɵtext(30);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(31, "div")(32, "span", 25);
    i0.ɵɵtext(33, "Sanitaire");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "strong");
    i0.ɵɵtext(35);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(36, "div", 26)(37, "div", 27)(38, "span");
    i0.ɵɵtext(39, "Documents charg\u00E9s");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "strong");
    i0.ɵɵtext(41);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(42, "div", 27)(43, "span");
    i0.ɵɵtext(44, "Dernier \u00E9v\u00E9nement");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(45, "strong");
    i0.ɵɵtext(46);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(47, "div", 27)(48, "span");
    i0.ɵɵtext(49, "Contact vendeur");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "strong");
    i0.ɵɵtext(51);
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const animal_r1 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("src", ctx_r1.coverOf(animal_r1), i0.ɵɵsanitizeUrl)("alt", animal_r1.displayName);
    i0.ɵɵadvance();
    i0.ɵɵattribute("data-status", animal_r1.status);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(animal_r1.status);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(animal_r1.type);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(animal_r1.displayName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(14, 14, animal_r1.price, "1.0-0"), " FCFA");
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(animal_r1.qrCode);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(animal_r1.lieuNaissance || "Non renseign\u00E9");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("", animal_r1.quantity, " t\u00EAte(s)");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.healthStateLabel(animal_r1));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(animal_r1.healthRecords.length);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate((animal_r1.history[0] == null ? null : animal_r1.history[0].eventType) || "ENREGISTREMENT");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(animal_r1.sellerEmail);
} }
function MesAnimauxComponent_div_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14);
    i0.ɵɵtemplate(1, MesAnimauxComponent_div_30_article_1_Template, 52, 17, "article", 15);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.animals);
} }
function MesAnimauxComponent_ng_template_31_p_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1, "Chargement de vos animaux...");
    i0.ɵɵelementEnd();
} }
function MesAnimauxComponent_ng_template_31_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "h2");
    i0.ɵɵtext(2, "Aucun animal enregistr\u00E9 pour le moment");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4, " Lancez l'enregistrement vendeur pour cr\u00E9er votre premier animal, ajouter ses pi\u00E8ces et pr\u00E9parer sa validation sanitaire. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "a", 6);
    i0.ɵɵtext(6, "Commencer l'enregistrement");
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} }
function MesAnimauxComponent_ng_template_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 28);
    i0.ɵɵtemplate(1, MesAnimauxComponent_ng_template_31_p_1_Template, 2, 0, "p", 29)(2, MesAnimauxComponent_ng_template_31_ng_container_2_Template, 7, 0, "ng-container", 29);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.loading);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.loading);
} }
export class MesAnimauxComponent {
    constructor(animalService, auth) {
        this.animalService = animalService;
        this.auth = auth;
        this.animals = [];
        this.loading = true;
    }
    ngOnInit() {
        this.animalService.mine().subscribe({
            next: (animals) => {
                this.animals = animals;
                this.loading = false;
            },
            error: () => {
                this.loading = false;
            },
        });
    }
    coverOf(animal) {
        return animal.photos[0] || 'https://placehold.co/1200x900/e8ddcf/6a4a2f?text=Betail';
    }
    get pendingCount() {
        return this.animals.filter((animal) => animal.status === 'INDISPONIBLE').length;
    }
    get availableCount() {
        return this.animals.filter((animal) => animal.status === 'DISPONIBLE').length;
    }
    get canAccessHealthValidation() {
        return this.auth.canAccessHealthValidation;
    }
    healthStateLabel(animal) {
        const latestRecord = animal.healthRecords[0];
        if (!latestRecord) {
            return 'Aucun document sanitaire';
        }
        return latestRecord.validationStatus.replace(/_/g, ' ');
    }
    static { this.ɵfac = function MesAnimauxComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || MesAnimauxComponent)(i0.ɵɵdirectiveInject(i1.AnimalService), i0.ɵɵdirectiveInject(i2.AuthService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: MesAnimauxComponent, selectors: [["app-mes-animaux"]], standalone: false, decls: 33, vars: 6, consts: [["emptyState", ""], [1, "animals-shell", "py-8", "px-4", "lg:px-8"], [1, "max-w-7xl", "mx-auto"], [1, "animals-hero", "mb-8"], [1, "eyebrow"], [1, "hero-actions"], ["routerLink", "/animaux/creer", 1, "hero-cta", "hero-cta--solid"], ["routerLink", "/animaux/validation", "class", "hero-cta", 4, "ngIf"], [1, "metric-strip", "mb-8"], [1, "metric-panel"], [1, "metric-value"], [1, "metric-label"], ["class", "grid grid-cols-1 xl:grid-cols-2 gap-6", 4, "ngIf", "ngIfElse"], ["routerLink", "/animaux/validation", 1, "hero-cta"], [1, "grid", "grid-cols-1", "xl:grid-cols-2", "gap-6"], ["class", "animal-card", 4, "ngFor", "ngForOf"], [1, "animal-card"], [1, "animal-media"], [3, "src", "alt"], [1, "status-pill"], [1, "animal-content"], [1, "animal-topline"], [1, "animal-type"], [1, "price-chip"], [1, "detail-grid"], [1, "detail-label"], [1, "health-block"], [1, "health-line"], [1, "empty-card"], [4, "ngIf"]], template: function MesAnimauxComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 1)(1, "div", 2)(2, "div", 3)(3, "div")(4, "p", 4);
            i0.ɵɵtext(5, "Suivi vendeur");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "h1");
            i0.ɵɵtext(7, "Mon cheptel digitalis\u00E9");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "p");
            i0.ɵɵtext(9, " Retrouvez les animaux rattach\u00E9s \u00E0 votre compte, leur QR code, leur statut de disponibilit\u00E9 et l'\u00E9tat du dossier sanitaire. ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(10, "div", 5)(11, "a", 6);
            i0.ɵɵtext(12, "Ajouter un animal");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(13, MesAnimauxComponent_a_13_Template, 2, 0, "a", 7);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(14, "div", 8)(15, "article", 9)(16, "span", 10);
            i0.ɵɵtext(17);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "span", 11);
            i0.ɵɵtext(19, "Animaux rattach\u00E9s");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(20, "article", 9)(21, "span", 10);
            i0.ɵɵtext(22);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "span", 11);
            i0.ɵɵtext(24, "En attente de validation");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(25, "article", 9)(26, "span", 10);
            i0.ɵɵtext(27);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "span", 11);
            i0.ɵɵtext(29, "Disponibles apr\u00E8s validation");
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(30, MesAnimauxComponent_div_30_Template, 2, 1, "div", 12)(31, MesAnimauxComponent_ng_template_31_Template, 3, 2, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            const emptyState_r3 = i0.ɵɵreference(32);
            i0.ɵɵadvance(13);
            i0.ɵɵproperty("ngIf", ctx.canAccessHealthValidation);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(ctx.animals.length);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.pendingCount);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.availableCount);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", !ctx.loading && ctx.animals.length)("ngIfElse", emptyState_r3);
        } }, dependencies: [i3.NgForOf, i3.NgIf, i4.RouterLink, i3.DecimalPipe], styles: ["[_nghost-%COMP%] {\r\n  display: block;\r\n}\r\n\r\n.animals-shell[_ngcontent-%COMP%] {\r\n  min-height: 100%;\r\n  background:\r\n    radial-gradient(circle at top right, rgba(244, 63, 94, 0.16), transparent 24%),\r\n    linear-gradient(180deg, #fff7f7 0%, #fff1f2 100%);\r\n}\r\n\r\n.animals-hero[_ngcontent-%COMP%], \r\n.metric-panel[_ngcontent-%COMP%], \r\n.animal-card[_ngcontent-%COMP%], \r\n.empty-card[_ngcontent-%COMP%] {\r\n  border: 1px solid rgba(136, 19, 55, 0.12);\r\n  background: rgba(255, 250, 250, 0.92);\r\n  box-shadow: 0 20px 64px rgba(136, 19, 55, 0.08);\r\n}\r\n\r\n.animals-hero[_ngcontent-%COMP%], \r\n.empty-card[_ngcontent-%COMP%] {\r\n  border-radius: 30px;\r\n  padding: 1.5rem;\r\n}\r\n\r\n.animals-hero[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  gap: 1rem;\r\n  align-items: center;\r\n}\r\n\r\n.eyebrow[_ngcontent-%COMP%] {\r\n  margin: 0 0 0.45rem;\r\n  font-size: 0.72rem;\r\n  font-weight: 800;\r\n  letter-spacing: 0.18em;\r\n  text-transform: uppercase;\r\n  color: #be123c;\r\n}\r\n\r\n.animals-hero[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], \r\n.animal-content[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], \r\n.empty-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\r\n  margin: 0;\r\n  color: #611a24;\r\n  font-family: \"Trebuchet MS\", \"Segoe UI Variable\", sans-serif;\r\n}\r\n\r\n.animals-hero[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \r\n.empty-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\r\n  color: #881337;\r\n  line-height: 1.65;\r\n}\r\n\r\n.hero-actions[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  gap: 0.75rem;\r\n  flex-wrap: wrap;\r\n}\r\n\r\n.hero-cta[_ngcontent-%COMP%] {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  border-radius: 999px;\r\n  padding: 0.85rem 1.1rem;\r\n  border: 1px solid rgba(190, 24, 93, 0.14);\r\n  background: #fff;\r\n  color: #611a24;\r\n  font-weight: 700;\r\n}\r\n\r\n.hero-cta--solid[_ngcontent-%COMP%] {\r\n  background: linear-gradient(135deg, #be123c 0%, #e11d48 100%);\r\n  color: #fff;\r\n  border-color: transparent;\r\n}\r\n\r\n.metric-strip[_ngcontent-%COMP%] {\r\n  display: grid;\r\n  grid-template-columns: repeat(3, minmax(0, 1fr));\r\n  gap: 1rem;\r\n}\r\n\r\n.metric-panel[_ngcontent-%COMP%] {\r\n  border-radius: 24px;\r\n  padding: 1.15rem 1.2rem;\r\n}\r\n\r\n.metric-value[_ngcontent-%COMP%] {\r\n  display: block;\r\n  color: #9f1239;\r\n  font-size: 1.9rem;\r\n  font-weight: 800;\r\n}\r\n\r\n.metric-label[_ngcontent-%COMP%] {\r\n  display: block;\r\n  margin-top: 0.3rem;\r\n  color: #881337;\r\n}\r\n\r\n.animal-card[_ngcontent-%COMP%] {\r\n  border-radius: 30px;\r\n  overflow: hidden;\r\n  display: grid;\r\n  grid-template-columns: 0.92fr 1.08fr;\r\n}\r\n\r\n.animal-media[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  min-height: 100%;\r\n  background: #ffe4e6;\r\n}\r\n\r\n.animal-media[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  height: 100%;\r\n  min-height: 100%;\r\n  object-fit: cover;\r\n}\r\n\r\n.status-pill[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  top: 1rem;\r\n  left: 1rem;\r\n  padding: 0.45rem 0.8rem;\r\n  border-radius: 999px;\r\n  background: rgba(136, 19, 55, 0.88);\r\n  color: #fff;\r\n  font-size: 0.78rem;\r\n  font-weight: 800;\r\n}\r\n\r\n.status-pill[data-status='DISPONIBLE'][_ngcontent-%COMP%] {\r\n  background: rgba(22, 101, 52, 0.9);\r\n}\r\n\r\n.status-pill[data-status='INDISPONIBLE'][_ngcontent-%COMP%] {\r\n  background: rgba(225, 29, 72, 0.92);\r\n}\r\n\r\n.animal-content[_ngcontent-%COMP%] {\r\n  padding: 1.4rem;\r\n}\r\n\r\n.animal-topline[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  gap: 1rem;\r\n  align-items: flex-start;\r\n}\r\n\r\n.animal-type[_ngcontent-%COMP%] {\r\n  margin: 0 0 0.3rem;\r\n  color: #be123c;\r\n  font-size: 0.78rem;\r\n  font-weight: 800;\r\n  letter-spacing: 0.16em;\r\n}\r\n\r\n.price-chip[_ngcontent-%COMP%] {\r\n  white-space: nowrap;\r\n  border-radius: 999px;\r\n  padding: 0.65rem 0.9rem;\r\n  background: #ffe4e6;\r\n  color: #9f1239;\r\n  font-weight: 800;\r\n}\r\n\r\n.detail-grid[_ngcontent-%COMP%] {\r\n  display: grid;\r\n  grid-template-columns: repeat(2, minmax(0, 1fr));\r\n  gap: 1rem;\r\n  margin-top: 1.35rem;\r\n}\r\n\r\n.detail-label[_ngcontent-%COMP%] {\r\n  display: block;\r\n  margin-bottom: 0.3rem;\r\n  color: #9f1239;\r\n  font-size: 0.76rem;\r\n  font-weight: 700;\r\n  text-transform: uppercase;\r\n}\r\n\r\n.detail-grid[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \r\n.health-line[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\r\n  color: #611a24;\r\n}\r\n\r\n.health-block[_ngcontent-%COMP%] {\r\n  margin-top: 1.35rem;\r\n  border-radius: 22px;\r\n  background: rgba(255, 241, 242, 0.9);\r\n  padding: 1rem;\r\n  display: grid;\r\n  gap: 0.75rem;\r\n}\r\n\r\n.health-line[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  gap: 1rem;\r\n  color: #881337;\r\n}\r\n\r\n.empty-card[_ngcontent-%COMP%] {\r\n  text-align: center;\r\n}\r\n\r\n@media (max-width: 1023px) {\r\n  .animals-hero[_ngcontent-%COMP%], \r\n   .animal-card[_ngcontent-%COMP%] {\r\n    grid-template-columns: 1fr;\r\n  }\r\n\r\n  .animals-hero[_ngcontent-%COMP%] {\r\n    align-items: flex-start;\r\n  }\r\n}\r\n\r\n@media (max-width: 767px) {\r\n  .metric-strip[_ngcontent-%COMP%], \r\n   .detail-grid[_ngcontent-%COMP%] {\r\n    grid-template-columns: 1fr;\r\n  }\r\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MesAnimauxComponent, [{
        type: Component,
        args: [{ selector: 'app-mes-animaux', standalone: false, template: "<section class=\"animals-shell py-8 px-4 lg:px-8\">\r\n  <div class=\"max-w-7xl mx-auto\">\r\n    <div class=\"animals-hero mb-8\">\r\n      <div>\r\n        <p class=\"eyebrow\">Suivi vendeur</p>\r\n        <h1>Mon cheptel digitalis\u00E9</h1>\r\n        <p>\r\n          Retrouvez les animaux rattach\u00E9s \u00E0 votre compte, leur QR code,\r\n          leur statut de disponibilit\u00E9 et l'\u00E9tat du dossier sanitaire.\r\n        </p>\r\n      </div>\r\n\r\n      <div class=\"hero-actions\">\r\n        <a routerLink=\"/animaux/creer\" class=\"hero-cta hero-cta--solid\">Ajouter un animal</a>\r\n        <a *ngIf=\"canAccessHealthValidation\" routerLink=\"/animaux/validation\" class=\"hero-cta\">\r\n          Acc\u00E8s validation ANADER\r\n        </a>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"metric-strip mb-8\">\r\n      <article class=\"metric-panel\">\r\n        <span class=\"metric-value\">{{ animals.length }}</span>\r\n        <span class=\"metric-label\">Animaux rattach\u00E9s</span>\r\n      </article>\r\n      <article class=\"metric-panel\">\r\n        <span class=\"metric-value\">{{ pendingCount }}</span>\r\n        <span class=\"metric-label\">En attente de validation</span>\r\n      </article>\r\n      <article class=\"metric-panel\">\r\n        <span class=\"metric-value\">{{ availableCount }}</span>\r\n        <span class=\"metric-label\">Disponibles apr\u00E8s validation</span>\r\n      </article>\r\n    </div>\r\n\r\n    <div *ngIf=\"!loading && animals.length; else emptyState\" class=\"grid grid-cols-1 xl:grid-cols-2 gap-6\">\r\n      <article *ngFor=\"let animal of animals\" class=\"animal-card\">\r\n        <div class=\"animal-media\">\r\n          <img [src]=\"coverOf(animal)\" [alt]=\"animal.displayName\" />\r\n          <span class=\"status-pill\" [attr.data-status]=\"animal.status\">{{ animal.status }}</span>\r\n        </div>\r\n\r\n        <div class=\"animal-content\">\r\n          <div class=\"animal-topline\">\r\n            <div>\r\n              <p class=\"animal-type\">{{ animal.type }}</p>\r\n              <h2>{{ animal.displayName }}</h2>\r\n            </div>\r\n            <div class=\"price-chip\">{{ animal.price | number: '1.0-0' }} FCFA</div>\r\n          </div>\r\n\r\n          <div class=\"detail-grid\">\r\n            <div>\r\n              <span class=\"detail-label\">QR code</span>\r\n              <strong>{{ animal.qrCode }}</strong>\r\n            </div>\r\n            <div>\r\n              <span class=\"detail-label\">Lieu</span>\r\n              <strong>{{ animal.lieuNaissance || 'Non renseign\u00E9' }}</strong>\r\n            </div>\r\n            <div>\r\n              <span class=\"detail-label\">Quantit\u00E9</span>\r\n              <strong>{{ animal.quantity }} t\u00EAte(s)</strong>\r\n            </div>\r\n            <div>\r\n              <span class=\"detail-label\">Sanitaire</span>\r\n              <strong>{{ healthStateLabel(animal) }}</strong>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"health-block\">\r\n            <div class=\"health-line\">\r\n              <span>Documents charg\u00E9s</span>\r\n              <strong>{{ animal.healthRecords.length }}</strong>\r\n            </div>\r\n            <div class=\"health-line\">\r\n              <span>Dernier \u00E9v\u00E9nement</span>\r\n              <strong>{{ animal.history[0]?.eventType || 'ENREGISTREMENT' }}</strong>\r\n            </div>\r\n            <div class=\"health-line\">\r\n              <span>Contact vendeur</span>\r\n              <strong>{{ animal.sellerEmail }}</strong>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </article>\r\n    </div>\r\n\r\n    <ng-template #emptyState>\r\n      <div class=\"empty-card\">\r\n        <p *ngIf=\"loading\">Chargement de vos animaux...</p>\r\n        <ng-container *ngIf=\"!loading\">\r\n          <h2>Aucun animal enregistr\u00E9 pour le moment</h2>\r\n          <p>\r\n            Lancez l'enregistrement vendeur pour cr\u00E9er votre premier animal,\r\n            ajouter ses pi\u00E8ces et pr\u00E9parer sa validation sanitaire.\r\n          </p>\r\n          <a routerLink=\"/animaux/creer\" class=\"hero-cta hero-cta--solid\">Commencer l'enregistrement</a>\r\n        </ng-container>\r\n      </div>\r\n    </ng-template>\r\n  </div>\r\n</section>\r\n", styles: [":host {\r\n  display: block;\r\n}\r\n\r\n.animals-shell {\r\n  min-height: 100%;\r\n  background:\r\n    radial-gradient(circle at top right, rgba(244, 63, 94, 0.16), transparent 24%),\r\n    linear-gradient(180deg, #fff7f7 0%, #fff1f2 100%);\r\n}\r\n\r\n.animals-hero,\r\n.metric-panel,\r\n.animal-card,\r\n.empty-card {\r\n  border: 1px solid rgba(136, 19, 55, 0.12);\r\n  background: rgba(255, 250, 250, 0.92);\r\n  box-shadow: 0 20px 64px rgba(136, 19, 55, 0.08);\r\n}\r\n\r\n.animals-hero,\r\n.empty-card {\r\n  border-radius: 30px;\r\n  padding: 1.5rem;\r\n}\r\n\r\n.animals-hero {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  gap: 1rem;\r\n  align-items: center;\r\n}\r\n\r\n.eyebrow {\r\n  margin: 0 0 0.45rem;\r\n  font-size: 0.72rem;\r\n  font-weight: 800;\r\n  letter-spacing: 0.18em;\r\n  text-transform: uppercase;\r\n  color: #be123c;\r\n}\r\n\r\n.animals-hero h1,\r\n.animal-content h2,\r\n.empty-card h2 {\r\n  margin: 0;\r\n  color: #611a24;\r\n  font-family: \"Trebuchet MS\", \"Segoe UI Variable\", sans-serif;\r\n}\r\n\r\n.animals-hero p,\r\n.empty-card p {\r\n  color: #881337;\r\n  line-height: 1.65;\r\n}\r\n\r\n.hero-actions {\r\n  display: flex;\r\n  gap: 0.75rem;\r\n  flex-wrap: wrap;\r\n}\r\n\r\n.hero-cta {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  border-radius: 999px;\r\n  padding: 0.85rem 1.1rem;\r\n  border: 1px solid rgba(190, 24, 93, 0.14);\r\n  background: #fff;\r\n  color: #611a24;\r\n  font-weight: 700;\r\n}\r\n\r\n.hero-cta--solid {\r\n  background: linear-gradient(135deg, #be123c 0%, #e11d48 100%);\r\n  color: #fff;\r\n  border-color: transparent;\r\n}\r\n\r\n.metric-strip {\r\n  display: grid;\r\n  grid-template-columns: repeat(3, minmax(0, 1fr));\r\n  gap: 1rem;\r\n}\r\n\r\n.metric-panel {\r\n  border-radius: 24px;\r\n  padding: 1.15rem 1.2rem;\r\n}\r\n\r\n.metric-value {\r\n  display: block;\r\n  color: #9f1239;\r\n  font-size: 1.9rem;\r\n  font-weight: 800;\r\n}\r\n\r\n.metric-label {\r\n  display: block;\r\n  margin-top: 0.3rem;\r\n  color: #881337;\r\n}\r\n\r\n.animal-card {\r\n  border-radius: 30px;\r\n  overflow: hidden;\r\n  display: grid;\r\n  grid-template-columns: 0.92fr 1.08fr;\r\n}\r\n\r\n.animal-media {\r\n  position: relative;\r\n  min-height: 100%;\r\n  background: #ffe4e6;\r\n}\r\n\r\n.animal-media img {\r\n  width: 100%;\r\n  height: 100%;\r\n  min-height: 100%;\r\n  object-fit: cover;\r\n}\r\n\r\n.status-pill {\r\n  position: absolute;\r\n  top: 1rem;\r\n  left: 1rem;\r\n  padding: 0.45rem 0.8rem;\r\n  border-radius: 999px;\r\n  background: rgba(136, 19, 55, 0.88);\r\n  color: #fff;\r\n  font-size: 0.78rem;\r\n  font-weight: 800;\r\n}\r\n\r\n.status-pill[data-status='DISPONIBLE'] {\r\n  background: rgba(22, 101, 52, 0.9);\r\n}\r\n\r\n.status-pill[data-status='INDISPONIBLE'] {\r\n  background: rgba(225, 29, 72, 0.92);\r\n}\r\n\r\n.animal-content {\r\n  padding: 1.4rem;\r\n}\r\n\r\n.animal-topline {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  gap: 1rem;\r\n  align-items: flex-start;\r\n}\r\n\r\n.animal-type {\r\n  margin: 0 0 0.3rem;\r\n  color: #be123c;\r\n  font-size: 0.78rem;\r\n  font-weight: 800;\r\n  letter-spacing: 0.16em;\r\n}\r\n\r\n.price-chip {\r\n  white-space: nowrap;\r\n  border-radius: 999px;\r\n  padding: 0.65rem 0.9rem;\r\n  background: #ffe4e6;\r\n  color: #9f1239;\r\n  font-weight: 800;\r\n}\r\n\r\n.detail-grid {\r\n  display: grid;\r\n  grid-template-columns: repeat(2, minmax(0, 1fr));\r\n  gap: 1rem;\r\n  margin-top: 1.35rem;\r\n}\r\n\r\n.detail-label {\r\n  display: block;\r\n  margin-bottom: 0.3rem;\r\n  color: #9f1239;\r\n  font-size: 0.76rem;\r\n  font-weight: 700;\r\n  text-transform: uppercase;\r\n}\r\n\r\n.detail-grid strong,\r\n.health-line strong {\r\n  color: #611a24;\r\n}\r\n\r\n.health-block {\r\n  margin-top: 1.35rem;\r\n  border-radius: 22px;\r\n  background: rgba(255, 241, 242, 0.9);\r\n  padding: 1rem;\r\n  display: grid;\r\n  gap: 0.75rem;\r\n}\r\n\r\n.health-line {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  gap: 1rem;\r\n  color: #881337;\r\n}\r\n\r\n.empty-card {\r\n  text-align: center;\r\n}\r\n\r\n@media (max-width: 1023px) {\r\n  .animals-hero,\r\n  .animal-card {\r\n    grid-template-columns: 1fr;\r\n  }\r\n\r\n  .animals-hero {\r\n    align-items: flex-start;\r\n  }\r\n}\r\n\r\n@media (max-width: 767px) {\r\n  .metric-strip,\r\n  .detail-grid {\r\n    grid-template-columns: 1fr;\r\n  }\r\n}\r\n"] }]
    }], () => [{ type: i1.AnimalService }, { type: i2.AuthService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(MesAnimauxComponent, { className: "MesAnimauxComponent", filePath: "src/app/features/animaux/mes-animaux/mes-animaux.component.ts", lineNumber: 12 }); })();
//# sourceMappingURL=mes-animaux.component.js.map