// animalId est un string (UUID) côté frontend, Long côté backend

export interface PanierItem {
  id: number;
  animalId: string;       // UUID
  animalNom: string;
  animalRace: string;
  prixUnitaire: number;
  quantite: number;
  sousTotal: number;
  vendeurId: number;
  vendeurNom: string;
  photoUrl: string;
  localisation: string;
  addedAt: string;
}

export interface Panier {
  id: number;
  userId: number;
  items: PanierItem[];
  total: number;
  nombreArticles: number;
  updatedAt: string;
}

export interface AjouterAuPanierRequest {
  animalId: string;       // UUID en string
  quantite?: number;
}

export interface ModifierQuantiteRequest {
  quantite: number;
}

export interface PanierParVendeur {
  vendeurId: number;
  vendeurNom: string;
  items: PanierItem[];
  sousTotal: number;
}