import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class StorageService {
    constructor() {
        this.TOKEN_KEY = 'marketplace_token';
        this.USER_KEY = 'marketplace_user';
        this.EMAIL_VERIFIED_KEY = 'emailVerified'; // ← ajouter
        this.KYC_STATUS_KEY = 'kycStatus'; // ← ajouter
        this.ROLE_KEY = 'role'; // ← ajouter
    }
    setToken(token) {
        localStorage.setItem(this.TOKEN_KEY, token);
    }
    getToken() {
        return localStorage.getItem(this.TOKEN_KEY);
    }
    setUser(user) {
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }
    getUser() {
        const user = localStorage.getItem(this.USER_KEY);
        return user ? JSON.parse(user) : null;
    }
    clear() {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.USER_KEY);
        localStorage.removeItem(this.EMAIL_VERIFIED_KEY);
        localStorage.removeItem(this.KYC_STATUS_KEY);
        localStorage.removeItem(this.ROLE_KEY);
    }
    static { this.ɵfac = function StorageService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || StorageService)(); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: StorageService, factory: StorageService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(StorageService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
//# sourceMappingURL=storage.service.js.map