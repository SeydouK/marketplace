import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastService } from '../../../core/services/toast.service';
import {
  Animal,
  HealthDocumentType,
  HealthValidationStatus,
  StoredFile,
  ValidateAnimalPayload,
} from '../models/animal.model';
import { AnimalService } from '../services/animal.service';

@Component({
  selector: 'app-validation-sanitaire',
  templateUrl: './validation-sanitaire.component.html',
  styleUrls: ['./validation-sanitaire.component.css'],
  standalone: false,
})
export class ValidationSanitaireComponent implements OnInit {
  animals: Animal[] = [];
  selectedAnimal?: Animal;
  uploadedDocument?: StoredFile;
  loading = true;
  submitting = false;
  submitted = false;

  readonly validationStatuses: Array<{
    value: HealthValidationStatus;
    label: string;
  }> = [
    { value: 'VALIDE', label: 'Valider la fiche' },
    { value: 'REJETE', label: 'Rejeter la fiche' },
  ];

  readonly documentTypes: Array<{ value: HealthDocumentType; label: string }> = [
    { value: 'CERTIFICAT_VETERINAIRE', label: 'Certificat vétérinaire' },
    { value: 'FICHE_VACCINATION', label: 'Fiche de vaccination' },
    { value: 'ATTESTATION_DSV', label: 'Attestation DSV' },
    { value: 'AUTRE', label: 'Autre document' },
  ];

  form = this.fb.group({
    healthRecordId: [''],
    documentType: ['CERTIFICAT_VETERINAIRE' as HealthDocumentType],
    validationStatus: ['VALIDE' as HealthValidationStatus, Validators.required],
    visitResult: ['', Validators.required],
    longitude: [null as number | null],
    latitude: [null as number | null],
  });

  constructor(
    private readonly animalService: AnimalService,
    private readonly fb: FormBuilder,
    private readonly toast: ToastService
  ) {}

  ngOnInit(): void {
    this.reload();
  }

  get recordOptions() {
    return this.selectedAnimal?.healthRecords ?? [];
  }

  selectAnimal(animal: Animal): void {
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

  uploadDocument(event: Event): void {
    const input = event.target as HTMLInputElement;
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

  removeUploadedDocument(): void {
    this.uploadedDocument = undefined;
  }

  previewDocumentUrl(): string {
    return this.uploadedDocument
      ? this.animalService.resolveAssetUrl(this.uploadedDocument.url)
      : '';
  }

  submit(): void {
    this.submitted = true;
    if (!this.selectedAnimal || this.form.invalid) {
      return;
    }

    const raw = this.form.getRawValue();
    if (!raw.healthRecordId && !this.uploadedDocument) {
      this.toast.error('Sélectionnez une fiche existante ou téléversez un nouveau document.');
      return;
    }

    const payload: ValidateAnimalPayload = {
      healthRecordId: raw.healthRecordId || null,
      documentUrl: raw.healthRecordId ? null : this.uploadedDocument?.url ?? null,
      documentType: raw.healthRecordId ? null : (raw.documentType as HealthDocumentType),
      validationStatus: raw.validationStatus as HealthValidationStatus,
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

  private reload(): void {
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

  private integrateAnimalUpdate(animal: Animal): void {
    if (animal.status === 'DISPONIBLE') {
      this.animals = this.animals.filter((item) => item.id !== animal.id);
      this.selectedAnimal = this.animals[0];
      if (this.selectedAnimal) {
        this.selectAnimal(this.selectedAnimal);
      } else {
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
}
