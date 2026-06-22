import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../../core/services/auth.service";
import * as i3 from "@angular/router";
import * as i4 from "../../../core/services/toast.service";
import * as i5 from "@angular/common";
function LoginComponent_p_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 23);
    i0.ɵɵtext(1, "Email requis.");
    i0.ɵɵelementEnd();
} }
function LoginComponent_p_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 23);
    i0.ɵɵtext(1, "Email invalide.");
    i0.ɵɵelementEnd();
} }
function LoginComponent_p_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 23);
    i0.ɵɵtext(1, "Mot de passe requis.");
    i0.ɵɵelementEnd();
} }
export class LoginComponent {
    constructor(fb, auth, router, toast) {
        this.fb = fb;
        this.auth = auth;
        this.router = router;
        this.toast = toast;
        this.form = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
            remember: [false],
        });
        this.showPassword = false;
        this.submitted = false;
    }
    togglePassword() {
        this.showPassword = !this.showPassword;
    }
    controlInvalid(controlName, errorName) {
        const control = this.form.get(controlName);
        if (!control) {
            return false;
        }
        const shouldShow = control.invalid && (control.touched || control.dirty || this.submitted);
        return shouldShow && (!errorName || control.hasError(errorName));
    }
    submit() {
        this.submitted = true;
        if (this.form.invalid)
            return;
        const { email, password } = this.form.value;
        this.auth.login(email, password).subscribe({
            next: () => {
                this.toast.success('Connexion reussie');
                this.router.navigate(['/']);
            },
        });
    }
    static { this.ɵfac = function LoginComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LoginComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.AuthService), i0.ɵɵdirectiveInject(i3.Router), i0.ɵɵdirectiveInject(i4.ToastService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LoginComponent, selectors: [["app-login"]], standalone: false, decls: 43, vars: 7, consts: [[1, "auth-hero"], [1, "hero-copy"], [1, "badge"], [1, "pi", "pi-sign-in"], [1, "subtitle"], [1, "pill-list"], [1, "pi", "pi-shield"], [1, "pi", "pi-bolt"], [1, "pi", "pi-map-marker"], [1, "auth-card"], [1, "form", 3, "ngSubmit", "formGroup"], [1, "field"], ["for", "email"], ["id", "email", "type", "email", "formControlName", "email", "placeholder", "email@exemple.com", 1, "text-field"], ["class", "error-text", 4, "ngIf"], ["for", "password"], [1, "password-group"], ["id", "password", "formControlName", "password", "placeholder", "Votre mot de passe", 3, "type"], ["type", "button", "aria-label", "Afficher ou masquer le mot de passe", 1, "eye-btn", 3, "click"], [1, "pi", 3, "ngClass"], ["type", "submit", 1, "primary-submit", 3, "disabled"], [1, "hint"], ["routerLink", "/register"], [1, "error-text"]], template: function LoginComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "span", 2);
            i0.ɵɵelement(3, "i", 3);
            i0.ɵɵtext(4, " Espace vendeur et acheteur ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "h1");
            i0.ɵɵtext(6, "Connectez-vous a votre marketplace betail");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "p", 4);
            i0.ɵɵtext(8, " Retrouvez vos annonces, publiez de nouveaux animaux et accedez a votre dashboard. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "ul", 5)(10, "li");
            i0.ɵɵelement(11, "i", 6);
            i0.ɵɵtext(12, " Connexion securisee");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "li");
            i0.ɵɵelement(14, "i", 7);
            i0.ɵɵtext(15, " Gestion rapide des annonces");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "li");
            i0.ɵɵelement(17, "i", 8);
            i0.ɵɵtext(18, " Catalogue par ville");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(19, "div", 9)(20, "h2");
            i0.ɵɵtext(21, "Connexion");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "form", 10);
            i0.ɵɵlistener("ngSubmit", function LoginComponent_Template_form_ngSubmit_22_listener() { return ctx.submit(); });
            i0.ɵɵelementStart(23, "div", 11)(24, "label", 12);
            i0.ɵɵtext(25, "Email");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(26, "input", 13);
            i0.ɵɵtemplate(27, LoginComponent_p_27_Template, 2, 0, "p", 14)(28, LoginComponent_p_28_Template, 2, 0, "p", 14);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(29, "div", 11)(30, "label", 15);
            i0.ɵɵtext(31, "Mot de passe");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(32, "div", 16);
            i0.ɵɵelement(33, "input", 17);
            i0.ɵɵelementStart(34, "button", 18);
            i0.ɵɵlistener("click", function LoginComponent_Template_button_click_34_listener() { return ctx.togglePassword(); });
            i0.ɵɵelement(35, "i", 19);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(36, LoginComponent_p_36_Template, 2, 0, "p", 14);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(37, "button", 20);
            i0.ɵɵtext(38, " Se connecter ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(39, "p", 21);
            i0.ɵɵtext(40, " Pas de compte ? ");
            i0.ɵɵelementStart(41, "a", 22);
            i0.ɵɵtext(42, "Creer un compte");
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(22);
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngIf", ctx.controlInvalid("email", "required"));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.controlInvalid("email", "email"));
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("type", ctx.showPassword ? "text" : "password");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngClass", ctx.showPassword ? "pi-eye-slash" : "pi-eye");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.controlInvalid("password", "required"));
            i0.ɵɵadvance();
            i0.ɵɵproperty("disabled", ctx.form.invalid);
        } }, dependencies: [i5.NgClass, i5.NgIf, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, i3.RouterLink], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n\n.auth-hero[_ngcontent-%COMP%] {\n  min-height: calc(100vh - 120px);\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));\n  gap: 3rem;\n  align-items: center;\n  padding: 3rem 1.5rem;\n}\n\n.hero-copy[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n\n.badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  width: fit-content;\n  padding: 0.45rem 0.9rem;\n  border-radius: 999px;\n  background: rgba(220, 38, 38, 0.08);\n  color: #dc2626;\n  font-size: 0.85rem;\n  font-weight: 700;\n}\n\n.hero-copy[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: clamp(2rem, 5vw, 3rem);\n  line-height: 1.2;\n  background: linear-gradient(135deg, #ef4444, #dc2626);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n\n.subtitle[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #4b5563;\n  line-height: 1.7;\n  font-size: 1.125rem;\n}\n\n.pill-list[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0.5rem 0 0;\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.75rem;\n}\n\n.pill-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.55rem 1rem;\n  background: #ffffff;\n  border: 1px solid rgba(17, 24, 39, 0.08);\n  border-radius: 999px;\n  color: #4b5563;\n  box-shadow: 0 12px 24px rgba(17, 24, 39, 0.08);\n}\n\n.pill-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #dc2626;\n}\n\n.auth-card[_ngcontent-%COMP%] {\n  width: min(100%, 500px);\n  margin: 0 auto;\n  padding: 2rem;\n  background: rgba(255, 255, 255, 0.94);\n  border: 1px solid rgba(17, 24, 39, 0.08);\n  border-radius: 1.5rem;\n  box-shadow: 0 24px 56px rgba(17, 24, 39, 0.12);\n  backdrop-filter: blur(20px);\n}\n\n.auth-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0 0 1.5rem;\n  font-size: 1.875rem;\n  color: #111827;\n}\n\n.form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n}\n\n.field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n\n.field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  color: #4b5563;\n  font-size: 0.875rem;\n  font-weight: 600;\n}\n\n.text-field[_ngcontent-%COMP%], \n.password-group[_ngcontent-%COMP%] {\n  border: 1px solid rgba(17, 24, 39, 0.08);\n  border-radius: 1rem;\n  background: #ffffff;\n  transition: border-color 0.2s ease, box-shadow 0.2s ease;\n}\n\n.text-field[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.9rem 1rem;\n  color: #111827;\n  outline: none;\n}\n\n.text-field[_ngcontent-%COMP%]:focus, \n.password-group[_ngcontent-%COMP%]:focus-within {\n  border-color: #dc2626;\n  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);\n}\n\n.password-group[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  padding: 0 0.75rem;\n}\n\n.password-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 0;\n  background: transparent;\n  padding: 0.9rem 0;\n  color: #111827;\n  outline: none;\n}\n\n.password-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::-ms-reveal, \n.password-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::-ms-clear, \n.text-field[type='password'][_ngcontent-%COMP%]::-ms-reveal, \n.text-field[type='password'][_ngcontent-%COMP%]::-ms-clear {\n  display: none;\n}\n\n.password-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::-webkit-credentials-auto-fill-button, \n.password-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::-webkit-contacts-auto-fill-button, \n.text-field[type='password'][_ngcontent-%COMP%]::-webkit-credentials-auto-fill-button, \n.text-field[type='password'][_ngcontent-%COMP%]::-webkit-contacts-auto-fill-button {\n  visibility: hidden;\n  display: none !important;\n  pointer-events: none;\n  position: absolute;\n  right: 0;\n}\n\n.eye-btn[_ngcontent-%COMP%] {\n  border: 0;\n  background: transparent;\n  color: #6b7280;\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0.25rem;\n}\n\n.eye-btn[_ngcontent-%COMP%]:hover {\n  color: #dc2626;\n}\n\n.primary-submit[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 0;\n  border-radius: 1rem;\n  padding: 0.95rem 1rem;\n  background: #dc2626;\n  color: #ffffff;\n  font-weight: 700;\n  cursor: pointer;\n  transition: background-color 0.2s ease, opacity 0.2s ease;\n}\n\n.primary-submit[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #b91c1c;\n}\n\n.primary-submit[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n\n.hint[_ngcontent-%COMP%] {\n  margin: 0;\n  text-align: center;\n  color: #4b5563;\n  font-size: 0.875rem;\n}\n\n.hint[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #dc2626;\n  font-weight: 600;\n}\n\n.error-text[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #dc2626;\n  font-size: 0.875rem;\n}\n\n@media (max-width: 768px) {\n  .auth-hero[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    padding: 2rem 1rem;\n  }\n\n  .auth-card[_ngcontent-%COMP%] {\n    padding: 1.5rem;\n  }\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LoginComponent, [{
        type: Component,
        args: [{ selector: 'app-login', standalone: false, template: "<div class=\"auth-hero\">\n  <div class=\"hero-copy\">\n    <span class=\"badge\">\n      <i class=\"pi pi-sign-in\"></i>\n      Espace vendeur et acheteur\n    </span>\n    <h1>Connectez-vous a votre marketplace betail</h1>\n    <p class=\"subtitle\">\n      Retrouvez vos annonces, publiez de nouveaux animaux et accedez a votre dashboard.\n    </p>\n    <ul class=\"pill-list\">\n      <li><i class=\"pi pi-shield\"></i> Connexion securisee</li>\n      <li><i class=\"pi pi-bolt\"></i> Gestion rapide des annonces</li>\n      <li><i class=\"pi pi-map-marker\"></i> Catalogue par ville</li>\n    </ul>\n  </div>\n\n  <div class=\"auth-card\">\n    <h2>Connexion</h2>\n    <form [formGroup]=\"form\" (ngSubmit)=\"submit()\" class=\"form\">\n      <div class=\"field\">\n        <label for=\"email\">Email</label>\n        <input\n          id=\"email\"\n          type=\"email\"\n          formControlName=\"email\"\n          class=\"text-field\"\n          placeholder=\"email@exemple.com\"\n        />\n        <p *ngIf=\"controlInvalid('email', 'required')\" class=\"error-text\">Email requis.</p>\n        <p *ngIf=\"controlInvalid('email', 'email')\" class=\"error-text\">Email invalide.</p>\n      </div>\n\n      <div class=\"field\">\n        <label for=\"password\">Mot de passe</label>\n        <div class=\"password-group\">\n          <input\n            id=\"password\"\n            [type]=\"showPassword ? 'text' : 'password'\"\n            formControlName=\"password\"\n            placeholder=\"Votre mot de passe\"\n          />\n          <button\n            type=\"button\"\n            class=\"eye-btn\"\n            (click)=\"togglePassword()\"\n            aria-label=\"Afficher ou masquer le mot de passe\"\n          >\n            <i class=\"pi\" [ngClass]=\"showPassword ? 'pi-eye-slash' : 'pi-eye'\"></i>\n          </button>\n        </div>\n        <p *ngIf=\"controlInvalid('password', 'required')\" class=\"error-text\">Mot de passe requis.</p>\n      </div>\n\n      <button type=\"submit\" class=\"primary-submit\" [disabled]=\"form.invalid\">\n        Se connecter\n      </button>\n\n      <p class=\"hint\">\n        Pas de compte ?\n        <a routerLink=\"/register\">Creer un compte</a>\n      </p>\n    </form>\n  </div>\n</div>\n", styles: [":host {\n  display: block;\n}\n\n.auth-hero {\n  min-height: calc(100vh - 120px);\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));\n  gap: 3rem;\n  align-items: center;\n  padding: 3rem 1.5rem;\n}\n\n.hero-copy {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n\n.badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  width: fit-content;\n  padding: 0.45rem 0.9rem;\n  border-radius: 999px;\n  background: rgba(220, 38, 38, 0.08);\n  color: #dc2626;\n  font-size: 0.85rem;\n  font-weight: 700;\n}\n\n.hero-copy h1 {\n  margin: 0;\n  font-size: clamp(2rem, 5vw, 3rem);\n  line-height: 1.2;\n  background: linear-gradient(135deg, #ef4444, #dc2626);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n\n.subtitle {\n  margin: 0;\n  color: #4b5563;\n  line-height: 1.7;\n  font-size: 1.125rem;\n}\n\n.pill-list {\n  list-style: none;\n  padding: 0;\n  margin: 0.5rem 0 0;\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.75rem;\n}\n\n.pill-list li {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.55rem 1rem;\n  background: #ffffff;\n  border: 1px solid rgba(17, 24, 39, 0.08);\n  border-radius: 999px;\n  color: #4b5563;\n  box-shadow: 0 12px 24px rgba(17, 24, 39, 0.08);\n}\n\n.pill-list li i {\n  color: #dc2626;\n}\n\n.auth-card {\n  width: min(100%, 500px);\n  margin: 0 auto;\n  padding: 2rem;\n  background: rgba(255, 255, 255, 0.94);\n  border: 1px solid rgba(17, 24, 39, 0.08);\n  border-radius: 1.5rem;\n  box-shadow: 0 24px 56px rgba(17, 24, 39, 0.12);\n  backdrop-filter: blur(20px);\n}\n\n.auth-card h2 {\n  margin: 0 0 1.5rem;\n  font-size: 1.875rem;\n  color: #111827;\n}\n\n.form {\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n}\n\n.field {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n\n.field label {\n  color: #4b5563;\n  font-size: 0.875rem;\n  font-weight: 600;\n}\n\n.text-field,\n.password-group {\n  border: 1px solid rgba(17, 24, 39, 0.08);\n  border-radius: 1rem;\n  background: #ffffff;\n  transition: border-color 0.2s ease, box-shadow 0.2s ease;\n}\n\n.text-field {\n  width: 100%;\n  padding: 0.9rem 1rem;\n  color: #111827;\n  outline: none;\n}\n\n.text-field:focus,\n.password-group:focus-within {\n  border-color: #dc2626;\n  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);\n}\n\n.password-group {\n  display: flex;\n  align-items: center;\n  padding: 0 0.75rem;\n}\n\n.password-group input {\n  width: 100%;\n  border: 0;\n  background: transparent;\n  padding: 0.9rem 0;\n  color: #111827;\n  outline: none;\n}\n\n.password-group input::-ms-reveal,\n.password-group input::-ms-clear,\n.text-field[type='password']::-ms-reveal,\n.text-field[type='password']::-ms-clear {\n  display: none;\n}\n\n.password-group input::-webkit-credentials-auto-fill-button,\n.password-group input::-webkit-contacts-auto-fill-button,\n.text-field[type='password']::-webkit-credentials-auto-fill-button,\n.text-field[type='password']::-webkit-contacts-auto-fill-button {\n  visibility: hidden;\n  display: none !important;\n  pointer-events: none;\n  position: absolute;\n  right: 0;\n}\n\n.eye-btn {\n  border: 0;\n  background: transparent;\n  color: #6b7280;\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0.25rem;\n}\n\n.eye-btn:hover {\n  color: #dc2626;\n}\n\n.primary-submit {\n  width: 100%;\n  border: 0;\n  border-radius: 1rem;\n  padding: 0.95rem 1rem;\n  background: #dc2626;\n  color: #ffffff;\n  font-weight: 700;\n  cursor: pointer;\n  transition: background-color 0.2s ease, opacity 0.2s ease;\n}\n\n.primary-submit:hover:not(:disabled) {\n  background: #b91c1c;\n}\n\n.primary-submit:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n\n.hint {\n  margin: 0;\n  text-align: center;\n  color: #4b5563;\n  font-size: 0.875rem;\n}\n\n.hint a {\n  color: #dc2626;\n  font-weight: 600;\n}\n\n.error-text {\n  margin: 0;\n  color: #dc2626;\n  font-size: 0.875rem;\n}\n\n@media (max-width: 768px) {\n  .auth-hero {\n    grid-template-columns: 1fr;\n    padding: 2rem 1rem;\n  }\n\n  .auth-card {\n    padding: 1.5rem;\n  }\n}\n"] }]
    }], () => [{ type: i1.FormBuilder }, { type: i2.AuthService }, { type: i3.Router }, { type: i4.ToastService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "src/app/features/auth/login/login.component.ts", lineNumber: 13 }); })();
//# sourceMappingURL=login.component.js.map