import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class AdminService {
    constructor(http) {
        this.http = http;
    }
    listSellerRequests() {
        return this.http.get(`${environment.apiUrl}/admin/seller-requests`);
    }
    approveSellerRequest(userId) {
        return this.http.post(`${environment.apiUrl}/admin/seller-requests/${userId}/approve`, {});
    }
    static { this.ɵfac = function AdminService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AdminService)(i0.ɵɵinject(i1.HttpClient)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AdminService, factory: AdminService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AdminService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.HttpClient }], null); })();
//# sourceMappingURL=admin.service.js.map