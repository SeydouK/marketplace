import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
export class MarketplaceUiService {
    constructor() {
        this.animalFilterSubject = new BehaviorSubject('');
        this.searchTermSubject = new BehaviorSubject('');
        this.animalFilter$ = this.animalFilterSubject.asObservable();
        this.searchTerm$ = this.searchTermSubject.asObservable();
    }
    get animalFilter() {
        return this.animalFilterSubject.value;
    }
    get searchTerm() {
        return this.searchTermSubject.value;
    }
    setAnimalFilter(value) {
        this.animalFilterSubject.next(value);
    }
    setSearchTerm(value) {
        this.searchTermSubject.next(value);
    }
    static { this.ɵfac = function MarketplaceUiService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || MarketplaceUiService)(); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: MarketplaceUiService, factory: MarketplaceUiService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MarketplaceUiService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
//# sourceMappingURL=marketplace-ui.service.js.map