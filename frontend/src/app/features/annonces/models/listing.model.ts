export interface Listing {
  id: number;
  userId?: number;
  ownerName?: string;
  title: string;
  description?: string;
  animalType: string;
  price: number;
  location: string;
  sellerName: string;
  sellerPhone: string;
  image?: string;
  rating?: number;
  ageMonths?: number;
  breed?: string;
  status: string;
}
