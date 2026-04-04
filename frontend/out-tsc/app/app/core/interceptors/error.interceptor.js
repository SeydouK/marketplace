import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../services/auth.service";
import * as i2 from "@angular/router";
import * as i3 from "../services/toast.service";
export class ErrorInterceptor {
    constructor(auth, router, toast) {
        this.auth = auth;
        this.router = router;
        this.toast = toast;
    }
    intercept(req, next) {
        return next.handle(req).pipe(catchError((error) => {
            const backendMessage = this.resolveBackendMessage(error);
            if (error.status === 401) {
                this.auth.logout();
                this.router.navigate(['/auth/login']);
                this.toast.error(backendMessage || 'Session expirée. Veuillez vous reconnecter.');
            }
            else if (error.status === 403) {
                this.toast.error(backendMessage || 'Accès non autorisé.');
            }
            else if (error.status === 404) {
                this.toast.error(backendMessage || 'Ressource introuvable.');
            }
            else if (error.status >= 400 && error.status < 500) {
                this.toast.error(backendMessage || 'Données invalides.');
            }
            else if (error.status >= 500) {
                this.toast.error(backendMessage || 'Erreur serveur. Veuillez réessayer plus tard.');
            }
            else if (error.status === 0) {
                this.toast.error('Impossible de joindre le serveur.');
            }
            else {
                this.toast.error(backendMessage || 'Erreur inattendue.');
            }
            return throwError(() => error);
        }));
    }
    resolveBackendMessage(error) {
        return this.extractMessage(error.error);
    }
    extractMessage(payload) {
        if (typeof payload === 'string') {
            const message = payload.trim();
            return message || null;
        }
        if (Array.isArray(payload)) {
            for (const item of payload) {
                const message = this.extractMessage(item);
                if (message) {
                    return message;
                }
            }
            return null;
        }
        if (!payload || typeof payload !== 'object') {
            return null;
        }
        const record = payload;
        const directMessage = this.readString(record['message']);
        if (directMessage) {
            return directMessage;
        }
        const nestedErrorsMessage = this.extractObjectMessage(record['errors']);
        if (nestedErrorsMessage) {
            return nestedErrorsMessage;
        }
        return this.extractObjectMessage(record);
    }
    extractObjectMessage(payload) {
        if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
            return null;
        }
        const values = Object.values(payload);
        for (const value of values) {
            const message = this.readString(value) || this.extractMessage(value);
            if (message) {
                return message;
            }
        }
        return null;
    }
    readString(value) {
        if (typeof value !== 'string') {
            return null;
        }
        const normalized = value.trim();
        return normalized || null;
    }
    static { this.ɵfac = function ErrorInterceptor_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ErrorInterceptor)(i0.ɵɵinject(i1.AuthService), i0.ɵɵinject(i2.Router), i0.ɵɵinject(i3.ToastService)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ErrorInterceptor, factory: ErrorInterceptor.ɵfac }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ErrorInterceptor, [{
        type: Injectable
    }], () => [{ type: i1.AuthService }, { type: i2.Router }, { type: i3.ToastService }], null); })();
//# sourceMappingURL=error.interceptor.js.map