import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class AnimalService {
    constructor(http) {
        this.http = http;
        this.baseUrl = `${environment.apiUrl}/animals`;
        this.apiOrigin = environment.apiUrl.replace(/\/api$/, '');
    }
    list(filter = {}) {
        return this.http
            .get(this.baseUrl, {
            params: {
                ...(filter.location ? { location: filter.location } : {}),
                ...(filter.type ? { type: filter.type } : {}),
                ...(filter.status ? { status: filter.status } : {}),
                ...(filter.minPrice != null ? { minPrice: String(filter.minPrice) } : {}),
                ...(filter.maxPrice != null ? { maxPrice: String(filter.maxPrice) } : {}),
            },
        })
            .pipe(map((animals) => animals.map((animal) => this.normalizeAnimal(animal))));
    }
    get(id) {
        return this.http
            .get(`${this.baseUrl}/${id}`)
            .pipe(map((animal) => this.normalizeAnimal(animal)));
    }
    mine() {
        return this.http
            .get(`${this.baseUrl}/mine`)
            .pipe(map((animals) => animals.map((animal) => this.normalizeAnimal(animal))));
    }
    pendingValidations() {
        return this.http
            .get(`${this.baseUrl}/validation/pending`)
            .pipe(map((animals) => animals.map((animal) => this.normalizeAnimal(animal))));
    }
    create(payload, files) {
        return this.http
            .post(this.baseUrl, this.buildAnimalFormData(payload, files))
            .pipe(map((animal) => this.normalizeAnimal(animal)));
    }
    update(id, payload, files) {
        return this.http
            .put(`${this.baseUrl}/${id}`, this.buildAnimalFormData(payload, files))
            .pipe(map((animal) => this.normalizeAnimal(animal)));
    }
    validate(id, payload) {
        return this.http
            .post(`${this.baseUrl}/${id}/validation`, payload)
            .pipe(map((animal) => this.normalizeAnimal(animal)));
    }
    upload(file, category) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('category', category);
        return this.http.post(`${environment.apiUrl}/files/upload`, formData);
    }
    resolveAssetUrl(url) {
        if (!url) {
            return '';
        }
        if (/^https?:\/\//i.test(url)) {
            return url;
        }
        return `${this.apiOrigin}${url}`;
    }
    toStoredAssetPath(url) {
        if (!url) {
            return '';
        }
        if (url.startsWith(this.apiOrigin)) {
            return url.slice(this.apiOrigin.length);
        }
        return url;
    }
    buildAnimalFormData(payload, files) {
        const formData = new FormData();
        formData.append('payload', new Blob([JSON.stringify(payload)], { type: 'application/json' }));
        for (const file of files?.photoFiles ?? []) {
            formData.append('photoFiles', file, file.name);
        }
        for (const file of files?.videoFiles ?? []) {
            formData.append('videoFiles', file, file.name);
        }
        for (const document of files?.documentFiles ?? []) {
            formData.append('documentFiles', document.file, document.file.name);
            formData.append('documentTypes', document.documentType);
        }
        return formData;
    }
    normalizeAnimal(animal) {
        return {
            ...animal,
            photos: (animal.photos ?? []).map((url) => this.resolveAssetUrl(url)),
            videos: (animal.videos ?? []).map((url) => this.resolveAssetUrl(url)),
            healthRecords: (animal.healthRecords ?? []).map((record) => ({
                ...record,
                documentUrl: this.resolveAssetUrl(record.documentUrl),
            })),
            history: animal.history ?? [],
        };
    }
    static { this.ɵfac = function AnimalService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AnimalService)(i0.ɵɵinject(i1.HttpClient)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AnimalService, factory: AnimalService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AnimalService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.HttpClient }], null); })();
//# sourceMappingURL=animal.service.js.map