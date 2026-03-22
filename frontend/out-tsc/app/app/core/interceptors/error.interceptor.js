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
            if (error.status === 401) {
                this.auth.logout();
                this.router.navigate(['/auth/login']);
                this.toast.error('Session expirée. Veuillez vous reconnecter.');
            }
            else if (error.status === 403) {
                this.toast.error('Accès non autorisé');
            }
            else if (error.status === 404) {
                this.toast.error('Ressource introuvable');
            }
            else if (error.status >= 400 && error.status < 500) {
                const message = error.error?.message || 'Données invalides';
                this.toast.error(message);
            }
            else if (error.status >= 500) {
                this.toast.error('Erreur serveur. Veuillez réessayer plus tard.');
            }
            else {
                this.toast.error(error.error?.message || 'Erreur inattendue');
            }
            return throwError(() => error);
        }));
    }
    static { this.ɵfac = function ErrorInterceptor_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ErrorInterceptor)(i0.ɵɵinject(i1.AuthService), i0.ɵɵinject(i2.Router), i0.ɵɵinject(i3.ToastService)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ErrorInterceptor, factory: ErrorInterceptor.ɵfac }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ErrorInterceptor, [{
        type: Injectable
    }], () => [{ type: i1.AuthService }, { type: i2.Router }, { type: i3.ToastService }], null); })();
//# sourceMappingURL=error.interceptor.js.map