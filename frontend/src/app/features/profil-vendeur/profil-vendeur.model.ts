export interface ProfilVendeur {
  id: string;
  name: string;
  photoUrl?: string;
  region?: string;
  bio?: string;
  dateInscription: string;   // ISO date string
  nombreAnnonces: number;
  notemoyenne?: number;       // pour plus tard
}
