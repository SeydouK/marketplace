// shared/services/livraison.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

/** Cycle de vie de la remise d'un animal (miroir de StatutLivraison côté back). */
export type StatutLivraison =
  | 'A_REMETTRE'
  | 'EN_LIVRAISON'
  | 'LIVRE'
  | 'RECEPTIONNE'
  | 'LITIGE';

export type StatutCommande = 'EN_ATTENTE' | 'PAYEE' | 'ECHOUEE' | 'ANNULEE' | 'EXPIREE';

export type StatutVersement = 'BLOQUE' | 'EN_ATTENTE' | 'EN_COURS' | 'CONFIRME' | 'ECHOUE';

export type Transporteur = 'MANUEL' | 'YANGO';

/** État de synthèse calculé par le back — le front n'a pas à le recomposer. */
export type EtatAchat =
  | 'EN_ATTENTE_PAIEMENT'
  | 'EN_ATTENTE_LIVRAISON'
  | 'EN_LIVRAISON'
  | 'A_CONFIRMER'
  | 'TERMINE'
  | 'LITIGE'
  | 'ANNULE';

export type EtatVente =
  | 'A_REMETTRE'
  | 'EN_LIVRAISON'
  | 'EN_ATTENTE_CONFIRMATION'
  | 'FONDS_LIBERES'
  | 'VERSEMENT_EN_COURS'
  | 'VERSE'
  | 'VERSEMENT_ECHOUE'
  | 'LITIGE';

export interface MonAchatItem {
  id: number;
  animalId: string;
  animalNom: string;
  animalRace?: string;
  photoUrl?: string;
  localisation?: string;
  prixUnitaire: number;
  quantite: number;
  sousTotal: number;
  vendeurId?: number;
  vendeurNom?: string;
  statutLivraison: StatutLivraison;
  transporteur?: Transporteur;
  trackingReference?: string;
  remisAt?: string;
  livreAt?: string;
  receptionneAt?: string;
  litigeMotif?: string;
  confirmable: boolean;
  litigeOuvrable: boolean;
  liberationAutomatiqueLe?: string;
}

export interface MonAchat {
  id: number;
  reference?: string;
  statut: StatutCommande;
  montant: number;
  checkoutUrl?: string;
  createdAt: string;
  paidAt?: string;
  etatGlobal: EtatAchat;
  etatLibelle: string;
  items: MonAchatItem[];
}

export interface MaVente {
  itemId: number;
  commandeId: number;
  commandeReference?: string;
  animalId: string;
  animalNom: string;
  animalRace?: string;
  photoUrl?: string;
  acheteurNom?: string;
  paidAt?: string;
  montantBrut: number;
  montantNet?: number;
  statutLivraison: StatutLivraison;
  transporteur?: Transporteur;
  trackingReference?: string;
  remisAt?: string;
  livreAt?: string;
  receptionneAt?: string;
  litigeMotif?: string;
  statutVersement?: StatutVersement;
  versementLibereAt?: string;
  versementEnvoyeAt?: string;
  etatGlobal: EtatVente;
  etatLibelle: string;
  remisable: boolean;
  depotDeclarable: boolean;
}

/**
 * Achats, ventes et suivi de remise.
 *
 * Le paiement ne solde pas la vente : les fonds restent séquestrés sur la plateforme
 * jusqu'à ce que l'acheteur confirme avoir l'animal en main. Ce service expose les
 * deux vues de cette attente et les actions qui la font avancer.
 */
@Injectable({ providedIn: 'root' })
export class LivraisonService {
  private base = `${environment.apiUrl}/livraisons`;

  constructor(private http: HttpClient) {}

  // ── Acheteur ───────────────────────────────────────────────────────────────

  getMesAchats(): Observable<MonAchat[]> {
    return this.http.get<MonAchat[]>(`${this.base}/mes-achats`);
  }

  confirmerReception(itemId: number): Observable<MonAchat> {
    return this.http.post<MonAchat>(`${this.base}/articles/${itemId}/confirmer-reception`, {});
  }

  ouvrirLitige(itemId: number, motif: string): Observable<MonAchat> {
    return this.http.post<MonAchat>(`${this.base}/articles/${itemId}/litige`, { motif });
  }

  // ── Vendeur ────────────────────────────────────────────────────────────────

  getMesVentes(): Observable<MaVente[]> {
    return this.http.get<MaVente[]>(`${this.base}/mes-ventes`);
  }

  declarerPriseEnCharge(
    itemId: number,
    transporteur: Transporteur = 'MANUEL',
    trackingReference?: string,
  ): Observable<MaVente> {
    return this.http.post<MaVente>(`${this.base}/articles/${itemId}/prise-en-charge`, {
      transporteur,
      trackingReference: trackingReference ?? null,
    });
  }

  declarerDepot(itemId: number): Observable<MaVente> {
    return this.http.post<MaVente>(`${this.base}/articles/${itemId}/depot`, {});
  }
}
