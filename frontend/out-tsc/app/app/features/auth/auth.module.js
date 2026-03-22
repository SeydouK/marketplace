import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import * as i0 from "@angular/core";
export class AuthModule {
    static { this.ɵfac = function AuthModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AuthModule)(); }; }
    static { this.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AuthModule }); }
    static { this.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [CommonModule,
            ReactiveFormsModule,
            AuthRoutingModule,
            Button] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuthModule, [{
        type: NgModule,
        args: [{
                declarations: [LoginComponent, RegisterComponent],
                imports: [
                    CommonModule,
                    ReactiveFormsModule,
                    AuthRoutingModule,
                    InputText,
                    Button,
                ],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AuthModule, { declarations: [LoginComponent, RegisterComponent], imports: [CommonModule,
        ReactiveFormsModule,
        AuthRoutingModule,
        InputText,
        Button] }); })();
//# sourceMappingURL=auth.module.js.map