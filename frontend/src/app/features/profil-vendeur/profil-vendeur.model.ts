export interface ProfilVendeur {
  id: string;
  name: string;
  /** Nom du champ tel que renvoye par ProfilVendeurDTO cote backend. */
  avatarUrl?: string;
  // region et bio ne sont pas encore exposes par ProfilVendeurDTO :
  // les blocs correspondants du template restent masques.
  region?: string;
  bio?: string;
  dateInscription: string;   // ISO date string
  nombreAnnonces: number;
  notemoyenne?: number;       // pour plus tard
}
