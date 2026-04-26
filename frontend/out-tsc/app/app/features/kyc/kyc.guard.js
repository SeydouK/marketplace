import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../core/services/auth.service";
import * as i2 from "../../core/services/user-status.service";
import * as i3 from "@angular/router";
export class KycGuard {
    constructor(authService, userStatusService, router) {
        this.authService = authService;
        this.userStatusService = userStatusService;
        this.router = router;
    }
    canActivate() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate(['/login']);
            return false;
        }
        const status = this.userStatusService.snapshot;
        if (!status.emailVerified) {
            this.router.navigate(['/verify-email']);
            return false;
        }
        if (status.kycStatus !== 'VALIDATED') {
            this.router.navigate(['/kyc']);
            return false;
        }
        return true;
    }
    static { this.ɵfac = function KycGuard_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || KycGuard)(i0.ɵɵinject(i1.AuthService), i0.ɵɵinject(i2.UserStatusService), i0.ɵɵinject(i3.Router)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: KycGuard, factory: KycGuard.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KycGuard, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.AuthService }, { type: i2.UserStatusService }, { type: i3.Router }], null); })();
//# sourceMappingURL=kyc.guard.js.map