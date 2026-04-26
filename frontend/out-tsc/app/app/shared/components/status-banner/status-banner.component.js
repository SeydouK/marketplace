import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/user-status.service";
import * as i2 from "../../../core/services/auth.service";
import * as i3 from "@angular/router";
import * as i4 from "@angular/common";
function StatusBannerComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 2)(1, "div", 3);
    i0.ɵɵelement(2, "i", 4);
    i0.ɵɵelementStart(3, "p", 5)(4, "span", 6);
    i0.ɵɵtext(5, "Confirmez votre adresse email");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(6, " \u2014 v\u00E9rifiez votre bo\u00EEte mail et cliquez sur le lien d'activation. ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "button", 7);
    i0.ɵɵlistener("click", function StatusBannerComponent_div_0_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.goToVerifyEmail()); });
    i0.ɵɵtext(8, " Voir les instructions ");
    i0.ɵɵelementEnd()();
} }
function StatusBannerComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 8)(1, "div", 3);
    i0.ɵɵelement(2, "i", 9);
    i0.ɵɵelementStart(3, "p", 10)(4, "span", 6);
    i0.ɵɵtext(5, "V\u00E9rifiez votre identit\u00E9 (KYC)");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(6, " \u2014 obligatoire pour publier des annonces et acc\u00E9der au tableau de bord. ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "button", 11);
    i0.ɵɵlistener("click", function StatusBannerComponent_div_1_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.goToKyc()); });
    i0.ɵɵtext(8, " V\u00E9rifier maintenant ");
    i0.ɵɵelementEnd()();
} }
export class StatusBannerComponent {
    constructor(userStatusService, authService, router) {
        this.userStatusService = userStatusService;
        this.authService = authService;
        this.router = router;
        this.status = null;
        this.sub = new Subscription();
    }
    ngOnInit() {
        this.sub.add(this.userStatusService.status$.subscribe(s => {
            this.status = s;
        }));
    }
    // Utilise AuthService au lieu du localStorage directement
    get isLoggedIn() {
        return this.authService.isLoggedIn();
    }
    get showEmailBanner() {
        return this.isLoggedIn && !!this.status && !this.status.emailVerified;
    }
    get showKycBanner() {
        return this.isLoggedIn &&
            !!this.status &&
            this.status.emailVerified &&
            this.status.kycStatus !== 'VALIDATED';
    }
    goToVerifyEmail() { this.router.navigate(['/verify-email']); }
    goToKyc() { this.router.navigate(['/kyc']); }
    ngOnDestroy() { this.sub.unsubscribe(); }
    static { this.ɵfac = function StatusBannerComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || StatusBannerComponent)(i0.ɵɵdirectiveInject(i1.UserStatusService), i0.ɵɵdirectiveInject(i2.AuthService), i0.ɵɵdirectiveInject(i3.Router)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: StatusBannerComponent, selectors: [["app-status-banner"]], standalone: false, decls: 2, vars: 2, consts: [["class", "w-full bg-amber-50 border-b border-amber-200 px-4 py-3 flex items-center justify-between gap-4", 4, "ngIf"], ["class", "w-full bg-rose-50 border-b border-rose-200 px-4 py-3 flex items-center justify-between gap-4", 4, "ngIf"], [1, "w-full", "bg-amber-50", "border-b", "border-amber-200", "px-4", "py-3", "flex", "items-center", "justify-between", "gap-4"], [1, "flex", "items-center", "gap-3"], [1, "pi", "pi-envelope", "text-amber-500"], [1, "text-sm", "text-amber-800"], [1, "font-medium"], [1, "shrink-0", "text-xs", "font-medium", "text-amber-700", "bg-amber-100", "hover:bg-amber-200", "px-3", "py-1.5", "rounded-lg", "transition-colors", 3, "click"], [1, "w-full", "bg-rose-50", "border-b", "border-rose-200", "px-4", "py-3", "flex", "items-center", "justify-between", "gap-4"], [1, "pi", "pi-id-card", "text-rose-500"], [1, "text-sm", "text-rose-800"], [1, "shrink-0", "text-xs", "font-medium", "text-rose-700", "bg-rose-100", "hover:bg-rose-200", "px-3", "py-1.5", "rounded-lg", "transition-colors", 3, "click"]], template: function StatusBannerComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, StatusBannerComponent_div_0_Template, 9, 0, "div", 0)(1, StatusBannerComponent_div_1_Template, 9, 0, "div", 1);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.showEmailBanner);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showKycBanner);
        } }, dependencies: [i4.NgIf], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(StatusBannerComponent, [{
        type: Component,
        args: [{ selector: 'app-status-banner', standalone: false, template: "<!-- Banni\u00E8re email non v\u00E9rifi\u00E9 -->\r\n<div\r\n  *ngIf=\"showEmailBanner\"\r\n  class=\"w-full bg-amber-50 border-b border-amber-200 px-4 py-3 flex items-center justify-between gap-4\"\r\n>\r\n  <div class=\"flex items-center gap-3\">\r\n    <i class=\"pi pi-envelope text-amber-500\"></i>\r\n    <p class=\"text-sm text-amber-800\">\r\n      <span class=\"font-medium\">Confirmez votre adresse email</span>\r\n      \u2014 v\u00E9rifiez votre bo\u00EEte mail et cliquez sur le lien d'activation.\r\n    </p>\r\n  </div>\r\n  <button\r\n    (click)=\"goToVerifyEmail()\"\r\n    class=\"shrink-0 text-xs font-medium text-amber-700 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-lg transition-colors\"\r\n  >\r\n    Voir les instructions\r\n  </button>\r\n</div>\r\n\r\n<!-- Banni\u00E8re KYC non compl\u00E9t\u00E9 -->\r\n<div\r\n  *ngIf=\"showKycBanner\"\r\n  class=\"w-full bg-rose-50 border-b border-rose-200 px-4 py-3 flex items-center justify-between gap-4\"\r\n>\r\n  <div class=\"flex items-center gap-3\">\r\n    <i class=\"pi pi-id-card text-rose-500\"></i>\r\n    <p class=\"text-sm text-rose-800\">\r\n      <span class=\"font-medium\">V\u00E9rifiez votre identit\u00E9 (KYC)</span>\r\n      \u2014 obligatoire pour publier des annonces et acc\u00E9der au tableau de bord.\r\n    </p>\r\n  </div>\r\n  <button\r\n    (click)=\"goToKyc()\"\r\n    class=\"shrink-0 text-xs font-medium text-rose-700 bg-rose-100 hover:bg-rose-200 px-3 py-1.5 rounded-lg transition-colors\"\r\n  >\r\n    V\u00E9rifier maintenant\r\n  </button>\r\n</div>" }]
    }], () => [{ type: i1.UserStatusService }, { type: i2.AuthService }, { type: i3.Router }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(StatusBannerComponent, { className: "StatusBannerComponent", filePath: "src/app/shared/components/status-banner/status-banner.component.ts", lineNumber: 12 }); })();
//# sourceMappingURL=status-banner.component.js.map