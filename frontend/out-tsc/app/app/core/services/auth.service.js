import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Role } from '../models/role.enum';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "./storage.service";
export class AuthService {
    constructor(http, storage) {
        this.http = http;
        this.storage = storage;
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
            .pipe(tap((res) => {
            const user = {
                id: res.id,
                email: res.email,
                role: res.role,
                name: res.name,
            };
            this.storage.setToken(res.token);
            this.storage.setUser(user);
            this.currentUserSubject.next(user);
        }));
    }
    register(data) {
        return this.http
            .post(`${environment.apiUrl}/auth/register`, data)
            .pipe(tap((res) => {
            const user = {
                id: res.id,
                email: res.email,
                role: res.role,
                name: res.name,
            };
            this.storage.setToken(res.token);
            this.storage.setUser(user);
            this.currentUserSubject.next(user);
        }));
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
    get canAccessHealthValidation() {
        return !!this.currentUser?.role && this.healthValidationRoles.has(this.currentUser.role);
    }
    logout() {
        this.storage.clear();
        this.currentUserSubject.next(null);
    }
    static { this.ɵfac = function AuthService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AuthService)(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.StorageService)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AuthService, factory: AuthService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuthService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.HttpClient }, { type: i2.StorageService }], null); })();
//# sourceMappingURL=auth.service.js.map