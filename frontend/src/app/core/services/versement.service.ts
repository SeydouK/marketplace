import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export type OperateurPayout = 'WAVE' | 'ORANGE_MONEY' | 'MTN' | 'MOOV';

export const LIBELLES_OPERATEUR: Record<OperateurPayout, string> = {
  WAVE: 'Wave',
  ORANGE_MONEY: 'Orange Money',
  MTN: 'MTN MoMo',
  MOOV: 'Moov Money',
};

export interface MoyenRetrait {
  operateur?: OperateurPayout;
  numero?: string;
  operateurLibelle?: string;
  /** La destination est-elle renseignée ? */
  complet: boolean;
  /**
   * La plateforme peut-elle envoyer de l'argent aujourd'hui ?
   *
   * Faux tant que le wallet marchand GeniusPay n'est pas configuré. Distinct de
   * `complet` : l'un dit ce qui manque au vendeur, l'autre ce qui manque à la
   * plateforme.
   */
  retraitsOuverts: boolean;
}

export interface MonVersement {
  id: number;
  commandeId: number;
  commandeReference?: string;
  montantNet: number;
  statut: 'BLOQUE' | 'EN_ATTENTE' | 'EN_COURS' | 'CONFIRME' | 'ECHOUE';
  libereAt?: string;
  envoyeAt?: string;
  destinationOperateur?: OperateurPayout;
  destinationNumero?: string;
  reference?: string;
}

/**
 * Retrait des gains et destination de versement.
 *
 * Le moyen de retrait vit sur le compte et non sur la vente : un vendeur le
 * déclare une fois, chaque retrait le reprend. Le montant, lui, n'est jamais
 * saisi ici — il vient du séquestre, et laisser le vendeur le proposer
 * ouvrirait un écart entre ce qu'il demande et ce qui lui est dû.
 */
@Injectable({ providedIn: 'root' })
export class VersementService {
  private readonly base = environment.apiUrl;

  /**
   * Dernier moyen de retrait connu.
   *
   * Mémorisé parce que deux écrans en dépendent — le profil qui l'édite et
   * « Mes ventes » qui doit savoir s'il manque avant de proposer un retrait.
   */
  private moyen: MoyenRetrait | null = null;

  constructor(private readonly http: HttpClient) {}

  getMoyenRetrait(): Observable<MoyenRetrait> {
    return this.http
      .get<MoyenRetrait>(`${this.base}/users/me/moyen-retrait`)
      .pipe(tap((m) => (this.moyen = m)));
  }

  get moyenConnu(): MoyenRetrait | null {
    return this.moyen;
  }

  enregistrerMoyenRetrait(operateur: OperateurPayout, numero: string): Observable<MoyenRetrait> {
    return this.http
      .put<MoyenRetrait>(`${this.base}/users/me/moyen-retrait`, { operateur, numero })
      .pipe(tap((m) => (this.moyen = m)));
  }

  retirer(versementId: number): Observable<MonVersement> {
    return this.http.post<MonVersement>(`${this.base}/versements/${versementId}/retirer`, {});
  }

  libelleOperateur(op?: OperateurPayout): string {
    return op ? LIBELLES_OPERATEUR[op] : '';
  }
}
