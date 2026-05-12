import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';
import {
  Animal,
  AnimalSubmissionFiles,
  AnimalType,
  CreateAnimalPayload,
  HealthDocumentType,
  StoredFile,
} from '../models/animal.model';
import { AnimalService } from '../services/animal.service';

type UploadTarget = 'photos' | 'videos' | 'documents';

type DraftStoredFile = StoredFile & {
  file?: File | null;
  persistedUrl?: string | null;
  objectUrl?: string | null;
};

type UploadedHealthDocument = {
  file: DraftStoredFile;
  documentType: HealthDocumentType;
};

@Component({
  selector: 'app-creer-animal',
  templateUrl: './creer-animal.component.html',
  styleUrls: ['./creer-animal.component.css'],
  standalone: false,
})
export class CreerAnimalComponent implements OnInit, AfterViewInit, OnDestroy {
  private static leafletLoadPromise?: Promise<any>;

  @ViewChild('mapHost') mapHost?: ElementRef<HTMLDivElement>;

  private map?: any;
  private marker?: any;
  private mapReadyRetry?: ReturnType<typeof setTimeout>;

  submitted = false;
  saving = false;
  geolocating = false;
  mapUnavailable = false;
  loadingAnimal = false;
  editMode = false;
  animalId?: string;
  currentStepIndex = 0;
  mapStatus =
    "Sélectionnez l'emplacement du troupeau sur la carte ou saisissez les coordonnées.";

  uploadedPhotos: DraftStoredFile[] = [];
  uploadedVideos: DraftStoredFile[] = [];
  uploadedDocuments: UploadedHealthDocument[] = [];
  previewedImage?: DraftStoredFile;
  documentsGuideOpen = false;

  readonly defaultMapCenter = {
    latitude: 7.539989,
    longitude: -5.54708,
  };

