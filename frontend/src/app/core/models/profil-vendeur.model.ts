export interface ProfilVendeur {
  id: number;           // Long côté Java
  name: string;
  avatarUrl?: string;
  dateInscription: string;   // Instant sérialisé en ISO string
  nombreAnnonces: number;
}
