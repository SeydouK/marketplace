import { Injectable } from '@angular/core';
import { finalize } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../services/loading.service";
export class LoadingInterceptor {
    constructor(loading) {
        this.loading = loading;
        this.activeRequests = 0;
    }
    intercept(req, next) {
        this.activeRequests++;
        if (this.activeRequests === 1) {
            this.loadingTimeout = setTimeout(() => {
                if (this.activeRequests > 0) {
                    this.loading.setLoading(true);
                }
            }, 200);
        }
        return next.handle(req).pipe(finalize(() => {
            this.activeRequests--;
            if (this.activeRequests < 0) {
                this.activeRequests = 0;
            }
            if (this.activeRequests === 0) {
                if (this.loadingTimeout) {
                    clearTimeout(this.loadingTimeout);
                    this.loadingTimeout = null;
                }
                this.loading.setLoading(false);
            }
        }));
    }
    static { this.ɵfac = function LoadingInterceptor_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LoadingInterceptor)(i0.ɵɵinject(i1.LoadingService)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: LoadingInterceptor, factory: LoadingInterceptor.ɵfac }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LoadingInterceptor, [{
        type: Injectable
    }], () => [{ type: i1.LoadingService }], null); })();
//# sourceMappingURL=loading.interceptor.js.map