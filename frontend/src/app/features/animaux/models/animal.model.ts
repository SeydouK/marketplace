export type AnimalType = 'BOVIN' | 'OVIN' | 'CAPRIN' | 'PORCIN' | 'AUTRE';
export type AnimalStatus = 'DISPONIBLE' | 'INDISPONIBLE' | 'VENDU';
export type HealthDocumentType =
  | 'CERTIFICAT_VETERINAIRE'
  | 'FICHE_VACCINATION'
  | 'ATTESTATION_DSV'
  | 'AUTRE';
export type HealthValidationStatus = 'EN_ATTENTE' | 'VALIDE' | 'REJETE';
export type HistoryEventType =
  | 'ENREGISTREMENT'
  | 'EDITION'
  | 'VISITE_VETERINAIRE'
  | 'CHANGEMENT_STATUT'
  | 'VENTE'
  | 'TRANSPORT'
  | 'INSPECTION';

export interface AnimalHealthRecord {
  id: string;
  documentUrl: string;
  documentType: HealthDocumentType;
  validationStatus: HealthValidationStatus;
  validatedById?: number | null;
  validatedByName?: string | null;
  uploadedAt: string;
  validatedAt?: string | null;
}

export interface AnimalHistoryEvent {
  id: string;
  eventType: HistoryEventType;
  description?: string | null;
  actorId: number;
  actorName: string;
  longitude?: number | null;
  latitude?: number | null;
  eventDate: string;
  blockchainHash?: string | null;
}

export interface Animal {
  id: string;
  qrCode: string;
  type: AnimalType;
  race?: string | null;
  lieuNaissance?: string | null;
  price: number;
  photos: string[];
  videos: string[];
  quantity: number;
  longitude?: number | null;
  latitude?: number | null;
  status: AnimalStatus;
  createdAt: string;
  updatedAt: string;
  sellerId: number;
  sellerName: string;
  sellerEmail: string;
  displayName: string;
  groupedLot: boolean;
  healthRecords: AnimalHealthRecord[];
  history: AnimalHistoryEvent[];
}

export interface StoredFile {
  originalName: string;
  storedName: string;
  url: string;
  contentType?: string | null;
  size: number;
}

export interface CreateAnimalPayload {
  type: AnimalType;
  race?: string | null;
  lieuNaissance?: string | null;
  price: number;
  photos: string[];
  videos: string[];
  quantity: number;
  longitude?: number | null;
  latitude?: number | null;
  healthDocuments: Array<{
    documentUrl: string;
    documentType: HealthDocumentType;
  }>;
}

export interface AnimalSubmissionFiles {
  photoFiles: File[];
  videoFiles: File[];
  documentFiles: Array<{
    file: File;
    documentType: HealthDocumentType;
  }>;
}

export interface ValidateAnimalPayload {
  healthRecordId?: string | null;
  documentUrl?: string | null;
  documentType?: HealthDocumentType | null;
  validationStatus: HealthValidationStatus;
  visitResult: string;
  longitude?: number | null;
  latitude?: number | null;
}
