import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class DashboardService {
    constructor(http) {
        this.http = http;
    }
    me() {
        return this.http.get(`${environment.apiUrl}/users/me`);
    }
    myListings() {
        return this.http.get(`${environment.apiUrl}/users/me/listings`);
    }
    static { this.ɵfac = function DashboardService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DashboardService)(i0.ɵɵinject(i1.HttpClient)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: DashboardService, factory: DashboardService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DashboardService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.HttpClient }], null); })();
//# sourceMappingURL=dashboard.service.js.map