import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class ListingService {
    constructor(http) {
        this.http = http;
        this.baseUrl = `${environment.apiUrl}/listings`;
    }
    search(filter) {
        return this.http.post(`${this.baseUrl}/search`, filter ?? {});
    }
    list(filter = {}) {
        return this.http.get(this.baseUrl, {
            params: {
                ...(filter.location ? { location: filter.location } : {}),
                ...(filter.animalType ? { animalType: filter.animalType } : {}),
                ...(filter.status ? { status: filter.status } : {}),
                ...(filter.minPrice != null ? { minPrice: String(filter.minPrice) } : {}),
                ...(filter.maxPrice != null ? { maxPrice: String(filter.maxPrice) } : {}),
            },
        });
    }
    get(id) {
        return this.http.get(`${this.baseUrl}/${id}`);
    }
    create(listing) {
        return this.http.post(this.baseUrl, listing);
    }
    update(id, listing) {
        return this.http.put(`${this.baseUrl}/${id}`, listing);
    }
    remove(id) {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
    myListings() {
        return this.http.get(`${environment.apiUrl}/users/me/listings`);
    }
    static { this.ɵfac = function ListingService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ListingService)(i0.ɵɵinject(i1.HttpClient)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ListingService, factory: ListingService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ListingService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.HttpClient }], null); })();
//# sourceMappingURL=listing.service.js.map