import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  Animal,
  AnimalSubmissionFiles,
  AnimalStatus,
  AnimalType,
  CreateAnimalPayload,
  StoredFile,
  ValidateAnimalPayload,
} from '../models/animal.model';

export interface AnimalFilter {
  location?: string;
  type?: AnimalType | '';
  status?: AnimalStatus | '';
  minPrice?: number | null;
  maxPrice?: number | null;
}

export type UploadCategory =
  | 'ANIMAL_PHOTO'
  | 'ANIMAL_VIDEO'
  | 'SANITARY_DOCUMENT';

@Injectable({ providedIn: 'root' })
export class AnimalService {
  private readonly baseUrl = `${environment.apiUrl}/animals`;
  private readonly apiOrigin = environment.apiUrl.replace(/\/api$/, '');

  constructor(private readonly http: HttpClient) {}

  list(filter: AnimalFilter = {}): Observable<Animal[]> {
    return this.http
      .get<Animal[]>(this.baseUrl, {
        params: {
          ...(filter.location ? { location: filter.location } : {}),
          ...(filter.type ? { type: filter.type } : {}),
          ...(filter.status ? { status: filter.status } : {}),
          ...(filter.minPrice != null ? { minPrice: String(filter.minPrice) } : {}),
          ...(filter.maxPrice != null ? { maxPrice: String(filter.maxPrice) } : {}),
        },
      })
      .pipe(map((animals) => animals.map((animal) => this.normalizeAnimal(animal))));
  }

  get(id: string): Observable<Animal> {
    return this.http
      .get<Animal>(`${this.baseUrl}/${id}`)
      .pipe(map((animal) => this.normalizeAnimal(animal)));
  }

  mine(): Observable<Animal[]> {
    return this.http
      .get<Animal[]>(`${this.baseUrl}/mine`)
      .pipe(map((animals) => animals.map((animal) => this.normalizeAnimal(animal))));
  }

  pendingValidations(): Observable<Animal[]> {
    return this.http
      .get<Animal[]>(`${this.baseUrl}/validation/pending`)
      .pipe(map((animals) => animals.map((animal) => this.normalizeAnimal(animal))));
  }

  create(payload: CreateAnimalPayload, files?: AnimalSubmissionFiles): Observable<Animal> {
    return this.http
      .post<Animal>(this.baseUrl, this.buildAnimalFormData(payload, files))
      .pipe(map((animal) => this.normalizeAnimal(animal)));
  }

  update(id: string, payload: CreateAnimalPayload, files?: AnimalSubmissionFiles): Observable<Animal> {
    return this.http
      .put<Animal>(`${this.baseUrl}/${id}`, this.buildAnimalFormData(payload, files))
      .pipe(map((animal) => this.normalizeAnimal(animal)));
  }

  validate(id: string, payload: ValidateAnimalPayload): Observable<Animal> {
    return this.http
      .post<Animal>(`${this.baseUrl}/${id}/validation`, payload)
      .pipe(map((animal) => this.normalizeAnimal(animal)));
  }

  upload(file: File, category: UploadCategory): Observable<StoredFile> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);
    return this.http.post<StoredFile>(`${environment.apiUrl}/files/upload`, formData);
  }

  resolveAssetUrl(url?: string | null): string {
    if (!url) {
      return '';
    }

    if (/^https?:\/\//i.test(url)) {
      return url;
    }

    return `${this.apiOrigin}${url}`;
  }

  toStoredAssetPath(url?: string | null): string {
    if (!url) {
      return '';
    }

    if (url.startsWith(this.apiOrigin)) {
      return url.slice(this.apiOrigin.length);
    }

    return url;
  }

  private buildAnimalFormData(
    payload: CreateAnimalPayload,
    files?: AnimalSubmissionFiles
  ): FormData {
    const formData = new FormData();
    formData.append(
      'payload',
      new Blob([JSON.stringify(payload)], { type: 'application/json' })
    );

    for (const file of files?.photoFiles ?? []) {
      formData.append('photoFiles', file, file.name);
    }

    for (const file of files?.videoFiles ?? []) {
      formData.append('videoFiles', file, file.name);
    }

    for (const document of files?.documentFiles ?? []) {
      formData.append('documentFiles', document.file, document.file.name);
      formData.append('documentTypes', document.documentType);
    }

    return formData;
  }

  private normalizeAnimal(animal: Animal): Animal {
    return {
      ...animal,
      photos: (animal.photos ?? []).map((url) => this.resolveAssetUrl(url)),
      videos: (animal.videos ?? []).map((url) => this.resolveAssetUrl(url)),
      healthRecords: (animal.healthRecords ?? []).map((record) => ({
        ...record,
        documentUrl: this.resolveAssetUrl(record.documentUrl),
      })),
      history: animal.history ?? [],
    };
  }
}
