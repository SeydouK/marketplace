export type ActualiteCategorie =
  | 'SANTE_ANIMALE'
  | 'ELEVAGE'
  | 'MARCHE'
  | 'REGLEMENTATION'
  | 'CONSEIL';

/**
 * Article tel qu'il apparaît dans la liste.
 *
 * Sans le corps : la liste est chargée à l'ouverture de l'application — l'en-tête
 * en dépend pour sa pastille — alors que le corps n'est lu que pour un article
 * à la fois.
 */
export interface ActualiteResume {
  id: number;
  titre: string;
  resume: string;
  categorie: ActualiteCategorie;
  imageUrl?: string | null;
  auteur: string;
  /** ISO renvoyée par le serveur, jamais un objet Date : la conversion est faite au besoin. */
  datePublication: string;
}

/** Article complet, servi par le détail et par l'administration. */
export interface Actualite extends ActualiteResume {
  contenu: string;
  publiee: boolean;
  updatedAt?: string;
}

/** Charge utile de rédaction. */
export interface ActualitePayload {
  titre: string;
  resume: string;
  contenu: string;
  categorie: ActualiteCategorie;
  imageUrl?: string | null;
  auteur: string;
  datePublication?: string | null;
  publiee: boolean;
}

export const LIBELLES_CATEGORIE: Record<ActualiteCategorie, string> = {
  SANTE_ANIMALE: 'Santé animale',
  ELEVAGE: 'Élevage',
  MARCHE: 'Marché',
  REGLEMENTATION: 'Réglementation',
  CONSEIL: 'Conseils pratiques',
};

export const COULEURS_CATEGORIE: Record<ActualiteCategorie, string> = {
  SANTE_ANIMALE: 'bg-red-100 text-red-700',
  ELEVAGE: 'bg-[#F2F7F3] text-[#2D6A4F]',
  MARCHE: 'bg-amber-100 text-amber-700',
  REGLEMENTATION: 'bg-blue-100 text-blue-700',
  CONSEIL: 'bg-purple-100 text-purple-700',
};
