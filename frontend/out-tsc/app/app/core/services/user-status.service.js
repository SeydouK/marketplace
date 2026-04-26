import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
export class UserStatusService {
    constructor() {
        this.statusSubject = new BehaviorSubject(this.loadFromStorage());
        this.status$ = this.statusSubject.asObservable();
    }
    loadFromStorage() {
        return {
            emailVerified: localStorage.getItem('emailVerified') === 'true',
            kycStatus: localStorage.getItem('kycStatus'),
            role: localStorage.getItem('role'),
        };
    }
    update(status) {
        const current = this.statusSubject.value;
        const updated = { ...current, ...status };
        localStorage.setItem('emailVerified', String(updated.emailVerified));
        if (updated.kycStatus)
            localStorage.setItem('kycStatus', updated.kycStatus);
        if (updated.role)
            localStorage.setItem('role', updated.role);
        this.statusSubject.next(updated);
    }
    clear() {
        localStorage.removeItem('token');
        localStorage.removeItem('emailVerified');
        localStorage.removeItem('kycStatus');
        localStorage.removeItem('role');
        this.statusSubject.next({ emailVerified: false, kycStatus: null, role: null });
    }
    get snapshot() {
        return this.statusSubject.value;
    }
    static { this.ɵfac = function UserStatusService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || UserStatusService)(); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: UserStatusService, factory: UserStatusService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(UserStatusService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
//# sourceMappingURL=user-status.service.js.map