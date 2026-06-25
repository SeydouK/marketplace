export type ActualiteCategorie =
  | 'SANTE_ANIMALE'
  | 'ELEVAGE'
  | 'MARCHE'
  | 'REGLEMENTATION'
  | 'CONSEIL';

export interface Actualite {
  id: string;
  titre: string;
  resume: string;
  contenu: string;
  categorie: ActualiteCategorie;
  imageUrl?: string;
  auteur: string;
  datePublication: Date;
  isNew?: boolean;
}
