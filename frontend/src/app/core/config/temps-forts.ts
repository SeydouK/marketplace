// core/config/temps-forts.ts

/**
 * Temps forts commerciaux mis en avant sur la page d'accueil.
 *
 * La Tabaski est le pic annuel du marché ovin : dans les semaines qui la
 * précèdent, la demande de moutons s'envole. L'encart s'ouvre quelques
 * semaines avant la fête et se referme deux jours après.
 *
 * La date suit le calendrier lunaire et n'est confirmée qu'à l'observation de
 * la lune : elle est donc indiquée comme estimée, et doit être mise à jour
 * chaque année.
 */
export interface TempsFort {
  /** Date de la fête, au format AAAA-MM-JJ. */
  date: string;
  /** La date est-elle une estimation ? */
  estimee: boolean;
  /** Nombre de jours avant la date à partir duquel l'encart s'affiche. */
  ouvertureJours: number;
  /** Espèce mise en avant. */
  espece: string;
}

export const TABASKI: TempsFort = {
  date: '2027-05-16',
  estimee: true,
  ouvertureJours: 60,
  espece: 'OVIN',
};
