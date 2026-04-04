import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "../services/animal.service";
import * as i2 from "@angular/forms";
import * as i3 from "../../../core/services/toast.service";
import * as i4 from "@angular/common";
function ValidationSanitaireComponent_ng_container_18_div_1_button_8_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 16);
    i0.ɵɵlistener("click", function ValidationSanitaireComponent_ng_container_18_div_1_button_8_Template_button_click_0_listener() { const animal_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.selectAnimal(animal_r2)); });
    i0.ɵɵelementStart(1, "div")(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "span", 17);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const animal_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("queue-item--active", animal_r2.id === (ctx_r2.selectedAnimal == null ? null : ctx_r2.selectedAnimal.id));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(animal_r2.displayName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(animal_r2.lieuNaissance || "Localisation non renseign\u00E9e");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", animal_r2.quantity, " t\u00EAte(s)");
} }
function ValidationSanitaireComponent_ng_container_18_div_1_section_9_div_32_label_1_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 50)(1, "input", 51);
    i0.ɵɵlistener("change", function ValidationSanitaireComponent_ng_container_18_div_1_section_9_div_32_label_1_Template_input_change_1_listener() { const record_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r2 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r2.form.patchValue({ healthRecordId: record_r6.id })); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "div")(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span");
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "date");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    let tmp_9_0;
    const record_r6 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(5);
    i0.ɵɵadvance();
    i0.ɵɵproperty("checked", ((tmp_9_0 = ctx_r2.form.get("healthRecordId")) == null ? null : tmp_9_0.value) === record_r6.id);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", record_r6.documentType, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", record_r6.validationStatus, " | ", i0.ɵɵpipeBind2(7, 4, record_r6.uploadedAt, "dd/MM/yyyy HH:mm"));
} }
function ValidationSanitaireComponent_ng_container_18_div_1_section_9_div_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 48);
    i0.ɵɵtemplate(1, ValidationSanitaireComponent_ng_container_18_div_1_section_9_div_32_label_1_Template, 8, 7, "label", 49);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.recordOptions);
} }
function ValidationSanitaireComponent_ng_container_18_div_1_section_9_ng_template_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 52);
    i0.ɵɵtext(1, "Aucune fiche existante. Un document doit \u00EAtre t\u00E9l\u00E9vers\u00E9.");
    i0.ɵɵelementEnd();
} }
function ValidationSanitaireComponent_ng_container_18_div_1_section_9_div_42_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 53)(1, "div")(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "a", 54);
    i0.ɵɵtext(5, "Ouvrir le document");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "button", 55);
    i0.ɵɵlistener("click", function ValidationSanitaireComponent_ng_container_18_div_1_section_9_div_42_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r7); const ctx_r2 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r2.removeUploadedDocument()); });
    i0.ɵɵtext(7, "Retirer");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r2.uploadedDocument.originalName);
    i0.ɵɵadvance();
    i0.ɵɵproperty("href", ctx_r2.previewDocumentUrl(), i0.ɵɵsanitizeUrl);
} }
function ValidationSanitaireComponent_ng_container_18_div_1_section_9_option_49_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 56);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const status_r8 = ctx.$implicit;
    i0.ɵɵproperty("value", status_r8.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", status_r8.label, " ");
} }
function ValidationSanitaireComponent_ng_container_18_div_1_section_9_option_54_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 56);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const documentType_r9 = ctx.$implicit;
    i0.ɵɵproperty("value", documentType_r9.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", documentType_r9.label, " ");
} }
function ValidationSanitaireComponent_ng_container_18_div_1_section_9_p_59_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 57);
    i0.ɵɵtext(1, " Le compte rendu est requis. ");
    i0.ɵɵelementEnd();
} }
function ValidationSanitaireComponent_ng_container_18_div_1_section_9_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 18)(1, "div", 19)(2, "div")(3, "p", 6);
    i0.ɵɵtext(4, "Fiche s\u00E9lectionn\u00E9e");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "h2");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 20);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "span", 21);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 22)(12, "article", 23)(13, "span", 24);
    i0.ɵɵtext(14, "Documents sanitaires");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "strong");
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "article", 23)(18, "span", 24);
    i0.ɵɵtext(19, "Coordonn\u00E9es");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "strong");
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "article", 23)(23, "span", 24);
    i0.ɵɵtext(24, "Prix");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "strong");
    i0.ɵɵtext(26);
    i0.ɵɵpipe(27, "number");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(28, "div", 25)(29, "div", 26)(30, "h3");
    i0.ɵɵtext(31, "Fiches d\u00E9j\u00E0 charg\u00E9es");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(32, ValidationSanitaireComponent_ng_container_18_div_1_section_9_div_32_Template, 2, 1, "div", 27)(33, ValidationSanitaireComponent_ng_container_18_div_1_section_9_ng_template_33_Template, 2, 0, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "div", 26)(36, "h3");
    i0.ɵɵtext(37, "T\u00E9l\u00E9verser un nouveau document");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "label", 28)(39, "input", 29);
    i0.ɵɵlistener("change", function ValidationSanitaireComponent_ng_container_18_div_1_section_9_Template_input_change_39_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.uploadDocument($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "span");
    i0.ɵɵtext(41, "Ajouter un certificat ou une fiche de visite");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(42, ValidationSanitaireComponent_ng_container_18_div_1_section_9_div_42_Template, 8, 2, "div", 30);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(43, "form", 31);
    i0.ɵɵlistener("ngSubmit", function ValidationSanitaireComponent_ng_container_18_div_1_section_9_Template_form_ngSubmit_43_listener() { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.submit()); });
    i0.ɵɵelementStart(44, "div", 32)(45, "div")(46, "label", 33);
    i0.ɵɵtext(47, "D\u00E9cision");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(48, "select", 34);
    i0.ɵɵtemplate(49, ValidationSanitaireComponent_ng_container_18_div_1_section_9_option_49_Template, 2, 2, "option", 35);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(50, "div")(51, "label", 36);
    i0.ɵɵtext(52, "Type de document si nouveau");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(53, "select", 37);
    i0.ɵɵtemplate(54, ValidationSanitaireComponent_ng_container_18_div_1_section_9_option_54_Template, 2, 2, "option", 35);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(55, "div", 38)(56, "label", 39);
    i0.ɵɵtext(57, "Compte rendu de visite");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(58, "textarea", 40);
    i0.ɵɵtemplate(59, ValidationSanitaireComponent_ng_container_18_div_1_section_9_p_59_Template, 2, 0, "p", 41);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(60, "div")(61, "label", 42);
    i0.ɵɵtext(62, "Latitude de visite");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(63, "input", 43);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(64, "div")(65, "label", 44);
    i0.ɵɵtext(66, "Longitude de visite");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(67, "input", 45);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(68, "div", 46)(69, "button", 47);
    i0.ɵɵtext(70);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    let tmp_18_0;
    const noRecord_r10 = i0.ɵɵreference(34);
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r2.selectedAnimal.displayName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" QR ", ctx_r2.selectedAnimal.qrCode, " | Vendeur ", ctx_r2.selectedAnimal.sellerName, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.selectedAnimal.status);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r2.selectedAnimal.healthRecords.length);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate2("", ctx_r2.selectedAnimal.latitude || "-", ", ", ctx_r2.selectedAnimal.longitude || "-");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(27, 17, ctx_r2.selectedAnimal.price, "1.0-0"), " FCFA");
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngIf", ctx_r2.recordOptions.length)("ngIfElse", noRecord_r10);
    i0.ɵɵadvance(10);
    i0.ɵɵproperty("ngIf", ctx_r2.uploadedDocument);
    i0.ɵɵadvance();
    i0.ɵɵproperty("formGroup", ctx_r2.form);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngForOf", ctx_r2.validationStatuses);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngForOf", ctx_r2.documentTypes);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngIf", ctx_r2.submitted && ((tmp_18_0 = ctx_r2.form.get("visitResult")) == null ? null : tmp_18_0.invalid));
    i0.ɵɵadvance(10);
    i0.ɵɵproperty("disabled", ctx_r2.submitting);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r2.submitting ? "Validation..." : "Valider la visite", " ");
} }
function ValidationSanitaireComponent_ng_container_18_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10)(1, "aside", 11)(2, "div", 12)(3, "h2");
    i0.ɵɵtext(4, "File d'inspection");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "Les animaux restent indisponibles tant que la visite n'est pas valid\u00E9e.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 13);
    i0.ɵɵtemplate(8, ValidationSanitaireComponent_ng_container_18_div_1_button_8_Template, 8, 5, "button", 14);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(9, ValidationSanitaireComponent_ng_container_18_div_1_section_9_Template, 71, 20, "section", 15);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("ngForOf", ctx_r2.animals);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.selectedAnimal);
} }
function ValidationSanitaireComponent_ng_container_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, ValidationSanitaireComponent_ng_container_18_div_1_Template, 10, 2, "div", 9);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    const emptyState_r11 = i0.ɵɵreference(22);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.animals.length)("ngIfElse", emptyState_r11);
} }
function ValidationSanitaireComponent_ng_template_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 58);
    i0.ɵɵtext(1, " Chargement de la file de validation sanitaire... ");
    i0.ɵɵelementEnd();
} }
function ValidationSanitaireComponent_ng_template_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 58)(1, "h2");
    i0.ɵɵtext(2, "Aucun animal n'attend de validation sanitaire");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4, "Le traitement ANADER est \u00E0 jour pour le moment.");
    i0.ɵɵelementEnd()();
} }
export class ValidationSanitaireComponent {
    constructor(animalService, fb, toast) {
        this.animalService = animalService;
        this.fb = fb;
        this.toast = toast;
        this.animals = [];
        this.loading = true;
        this.submitting = false;
        this.submitted = false;
        this.validationStatuses = [
            { value: 'VALIDE', label: 'Valider la fiche' },
            { value: 'REJETE', label: 'Rejeter la fiche' },
        ];
        this.documentTypes = [
            { value: 'CERTIFICAT_VETERINAIRE', label: 'Certificat vétérinaire' },
            { value: 'FICHE_VACCINATION', label: 'Fiche de vaccination' },
            { value: 'ATTESTATION_DSV', label: 'Attestation DSV' },
            { value: 'AUTRE', label: 'Autre document' },
        ];
        this.form = this.fb.group({
            healthRecordId: [''],
            documentType: ['CERTIFICAT_VETERINAIRE'],
            validationStatus: ['VALIDE', Validators.required],
            visitResult: ['', Validators.required],
            longitude: [null],
            latitude: [null],
        });
    }
    ngOnInit() {
        this.reload();
    }
    get recordOptions() {
        return this.selectedAnimal?.healthRecords ?? [];
    }
    selectAnimal(animal) {
        this.selectedAnimal = animal;
        this.uploadedDocument = undefined;
        this.form.reset({
            healthRecordId: animal.healthRecords[0]?.id ?? '',
            documentType: 'CERTIFICAT_VETERINAIRE',
            validationStatus: 'VALIDE',
            visitResult: '',
            longitude: animal.longitude ?? null,
            latitude: animal.latitude ?? null,
        });
        this.submitted = false;
    }
    uploadDocument(event) {
        const input = event.target;
        const file = input.files?.[0];
        if (!file) {
            return;
        }
        this.animalService.upload(file, 'SANITARY_DOCUMENT').subscribe({
            next: (storedFile) => {
                this.uploadedDocument = storedFile;
                this.form.patchValue({ healthRecordId: '' });
            },
        });
        input.value = '';
    }
    removeUploadedDocument() {
        this.uploadedDocument = undefined;
    }
    previewDocumentUrl() {
        return this.uploadedDocument
            ? this.animalService.resolveAssetUrl(this.uploadedDocument.url)
            : '';
    }
    submit() {
        this.submitted = true;
        if (!this.selectedAnimal || this.form.invalid) {
            return;
        }
        const raw = this.form.getRawValue();
        if (!raw.healthRecordId && !this.uploadedDocument) {
            this.toast.error('Sélectionnez une fiche existante ou téléversez un nouveau document.');
            return;
        }
        const payload = {
            healthRecordId: raw.healthRecordId || null,
            documentUrl: raw.healthRecordId ? null : this.uploadedDocument?.url ?? null,
            documentType: raw.healthRecordId ? null : raw.documentType,
            validationStatus: raw.validationStatus,
            visitResult: raw.visitResult ?? '',
            longitude: raw.longitude != null ? Number(raw.longitude) : null,
            latitude: raw.latitude != null ? Number(raw.latitude) : null,
        };
        this.submitting = true;
        this.animalService.validate(this.selectedAnimal.id, payload).subscribe({
            next: (animal) => {
                this.toast.success('Validation sanitaire enregistrée.');
                this.integrateAnimalUpdate(animal);
            },
            error: () => {
                this.submitting = false;
            },
            complete: () => {
                this.submitting = false;
            },
        });
    }
    reload() {
        this.animalService.pendingValidations().subscribe({
            next: (animals) => {
                this.animals = animals;
                this.selectedAnimal = animals[0];
                if (this.selectedAnimal) {
                    this.selectAnimal(this.selectedAnimal);
                }
                this.loading = false;
            },
            error: () => {
                this.loading = false;
            },
        });
    }
    integrateAnimalUpdate(animal) {
        if (animal.status === 'DISPONIBLE') {
            this.animals = this.animals.filter((item) => item.id !== animal.id);
            this.selectedAnimal = this.animals[0];
            if (this.selectedAnimal) {
                this.selectAnimal(this.selectedAnimal);
            }
            else {
                this.form.reset({
                    healthRecordId: '',
                    documentType: 'CERTIFICAT_VETERINAIRE',
                    validationStatus: 'VALIDE',
                    visitResult: '',
                    longitude: null,
                    latitude: null,
                });
            }
            return;
        }
        this.animals = this.animals.map((item) => (item.id === animal.id ? animal : item));
        this.selectAnimal(animal);
    }
    static { this.ɵfac = function ValidationSanitaireComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ValidationSanitaireComponent)(i0.ɵɵdirectiveInject(i1.AnimalService), i0.ɵɵdirectiveInject(i2.FormBuilder), i0.ɵɵdirectiveInject(i3.ToastService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ValidationSanitaireComponent, selectors: [["app-validation-sanitaire"]], standalone: false, decls: 23, vars: 4, consts: [["loadingState", ""], ["emptyState", ""], ["noRecord", ""], [1, "validation-shell", "py-8", "px-4", "lg:px-8"], [1, "max-w-7xl", "mx-auto"], [1, "validation-hero", "mb-8"], [1, "eyebrow"], [1, "stat-bubble"], [4, "ngIf", "ngIfElse"], ["class", "grid grid-cols-1 xl:grid-cols-[0.8fr_1.2fr] gap-6", 4, "ngIf", "ngIfElse"], [1, "grid", "grid-cols-1", "xl:grid-cols-[0.8fr_1.2fr]", "gap-6"], [1, "queue-card"], [1, "queue-header"], [1, "queue-list"], ["type", "button", "class", "queue-item", 3, "queue-item--active", "click", 4, "ngFor", "ngForOf"], ["class", "detail-card", 4, "ngIf"], ["type", "button", 1, "queue-item", 3, "click"], [1, "queue-chip"], [1, "detail-card"], [1, "detail-head"], [1, "text-sm", "text-[#7a2f38]"], [1, "status-chip"], [1, "detail-grid"], [1, "info-card"], [1, "info-label"], [1, "evidence-panel"], [1, "panel-block"], ["class", "record-list", 4, "ngIf", "ngIfElse"], [1, "upload-strip"], ["type", "file", "accept", ".pdf,image/*", "hidden", "", 3, "change"], ["class", "uploaded-row", 4, "ngIf"], [1, "validation-form", 3, "ngSubmit", "formGroup"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-4"], ["for", "validationStatus", 1, "form-label"], ["id", "validationStatus", "formControlName", "validationStatus", 1, "form-input"], [3, "value", 4, "ngFor", "ngForOf"], ["for", "documentType", 1, "form-label"], ["id", "documentType", "formControlName", "documentType", 1, "form-input"], [1, "md:col-span-2"], ["for", "visitResult", 1, "form-label"], ["id", "visitResult", "formControlName", "visitResult", "placeholder", "Ex. : Inspection physique r\u00E9alis\u00E9e. Temp\u00E9rature stable, boiterie absente, fiche valid\u00E9e.", 1, "form-input", "min-h-[140px]"], ["class", "form-error", 4, "ngIf"], ["for", "latitude", 1, "form-label"], ["id", "latitude", "type", "number", "formControlName", "latitude", 1, "form-input"], ["for", "longitude", 1, "form-label"], ["id", "longitude", "type", "number", "formControlName", "longitude", 1, "form-input"], [1, "flex", "justify-end"], ["type", "submit", 1, "primary-cta", 3, "disabled"], [1, "record-list"], ["class", "record-row", 4, "ngFor", "ngForOf"], [1, "record-row"], ["type", "radio", "name", "healthRecord", 3, "change", "checked"], [1, "muted-copy"], [1, "uploaded-row"], ["target", "_blank", "rel", "noreferrer", 3, "href"], ["type", "button", 3, "click"], [3, "value"], [1, "form-error"], [1, "empty-state"]], template: function ValidationSanitaireComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 3)(1, "div", 4)(2, "div", 5)(3, "div")(4, "p", 6);
            i0.ɵɵtext(5, "Validation ANADER");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "h1");
            i0.ɵɵtext(7, "Contr\u00F4le sanitaire sur le terrain");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "p");
            i0.ɵɵtext(9, " S\u00E9lectionnez un animal en attente, rattachez une fiche sanitaire existante ou un nouveau document, puis validez la visite pour faire passer automatiquement l'animal en ");
            i0.ɵɵelementStart(10, "strong");
            i0.ɵɵtext(11, "DISPONIBLE");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(12, ". ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(13, "div", 7)(14, "span");
            i0.ɵɵtext(15);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "small");
            i0.ɵɵtext(17);
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(18, ValidationSanitaireComponent_ng_container_18_Template, 2, 2, "ng-container", 8)(19, ValidationSanitaireComponent_ng_template_19_Template, 2, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor)(21, ValidationSanitaireComponent_ng_template_21_Template, 5, 0, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            const loadingState_r12 = i0.ɵɵreference(20);
            i0.ɵɵadvance(15);
            i0.ɵɵtextInterpolate(ctx.animals.length);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1("Animal", ctx.animals.length > 1 ? "s" : "", " \u00E0 traiter");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading)("ngIfElse", loadingState_r12);
        } }, dependencies: [i4.NgForOf, i4.NgIf, i2.ɵNgNoValidate, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.NumberValueAccessor, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.FormGroupDirective, i2.FormControlName, i4.DecimalPipe, i4.DatePipe], styles: ["[_nghost-%COMP%] {\r\n  display: block;\r\n}\r\n\r\n.validation-shell[_ngcontent-%COMP%] {\r\n  min-height: 100%;\r\n  background:\r\n    radial-gradient(circle at top left, rgba(244, 63, 94, 0.16), transparent 22%),\r\n    linear-gradient(180deg, #fff7f7 0%, #fff1f2 100%);\r\n}\r\n\r\n.validation-hero[_ngcontent-%COMP%], \r\n.queue-card[_ngcontent-%COMP%], \r\n.detail-card[_ngcontent-%COMP%], \r\n.empty-state[_ngcontent-%COMP%] {\r\n  border: 1px solid rgba(136, 19, 55, 0.12);\r\n  background: rgba(255, 250, 250, 0.92);\r\n  box-shadow: 0 22px 70px rgba(136, 19, 55, 0.08);\r\n}\r\n\r\n.validation-hero[_ngcontent-%COMP%] {\r\n  border-radius: 30px;\r\n  padding: 1.45rem;\r\n  display: flex;\r\n  justify-content: space-between;\r\n  gap: 1rem;\r\n  align-items: center;\r\n}\r\n\r\n.eyebrow[_ngcontent-%COMP%] {\r\n  margin: 0 0 0.35rem;\r\n  font-size: 0.72rem;\r\n  font-weight: 800;\r\n  letter-spacing: 0.2em;\r\n  text-transform: uppercase;\r\n  color: #be123c;\r\n}\r\n\r\n.validation-hero[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], \r\n.queue-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], \r\n.detail-head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], \r\n.empty-state[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\r\n  margin: 0;\r\n  color: #611a24;\r\n  font-family: \"Trebuchet MS\", \"Segoe UI Variable\", sans-serif;\r\n}\r\n\r\n.validation-hero[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \r\n.queue-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \r\n.muted-copy[_ngcontent-%COMP%], \r\n.record-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\r\n  color: #881337;\r\n  line-height: 1.6;\r\n}\r\n\r\n.stat-bubble[_ngcontent-%COMP%] {\r\n  min-width: 160px;\r\n  border-radius: 26px;\r\n  padding: 1rem 1.2rem;\r\n  background: linear-gradient(160deg, #9f1239, #e11d48);\r\n  color: #fff;\r\n  text-align: center;\r\n}\r\n\r\n.stat-bubble[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\r\n  display: block;\r\n  font-size: 2.2rem;\r\n  font-weight: 800;\r\n  line-height: 1;\r\n}\r\n\r\n.queue-card[_ngcontent-%COMP%], \r\n.detail-card[_ngcontent-%COMP%], \r\n.empty-state[_ngcontent-%COMP%] {\r\n  border-radius: 28px;\r\n  padding: 1.25rem;\r\n}\r\n\r\n.queue-list[_ngcontent-%COMP%] {\r\n  display: grid;\r\n  gap: 0.75rem;\r\n  margin-top: 1rem;\r\n}\r\n\r\n.queue-item[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  gap: 1rem;\r\n  align-items: center;\r\n  border: 1px solid rgba(190, 24, 93, 0.12);\r\n  border-radius: 20px;\r\n  padding: 0.95rem 1rem;\r\n  background: rgba(255, 241, 242, 0.88);\r\n  text-align: left;\r\n}\r\n\r\n.queue-item--active[_ngcontent-%COMP%] {\r\n  border-color: #e11d48;\r\n  background: linear-gradient(135deg, rgba(255, 228, 230, 0.98), rgba(255, 255, 255, 0.98));\r\n}\r\n\r\n.queue-item[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\r\n  display: block;\r\n  color: #611a24;\r\n}\r\n\r\n.queue-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\r\n  color: #881337;\r\n}\r\n\r\n.queue-chip[_ngcontent-%COMP%], \r\n.status-chip[_ngcontent-%COMP%] {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  border-radius: 999px;\r\n  padding: 0.45rem 0.8rem;\r\n  background: #ffe4e6;\r\n  color: #9f1239;\r\n  font-weight: 700;\r\n  white-space: nowrap;\r\n}\r\n\r\n.detail-head[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  gap: 1rem;\r\n  align-items: flex-start;\r\n}\r\n\r\n.detail-grid[_ngcontent-%COMP%] {\r\n  display: grid;\r\n  grid-template-columns: repeat(3, minmax(0, 1fr));\r\n  gap: 1rem;\r\n  margin-top: 1.2rem;\r\n}\r\n\r\n.info-card[_ngcontent-%COMP%] {\r\n  border-radius: 20px;\r\n  padding: 1rem;\r\n  background: rgba(255, 241, 242, 0.9);\r\n}\r\n\r\n.info-label[_ngcontent-%COMP%], \r\n.form-label[_ngcontent-%COMP%] {\r\n  display: block;\r\n  margin-bottom: 0.45rem;\r\n  color: #9f1239;\r\n  font-size: 0.8rem;\r\n  font-weight: 700;\r\n  text-transform: uppercase;\r\n}\r\n\r\n.info-card[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\r\n  color: #611a24;\r\n}\r\n\r\n.evidence-panel[_ngcontent-%COMP%] {\r\n  display: grid;\r\n  grid-template-columns: repeat(2, minmax(0, 1fr));\r\n  gap: 1rem;\r\n  margin-top: 1.4rem;\r\n}\r\n\r\n.panel-block[_ngcontent-%COMP%] {\r\n  border-radius: 24px;\r\n  background: rgba(255, 250, 251, 0.94);\r\n  padding: 1rem;\r\n}\r\n\r\n.panel-block[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\r\n  margin: 0 0 0.9rem;\r\n  color: #611a24;\r\n}\r\n\r\n.record-list[_ngcontent-%COMP%] {\r\n  display: grid;\r\n  gap: 0.75rem;\r\n}\r\n\r\n.record-row[_ngcontent-%COMP%] {\r\n  display: grid;\r\n  grid-template-columns: auto 1fr;\r\n  gap: 0.75rem;\r\n  align-items: start;\r\n  border-radius: 18px;\r\n  padding: 0.85rem 0.9rem;\r\n  background: rgba(255, 241, 242, 0.92);\r\n}\r\n\r\n.upload-strip[_ngcontent-%COMP%] {\r\n  display: block;\r\n  border: 1px dashed rgba(225, 29, 72, 0.26);\r\n  border-radius: 20px;\r\n  padding: 1rem;\r\n  background: linear-gradient(135deg, rgba(255, 241, 242, 0.96), rgba(255, 255, 255, 0.9));\r\n  color: #7f1d1d;\r\n  font-weight: 700;\r\n  cursor: pointer;\r\n}\r\n\r\n.uploaded-row[_ngcontent-%COMP%] {\r\n  margin-top: 0.9rem;\r\n  border-radius: 18px;\r\n  padding: 0.9rem 1rem;\r\n  background: rgba(255, 241, 242, 0.92);\r\n  display: flex;\r\n  justify-content: space-between;\r\n  gap: 1rem;\r\n  align-items: center;\r\n}\r\n\r\n.uploaded-row[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \r\n.uploaded-row[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\r\n  display: block;\r\n}\r\n\r\n.uploaded-row[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\r\n  color: #be123c;\r\n  margin-top: 0.2rem;\r\n}\r\n\r\n.uploaded-row[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\r\n  border: 0;\r\n  border-radius: 999px;\r\n  padding: 0.55rem 0.8rem;\r\n  background: #ffe4e6;\r\n  color: #9f1239;\r\n  font-weight: 700;\r\n}\r\n\r\n.validation-form[_ngcontent-%COMP%] {\r\n  margin-top: 1.4rem;\r\n}\r\n\r\n.form-input[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  border: 1px solid rgba(190, 24, 93, 0.14);\r\n  border-radius: 18px;\r\n  padding: 0.95rem 1rem;\r\n  background: rgba(255, 255, 255, 0.9);\r\n  color: #4c0519;\r\n  outline: none;\r\n}\r\n\r\n.form-input[_ngcontent-%COMP%]:focus {\r\n  border-color: #e11d48;\r\n  box-shadow: 0 0 0 4px rgba(225, 29, 72, 0.12);\r\n}\r\n\r\n.form-error[_ngcontent-%COMP%] {\r\n  margin-top: 0.45rem;\r\n  color: #be123c;\r\n  font-size: 0.84rem;\r\n}\r\n\r\n.primary-cta[_ngcontent-%COMP%] {\r\n  margin-top: 1rem;\r\n  border: 0;\r\n  border-radius: 999px;\r\n  padding: 0.95rem 1.45rem;\r\n  background: linear-gradient(135deg, #be123c 0%, #e11d48 100%);\r\n  color: #fff;\r\n  font-weight: 800;\r\n}\r\n\r\n.primary-cta[_ngcontent-%COMP%]:disabled {\r\n  opacity: 0.65;\r\n  cursor: not-allowed;\r\n}\r\n\r\n.empty-state[_ngcontent-%COMP%] {\r\n  text-align: center;\r\n  padding: 2.5rem 1.5rem;\r\n}\r\n\r\n@media (max-width: 1279px) {\r\n  .validation-hero[_ngcontent-%COMP%] {\r\n    flex-direction: column;\r\n    align-items: flex-start;\r\n  }\r\n}\r\n\r\n@media (max-width: 767px) {\r\n  .detail-grid[_ngcontent-%COMP%], \r\n   .evidence-panel[_ngcontent-%COMP%] {\r\n    grid-template-columns: 1fr;\r\n  }\r\n\r\n  .uploaded-row[_ngcontent-%COMP%] {\r\n    flex-direction: column;\r\n    align-items: stretch;\r\n  }\r\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ValidationSanitaireComponent, [{
        type: Component,
        args: [{ selector: 'app-validation-sanitaire', standalone: false, template: "<section class=\"validation-shell py-8 px-4 lg:px-8\">\r\n  <div class=\"max-w-7xl mx-auto\">\r\n    <div class=\"validation-hero mb-8\">\r\n      <div>\r\n        <p class=\"eyebrow\">Validation ANADER</p>\r\n        <h1>Contr\u00F4le sanitaire sur le terrain</h1>\r\n        <p>\r\n          S\u00E9lectionnez un animal en attente, rattachez une fiche sanitaire\r\n          existante ou un nouveau document, puis validez la visite pour\r\n          faire passer automatiquement l'animal en <strong>DISPONIBLE</strong>.\r\n        </p>\r\n      </div>\r\n\r\n      <div class=\"stat-bubble\">\r\n        <span>{{ animals.length }}</span>\r\n        <small>Animal{{ animals.length > 1 ? 's' : '' }} \u00E0 traiter</small>\r\n      </div>\r\n    </div>\r\n\r\n    <ng-container *ngIf=\"!loading; else loadingState\">\r\n      <div *ngIf=\"animals.length; else emptyState\" class=\"grid grid-cols-1 xl:grid-cols-[0.8fr_1.2fr] gap-6\">\r\n        <aside class=\"queue-card\">\r\n          <div class=\"queue-header\">\r\n            <h2>File d'inspection</h2>\r\n            <p>Les animaux restent indisponibles tant que la visite n'est pas valid\u00E9e.</p>\r\n          </div>\r\n\r\n          <div class=\"queue-list\">\r\n            <button\r\n              *ngFor=\"let animal of animals\"\r\n              type=\"button\"\r\n              class=\"queue-item\"\r\n              [class.queue-item--active]=\"animal.id === selectedAnimal?.id\"\r\n              (click)=\"selectAnimal(animal)\"\r\n            >\r\n              <div>\r\n                <strong>{{ animal.displayName }}</strong>\r\n                <span>{{ animal.lieuNaissance || 'Localisation non renseign\u00E9e' }}</span>\r\n              </div>\r\n              <span class=\"queue-chip\">{{ animal.quantity }} t\u00EAte(s)</span>\r\n            </button>\r\n          </div>\r\n        </aside>\r\n\r\n        <section *ngIf=\"selectedAnimal\" class=\"detail-card\">\r\n          <div class=\"detail-head\">\r\n            <div>\r\n              <p class=\"eyebrow\">Fiche s\u00E9lectionn\u00E9e</p>\r\n              <h2>{{ selectedAnimal.displayName }}</h2>\r\n              <p class=\"text-sm text-[#7a2f38]\">\r\n                QR {{ selectedAnimal.qrCode }} | Vendeur {{ selectedAnimal.sellerName }}\r\n              </p>\r\n            </div>\r\n            <span class=\"status-chip\">{{ selectedAnimal.status }}</span>\r\n          </div>\r\n\r\n          <div class=\"detail-grid\">\r\n            <article class=\"info-card\">\r\n              <span class=\"info-label\">Documents sanitaires</span>\r\n              <strong>{{ selectedAnimal.healthRecords.length }}</strong>\r\n            </article>\r\n            <article class=\"info-card\">\r\n              <span class=\"info-label\">Coordonn\u00E9es</span>\r\n              <strong>{{ selectedAnimal.latitude || '-' }}, {{ selectedAnimal.longitude || '-' }}</strong>\r\n            </article>\r\n            <article class=\"info-card\">\r\n              <span class=\"info-label\">Prix</span>\r\n              <strong>{{ selectedAnimal.price | number: '1.0-0' }} FCFA</strong>\r\n            </article>\r\n          </div>\r\n\r\n          <div class=\"evidence-panel\">\r\n            <div class=\"panel-block\">\r\n              <h3>Fiches d\u00E9j\u00E0 charg\u00E9es</h3>\r\n              <div *ngIf=\"recordOptions.length; else noRecord\" class=\"record-list\">\r\n                <label *ngFor=\"let record of recordOptions\" class=\"record-row\">\r\n                  <input\r\n                    type=\"radio\"\r\n                    name=\"healthRecord\"\r\n                    [checked]=\"form.get('healthRecordId')?.value === record.id\"\r\n                    (change)=\"form.patchValue({ healthRecordId: record.id })\"\r\n                  />\r\n                  <div>\r\n                    <strong>{{ record.documentType }} </strong>\r\n                    <span>{{ record.validationStatus }} | {{ record.uploadedAt | date: 'dd/MM/yyyy HH:mm' }}</span>\r\n                  </div>\r\n                </label>\r\n              </div>\r\n              <ng-template #noRecord>\r\n                <p class=\"muted-copy\">Aucune fiche existante. Un document doit \u00EAtre t\u00E9l\u00E9vers\u00E9.</p>\r\n              </ng-template>\r\n            </div>\r\n\r\n            <div class=\"panel-block\">\r\n              <h3>T\u00E9l\u00E9verser un nouveau document</h3>\r\n              <label class=\"upload-strip\">\r\n                <input type=\"file\" accept=\".pdf,image/*\" hidden (change)=\"uploadDocument($event)\" />\r\n                <span>Ajouter un certificat ou une fiche de visite</span>\r\n              </label>\r\n\r\n              <div *ngIf=\"uploadedDocument\" class=\"uploaded-row\">\r\n                <div>\r\n                  <strong>{{ uploadedDocument.originalName }}</strong>\r\n                  <a [href]=\"previewDocumentUrl()\" target=\"_blank\" rel=\"noreferrer\">Ouvrir le document</a>\r\n                </div>\r\n                <button type=\"button\" (click)=\"removeUploadedDocument()\">Retirer</button>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <form [formGroup]=\"form\" (ngSubmit)=\"submit()\" class=\"validation-form\">\r\n            <div class=\"grid grid-cols-1 md:grid-cols-2 gap-4\">\r\n              <div>\r\n                <label class=\"form-label\" for=\"validationStatus\">D\u00E9cision</label>\r\n                <select id=\"validationStatus\" class=\"form-input\" formControlName=\"validationStatus\">\r\n                  <option *ngFor=\"let status of validationStatuses\" [value]=\"status.value\">\r\n                    {{ status.label }}\r\n                  </option>\r\n                </select>\r\n              </div>\r\n\r\n              <div>\r\n                <label class=\"form-label\" for=\"documentType\">Type de document si nouveau</label>\r\n                <select id=\"documentType\" class=\"form-input\" formControlName=\"documentType\">\r\n                  <option *ngFor=\"let documentType of documentTypes\" [value]=\"documentType.value\">\r\n                    {{ documentType.label }}\r\n                  </option>\r\n                </select>\r\n              </div>\r\n\r\n              <div class=\"md:col-span-2\">\r\n                <label class=\"form-label\" for=\"visitResult\">Compte rendu de visite</label>\r\n                <textarea\r\n                  id=\"visitResult\"\r\n                  class=\"form-input min-h-[140px]\"\r\n                  formControlName=\"visitResult\"\r\n                  placeholder=\"Ex. : Inspection physique r\u00E9alis\u00E9e. Temp\u00E9rature stable, boiterie absente, fiche valid\u00E9e.\"\r\n                ></textarea>\r\n                <p *ngIf=\"submitted && form.get('visitResult')?.invalid\" class=\"form-error\">\r\n                  Le compte rendu est requis.\r\n                </p>\r\n              </div>\r\n\r\n              <div>\r\n                <label class=\"form-label\" for=\"latitude\">Latitude de visite</label>\r\n                <input id=\"latitude\" type=\"number\" class=\"form-input\" formControlName=\"latitude\" />\r\n              </div>\r\n\r\n              <div>\r\n                <label class=\"form-label\" for=\"longitude\">Longitude de visite</label>\r\n                <input id=\"longitude\" type=\"number\" class=\"form-input\" formControlName=\"longitude\" />\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"flex justify-end\">\r\n              <button type=\"submit\" class=\"primary-cta\" [disabled]=\"submitting\">\r\n                {{ submitting ? 'Validation...' : 'Valider la visite' }}\r\n              </button>\r\n            </div>\r\n          </form>\r\n        </section>\r\n      </div>\r\n    </ng-container>\r\n\r\n    <ng-template #loadingState>\r\n      <div class=\"empty-state\">\r\n        Chargement de la file de validation sanitaire...\r\n      </div>\r\n    </ng-template>\r\n\r\n    <ng-template #emptyState>\r\n      <div class=\"empty-state\">\r\n        <h2>Aucun animal n'attend de validation sanitaire</h2>\r\n        <p>Le traitement ANADER est \u00E0 jour pour le moment.</p>\r\n      </div>\r\n    </ng-template>\r\n  </div>\r\n</section>\r\n", styles: [":host {\r\n  display: block;\r\n}\r\n\r\n.validation-shell {\r\n  min-height: 100%;\r\n  background:\r\n    radial-gradient(circle at top left, rgba(244, 63, 94, 0.16), transparent 22%),\r\n    linear-gradient(180deg, #fff7f7 0%, #fff1f2 100%);\r\n}\r\n\r\n.validation-hero,\r\n.queue-card,\r\n.detail-card,\r\n.empty-state {\r\n  border: 1px solid rgba(136, 19, 55, 0.12);\r\n  background: rgba(255, 250, 250, 0.92);\r\n  box-shadow: 0 22px 70px rgba(136, 19, 55, 0.08);\r\n}\r\n\r\n.validation-hero {\r\n  border-radius: 30px;\r\n  padding: 1.45rem;\r\n  display: flex;\r\n  justify-content: space-between;\r\n  gap: 1rem;\r\n  align-items: center;\r\n}\r\n\r\n.eyebrow {\r\n  margin: 0 0 0.35rem;\r\n  font-size: 0.72rem;\r\n  font-weight: 800;\r\n  letter-spacing: 0.2em;\r\n  text-transform: uppercase;\r\n  color: #be123c;\r\n}\r\n\r\n.validation-hero h1,\r\n.queue-header h2,\r\n.detail-head h2,\r\n.empty-state h2 {\r\n  margin: 0;\r\n  color: #611a24;\r\n  font-family: \"Trebuchet MS\", \"Segoe UI Variable\", sans-serif;\r\n}\r\n\r\n.validation-hero p,\r\n.queue-header p,\r\n.muted-copy,\r\n.record-row span {\r\n  color: #881337;\r\n  line-height: 1.6;\r\n}\r\n\r\n.stat-bubble {\r\n  min-width: 160px;\r\n  border-radius: 26px;\r\n  padding: 1rem 1.2rem;\r\n  background: linear-gradient(160deg, #9f1239, #e11d48);\r\n  color: #fff;\r\n  text-align: center;\r\n}\r\n\r\n.stat-bubble span {\r\n  display: block;\r\n  font-size: 2.2rem;\r\n  font-weight: 800;\r\n  line-height: 1;\r\n}\r\n\r\n.queue-card,\r\n.detail-card,\r\n.empty-state {\r\n  border-radius: 28px;\r\n  padding: 1.25rem;\r\n}\r\n\r\n.queue-list {\r\n  display: grid;\r\n  gap: 0.75rem;\r\n  margin-top: 1rem;\r\n}\r\n\r\n.queue-item {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  gap: 1rem;\r\n  align-items: center;\r\n  border: 1px solid rgba(190, 24, 93, 0.12);\r\n  border-radius: 20px;\r\n  padding: 0.95rem 1rem;\r\n  background: rgba(255, 241, 242, 0.88);\r\n  text-align: left;\r\n}\r\n\r\n.queue-item--active {\r\n  border-color: #e11d48;\r\n  background: linear-gradient(135deg, rgba(255, 228, 230, 0.98), rgba(255, 255, 255, 0.98));\r\n}\r\n\r\n.queue-item strong {\r\n  display: block;\r\n  color: #611a24;\r\n}\r\n\r\n.queue-item span {\r\n  color: #881337;\r\n}\r\n\r\n.queue-chip,\r\n.status-chip {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  border-radius: 999px;\r\n  padding: 0.45rem 0.8rem;\r\n  background: #ffe4e6;\r\n  color: #9f1239;\r\n  font-weight: 700;\r\n  white-space: nowrap;\r\n}\r\n\r\n.detail-head {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  gap: 1rem;\r\n  align-items: flex-start;\r\n}\r\n\r\n.detail-grid {\r\n  display: grid;\r\n  grid-template-columns: repeat(3, minmax(0, 1fr));\r\n  gap: 1rem;\r\n  margin-top: 1.2rem;\r\n}\r\n\r\n.info-card {\r\n  border-radius: 20px;\r\n  padding: 1rem;\r\n  background: rgba(255, 241, 242, 0.9);\r\n}\r\n\r\n.info-label,\r\n.form-label {\r\n  display: block;\r\n  margin-bottom: 0.45rem;\r\n  color: #9f1239;\r\n  font-size: 0.8rem;\r\n  font-weight: 700;\r\n  text-transform: uppercase;\r\n}\r\n\r\n.info-card strong {\r\n  color: #611a24;\r\n}\r\n\r\n.evidence-panel {\r\n  display: grid;\r\n  grid-template-columns: repeat(2, minmax(0, 1fr));\r\n  gap: 1rem;\r\n  margin-top: 1.4rem;\r\n}\r\n\r\n.panel-block {\r\n  border-radius: 24px;\r\n  background: rgba(255, 250, 251, 0.94);\r\n  padding: 1rem;\r\n}\r\n\r\n.panel-block h3 {\r\n  margin: 0 0 0.9rem;\r\n  color: #611a24;\r\n}\r\n\r\n.record-list {\r\n  display: grid;\r\n  gap: 0.75rem;\r\n}\r\n\r\n.record-row {\r\n  display: grid;\r\n  grid-template-columns: auto 1fr;\r\n  gap: 0.75rem;\r\n  align-items: start;\r\n  border-radius: 18px;\r\n  padding: 0.85rem 0.9rem;\r\n  background: rgba(255, 241, 242, 0.92);\r\n}\r\n\r\n.upload-strip {\r\n  display: block;\r\n  border: 1px dashed rgba(225, 29, 72, 0.26);\r\n  border-radius: 20px;\r\n  padding: 1rem;\r\n  background: linear-gradient(135deg, rgba(255, 241, 242, 0.96), rgba(255, 255, 255, 0.9));\r\n  color: #7f1d1d;\r\n  font-weight: 700;\r\n  cursor: pointer;\r\n}\r\n\r\n.uploaded-row {\r\n  margin-top: 0.9rem;\r\n  border-radius: 18px;\r\n  padding: 0.9rem 1rem;\r\n  background: rgba(255, 241, 242, 0.92);\r\n  display: flex;\r\n  justify-content: space-between;\r\n  gap: 1rem;\r\n  align-items: center;\r\n}\r\n\r\n.uploaded-row strong,\r\n.uploaded-row a {\r\n  display: block;\r\n}\r\n\r\n.uploaded-row a {\r\n  color: #be123c;\r\n  margin-top: 0.2rem;\r\n}\r\n\r\n.uploaded-row button {\r\n  border: 0;\r\n  border-radius: 999px;\r\n  padding: 0.55rem 0.8rem;\r\n  background: #ffe4e6;\r\n  color: #9f1239;\r\n  font-weight: 700;\r\n}\r\n\r\n.validation-form {\r\n  margin-top: 1.4rem;\r\n}\r\n\r\n.form-input {\r\n  width: 100%;\r\n  border: 1px solid rgba(190, 24, 93, 0.14);\r\n  border-radius: 18px;\r\n  padding: 0.95rem 1rem;\r\n  background: rgba(255, 255, 255, 0.9);\r\n  color: #4c0519;\r\n  outline: none;\r\n}\r\n\r\n.form-input:focus {\r\n  border-color: #e11d48;\r\n  box-shadow: 0 0 0 4px rgba(225, 29, 72, 0.12);\r\n}\r\n\r\n.form-error {\r\n  margin-top: 0.45rem;\r\n  color: #be123c;\r\n  font-size: 0.84rem;\r\n}\r\n\r\n.primary-cta {\r\n  margin-top: 1rem;\r\n  border: 0;\r\n  border-radius: 999px;\r\n  padding: 0.95rem 1.45rem;\r\n  background: linear-gradient(135deg, #be123c 0%, #e11d48 100%);\r\n  color: #fff;\r\n  font-weight: 800;\r\n}\r\n\r\n.primary-cta:disabled {\r\n  opacity: 0.65;\r\n  cursor: not-allowed;\r\n}\r\n\r\n.empty-state {\r\n  text-align: center;\r\n  padding: 2.5rem 1.5rem;\r\n}\r\n\r\n@media (max-width: 1279px) {\r\n  .validation-hero {\r\n    flex-direction: column;\r\n    align-items: flex-start;\r\n  }\r\n}\r\n\r\n@media (max-width: 767px) {\r\n  .detail-grid,\r\n  .evidence-panel {\r\n    grid-template-columns: 1fr;\r\n  }\r\n\r\n  .uploaded-row {\r\n    flex-direction: column;\r\n    align-items: stretch;\r\n  }\r\n}\r\n"] }]
    }], () => [{ type: i1.AnimalService }, { type: i2.FormBuilder }, { type: i3.ToastService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ValidationSanitaireComponent, { className: "ValidationSanitaireComponent", filePath: "src/app/features/animaux/validation-sanitaire/validation-sanitaire.component.ts", lineNumber: 19 }); })();
//# sourceMappingURL=validation-sanitaire.component.js.map