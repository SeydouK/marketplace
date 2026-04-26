import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../../core/services/auth.service";
import * as i3 from "@angular/router";
import * as i4 from "../../../core/services/toast.service";
import * as i5 from "../../../core/services/user-status.service";
import * as i6 from "@angular/common";
function RegisterComponent_p_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 26);
    i0.ɵɵtext(1, "Nom requis.");
    i0.ɵɵelementEnd();
} }
function RegisterComponent_p_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 26);
    i0.ɵɵtext(1, "Pr\u00E9nom requis.");
    i0.ɵɵelementEnd();
} }
function RegisterComponent_p_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 26);
    i0.ɵɵtext(1, "Email requis.");
    i0.ɵɵelementEnd();
} }
function RegisterComponent_p_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 26);
    i0.ɵɵtext(1, "Email invalide.");
    i0.ɵɵelementEnd();
} }
function RegisterComponent_p_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 26);
    i0.ɵɵtext(1, "Mot de passe requis.");
    i0.ɵɵelementEnd();
} }
function RegisterComponent_p_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 26);
    i0.ɵɵtext(1, " Le mot de passe doit contenir au moins 6 caracteres. ");
    i0.ɵɵelementEnd();
} }
function RegisterComponent_p_45_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 26);
    i0.ɵɵtext(1, " Confirmation requise. ");
    i0.ɵɵelementEnd();
} }
function RegisterComponent_p_46_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 26);
    i0.ɵɵtext(1, " Les mots de passe ne correspondent pas. ");
    i0.ɵɵelementEnd();
} }
export class RegisterComponent {
    constructor(fb, auth, router, toast, userStatusService) {
        this.fb = fb;
        this.auth = auth;
        this.router = router;
        this.toast = toast;
        this.userStatusService = userStatusService;
        this.form = this.fb.group({
            surname: ['', Validators.required],
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            passwordConfirmation: ['', Validators.required],
        }, {
            validators: this.passwordMatchValidator(),
        });
        this.showPassword = false;
        this.showPasswordConfirmation = false;
        this.submitted = false;
    }
    togglePassword() {
        this.showPassword = !this.showPassword;
    }
    togglePasswordConfirmation() {
        this.showPasswordConfirmation = !this.showPasswordConfirmation;
    }
    controlInvalid(controlName, errorName) {
        const control = this.form.get(controlName);
        if (!control) {
            return false;
        }
        const shouldShow = control.invalid && (control.touched || control.dirty || this.submitted);
        return shouldShow && (!errorName || control.hasError(errorName));
    }
    formInvalid(errorName) {
        return !!this.form.hasError(errorName) && (this.form.dirty || this.form.touched || this.submitted);
    }
    submit() {
        this.submitted = true;
        if (this.form.invalid)
            return;
        const { surname, name, email, password } = this.form.getRawValue();
        this.auth.register({ surname: surname, name: name, email: email, password: password }).subscribe({
            next: (res) => {
                localStorage.setItem("token", res.token);
                this.userStatusService.update({
                    emailVerified: res.emailVerified,
                    kycStatus: res.kycStatus,
                    role: res.role,
                });
                this.toast.success('Compte crée avec succès');
                this.router.navigate(['/verify-email']);
            },
            error: (err) => {
                this.toast.error(err.error.message || "Erreur inscription");
            }
        });
    }
    passwordMatchValidator() {
        return (control) => {
            const password = control.get('password')?.value;
            const passwordConfirmation = control.get('passwordConfirmation')?.value;
            if (!password || !passwordConfirmation || password === passwordConfirmation) {
                return null;
            }
            return { passwordMismatch: true };
        };
    }
    static { this.ɵfac = function RegisterComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || RegisterComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.AuthService), i0.ɵɵdirectiveInject(i3.Router), i0.ɵɵdirectiveInject(i4.ToastService), i0.ɵɵdirectiveInject(i5.UserStatusService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: RegisterComponent, selectors: [["app-register"]], standalone: false, decls: 53, vars: 14, consts: [[1, "auth-hero"], [1, "hero-copy"], [1, "badge"], [1, "pi", "pi-user-plus"], [1, "subtitle"], [1, "auth-card"], [1, "form", 3, "ngSubmit", "formGroup"], [1, "field"], ["for", "surname"], ["id", "surname", "type", "text", "formControlName", "surname", "placeholder", "Votre nom de famille", 1, "text-field"], ["class", "error-text", 4, "ngIf"], ["for", "name"], ["id", "name", "type", "text", "formControlName", "name", "placeholder", "Votre pr\u00E9nom", 1, "text-field"], ["for", "email"], ["id", "email", "type", "email", "formControlName", "email", "placeholder", "email@exemple.com", 1, "text-field"], ["for", "password"], [1, "password-group"], ["id", "password", "formControlName", "password", "placeholder", "Au moins 6 caracteres", 3, "type"], ["type", "button", "aria-label", "Afficher ou masquer le mot de passe", 1, "eye-btn", 3, "click"], [1, "pi", 3, "ngClass"], ["for", "passwordConfirmation"], ["id", "passwordConfirmation", "formControlName", "passwordConfirmation", "placeholder", "Retapez votre mot de passe", 3, "type"], ["type", "button", "aria-label", "Afficher ou masquer la confirmation du mot de passe", 1, "eye-btn", 3, "click"], ["type", "submit", 1, "primary-submit", 3, "disabled"], [1, "hint"], ["routerLink", "/login"], [1, "error-text"]], template: function RegisterComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "span", 2);
            i0.ɵɵelement(3, "i", 3);
            i0.ɵɵtext(4, " Nouveau sur la plateforme ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "h1");
            i0.ɵɵtext(6, "Creez votre compte Marketplace");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "p", 4);
            i0.ɵɵtext(8, " Publiez vos annonces de betail, suivez vos ventes et retrouvez facilement les offres par ville. ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "div", 5)(10, "h2");
            i0.ɵɵtext(11, "Inscription");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "form", 6);
            i0.ɵɵlistener("ngSubmit", function RegisterComponent_Template_form_ngSubmit_12_listener() { return ctx.submit(); });
            i0.ɵɵelementStart(13, "div", 7)(14, "label", 8);
            i0.ɵɵtext(15, "Nom");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(16, "input", 9);
            i0.ɵɵtemplate(17, RegisterComponent_p_17_Template, 2, 0, "p", 10);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "div", 7)(19, "label", 11);
            i0.ɵɵtext(20, "Pr\u00E9nom");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(21, "input", 12);
            i0.ɵɵtemplate(22, RegisterComponent_p_22_Template, 2, 0, "p", 10);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "div", 7)(24, "label", 13);
            i0.ɵɵtext(25, "Email");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(26, "input", 14);
            i0.ɵɵtemplate(27, RegisterComponent_p_27_Template, 2, 0, "p", 10)(28, RegisterComponent_p_28_Template, 2, 0, "p", 10);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(29, "div", 7)(30, "label", 15);
            i0.ɵɵtext(31, "Mot de passe");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(32, "div", 16);
            i0.ɵɵelement(33, "input", 17);
            i0.ɵɵelementStart(34, "button", 18);
            i0.ɵɵlistener("click", function RegisterComponent_Template_button_click_34_listener() { return ctx.togglePassword(); });
            i0.ɵɵelement(35, "i", 19);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(36, RegisterComponent_p_36_Template, 2, 0, "p", 10)(37, RegisterComponent_p_37_Template, 2, 0, "p", 10);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(38, "div", 7)(39, "label", 20);
            i0.ɵɵtext(40, "Confirmation");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(41, "div", 16);
            i0.ɵɵelement(42, "input", 21);
            i0.ɵɵelementStart(43, "button", 22);
            i0.ɵɵlistener("click", function RegisterComponent_Template_button_click_43_listener() { return ctx.togglePasswordConfirmation(); });
            i0.ɵɵelement(44, "i", 19);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(45, RegisterComponent_p_45_Template, 2, 0, "p", 10)(46, RegisterComponent_p_46_Template, 2, 0, "p", 10);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(47, "button", 23);
            i0.ɵɵtext(48, " Creer mon compte ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(49, "p", 24);
            i0.ɵɵtext(50, " Vous avez deja un compte ? ");
            i0.ɵɵelementStart(51, "a", 25);
            i0.ɵɵtext(52, "Se connecter");
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(12);
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngIf", ctx.controlInvalid("surname", "required"));
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngIf", ctx.controlInvalid("name", "required"));
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
            i0.ɵɵproperty("ngIf", ctx.controlInvalid("password", "minlength"));
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("type", ctx.showPasswordConfirmation ? "text" : "password");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngClass", ctx.showPasswordConfirmation ? "pi-eye-slash" : "pi-eye");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.controlInvalid("passwordConfirmation", "required"));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.formInvalid("passwordMismatch"));
            i0.ɵɵadvance();
            i0.ɵɵproperty("disabled", ctx.form.invalid);
        } }, dependencies: [i6.NgClass, i6.NgIf, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, i3.RouterLink], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n\n.auth-hero[_ngcontent-%COMP%] {\n  min-height: calc(100vh - 120px);\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));\n  gap: 3rem;\n  align-items: center;\n  padding: 3rem 1.5rem;\n}\n\n.hero-copy[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n\n.badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  width: fit-content;\n  padding: 0.45rem 0.9rem;\n  border-radius: 999px;\n  background: rgba(220, 38, 38, 0.08);\n  color: #dc2626;\n  font-size: 0.85rem;\n  font-weight: 700;\n}\n\n.hero-copy[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: clamp(2rem, 5vw, 3rem);\n  line-height: 1.2;\n  background: linear-gradient(135deg, #ef4444, #dc2626);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n\n.subtitle[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #4b5563;\n  line-height: 1.7;\n  font-size: 1.125rem;\n}\n\n.auth-card[_ngcontent-%COMP%] {\n  width: min(100%, 500px);\n  margin: 0 auto;\n  padding: 2rem;\n  background: rgba(255, 255, 255, 0.94);\n  border: 1px solid rgba(17, 24, 39, 0.08);\n  border-radius: 1.5rem;\n  box-shadow: 0 24px 56px rgba(17, 24, 39, 0.12);\n  backdrop-filter: blur(20px);\n}\n\n.auth-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0 0 1.5rem;\n  font-size: 1.875rem;\n  color: #111827;\n}\n\n.form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n}\n\n.field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n\n.field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  color: #4b5563;\n  font-size: 0.875rem;\n  font-weight: 600;\n}\n\n.text-field[_ngcontent-%COMP%], \n.password-group[_ngcontent-%COMP%] {\n  border: 1px solid rgba(17, 24, 39, 0.08);\n  border-radius: 1rem;\n  background: #ffffff;\n  transition: border-color 0.2s ease, box-shadow 0.2s ease;\n}\n\n.text-field[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.9rem 1rem;\n  color: #111827;\n  outline: none;\n}\n\n.text-field[_ngcontent-%COMP%]:focus, \n.password-group[_ngcontent-%COMP%]:focus-within {\n  border-color: #dc2626;\n  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);\n}\n\n.password-group[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  padding: 0 0.75rem;\n}\n\n.password-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 0;\n  background: transparent;\n  padding: 0.9rem 0;\n  color: #111827;\n  outline: none;\n}\n\n.password-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::-ms-reveal, \n.password-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::-ms-clear, \n.text-field[type='password'][_ngcontent-%COMP%]::-ms-reveal, \n.text-field[type='password'][_ngcontent-%COMP%]::-ms-clear {\n  display: none;\n}\n\n.password-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::-webkit-credentials-auto-fill-button, \n.password-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::-webkit-contacts-auto-fill-button, \n.text-field[type='password'][_ngcontent-%COMP%]::-webkit-credentials-auto-fill-button, \n.text-field[type='password'][_ngcontent-%COMP%]::-webkit-contacts-auto-fill-button {\n  visibility: hidden;\n  display: none !important;\n  pointer-events: none;\n  position: absolute;\n  right: 0;\n}\n\n.eye-btn[_ngcontent-%COMP%] {\n  border: 0;\n  background: transparent;\n  color: #6b7280;\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0.25rem;\n}\n\n.eye-btn[_ngcontent-%COMP%]:hover {\n  color: #dc2626;\n}\n\n.primary-submit[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 0;\n  border-radius: 1rem;\n  padding: 0.95rem 1rem;\n  background: #dc2626;\n  color: #ffffff;\n  font-weight: 700;\n  cursor: pointer;\n  transition: background-color 0.2s ease, opacity 0.2s ease;\n}\n\n.primary-submit[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #b91c1c;\n}\n\n.primary-submit[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n\n.hint[_ngcontent-%COMP%] {\n  margin: 0;\n  text-align: center;\n  color: #4b5563;\n  font-size: 0.875rem;\n}\n\n.hint[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #dc2626;\n  font-weight: 600;\n}\n\n.error-text[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #dc2626;\n  font-size: 0.875rem;\n}\n\n@media (max-width: 768px) {\n  .auth-hero[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    padding: 2rem 1rem;\n  }\n\n  .auth-card[_ngcontent-%COMP%] {\n    padding: 1.5rem;\n  }\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RegisterComponent, [{
        type: Component,
        args: [{ selector: 'app-register', standalone: false, template: "<div class=\"auth-hero\">\r\n  <div class=\"hero-copy\">\r\n    <span class=\"badge\">\r\n      <i class=\"pi pi-user-plus\"></i>\r\n      Nouveau sur la plateforme\r\n    </span>\r\n    <h1>Creez votre compte Marketplace</h1>\r\n    <p class=\"subtitle\">\r\n      Publiez vos annonces de betail, suivez vos ventes et retrouvez facilement les offres par ville.\r\n    </p>\r\n  </div>\r\n\r\n  <div class=\"auth-card\">\r\n    <h2>Inscription</h2>\r\n    <form [formGroup]=\"form\" (ngSubmit)=\"submit()\" class=\"form\">\r\n      <div class=\"field\">\r\n        <label for=\"surname\">Nom</label>\r\n        <input\r\n          id=\"surname\"\r\n          type=\"text\"\r\n          formControlName=\"surname\"\r\n          class=\"text-field\"\r\n          placeholder=\"Votre nom de famille\"\r\n        />\r\n        <p *ngIf=\"controlInvalid('surname', 'required')\" class=\"error-text\">Nom requis.</p>\r\n      </div>\r\n\r\n      <div class=\"field\">\r\n        <label for=\"name\">Pr\u00E9nom</label>\r\n        <input \r\n        id=\"name\"\r\n        type=\"text\"\r\n        formControlName =\"name\"\r\n        class=\"text-field\"\r\n        placeholder=\"Votre pr\u00E9nom\"\r\n        />\r\n        <p *ngIf=\"controlInvalid('name','required')\" class=\"error-text\">Pr\u00E9nom requis.</p>\r\n      </div>\r\n\r\n      <div class=\"field\">\r\n        <label for=\"email\">Email</label>\r\n        <input\r\n          id=\"email\"\r\n          type=\"email\"\r\n          formControlName=\"email\"\r\n          class=\"text-field\"\r\n          placeholder=\"email@exemple.com\"\r\n        />\r\n        <p *ngIf=\"controlInvalid('email', 'required')\" class=\"error-text\">Email requis.</p>\r\n        <p *ngIf=\"controlInvalid('email', 'email')\" class=\"error-text\">Email invalide.</p>\r\n      </div>\r\n\r\n      <div class=\"field\">\r\n        <label for=\"password\">Mot de passe</label>\r\n        <div class=\"password-group\">\r\n          <input\r\n            id=\"password\"\r\n            [type]=\"showPassword ? 'text' : 'password'\"\r\n            formControlName=\"password\"\r\n            placeholder=\"Au moins 6 caracteres\"\r\n          />\r\n          <button\r\n            type=\"button\"\r\n            class=\"eye-btn\"\r\n            (click)=\"togglePassword()\"\r\n            aria-label=\"Afficher ou masquer le mot de passe\"\r\n          >\r\n            <i class=\"pi\" [ngClass]=\"showPassword ? 'pi-eye-slash' : 'pi-eye'\"></i>\r\n          </button>\r\n        </div>\r\n        <p *ngIf=\"controlInvalid('password', 'required')\" class=\"error-text\">Mot de passe requis.</p>\r\n        <p *ngIf=\"controlInvalid('password', 'minlength')\" class=\"error-text\">\r\n          Le mot de passe doit contenir au moins 6 caracteres.\r\n        </p>\r\n      </div>\r\n\r\n      <div class=\"field\">\r\n        <label for=\"passwordConfirmation\">Confirmation</label>\r\n        <div class=\"password-group\">\r\n          <input\r\n            id=\"passwordConfirmation\"\r\n            [type]=\"showPasswordConfirmation ? 'text' : 'password'\"\r\n            formControlName=\"passwordConfirmation\"\r\n            placeholder=\"Retapez votre mot de passe\"\r\n          />\r\n          <button\r\n            type=\"button\"\r\n            class=\"eye-btn\"\r\n            (click)=\"togglePasswordConfirmation()\"\r\n            aria-label=\"Afficher ou masquer la confirmation du mot de passe\"\r\n          >\r\n            <i class=\"pi\" [ngClass]=\"showPasswordConfirmation ? 'pi-eye-slash' : 'pi-eye'\"></i>\r\n          </button>\r\n        </div>\r\n        <p *ngIf=\"controlInvalid('passwordConfirmation', 'required')\" class=\"error-text\">\r\n          Confirmation requise.\r\n        </p>\r\n        <p *ngIf=\"formInvalid('passwordMismatch')\" class=\"error-text\">\r\n          Les mots de passe ne correspondent pas.\r\n        </p>\r\n      </div>      \r\n\r\n      <button type=\"submit\" class=\"primary-submit\" [disabled]=\"form.invalid\">\r\n        Creer mon compte\r\n      </button>\r\n\r\n      <p class=\"hint\">\r\n        Vous avez deja un compte ?\r\n        <a routerLink=\"/login\">Se connecter</a>\r\n      </p>\r\n    </form>\r\n  </div>\r\n</div>\r\n", styles: [":host {\n  display: block;\n}\n\n.auth-hero {\n  min-height: calc(100vh - 120px);\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));\n  gap: 3rem;\n  align-items: center;\n  padding: 3rem 1.5rem;\n}\n\n.hero-copy {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n\n.badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  width: fit-content;\n  padding: 0.45rem 0.9rem;\n  border-radius: 999px;\n  background: rgba(220, 38, 38, 0.08);\n  color: #dc2626;\n  font-size: 0.85rem;\n  font-weight: 700;\n}\n\n.hero-copy h1 {\n  margin: 0;\n  font-size: clamp(2rem, 5vw, 3rem);\n  line-height: 1.2;\n  background: linear-gradient(135deg, #ef4444, #dc2626);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n\n.subtitle {\n  margin: 0;\n  color: #4b5563;\n  line-height: 1.7;\n  font-size: 1.125rem;\n}\n\n.auth-card {\n  width: min(100%, 500px);\n  margin: 0 auto;\n  padding: 2rem;\n  background: rgba(255, 255, 255, 0.94);\n  border: 1px solid rgba(17, 24, 39, 0.08);\n  border-radius: 1.5rem;\n  box-shadow: 0 24px 56px rgba(17, 24, 39, 0.12);\n  backdrop-filter: blur(20px);\n}\n\n.auth-card h2 {\n  margin: 0 0 1.5rem;\n  font-size: 1.875rem;\n  color: #111827;\n}\n\n.form {\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n}\n\n.field {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n\n.field label {\n  color: #4b5563;\n  font-size: 0.875rem;\n  font-weight: 600;\n}\n\n.text-field,\n.password-group {\n  border: 1px solid rgba(17, 24, 39, 0.08);\n  border-radius: 1rem;\n  background: #ffffff;\n  transition: border-color 0.2s ease, box-shadow 0.2s ease;\n}\n\n.text-field {\n  width: 100%;\n  padding: 0.9rem 1rem;\n  color: #111827;\n  outline: none;\n}\n\n.text-field:focus,\n.password-group:focus-within {\n  border-color: #dc2626;\n  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);\n}\n\n.password-group {\n  display: flex;\n  align-items: center;\n  padding: 0 0.75rem;\n}\n\n.password-group input {\n  width: 100%;\n  border: 0;\n  background: transparent;\n  padding: 0.9rem 0;\n  color: #111827;\n  outline: none;\n}\n\n.password-group input::-ms-reveal,\n.password-group input::-ms-clear,\n.text-field[type='password']::-ms-reveal,\n.text-field[type='password']::-ms-clear {\n  display: none;\n}\n\n.password-group input::-webkit-credentials-auto-fill-button,\n.password-group input::-webkit-contacts-auto-fill-button,\n.text-field[type='password']::-webkit-credentials-auto-fill-button,\n.text-field[type='password']::-webkit-contacts-auto-fill-button {\n  visibility: hidden;\n  display: none !important;\n  pointer-events: none;\n  position: absolute;\n  right: 0;\n}\n\n.eye-btn {\n  border: 0;\n  background: transparent;\n  color: #6b7280;\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0.25rem;\n}\n\n.eye-btn:hover {\n  color: #dc2626;\n}\n\n.primary-submit {\n  width: 100%;\n  border: 0;\n  border-radius: 1rem;\n  padding: 0.95rem 1rem;\n  background: #dc2626;\n  color: #ffffff;\n  font-weight: 700;\n  cursor: pointer;\n  transition: background-color 0.2s ease, opacity 0.2s ease;\n}\n\n.primary-submit:hover:not(:disabled) {\n  background: #b91c1c;\n}\n\n.primary-submit:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n\n.hint {\n  margin: 0;\n  text-align: center;\n  color: #4b5563;\n  font-size: 0.875rem;\n}\n\n.hint a {\n  color: #dc2626;\n  font-weight: 600;\n}\n\n.error-text {\n  margin: 0;\n  color: #dc2626;\n  font-size: 0.875rem;\n}\n\n@media (max-width: 768px) {\n  .auth-hero {\n    grid-template-columns: 1fr;\n    padding: 2rem 1rem;\n  }\n\n  .auth-card {\n    padding: 1.5rem;\n  }\n}\n"] }]
    }], () => [{ type: i1.FormBuilder }, { type: i2.AuthService }, { type: i3.Router }, { type: i4.ToastService }, { type: i5.UserStatusService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(RegisterComponent, { className: "RegisterComponent", filePath: "src/app/features/auth/register/register.component.ts", lineNumber: 15 }); })();
//# sourceMappingURL=register.component.js.map