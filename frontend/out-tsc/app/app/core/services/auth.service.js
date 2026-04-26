import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Role } from '../models/role.enum';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "./storage.service";
import * as i3 from "./user-status.service";
export class AuthService {
    constructor(http, storage, userStatusService) {
        this.http = http;
        this.storage = storage;
        this.userStatusService = userStatusService;
        this.sellerRoles = new Set([
            Role.VENDEUR,
            Role.ADMIN,
            Role.ADMINISTRATEUR,
        ]);
        this.adminRoles = new Set([
            Role.ADMIN,
            Role.ADMINISTRATEUR,
        ]);
        this.healthValidationRoles = new Set([
            // Role.AGENT_ANADER,
            Role.VETERINAIRE,
            // Role.ADMIN,
            // Role.ADMINISTRATEUR,
        ]);
        this.currentUserSubject = new BehaviorSubject(this.storage.getUser());
        this.currentUser$ = this.currentUserSubject.asObservable();
    }
    get currentUser() {
        return this.currentUserSubject.value;
    }
    login(email, password) {
        return this.http
            .post(`${environment.apiUrl}/auth/login`, { email, password })
            .pipe(tap((res) => this.applyAuthResponse(res)));
    }
    register(data) {
        return this.http
            .post(`${environment.apiUrl}/auth/register`, data)
            .pipe(tap((res) => this.applyAuthResponse(res)));
    }
    refreshCurrentUser() {
        return this.http
            .get(`${environment.apiUrl}/users/me`)
            .pipe(tap((user) => this.setCurrentUser(user)));
    }
    requestSellerAccess() {
        return this.http
            .post(`${environment.apiUrl}/users/me/seller-request`, {})
            .pipe(tap((user) => this.setCurrentUser(user)));
    }
    isLoggedIn() {
        return !!this.storage.getToken();
    }
    hasRole(role) {
        return this.currentUser?.role === role;
    }
    hasAnyRole(roles) {
        return !!this.currentUser?.role && roles.includes(this.currentUser.role);
    }
    get canAccessSellerArea() {
        return !!this.currentUser?.role && this.sellerRoles.has(this.currentUser.role);
    }
    get canAccessAdminArea() {
        return !!this.currentUser?.role && this.adminRoles.has(this.currentUser.role);
    }
    get isSellerRequestPending() {
        return !!this.currentUser?.devenirVendeur;
    }
    get canAccessHealthValidation() {
        return !!this.currentUser?.role && this.healthValidationRoles.has(this.currentUser.role);
    }
    logout() {
        this.storage.clear();
        this.currentUserSubject.next(null);
        this.userStatusService.clear();
    }
    applyAuthResponse(response) {
        const user = {
            id: response.id,
            email: response.email,
            role: response.role,
            name: response.name,
            emailVerified: response.emailVerified,
            kycStatus: response.kycStatus,
            devenirVendeur: response.devenirVendeur,
        };
        this.storage.setToken(response.token);
        this.setCurrentUser(user);
    }
    setCurrentUser(user) {
        this.storage.setUser(user);
        this.currentUserSubject.next(user);
        this.userStatusService.update({
            emailVerified: user.emailVerified ?? false,
            kycStatus: user.kycStatus ?? null,
            role: user.role,
        });
    }
    static { this.ɵfac = function AuthService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AuthService)(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.StorageService), i0.ɵɵinject(i3.UserStatusService)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AuthService, factory: AuthService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuthService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.HttpClient }, { type: i2.StorageService }, { type: i3.UserStatusService }], null); })();
//# sourceMappingURL=auth.service.js.map