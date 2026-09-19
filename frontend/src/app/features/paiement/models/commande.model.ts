export type StatutCommande = 'EN_ATTENTE' | 'PAYEE' | 'ECHOUEE' | 'ANNULEE' | 'EXPIREE';

export interface Commande {
  id: number;
  statut: StatutCommande;
  montant: number;
  checkoutUrl: string;
  createdAt: string;
  paidAt: string | null;
}
