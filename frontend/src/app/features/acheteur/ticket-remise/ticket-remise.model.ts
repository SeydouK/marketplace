// acheteur/ticket-remise/ticket-remise.model.ts
import {
  ModeRemise,
  MonAchat,
  StatutLivraison,
} from '../../../shared/services/livraison.service';

/**
 * Ticket de remise : ce que l'acheteur présente le jour où il prend l'animal.
 *
 * Un ticket par couple commande × vendeur — c'est la maille du code de remise :
 * une commande passée chez deux vendeurs porte deux codes, un par remise.
 */
export interface TicketRemise {
  cle: string;
  commandeId: number;
  reference: string;
  paidAt?: string;
  vendeurNom: string;
  modeRemise?: ModeRemise;
  localisation?: string;
  remiseId?: number;
  statutLivraison: StatutLivraison;
  /** Absent une fois l'animal reçu : le code a servi. */
  code?: string;
  montant: number;
  animaux: { nom: string; race?: string; photoUrl?: string; quantite: number }[];
  itemIds: number[];
  receptionneAt?: string;
}

/** Regroupe les articles payés en tickets, un par vendeur et par commande. */
export function construireTickets(achats: MonAchat[]): TicketRemise[] {
  const tickets: TicketRemise[] = [];
  for (const achat of achats) {
    if (achat.statut !== 'PAYEE') continue;
    const groupes = new Map<string, TicketRemise>();
    for (const item of achat.items) {
      const cleVendeur = String(item.vendeurId ?? item.vendeurNom ?? 'vendeur');
      let ticket = groupes.get(cleVendeur);
      if (!ticket) {
        ticket = {
          cle: `${achat.id}-${cleVendeur}`,
          commandeId: achat.id,
          // Le numéro court : la référence du prestataire de paiement est illisible à voix haute.
          reference: `#${achat.id}`,
          paidAt: achat.paidAt,
          vendeurNom: item.vendeurNom || 'Vendeur',
          modeRemise: item.modeRemise,
          localisation: item.localisation,
          remiseId: item.remiseId,
          statutLivraison: item.statutLivraison,
          code: item.codeRemise,
          montant: 0,
          animaux: [],
          itemIds: [],
          receptionneAt: item.receptionneAt,
        };
        groupes.set(cleVendeur, ticket);
      }
      ticket.montant += item.sousTotal ?? 0;
      ticket.animaux.push({
        nom: item.animalNom,
        race: item.animalRace,
        photoUrl: item.photoUrl,
        quantite: item.quantite ?? 1,
      });
      ticket.itemIds.push(item.id);
      ticket.code = ticket.code || item.codeRemise;
    }
    tickets.push(...groupes.values());
  }
  return tickets;
}

// ── Copie locale ─────────────────────────────────────────────────────────────
//
// Le jour de la remise, l'acheteur est souvent sur un marché à bétail, loin
// d'un bon réseau. Les tickets encore à utiliser sont donc gardés sur
// l'appareil pour s'afficher hors connexion. La clé est effacée à la
// déconnexion (StorageService.clear).

export const CLE_TICKETS = 'bm.tickets';

export function enregistrerTickets(tickets: TicketRemise[]): void {
  try {
    const actifs = tickets.filter((t) => !!t.code);
    localStorage.setItem(CLE_TICKETS, JSON.stringify({ le: new Date().toISOString(), tickets: actifs }));
  } catch {
    /* stockage indisponible (navigation privée) : le ticket reste affiché en ligne */
  }
}

export function lireTickets(): { le: string; tickets: TicketRemise[] } | null {
  try {
    const brut = localStorage.getItem(CLE_TICKETS);
    return brut ? JSON.parse(brut) : null;
  } catch {
    return null;
  }
}

// ── Libellés ─────────────────────────────────────────────────────────────────

export function libelleMode(mode?: ModeRemise): string {
  return mode === 'TRANSPORT' ? 'Livraison' : 'Retrait chez le vendeur';
}

export function libelleStatut(statut: StatutLivraison): string {
  const libelles: Record<StatutLivraison, string> = {
    A_REMETTRE: 'En préparation',
    PRET: 'Prêt à être remis',
    EN_LIVRAISON: 'En route',
    LIVRE: 'Livré',
    RECEPTIONNE: 'Remis',
    ECHEC_LIVRAISON: 'Remise à reprogrammer',
    LITIGE: 'Litige en cours',
  };
  return libelles[statut] ?? statut;
}

export function nommerAnimaux(ticket: TicketRemise): string {
  const premier = ticket.animaux[0]?.nom ?? 'Animal';
  const autres = ticket.animaux.length - 1;
  return autres > 0 ? `${premier} + ${autres} autre${autres > 1 ? 's' : ''}` : premier;
}

/** « 287 900 FCFA », avec espaces insécables comme dans le reste de l'application. */
export function formaterFcfa(montant: number): string {
  const chiffres = Math.round(montant).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return `${chiffres} FCFA`;
}
