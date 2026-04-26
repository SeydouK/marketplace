import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./services/admin.service";
import * as i2 from "../../core/services/toast.service";
import * as i3 from "@angular/common";
function AdminHomeComponent_div_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 11);
    i0.ɵɵtext(1, " Chargement des demandes vendeur... ");
    i0.ɵɵelementEnd();
} }
function AdminHomeComponent_div_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 12);
    i0.ɵɵtext(1, " Aucune demande vendeur en attente pour le moment. ");
    i0.ɵɵelementEnd();
} }
function AdminHomeComponent_div_28_article_1_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 15)(1, "div", 16)(2, "div")(3, "h3");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "span", 17);
    i0.ɵɵtext(8, "Demande ouverte");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "dl", 18)(10, "div")(11, "dt");
    i0.ɵɵtext(12, "R\u00F4le actuel");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "dd");
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "div")(16, "dt");
    i0.ɵɵtext(17, "Email v\u00E9rifi\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "dd");
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "div")(21, "dt");
    i0.ɵɵtext(22, "KYC");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "dd");
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(25, "div")(26, "dt");
    i0.ɵɵtext(27, "Derni\u00E8re mise \u00E0 jour");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "dd");
    i0.ɵɵtext(29);
    i0.ɵɵpipe(30, "date");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(31, "button", 19);
    i0.ɵɵlistener("click", function AdminHomeComponent_div_28_article_1_Template_button_click_31_listener() { const request_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.approve(request_r2)); });
    i0.ɵɵtext(32);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const request_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate2("", request_r2.name, " ", request_r2.surname);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(request_r2.email);
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(request_r2.role);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(request_r2.emailVerified ? "Oui" : "Non");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(request_r2.kycStatus || "N/A");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(30, 9, request_r2.updatedAt, "short"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r2.approvingRequestId === request_r2.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r2.approvingRequestId === request_r2.id ? "Validation..." : "Approuver et passer VENDEUR", " ");
} }
function AdminHomeComponent_div_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 13);
    i0.ɵɵtemplate(1, AdminHomeComponent_div_28_article_1_Template, 33, 12, "article", 14);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.sellerRequests)("ngForTrackBy", ctx_r2.trackByRequestId);
} }
export class AdminHomeComponent {
    constructor(adminService, toast) {
        this.adminService = adminService;
        this.toast = toast;
        this.sellerRequests = [];
        this.loading = false;
        this.approvingRequestId = null;
    }
    ngOnInit() {
        this.loadSellerRequests();
    }
    loadSellerRequests() {
        this.loading = true;
        this.adminService.listSellerRequests().subscribe({
            next: (requests) => {
                this.sellerRequests = requests;
                this.loading = false;
            },
            error: () => {
                this.loading = false;
            },
        });
    }
    approve(request) {
        if (this.approvingRequestId !== null) {
            return;
        }
        this.approvingRequestId = request.id;
        this.adminService.approveSellerRequest(request.id).subscribe({
            next: () => {
                this.sellerRequests = this.sellerRequests.filter((item) => item.id !== request.id);
                this.approvingRequestId = null;
                this.toast.success(`${request.name} ${request.surname} est maintenant vendeur.`);
            },
            error: () => {
                this.approvingRequestId = null;
            },
        });
    }
    trackByRequestId(_, request) {
        return request.id;
    }
    get pendingCount() {
        return this.sellerRequests.length;
    }
    static { this.ɵfac = function AdminHomeComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AdminHomeComponent)(i0.ɵɵdirectiveInject(i1.AdminService), i0.ɵɵdirectiveInject(i2.ToastService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AdminHomeComponent, selectors: [["app-admin-home"]], standalone: false, decls: 29, vars: 6, consts: [[1, "admin-shell", "max-w-7xl", "mx-auto", "py-8", "px-4"], [1, "admin-hero"], [1, "admin-eyebrow"], [1, "admin-copy"], [1, "admin-pill"], [1, "admin-panel", "mt-8"], [1, "admin-panel__header"], ["type", "button", 1, "admin-refresh", 3, "click", "disabled"], ["class", "admin-state", 4, "ngIf"], ["class", "admin-state admin-state--empty", 4, "ngIf"], ["class", "admin-grid", 4, "ngIf"], [1, "admin-state"], [1, "admin-state", "admin-state--empty"], [1, "admin-grid"], ["class", "admin-card", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "admin-card"], [1, "admin-card__header"], [1, "admin-status"], [1, "admin-meta"], ["type", "button", 1, "admin-approve", 3, "click", "disabled"]], template: function AdminHomeComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "div", 1)(2, "div")(3, "p", 2);
            i0.ɵɵtext(4, "Administration");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "h1");
            i0.ɵɵtext(6, "Demandes de passage vendeur");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "p", 3);
            i0.ɵɵtext(8, " Validez ici les utilisateurs qui ont demand\u00E9 l'acc\u00E8s vendeur. L'approbation fait passer le compte au r\u00F4le ");
            i0.ɵɵelementStart(9, "strong");
            i0.ɵɵtext(10, "VENDEUR");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(11, " et retire la demande en attente. ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(12, "div", 4)(13, "span");
            i0.ɵɵtext(14, "Demandes en attente");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "strong");
            i0.ɵɵtext(16);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(17, "div", 5)(18, "div", 6)(19, "div")(20, "h2");
            i0.ɵɵtext(21, "File d'approbation");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "p");
            i0.ɵɵtext(23, "Les demandes les plus r\u00E9centes apparaissent en premier.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(24, "button", 7);
            i0.ɵɵlistener("click", function AdminHomeComponent_Template_button_click_24_listener() { return ctx.loadSellerRequests(); });
            i0.ɵɵtext(25);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(26, AdminHomeComponent_div_26_Template, 2, 0, "div", 8)(27, AdminHomeComponent_div_27_Template, 2, 0, "div", 9)(28, AdminHomeComponent_div_28_Template, 2, 2, "div", 10);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(16);
            i0.ɵɵtextInterpolate(ctx.pendingCount);
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("disabled", ctx.loading);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.loading ? "Actualisation..." : "Actualiser", " ");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.loading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && !ctx.sellerRequests.length);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && ctx.sellerRequests.length);
        } }, dependencies: [i3.NgForOf, i3.NgIf, i3.DatePipe], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n\n.admin-shell[_ngcontent-%COMP%] {\n  min-height: 100%;\n}\n\n.admin-hero[_ngcontent-%COMP%], \n.admin-panel[_ngcontent-%COMP%], \n.admin-card[_ngcontent-%COMP%] {\n  border: 1px solid rgba(136, 19, 55, 0.12);\n  background: rgba(255, 250, 250, 0.94);\n  box-shadow: 0 20px 56px rgba(136, 19, 55, 0.08);\n}\n\n.admin-hero[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 1rem;\n  align-items: flex-start;\n  padding: 1.5rem;\n  border-radius: 30px;\n  background:\n    radial-gradient(circle at top right, rgba(244, 63, 94, 0.15), transparent 24%),\n    rgba(255, 250, 250, 0.96);\n}\n\n.admin-eyebrow[_ngcontent-%COMP%] {\n  margin: 0 0 0.4rem;\n  font-size: 0.72rem;\n  font-weight: 800;\n  letter-spacing: 0.18em;\n  text-transform: uppercase;\n  color: #be123c;\n}\n\n.admin-hero[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #611a24;\n  font-family: \"Trebuchet MS\", \"Segoe UI Variable\", sans-serif;\n}\n\n.admin-copy[_ngcontent-%COMP%] {\n  margin-top: 0.75rem;\n  max-width: 68ch;\n  color: #881337;\n  line-height: 1.65;\n}\n\n.admin-pill[_ngcontent-%COMP%] {\n  min-width: 12rem;\n  padding: 1rem 1.15rem;\n  border-radius: 24px;\n  background: linear-gradient(135deg, #611a24 0%, #9f1239 100%);\n  color: #fff;\n}\n\n.admin-pill[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.82rem;\n  opacity: 0.88;\n}\n\n.admin-pill[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 0.4rem;\n  font-size: 2rem;\n  font-weight: 800;\n}\n\n.admin-panel[_ngcontent-%COMP%] {\n  padding: 1.35rem;\n  border-radius: 28px;\n}\n\n.admin-panel__header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 1rem;\n  align-items: center;\n}\n\n.admin-panel__header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #611a24;\n  font-size: 1.2rem;\n  font-weight: 800;\n}\n\n.admin-panel__header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.3rem 0 0;\n  color: #9f1239;\n}\n\n.admin-refresh[_ngcontent-%COMP%], \n.admin-approve[_ngcontent-%COMP%] {\n  border: 0;\n  border-radius: 999px;\n  padding: 0.85rem 1rem;\n  font-weight: 700;\n}\n\n.admin-refresh[_ngcontent-%COMP%] {\n  background: #fdf2f8;\n  color: #9d174d;\n}\n\n.admin-state[_ngcontent-%COMP%] {\n  margin-top: 1.25rem;\n  padding: 1.2rem;\n  border-radius: 22px;\n  background: #fff;\n  color: #7f1d1d;\n}\n\n.admin-state--empty[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, rgba(240, 253, 244, 0.95) 0%, rgba(255, 255, 255, 0.92) 100%);\n  color: #166534;\n}\n\n.admin-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 1rem;\n  margin-top: 1.25rem;\n}\n\n.admin-card[_ngcontent-%COMP%] {\n  padding: 1.15rem;\n  border-radius: 24px;\n}\n\n.admin-card__header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 1rem;\n  align-items: flex-start;\n}\n\n.admin-card__header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #611a24;\n  font-size: 1.05rem;\n  font-weight: 800;\n}\n\n.admin-card__header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.3rem 0 0;\n  color: #9f1239;\n  word-break: break-word;\n}\n\n.admin-status[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.35rem 0.7rem;\n  border-radius: 999px;\n  background: #fef3c7;\n  color: #92400e;\n  font-size: 0.75rem;\n  font-weight: 700;\n}\n\n.admin-meta[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0.9rem;\n  margin: 1rem 0 1.15rem;\n}\n\n.admin-meta[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n  color: #9f1239;\n  font-size: 0.78rem;\n  font-weight: 700;\n  text-transform: uppercase;\n}\n\n.admin-meta[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n  margin: 0.22rem 0 0;\n  color: #611a24;\n  font-weight: 700;\n}\n\n.admin-approve[_ngcontent-%COMP%] {\n  width: 100%;\n  background: linear-gradient(135deg, #be123c 0%, #e11d48 100%);\n  color: #fff;\n}\n\n.admin-refresh[_ngcontent-%COMP%]:disabled, \n.admin-approve[_ngcontent-%COMP%]:disabled {\n  opacity: 0.65;\n  cursor: not-allowed;\n}\n\n@media (max-width: 768px) {\n  .admin-hero[_ngcontent-%COMP%], \n   .admin-panel__header[_ngcontent-%COMP%], \n   .admin-card__header[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n\n  .admin-pill[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n\n  .admin-meta[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AdminHomeComponent, [{
        type: Component,
        args: [{ selector: 'app-admin-home', standalone: false, template: "<section class=\"admin-shell max-w-7xl mx-auto py-8 px-4\">\n  <div class=\"admin-hero\">\n    <div>\n      <p class=\"admin-eyebrow\">Administration</p>\n      <h1>Demandes de passage vendeur</h1>\n      <p class=\"admin-copy\">\n        Validez ici les utilisateurs qui ont demand&eacute; l'acc&egrave;s vendeur. L'approbation fait passer le\n        compte au r&ocirc;le <strong>VENDEUR</strong> et retire la demande en attente.\n      </p>\n    </div>\n    <div class=\"admin-pill\">\n      <span>Demandes en attente</span>\n      <strong>{{ pendingCount }}</strong>\n    </div>\n  </div>\n\n  <div class=\"admin-panel mt-8\">\n    <div class=\"admin-panel__header\">\n      <div>\n        <h2>File d'approbation</h2>\n        <p>Les demandes les plus r&eacute;centes apparaissent en premier.</p>\n      </div>\n      <button type=\"button\" class=\"admin-refresh\" (click)=\"loadSellerRequests()\" [disabled]=\"loading\">\n        {{ loading ? 'Actualisation...' : 'Actualiser' }}\n      </button>\n    </div>\n\n    <div *ngIf=\"loading\" class=\"admin-state\">\n      Chargement des demandes vendeur...\n    </div>\n\n    <div *ngIf=\"!loading && !sellerRequests.length\" class=\"admin-state admin-state--empty\">\n      Aucune demande vendeur en attente pour le moment.\n    </div>\n\n    <div *ngIf=\"!loading && sellerRequests.length\" class=\"admin-grid\">\n      <article\n        *ngFor=\"let request of sellerRequests; trackBy: trackByRequestId\"\n        class=\"admin-card\"\n      >\n        <div class=\"admin-card__header\">\n          <div>\n            <h3>{{ request.name }} {{ request.surname }}</h3>\n            <p>{{ request.email }}</p>\n          </div>\n          <span class=\"admin-status\">Demande ouverte</span>\n        </div>\n\n        <dl class=\"admin-meta\">\n          <div>\n            <dt>R&ocirc;le actuel</dt>\n            <dd>{{ request.role }}</dd>\n          </div>\n          <div>\n            <dt>Email v&eacute;rifi&eacute;</dt>\n            <dd>{{ request.emailVerified ? 'Oui' : 'Non' }}</dd>\n          </div>\n          <div>\n            <dt>KYC</dt>\n            <dd>{{ request.kycStatus || 'N/A' }}</dd>\n          </div>\n          <div>\n            <dt>Derni&egrave;re mise &agrave; jour</dt>\n            <dd>{{ request.updatedAt | date:'short' }}</dd>\n          </div>\n        </dl>\n\n        <button\n          type=\"button\"\n          class=\"admin-approve\"\n          [disabled]=\"approvingRequestId === request.id\"\n          (click)=\"approve(request)\"\n        >\n          {{ approvingRequestId === request.id ? 'Validation...' : 'Approuver et passer VENDEUR' }}\n        </button>\n      </article>\n    </div>\n  </div>\n</section>\n", styles: [":host {\n  display: block;\n}\n\n.admin-shell {\n  min-height: 100%;\n}\n\n.admin-hero,\n.admin-panel,\n.admin-card {\n  border: 1px solid rgba(136, 19, 55, 0.12);\n  background: rgba(255, 250, 250, 0.94);\n  box-shadow: 0 20px 56px rgba(136, 19, 55, 0.08);\n}\n\n.admin-hero {\n  display: flex;\n  justify-content: space-between;\n  gap: 1rem;\n  align-items: flex-start;\n  padding: 1.5rem;\n  border-radius: 30px;\n  background:\n    radial-gradient(circle at top right, rgba(244, 63, 94, 0.15), transparent 24%),\n    rgba(255, 250, 250, 0.96);\n}\n\n.admin-eyebrow {\n  margin: 0 0 0.4rem;\n  font-size: 0.72rem;\n  font-weight: 800;\n  letter-spacing: 0.18em;\n  text-transform: uppercase;\n  color: #be123c;\n}\n\n.admin-hero h1 {\n  margin: 0;\n  color: #611a24;\n  font-family: \"Trebuchet MS\", \"Segoe UI Variable\", sans-serif;\n}\n\n.admin-copy {\n  margin-top: 0.75rem;\n  max-width: 68ch;\n  color: #881337;\n  line-height: 1.65;\n}\n\n.admin-pill {\n  min-width: 12rem;\n  padding: 1rem 1.15rem;\n  border-radius: 24px;\n  background: linear-gradient(135deg, #611a24 0%, #9f1239 100%);\n  color: #fff;\n}\n\n.admin-pill span {\n  display: block;\n  font-size: 0.82rem;\n  opacity: 0.88;\n}\n\n.admin-pill strong {\n  display: block;\n  margin-top: 0.4rem;\n  font-size: 2rem;\n  font-weight: 800;\n}\n\n.admin-panel {\n  padding: 1.35rem;\n  border-radius: 28px;\n}\n\n.admin-panel__header {\n  display: flex;\n  justify-content: space-between;\n  gap: 1rem;\n  align-items: center;\n}\n\n.admin-panel__header h2 {\n  margin: 0;\n  color: #611a24;\n  font-size: 1.2rem;\n  font-weight: 800;\n}\n\n.admin-panel__header p {\n  margin: 0.3rem 0 0;\n  color: #9f1239;\n}\n\n.admin-refresh,\n.admin-approve {\n  border: 0;\n  border-radius: 999px;\n  padding: 0.85rem 1rem;\n  font-weight: 700;\n}\n\n.admin-refresh {\n  background: #fdf2f8;\n  color: #9d174d;\n}\n\n.admin-state {\n  margin-top: 1.25rem;\n  padding: 1.2rem;\n  border-radius: 22px;\n  background: #fff;\n  color: #7f1d1d;\n}\n\n.admin-state--empty {\n  background: linear-gradient(135deg, rgba(240, 253, 244, 0.95) 0%, rgba(255, 255, 255, 0.92) 100%);\n  color: #166534;\n}\n\n.admin-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 1rem;\n  margin-top: 1.25rem;\n}\n\n.admin-card {\n  padding: 1.15rem;\n  border-radius: 24px;\n}\n\n.admin-card__header {\n  display: flex;\n  justify-content: space-between;\n  gap: 1rem;\n  align-items: flex-start;\n}\n\n.admin-card__header h3 {\n  margin: 0;\n  color: #611a24;\n  font-size: 1.05rem;\n  font-weight: 800;\n}\n\n.admin-card__header p {\n  margin: 0.3rem 0 0;\n  color: #9f1239;\n  word-break: break-word;\n}\n\n.admin-status {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.35rem 0.7rem;\n  border-radius: 999px;\n  background: #fef3c7;\n  color: #92400e;\n  font-size: 0.75rem;\n  font-weight: 700;\n}\n\n.admin-meta {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0.9rem;\n  margin: 1rem 0 1.15rem;\n}\n\n.admin-meta dt {\n  color: #9f1239;\n  font-size: 0.78rem;\n  font-weight: 700;\n  text-transform: uppercase;\n}\n\n.admin-meta dd {\n  margin: 0.22rem 0 0;\n  color: #611a24;\n  font-weight: 700;\n}\n\n.admin-approve {\n  width: 100%;\n  background: linear-gradient(135deg, #be123c 0%, #e11d48 100%);\n  color: #fff;\n}\n\n.admin-refresh:disabled,\n.admin-approve:disabled {\n  opacity: 0.65;\n  cursor: not-allowed;\n}\n\n@media (max-width: 768px) {\n  .admin-hero,\n  .admin-panel__header,\n  .admin-card__header {\n    flex-direction: column;\n  }\n\n  .admin-pill {\n    width: 100%;\n  }\n\n  .admin-meta {\n    grid-template-columns: 1fr;\n  }\n}\n"] }]
    }], () => [{ type: i1.AdminService }, { type: i2.ToastService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AdminHomeComponent, { className: "AdminHomeComponent", filePath: "src/app/features/admin/admin-home.component.ts", lineNumber: 12 }); })();
//# sourceMappingURL=admin-home.component.js.map