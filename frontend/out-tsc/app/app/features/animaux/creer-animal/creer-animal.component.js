import { Component, HostListener, Inject, ViewChild, } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Validators } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/router";
import * as i3 from "../../../core/services/auth.service";
import * as i4 from "../services/animal.service";
import * as i5 from "../../../core/services/toast.service";
import * as i6 from "@angular/common";
import * as i7 from "primeng/steps";
const _c0 = ["mapHost"];
const _c1 = () => ({ standalone: true });
function CreerAnimalComponent_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 86);
    i0.ɵɵtext(1, " Les informations mises \u00E0 jour sont conserv\u00E9es dans le dossier, puis soumises \u00E0 nouveau \u00E0 la validation sanitaire avant republication. ");
    i0.ɵɵelementEnd();
} }
function CreerAnimalComponent_div_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 87);
    i0.ɵɵtext(1, " Chargement du dossier en cours... ");
    i0.ɵɵelementEnd();
} }
function CreerAnimalComponent_button_62_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 88);
    i0.ɵɵlistener("click", function CreerAnimalComponent_button_62_Template_button_click_0_listener() { const animalType_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.form.patchValue({ type: animalType_r2.value })); });
    i0.ɵɵelementStart(1, "span", 89);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 90);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_3_0;
    const animalType_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("type-tile--active", ((tmp_3_0 = ctx_r2.form.get("type")) == null ? null : tmp_3_0.value) === animalType_r2.value);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(animalType_r2.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(animalType_r2.hint);
} }
function CreerAnimalComponent_p_71_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 91);
    i0.ɵɵtext(1, " Le lieu d'origine est requis. ");
    i0.ɵɵelementEnd();
} }
function CreerAnimalComponent_p_76_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 91);
    i0.ɵɵtext(1, " Le prix est requis. ");
    i0.ɵɵelementEnd();
} }
function CreerAnimalComponent_p_77_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 91);
    i0.ɵɵtext(1, " Le prix doit \u00EAtre positif. ");
    i0.ɵɵelementEnd();
} }
function CreerAnimalComponent_p_82_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 91);
    i0.ɵɵtext(1, " Le nombre de t\u00EAtes doit \u00EAtre au moins de 1. ");
    i0.ɵɵelementEnd();
} }
function CreerAnimalComponent_div_83_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 92)(1, "strong");
    i0.ɵɵtext(2, "Mode lot activ\u00E9.");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3, " Ce dossier porte plusieurs t\u00EAtes sous une m\u00EAme r\u00E9f\u00E9rence de suivi. ");
    i0.ɵɵelementEnd();
} }
function CreerAnimalComponent_div_100_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 93, 1);
} }
function CreerAnimalComponent_ng_template_101_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 94)(1, "strong");
    i0.ɵɵtext(2, "Carte indisponible");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Renseignez les coordonn\u00E9es manuellement pour poursuivre le dossier.");
    i0.ɵɵelementEnd()();
} }
function CreerAnimalComponent_div_142_article_4_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 99)(1, "button", 100);
    i0.ɵɵlistener("click", function CreerAnimalComponent_div_142_article_4_Template_button_click_1_listener() { const photo_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.openImagePreview(photo_r5)); });
    i0.ɵɵelement(2, "img", 101);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 102)(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "button", 103);
    i0.ɵɵlistener("click", function CreerAnimalComponent_div_142_article_4_Template_button_click_8_listener() { const photo_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.removePhoto(photo_r5)); });
    i0.ɵɵtext(9, "Retirer");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const photo_r5 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵattribute("aria-label", "Agrandir " + photo_r5.originalName);
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", ctx_r2.previewUrl(photo_r5), i0.ɵɵsanitizeUrl)("alt", photo_r5.originalName);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(photo_r5.originalName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.imageStatusLabel(photo_r5));
} }
function CreerAnimalComponent_div_142_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 95)(1, "p", 96);
    i0.ɵɵtext(2, "Photos jointes");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 97);
    i0.ɵɵtemplate(4, CreerAnimalComponent_div_142_article_4_Template, 10, 5, "article", 98);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", ctx_r2.uploadedPhotos);
} }
function CreerAnimalComponent_div_143_div_4_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 106)(1, "div")(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "number");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "button", 107);
    i0.ɵɵlistener("click", function CreerAnimalComponent_div_143_div_4_Template_button_click_7_listener() { const video_r7 = i0.ɵɵrestoreView(_r6).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.removeVideo(video_r7)); });
    i0.ɵɵtext(8, "Supprimer");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const video_r7 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(video_r7.originalName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", video_r7.size > 0 ? i0.ɵɵpipeBind2(6, 2, video_r7.size / 1024 / 1024, "1.1-1") + " Mo" : "Vid\u00E9o d\u00E9j\u00E0 enregistr\u00E9e", " ");
} }
function CreerAnimalComponent_div_143_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 95)(1, "p", 96);
    i0.ɵɵtext(2, "Vid\u00E9os jointes");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 104);
    i0.ɵɵtemplate(4, CreerAnimalComponent_div_143_div_4_Template, 9, 5, "div", 105);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", ctx_r2.uploadedVideos);
} }
function CreerAnimalComponent_div_166_div_1_button_2_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 117);
    i0.ɵɵlistener("click", function CreerAnimalComponent_div_166_div_1_button_2_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r9); const document_r10 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.openImagePreview(document_r10.file)); });
    i0.ɵɵelement(1, "img", 101);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const document_r10 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵattribute("aria-label", "Agrandir " + document_r10.file.originalName);
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", ctx_r2.previewUrl(document_r10.file), i0.ɵɵsanitizeUrl)("alt", document_r10.file.originalName);
} }
function CreerAnimalComponent_div_166_div_1_option_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 118);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const documentType_r11 = ctx.$implicit;
    i0.ɵɵproperty("value", documentType_r11.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", documentType_r11.label, " ");
} }
function CreerAnimalComponent_div_166_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 110)(1, "div", 111);
    i0.ɵɵtemplate(2, CreerAnimalComponent_div_166_div_1_button_2_Template, 2, 3, "button", 112);
    i0.ɵɵelementStart(3, "div")(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(8, "div", 113)(9, "select", 114);
    i0.ɵɵlistener("ngModelChange", function CreerAnimalComponent_div_166_div_1_Template_select_ngModelChange_9_listener($event) { const document_r10 = i0.ɵɵrestoreView(_r8).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.updateDocumentType(document_r10, $event)); });
    i0.ɵɵtemplate(10, CreerAnimalComponent_div_166_div_1_option_10_Template, 2, 2, "option", 115);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "button", 116);
    i0.ɵɵlistener("click", function CreerAnimalComponent_div_166_div_1_Template_button_click_11_listener() { const document_r10 = i0.ɵɵrestoreView(_r8).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.removeDocument(document_r10)); });
    i0.ɵɵtext(12, " Retirer ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const document_r10 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r2.isImagePreviewable(document_r10.file));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(document_r10.file.originalName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.imageStatusLabel(document_r10.file));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngModel", document_r10.documentType)("ngModelOptions", i0.ɵɵpureFunction0(6, _c1));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.documentTypes);
} }
function CreerAnimalComponent_div_166_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 108);
    i0.ɵɵtemplate(1, CreerAnimalComponent_div_166_div_1_Template, 13, 7, "div", 109);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.uploadedDocuments);
} }
function CreerAnimalComponent_button_184_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 119);
    i0.ɵɵlistener("click", function CreerAnimalComponent_button_184_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r12); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.goToPreviousStep()); });
    i0.ɵɵtext(1, " \u00C9tape pr\u00E9c\u00E9dente ");
    i0.ɵɵelementEnd();
} }
function CreerAnimalComponent_button_186_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 120);
    i0.ɵɵlistener("click", function CreerAnimalComponent_button_186_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r13); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.goToNextStep()); });
    i0.ɵɵtext(1, " Continuer ");
    i0.ɵɵelementEnd();
} }
function CreerAnimalComponent_button_187_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "button", 121);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", ctx_r2.saving || ctx_r2.loadingAnimal);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r2.submitLabel, " ");
} }
function CreerAnimalComponent_div_243_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 122);
    i0.ɵɵlistener("click", function CreerAnimalComponent_div_243_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r14); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeDocumentsGuide()); });
    i0.ɵɵelementStart(1, "div", 123);
    i0.ɵɵlistener("click", function CreerAnimalComponent_div_243_Template_div_click_1_listener($event) { return $event.stopPropagation(); });
    i0.ɵɵelementStart(2, "button", 124);
    i0.ɵɵlistener("click", function CreerAnimalComponent_div_243_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r14); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeDocumentsGuide()); });
    i0.ɵɵtext(3, " Fermer ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 125)(5, "p", 18);
    i0.ɵɵtext(6, "Dossier sanitaire");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "h2");
    i0.ɵɵtext(8, "Pi\u00E8ces \u00E0 pr\u00E9parer pour la v\u00E9rification DSV");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "p");
    i0.ɵɵtext(10, " Pr\u00E9parez des fichiers lisibles, complets et r\u00E9cents. Une photo nette ou un PDF bien cadr\u00E9 suffit tant que le document peut \u00EAtre relu sans ambigu\u00EFt\u00E9 pendant le contr\u00F4le. ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 126)(12, "article", 127)(13, "strong");
    i0.ɵɵtext(14, "Fiche de vaccination");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "span");
    i0.ɵɵtext(16, "Document \u00E0 jour avec les dates, cachets et r\u00E9f\u00E9rences du suivi sanitaire.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "article", 127)(18, "strong");
    i0.ɵɵtext(19, "Certificat v\u00E9t\u00E9rinaire");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "span");
    i0.ɵɵtext(21, "Compte rendu ou certificat r\u00E9cent attestant l\u2019\u00E9tat sanitaire de l\u2019animal ou du lot.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "article", 127)(23, "strong");
    i0.ɵɵtext(24, "Attestation DSV");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "span");
    i0.ɵɵtext(26, "Pi\u00E8ce administrative d\u00E9j\u00E0 disponible, ou document \u00E9quivalent demand\u00E9 par le service local.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(27, "article", 127)(28, "strong");
    i0.ɵɵtext(29, "Document compl\u00E9mentaire");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "span");
    i0.ɵɵtext(31, "Tout justificatif exig\u00E9 localement : suivi de traitement, laissez-passer, note technique ou autre pi\u00E8ce utile.");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(32, "div", 128)(33, "div", 129)(34, "span");
    i0.ɵɵtext(35, "Format conseill\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "strong");
    i0.ɵɵtext(37, "PDF, JPG ou PNG");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(38, "div", 129)(39, "span");
    i0.ɵɵtext(40, "Qualit\u00E9 attendue");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(41, "strong");
    i0.ɵɵtext(42, "Texte lisible, document complet, sans d\u00E9coupe");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(43, "div", 129)(44, "span");
    i0.ɵɵtext(45, "Bon r\u00E9flexe");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(46, "strong");
    i0.ɵɵtext(47, "Nommer le type de pi\u00E8ce avant l\u2019enregistrement final");
    i0.ɵɵelementEnd()()()()();
} }
function CreerAnimalComponent_div_244_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 130);
    i0.ɵɵlistener("click", function CreerAnimalComponent_div_244_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r15); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeImagePreview()); });
    i0.ɵɵelementStart(1, "div", 131);
    i0.ɵɵlistener("click", function CreerAnimalComponent_div_244_Template_div_click_1_listener($event) { return $event.stopPropagation(); });
    i0.ɵɵelementStart(2, "button", 132);
    i0.ɵɵlistener("click", function CreerAnimalComponent_div_244_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r15); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeImagePreview()); });
    i0.ɵɵtext(3, "Fermer");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(4, "img", 133);
    i0.ɵɵelementStart(5, "div", 134)(6, "strong");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("src", ctx_r2.previewUrl(ctx_r2.previewedImage), i0.ɵɵsanitizeUrl)("alt", ctx_r2.previewedImage.originalName);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r2.previewedImage.originalName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.imageStatusLabel(ctx_r2.previewedImage));
} }
export class CreerAnimalComponent {
    constructor(fb, route, router, auth, animalService, toast, zone, document) {
        this.fb = fb;
        this.route = route;
        this.router = router;
        this.auth = auth;
        this.animalService = animalService;
        this.toast = toast;
        this.zone = zone;
        this.document = document;
        this.submitted = false;
        this.saving = false;
        this.geolocating = false;
        this.mapUnavailable = false;
        this.loadingAnimal = false;
        this.editMode = false;
        this.currentStepIndex = 0;
        this.mapStatus = "Sélectionnez l'emplacement du troupeau sur la carte ou saisissez les coordonnées.";
        this.uploadedPhotos = [];
        this.uploadedVideos = [];
        this.uploadedDocuments = [];
        this.documentsGuideOpen = false;
        this.defaultMapCenter = {
            latitude: 7.539989,
            longitude: -5.54708,
        };
        this.animalTypes = [
            {
                value: 'BOVIN',
                label: 'Bovin',
                hint: 'Bœufs, vaches et zébus destinés au suivi ou à la vente.',
            },
            {
                value: 'OVIN',
                label: 'Ovin',
                hint: "Moutons enregistrés pour l'élevage, l'engraissement ou la boucherie.",
            },
            {
                value: 'CAPRIN',
                label: 'Caprin',
                hint: 'Chèvres, chevrettes et reproducteurs caprins.',
            },
            {
                value: 'PORCIN',
                label: 'Porcin',
                hint: "Porcs de ferme, cochettes et sujets d'élevage.",
            },
            {
                value: 'AUTRE',
                label: 'Autre',
                hint: 'Espèces complémentaires prises en charge dans le POC.',
            },
        ];
        this.documentTypes = [
            { value: 'FICHE_VACCINATION', label: 'Fiche de vaccination' },
            { value: 'CERTIFICAT_VETERINAIRE', label: 'Certificat vétérinaire' },
            { value: 'ATTESTATION_DSV', label: 'Attestation DSV' },
            { value: 'AUTRE', label: 'Autre document' },
        ];
        this.stepItems = [
            { label: 'Identité' },
            { label: 'Cartographie' },
            { label: 'Médias' },
            { label: 'Documents' },
        ];
        this.stepDescriptions = [
            "Renseignez l'espèce, l'origine et les éléments commerciaux du dossier.",
            "Localisez précisément le troupeau sur la carte ou par coordonnées.",
            "Ajoutez les photos et vidéos utiles à la lecture du dossier.",
            "Joignez les pièces sanitaires et vérifiez l'ensemble avant enregistrement.",
        ];
        this.form = this.fb.group({
            type: ['BOVIN', Validators.required],
            race: [''],
            lieuNaissance: ['', Validators.required],
            price: [null, [Validators.required, Validators.min(1)]],
            quantity: [1, [Validators.required, Validators.min(1)]],
            longitude: [null],
            latitude: [null],
        });
    }
    ngOnInit() {
        const animalId = this.route.snapshot.paramMap.get('id');
        if (!animalId) {
            return;
        }
        this.editMode = true;
        this.animalId = animalId;
        this.loadAnimal(animalId);
    }
    ngAfterViewInit() {
        this.handleStepActivated();
    }
    ngOnDestroy() {
        this.cleanupDraftFiles();
        if (this.mapReadyRetry) {
            clearTimeout(this.mapReadyRetry);
            this.mapReadyRetry = undefined;
        }
        if (this.map) {
            this.map.remove();
            this.map = undefined;
            this.marker = undefined;
        }
    }
    onEscape() {
        if (this.previewedImage) {
            this.closeImagePreview();
        }
        if (this.documentsGuideOpen) {
            this.closeDocumentsGuide();
        }
    }
    get heroEyebrow() {
        return this.editMode ? 'Révision du dossier' : 'Parcours vendeur';
    }
    get heroTitle() {
        return this.editMode
            ? 'Mettre à jour un animal déjà publié ou en contrôle'
            : 'Créer un dossier animal prêt pour le contrôle sanitaire';
    }
    get heroText() {
        return this.editMode
            ? "Ajustez les informations du dossier, ses médias et sa localisation. Après enregistrement, la fiche repart dans le circuit de validation sanitaire avant republication."
            : "Renseignez l'identité du bétail, sa localisation et les pièces du dossier. Le système génère la traçabilité de l'animal et transmet ensuite le dossier au circuit de validation sanitaire.";
    }
    get submitLabel() {
        if (this.saving) {
            return this.editMode ? 'Mise à jour en cours...' : 'Enregistrement...';
        }
        return this.editMode ? 'Enregistrer les modifications' : "Enregistrer l'animal";
    }
    get isGroupedLot() {
        return (this.form.get('quantity')?.value ?? 0) > 10;
    }
    get selectedAnimalType() {
        return this.animalTypes.find((animalType) => animalType.value === this.form.get('type')?.value);
    }
    get isFirstStep() {
        return this.currentStepIndex === 0;
    }
    get isLastStep() {
        return this.currentStepIndex === this.stepItems.length - 1;
    }
    get currentStepLabel() {
        return this.stepItems[this.currentStepIndex]?.label || '';
    }
    get currentStepDescription() {
        return this.stepDescriptions[this.currentStepIndex] || '';
    }
    controlInvalid(controlName, errorName) {
        const control = this.form.get(controlName);
        if (!control) {
            return false;
        }
        const shouldShow = control.invalid && (control.dirty || control.touched || this.submitted);
        return shouldShow && (!errorName || control.hasError(errorName));
    }
    onFileSelection(event, target) {
        const input = event.target;
        if (!input.files?.length) {
            return;
        }
        const files = Array.from(input.files);
        if (target === 'photos') {
            this.uploadedPhotos = [
                ...this.uploadedPhotos,
                ...files.map((file) => this.buildDraftStoredFile(file)),
            ];
        }
        if (target === 'videos') {
            this.uploadedVideos = [
                ...this.uploadedVideos,
                ...files.map((file) => this.buildDraftStoredFile(file)),
            ];
        }
        if (target === 'documents') {
            this.uploadedDocuments = [
                ...this.uploadedDocuments,
                ...files.map((file) => ({
                    file: this.buildDraftStoredFile(file),
                    documentType: 'FICHE_VACCINATION',
                })),
            ];
        }
        input.value = '';
    }
    removePhoto(file) {
        this.clearPreviewIfNeeded(file);
        this.revokeObjectUrl(file);
        this.uploadedPhotos = this.uploadedPhotos.filter((item) => item !== file);
    }
    removeVideo(file) {
        this.revokeObjectUrl(file);
        this.uploadedVideos = this.uploadedVideos.filter((item) => item !== file);
    }
    removeDocument(document) {
        this.clearPreviewIfNeeded(document.file);
        this.revokeObjectUrl(document.file);
        this.uploadedDocuments = this.uploadedDocuments.filter((item) => item !== document);
    }
    updateDocumentType(document, type) {
        document.documentType = type;
    }
    previewUrl(file) {
        return file.url;
    }
    isImagePreviewable(file) {
        const contentType = file.contentType?.toLowerCase();
        if (contentType?.startsWith('image/')) {
            return true;
        }
        const fileName = `${file.originalName || file.storedName || file.url || ''}`.toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg', '.avif'].some((extension) => fileName.endsWith(extension) || fileName.includes(`${extension}?`));
    }
    openImagePreview(file) {
        if (!this.isImagePreviewable(file)) {
            return;
        }
        this.previewedImage = file;
    }
    closeImagePreview() {
        this.previewedImage = undefined;
    }
    openDocumentsGuide() {
        this.documentsGuideOpen = true;
    }
    closeDocumentsGuide() {
        this.documentsGuideOpen = false;
    }
    imageStatusLabel(file) {
        return file.persistedUrl ? 'Image déjà enregistrée' : 'Image prête à l’envoi';
    }
    onCoordinatesBlur() {
        this.syncMapFromCoordinates(true);
    }
    onStepChange(stepIndex) {
        this.navigateToStep(stepIndex, true);
    }
    goToPreviousStep() {
        this.navigateToStep(this.currentStepIndex - 1, false);
    }
    goToNextStep() {
        this.navigateToStep(this.currentStepIndex + 1, true);
    }
    recenterMap() {
        if (!this.map) {
            return;
        }
        const coordinates = this.readCoordinates();
        if (coordinates) {
            this.map.flyTo([coordinates.latitude, coordinates.longitude], Math.max(this.map.getZoom(), 12), { duration: 0.75 });
            return;
        }
        this.map.flyTo([this.defaultMapCenter.latitude, this.defaultMapCenter.longitude], 7, { duration: 0.75 });
    }
    useCurrentPosition() {
        if (!navigator.geolocation) {
            this.toast.error("La géolocalisation n'est pas disponible sur cet appareil.");
            return;
        }
        this.geolocating = true;
        navigator.geolocation.getCurrentPosition((position) => {
            this.geolocating = false;
            this.setCoordinates(position.coords.latitude, position.coords.longitude, true, 'Position GPS récupérée avec succès.');
        }, () => {
            this.geolocating = false;
            this.toast.error("Impossible de récupérer votre position actuelle.");
        }, {
            enableHighAccuracy: true,
            timeout: 10000,
        });
    }
    submit() {
        this.submitted = true;
        const identityValid = this.validateStep(0, true);
        const locationValid = identityValid ? this.validateStep(1, true) : true;
        if (!identityValid || !locationValid || this.form.invalid) {
            if (!identityValid || this.form.invalid) {
                this.currentStepIndex = 0;
            }
            else if (!locationValid) {
                this.currentStepIndex = 1;
            }
            this.handleStepActivated();
            return;
        }
        this.saving = true;
        const payload = this.buildPayload();
        const submissionFiles = this.buildSubmissionFiles();
        const request$ = this.editMode && this.animalId
            ? this.animalService.update(this.animalId, payload, submissionFiles)
            : this.animalService.create(payload, submissionFiles);
        request$.subscribe({
            next: (animal) => {
                this.toast.success(this.editMode
                    ? 'Le dossier a été mis à jour. Il repasse en attente de validation sanitaire.'
                    : "Le dossier animal a été enregistré. Il reste en attente de validation sanitaire.");
                void this.router.navigate(this.editMode ? ['/annonces', animal.id] : ['/animaux/mes-animaux']);
            },
            error: () => {
                this.saving = false;
            },
            complete: () => {
                this.saving = false;
            },
        });
    }
    buildPayload() {
        const rawValue = this.form.getRawValue();
        return {
            type: rawValue.type,
            race: rawValue.race?.trim() || null,
            lieuNaissance: rawValue.lieuNaissance?.trim() || null,
            price: Number(rawValue.price),
            quantity: Number(rawValue.quantity),
            longitude: rawValue.longitude != null ? Number(rawValue.longitude) : null,
            latitude: rawValue.latitude != null ? Number(rawValue.latitude) : null,
            photos: this.uploadedPhotos
                .map((file) => file.persistedUrl || '')
                .filter(Boolean),
            videos: this.uploadedVideos
                .map((file) => file.persistedUrl || '')
                .filter(Boolean),
            healthDocuments: this.uploadedDocuments
                .map((document) => ({
                documentUrl: document.file.persistedUrl || '',
                documentType: document.documentType,
            }))
                .filter((document) => !!document.documentUrl),
        };
    }
    buildSubmissionFiles() {
        return {
            photoFiles: this.uploadedPhotos
                .map((file) => file.file)
                .filter((file) => !!file),
            videoFiles: this.uploadedVideos
                .map((file) => file.file)
                .filter((file) => !!file),
            documentFiles: this.uploadedDocuments
                .filter((document) => !!document.file.file)
                .map((document) => ({
                file: document.file.file,
                documentType: document.documentType,
            })),
        };
    }
    loadAnimal(animalId) {
        this.loadingAnimal = true;
        this.animalService.get(animalId).subscribe({
            next: (animal) => {
                if (this.auth.currentUser?.id !== animal.sellerId) {
                    this.toast.error('Seul le propriétaire de ce dossier peut le modifier.');
                    void this.router.navigate(['/annonces', animalId]);
                    return;
                }
                this.form.patchValue({
                    type: animal.type,
                    race: animal.race ?? '',
                    lieuNaissance: animal.lieuNaissance ?? '',
                    price: animal.price,
                    quantity: animal.quantity,
                    longitude: animal.longitude ?? null,
                    latitude: animal.latitude ?? null,
                });
                this.uploadedPhotos = animal.photos.map((url) => this.buildExistingStoredFile(url));
                this.uploadedVideos = animal.videos.map((url) => this.buildExistingStoredFile(url));
                this.uploadedDocuments = animal.healthRecords.map((record) => ({
                    file: this.buildExistingStoredFile(record.documentUrl),
                    documentType: record.documentType,
                }));
                this.syncMapFromCoordinates(true);
                this.handleStepActivated();
            },
            error: () => {
                void this.router.navigate(['/annonces', animalId]);
            },
            complete: () => {
                this.loadingAnimal = false;
            },
        });
    }
    buildExistingStoredFile(url) {
        const assetUrl = this.animalService.resolveAssetUrl(url);
        const persistedUrl = this.animalService.toStoredAssetPath(url);
        const fileName = this.extractFileName(assetUrl);
        return {
            originalName: fileName,
            storedName: fileName,
            url: assetUrl,
            contentType: null,
            size: 0,
            file: null,
            persistedUrl,
            objectUrl: null,
        };
    }
    buildDraftStoredFile(file) {
        const objectUrl = URL.createObjectURL(file);
        return {
            originalName: file.name,
            storedName: file.name,
            url: objectUrl,
            contentType: file.type || null,
            size: file.size,
            file,
            persistedUrl: null,
            objectUrl,
        };
    }
    extractFileName(url) {
        const sanitizedUrl = url.split('?')[0].split('#')[0];
        const segment = sanitizedUrl.split('/').filter(Boolean).pop();
        if (!segment) {
            return 'document';
        }
        try {
            return decodeURIComponent(segment);
        }
        catch {
            return segment;
        }
    }
    revokeObjectUrl(file) {
        if (!file.objectUrl) {
            return;
        }
        URL.revokeObjectURL(file.objectUrl);
        file.objectUrl = null;
    }
    cleanupDraftFiles() {
        this.previewedImage = undefined;
        this.uploadedPhotos.forEach((file) => this.revokeObjectUrl(file));
        this.uploadedVideos.forEach((file) => this.revokeObjectUrl(file));
        this.uploadedDocuments.forEach((document) => this.revokeObjectUrl(document.file));
    }
    clearPreviewIfNeeded(file) {
        if (this.previewedImage === file) {
            this.previewedImage = undefined;
        }
    }
    navigateToStep(stepIndex, validateCurrentStep) {
        if (stepIndex < 0 || stepIndex >= this.stepItems.length || stepIndex === this.currentStepIndex) {
            return;
        }
        if (stepIndex > this.currentStepIndex &&
            validateCurrentStep &&
            !this.validateStep(this.currentStepIndex, true)) {
            return;
        }
        this.currentStepIndex = stepIndex;
        this.handleStepActivated();
    }
    validateStep(stepIndex, notify) {
        if (stepIndex === 0) {
            return this.validateIdentityStep(notify);
        }
        if (stepIndex === 1) {
            return this.validateLocationStep(notify);
        }
        return true;
    }
    validateIdentityStep(notify) {
        const controls = ['type', 'lieuNaissance', 'price', 'quantity'];
        controls.forEach((controlName) => this.form.get(controlName)?.markAsTouched());
        const invalid = controls.some((controlName) => this.form.get(controlName)?.invalid);
        if (invalid && notify) {
            this.toast.error("Complétez l'identité du dossier avant de passer à l'étape suivante.");
        }
        return !invalid;
    }
    validateLocationStep(notify) {
        const latitude = this.form.get('latitude')?.value;
        const longitude = this.form.get('longitude')?.value;
        const hasLatitude = latitude != null && `${latitude}`.trim() !== '';
        const hasLongitude = longitude != null && `${longitude}`.trim() !== '';
        if (hasLatitude !== hasLongitude) {
            if (notify) {
                this.toast.error('Renseignez la latitude et la longitude ensemble, ou laissez les deux vides.');
            }
            return false;
        }
        if ((hasLatitude || hasLongitude) && !this.readCoordinates()) {
            if (notify) {
                this.toast.error('Les coordonnées saisies ne sont pas valides.');
            }
            return false;
        }
        return true;
    }
    handleStepActivated() {
        if (this.currentStepIndex !== 1) {
            return;
        }
        this.ensureMapReady();
    }
    async bootstrapMap() {
        try {
            await this.ensureLeafletAssets();
            this.initializeMap();
        }
        catch {
            this.mapUnavailable = true;
            this.mapStatus =
                "La carte n'a pas pu être chargée. Renseignez les coordonnées manuellement.";
        }
    }
    ensureMapReady() {
        if (this.mapUnavailable || !this.mapHost?.nativeElement) {
            return;
        }
        if (!this.hasRenderableMapHost()) {
            this.scheduleMapReady();
            return;
        }
        if (this.map) {
            this.map.invalidateSize(false);
            this.syncMapFromCoordinates(false);
            return;
        }
        void this.bootstrapMap();
    }
    ensureLeafletAssets() {
        const leaflet = window.L;
        if (leaflet) {
            return Promise.resolve(leaflet);
        }
        this.ensureLeafletStyles();
        if (CreerAnimalComponent.leafletLoadPromise) {
            return CreerAnimalComponent.leafletLoadPromise;
        }
        CreerAnimalComponent.leafletLoadPromise = new Promise((resolve, reject) => {
            const existingScript = this.document.querySelector('script[data-leaflet-runtime="true"]');
            if (existingScript) {
                existingScript.addEventListener('load', () => resolve(window.L), {
                    once: true,
                });
                existingScript.addEventListener('error', () => reject(new Error('Leaflet load failed')), {
                    once: true,
                });
                return;
            }
            const script = this.document.createElement('script');
            script.src = '/assets/vendor/leaflet/leaflet.js';
            script.async = true;
            script.defer = true;
            script.dataset['leafletRuntime'] = 'true';
            script.onload = () => {
                const runtimeLeaflet = window.L;
                if (runtimeLeaflet) {
                    resolve(runtimeLeaflet);
                    return;
                }
                reject(new Error('Leaflet global not found'));
            };
            script.onerror = () => reject(new Error('Leaflet script could not be loaded'));
            this.document.body.appendChild(script);
        });
        return CreerAnimalComponent.leafletLoadPromise;
    }
    ensureLeafletStyles() {
        const existingLink = this.document.querySelector('link[data-leaflet-runtime="true"]');
        if (existingLink) {
            return;
        }
        const link = this.document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/assets/vendor/leaflet/leaflet.css';
        link.dataset['leafletRuntime'] = 'true';
        this.document.head.appendChild(link);
    }
    initializeMap() {
        const leaflet = window.L;
        if (!this.mapHost?.nativeElement || !leaflet) {
            this.mapUnavailable = true;
            this.mapStatus =
                "La carte n'a pas pu être chargée. Renseignez les coordonnées manuellement.";
            return;
        }
        if (!this.hasRenderableMapHost()) {
            this.scheduleMapReady();
            return;
        }
        this.mapUnavailable = false;
        const initialCoordinates = this.readCoordinates() ?? this.defaultMapCenter;
        this.map = leaflet
            .map(this.mapHost.nativeElement, {
            zoomControl: false,
            attributionControl: true,
            scrollWheelZoom: true,
        })
            .setView([initialCoordinates.latitude, initialCoordinates.longitude], this.readCoordinates() ? 12 : 7);
        leaflet.control.zoom({ position: 'topright' }).addTo(this.map);
        leaflet
            .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; OpenStreetMap contributors',
        })
            .addTo(this.map);
        this.map.on('click', (event) => {
            this.zone.run(() => {
                this.setCoordinates(event.latlng.lat, event.latlng.lng, true, 'Position enregistrée à partir de la carte.');
            });
        });
        this.syncMapFromCoordinates(false);
        setTimeout(() => this.map?.invalidateSize(), 0);
        setTimeout(() => this.map?.invalidateSize(), 250);
    }
    setCoordinates(latitude, longitude, focusMap, message) {
        const roundedLatitude = Number(latitude.toFixed(6));
        const roundedLongitude = Number(longitude.toFixed(6));
        this.form.patchValue({
            latitude: roundedLatitude,
            longitude: roundedLongitude,
        });
        this.placeMarker(roundedLatitude, roundedLongitude, focusMap);
        this.mapStatus = `${message} Latitude ${roundedLatitude}, longitude ${roundedLongitude}.`;
    }
    syncMapFromCoordinates(focusMap) {
        const coordinates = this.readCoordinates();
        if (!coordinates) {
            this.mapStatus =
                "Sélectionnez l'emplacement du troupeau sur la carte ou saisissez les coordonnées.";
            if (this.map && this.marker) {
                this.map.removeLayer(this.marker);
                this.marker = undefined;
            }
            return;
        }
        this.placeMarker(coordinates.latitude, coordinates.longitude, focusMap);
        this.mapStatus =
            `Position actuelle : latitude ${coordinates.latitude.toFixed(5)}, ` +
                `longitude ${coordinates.longitude.toFixed(5)}.`;
    }
    placeMarker(latitude, longitude, focusMap) {
        if (!this.map) {
            return;
        }
        const leaflet = window.L;
        if (!this.marker) {
            this.marker = leaflet.marker([latitude, longitude]).addTo(this.map);
        }
        else {
            this.marker.setLatLng([latitude, longitude]);
        }
        if (focusMap) {
            this.map.flyTo([latitude, longitude], Math.max(this.map.getZoom(), 12), {
                duration: 0.75,
            });
        }
    }
    readCoordinates() {
        const latitude = this.form.get('latitude')?.value;
        const longitude = this.form.get('longitude')?.value;
        if (latitude == null || longitude == null) {
            return null;
        }
        const normalizedLatitude = Number(latitude);
        const normalizedLongitude = Number(longitude);
        if (!Number.isFinite(normalizedLatitude) || !Number.isFinite(normalizedLongitude)) {
            return null;
        }
        return {
            latitude: normalizedLatitude,
            longitude: normalizedLongitude,
        };
    }
    hasRenderableMapHost() {
        const host = this.mapHost?.nativeElement;
        return !!host && host.clientWidth > 0 && host.clientHeight > 0;
    }
    scheduleMapReady() {
        if (this.mapReadyRetry) {
            clearTimeout(this.mapReadyRetry);
        }
        this.mapReadyRetry = setTimeout(() => {
            this.mapReadyRetry = undefined;
            this.ensureMapReady();
        }, 120);
    }
    static { this.ɵfac = function CreerAnimalComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CreerAnimalComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.ActivatedRoute), i0.ɵɵdirectiveInject(i2.Router), i0.ɵɵdirectiveInject(i3.AuthService), i0.ɵɵdirectiveInject(i4.AnimalService), i0.ɵɵdirectiveInject(i5.ToastService), i0.ɵɵdirectiveInject(i0.NgZone), i0.ɵɵdirectiveInject(DOCUMENT)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CreerAnimalComponent, selectors: [["app-creer-animal"]], viewQuery: function CreerAnimalComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.mapHost = _t.first);
        } }, hostBindings: function CreerAnimalComponent_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("keydown.escape", function CreerAnimalComponent_keydown_escape_HostBindingHandler() { return ctx.onEscape(); }, i0.ɵɵresolveDocument);
        } }, standalone: false, decls: 245, vars: 72, consts: [["mapFallback", ""], ["mapHost", ""], [1, "animal-shell", "py-6", "px-4", "sm:py-8", "lg:px-8"], [1, "max-w-7xl", "mx-auto"], [1, "hero-panel", "mb-8"], [1, "hero-copy"], [1, "eyebrow"], [1, "hero-text"], ["class", "mt-5 rounded-[1.5rem] border border-red-200 bg-red-50/85 px-4 py-4 text-sm leading-6 text-red-900", 4, "ngIf"], [1, "hero-metrics"], [1, "metric-card"], [1, "metric-value"], [1, "metric-label"], [1, "grid", "grid-cols-1", "items-start", "gap-6", "xl:grid-cols-[1.7fr_0.9fr]"], [1, "space-y-6", 3, "ngSubmit", "formGroup"], ["class", "rounded-[1.5rem] border border-red-200 bg-white/90 px-4 py-4 text-sm text-red-800 shadow-sm", 4, "ngIf"], [1, "glass-card", "stepper-shell"], [1, "section-heading", "mb-5"], [1, "section-kicker"], [1, "section-badge"], ["styleClass", "animal-steps", 3, "activeIndexChange", "model", "readonly", "activeIndex"], [1, "stepper-caption"], [1, "stepper-caption__eyebrow"], [1, "glass-card", "step-panel"], [1, "section-heading"], [1, "grid", "grid-cols-1", "gap-4", "md:grid-cols-2"], [1, "md:col-span-2"], ["for", "type", 1, "form-label"], [1, "type-grid"], ["type", "button", "class", "type-tile", 3, "type-tile--active", "click", 4, "ngFor", "ngForOf"], ["for", "race", 1, "form-label"], ["id", "race", "formControlName", "race", "type", "text", "placeholder", "Ex. : N'Dama", 1, "form-input"], ["for", "lieuNaissance", 1, "form-label"], ["id", "lieuNaissance", "formControlName", "lieuNaissance", "type", "text", "placeholder", "Korhogo, Bouak\u00E9, Abidjan...", 1, "form-input"], ["class", "form-error", 4, "ngIf"], ["for", "price", 1, "form-label"], ["id", "price", "formControlName", "price", "type", "number", "placeholder", "825000", 1, "form-input"], ["for", "quantity", 1, "form-label"], ["id", "quantity", "formControlName", "quantity", "type", "number", "placeholder", "1", 1, "form-input"], ["class", "lot-banner mt-5", 4, "ngIf"], [1, "sig-toolbar"], ["type", "button", 1, "sig-action", "sig-action--solid", 3, "click", "disabled"], ["type", "button", 1, "sig-action", 3, "click"], [1, "sig-layout"], [1, "sig-panel"], ["class", "sig-map", 4, "ngIf", "ngIfElse"], [1, "sig-caption"], [1, "sig-panel", "sig-panel--stack"], ["for", "longitude", 1, "form-label"], ["id", "longitude", "formControlName", "longitude", "type", "number", "placeholder", "-5.620000", 1, "form-input", 3, "change"], ["for", "latitude", 1, "form-label"], ["id", "latitude", "formControlName", "latitude", "type", "number", "placeholder", "9.450000", 1, "form-input", 3, "change"], [1, "sig-tip"], [1, "grid", "grid-cols-1", "gap-4", "lg:grid-cols-2"], [1, "upload-card"], ["type", "file", "accept", "image/*", "multiple", "", "hidden", "", 3, "change"], [1, "upload-title"], [1, "upload-subtitle"], [1, "upload-meta"], ["type", "file", "accept", "video/*", "multiple", "", "hidden", "", 3, "change"], ["class", "mt-5", 4, "ngIf"], [1, "section-actions"], ["type", "button", 1, "section-link", 3, "click"], [1, "upload-card", "upload-card--wide"], ["type", "file", "accept", ".pdf,image/*", "multiple", "", "hidden", "", 3, "change"], [1, "documents-note"], ["class", "space-y-3 mt-5", 4, "ngIf"], [1, "review-strip"], [1, "review-chip"], [1, "step-actions"], ["type", "button", "class", "secondary-cta", 3, "click", 4, "ngIf"], [1, "step-actions__spacer"], ["type", "button", "class", "secondary-cta secondary-cta--accent", 3, "click", 4, "ngIf"], ["type", "submit", "class", "primary-cta", 3, "disabled", 4, "ngIf"], [1, "space-y-6", "xl:sticky", "xl:top-6"], [1, "glass-card"], [1, "hero-text", "m-0"], [1, "glass-card", "glass-card--contrast"], [1, "section-kicker", "text-white/70"], [1, "text-white"], [1, "summary-stack"], [1, "summary-line"], [1, "summary-index"], [1, "check-list"], ["class", "documents-guide-backdrop", 3, "click", 4, "ngIf"], ["class", "image-lightbox", 3, "click", 4, "ngIf"], [1, "mt-5", "rounded-[1.5rem]", "border", "border-red-200", "bg-red-50/85", "px-4", "py-4", "text-sm", "leading-6", "text-red-900"], [1, "rounded-[1.5rem]", "border", "border-red-200", "bg-white/90", "px-4", "py-4", "text-sm", "text-red-800", "shadow-sm"], ["type", "button", 1, "type-tile", 3, "click"], [1, "type-title"], [1, "type-hint"], [1, "form-error"], [1, "lot-banner", "mt-5"], [1, "sig-map"], [1, "sig-map-empty"], [1, "mt-5"], [1, "gallery-label"], [1, "media-gallery-grid"], ["class", "media-thumb", 4, "ngFor", "ngForOf"], [1, "media-thumb"], ["type", "button", 1, "media-preview-trigger", 3, "click"], [3, "src", "alt"], [1, "media-thumb-meta"], ["type", "button", 1, "remove-chip", 3, "click"], [1, "file-chip-wrap"], ["class", "file-chip", 4, "ngFor", "ngForOf"], [1, "file-chip"], ["type", "button", 3, "click"], [1, "space-y-3", "mt-5"], ["class", "document-row", 4, "ngFor", "ngForOf"], [1, "document-row"], [1, "document-main"], ["type", "button", "class", "document-preview", 3, "click", 4, "ngIf"], [1, "document-actions"], [1, "form-select", 3, "ngModelChange", "ngModel", "ngModelOptions"], [3, "value", 4, "ngFor", "ngForOf"], ["type", "button", 1, "remove-chip", "remove-chip--flat", 3, "click"], ["type", "button", 1, "document-preview", 3, "click"], [3, "value"], ["type", "button", 1, "secondary-cta", 3, "click"], ["type", "button", 1, "secondary-cta", "secondary-cta--accent", 3, "click"], ["type", "submit", 1, "primary-cta", 3, "disabled"], [1, "documents-guide-backdrop", 3, "click"], [1, "documents-guide-modal", 3, "click"], ["type", "button", 1, "documents-guide-close", 3, "click"], [1, "documents-guide-header"], [1, "documents-guide-grid"], [1, "documents-guide-card"], [1, "documents-guide-checklist"], [1, "documents-guide-check"], [1, "image-lightbox", 3, "click"], [1, "image-lightbox__dialog", 3, "click"], ["type", "button", 1, "image-lightbox__close", 3, "click"], [1, "image-lightbox__media", 3, "src", "alt"], [1, "image-lightbox__meta"]], template: function CreerAnimalComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 2)(1, "div", 3)(2, "div", 4)(3, "div", 5)(4, "p", 6);
            i0.ɵɵtext(5);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "h1");
            i0.ɵɵtext(7);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "p", 7);
            i0.ɵɵtext(9);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(10, CreerAnimalComponent_div_10_Template, 2, 0, "div", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "div", 9)(12, "div", 10)(13, "span", 11);
            i0.ɵɵtext(14, "Tra\u00E7abilit\u00E9");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "span", 12);
            i0.ɵɵtext(16);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(17, "div", 10)(18, "span", 11);
            i0.ɵɵtext(19, "Cartographie");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "span", 12);
            i0.ɵɵtext(21, "La position du troupeau est visible sur la carte du dossier.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(22, "div", 10)(23, "span", 11);
            i0.ɵɵtext(24, "ANADER");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(25, "span", 12);
            i0.ɵɵtext(26);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(27, "div", 13)(28, "form", 14);
            i0.ɵɵlistener("ngSubmit", function CreerAnimalComponent_Template_form_ngSubmit_28_listener() { return ctx.submit(); });
            i0.ɵɵtemplate(29, CreerAnimalComponent_div_29_Template, 2, 0, "div", 15);
            i0.ɵɵelementStart(30, "div", 16)(31, "div", 17)(32, "div")(33, "p", 18);
            i0.ɵɵtext(34, "Parcours dossier");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(35, "h2");
            i0.ɵɵtext(36, "Progression par \u00E9tape");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(37, "span", 19);
            i0.ɵɵtext(38);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(39, "p-steps", 20);
            i0.ɵɵlistener("activeIndexChange", function CreerAnimalComponent_Template_p_steps_activeIndexChange_39_listener($event) { return ctx.onStepChange($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(40, "div", 21)(41, "div")(42, "p", 22);
            i0.ɵɵtext(43);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(44, "strong");
            i0.ɵɵtext(45);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(46, "span");
            i0.ɵɵtext(47);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(48, "div", 23)(49, "div", 24)(50, "div")(51, "p", 18);
            i0.ɵɵtext(52, "1. Identit\u00E9 du b\u00E9tail");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(53, "h2");
            i0.ɵɵtext(54, "D\u00E9crire l'animal ou le lot");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(55, "span", 19);
            i0.ɵɵtext(56);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(57, "div", 25)(58, "div", 26)(59, "label", 27);
            i0.ɵɵtext(60, "Esp\u00E8ce");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(61, "div", 28);
            i0.ɵɵtemplate(62, CreerAnimalComponent_button_62_Template, 5, 4, "button", 29);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(63, "div")(64, "label", 30);
            i0.ɵɵtext(65, "Race");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(66, "input", 31);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(67, "div")(68, "label", 32);
            i0.ɵɵtext(69, "Lieu d'origine");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(70, "input", 33);
            i0.ɵɵtemplate(71, CreerAnimalComponent_p_71_Template, 2, 0, "p", 34);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(72, "div")(73, "label", 35);
            i0.ɵɵtext(74, "Prix en FCFA");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(75, "input", 36);
            i0.ɵɵtemplate(76, CreerAnimalComponent_p_76_Template, 2, 0, "p", 34)(77, CreerAnimalComponent_p_77_Template, 2, 0, "p", 34);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(78, "div")(79, "label", 37);
            i0.ɵɵtext(80, "Nombre de t\u00EAtes");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(81, "input", 38);
            i0.ɵɵtemplate(82, CreerAnimalComponent_p_82_Template, 2, 0, "p", 34);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(83, CreerAnimalComponent_div_83_Template, 4, 0, "div", 39);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(84, "div", 23)(85, "div", 24)(86, "div")(87, "p", 18);
            i0.ɵɵtext(88, "2. Cartographie");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(89, "h2");
            i0.ɵɵtext(90, "Positionner l'animal sur la carte");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(91, "span", 19);
            i0.ɵɵtext(92, "Carte terrain");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(93, "div", 40)(94, "button", 41);
            i0.ɵɵlistener("click", function CreerAnimalComponent_Template_button_click_94_listener() { return ctx.useCurrentPosition(); });
            i0.ɵɵtext(95);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(96, "button", 42);
            i0.ɵɵlistener("click", function CreerAnimalComponent_Template_button_click_96_listener() { return ctx.recenterMap(); });
            i0.ɵɵtext(97, " Recentrer la carte ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(98, "div", 43)(99, "div", 44);
            i0.ɵɵtemplate(100, CreerAnimalComponent_div_100_Template, 2, 0, "div", 45)(101, CreerAnimalComponent_ng_template_101_Template, 5, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementStart(103, "p", 46);
            i0.ɵɵtext(104);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(105, "div", 47)(106, "div")(107, "label", 48);
            i0.ɵɵtext(108, "Longitude");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(109, "input", 49);
            i0.ɵɵlistener("change", function CreerAnimalComponent_Template_input_change_109_listener() { return ctx.onCoordinatesBlur(); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(110, "div")(111, "label", 50);
            i0.ɵɵtext(112, "Latitude");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(113, "input", 51);
            i0.ɵɵlistener("change", function CreerAnimalComponent_Template_input_change_113_listener() { return ctx.onCoordinatesBlur(); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(114, "div", 52);
            i0.ɵɵtext(115, " Cliquez sur la carte pour positionner le troupeau ou saisissez les coordonn\u00E9es si elles sont d\u00E9j\u00E0 connues. ");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(116, "div", 23)(117, "div", 24)(118, "div")(119, "p", 18);
            i0.ɵɵtext(120, "3. M\u00E9dias");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(121, "h2");
            i0.ɵɵtext(122, "Photos et vid\u00E9os du dossier");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(123, "span", 19);
            i0.ɵɵtext(124, "Pi\u00E8ces visuelles");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(125, "div", 53)(126, "label", 54)(127, "input", 55);
            i0.ɵɵlistener("change", function CreerAnimalComponent_Template_input_change_127_listener($event) { return ctx.onFileSelection($event, "photos"); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(128, "span", 56);
            i0.ɵɵtext(129, "Ajouter des photos");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(130, "span", 57);
            i0.ɵɵtext(131, "Vue de l'animal, gabarit, environnement d'\u00E9levage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(132, "span", 58);
            i0.ɵɵtext(133);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(134, "label", 54)(135, "input", 59);
            i0.ɵɵlistener("change", function CreerAnimalComponent_Template_input_change_135_listener($event) { return ctx.onFileSelection($event, "videos"); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(136, "span", 56);
            i0.ɵɵtext(137, "Ajouter des vid\u00E9os");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(138, "span", 57);
            i0.ɵɵtext(139, "Mouvements, marche et \u00E9tat g\u00E9n\u00E9ral");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(140, "span", 58);
            i0.ɵɵtext(141);
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(142, CreerAnimalComponent_div_142_Template, 5, 1, "div", 60)(143, CreerAnimalComponent_div_143_Template, 5, 1, "div", 60);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(144, "div", 23)(145, "div", 24)(146, "div")(147, "p", 18);
            i0.ɵɵtext(148, "4. Pi\u00E8ces sanitaires");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(149, "h2");
            i0.ɵɵtext(150, "Documents disponibles pour le contr\u00F4le");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(151, "div", 61)(152, "button", 62);
            i0.ɵɵlistener("click", function CreerAnimalComponent_Template_button_click_152_listener() { return ctx.openDocumentsGuide(); });
            i0.ɵɵtext(153, " Pi\u00E8ces \u00E0 fournir ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(154, "span", 19);
            i0.ɵɵtext(155, "Dossier sanitaire");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(156, "label", 63)(157, "input", 64);
            i0.ɵɵlistener("change", function CreerAnimalComponent_Template_input_change_157_listener($event) { return ctx.onFileSelection($event, "documents"); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(158, "span", 56);
            i0.ɵɵtext(159, "Ajouter fiches et certificats");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(160, "span", 57);
            i0.ɵɵtext(161, "Vaccination, certificat v\u00E9t\u00E9rinaire, attestation DSV");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(162, "span", 58);
            i0.ɵɵtext(163);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(164, "div", 65);
            i0.ɵɵtext(165, " Joignez ici les pi\u00E8ces sanitaires qui accompagneront le dossier lors du contr\u00F4le et de la v\u00E9rification administrative. ");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(166, CreerAnimalComponent_div_166_Template, 2, 1, "div", 66);
            i0.ɵɵelementStart(167, "div", 67)(168, "div", 68)(169, "span");
            i0.ɵɵtext(170, "Photos");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(171, "strong");
            i0.ɵɵtext(172);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(173, "div", 68)(174, "span");
            i0.ɵɵtext(175, "Vid\u00E9os");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(176, "strong");
            i0.ɵɵtext(177);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(178, "div", 68)(179, "span");
            i0.ɵɵtext(180, "Documents");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(181, "strong");
            i0.ɵɵtext(182);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(183, "div", 69);
            i0.ɵɵtemplate(184, CreerAnimalComponent_button_184_Template, 2, 0, "button", 70);
            i0.ɵɵelement(185, "div", 71);
            i0.ɵɵtemplate(186, CreerAnimalComponent_button_186_Template, 2, 0, "button", 72)(187, CreerAnimalComponent_button_187_Template, 2, 2, "button", 73);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(188, "aside", 74)(189, "div", 75)(190, "p", 18);
            i0.ɵɵtext(191, "\u00C9tape active");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(192, "h2");
            i0.ɵɵtext(193);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(194, "p", 76);
            i0.ɵɵtext(195);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(196, "div", 77)(197, "p", 78);
            i0.ɵɵtext(198);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(199, "h2", 79);
            i0.ɵɵtext(200);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(201, "div", 80)(202, "div", 81)(203, "span", 82);
            i0.ɵɵtext(204, "01");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(205, "p");
            i0.ɵɵtext(206);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(207, "div", 81)(208, "span", 82);
            i0.ɵɵtext(209, "02");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(210, "p");
            i0.ɵɵtext(211, "Rattachement permanent du dossier \u00E0 votre espace vendeur.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(212, "div", 81)(213, "span", 82);
            i0.ɵɵtext(214, "03");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(215, "p");
            i0.ɵɵtext(216);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(217, "div", 81)(218, "span", 82);
            i0.ɵɵtext(219, "04");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(220, "p");
            i0.ɵɵtext(221, "Passage en ");
            i0.ɵɵelementStart(222, "strong");
            i0.ɵɵtext(223, "INDISPONIBLE");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(224, " jusqu'\u00E0 validation sanitaire.");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(225, "div", 75)(226, "p", 18);
            i0.ɵɵtext(227, "Contr\u00F4les");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(228, "h2");
            i0.ɵɵtext(229, "V\u00E9rifications du dossier");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(230, "ul", 83)(231, "li");
            i0.ɵɵtext(232, "Esp\u00E8ce s\u00E9lectionn\u00E9e");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(233, "li");
            i0.ɵɵtext(234, "Lieu d'origine renseign\u00E9");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(235, "li");
            i0.ɵɵtext(236, "Prix d\u00E9fini");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(237, "li");
            i0.ɵɵtext(238, " G\u00E9olocalisation renseign\u00E9e ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(239, "li");
            i0.ɵɵtext(240, "Au moins une photo ajout\u00E9e");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(241, "li");
            i0.ɵɵtext(242, "Documents sanitaires joints");
            i0.ɵɵelementEnd()()()()()()();
            i0.ɵɵtemplate(243, CreerAnimalComponent_div_243_Template, 48, 0, "div", 84)(244, CreerAnimalComponent_div_244_Template, 10, 4, "div", 85);
        } if (rf & 2) {
            let tmp_54_0;
            let tmp_55_0;
            let tmp_56_0;
            let tmp_57_0;
            const mapFallback_r16 = i0.ɵɵreference(102);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.heroEyebrow);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.heroTitle);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1(" ", ctx.heroText, " ");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.editMode);
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate1(" ", ctx.editMode ? "Le QR code reste attach\u00E9 au dossier existant." : "Un identifiant et un QR code sont g\u00E9n\u00E9r\u00E9s d\u00E8s l'enregistrement.", " ");
            i0.ɵɵadvance(10);
            i0.ɵɵtextInterpolate1(" ", ctx.editMode ? "Apr\u00E8s modification, le dossier repart dans le circuit de contr\u00F4le sanitaire." : "Le dossier reste en attente tant que le contr\u00F4le sanitaire n'est pas valid\u00E9.", " ");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.loadingAnimal);
            i0.ɵɵadvance(9);
            i0.ɵɵtextInterpolate2("\u00C9tape ", ctx.currentStepIndex + 1, " / ", ctx.stepItems.length);
            i0.ɵɵadvance();
            i0.ɵɵproperty("model", ctx.stepItems)("readonly", false)("activeIndex", ctx.currentStepIndex);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(ctx.currentStepLabel);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.currentStepDescription);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.editMode ? "Les modifications restent enregistr\u00E9es au fur et \u00E0 mesure dans votre formulaire." : "Vous pouvez avancer \u00E9tape par \u00E9tape avant l\u2019enregistrement final.");
            i0.ɵɵadvance();
            i0.ɵɵclassProp("step-panel--active", ctx.currentStepIndex === 0);
            i0.ɵɵattribute("aria-hidden", ctx.currentStepIndex !== 0);
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate(ctx.selectedAnimalType == null ? null : ctx.selectedAnimalType.label);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("ngForOf", ctx.animalTypes);
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("ngIf", ctx.controlInvalid("lieuNaissance", "required"));
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngIf", ctx.controlInvalid("price", "required"));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.controlInvalid("price", "min"));
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngIf", ctx.controlInvalid("quantity", "min"));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isGroupedLot);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("step-panel--active", ctx.currentStepIndex === 1);
            i0.ɵɵattribute("aria-hidden", ctx.currentStepIndex !== 1);
            i0.ɵɵadvance(10);
            i0.ɵɵproperty("disabled", ctx.geolocating);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.geolocating ? "Localisation en cours..." : "Utiliser ma position", " ");
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngIf", !ctx.mapUnavailable)("ngIfElse", mapFallback_r16);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(ctx.mapStatus);
            i0.ɵɵadvance(12);
            i0.ɵɵclassProp("step-panel--active", ctx.currentStepIndex === 2);
            i0.ɵɵattribute("aria-hidden", ctx.currentStepIndex !== 2);
            i0.ɵɵadvance(17);
            i0.ɵɵtextInterpolate1("", ctx.uploadedPhotos.length, " fichier(s) s\u00E9lectionn\u00E9(s)");
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate1("", ctx.uploadedVideos.length, " fichier(s) s\u00E9lectionn\u00E9(s)");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.uploadedPhotos.length);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.uploadedVideos.length);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("step-panel--active", ctx.currentStepIndex === 3);
            i0.ɵɵattribute("aria-hidden", ctx.currentStepIndex !== 3);
            i0.ɵɵadvance(19);
            i0.ɵɵtextInterpolate1("", ctx.uploadedDocuments.length, " document(s) s\u00E9lectionn\u00E9(s)");
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.uploadedDocuments.length);
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(ctx.uploadedPhotos.length);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.uploadedVideos.length);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.uploadedDocuments.length);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", !ctx.isFirstStep);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", !ctx.isLastStep);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isLastStep);
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(ctx.currentStepLabel);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.currentStepDescription);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.editMode ? "R\u00E9vision" : "R\u00E9sum\u00E9 rapide");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1(" ", ctx.editMode ? "Ce qui se passe apr\u00E8s la mise \u00E0 jour" : "Ce que le syst\u00E8me fera automatiquement", " ");
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(ctx.editMode ? "Conservation de l'identifiant et du QR code existants." : "Attribution d'un identifiant de tra\u00E7abilit\u00E9 et d'un QR code.");
            i0.ɵɵadvance(10);
            i0.ɵɵtextInterpolate(ctx.editMode ? "Ajout d'un \u00E9v\u00E9nement de r\u00E9vision dans l'historique de suivi." : "Ajout du premier \u00E9v\u00E9nement de suivi dans l'historique.");
            i0.ɵɵadvance(15);
            i0.ɵɵclassProp("check-list--active", !!((tmp_54_0 = ctx.form.get("type")) == null ? null : tmp_54_0.value));
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("check-list--active", !!((tmp_55_0 = ctx.form.get("lieuNaissance")) == null ? null : tmp_55_0.value));
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("check-list--active", !!((tmp_56_0 = ctx.form.get("price")) == null ? null : tmp_56_0.value));
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("check-list--active", ((tmp_57_0 = ctx.form.get("latitude")) == null ? null : tmp_57_0.value) != null && ((tmp_57_0 = ctx.form.get("longitude")) == null ? null : tmp_57_0.value) != null);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("check-list--active", ctx.uploadedPhotos.length > 0);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("check-list--active", ctx.uploadedDocuments.length > 0);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.documentsGuideOpen);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.previewedImage);
        } }, dependencies: [i6.NgForOf, i6.NgIf, i1.ɵNgNoValidate, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.NumberValueAccessor, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.NgModel, i1.FormGroupDirective, i1.FormControlName, i7.Steps, i6.DecimalPipe], styles: ["[_nghost-%COMP%] {\r\n  display: block;\r\n}\r\n\r\n.animal-shell[_ngcontent-%COMP%] {\r\n  min-height: 100%;\r\n  background:\r\n    radial-gradient(circle at top left, rgba(220, 38, 38, 0.14), transparent 32%),\r\n    radial-gradient(circle at top right, rgba(190, 24, 93, 0.12), transparent 28%),\r\n    linear-gradient(180deg, #fff7f7 0%, #fff1f2 48%, #fdf2f8 100%);\r\n}\r\n\r\n.hero-panel[_ngcontent-%COMP%], \r\n.glass-card[_ngcontent-%COMP%] {\r\n  border: 1px solid rgba(136, 19, 55, 0.12);\r\n  background: rgba(255, 250, 250, 0.92);\r\n  backdrop-filter: blur(18px);\r\n  box-shadow: 0 24px 80px rgba(136, 19, 55, 0.08);\r\n}\r\n\r\n.hero-panel[_ngcontent-%COMP%] {\r\n  border-radius: 32px;\r\n  padding: 2rem;\r\n  display: grid;\r\n  grid-template-columns: minmax(0, 1.35fr) minmax(0, 0.95fr);\r\n  gap: 1.5rem;\r\n}\r\n\r\n.hero-copy[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], \r\n.glass-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\r\n  margin: 0;\r\n  color: #611a24;\r\n  font-family: \"Trebuchet MS\", \"Segoe UI Variable\", sans-serif;\r\n  font-weight: 700;\r\n  letter-spacing: -0.03em;\r\n}\r\n\r\n.hero-copy[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\r\n  font-size: clamp(2rem, 3vw, 3.2rem);\r\n  line-height: 1.02;\r\n}\r\n\r\n.hero-text[_ngcontent-%COMP%] {\r\n  margin: 1rem 0 0;\r\n  max-width: 62ch;\r\n  color: #7f1d1d;\r\n  line-height: 1.7;\r\n}\r\n\r\n.eyebrow[_ngcontent-%COMP%], \r\n.section-kicker[_ngcontent-%COMP%] {\r\n  margin: 0 0 0.45rem;\r\n  font-size: 0.72rem;\r\n  font-weight: 700;\r\n  letter-spacing: 0.22em;\r\n  text-transform: uppercase;\r\n  color: #be123c;\r\n}\r\n\r\n.hero-metrics[_ngcontent-%COMP%] {\r\n  display: grid;\r\n  gap: 0.85rem;\r\n}\r\n\r\n.metric-card[_ngcontent-%COMP%] {\r\n  border-radius: 24px;\r\n  background: linear-gradient(160deg, rgba(255, 228, 230, 0.92), rgba(255, 255, 255, 0.86));\r\n  padding: 1.1rem 1.2rem;\r\n}\r\n\r\n.metric-value[_ngcontent-%COMP%] {\r\n  display: block;\r\n  color: #9f1239;\r\n  font-size: 1.1rem;\r\n  font-weight: 800;\r\n  letter-spacing: 0.08em;\r\n  text-transform: uppercase;\r\n}\r\n\r\n.metric-label[_ngcontent-%COMP%] {\r\n  display: block;\r\n  margin-top: 0.35rem;\r\n  color: #7f1d1d;\r\n  line-height: 1.5;\r\n}\r\n\r\n.glass-card[_ngcontent-%COMP%] {\r\n  border-radius: 28px;\r\n  padding: 1.4rem;\r\n}\r\n\r\n.stepper-shell[_ngcontent-%COMP%] {\r\n  padding-bottom: 1.2rem;\r\n}\r\n\r\n.stepper-caption[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  gap: 1rem;\r\n  align-items: center;\r\n  margin-top: 1.2rem;\r\n  padding: 1rem 1.1rem;\r\n  border-radius: 22px;\r\n  background: linear-gradient(135deg, rgba(255, 241, 242, 0.98), rgba(255, 255, 255, 0.88));\r\n  color: #7f1d1d;\r\n}\r\n\r\n.stepper-caption__eyebrow[_ngcontent-%COMP%] {\r\n  margin: 0 0 0.25rem;\r\n  color: #be123c;\r\n  font-size: 0.74rem;\r\n  font-weight: 800;\r\n  letter-spacing: 0.18em;\r\n  text-transform: uppercase;\r\n}\r\n\r\n.stepper-caption[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\r\n  display: block;\r\n  color: #611a24;\r\n  line-height: 1.5;\r\n}\r\n\r\n.stepper-caption[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\r\n  max-width: 28ch;\r\n  line-height: 1.6;\r\n}\r\n\r\n.step-panel[_ngcontent-%COMP%] {\r\n  display: none;\r\n}\r\n\r\n.step-panel--active[_ngcontent-%COMP%] {\r\n  display: block;\r\n}\r\n\r\n.glass-card--contrast[_ngcontent-%COMP%] {\r\n  background:\r\n    radial-gradient(circle at top left, rgba(251, 113, 133, 0.24), transparent 28%),\r\n    linear-gradient(160deg, #7f1d1d 0%, #be123c 100%);\r\n  color: #fff;\r\n}\r\n\r\n.glass-card--contrast[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], \r\n.glass-card--contrast[_ngcontent-%COMP%]   .section-kicker[_ngcontent-%COMP%], \r\n.glass-card--contrast[_ngcontent-%COMP%]   .summary-line[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \r\n.glass-card--contrast[_ngcontent-%COMP%]   .summary-line[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\r\n  color: #fff;\r\n}\r\n\r\n.section-heading[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 1rem;\n  align-items: flex-start;\n  margin-bottom: 1.25rem;\n}\n\n.section-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n}\n\n.section-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.4rem 0.8rem;\r\n  border-radius: 999px;\r\n  background: #ffe4e6;\r\n  color: #9f1239;\r\n  font-size: 0.78rem;\n  font-weight: 700;\n}\n\n.section-link[_ngcontent-%COMP%] {\n  border: 0;\n  border-radius: 999px;\n  padding: 0.65rem 1rem;\n  background: rgba(255, 241, 242, 0.98);\n  color: #9f1239;\n  font-weight: 800;\n  box-shadow: inset 0 0 0 1px rgba(190, 24, 93, 0.12);\n}\n\r\n.form-label[_ngcontent-%COMP%], \r\n.gallery-label[_ngcontent-%COMP%] {\r\n  display: block;\r\n  margin-bottom: 0.55rem;\r\n  color: #7f1d1d;\r\n  font-weight: 700;\r\n  font-size: 0.92rem;\r\n}\r\n\r\n.form-input[_ngcontent-%COMP%], \r\n.form-select[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  border: 1px solid rgba(190, 24, 93, 0.14);\r\n  border-radius: 18px;\r\n  padding: 0.95rem 1rem;\r\n  background: rgba(255, 255, 255, 0.9);\r\n  color: #4c0519;\r\n  outline: none;\r\n}\r\n\r\n.form-input[_ngcontent-%COMP%]:focus, \r\n.form-select[_ngcontent-%COMP%]:focus {\r\n  border-color: #e11d48;\r\n  box-shadow: 0 0 0 4px rgba(225, 29, 72, 0.12);\r\n}\r\n\r\n.form-error[_ngcontent-%COMP%] {\r\n  margin-top: 0.45rem;\r\n  color: #be123c;\r\n  font-size: 0.82rem;\r\n}\r\n\r\n.type-grid[_ngcontent-%COMP%] {\r\n  display: grid;\r\n  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));\r\n  gap: 0.8rem;\r\n}\r\n\r\n.type-tile[_ngcontent-%COMP%] {\r\n  border: 1px solid rgba(190, 24, 93, 0.12);\r\n  border-radius: 22px;\r\n  padding: 1rem;\r\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(255, 241, 242, 0.94));\r\n  text-align: left;\r\n  transition: transform 160ms ease, border-color 160ms ease, box-shadow 160ms ease;\r\n}\r\n\r\n.type-tile[_ngcontent-%COMP%]:hover, \r\n.type-tile--active[_ngcontent-%COMP%] {\r\n  transform: translateY(-2px);\r\n  border-color: #e11d48;\r\n  box-shadow: 0 18px 34px rgba(225, 29, 72, 0.12);\r\n}\r\n\r\n.type-title[_ngcontent-%COMP%] {\r\n  display: block;\r\n  color: #611a24;\r\n  font-weight: 700;\r\n}\r\n\r\n.type-hint[_ngcontent-%COMP%] {\r\n  display: block;\r\n  margin-top: 0.35rem;\r\n  color: #881337;\r\n  line-height: 1.45;\r\n  font-size: 0.88rem;\r\n}\r\n\r\n.lot-banner[_ngcontent-%COMP%] {\r\n  border-radius: 20px;\r\n  padding: 0.95rem 1rem;\r\n  background: rgba(244, 63, 94, 0.1);\r\n  color: #9f1239;\r\n  line-height: 1.55;\r\n}\r\n\r\n.review-strip[_ngcontent-%COMP%] {\r\n  display: grid;\r\n  grid-template-columns: repeat(3, minmax(0, 1fr));\r\n  gap: 0.85rem;\r\n  margin-top: 1.35rem;\r\n}\r\n\r\n.review-chip[_ngcontent-%COMP%] {\r\n  padding: 0.95rem 1rem;\r\n  border-radius: 20px;\r\n  background: rgba(255, 241, 242, 0.86);\r\n}\r\n\r\n.review-chip[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\r\n  display: block;\r\n  color: #9f1239;\r\n  font-size: 0.78rem;\r\n  font-weight: 700;\r\n  text-transform: uppercase;\r\n  letter-spacing: 0.08em;\r\n}\r\n\r\n.review-chip[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\r\n  display: block;\r\n  margin-top: 0.35rem;\r\n  color: #611a24;\r\n  font-size: 1.2rem;\r\n}\r\n\r\n.upload-card[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 0.35rem;\r\n  min-height: 170px;\r\n  justify-content: center;\r\n  padding: 1.1rem 1.2rem;\r\n  border-radius: 24px;\r\n  border: 1px dashed rgba(225, 29, 72, 0.26);\r\n  background:\r\n    linear-gradient(135deg, rgba(255, 241, 242, 0.96), rgba(255, 255, 255, 0.88)),\r\n    repeating-linear-gradient(-45deg, rgba(251, 113, 133, 0.1), rgba(251, 113, 133, 0.1) 10px, transparent 10px, transparent 20px);\r\n  cursor: pointer;\r\n}\r\n\r\n.upload-card--wide[_ngcontent-%COMP%] {\r\n  min-height: 0;\r\n}\r\n\r\n.upload-title[_ngcontent-%COMP%] {\n  font-weight: 800;\n  color: #611a24;\n}\n\n.documents-note[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  padding: 0.95rem 1rem;\n  border-radius: 20px;\n  background: rgba(255, 241, 242, 0.86);\n  color: #7f1d1d;\n  line-height: 1.6;\n}\n\r\n.upload-subtitle[_ngcontent-%COMP%], \r\n.upload-meta[_ngcontent-%COMP%] {\r\n  color: #881337;\r\n  line-height: 1.5;\r\n}\r\n\r\n.media-thumb[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  overflow: hidden;\r\n  border-radius: 22px;\r\n  min-height: 160px;\r\n  background: #ffe4e6;\r\n}\r\n\r\n.media-gallery-grid[_ngcontent-%COMP%] {\r\n  display: grid;\r\n  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));\r\n  gap: 0.85rem;\r\n}\r\n\r\n.media-preview-trigger[_ngcontent-%COMP%] {\r\n  display: block;\r\n  width: 100%;\r\n  height: 100%;\r\n  min-height: 190px;\r\n  border: 0;\r\n  padding: 0;\r\n  cursor: pointer;\r\n  background: transparent;\r\n}\r\n\r\n.media-thumb[_ngcontent-%COMP%]   img[_ngcontent-%COMP%], \r\n.document-preview[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  height: 100%;\r\n  object-fit: cover;\r\n}\r\n\r\n.media-thumb-meta[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  left: 0.75rem;\r\n  right: 4.8rem;\r\n  bottom: 0.75rem;\r\n  display: grid;\r\n  gap: 0.15rem;\r\n  padding: 0.75rem 0.85rem;\r\n  border-radius: 18px;\r\n  background: linear-gradient(180deg, rgba(76, 5, 25, 0.1), rgba(76, 5, 25, 0.86));\r\n  color: #fff;\r\n  pointer-events: none;\r\n}\r\n\r\n.media-thumb-meta[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\r\n  font-size: 0.88rem;\r\n}\r\n\r\n.media-thumb-meta[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\r\n  font-size: 0.74rem;\r\n  color: rgba(255, 255, 255, 0.86);\r\n}\r\n\r\n.remove-chip[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  right: 0.65rem;\r\n  bottom: 0.65rem;\r\n  border: 0;\r\n  border-radius: 999px;\r\n  background: rgba(136, 19, 55, 0.9);\r\n  color: #fff;\r\n  padding: 0.45rem 0.8rem;\r\n  font-size: 0.78rem;\r\n}\r\n\r\n.remove-chip--flat[_ngcontent-%COMP%] {\r\n  position: static;\r\n  background: #ffe4e6;\r\n  color: #9f1239;\r\n}\r\n\r\n.file-chip-wrap[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n  gap: 0.75rem;\r\n}\r\n\r\n.file-chip[_ngcontent-%COMP%], \r\n.document-row[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  gap: 1rem;\r\n  padding: 0.9rem 1rem;\r\n  border-radius: 20px;\r\n  background: rgba(255, 241, 242, 0.86);\r\n}\r\n\r\n.file-chip[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \r\n.document-row[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\r\n  display: block;\r\n  color: #611a24;\r\n}\r\n\r\n.file-chip[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \r\n.document-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\r\n  color: #881337;\r\n  font-size: 0.86rem;\r\n}\r\n\r\n.document-actions[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 0.75rem;\r\n  min-width: 280px;\r\n}\r\n\r\n.document-main[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 0.9rem;\r\n  min-width: 0;\r\n}\r\n\r\n.document-preview[_ngcontent-%COMP%] {\n  width: 72px;\n  min-width: 72px;\n  height: 72px;\r\n  overflow: hidden;\r\n  border: 0;\r\n  border-radius: 18px;\r\n  padding: 0;\r\n  cursor: pointer;\r\n  background: #fecdd3;\r\n  box-shadow: inset 0 0 0 1px rgba(190, 24, 93, 0.16);\n}\n\n.documents-guide-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 85;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 1rem;\n  background: rgba(76, 5, 25, 0.66);\n  backdrop-filter: blur(10px);\n}\n\n.documents-guide-modal[_ngcontent-%COMP%] {\n  width: min(100%, 980px);\n  max-height: calc(100vh - 2rem);\n  overflow: auto;\n  border-radius: 32px;\n  padding: 1.35rem;\n  background:\n    radial-gradient(circle at top right, rgba(251, 113, 133, 0.16), transparent 24%),\n    linear-gradient(180deg, #fffafb 0%, #fff1f2 100%);\n  box-shadow: 0 36px 80px rgba(76, 5, 25, 0.32);\n}\n\n.documents-guide-close[_ngcontent-%COMP%] {\n  display: inline-flex;\n  margin-left: auto;\n  border: 0;\n  border-radius: 999px;\n  padding: 0.75rem 1rem;\n  background: #881337;\n  color: #fff;\n  font-weight: 700;\n}\n\n.documents-guide-header[_ngcontent-%COMP%] {\n  margin-top: 0.9rem;\n}\n\n.documents-guide-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]:last-child {\n  margin: 0.85rem 0 0;\n  color: #7f1d1d;\n  line-height: 1.7;\n}\n\n.documents-guide-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0.95rem;\n  margin-top: 1.2rem;\n}\n\n.documents-guide-card[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.35rem;\n  padding: 1rem 1.05rem;\n  border-radius: 22px;\n  background: rgba(255, 255, 255, 0.9);\n  box-shadow: inset 0 0 0 1px rgba(190, 24, 93, 0.1);\n}\n\n.documents-guide-card[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #611a24;\n}\n\n.documents-guide-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #7f1d1d;\n  line-height: 1.55;\n}\n\n.documents-guide-checklist[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 0.85rem;\n  margin-top: 1.1rem;\n}\n\n.documents-guide-check[_ngcontent-%COMP%] {\n  padding: 0.95rem 1rem;\n  border-radius: 20px;\n  background: rgba(255, 241, 242, 0.86);\n}\n\n.documents-guide-check[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  color: #9f1239;\n  font-size: 0.76rem;\n  font-weight: 700;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n\n.documents-guide-check[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 0.35rem;\n  color: #611a24;\n  line-height: 1.5;\n}\n\n.image-lightbox[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\r\n  z-index: 80;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  padding: 1rem;\r\n  background: rgba(76, 5, 25, 0.72);\r\n  backdrop-filter: blur(10px);\r\n}\r\n\r\n.image-lightbox__dialog[_ngcontent-%COMP%] {\r\n  width: min(100%, 920px);\r\n  max-height: calc(100vh - 2rem);\r\n  overflow: auto;\r\n  border-radius: 30px;\r\n  padding: 1rem;\r\n  background: linear-gradient(180deg, #fffafb 0%, #fff1f2 100%);\r\n  box-shadow: 0 32px 80px rgba(76, 5, 25, 0.34);\r\n}\r\n\r\n.image-lightbox__close[_ngcontent-%COMP%] {\r\n  display: inline-flex;\r\n  margin-left: auto;\r\n  border: 0;\r\n  border-radius: 999px;\r\n  padding: 0.75rem 1rem;\r\n  background: #881337;\r\n  color: #fff;\r\n  font-weight: 700;\r\n}\r\n\r\n.image-lightbox__media[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  max-height: 72vh;\r\n  margin-top: 0.85rem;\r\n  border-radius: 22px;\r\n  object-fit: contain;\r\n  background: #fff;\r\n}\r\n\r\n.image-lightbox__meta[_ngcontent-%COMP%] {\r\n  display: grid;\r\n  gap: 0.2rem;\r\n  margin-top: 0.9rem;\r\n  color: #611a24;\r\n}\r\n\r\n.image-lightbox__meta[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\r\n  color: #881337;\r\n}\r\n\r\n.primary-cta[_ngcontent-%COMP%] {\r\n  border: 0;\r\n  border-radius: 999px;\r\n  padding: 0.95rem 1.45rem;\r\n  background: linear-gradient(135deg, #be123c 0%, #e11d48 100%);\r\n  color: #fff;\r\n  font-weight: 800;\r\n  letter-spacing: 0.01em;\r\n  box-shadow: 0 16px 36px rgba(190, 24, 93, 0.24);\r\n}\r\n\r\n.primary-cta[_ngcontent-%COMP%]:disabled {\r\n  opacity: 0.65;\r\n  cursor: not-allowed;\r\n}\r\n\r\n.step-actions[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 0.9rem;\r\n  flex-wrap: wrap;\r\n}\r\n\r\n.step-actions__spacer[_ngcontent-%COMP%] {\r\n  flex: 1 1 auto;\r\n}\r\n\r\n.secondary-cta[_ngcontent-%COMP%] {\r\n  border: 1px solid rgba(190, 24, 93, 0.16);\r\n  border-radius: 999px;\r\n  padding: 0.95rem 1.3rem;\r\n  background: rgba(255, 255, 255, 0.94);\r\n  color: #9f1239;\r\n  font-weight: 800;\r\n}\r\n\r\n.secondary-cta--accent[_ngcontent-%COMP%] {\r\n  background: linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%);\r\n}\r\n\r\n.summary-stack[_ngcontent-%COMP%] {\r\n  display: grid;\r\n  gap: 0.9rem;\r\n  margin-top: 1.2rem;\r\n}\r\n\r\n.summary-line[_ngcontent-%COMP%] {\r\n  display: grid;\r\n  grid-template-columns: auto 1fr;\r\n  gap: 0.75rem;\r\n  align-items: start;\r\n}\r\n\r\n.summary-line[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\r\n  margin: 0;\r\n  line-height: 1.6;\r\n}\r\n\r\n.summary-index[_ngcontent-%COMP%] {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  width: 34px;\r\n  height: 34px;\r\n  border-radius: 12px;\r\n  background: rgba(255, 255, 255, 0.16);\r\n  font-weight: 800;\r\n}\r\n\r\n.check-list[_ngcontent-%COMP%] {\r\n  margin: 1rem 0 0;\r\n  padding: 0;\r\n  list-style: none;\r\n  display: grid;\r\n  gap: 0.75rem;\r\n}\r\n\r\n.check-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\r\n  border-radius: 16px;\r\n  padding: 0.85rem 0.95rem;\r\n  background: rgba(255, 241, 242, 0.86);\r\n  color: #881337;\r\n  font-weight: 600;\r\n}\r\n\r\n.check-list--active[_ngcontent-%COMP%] {\r\n  background: rgba(254, 242, 242, 0.98) !important;\r\n  color: #991b1b !important;\r\n  box-shadow: inset 0 0 0 1px rgba(239, 68, 68, 0.16);\r\n}\r\n\r\n  .animal-steps .p-steps-list {\r\n  display: grid;\r\n  grid-template-columns: repeat(4, minmax(0, 1fr));\r\n  gap: 0.75rem;\r\n}\r\n\r\n  .animal-steps .p-steps-item {\r\n  min-width: 0;\r\n}\r\n\r\n  .animal-steps .p-steps-item-link {\r\n  flex-direction: column;\r\n  align-items: flex-start;\r\n  gap: 0.55rem;\r\n  padding: 1rem;\r\n  border-radius: 22px;\r\n  background: rgba(255, 255, 255, 0.88);\r\n  border: 1px solid rgba(190, 24, 93, 0.12);\r\n  box-shadow: 0 14px 28px rgba(136, 19, 55, 0.06);\r\n}\r\n\r\n  .animal-steps .p-steps-item-number {\r\n  width: 38px;\r\n  height: 38px;\r\n  border-radius: 14px;\r\n  background: #ffe4e6;\r\n  color: #9f1239;\r\n  font-weight: 800;\r\n}\r\n\r\n  .animal-steps .p-steps-item-label {\r\n  color: #611a24;\r\n  font-weight: 800;\r\n}\r\n\r\n  .animal-steps .p-steps-item-active .p-steps-item-link {\r\n  background: linear-gradient(135deg, rgba(190, 24, 93, 0.92), rgba(225, 29, 72, 0.94));\r\n  border-color: transparent;\r\n  box-shadow: 0 18px 36px rgba(190, 24, 93, 0.22);\r\n}\r\n\r\n  .animal-steps .p-steps-item-active .p-steps-item-number {\r\n  background: rgba(255, 255, 255, 0.16);\r\n  color: #fff;\r\n}\r\n\r\n  .animal-steps .p-steps-item-active .p-steps-item-label {\r\n  color: #fff;\r\n}\r\n\r\n@media (max-width: 1279px) {\r\n  .hero-panel[_ngcontent-%COMP%] {\r\n    grid-template-columns: 1fr;\r\n  }\r\n}\r\n\r\n@media (max-width: 1100px) {\r\n  .review-strip[_ngcontent-%COMP%], \r\n     .animal-steps .p-steps-list {\r\n    grid-template-columns: repeat(2, minmax(0, 1fr));\r\n  }\r\n}\r\n\r\n@media (max-width: 767px) {\r\n  .hero-panel[_ngcontent-%COMP%], \r\n   .glass-card[_ngcontent-%COMP%] {\r\n    border-radius: 24px;\r\n    padding: 1.15rem;\r\n  }\r\n\r\n  .stepper-caption[_ngcontent-%COMP%], \n   .step-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n\n  .section-actions[_ngcontent-%COMP%] {\n    justify-content: stretch;\n  }\n\n  .stepper-caption[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    max-width: none;\n  }\n\r\n  .document-row[_ngcontent-%COMP%], \r\n   .file-chip[_ngcontent-%COMP%] {\r\n    flex-direction: column;\r\n    align-items: stretch;\r\n  }\r\n\r\n  .document-main[_ngcontent-%COMP%] {\r\n    align-items: stretch;\r\n  }\r\n\r\n  .document-preview[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n    min-width: 0;\r\n    height: 180px;\r\n  }\r\n\r\n  .document-actions[_ngcontent-%COMP%] {\r\n    min-width: 0;\r\n    flex-direction: column;\r\n    align-items: stretch;\r\n  }\r\n\r\n  .review-strip[_ngcontent-%COMP%], \n     .animal-steps .p-steps-list {\n    grid-template-columns: 1fr;\n  }\n\n  .documents-guide-grid[_ngcontent-%COMP%], \n   .documents-guide-checklist[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .secondary-cta[_ngcontent-%COMP%], \n   .primary-cta[_ngcontent-%COMP%], \n   .section-link[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CreerAnimalComponent, [{
        type: Component,
        args: [{ selector: 'app-creer-animal', standalone: false, template: "<section class=\"animal-shell py-6 px-4 sm:py-8 lg:px-8\">\r\n  <div class=\"max-w-7xl mx-auto\">\r\n    <div class=\"hero-panel mb-8\">\r\n      <div class=\"hero-copy\">\r\n        <p class=\"eyebrow\">{{ heroEyebrow }}</p>\r\n        <h1>{{ heroTitle }}</h1>\r\n        <p class=\"hero-text\">\r\n          {{ heroText }}\r\n        </p>\r\n\r\n        <div\r\n          *ngIf=\"editMode\"\r\n          class=\"mt-5 rounded-[1.5rem] border border-red-200 bg-red-50/85 px-4 py-4 text-sm leading-6 text-red-900\"\r\n        >\r\n          Les informations mises \u00E0 jour sont conserv\u00E9es dans le dossier, puis soumises \u00E0 nouveau \u00E0 la validation sanitaire avant republication.\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"hero-metrics\">\r\n        <div class=\"metric-card\">\r\n          <span class=\"metric-value\">Tra\u00E7abilit\u00E9</span>\r\n          <span class=\"metric-label\">\r\n            {{ editMode\r\n              ? \"Le QR code reste attach\u00E9 au dossier existant.\"\r\n              : \"Un identifiant et un QR code sont g\u00E9n\u00E9r\u00E9s d\u00E8s l'enregistrement.\" }}\r\n          </span>\r\n        </div>\r\n        <div class=\"metric-card\">\r\n          <span class=\"metric-value\">Cartographie</span>\r\n          <span class=\"metric-label\">La position du troupeau est visible sur la carte du dossier.</span>\r\n        </div>\r\n        <div class=\"metric-card\">\r\n          <span class=\"metric-value\">ANADER</span>\r\n          <span class=\"metric-label\">\r\n            {{ editMode\r\n              ? \"Apr\u00E8s modification, le dossier repart dans le circuit de contr\u00F4le sanitaire.\"\r\n              : \"Le dossier reste en attente tant que le contr\u00F4le sanitaire n'est pas valid\u00E9.\" }}\r\n          </span>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"grid grid-cols-1 items-start gap-6 xl:grid-cols-[1.7fr_0.9fr]\">\r\n      <form class=\"space-y-6\" [formGroup]=\"form\" (ngSubmit)=\"submit()\">\r\n        <div\r\n          *ngIf=\"loadingAnimal\"\r\n          class=\"rounded-[1.5rem] border border-red-200 bg-white/90 px-4 py-4 text-sm text-red-800 shadow-sm\"\r\n        >\r\n          Chargement du dossier en cours...\r\n        </div>\r\n\r\n        <div class=\"glass-card stepper-shell\">\r\n          <div class=\"section-heading mb-5\">\r\n            <div>\r\n              <p class=\"section-kicker\">Parcours dossier</p>\r\n              <h2>Progression par \u00E9tape</h2>\r\n            </div>\r\n            <span class=\"section-badge\">\u00C9tape {{ currentStepIndex + 1 }} / {{ stepItems.length }}</span>\r\n          </div>\r\n\r\n          <p-steps\r\n            [model]=\"stepItems\"\r\n            [readonly]=\"false\"\r\n            [activeIndex]=\"currentStepIndex\"\r\n            (activeIndexChange)=\"onStepChange($event)\"\r\n            styleClass=\"animal-steps\"\r\n          ></p-steps>\r\n\r\n          <div class=\"stepper-caption\">\r\n            <div>\r\n              <p class=\"stepper-caption__eyebrow\">{{ currentStepLabel }}</p>\r\n              <strong>{{ currentStepDescription }}</strong>\r\n            </div>\r\n            <span>{{ editMode ? 'Les modifications restent enregistr\u00E9es au fur et \u00E0 mesure dans votre formulaire.' : 'Vous pouvez avancer \u00E9tape par \u00E9tape avant l\u2019enregistrement final.' }}</span>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"glass-card step-panel\" [class.step-panel--active]=\"currentStepIndex === 0\" [attr.aria-hidden]=\"currentStepIndex !== 0\">\r\n          <div class=\"section-heading\">\r\n            <div>\r\n              <p class=\"section-kicker\">1. Identit\u00E9 du b\u00E9tail</p>\r\n              <h2>D\u00E9crire l'animal ou le lot</h2>\r\n            </div>\r\n            <span class=\"section-badge\">{{ selectedAnimalType?.label }}</span>\r\n          </div>\r\n\r\n          <div class=\"grid grid-cols-1 gap-4 md:grid-cols-2\">\r\n            <div class=\"md:col-span-2\">\r\n              <label class=\"form-label\" for=\"type\">Esp\u00E8ce</label>\r\n              <div class=\"type-grid\">\r\n                <button\r\n                  *ngFor=\"let animalType of animalTypes\"\r\n                  type=\"button\"\r\n                  class=\"type-tile\"\r\n                  [class.type-tile--active]=\"form.get('type')?.value === animalType.value\"\r\n                  (click)=\"form.patchValue({ type: animalType.value })\"\r\n                >\r\n                  <span class=\"type-title\">{{ animalType.label }}</span>\r\n                  <span class=\"type-hint\">{{ animalType.hint }}</span>\r\n                </button>\r\n              </div>\r\n            </div>\r\n\r\n            <div>\r\n              <label class=\"form-label\" for=\"race\">Race</label>\r\n              <input id=\"race\" formControlName=\"race\" type=\"text\" class=\"form-input\" placeholder=\"Ex. : N'Dama\" />\r\n            </div>\r\n\r\n            <div>\r\n              <label class=\"form-label\" for=\"lieuNaissance\">Lieu d'origine</label>\r\n              <input\r\n                id=\"lieuNaissance\"\r\n                formControlName=\"lieuNaissance\"\r\n                type=\"text\"\r\n                class=\"form-input\"\r\n                placeholder=\"Korhogo, Bouak\u00E9, Abidjan...\"\r\n              />\r\n              <p *ngIf=\"controlInvalid('lieuNaissance', 'required')\" class=\"form-error\">\r\n                Le lieu d'origine est requis.\r\n              </p>\r\n            </div>\r\n\r\n            <div>\r\n              <label class=\"form-label\" for=\"price\">Prix en FCFA</label>\r\n              <input id=\"price\" formControlName=\"price\" type=\"number\" class=\"form-input\" placeholder=\"825000\" />\r\n              <p *ngIf=\"controlInvalid('price', 'required')\" class=\"form-error\">\r\n                Le prix est requis.\r\n              </p>\r\n              <p *ngIf=\"controlInvalid('price', 'min')\" class=\"form-error\">\r\n                Le prix doit \u00EAtre positif.\r\n              </p>\r\n            </div>\r\n\r\n            <div>\r\n              <label class=\"form-label\" for=\"quantity\">Nombre de t\u00EAtes</label>\r\n              <input id=\"quantity\" formControlName=\"quantity\" type=\"number\" class=\"form-input\" placeholder=\"1\" />\r\n              <p *ngIf=\"controlInvalid('quantity', 'min')\" class=\"form-error\">\r\n                Le nombre de t\u00EAtes doit \u00EAtre au moins de 1.\r\n              </p>\r\n            </div>\r\n          </div>\r\n\r\n          <div *ngIf=\"isGroupedLot\" class=\"lot-banner mt-5\">\r\n            <strong>Mode lot activ\u00E9.</strong>\r\n            Ce dossier porte plusieurs t\u00EAtes sous une m\u00EAme r\u00E9f\u00E9rence de suivi.\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"glass-card step-panel\" [class.step-panel--active]=\"currentStepIndex === 1\" [attr.aria-hidden]=\"currentStepIndex !== 1\">\r\n          <div class=\"section-heading\">\r\n            <div>\r\n              <p class=\"section-kicker\">2. Cartographie</p>\r\n              <h2>Positionner l'animal sur la carte</h2>\r\n            </div>\r\n            <span class=\"section-badge\">Carte terrain</span>\r\n          </div>\r\n\r\n          <div class=\"sig-toolbar\">\r\n            <button\r\n              type=\"button\"\r\n              class=\"sig-action sig-action--solid\"\r\n              (click)=\"useCurrentPosition()\"\r\n              [disabled]=\"geolocating\"\r\n            >\r\n              {{ geolocating ? 'Localisation en cours...' : 'Utiliser ma position' }}\r\n            </button>\r\n            <button type=\"button\" class=\"sig-action\" (click)=\"recenterMap()\">\r\n              Recentrer la carte\r\n            </button>\r\n          </div>\r\n\r\n          <div class=\"sig-layout\">\r\n            <div class=\"sig-panel\">\r\n              <div *ngIf=\"!mapUnavailable; else mapFallback\" #mapHost class=\"sig-map\"></div>\r\n              <ng-template #mapFallback>\r\n                <div class=\"sig-map-empty\">\r\n                  <strong>Carte indisponible</strong>\r\n                  <span>Renseignez les coordonn\u00E9es manuellement pour poursuivre le dossier.</span>\r\n                </div>\r\n              </ng-template>\r\n              <p class=\"sig-caption\">{{ mapStatus }}</p>\r\n            </div>\r\n\r\n            <div class=\"sig-panel sig-panel--stack\">\r\n              <div>\r\n                <label class=\"form-label\" for=\"longitude\">Longitude</label>\r\n                <input\r\n                  id=\"longitude\"\r\n                  formControlName=\"longitude\"\r\n                  type=\"number\"\r\n                  class=\"form-input\"\r\n                  placeholder=\"-5.620000\"\r\n                  (change)=\"onCoordinatesBlur()\"\r\n                />\r\n              </div>\r\n\r\n              <div>\r\n                <label class=\"form-label\" for=\"latitude\">Latitude</label>\r\n                <input\r\n                  id=\"latitude\"\r\n                  formControlName=\"latitude\"\r\n                  type=\"number\"\r\n                  class=\"form-input\"\r\n                  placeholder=\"9.450000\"\r\n                  (change)=\"onCoordinatesBlur()\"\r\n                />\r\n              </div>\r\n\r\n              <div class=\"sig-tip\">\r\n                Cliquez sur la carte pour positionner le troupeau ou saisissez les coordonn\u00E9es si elles sont d\u00E9j\u00E0 connues.\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"glass-card step-panel\" [class.step-panel--active]=\"currentStepIndex === 2\" [attr.aria-hidden]=\"currentStepIndex !== 2\">\r\n          <div class=\"section-heading\">\r\n            <div>\r\n              <p class=\"section-kicker\">3. M\u00E9dias</p>\r\n              <h2>Photos et vid\u00E9os du dossier</h2>\r\n            </div>\r\n            <span class=\"section-badge\">Pi\u00E8ces visuelles</span>\r\n          </div>\r\n\r\n          <div class=\"grid grid-cols-1 gap-4 lg:grid-cols-2\">\r\n            <label class=\"upload-card\">\r\n              <input type=\"file\" accept=\"image/*\" multiple hidden (change)=\"onFileSelection($event, 'photos')\" />\r\n              <span class=\"upload-title\">Ajouter des photos</span>\r\n              <span class=\"upload-subtitle\">Vue de l'animal, gabarit, environnement d'\u00E9levage</span>\r\n              <span class=\"upload-meta\">{{ uploadedPhotos.length }} fichier(s) s\u00E9lectionn\u00E9(s)</span>\r\n            </label>\r\n\r\n            <label class=\"upload-card\">\r\n              <input type=\"file\" accept=\"video/*\" multiple hidden (change)=\"onFileSelection($event, 'videos')\" />\r\n              <span class=\"upload-title\">Ajouter des vid\u00E9os</span>\r\n              <span class=\"upload-subtitle\">Mouvements, marche et \u00E9tat g\u00E9n\u00E9ral</span>\r\n              <span class=\"upload-meta\">{{ uploadedVideos.length }} fichier(s) s\u00E9lectionn\u00E9(s)</span>\r\n            </label>\r\n          </div>\r\n\r\n          <div *ngIf=\"uploadedPhotos.length\" class=\"mt-5\">\r\n            <p class=\"gallery-label\">Photos jointes</p>\r\n            <div class=\"media-gallery-grid\">\r\n              <article *ngFor=\"let photo of uploadedPhotos\" class=\"media-thumb\">\r\n                <button\r\n                  type=\"button\"\r\n                  class=\"media-preview-trigger\"\r\n                  (click)=\"openImagePreview(photo)\"\r\n                  [attr.aria-label]=\"'Agrandir ' + photo.originalName\"\r\n                >\r\n                  <img [src]=\"previewUrl(photo)\" [alt]=\"photo.originalName\" />\r\n                </button>\r\n                <div class=\"media-thumb-meta\">\r\n                  <strong>{{ photo.originalName }}</strong>\r\n                  <span>{{ imageStatusLabel(photo) }}</span>\r\n                </div>\r\n                <button type=\"button\" class=\"remove-chip\" (click)=\"removePhoto(photo)\">Retirer</button>\r\n              </article>\r\n            </div>\r\n          </div>\r\n\r\n          <div *ngIf=\"uploadedVideos.length\" class=\"mt-5\">\r\n            <p class=\"gallery-label\">Vid\u00E9os jointes</p>\r\n            <div class=\"file-chip-wrap\">\r\n              <div *ngFor=\"let video of uploadedVideos\" class=\"file-chip\">\r\n                <div>\r\n                  <strong>{{ video.originalName }}</strong>\r\n                  <span>\r\n                    {{ video.size > 0 ? ((video.size / 1024 / 1024) | number: '1.1-1') + ' Mo' : 'Vid\u00E9o d\u00E9j\u00E0 enregistr\u00E9e' }}\r\n                  </span>\r\n                </div>\r\n                <button type=\"button\" (click)=\"removeVideo(video)\">Supprimer</button>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"glass-card step-panel\" [class.step-panel--active]=\"currentStepIndex === 3\" [attr.aria-hidden]=\"currentStepIndex !== 3\">\n          <div class=\"section-heading\">\n            <div>\n              <p class=\"section-kicker\">4. Pi\u00E8ces sanitaires</p>\n              <h2>Documents disponibles pour le contr\u00F4le</h2>\n            </div>\n            <div class=\"section-actions\">\n              <button type=\"button\" class=\"section-link\" (click)=\"openDocumentsGuide()\">\n                Pi\u00E8ces \u00E0 fournir\n              </button>\n              <span class=\"section-badge\">Dossier sanitaire</span>\n            </div>\n          </div>\n\n          <label class=\"upload-card upload-card--wide\">\n            <input type=\"file\" accept=\".pdf,image/*\" multiple hidden (change)=\"onFileSelection($event, 'documents')\" />\n            <span class=\"upload-title\">Ajouter fiches et certificats</span>\n            <span class=\"upload-subtitle\">Vaccination, certificat v\u00E9t\u00E9rinaire, attestation DSV</span>\n            <span class=\"upload-meta\">{{ uploadedDocuments.length }} document(s) s\u00E9lectionn\u00E9(s)</span>\n          </label>\n\n          <div class=\"documents-note\">\n            Joignez ici les pi\u00E8ces sanitaires qui accompagneront le dossier lors du contr\u00F4le et de la v\u00E9rification administrative.\n          </div>\n\r\n          <div *ngIf=\"uploadedDocuments.length\" class=\"space-y-3 mt-5\">\r\n            <div *ngFor=\"let document of uploadedDocuments\" class=\"document-row\">\r\n              <div class=\"document-main\">\r\n                <button\r\n                  *ngIf=\"isImagePreviewable(document.file)\"\r\n                  type=\"button\"\r\n                  class=\"document-preview\"\r\n                  (click)=\"openImagePreview(document.file)\"\r\n                  [attr.aria-label]=\"'Agrandir ' + document.file.originalName\"\r\n                >\r\n                  <img [src]=\"previewUrl(document.file)\" [alt]=\"document.file.originalName\" />\r\n                </button>\r\n\r\n                <div>\r\n                  <strong>{{ document.file.originalName }}</strong>\r\n                  <span>{{ imageStatusLabel(document.file) }}</span>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"document-actions\">\r\n                <select\r\n                  class=\"form-select\"\r\n                  [ngModel]=\"document.documentType\"\r\n                  (ngModelChange)=\"updateDocumentType(document, $event)\"\r\n                  [ngModelOptions]=\"{ standalone: true }\"\r\n                >\r\n                  <option *ngFor=\"let documentType of documentTypes\" [value]=\"documentType.value\">\r\n                    {{ documentType.label }}\r\n                  </option>\r\n                </select>\r\n                <button type=\"button\" class=\"remove-chip remove-chip--flat\" (click)=\"removeDocument(document)\">\r\n                  Retirer\r\n                </button>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"review-strip\">\r\n            <div class=\"review-chip\">\r\n              <span>Photos</span>\r\n              <strong>{{ uploadedPhotos.length }}</strong>\r\n            </div>\r\n            <div class=\"review-chip\">\r\n              <span>Vid\u00E9os</span>\r\n              <strong>{{ uploadedVideos.length }}</strong>\r\n            </div>\r\n            <div class=\"review-chip\">\r\n              <span>Documents</span>\r\n              <strong>{{ uploadedDocuments.length }}</strong>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"step-actions\">\r\n          <button *ngIf=\"!isFirstStep\" type=\"button\" class=\"secondary-cta\" (click)=\"goToPreviousStep()\">\r\n            \u00C9tape pr\u00E9c\u00E9dente\r\n          </button>\r\n\r\n          <div class=\"step-actions__spacer\"></div>\r\n\r\n          <button\r\n            *ngIf=\"!isLastStep\"\r\n            type=\"button\"\r\n            class=\"secondary-cta secondary-cta--accent\"\r\n            (click)=\"goToNextStep()\"\r\n          >\r\n            Continuer\r\n          </button>\r\n\r\n          <button *ngIf=\"isLastStep\" type=\"submit\" class=\"primary-cta\" [disabled]=\"saving || loadingAnimal\">\r\n            {{ submitLabel }}\r\n          </button>\r\n        </div>\r\n      </form>\r\n\r\n      <aside class=\"space-y-6 xl:sticky xl:top-6\">\r\n        <div class=\"glass-card\">\r\n          <p class=\"section-kicker\">\u00C9tape active</p>\r\n          <h2>{{ currentStepLabel }}</h2>\r\n          <p class=\"hero-text m-0\">{{ currentStepDescription }}</p>\r\n        </div>\r\n\r\n        <div class=\"glass-card glass-card--contrast\">\r\n          <p class=\"section-kicker text-white/70\">{{ editMode ? 'R\u00E9vision' : 'R\u00E9sum\u00E9 rapide' }}</p>\r\n          <h2 class=\"text-white\">\r\n            {{ editMode ? 'Ce qui se passe apr\u00E8s la mise \u00E0 jour' : 'Ce que le syst\u00E8me fera automatiquement' }}\r\n          </h2>\r\n\r\n          <div class=\"summary-stack\">\r\n            <div class=\"summary-line\">\r\n              <span class=\"summary-index\">01</span>\r\n              <p>{{ editMode ? \"Conservation de l'identifiant et du QR code existants.\" : \"Attribution d'un identifiant de tra\u00E7abilit\u00E9 et d'un QR code.\" }}</p>\r\n            </div>\r\n            <div class=\"summary-line\">\r\n              <span class=\"summary-index\">02</span>\r\n              <p>Rattachement permanent du dossier \u00E0 votre espace vendeur.</p>\r\n            </div>\r\n            <div class=\"summary-line\">\r\n              <span class=\"summary-index\">03</span>\r\n              <p>{{ editMode ? \"Ajout d'un \u00E9v\u00E9nement de r\u00E9vision dans l'historique de suivi.\" : \"Ajout du premier \u00E9v\u00E9nement de suivi dans l'historique.\" }}</p>\r\n            </div>\r\n            <div class=\"summary-line\">\r\n              <span class=\"summary-index\">04</span>\r\n              <p>Passage en <strong>INDISPONIBLE</strong> jusqu'\u00E0 validation sanitaire.</p>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"glass-card\">\r\n          <p class=\"section-kicker\">Contr\u00F4les</p>\r\n          <h2>V\u00E9rifications du dossier</h2>\r\n\r\n          <ul class=\"check-list\">\r\n            <li [class.check-list--active]=\"!!form.get('type')?.value\">Esp\u00E8ce s\u00E9lectionn\u00E9e</li>\r\n            <li [class.check-list--active]=\"!!form.get('lieuNaissance')?.value\">Lieu d'origine renseign\u00E9</li>\r\n            <li [class.check-list--active]=\"!!form.get('price')?.value\">Prix d\u00E9fini</li>\r\n            <li [class.check-list--active]=\"form.get('latitude')?.value != null && form.get('longitude')?.value != null\">\r\n              G\u00E9olocalisation renseign\u00E9e\r\n            </li>\r\n            <li [class.check-list--active]=\"uploadedPhotos.length > 0\">Au moins une photo ajout\u00E9e</li>\r\n            <li [class.check-list--active]=\"uploadedDocuments.length > 0\">Documents sanitaires joints</li>\r\n          </ul>\r\n        </div>\r\n      </aside>\r\n    </div>\r\n  </div>\r\n</section>\n\n<div *ngIf=\"documentsGuideOpen\" class=\"documents-guide-backdrop\" (click)=\"closeDocumentsGuide()\">\n  <div class=\"documents-guide-modal\" (click)=\"$event.stopPropagation()\">\n    <button type=\"button\" class=\"documents-guide-close\" (click)=\"closeDocumentsGuide()\">\n      Fermer\n    </button>\n\n    <div class=\"documents-guide-header\">\n      <p class=\"section-kicker\">Dossier sanitaire</p>\n      <h2>Pi\u00E8ces \u00E0 pr\u00E9parer pour la v\u00E9rification DSV</h2>\n      <p>\n        Pr\u00E9parez des fichiers lisibles, complets et r\u00E9cents. Une photo nette ou un PDF bien cadr\u00E9 suffit\n        tant que le document peut \u00EAtre relu sans ambigu\u00EFt\u00E9 pendant le contr\u00F4le.\n      </p>\n    </div>\n\n    <div class=\"documents-guide-grid\">\n      <article class=\"documents-guide-card\">\n        <strong>Fiche de vaccination</strong>\n        <span>Document \u00E0 jour avec les dates, cachets et r\u00E9f\u00E9rences du suivi sanitaire.</span>\n      </article>\n\n      <article class=\"documents-guide-card\">\n        <strong>Certificat v\u00E9t\u00E9rinaire</strong>\n        <span>Compte rendu ou certificat r\u00E9cent attestant l\u2019\u00E9tat sanitaire de l\u2019animal ou du lot.</span>\n      </article>\n\n      <article class=\"documents-guide-card\">\n        <strong>Attestation DSV</strong>\n        <span>Pi\u00E8ce administrative d\u00E9j\u00E0 disponible, ou document \u00E9quivalent demand\u00E9 par le service local.</span>\n      </article>\n\n      <article class=\"documents-guide-card\">\n        <strong>Document compl\u00E9mentaire</strong>\n        <span>Tout justificatif exig\u00E9 localement : suivi de traitement, laissez-passer, note technique ou autre pi\u00E8ce utile.</span>\n      </article>\n    </div>\n\n    <div class=\"documents-guide-checklist\">\n      <div class=\"documents-guide-check\">\n        <span>Format conseill\u00E9</span>\n        <strong>PDF, JPG ou PNG</strong>\n      </div>\n      <div class=\"documents-guide-check\">\n        <span>Qualit\u00E9 attendue</span>\n        <strong>Texte lisible, document complet, sans d\u00E9coupe</strong>\n      </div>\n      <div class=\"documents-guide-check\">\n        <span>Bon r\u00E9flexe</span>\n        <strong>Nommer le type de pi\u00E8ce avant l\u2019enregistrement final</strong>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div *ngIf=\"previewedImage\" class=\"image-lightbox\" (click)=\"closeImagePreview()\">\n  <div class=\"image-lightbox__dialog\" (click)=\"$event.stopPropagation()\">\n    <button type=\"button\" class=\"image-lightbox__close\" (click)=\"closeImagePreview()\">Fermer</button>\n    <img\r\n      class=\"image-lightbox__media\"\r\n      [src]=\"previewUrl(previewedImage)\"\r\n      [alt]=\"previewedImage.originalName\"\r\n    />\r\n    <div class=\"image-lightbox__meta\">\r\n      <strong>{{ previewedImage.originalName }}</strong>\r\n      <span>{{ imageStatusLabel(previewedImage) }}</span>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [":host {\r\n  display: block;\r\n}\r\n\r\n.animal-shell {\r\n  min-height: 100%;\r\n  background:\r\n    radial-gradient(circle at top left, rgba(220, 38, 38, 0.14), transparent 32%),\r\n    radial-gradient(circle at top right, rgba(190, 24, 93, 0.12), transparent 28%),\r\n    linear-gradient(180deg, #fff7f7 0%, #fff1f2 48%, #fdf2f8 100%);\r\n}\r\n\r\n.hero-panel,\r\n.glass-card {\r\n  border: 1px solid rgba(136, 19, 55, 0.12);\r\n  background: rgba(255, 250, 250, 0.92);\r\n  backdrop-filter: blur(18px);\r\n  box-shadow: 0 24px 80px rgba(136, 19, 55, 0.08);\r\n}\r\n\r\n.hero-panel {\r\n  border-radius: 32px;\r\n  padding: 2rem;\r\n  display: grid;\r\n  grid-template-columns: minmax(0, 1.35fr) minmax(0, 0.95fr);\r\n  gap: 1.5rem;\r\n}\r\n\r\n.hero-copy h1,\r\n.glass-card h2 {\r\n  margin: 0;\r\n  color: #611a24;\r\n  font-family: \"Trebuchet MS\", \"Segoe UI Variable\", sans-serif;\r\n  font-weight: 700;\r\n  letter-spacing: -0.03em;\r\n}\r\n\r\n.hero-copy h1 {\r\n  font-size: clamp(2rem, 3vw, 3.2rem);\r\n  line-height: 1.02;\r\n}\r\n\r\n.hero-text {\r\n  margin: 1rem 0 0;\r\n  max-width: 62ch;\r\n  color: #7f1d1d;\r\n  line-height: 1.7;\r\n}\r\n\r\n.eyebrow,\r\n.section-kicker {\r\n  margin: 0 0 0.45rem;\r\n  font-size: 0.72rem;\r\n  font-weight: 700;\r\n  letter-spacing: 0.22em;\r\n  text-transform: uppercase;\r\n  color: #be123c;\r\n}\r\n\r\n.hero-metrics {\r\n  display: grid;\r\n  gap: 0.85rem;\r\n}\r\n\r\n.metric-card {\r\n  border-radius: 24px;\r\n  background: linear-gradient(160deg, rgba(255, 228, 230, 0.92), rgba(255, 255, 255, 0.86));\r\n  padding: 1.1rem 1.2rem;\r\n}\r\n\r\n.metric-value {\r\n  display: block;\r\n  color: #9f1239;\r\n  font-size: 1.1rem;\r\n  font-weight: 800;\r\n  letter-spacing: 0.08em;\r\n  text-transform: uppercase;\r\n}\r\n\r\n.metric-label {\r\n  display: block;\r\n  margin-top: 0.35rem;\r\n  color: #7f1d1d;\r\n  line-height: 1.5;\r\n}\r\n\r\n.glass-card {\r\n  border-radius: 28px;\r\n  padding: 1.4rem;\r\n}\r\n\r\n.stepper-shell {\r\n  padding-bottom: 1.2rem;\r\n}\r\n\r\n.stepper-caption {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  gap: 1rem;\r\n  align-items: center;\r\n  margin-top: 1.2rem;\r\n  padding: 1rem 1.1rem;\r\n  border-radius: 22px;\r\n  background: linear-gradient(135deg, rgba(255, 241, 242, 0.98), rgba(255, 255, 255, 0.88));\r\n  color: #7f1d1d;\r\n}\r\n\r\n.stepper-caption__eyebrow {\r\n  margin: 0 0 0.25rem;\r\n  color: #be123c;\r\n  font-size: 0.74rem;\r\n  font-weight: 800;\r\n  letter-spacing: 0.18em;\r\n  text-transform: uppercase;\r\n}\r\n\r\n.stepper-caption strong {\r\n  display: block;\r\n  color: #611a24;\r\n  line-height: 1.5;\r\n}\r\n\r\n.stepper-caption span {\r\n  max-width: 28ch;\r\n  line-height: 1.6;\r\n}\r\n\r\n.step-panel {\r\n  display: none;\r\n}\r\n\r\n.step-panel--active {\r\n  display: block;\r\n}\r\n\r\n.glass-card--contrast {\r\n  background:\r\n    radial-gradient(circle at top left, rgba(251, 113, 133, 0.24), transparent 28%),\r\n    linear-gradient(160deg, #7f1d1d 0%, #be123c 100%);\r\n  color: #fff;\r\n}\r\n\r\n.glass-card--contrast h2,\r\n.glass-card--contrast .section-kicker,\r\n.glass-card--contrast .summary-line p,\r\n.glass-card--contrast .summary-line strong {\r\n  color: #fff;\r\n}\r\n\r\n.section-heading {\n  display: flex;\n  justify-content: space-between;\n  gap: 1rem;\n  align-items: flex-start;\n  margin-bottom: 1.25rem;\n}\n\n.section-actions {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n}\n\n.section-badge {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.4rem 0.8rem;\r\n  border-radius: 999px;\r\n  background: #ffe4e6;\r\n  color: #9f1239;\r\n  font-size: 0.78rem;\n  font-weight: 700;\n}\n\n.section-link {\n  border: 0;\n  border-radius: 999px;\n  padding: 0.65rem 1rem;\n  background: rgba(255, 241, 242, 0.98);\n  color: #9f1239;\n  font-weight: 800;\n  box-shadow: inset 0 0 0 1px rgba(190, 24, 93, 0.12);\n}\n\r\n.form-label,\r\n.gallery-label {\r\n  display: block;\r\n  margin-bottom: 0.55rem;\r\n  color: #7f1d1d;\r\n  font-weight: 700;\r\n  font-size: 0.92rem;\r\n}\r\n\r\n.form-input,\r\n.form-select {\r\n  width: 100%;\r\n  border: 1px solid rgba(190, 24, 93, 0.14);\r\n  border-radius: 18px;\r\n  padding: 0.95rem 1rem;\r\n  background: rgba(255, 255, 255, 0.9);\r\n  color: #4c0519;\r\n  outline: none;\r\n}\r\n\r\n.form-input:focus,\r\n.form-select:focus {\r\n  border-color: #e11d48;\r\n  box-shadow: 0 0 0 4px rgba(225, 29, 72, 0.12);\r\n}\r\n\r\n.form-error {\r\n  margin-top: 0.45rem;\r\n  color: #be123c;\r\n  font-size: 0.82rem;\r\n}\r\n\r\n.type-grid {\r\n  display: grid;\r\n  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));\r\n  gap: 0.8rem;\r\n}\r\n\r\n.type-tile {\r\n  border: 1px solid rgba(190, 24, 93, 0.12);\r\n  border-radius: 22px;\r\n  padding: 1rem;\r\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(255, 241, 242, 0.94));\r\n  text-align: left;\r\n  transition: transform 160ms ease, border-color 160ms ease, box-shadow 160ms ease;\r\n}\r\n\r\n.type-tile:hover,\r\n.type-tile--active {\r\n  transform: translateY(-2px);\r\n  border-color: #e11d48;\r\n  box-shadow: 0 18px 34px rgba(225, 29, 72, 0.12);\r\n}\r\n\r\n.type-title {\r\n  display: block;\r\n  color: #611a24;\r\n  font-weight: 700;\r\n}\r\n\r\n.type-hint {\r\n  display: block;\r\n  margin-top: 0.35rem;\r\n  color: #881337;\r\n  line-height: 1.45;\r\n  font-size: 0.88rem;\r\n}\r\n\r\n.lot-banner {\r\n  border-radius: 20px;\r\n  padding: 0.95rem 1rem;\r\n  background: rgba(244, 63, 94, 0.1);\r\n  color: #9f1239;\r\n  line-height: 1.55;\r\n}\r\n\r\n.review-strip {\r\n  display: grid;\r\n  grid-template-columns: repeat(3, minmax(0, 1fr));\r\n  gap: 0.85rem;\r\n  margin-top: 1.35rem;\r\n}\r\n\r\n.review-chip {\r\n  padding: 0.95rem 1rem;\r\n  border-radius: 20px;\r\n  background: rgba(255, 241, 242, 0.86);\r\n}\r\n\r\n.review-chip span {\r\n  display: block;\r\n  color: #9f1239;\r\n  font-size: 0.78rem;\r\n  font-weight: 700;\r\n  text-transform: uppercase;\r\n  letter-spacing: 0.08em;\r\n}\r\n\r\n.review-chip strong {\r\n  display: block;\r\n  margin-top: 0.35rem;\r\n  color: #611a24;\r\n  font-size: 1.2rem;\r\n}\r\n\r\n.upload-card {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 0.35rem;\r\n  min-height: 170px;\r\n  justify-content: center;\r\n  padding: 1.1rem 1.2rem;\r\n  border-radius: 24px;\r\n  border: 1px dashed rgba(225, 29, 72, 0.26);\r\n  background:\r\n    linear-gradient(135deg, rgba(255, 241, 242, 0.96), rgba(255, 255, 255, 0.88)),\r\n    repeating-linear-gradient(-45deg, rgba(251, 113, 133, 0.1), rgba(251, 113, 133, 0.1) 10px, transparent 10px, transparent 20px);\r\n  cursor: pointer;\r\n}\r\n\r\n.upload-card--wide {\r\n  min-height: 0;\r\n}\r\n\r\n.upload-title {\n  font-weight: 800;\n  color: #611a24;\n}\n\n.documents-note {\n  margin-top: 1rem;\n  padding: 0.95rem 1rem;\n  border-radius: 20px;\n  background: rgba(255, 241, 242, 0.86);\n  color: #7f1d1d;\n  line-height: 1.6;\n}\n\r\n.upload-subtitle,\r\n.upload-meta {\r\n  color: #881337;\r\n  line-height: 1.5;\r\n}\r\n\r\n.media-thumb {\r\n  position: relative;\r\n  overflow: hidden;\r\n  border-radius: 22px;\r\n  min-height: 160px;\r\n  background: #ffe4e6;\r\n}\r\n\r\n.media-gallery-grid {\r\n  display: grid;\r\n  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));\r\n  gap: 0.85rem;\r\n}\r\n\r\n.media-preview-trigger {\r\n  display: block;\r\n  width: 100%;\r\n  height: 100%;\r\n  min-height: 190px;\r\n  border: 0;\r\n  padding: 0;\r\n  cursor: pointer;\r\n  background: transparent;\r\n}\r\n\r\n.media-thumb img,\r\n.document-preview img {\r\n  width: 100%;\r\n  height: 100%;\r\n  object-fit: cover;\r\n}\r\n\r\n.media-thumb-meta {\r\n  position: absolute;\r\n  left: 0.75rem;\r\n  right: 4.8rem;\r\n  bottom: 0.75rem;\r\n  display: grid;\r\n  gap: 0.15rem;\r\n  padding: 0.75rem 0.85rem;\r\n  border-radius: 18px;\r\n  background: linear-gradient(180deg, rgba(76, 5, 25, 0.1), rgba(76, 5, 25, 0.86));\r\n  color: #fff;\r\n  pointer-events: none;\r\n}\r\n\r\n.media-thumb-meta strong {\r\n  font-size: 0.88rem;\r\n}\r\n\r\n.media-thumb-meta span {\r\n  font-size: 0.74rem;\r\n  color: rgba(255, 255, 255, 0.86);\r\n}\r\n\r\n.remove-chip {\r\n  position: absolute;\r\n  right: 0.65rem;\r\n  bottom: 0.65rem;\r\n  border: 0;\r\n  border-radius: 999px;\r\n  background: rgba(136, 19, 55, 0.9);\r\n  color: #fff;\r\n  padding: 0.45rem 0.8rem;\r\n  font-size: 0.78rem;\r\n}\r\n\r\n.remove-chip--flat {\r\n  position: static;\r\n  background: #ffe4e6;\r\n  color: #9f1239;\r\n}\r\n\r\n.file-chip-wrap {\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n  gap: 0.75rem;\r\n}\r\n\r\n.file-chip,\r\n.document-row {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  gap: 1rem;\r\n  padding: 0.9rem 1rem;\r\n  border-radius: 20px;\r\n  background: rgba(255, 241, 242, 0.86);\r\n}\r\n\r\n.file-chip strong,\r\n.document-row strong {\r\n  display: block;\r\n  color: #611a24;\r\n}\r\n\r\n.file-chip span,\r\n.document-row span {\r\n  color: #881337;\r\n  font-size: 0.86rem;\r\n}\r\n\r\n.document-actions {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 0.75rem;\r\n  min-width: 280px;\r\n}\r\n\r\n.document-main {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 0.9rem;\r\n  min-width: 0;\r\n}\r\n\r\n.document-preview {\n  width: 72px;\n  min-width: 72px;\n  height: 72px;\r\n  overflow: hidden;\r\n  border: 0;\r\n  border-radius: 18px;\r\n  padding: 0;\r\n  cursor: pointer;\r\n  background: #fecdd3;\r\n  box-shadow: inset 0 0 0 1px rgba(190, 24, 93, 0.16);\n}\n\n.documents-guide-backdrop {\n  position: fixed;\n  inset: 0;\n  z-index: 85;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 1rem;\n  background: rgba(76, 5, 25, 0.66);\n  backdrop-filter: blur(10px);\n}\n\n.documents-guide-modal {\n  width: min(100%, 980px);\n  max-height: calc(100vh - 2rem);\n  overflow: auto;\n  border-radius: 32px;\n  padding: 1.35rem;\n  background:\n    radial-gradient(circle at top right, rgba(251, 113, 133, 0.16), transparent 24%),\n    linear-gradient(180deg, #fffafb 0%, #fff1f2 100%);\n  box-shadow: 0 36px 80px rgba(76, 5, 25, 0.32);\n}\n\n.documents-guide-close {\n  display: inline-flex;\n  margin-left: auto;\n  border: 0;\n  border-radius: 999px;\n  padding: 0.75rem 1rem;\n  background: #881337;\n  color: #fff;\n  font-weight: 700;\n}\n\n.documents-guide-header {\n  margin-top: 0.9rem;\n}\n\n.documents-guide-header p:last-child {\n  margin: 0.85rem 0 0;\n  color: #7f1d1d;\n  line-height: 1.7;\n}\n\n.documents-guide-grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0.95rem;\n  margin-top: 1.2rem;\n}\n\n.documents-guide-card {\n  display: grid;\n  gap: 0.35rem;\n  padding: 1rem 1.05rem;\n  border-radius: 22px;\n  background: rgba(255, 255, 255, 0.9);\n  box-shadow: inset 0 0 0 1px rgba(190, 24, 93, 0.1);\n}\n\n.documents-guide-card strong {\n  color: #611a24;\n}\n\n.documents-guide-card span {\n  color: #7f1d1d;\n  line-height: 1.55;\n}\n\n.documents-guide-checklist {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 0.85rem;\n  margin-top: 1.1rem;\n}\n\n.documents-guide-check {\n  padding: 0.95rem 1rem;\n  border-radius: 20px;\n  background: rgba(255, 241, 242, 0.86);\n}\n\n.documents-guide-check span {\n  display: block;\n  color: #9f1239;\n  font-size: 0.76rem;\n  font-weight: 700;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n\n.documents-guide-check strong {\n  display: block;\n  margin-top: 0.35rem;\n  color: #611a24;\n  line-height: 1.5;\n}\n\n.image-lightbox {\n  position: fixed;\n  inset: 0;\r\n  z-index: 80;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  padding: 1rem;\r\n  background: rgba(76, 5, 25, 0.72);\r\n  backdrop-filter: blur(10px);\r\n}\r\n\r\n.image-lightbox__dialog {\r\n  width: min(100%, 920px);\r\n  max-height: calc(100vh - 2rem);\r\n  overflow: auto;\r\n  border-radius: 30px;\r\n  padding: 1rem;\r\n  background: linear-gradient(180deg, #fffafb 0%, #fff1f2 100%);\r\n  box-shadow: 0 32px 80px rgba(76, 5, 25, 0.34);\r\n}\r\n\r\n.image-lightbox__close {\r\n  display: inline-flex;\r\n  margin-left: auto;\r\n  border: 0;\r\n  border-radius: 999px;\r\n  padding: 0.75rem 1rem;\r\n  background: #881337;\r\n  color: #fff;\r\n  font-weight: 700;\r\n}\r\n\r\n.image-lightbox__media {\r\n  width: 100%;\r\n  max-height: 72vh;\r\n  margin-top: 0.85rem;\r\n  border-radius: 22px;\r\n  object-fit: contain;\r\n  background: #fff;\r\n}\r\n\r\n.image-lightbox__meta {\r\n  display: grid;\r\n  gap: 0.2rem;\r\n  margin-top: 0.9rem;\r\n  color: #611a24;\r\n}\r\n\r\n.image-lightbox__meta span {\r\n  color: #881337;\r\n}\r\n\r\n.primary-cta {\r\n  border: 0;\r\n  border-radius: 999px;\r\n  padding: 0.95rem 1.45rem;\r\n  background: linear-gradient(135deg, #be123c 0%, #e11d48 100%);\r\n  color: #fff;\r\n  font-weight: 800;\r\n  letter-spacing: 0.01em;\r\n  box-shadow: 0 16px 36px rgba(190, 24, 93, 0.24);\r\n}\r\n\r\n.primary-cta:disabled {\r\n  opacity: 0.65;\r\n  cursor: not-allowed;\r\n}\r\n\r\n.step-actions {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 0.9rem;\r\n  flex-wrap: wrap;\r\n}\r\n\r\n.step-actions__spacer {\r\n  flex: 1 1 auto;\r\n}\r\n\r\n.secondary-cta {\r\n  border: 1px solid rgba(190, 24, 93, 0.16);\r\n  border-radius: 999px;\r\n  padding: 0.95rem 1.3rem;\r\n  background: rgba(255, 255, 255, 0.94);\r\n  color: #9f1239;\r\n  font-weight: 800;\r\n}\r\n\r\n.secondary-cta--accent {\r\n  background: linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%);\r\n}\r\n\r\n.summary-stack {\r\n  display: grid;\r\n  gap: 0.9rem;\r\n  margin-top: 1.2rem;\r\n}\r\n\r\n.summary-line {\r\n  display: grid;\r\n  grid-template-columns: auto 1fr;\r\n  gap: 0.75rem;\r\n  align-items: start;\r\n}\r\n\r\n.summary-line p {\r\n  margin: 0;\r\n  line-height: 1.6;\r\n}\r\n\r\n.summary-index {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  width: 34px;\r\n  height: 34px;\r\n  border-radius: 12px;\r\n  background: rgba(255, 255, 255, 0.16);\r\n  font-weight: 800;\r\n}\r\n\r\n.check-list {\r\n  margin: 1rem 0 0;\r\n  padding: 0;\r\n  list-style: none;\r\n  display: grid;\r\n  gap: 0.75rem;\r\n}\r\n\r\n.check-list li {\r\n  border-radius: 16px;\r\n  padding: 0.85rem 0.95rem;\r\n  background: rgba(255, 241, 242, 0.86);\r\n  color: #881337;\r\n  font-weight: 600;\r\n}\r\n\r\n.check-list--active {\r\n  background: rgba(254, 242, 242, 0.98) !important;\r\n  color: #991b1b !important;\r\n  box-shadow: inset 0 0 0 1px rgba(239, 68, 68, 0.16);\r\n}\r\n\r\n::ng-deep .animal-steps .p-steps-list {\r\n  display: grid;\r\n  grid-template-columns: repeat(4, minmax(0, 1fr));\r\n  gap: 0.75rem;\r\n}\r\n\r\n::ng-deep .animal-steps .p-steps-item {\r\n  min-width: 0;\r\n}\r\n\r\n::ng-deep .animal-steps .p-steps-item-link {\r\n  flex-direction: column;\r\n  align-items: flex-start;\r\n  gap: 0.55rem;\r\n  padding: 1rem;\r\n  border-radius: 22px;\r\n  background: rgba(255, 255, 255, 0.88);\r\n  border: 1px solid rgba(190, 24, 93, 0.12);\r\n  box-shadow: 0 14px 28px rgba(136, 19, 55, 0.06);\r\n}\r\n\r\n::ng-deep .animal-steps .p-steps-item-number {\r\n  width: 38px;\r\n  height: 38px;\r\n  border-radius: 14px;\r\n  background: #ffe4e6;\r\n  color: #9f1239;\r\n  font-weight: 800;\r\n}\r\n\r\n::ng-deep .animal-steps .p-steps-item-label {\r\n  color: #611a24;\r\n  font-weight: 800;\r\n}\r\n\r\n::ng-deep .animal-steps .p-steps-item-active .p-steps-item-link {\r\n  background: linear-gradient(135deg, rgba(190, 24, 93, 0.92), rgba(225, 29, 72, 0.94));\r\n  border-color: transparent;\r\n  box-shadow: 0 18px 36px rgba(190, 24, 93, 0.22);\r\n}\r\n\r\n::ng-deep .animal-steps .p-steps-item-active .p-steps-item-number {\r\n  background: rgba(255, 255, 255, 0.16);\r\n  color: #fff;\r\n}\r\n\r\n::ng-deep .animal-steps .p-steps-item-active .p-steps-item-label {\r\n  color: #fff;\r\n}\r\n\r\n@media (max-width: 1279px) {\r\n  .hero-panel {\r\n    grid-template-columns: 1fr;\r\n  }\r\n}\r\n\r\n@media (max-width: 1100px) {\r\n  .review-strip,\r\n  ::ng-deep .animal-steps .p-steps-list {\r\n    grid-template-columns: repeat(2, minmax(0, 1fr));\r\n  }\r\n}\r\n\r\n@media (max-width: 767px) {\r\n  .hero-panel,\r\n  .glass-card {\r\n    border-radius: 24px;\r\n    padding: 1.15rem;\r\n  }\r\n\r\n  .stepper-caption,\n  .step-actions {\n    flex-direction: column;\n    align-items: stretch;\n  }\n\n  .section-actions {\n    justify-content: stretch;\n  }\n\n  .stepper-caption span {\n    max-width: none;\n  }\n\r\n  .document-row,\r\n  .file-chip {\r\n    flex-direction: column;\r\n    align-items: stretch;\r\n  }\r\n\r\n  .document-main {\r\n    align-items: stretch;\r\n  }\r\n\r\n  .document-preview {\r\n    width: 100%;\r\n    min-width: 0;\r\n    height: 180px;\r\n  }\r\n\r\n  .document-actions {\r\n    min-width: 0;\r\n    flex-direction: column;\r\n    align-items: stretch;\r\n  }\r\n\r\n  .review-strip,\n  ::ng-deep .animal-steps .p-steps-list {\n    grid-template-columns: 1fr;\n  }\n\n  .documents-guide-grid,\n  .documents-guide-checklist {\n    grid-template-columns: 1fr;\n  }\n\n  .secondary-cta,\n  .primary-cta,\n  .section-link {\n    width: 100%;\n  }\n}\n"] }]
    }], () => [{ type: i1.FormBuilder }, { type: i2.ActivatedRoute }, { type: i2.Router }, { type: i3.AuthService }, { type: i4.AnimalService }, { type: i5.ToastService }, { type: i0.NgZone }, { type: Document, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }], { mapHost: [{
            type: ViewChild,
            args: ['mapHost']
        }], onEscape: [{
            type: HostListener,
            args: ['document:keydown.escape']
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CreerAnimalComponent, { className: "CreerAnimalComponent", filePath: "src/app/features/animaux/creer-animal/creer-animal.component.ts", lineNumber: 47 }); })();
//# sourceMappingURL=creer-animal.component.js.map