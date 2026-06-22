import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import Lara from '@primeng/themes/lara';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import * as i0 from "@angular/core";
export class AppModule {
    static { this.ɵfac = function AppModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AppModule)(); }; }
    static { this.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AppModule, bootstrap: [AppComponent] }); }
    static { this.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [
            provideAnimationsAsync(),
            providePrimeNG({ theme: { preset: Lara } }),
            MessageService,
            { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
            { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
            { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
        ], imports: [BrowserModule,
            HttpClientModule,
            AppRoutingModule,
            SharedModule,
            Toast] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AppModule, [{
        type: NgModule,
        args: [{
                declarations: [AppComponent],
                imports: [
                    BrowserModule,
                    HttpClientModule,
                    AppRoutingModule,
                    SharedModule,
                    Toast,
                ],
                providers: [
                    provideAnimationsAsync(),
                    providePrimeNG({ theme: { preset: Lara } }),
                    MessageService,
                    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
                    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
                    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
                ],
                bootstrap: [AppComponent],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AppModule, { declarations: [AppComponent], imports: [BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        SharedModule,
        Toast] }); })();
//# sourceMappingURL=app.module.js.map