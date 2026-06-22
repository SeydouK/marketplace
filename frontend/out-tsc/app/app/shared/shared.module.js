import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ListingCardComponent } from './components/listing-card/listing-card.component';
import { CitySectionComponent } from './components/city-section/city-section.component';
import { Menubar } from 'primeng/menubar';
import { Button } from 'primeng/button';
import { ProgressSpinner } from 'primeng/progressspinner';
import * as i0 from "@angular/core";
export class SharedModule {
    static { this.ɵfac = function SharedModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SharedModule)(); }; }
    static { this.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: SharedModule }); }
    static { this.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [CommonModule, RouterModule, Menubar, Button, ProgressSpinner, CommonModule] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SharedModule, [{
        type: NgModule,
        args: [{
                declarations: [HeaderComponent, FooterComponent, LoaderComponent, ListingCardComponent, CitySectionComponent],
                imports: [CommonModule, RouterModule, Menubar, Button, ProgressSpinner],
                exports: [
                    HeaderComponent,
                    FooterComponent,
                    LoaderComponent,
                    ListingCardComponent,
                    CitySectionComponent,
                    Menubar,
                    Button,
                    ProgressSpinner,
                    CommonModule,
                ],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(SharedModule, { declarations: [HeaderComponent, FooterComponent, LoaderComponent, ListingCardComponent, CitySectionComponent], imports: [CommonModule, RouterModule, Menubar, Button, ProgressSpinner], exports: [HeaderComponent,
        FooterComponent,
        LoaderComponent,
        ListingCardComponent,
        CitySectionComponent,
        Menubar,
        Button,
        ProgressSpinner,
        CommonModule] }); })();
//# sourceMappingURL=shared.module.js.map