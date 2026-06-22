import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "primeng/api";
export class ToastService {
    constructor(messageService) {
        this.messageService = messageService;
    }
    success(detail, summary = 'Succès') {
        this.messageService.add({ severity: 'success', summary, detail });
    }
    error(detail, summary = 'Erreur') {
        this.messageService.add({ severity: 'error', summary, detail });
    }
    info(detail, summary = 'Info') {
        this.messageService.add({ severity: 'info', summary, detail });
    }
    static { this.ɵfac = function ToastService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ToastService)(i0.ɵɵinject(i1.MessageService)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ToastService, factory: ToastService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ToastService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.MessageService }], null); })();
//# sourceMappingURL=toast.service.js.map