  readonly animalTypes: Array<{ value: AnimalType; label: string; hint: string }> = [
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

  readonly documentTypes: Array<{ value: HealthDocumentType; label: string }> = [
    { value: 'FICHE_VACCINATION', label: 'Fiche de vaccination' },
    { value: 'CERTIFICAT_VETERINAIRE', label: 'Certificat vétérinaire' },
    { value: 'ATTESTATION_DSV', label: 'Attestation DSV' },
    { value: 'AUTRE', label: 'Autre document' },
  ];

  readonly stepItems: Array<{ label: string }> = [
    { label: 'Identité' },
    { label: 'Cartographie' },
    { label: 'Médias' },
    { label: 'Documents' },
  ];

  readonly stepDescriptions = [
    "Renseignez l'espèce, l'origine et les éléments commerciaux du dossier.",
    "Localisez précisément le troupeau sur la carte ou par coordonnées.",
    "Ajoutez les photos et vidéos utiles à la lecture du dossier.",
    "Joignez les pièces sanitaires et vérifiez l'ensemble avant enregistrement.",
  ];

  form = this.fb.group({
    type: ['BOVIN' as AnimalType, Validators.required],
    race: [''],
    lieuNaissance: ['', Validators.required],
    price: [null as number | null, [Validators.required, Validators.min(1)]],
    quantity: [1, [Validators.required, Validators.min(1)]],
    longitude: [null as number | null],
    latitude: [null as number | null],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly auth: AuthService,
    private readonly animalService: AnimalService,
    private readonly toast: ToastService,
    private readonly zone: NgZone,
    @Inject(DOCUMENT) private readonly document: Document
  ) {}

  ngOnInit(): void {
    const animalId = this.route.snapshot.paramMap.get('id');
    if (!animalId) {
      return;
    }

    this.editMode = true;
    this.animalId = animalId;
    this.loadAnimal(animalId);
  }

  ngAfterViewInit(): void {
    this.handleStepActivated();
  }

  ngOnDestroy(): void {
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

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.previewedImage) {
      this.closeImagePreview();
    }

    if (this.documentsGuideOpen) {
      this.closeDocumentsGuide();
    }
  }

  get heroEyebrow(): string {
    return this.editMode ? 'Révision du dossier' : 'Parcours vendeur';
  }

  get heroTitle(): string {
    return this.editMode
      ? 'Mettre à jour un animal déjà publié ou en contrôle'
      : 'Créer un dossier animal prêt pour le contrôle sanitaire';
  }

  get heroText(): string {
    return this.editMode
      ? "Ajustez les informations du dossier, ses médias et sa localisation. Après enregistrement, la fiche repart dans le circuit de validation sanitaire avant republication."
      : "Renseignez l'identité du bétail, sa localisation et les pièces du dossier. Le système génère la traçabilité de l'animal et transmet ensuite le dossier au circuit de validation sanitaire.";
  }

  get submitLabel(): string {
    if (this.saving) {
      return this.editMode ? 'Mise à jour en cours...' : 'Enregistrement...';
    }

    return this.editMode ? 'Enregistrer les modifications' : "Enregistrer l'animal";
  }

  get isGroupedLot(): boolean {
    return (this.form.get('quantity')?.value ?? 0) > 10;
  }

  get selectedAnimalType() {
    return this.animalTypes.find(
      (animalType) => animalType.value === this.form.get('type')?.value
    );
  }

  get isFirstStep(): boolean {
    return this.currentStepIndex === 0;
  }

  get isLastStep(): boolean {
    return this.currentStepIndex === this.stepItems.length - 1;
  }

  get currentStepLabel(): string {
    return this.stepItems[this.currentStepIndex]?.label || '';
  }

  get currentStepDescription(): string {
    return this.stepDescriptions[this.currentStepIndex] || '';
  }

  controlInvalid(controlName: string, errorName?: string): boolean {
    const control = this.form.get(controlName);
    if (!control) {
      return false;
    }

    const shouldShow = control.invalid && (control.dirty || control.touched || this.submitted);
    return shouldShow && (!errorName || control.hasError(errorName));
  }

  onFileSelection(event: Event, target: UploadTarget): void {
    const input = event.target as HTMLInputElement;
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
          documentType: 'FICHE_VACCINATION' as HealthDocumentType,
        })),
      ];
    }

    input.value = '';
  }

  removePhoto(file: DraftStoredFile): void {
    this.clearPreviewIfNeeded(file);
    this.revokeObjectUrl(file);
    this.uploadedPhotos = this.uploadedPhotos.filter((item) => item !== file);
  }

  removeVideo(file: DraftStoredFile): void {
    this.revokeObjectUrl(file);
    this.uploadedVideos = this.uploadedVideos.filter((item) => item !== file);
  }

  removeDocument(document: UploadedHealthDocument): void {
    this.clearPreviewIfNeeded(document.file);
    this.revokeObjectUrl(document.file);
    this.uploadedDocuments = this.uploadedDocuments.filter((item) => item !== document);
  }

  updateDocumentType(document: UploadedHealthDocument, type: HealthDocumentType): void {
    document.documentType = type;
  }

  previewUrl(file: DraftStoredFile): string {
    return file.url;
  }

  isImagePreviewable(file: DraftStoredFile): boolean {
    const contentType = file.contentType?.toLowerCase();
    if (contentType?.startsWith('image/')) {
      return true;
    }

    const fileName = `${file.originalName || file.storedName || file.url || ''}`.toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg', '.avif'].some((extension) =>
      fileName.endsWith(extension) || fileName.includes(`${extension}?`)
    );
  }

  openImagePreview(file: DraftStoredFile): void {
    if (!this.isImagePreviewable(file)) {
      return;
    }

    this.previewedImage = file;
  }

  closeImagePreview(): void {
    this.previewedImage = undefined;
  }

  openDocumentsGuide(): void {
    this.documentsGuideOpen = true;
  }

  closeDocumentsGuide(): void {
    this.documentsGuideOpen = false;
  }

  imageStatusLabel(file: DraftStoredFile): string {
    return file.persistedUrl ? 'Image déjà enregistrée' : 'Image prête à l’envoi';
  }

  onCoordinatesBlur(): void {
    this.syncMapFromCoordinates(true);
  }

  onStepChange(stepIndex: number): void {
    this.navigateToStep(stepIndex, true);
  }

  goToPreviousStep(): void {
    this.navigateToStep(this.currentStepIndex - 1, false);
  }

  goToNextStep(): void {
    this.navigateToStep(this.currentStepIndex + 1, true);
  }

  recenterMap(): void {
    if (!this.map) {
      return;
    }

    const coordinates = this.readCoordinates();
    if (coordinates) {
      this.map.flyTo(
        [coordinates.latitude, coordinates.longitude],
        Math.max(this.map.getZoom(), 12),
        { duration: 0.75 }
      );
      return;
    }

    this.map.flyTo(
      [this.defaultMapCenter.latitude, this.defaultMapCenter.longitude],
      7,
      { duration: 0.75 }
    );
  }

  useCurrentPosition(): void {
    if (!navigator.geolocation) {
      this.toast.error("La géolocalisation n'est pas disponible sur cet appareil.");
      return;
    }

    this.geolocating = true;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.geolocating = false;
        this.setCoordinates(
          position.coords.latitude,
          position.coords.longitude,
          true,
          'Position GPS récupérée avec succès.'
        );
      },
      () => {
        this.geolocating = false;
        this.toast.error("Impossible de récupérer votre position actuelle.");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  }

  submit(): void {
    this.submitted = true;
    const identityValid = this.validateStep(0, true);
    const locationValid = identityValid ? this.validateStep(1, true) : true;

    if (!identityValid || !locationValid || this.form.invalid) {
      if (!identityValid || this.form.invalid) {
        this.currentStepIndex = 0;
      } else if (!locationValid) {
        this.currentStepIndex = 1;
      }
      this.handleStepActivated();
      return;
    }

    this.saving = true;
    const payload = this.buildPayload();
    const submissionFiles = this.buildSubmissionFiles();
    const request$: Observable<Animal> =
      this.editMode && this.animalId
        ? this.animalService.update(this.animalId, payload, submissionFiles)
        : this.animalService.create(payload, submissionFiles);

    request$.subscribe({
      next: (animal) => {
        this.toast.success(
          this.editMode
            ? 'Le dossier a été mis à jour. Il repasse en attente de validation sanitaire.'
            : "Le dossier animal a été enregistré. Il reste en attente de validation sanitaire."
        );
        void this.router.navigate(
          this.editMode ? ['/annonces', animal.id] : ['/annonces/mes-annonces']
        );
      },
      error: () => {
        this.saving = false;
      },
      complete: () => {
        this.saving = false;
      },
    });
  }

  private buildPayload(): CreateAnimalPayload {
    const rawValue = this.form.getRawValue();

    return {
      type: rawValue.type as AnimalType,
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

  private buildSubmissionFiles(): AnimalSubmissionFiles {
    return {
      photoFiles: this.uploadedPhotos
        .map((file) => file.file)
        .filter((file): file is File => !!file),
      videoFiles: this.uploadedVideos
        .map((file) => file.file)
        .filter((file): file is File => !!file),
      documentFiles: this.uploadedDocuments
        .filter((document) => !!document.file.file)
        .map((document) => ({
          file: document.file.file as File,
          documentType: document.documentType,
        })),
    };
  }

  private loadAnimal(animalId: string): void {
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

  private buildExistingStoredFile(url: string): DraftStoredFile {
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

  private buildDraftStoredFile(file: File): DraftStoredFile {
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

  private extractFileName(url: string): string {
    const sanitizedUrl = url.split('?')[0].split('#')[0];
    const segment = sanitizedUrl.split('/').filter(Boolean).pop();
    if (!segment) {
      return 'document';
    }

    try {
      return decodeURIComponent(segment);
    } catch {
      return segment;
    }
  }

  private revokeObjectUrl(file: DraftStoredFile): void {
    if (!file.objectUrl) {
      return;
    }

    URL.revokeObjectURL(file.objectUrl);
    file.objectUrl = null;
  }

  private cleanupDraftFiles(): void {
    this.previewedImage = undefined;
    this.uploadedPhotos.forEach((file) => this.revokeObjectUrl(file));
    this.uploadedVideos.forEach((file) => this.revokeObjectUrl(file));
    this.uploadedDocuments.forEach((document) => this.revokeObjectUrl(document.file));
  }

  private clearPreviewIfNeeded(file: DraftStoredFile): void {
    if (this.previewedImage === file) {
      this.previewedImage = undefined;
    }
  }

  private navigateToStep(stepIndex: number, validateCurrentStep: boolean): void {
    if (stepIndex < 0 || stepIndex >= this.stepItems.length || stepIndex === this.currentStepIndex) {
      return;
    }

    if (
      stepIndex > this.currentStepIndex &&
      validateCurrentStep &&
      !this.validateStep(this.currentStepIndex, true)
    ) {
      return;
    }

    this.currentStepIndex = stepIndex;
    this.handleStepActivated();
  }

  private validateStep(stepIndex: number, notify: boolean): boolean {
    if (stepIndex === 0) {
      return this.validateIdentityStep(notify);
    }

    if (stepIndex === 1) {
      return this.validateLocationStep(notify);
    }

    return true;
  }

  private validateIdentityStep(notify: boolean): boolean {
    const controls = ['type', 'lieuNaissance', 'price', 'quantity'];
    controls.forEach((controlName) => this.form.get(controlName)?.markAsTouched());

    const invalid = controls.some((controlName) => this.form.get(controlName)?.invalid);
    if (invalid && notify) {
      this.toast.error("Complétez l'identité du dossier avant de passer à l'étape suivante.");
    }

    return !invalid;
  }

  private validateLocationStep(notify: boolean): boolean {
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

  private handleStepActivated(): void {
    if (this.currentStepIndex !== 1) {
      return;
    }

    this.ensureMapReady();
  }

  private async bootstrapMap(): Promise<void> {
    try {
      await this.ensureLeafletAssets();
      this.initializeMap();
    } catch {
      this.mapUnavailable = true;
      this.mapStatus =
        "La carte n'a pas pu être chargée. Renseignez les coordonnées manuellement.";
    }
  }

  private ensureMapReady(): void {
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

  private ensureLeafletAssets(): Promise<any> {
    const leaflet = (window as any).L;
    if (leaflet) {
      return Promise.resolve(leaflet);
    }

    this.ensureLeafletStyles();

    if (CreerAnimalComponent.leafletLoadPromise) {
      return CreerAnimalComponent.leafletLoadPromise;
    }

    CreerAnimalComponent.leafletLoadPromise = new Promise((resolve, reject) => {
      const existingScript = this.document.querySelector(
        'script[data-leaflet-runtime="true"]'
      ) as HTMLScriptElement | null;

      if (existingScript) {
        existingScript.addEventListener('load', () => resolve((window as any).L), {
          once: true,
        });
        existingScript.addEventListener(
          'error',
          () => reject(new Error('Leaflet load failed')),
          {
            once: true,
          }
        );
        return;
      }

      const script = this.document.createElement('script');
      script.src = '/assets/vendor/leaflet/leaflet.js';
      script.async = true;
      script.defer = true;
      script.dataset['leafletRuntime'] = 'true';
      script.onload = () => {
        const runtimeLeaflet = (window as any).L;
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

  private ensureLeafletStyles(): void {
    const existingLink = this.document.querySelector(
      'link[data-leaflet-runtime="true"]'
    ) as HTMLLinkElement | null;

    if (existingLink) {
      return;
    }

    const link = this.document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/assets/vendor/leaflet/leaflet.css';
    link.dataset['leafletRuntime'] = 'true';
    this.document.head.appendChild(link);
  }

  private initializeMap(): void {
    const leaflet = (window as any).L;
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
      .setView(
        [initialCoordinates.latitude, initialCoordinates.longitude],
        this.readCoordinates() ? 12 : 7
      );

    leaflet.control.zoom({ position: 'topright' }).addTo(this.map);

    leaflet
      .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
      })
      .addTo(this.map);

    this.map.on('click', (event: any) => {
      this.zone.run(() => {
        this.setCoordinates(
          event.latlng.lat,
          event.latlng.lng,
          true,
          'Position enregistrée à partir de la carte.'
        );
      });
    });

    this.syncMapFromCoordinates(false);
    setTimeout(() => this.map?.invalidateSize(), 0);
    setTimeout(() => this.map?.invalidateSize(), 250);
  }

  private setCoordinates(
    latitude: number,
    longitude: number,
    focusMap: boolean,
    message: string
  ): void {
    const roundedLatitude = Number(latitude.toFixed(6));
    const roundedLongitude = Number(longitude.toFixed(6));

    this.form.patchValue({
      latitude: roundedLatitude,
      longitude: roundedLongitude,
    });

    this.placeMarker(roundedLatitude, roundedLongitude, focusMap);
    this.mapStatus = `${message} Latitude ${roundedLatitude}, longitude ${roundedLongitude}.`;
  }

  private syncMapFromCoordinates(focusMap: boolean): void {
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

  private placeMarker(latitude: number, longitude: number, focusMap: boolean): void {
    if (!this.map) {
      return;
    }

    const leaflet = (window as any).L;
    if (!this.marker) {
      this.marker = leaflet.marker([latitude, longitude]).addTo(this.map);
    } else {
      this.marker.setLatLng([latitude, longitude]);
    }

    if (focusMap) {
      this.map.flyTo([latitude, longitude], Math.max(this.map.getZoom(), 12), {
        duration: 0.75,
      });
    }
  }

  private readCoordinates():
    | {
        latitude: number;
        longitude: number;
      }
    | null {
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

  private hasRenderableMapHost(): boolean {
    const host = this.mapHost?.nativeElement;
    return !!host && host.clientWidth > 0 && host.clientHeight > 0;
  }

  private scheduleMapReady(): void {
    if (this.mapReadyRetry) {
      clearTimeout(this.mapReadyRetry);
    }

    this.mapReadyRetry = setTimeout(() => {
      this.mapReadyRetry = undefined;
      this.ensureMapReady();
    }, 120);
  }
}
