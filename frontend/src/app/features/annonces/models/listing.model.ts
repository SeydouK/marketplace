export interface Listing {
  id: string;
  title: string;
  description?: string;
  animalType: string;
  price: number;
  location: string;
  sellerId: number;
  sellerName: string;
  sellerEmail?: string;
  image?: string;
  gallery?: string[];
  breed?: string;
  quantity: number;
  status: string;
  qrCode?: string;
  groupedLot?: boolean;
  latitude?: number | null;
  longitude?: number | null;
}
