export type AnimalStatus = 'DISPONIBLE' | 'EN_ATTENTE' | 'EN_ATTENTE_VALIDATION' | 'VENDU' | 'INDISPONIBLE';

export interface Listing {
  id: string;
  type?: string;        
  race?: string;
  lieuNaissance?: string;
  displayName?: string;
  price: number;
  photos?: string[];
  videos?: string[];
  quantity?: number;
  latitude?: number;
  longitude?: number;
  status?: AnimalStatus;
  sellerId?: number;
  sellerName?: string;
  sellerEmail?: string;
  qrCode?: string;
  groupedLot?: boolean;
  createdAt?: string;

  title?: string;         // = displayName
  image?: string;         // = photos[0]
  gallery?: string[];     // = photos
  location?: string;      // = lieuNaissance
  animalType?: string;    // = type
  breed?: string;         // = race
}