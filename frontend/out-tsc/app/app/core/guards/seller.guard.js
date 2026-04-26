import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../services/auth.service";
import * as i2 from "@angular/router";
import * as i3 from "../services/toast.service";
export class SellerGuard {
    constructor(auth, router, toast) {
        this.auth = auth;
        this.router = router;
        this.toast = toast;
    }
    canActivate() {
        if (!this.auth.isLoggedIn()) {
            this.router.navigate(['/login']);
            return false;
        }
        if (this.auth.canAccessSellerArea) {
            return true;
        }
        this.toast.info(this.auth.isSellerRequestPending
            ? 'Votre demande vendeur est en attente de validation par un administrateur.'
            : "Vous devez d'abord obtenir l'acces vendeur pour ouvrir cet espace.");
        this.router.navigate(['/dashboard']);
        return false;
    }
    static { this.ɵfac = function SellerGuard_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SellerGuard)(i0.ɵɵinject(i1.AuthService), i0.ɵɵinject(i2.Router), i0.ɵɵinject(i3.ToastService)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: SellerGuard, factory: SellerGuard.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SellerGuard, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.AuthService }, { type: i2.Router }, { type: i3.ToastService }], null); })();
//# sourceMappingURL=seller.guard.js.map