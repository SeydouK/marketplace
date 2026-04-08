import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../../animaux/services/animal.service";
export class ListingService {
    constructor(animalService) {
        this.animalService = animalService;
    }
    search(filter = {}) {
        return this.list(filter);
    }
    list(filter = {}) {
        return this.animalService
            .list({
            location: filter.location,
            type: filter.animalType || '',
            status: filter.status || '',
            minPrice: filter.minPrice ?? null,
            maxPrice: filter.maxPrice ?? null,
        })
            .pipe(map((animals) => animals.map((animal) => this.toListing(animal))));
    }
    get(id) {
        return this.animalService
            .get(id)
            .pipe(map((animal) => this.toListing(animal)));
    }
    myListings() {
        return this.animalService
            .mine()
            .pipe(map((animals) => animals.map((animal) => this.toListing(animal))));
    }
    toListing(animal) {
        const location = animal.lieuNaissance?.trim() || 'Localisation non renseignée';
        const quantity = animal.quantity ?? 1;
        const latestHistory = animal.history?.[0]?.description?.trim();
        return {
            id: animal.id,
            title: animal.displayName || this.buildTitle(animal),
            description: latestHistory || this.buildDescription(animal, location, quantity),
            animalType: animal.type,
            price: animal.price,
            location,
            sellerId: animal.sellerId,
            sellerName: animal.sellerName,
            sellerEmail: animal.sellerEmail,
            image: animal.photos[0] || '',
            gallery: animal.photos,
            breed: animal.race || '',
            quantity,
            status: animal.status,
            qrCode: animal.qrCode,
            groupedLot: animal.groupedLot,
            latitude: this.toCoordinate(animal.latitude),
            longitude: this.toCoordinate(animal.longitude),
        };
    }
    buildTitle(animal) {
        if (animal.race?.trim()) {
            return `${this.formatAnimalType(animal.type)} ${animal.race.trim()}`;
        }
        return `${this.formatAnimalType(animal.type)} ${animal.qrCode}`;
    }
    buildDescription(animal, location, quantity) {
        const lotLabel = quantity > 1 ? `${quantity} têtes` : '1 tête';
        const groupedSuffix = animal.groupedLot
            ? 'Ce lot est suivi sous une référence commune dans le POC.'
            : 'Le dossier sanitaire reste associé à cet animal.';
        return `${lotLabel} enregistré à ${location}. ${groupedSuffix}`;
    }
    formatAnimalType(animalType) {
        return animalType.charAt(0) + animalType.slice(1).toLowerCase();
    }
    toCoordinate(value) {
        if (value == null || value === '') {
            return null;
        }
        const normalized = Number(value);
        return Number.isFinite(normalized) ? normalized : null;
    }
    static { this.ɵfac = function ListingService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ListingService)(i0.ɵɵinject(i1.AnimalService)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ListingService, factory: ListingService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ListingService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.AnimalService }], null); })();
//# sourceMappingURL=listing.service.js.map