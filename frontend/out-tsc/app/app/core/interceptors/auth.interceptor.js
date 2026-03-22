import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../services/storage.service";
export class AuthInterceptor {
    constructor(storage) {
        this.storage = storage;
    }
    intercept(req, next) {
        const token = this.storage.getToken();
        if (token) {
            const cloned = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return next.handle(cloned);
        }
        return next.handle(req);
    }
    static { this.ɵfac = function AuthInterceptor_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AuthInterceptor)(i0.ɵɵinject(i1.StorageService)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AuthInterceptor, factory: AuthInterceptor.ɵfac }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuthInterceptor, [{
        type: Injectable
    }], () => [{ type: i1.StorageService }], null); })();
//# sourceMappingURL=auth.interceptor.js.map