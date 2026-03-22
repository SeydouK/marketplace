import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../services/auth.service";
import * as i2 from "@angular/router";
export class AuthGuard {
    constructor(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    canActivate() {
        if (!this.auth.isLoggedIn()) {
            this.router.navigate(['/auth/login']);
            return false;
        }
        return true;
    }
    static { this.ɵfac = function AuthGuard_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AuthGuard)(i0.ɵɵinject(i1.AuthService), i0.ɵɵinject(i2.Router)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AuthGuard, factory: AuthGuard.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuthGuard, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.AuthService }, { type: i2.Router }], null); })();
//# sourceMappingURL=auth.guard.js.map