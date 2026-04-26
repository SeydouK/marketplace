import { Component } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@angular/common/http";
import * as i3 from "../../core/services/user-status.service";
import * as i4 from "@angular/common";
function VerifyEmailComponent_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 3);
    i0.ɵɵelement(2, "i", 4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h1", 5);
    i0.ɵɵtext(4, "V\u00E9rifiez votre email");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 6);
    i0.ɵɵtext(6, " Un lien d'activation a \u00E9t\u00E9 envoy\u00E9 \u00E0 votre adresse email. Cliquez sur ce lien pour activer votre compte. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 7)(8, "p", 8);
    i0.ɵɵtext(9, "\u00C0 noter");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "ul", 9)(11, "li", 10);
    i0.ɵɵelement(12, "i", 11);
    i0.ɵɵtext(13, " Le lien expire dans 24 heures ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "li", 10);
    i0.ɵɵelement(15, "i", 11);
    i0.ɵɵtext(16, " V\u00E9rifiez vos spams si vous ne trouvez pas l'email ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(17, "p", 12);
    i0.ɵɵtext(18, " Mauvais email ? ");
    i0.ɵɵelementStart(19, "a", 13);
    i0.ɵɵtext(20, "Recommencer l'inscription");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} }
function VerifyEmailComponent_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 14);
    i0.ɵɵelement(2, "i", 15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h1", 5);
    i0.ɵɵtext(4, "Email confirm\u00E9 !");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 16);
    i0.ɵɵtext(6, " Votre adresse email a bien \u00E9t\u00E9 v\u00E9rifi\u00E9e. Compl\u00E9tez maintenant la v\u00E9rification de votre identit\u00E9 pour acc\u00E9der \u00E0 la plateforme. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "button", 17);
    i0.ɵɵlistener("click", function VerifyEmailComponent_ng_container_3_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.goToKyc()); });
    i0.ɵɵtext(8, " V\u00E9rifier mon identit\u00E9 ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} }
function VerifyEmailComponent_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 18);
    i0.ɵɵelement(2, "i", 19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h1", 5);
    i0.ɵɵtext(4, "Email d\u00E9j\u00E0 confirm\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 16);
    i0.ɵɵtext(6, " Votre adresse email est d\u00E9j\u00E0 v\u00E9rifi\u00E9e. Compl\u00E9tez votre v\u00E9rification d'identit\u00E9 pour continuer. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "button", 17);
    i0.ɵɵlistener("click", function VerifyEmailComponent_ng_container_4_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.goToKyc()); });
    i0.ɵɵtext(8, " V\u00E9rifier mon identit\u00E9 ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} }
function VerifyEmailComponent_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 20);
    i0.ɵɵelement(2, "i", 21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h1", 5);
    i0.ɵɵtext(4, "Lien invalide");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 16);
    i0.ɵɵtext(6, " Ce lien de confirmation est invalide ou a expir\u00E9. Reconnectez-vous pour recevoir un nouveau lien. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "button", 22);
    i0.ɵɵlistener("click", function VerifyEmailComponent_ng_container_5_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.goToLogin()); });
    i0.ɵɵtext(8, " Se connecter ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} }
export class VerifyEmailComponent {
    constructor(route, router, http, userStatusService) {
        this.route = route;
        this.router = router;
        this.http = http;
        this.userStatusService = userStatusService;
        this.status = 'pending';
    }
    ngOnInit() {
        const s = this.route.snapshot.queryParamMap.get('status');
        if (s === 'success') {
            this.status = 'success';
            // Mettre à jour le statut — la bannière disparaît immédiatement
            this.userStatusService.update({ emailVerified: true });
        }
        else if (s === 'error') {
            this.status = 'error';
        }
        else {
            // Pas de paramètre — vérifier le vrai statut en base
            this.checkRealStatus();
        }
    }
    checkRealStatus() {
        const token = localStorage.getItem('marketplace_token');
        if (!token) {
            this.router.navigate(['/login']);
            return;
        }
        this.http.get('/api/kyc/status', {
            headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
        }).subscribe({
            next: (res) => {
                if (res.emailVerified) {
                    // Email déjà vérifié — rediriger directement vers KYC
                    this.userStatusService.update({ emailVerified: true });
                    this.status = 'already_verified';
                }
                else {
                    this.status = 'pending';
                }
            },
            error: () => {
                this.status = 'pending';
            }
        });
    }
    goToKyc() { this.router.navigate(['/kyc']); }
    goToLogin() { this.router.navigate(['/login']); }
    static { this.ɵfac = function VerifyEmailComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || VerifyEmailComponent)(i0.ɵɵdirectiveInject(i1.ActivatedRoute), i0.ɵɵdirectiveInject(i1.Router), i0.ɵɵdirectiveInject(i2.HttpClient), i0.ɵɵdirectiveInject(i3.UserStatusService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: VerifyEmailComponent, selectors: [["app-verify-email"]], standalone: false, decls: 6, vars: 4, consts: [[1, "min-h-screen", "bg-gray-50", "flex", "items-center", "justify-center", "px-4"], [1, "bg-white", "rounded-2xl", "shadow-sm", "border", "border-gray-100", "max-w-md", "w-full", "p-10", "text-center"], [4, "ngIf"], [1, "w-16", "h-16", "bg-amber-50", "rounded-full", "flex", "items-center", "justify-center", "mx-auto", "mb-6"], [1, "pi", "pi-envelope", "text-amber-500", "text-2xl"], [1, "text-2xl", "font-semibold", "text-gray-900", "mb-3"], [1, "text-gray-500", "text-sm", "leading-relaxed", "mb-6"], [1, "bg-gray-50", "rounded-xl", "p-4", "text-left", "mb-6"], [1, "text-xs", "text-gray-400", "font-medium", "uppercase", "tracking-wide", "mb-2"], [1, "text-sm", "text-gray-500", "space-y-1"], [1, "flex", "items-start", "gap-2"], [1, "pi", "pi-check-circle", "text-green-400", "mt-0.5", "text-xs"], [1, "text-xs", "text-gray-400"], ["routerLink", "/register", 1, "text-rose-500", "hover:underline"], [1, "w-16", "h-16", "bg-green-50", "rounded-full", "flex", "items-center", "justify-center", "mx-auto", "mb-6"], [1, "pi", "pi-check-circle", "text-green-500", "text-2xl"], [1, "text-gray-500", "text-sm", "leading-relaxed", "mb-8"], [1, "w-full", "bg-rose-500", "hover:bg-rose-600", "text-white", "font-medium", "py-3", "px-6", "rounded-xl", "transition-colors", "duration-200", 3, "click"], [1, "w-16", "h-16", "bg-blue-50", "rounded-full", "flex", "items-center", "justify-center", "mx-auto", "mb-6"], [1, "pi", "pi-check-circle", "text-blue-500", "text-2xl"], [1, "w-16", "h-16", "bg-red-50", "rounded-full", "flex", "items-center", "justify-center", "mx-auto", "mb-6"], [1, "pi", "pi-times-circle", "text-red-400", "text-2xl"], [1, "w-full", "bg-gray-900", "hover:bg-gray-800", "text-white", "font-medium", "py-3", "px-6", "rounded-xl", "transition-colors", "duration-200", 3, "click"]], template: function VerifyEmailComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1);
            i0.ɵɵtemplate(2, VerifyEmailComponent_ng_container_2_Template, 21, 0, "ng-container", 2)(3, VerifyEmailComponent_ng_container_3_Template, 9, 0, "ng-container", 2)(4, VerifyEmailComponent_ng_container_4_Template, 9, 0, "ng-container", 2)(5, VerifyEmailComponent_ng_container_5_Template, 9, 0, "ng-container", 2);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.status === "pending");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.status === "success");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.status === "already_verified");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.status === "error");
        } }, dependencies: [i4.NgIf, i1.RouterLink], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(VerifyEmailComponent, [{
        type: Component,
        args: [{ selector: 'app-verify-email', standalone: false, template: "<div class=\"min-h-screen bg-gray-50 flex items-center justify-center px-4\">\r\n  <div class=\"bg-white rounded-2xl shadow-sm border border-gray-100 max-w-md w-full p-10 text-center\">\r\n\r\n    <!-- EN ATTENTE -->\r\n    <ng-container *ngIf=\"status === 'pending'\">\r\n      <div class=\"w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6\">\r\n        <i class=\"pi pi-envelope text-amber-500 text-2xl\"></i>\r\n      </div>\r\n      <h1 class=\"text-2xl font-semibold text-gray-900 mb-3\">V\u00E9rifiez votre email</h1>\r\n      <p class=\"text-gray-500 text-sm leading-relaxed mb-6\">\r\n        Un lien d'activation a \u00E9t\u00E9 envoy\u00E9 \u00E0 votre adresse email.\r\n        Cliquez sur ce lien pour activer votre compte.\r\n      </p>\r\n      <div class=\"bg-gray-50 rounded-xl p-4 text-left mb-6\">\r\n        <p class=\"text-xs text-gray-400 font-medium uppercase tracking-wide mb-2\">\u00C0 noter</p>\r\n        <ul class=\"text-sm text-gray-500 space-y-1\">\r\n          <li class=\"flex items-start gap-2\">\r\n            <i class=\"pi pi-check-circle text-green-400 mt-0.5 text-xs\"></i>\r\n            Le lien expire dans 24 heures\r\n          </li>\r\n          <li class=\"flex items-start gap-2\">\r\n            <i class=\"pi pi-check-circle text-green-400 mt-0.5 text-xs\"></i>\r\n            V\u00E9rifiez vos spams si vous ne trouvez pas l'email\r\n          </li>\r\n        </ul>\r\n      </div>\r\n      <p class=\"text-xs text-gray-400\">\r\n        Mauvais email ?\r\n        <a routerLink=\"/register\" class=\"text-rose-500 hover:underline\">Recommencer l'inscription</a>\r\n      </p>\r\n    </ng-container>\r\n\r\n    <!-- SUCC\u00C8S -->\r\n    <ng-container *ngIf=\"status === 'success'\">\r\n      <div class=\"w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6\">\r\n        <i class=\"pi pi-check-circle text-green-500 text-2xl\"></i>\r\n      </div>\r\n      <h1 class=\"text-2xl font-semibold text-gray-900 mb-3\">Email confirm\u00E9 !</h1>\r\n      <p class=\"text-gray-500 text-sm leading-relaxed mb-8\">\r\n        Votre adresse email a bien \u00E9t\u00E9 v\u00E9rifi\u00E9e.\r\n        Compl\u00E9tez maintenant la v\u00E9rification de votre identit\u00E9 pour acc\u00E9der \u00E0 la plateforme.\r\n      </p>\r\n      <button\r\n        (click)=\"goToKyc()\"\r\n        class=\"w-full bg-rose-500 hover:bg-rose-600 text-white font-medium py-3 px-6 rounded-xl transition-colors duration-200\"\r\n      >\r\n        V\u00E9rifier mon identit\u00E9\r\n      </button>\r\n    </ng-container>\r\n\r\n    <!-- D\u00C9J\u00C0 V\u00C9RIFI\u00C9 -->\r\n    <ng-container *ngIf=\"status === 'already_verified'\">\r\n      <div class=\"w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6\">\r\n        <i class=\"pi pi-check-circle text-blue-500 text-2xl\"></i>\r\n      </div>\r\n      <h1 class=\"text-2xl font-semibold text-gray-900 mb-3\">Email d\u00E9j\u00E0 confirm\u00E9</h1>\r\n      <p class=\"text-gray-500 text-sm leading-relaxed mb-8\">\r\n        Votre adresse email est d\u00E9j\u00E0 v\u00E9rifi\u00E9e.\r\n        Compl\u00E9tez votre v\u00E9rification d'identit\u00E9 pour continuer.\r\n      </p>\r\n      <button\r\n        (click)=\"goToKyc()\"\r\n        class=\"w-full bg-rose-500 hover:bg-rose-600 text-white font-medium py-3 px-6 rounded-xl transition-colors duration-200\"\r\n      >\r\n        V\u00E9rifier mon identit\u00E9\r\n      </button>\r\n    </ng-container>\r\n\r\n    <!-- ERREUR -->\r\n    <ng-container *ngIf=\"status === 'error'\">\r\n      <div class=\"w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6\">\r\n        <i class=\"pi pi-times-circle text-red-400 text-2xl\"></i>\r\n      </div>\r\n      <h1 class=\"text-2xl font-semibold text-gray-900 mb-3\">Lien invalide</h1>\r\n      <p class=\"text-gray-500 text-sm leading-relaxed mb-8\">\r\n        Ce lien de confirmation est invalide ou a expir\u00E9.\r\n        Reconnectez-vous pour recevoir un nouveau lien.\r\n      </p>\r\n      <button\r\n        (click)=\"goToLogin()\"\r\n        class=\"w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-xl transition-colors duration-200\"\r\n      >\r\n        Se connecter\r\n      </button>\r\n    </ng-container>\r\n\r\n  </div>\r\n</div>" }]
    }], () => [{ type: i1.ActivatedRoute }, { type: i1.Router }, { type: i2.HttpClient }, { type: i3.UserStatusService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(VerifyEmailComponent, { className: "VerifyEmailComponent", filePath: "src/app/features/verify-email/verify-email.component.ts", lineNumber: 11 }); })();
//# sourceMappingURL=verify-email.component.js.map