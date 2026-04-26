import { Component, ViewChild } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@angular/router";
import * as i3 from "../../core/services/toast.service";
import * as i4 from "../../core/services/storage.service";
import * as i5 from "../../core/services/user-status.service";
import * as i6 from "@angular/common";
const _c0 = ["videoEl"];
const _c1 = ["canvasEl"];
const _c2 = a0 => ({ "border-rose-300 bg-rose-50": a0 });
function KycComponent_div_2_i_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 13);
} }
function KycComponent_div_2_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "1");
    i0.ɵɵelementEnd();
} }
function KycComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7)(1, "div", 8)(2, "div", 9);
    i0.ɵɵtemplate(3, KycComponent_div_2_i_3_Template, 1, 0, "i", 10)(4, KycComponent_div_2_span_4_Template, 2, 0, "span", 5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 11);
    i0.ɵɵtext(6, "Pi\u00E8ce d'identit\u00E9");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(7, "div", 12);
    i0.ɵɵelementStart(8, "div", 8)(9, "div", 9);
    i0.ɵɵtext(10, "2");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "span", 11);
    i0.ɵɵtext(12, "Selfie");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", ctx_r0.step === "cni" ? "bg-rose-500 text-white" : "bg-green-100 text-green-600");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.step !== "cni");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.step === "cni");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", ctx_r0.step === "cni" ? "text-gray-900" : "text-gray-400");
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngClass", ctx_r0.step === "selfie" ? "bg-rose-500 text-white" : "bg-gray-100 text-gray-400");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", ctx_r0.step === "selfie" ? "text-gray-900" : "text-gray-400");
} }
function KycComponent_div_3_ng_container_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 25);
    i0.ɵɵelement(2, "i", 26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 27);
    i0.ɵɵtext(4, "Cliquez pour choisir une photo");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 28);
    i0.ɵɵtext(6, "JPG, PNG \u2014 max 10 MB");
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} }
function KycComponent_div_3_ng_container_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "img", 29);
    i0.ɵɵelementStart(2, "p", 30);
    i0.ɵɵtext(3, "Cliquez pour changer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", ctx_r0.cniPreview, i0.ɵɵsanitizeUrl);
} }
function KycComponent_div_3_i_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 31);
} }
function KycComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div")(1, "div", 14)(2, "h1", 15);
    i0.ɵɵtext(3, "Votre pi\u00E8ce d'identit\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p", 16);
    i0.ɵɵtext(5, " Prenez une photo claire de votre Carte Nationale d'Identit\u00E9 ivoirienne, recto visible. ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "label", 17);
    i0.ɵɵtemplate(7, KycComponent_div_3_ng_container_7_Template, 7, 0, "ng-container", 5)(8, KycComponent_div_3_ng_container_8_Template, 4, 1, "ng-container", 5);
    i0.ɵɵelementStart(9, "input", 18);
    i0.ɵɵlistener("change", function KycComponent_div_3_Template_input_change_9_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.onCniSelected($event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "div", 19)(11, "p", 20);
    i0.ɵɵtext(12, "Conseils");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "ul", 21)(14, "li", 8);
    i0.ɵɵelement(15, "i", 22);
    i0.ɵɵtext(16, " Bonne luminosit\u00E9, pas de reflet");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "li", 8);
    i0.ɵɵelement(18, "i", 22);
    i0.ɵɵtext(19, " Document entier visible");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "li", 8);
    i0.ɵɵelement(21, "i", 22);
    i0.ɵɵtext(22, " Texte lisible et net");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(23, "button", 23);
    i0.ɵɵlistener("click", function KycComponent_div_3_Template_button_click_23_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.submitCni()); });
    i0.ɵɵtemplate(24, KycComponent_div_3_i_24_Template, 1, 0, "i", 24);
    i0.ɵɵelementStart(25, "span");
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(6, _c2, ctx_r0.cniPreview));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r0.cniPreview);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.cniPreview);
    i0.ɵɵadvance(15);
    i0.ɵɵproperty("disabled", !ctx_r0.cniFile || ctx_r0.loading);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.loading);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.loading ? "V\u00E9rification en cours..." : "V\u00E9rifier ma CNI");
} }
function KycComponent_div_4_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 37);
    i0.ɵɵelement(1, "img", 38);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", ctx_r0.selfiePreview, i0.ɵɵsanitizeUrl);
} }
function KycComponent_div_4_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 39);
    i0.ɵɵelement(1, "video", 40, 0)(3, "canvas", 41, 1);
    i0.ɵɵelementEnd();
} }
function KycComponent_div_4_div_8_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 42)(1, "button", 43);
    i0.ɵɵlistener("click", function KycComponent_div_4_div_8_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r3); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.startCamera()); });
    i0.ɵɵelement(2, "i", 44);
    i0.ɵɵtext(3, " Utiliser la cam\u00E9ra ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "label", 45);
    i0.ɵɵelement(5, "i", 46);
    i0.ɵɵtext(6, " Choisir une photo depuis mon appareil ");
    i0.ɵɵelementStart(7, "input", 47);
    i0.ɵɵlistener("change", function KycComponent_div_4_div_8_Template_input_change_7_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.onSelfieSelected($event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "p", 48);
    i0.ɵɵtext(9, " La photo doit clairement montrer votre visage ");
    i0.ɵɵelementEnd()();
} }
function KycComponent_div_4_div_9_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 49)(1, "button", 50);
    i0.ɵɵlistener("click", function KycComponent_div_4_div_9_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r4); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.captureSelfie()); });
    i0.ɵɵelement(2, "i", 51);
    i0.ɵɵtext(3, " Prendre la photo ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 52);
    i0.ɵɵlistener("click", function KycComponent_div_4_div_9_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r4); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.cameraActive = false); });
    i0.ɵɵtext(5, " Annuler ");
    i0.ɵɵelementEnd()();
} }
function KycComponent_div_4_div_10_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 49)(1, "button", 53);
    i0.ɵɵlistener("click", function KycComponent_div_4_div_10_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r5); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.resetSelfie()); });
    i0.ɵɵelement(2, "i", 54);
    i0.ɵɵtext(3, " Changer la photo ");
    i0.ɵɵelementEnd()();
} }
function KycComponent_div_4_button_11_i_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 31);
} }
function KycComponent_div_4_button_11_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 23);
    i0.ɵɵlistener("click", function KycComponent_div_4_button_11_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r6); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.submitSelfie()); });
    i0.ɵɵtemplate(1, KycComponent_div_4_button_11_i_1_Template, 1, 0, "i", 24);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("disabled", ctx_r0.loading);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.loading);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.loading ? "V\u00E9rification en cours..." : "Valider mon identit\u00E9");
} }
function KycComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "div", 14)(2, "h1", 15);
    i0.ɵɵtext(3, "Votre selfie");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p", 16);
    i0.ɵɵtext(5, " Prenez une photo de votre visage pour confirmer que vous \u00EAtes bien le titulaire de la CNI. ");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(6, KycComponent_div_4_div_6_Template, 2, 1, "div", 32)(7, KycComponent_div_4_div_7_Template, 5, 0, "div", 33)(8, KycComponent_div_4_div_8_Template, 10, 0, "div", 34)(9, KycComponent_div_4_div_9_Template, 6, 0, "div", 35)(10, KycComponent_div_4_div_10_Template, 4, 0, "div", 35)(11, KycComponent_div_4_button_11_Template, 4, 3, "button", 36);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngIf", ctx_r0.selfiePreview);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.cameraActive && !ctx_r0.selfiePreview);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r0.selfiePreview && !ctx_r0.cameraActive);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.cameraActive && !ctx_r0.selfiePreview);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.selfiePreview);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.selfiePreview);
} }
function KycComponent_div_5_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 56);
    i0.ɵɵelement(2, "i", 57);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h1", 58);
    i0.ɵɵtext(4, "Identit\u00E9 v\u00E9rifi\u00E9e !");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 59);
    i0.ɵɵtext(6, " Votre badge de v\u00E9rification a \u00E9t\u00E9 attribu\u00E9. Vous pouvez maintenant acc\u00E9der \u00E0 toutes les fonctionnalit\u00E9s de la plateforme. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "button", 60);
    i0.ɵɵlistener("click", function KycComponent_div_5_ng_container_1_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r7); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.goToProfile()); });
    i0.ɵɵtext(8, " Compl\u00E9ter mon profil ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} }
function KycComponent_div_5_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 61);
    i0.ɵɵelement(2, "i", 62);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h1", 58);
    i0.ɵɵtext(4, "V\u00E9rification \u00E9chou\u00E9e");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 63);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 64);
    i0.ɵɵtext(8, " Assurez-vous que votre CNI est lisible et que votre selfie est bien \u00E9clair\u00E9. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "button", 65);
    i0.ɵɵlistener("click", function KycComponent_div_5_ng_container_2_Template_button_click_9_listener() { i0.ɵɵrestoreView(_r8); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.retry()); });
    i0.ɵɵtext(10, " R\u00E9essayer ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r0.message);
} }
function KycComponent_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 55);
    i0.ɵɵtemplate(1, KycComponent_div_5_ng_container_1_Template, 9, 0, "ng-container", 5)(2, KycComponent_div_5_ng_container_2_Template, 11, 1, "ng-container", 5);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.kycStatus === "success");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.kycStatus === "rejected");
} }
export class KycComponent {
    constructor(http, router, toast, storage, userStatusService) {
        this.http = http;
        this.router = router;
        this.toast = toast;
        this.storage = storage;
        this.userStatusService = userStatusService;
        this.step = 'cni';
        this.kycStatus = null;
        this.message = '';
        this.loading = false;
        // CNI
        this.cniFile = null;
        this.cniPreview = null;
        this.stream = null;
        this.selfieFile = null;
        this.selfiePreview = null;
        this.cameraActive = false;
    }
    // --- ÉTAPE 1 : CNI ---
    onCniSelected(event) {
        const input = event.target;
        if (!input.files?.length)
            return;
        this.cniFile = input.files[0];
        const reader = new FileReader();
        reader.onload = (e) => this.cniPreview = e.target?.result;
        reader.readAsDataURL(this.cniFile);
    }
    submitCni() {
        if (!this.cniFile)
            return;
        this.loading = true;
        const formData = new FormData();
        formData.append('file', this.cniFile);
        const token = this.storage.getToken();
        this.http.post('/api/kyc/upload-cni', formData, {
            headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
        }).subscribe({
            next: (res) => {
                this.loading = false;
                if (res.kycStatus === 'CNI_VERIFIED') {
                    // CNI validée → passer à l'étape selfie
                    this.toast.success('CNI vérifiée !');
                    this.step = 'selfie';
                }
                else if (res.kycStatus === 'REJECTED') {
                    // CNI rejetée → afficher l'erreur
                    this.kycStatus = 'rejected';
                    this.message = res.message;
                    this.step = 'result';
                }
                else {
                    // Cas inattendu
                    this.kycStatus = 'rejected';
                    this.message = res.message;
                    this.step = 'result';
                }
            },
            error: (err) => {
                this.loading = false;
                this.toast.error(err.error?.message || 'Erreur lors de la vérification CNI');
            }
        });
    }
    // --- ÉTAPE 2 : SELFIE ---
    async startCamera() {
        try {
            this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
            this.cameraActive = true;
            setTimeout(() => {
                this.videoEl.nativeElement.srcObject = this.stream;
            }, 100);
        }
        catch (error) {
            // Affiche l'erreur précise dans la console
            console.error('Erreur caméra:', error.name, error.message);
            if (error.name === 'NotAllowedError') {
                this.toast.error('Permission caméra refusée. Autorisez la caméra dans les paramètres du navigateur.');
            }
            else if (error.name === 'NotFoundError') {
                this.toast.error('Aucune caméra détectée sur cet appareil.');
            }
            else if (error.name === 'NotReadableError') {
                this.toast.error('Caméra déjà utilisée par une autre application.');
            }
            else {
                this.toast.error('Impossible d\'accéder à la caméra : ' + error.message);
            }
        }
    }
    captureSelfie() {
        const video = this.videoEl.nativeElement;
        const canvas = this.canvasEl.nativeElement;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);
        this.selfiePreview = canvas.toDataURL('image/jpeg');
        // Convertir en File
        canvas.toBlob((blob) => {
            if (blob)
                this.selfieFile = new File([blob], 'selfie.jpg', { type: 'image/jpeg' });
        }, 'image/jpeg');
        // Stopper la caméra
        this.stream?.getTracks().forEach(t => t.stop());
        this.cameraActive = false;
    }
    resetSelfie() {
        this.selfiePreview = null;
        this.selfieFile = null;
    }
    submitSelfie() {
        if (!this.selfieFile)
            return;
        this.loading = true;
        const formData = new FormData();
        formData.append('file', this.selfieFile);
        const token = this.storage.getToken();
        this.http.post('/api/kyc/upload-selfie', formData, {
            headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
        }).subscribe({
            next: (res) => {
                this.loading = false;
                this.kycStatus = res.kycStatus === 'VALIDATED' ? 'success' : 'rejected';
                this.message = res.message;
                this.step = 'result';
                if (res.kycStatus === 'VALIDATED') {
                    this.userStatusService.update({
                        kycStatus: 'VALIDATED',
                        emailVerified: true,
                    });
                }
            },
            error: (err) => {
                this.loading = false;
                this.toast.error(err.error?.message || 'Erreur lors de la vérification du selfie');
            }
        });
    }
    onSelfieSelected(event) {
        const input = event.target;
        if (!input.files?.length)
            return;
        this.selfieFile = input.files[0];
        const reader = new FileReader();
        reader.onload = (e) => this.selfiePreview = e.target?.result;
        reader.readAsDataURL(this.selfieFile);
        this.cameraActive = false;
    }
    // --- ÉTAPE 3 : RÉSULTAT ---
    goToProfile() {
        this.router.navigate(['/profile']);
    }
    retry() {
        this.step = 'cni';
        this.kycStatus = null;
        this.cniFile = null;
        this.cniPreview = null;
        this.selfieFile = null;
        this.selfiePreview = null;
        this.message = '';
    }
    static { this.ɵfac = function KycComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || KycComponent)(i0.ɵɵdirectiveInject(i1.HttpClient), i0.ɵɵdirectiveInject(i2.Router), i0.ɵɵdirectiveInject(i3.ToastService), i0.ɵɵdirectiveInject(i4.StorageService), i0.ɵɵdirectiveInject(i5.UserStatusService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: KycComponent, selectors: [["app-kyc"]], viewQuery: function KycComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 5)(_c1, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.videoEl = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.canvasEl = _t.first);
        } }, standalone: false, decls: 6, vars: 4, consts: [["videoEl", ""], ["canvasEl", ""], [1, "min-h-screen", "bg-gray-50", "flex", "items-center", "justify-center", "px-4", "py-12"], [1, "bg-white", "rounded-2xl", "shadow-sm", "border", "border-gray-100", "max-w-lg", "w-full", "p-10"], ["class", "flex items-center justify-center gap-3 mb-10", 4, "ngIf"], [4, "ngIf"], ["class", "text-center", 4, "ngIf"], [1, "flex", "items-center", "justify-center", "gap-3", "mb-10"], [1, "flex", "items-center", "gap-2"], [1, "w-8", "h-8", "rounded-full", "flex", "items-center", "justify-center", "text-sm", "font-medium", "transition-colors", 3, "ngClass"], ["class", "pi pi-check text-xs", 4, "ngIf"], [1, "text-sm", "font-medium", 3, "ngClass"], [1, "w-10", "h-px", "bg-gray-200"], [1, "pi", "pi-check", "text-xs"], [1, "mb-6"], [1, "text-2xl", "font-semibold", "text-gray-900", "mb-2"], [1, "text-sm", "text-gray-500", "leading-relaxed"], ["for", "cni-upload", 1, "block", "border-2", "border-dashed", "border-gray-200", "rounded-xl", "p-8", "text-center", "cursor-pointer", "hover:border-rose-300", "hover:bg-rose-50", "transition-colors", "mb-6", 3, "ngClass"], ["id", "cni-upload", "type", "file", "accept", "image/*", 1, "hidden", 3, "change"], [1, "bg-amber-50", "rounded-xl", "p-4", "mb-6"], [1, "text-xs", "font-medium", "text-amber-700", "mb-2", "uppercase", "tracking-wide"], [1, "text-xs", "text-amber-600", "space-y-1"], [1, "pi", "pi-check", "text-amber-500"], [1, "w-full", "bg-rose-500", "hover:bg-rose-600", "disabled:bg-gray-200", "disabled:text-gray-400", "text-white", "font-medium", "py-3", "px-6", "rounded-xl", "transition-colors", "duration-200", "flex", "items-center", "justify-center", "gap-2", 3, "click", "disabled"], ["class", "pi pi-spin pi-spinner", 4, "ngIf"], [1, "w-12", "h-12", "bg-gray-100", "rounded-full", "flex", "items-center", "justify-center", "mx-auto", "mb-3"], [1, "pi", "pi-id-card", "text-gray-400", "text-xl"], [1, "text-sm", "font-medium", "text-gray-700"], [1, "text-xs", "text-gray-400", "mt-1"], ["alt", "CNI", 1, "max-h-48", "mx-auto", "rounded-lg", "object-contain", 3, "src"], [1, "text-xs", "text-rose-500", "mt-3"], [1, "pi", "pi-spin", "pi-spinner"], ["class", "rounded-xl overflow-hidden bg-gray-100 mb-4 aspect-video flex items-center justify-center", 4, "ngIf"], ["class", "rounded-xl overflow-hidden bg-gray-900 mb-4 aspect-video", 4, "ngIf"], ["class", "space-y-3 mb-6", 4, "ngIf"], ["class", "flex gap-3 mb-6", 4, "ngIf"], ["class", "w-full bg-rose-500 hover:bg-rose-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-medium py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2", 3, "disabled", "click", 4, "ngIf"], [1, "rounded-xl", "overflow-hidden", "bg-gray-100", "mb-4", "aspect-video", "flex", "items-center", "justify-center"], ["alt", "Selfie", 1, "w-full", "h-full", "object-cover", 3, "src"], [1, "rounded-xl", "overflow-hidden", "bg-gray-900", "mb-4", "aspect-video"], ["autoplay", "", "playsinline", "", 1, "w-full", "h-full", "object-cover"], [1, "hidden"], [1, "space-y-3", "mb-6"], [1, "w-full", "border", "border-gray-200", "hover:bg-gray-50", "text-gray-700", "font-medium", "py-3", "px-4", "rounded-xl", "transition-colors", "flex", "items-center", "justify-center", "gap-2", 3, "click"], [1, "pi", "pi-camera", "text-gray-500"], ["for", "selfie-upload", 1, "w-full", "border-2", "border-dashed", "border-gray-200", "hover:border-rose-300", "hover:bg-rose-50", "text-gray-700", "font-medium", "py-3", "px-4", "rounded-xl", "transition-colors", "flex", "items-center", "justify-center", "gap-2", "cursor-pointer"], [1, "pi", "pi-upload", "text-gray-500"], ["id", "selfie-upload", "type", "file", "accept", "image/*", 1, "hidden", 3, "change"], [1, "text-xs", "text-gray-400", "text-center"], [1, "flex", "gap-3", "mb-6"], [1, "flex-1", "bg-rose-500", "hover:bg-rose-600", "text-white", "font-medium", "py-3", "px-4", "rounded-xl", "transition-colors", "flex", "items-center", "justify-center", "gap-2", 3, "click"], [1, "pi", "pi-camera"], [1, "border", "border-gray-200", "hover:bg-gray-50", "text-gray-700", "font-medium", "py-3", "px-4", "rounded-xl", "transition-colors", 3, "click"], [1, "flex-1", "border", "border-gray-200", "hover:bg-gray-50", "text-gray-700", "font-medium", "py-3", "px-4", "rounded-xl", "transition-colors", "flex", "items-center", "justify-center", "gap-2", 3, "click"], [1, "pi", "pi-refresh"], [1, "text-center"], [1, "w-16", "h-16", "bg-green-50", "rounded-full", "flex", "items-center", "justify-center", "mx-auto", "mb-6"], [1, "pi", "pi-check-circle", "text-green-500", "text-2xl"], [1, "text-2xl", "font-semibold", "text-gray-900", "mb-3"], [1, "text-gray-500", "text-sm", "leading-relaxed", "mb-8"], [1, "w-full", "bg-rose-500", "hover:bg-rose-600", "text-white", "font-medium", "py-3", "px-6", "rounded-xl", "transition-colors", 3, "click"], [1, "w-16", "h-16", "bg-red-50", "rounded-full", "flex", "items-center", "justify-center", "mx-auto", "mb-6"], [1, "pi", "pi-times-circle", "text-red-400", "text-2xl"], [1, "text-gray-500", "text-sm", "leading-relaxed", "mb-2"], [1, "text-xs", "text-gray-400", "mb-8"], [1, "w-full", "bg-gray-900", "hover:bg-gray-800", "text-white", "font-medium", "py-3", "px-6", "rounded-xl", "transition-colors", 3, "click"]], template: function KycComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 2)(1, "div", 3);
            i0.ɵɵtemplate(2, KycComponent_div_2_Template, 13, 6, "div", 4)(3, KycComponent_div_3_Template, 27, 8, "div", 5)(4, KycComponent_div_4_Template, 12, 6, "div", 5)(5, KycComponent_div_5_Template, 3, 2, "div", 6);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.step !== "result");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.step === "cni");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.step === "selfie");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.step === "result");
        } }, dependencies: [i6.NgClass, i6.NgIf], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KycComponent, [{
        type: Component,
        args: [{ selector: 'app-kyc', standalone: false, template: "<div class=\"min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12\">\r\n    <div class=\"bg-white rounded-2xl shadow-sm border border-gray-100 max-w-lg w-full p-10\">\r\n  \r\n      <!-- Stepper -->\r\n      <div class=\"flex items-center justify-center gap-3 mb-10\" *ngIf=\"step !== 'result'\">\r\n        <div class=\"flex items-center gap-2\">\r\n          <div\r\n            class=\"w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors\"\r\n            [ngClass]=\"step === 'cni' ? 'bg-rose-500 text-white' : 'bg-green-100 text-green-600'\"\r\n          >\r\n            <i *ngIf=\"step !== 'cni'\" class=\"pi pi-check text-xs\"></i>\r\n            <span *ngIf=\"step === 'cni'\">1</span>\r\n          </div>\r\n          <span class=\"text-sm font-medium\"\r\n            [ngClass]=\"step === 'cni' ? 'text-gray-900' : 'text-gray-400'\"\r\n          >Pi\u00E8ce d'identit\u00E9</span>\r\n        </div>\r\n  \r\n        <div class=\"w-10 h-px bg-gray-200\"></div>\r\n  \r\n        <div class=\"flex items-center gap-2\">\r\n          <div\r\n            class=\"w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors\"\r\n            [ngClass]=\"step === 'selfie' ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-400'\"\r\n          >2</div>\r\n          <span class=\"text-sm font-medium\"\r\n            [ngClass]=\"step === 'selfie' ? 'text-gray-900' : 'text-gray-400'\"\r\n          >Selfie</span>\r\n        </div>\r\n      </div>\r\n  \r\n      <!-- \u00C9TAPE 1 : Upload CNI -->\r\n      <div *ngIf=\"step === 'cni'\">\r\n        <div class=\"mb-6\">\r\n          <h1 class=\"text-2xl font-semibold text-gray-900 mb-2\">Votre pi\u00E8ce d'identit\u00E9</h1>\r\n          <p class=\"text-sm text-gray-500 leading-relaxed\">\r\n            Prenez une photo claire de votre Carte Nationale d'Identit\u00E9 ivoirienne, recto visible.\r\n          </p>\r\n        </div>\r\n  \r\n        <!-- Zone upload -->\r\n        <label\r\n          for=\"cni-upload\"\r\n          class=\"block border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-rose-300 hover:bg-rose-50 transition-colors mb-6\"\r\n          [ngClass]=\"{ 'border-rose-300 bg-rose-50': cniPreview }\"\r\n        >\r\n          <ng-container *ngIf=\"!cniPreview\">\r\n            <div class=\"w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3\">\r\n              <i class=\"pi pi-id-card text-gray-400 text-xl\"></i>\r\n            </div>\r\n            <p class=\"text-sm font-medium text-gray-700\">Cliquez pour choisir une photo</p>\r\n            <p class=\"text-xs text-gray-400 mt-1\">JPG, PNG \u2014 max 10 MB</p>\r\n          </ng-container>\r\n  \r\n          <ng-container *ngIf=\"cniPreview\">\r\n            <img [src]=\"cniPreview\" alt=\"CNI\" class=\"max-h-48 mx-auto rounded-lg object-contain\" />\r\n            <p class=\"text-xs text-rose-500 mt-3\">Cliquez pour changer</p>\r\n          </ng-container>\r\n  \r\n          <input\r\n            id=\"cni-upload\"\r\n            type=\"file\"\r\n            accept=\"image/*\"\r\n            class=\"hidden\"\r\n            (change)=\"onCniSelected($event)\"\r\n          />\r\n        </label>\r\n  \r\n        <!-- Conseils -->\r\n        <div class=\"bg-amber-50 rounded-xl p-4 mb-6\">\r\n          <p class=\"text-xs font-medium text-amber-700 mb-2 uppercase tracking-wide\">Conseils</p>\r\n          <ul class=\"text-xs text-amber-600 space-y-1\">\r\n            <li class=\"flex items-center gap-2\"><i class=\"pi pi-check text-amber-500\"></i> Bonne luminosit\u00E9, pas de reflet</li>\r\n            <li class=\"flex items-center gap-2\"><i class=\"pi pi-check text-amber-500\"></i> Document entier visible</li>\r\n            <li class=\"flex items-center gap-2\"><i class=\"pi pi-check text-amber-500\"></i> Texte lisible et net</li>\r\n          </ul>\r\n        </div>\r\n  \r\n        <button\r\n          (click)=\"submitCni()\"\r\n          [disabled]=\"!cniFile || loading\"\r\n          class=\"w-full bg-rose-500 hover:bg-rose-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-medium py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2\"\r\n        >\r\n          <i *ngIf=\"loading\" class=\"pi pi-spin pi-spinner\"></i>\r\n          <span>{{ loading ? 'V\u00E9rification en cours...' : 'V\u00E9rifier ma CNI' }}</span>\r\n        </button>\r\n      </div>\r\n  \r\n      <!-- \u00C9TAPE 2 : Selfie -->\r\n      <div *ngIf=\"step === 'selfie'\">\r\n        <div class=\"mb-6\">\r\n          <h1 class=\"text-2xl font-semibold text-gray-900 mb-2\">Votre selfie</h1>\r\n          <p class=\"text-sm text-gray-500 leading-relaxed\">\r\n            Prenez une photo de votre visage pour confirmer que vous \u00EAtes\r\n            bien le titulaire de la CNI.\r\n          </p>\r\n        </div>\r\n\r\n        <!-- Aper\u00E7u selfie captur\u00E9 ou upload\u00E9 -->\r\n        <div\r\n          *ngIf=\"selfiePreview\"\r\n          class=\"rounded-xl overflow-hidden bg-gray-100 mb-4 aspect-video flex items-center justify-center\"\r\n        >\r\n          <img [src]=\"selfiePreview\" alt=\"Selfie\" class=\"w-full h-full object-cover\" />\r\n        </div>\r\n\r\n        <!-- Flux vid\u00E9o cam\u00E9ra -->\r\n        <div\r\n          *ngIf=\"cameraActive && !selfiePreview\"\r\n          class=\"rounded-xl overflow-hidden bg-gray-900 mb-4 aspect-video\"\r\n        >\r\n          <video #videoEl autoplay playsinline class=\"w-full h-full object-cover\"></video>\r\n          <canvas #canvasEl class=\"hidden\"></canvas>\r\n        </div>\r\n\r\n        <!-- Options si pas encore de photo -->\r\n        <div *ngIf=\"!selfiePreview && !cameraActive\" class=\"space-y-3 mb-6\">\r\n\r\n          <!-- Option 1 : Cam\u00E9ra -->\r\n          <button\r\n            (click)=\"startCamera()\"\r\n            class=\"w-full border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2\"\r\n          >\r\n            <i class=\"pi pi-camera text-gray-500\"></i>\r\n            Utiliser la cam\u00E9ra\r\n          </button>\r\n\r\n          <!-- Option 2 : Upload fichier -->\r\n          <label\r\n            for=\"selfie-upload\"\r\n            class=\"w-full border-2 border-dashed border-gray-200 hover:border-rose-300 hover:bg-rose-50 text-gray-700 font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer\"\r\n          >\r\n            <i class=\"pi pi-upload text-gray-500\"></i>\r\n            Choisir une photo depuis mon appareil\r\n            <input\r\n              id=\"selfie-upload\"\r\n              type=\"file\"\r\n              accept=\"image/*\"\r\n              class=\"hidden\"\r\n              (change)=\"onSelfieSelected($event)\"\r\n            />\r\n          </label>\r\n\r\n          <p class=\"text-xs text-gray-400 text-center\">\r\n            La photo doit clairement montrer votre visage\r\n          </p>\r\n        </div>\r\n\r\n        <!-- Boutons si cam\u00E9ra active -->\r\n        <div *ngIf=\"cameraActive && !selfiePreview\" class=\"flex gap-3 mb-6\">\r\n          <button\r\n            (click)=\"captureSelfie()\"\r\n            class=\"flex-1 bg-rose-500 hover:bg-rose-600 text-white font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2\"\r\n          >\r\n            <i class=\"pi pi-camera\"></i> Prendre la photo\r\n          </button>\r\n          <button\r\n            (click)=\"cameraActive = false\"\r\n            class=\"border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-xl transition-colors\"\r\n          >\r\n            Annuler\r\n          </button>\r\n        </div>\r\n\r\n        <!-- Boutons si photo prise -->\r\n        <div *ngIf=\"selfiePreview\" class=\"flex gap-3 mb-6\">\r\n          <button\r\n            (click)=\"resetSelfie()\"\r\n            class=\"flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2\"\r\n          >\r\n            <i class=\"pi pi-refresh\"></i> Changer la photo\r\n          </button>\r\n        </div>\r\n\r\n        <button\r\n          *ngIf=\"selfiePreview\"\r\n          (click)=\"submitSelfie()\"\r\n          [disabled]=\"loading\"\r\n          class=\"w-full bg-rose-500 hover:bg-rose-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-medium py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2\"\r\n        >\r\n          <i *ngIf=\"loading\" class=\"pi pi-spin pi-spinner\"></i>\r\n          <span>{{ loading ? 'V\u00E9rification en cours...' : 'Valider mon identit\u00E9' }}</span>\r\n        </button>\r\n      </div>\r\n  \r\n      <!-- \u00C9TAPE 3 : R\u00E9sultat -->\r\n      <div *ngIf=\"step === 'result'\" class=\"text-center\">\r\n  \r\n        <!-- Succ\u00E8s -->\r\n        <ng-container *ngIf=\"kycStatus === 'success'\">\r\n          <div class=\"w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6\">\r\n            <i class=\"pi pi-check-circle text-green-500 text-2xl\"></i>\r\n          </div>\r\n          <h1 class=\"text-2xl font-semibold text-gray-900 mb-3\">Identit\u00E9 v\u00E9rifi\u00E9e !</h1>\r\n          <p class=\"text-gray-500 text-sm leading-relaxed mb-8\">\r\n            Votre badge de v\u00E9rification a \u00E9t\u00E9 attribu\u00E9. Vous pouvez maintenant\r\n            acc\u00E9der \u00E0 toutes les fonctionnalit\u00E9s de la plateforme.\r\n          </p>\r\n          <button\r\n            (click)=\"goToProfile()\"\r\n            class=\"w-full bg-rose-500 hover:bg-rose-600 text-white font-medium py-3 px-6 rounded-xl transition-colors\"\r\n          >\r\n            Compl\u00E9ter mon profil\r\n          </button>\r\n        </ng-container>\r\n  \r\n        <!-- Rejet\u00E9 -->\r\n        <ng-container *ngIf=\"kycStatus === 'rejected'\">\r\n          <div class=\"w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6\">\r\n            <i class=\"pi pi-times-circle text-red-400 text-2xl\"></i>\r\n          </div>\r\n          <h1 class=\"text-2xl font-semibold text-gray-900 mb-3\">V\u00E9rification \u00E9chou\u00E9e</h1>\r\n          <p class=\"text-gray-500 text-sm leading-relaxed mb-2\">{{ message }}</p>\r\n          <p class=\"text-xs text-gray-400 mb-8\">\r\n            Assurez-vous que votre CNI est lisible et que votre selfie est bien \u00E9clair\u00E9.\r\n          </p>\r\n          <button\r\n            (click)=\"retry()\"\r\n            class=\"w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-xl transition-colors\"\r\n          >\r\n            R\u00E9essayer\r\n          </button>\r\n        </ng-container>\r\n  \r\n      </div>\r\n  \r\n    </div>\r\n  </div>" }]
    }], () => [{ type: i1.HttpClient }, { type: i2.Router }, { type: i3.ToastService }, { type: i4.StorageService }, { type: i5.UserStatusService }], { videoEl: [{
            type: ViewChild,
            args: ['videoEl']
        }], canvasEl: [{
            type: ViewChild,
            args: ['canvasEl']
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(KycComponent, { className: "KycComponent", filePath: "src/app/features/kyc/kyc.component.ts", lineNumber: 13 }); })();
//# sourceMappingURL=kyc.component.js.map