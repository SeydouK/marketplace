// shared/services/livraison.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SKIP_GLOBAL_ERROR } from '../../core/interceptors/error.interceptor';

/** Cycle de vie de la remise d'un animal (miroir de StatutLivraison côté back). */
export type StatutLivraison =
  | 'A_REMETTRE'
  | 'PRET'
  | 'EN_LIVRAISON'
  | 'LIVRE'
  | 'RECEPTIONNE'
  | 'ECHEC_LIVRAISON'
  | 'LITIGE';

export type ModeRemise = 'RETRAIT_SUR_PLACE' | 'TRANSPORT';

export type EtatSuivi =
  | 'PREPARATION'
  | 'A_RETIRER'
  | 'EN_ROUTE'
  | 'EN_ROUTE_SANS_POSITION'
  | 'REMIS'
  | 'LITIGE';

/** Vue temps réel d'une livraison — rafraîchie pendant le trajet. */
export interface SuiviLivraison {
  remiseId: number;
  commandeId: number;
  modeRemise: ModeRemise;
  vendeurNom?: string;
  vendeurTelephone?: string;
  animaux: string[];
  /** Nécessaires pour valider la remise depuis cet écran. */
  articleIds?: number[];
  adresseLigne?: string;
  adresseVille?: string;
  adresseIndications?: string;
  destinataireNom?: string;
  destinataireTelephone?: string;
  destinationLatitude?: number;
  destinationLongitude?: number;
  livreurLatitude?: number;
  livreurLongitude?: number;
  livreurPositionAt?: string;
  positionDisponible: boolean;
  distanceKm?: number;
  departAt?: string;
  etat: EtatSuivi;
  etatLibelle: string;
  /** À quel titre je regarde cette livraison. */
  roleObservateur?: 'ACHETEUR' | 'VENDEUR' | 'TRANSPORTEUR';
  /** Suis-je celui qui doit partager sa position ? Décidé côté serveur. */
  estLeLivreur: boolean;
  transporteurNom?: string;
}

export interface DestinationRequest {
  mode: ModeRemise;
  adresseLigne?: string;
  ville?: string;
  indications?: string;
  destinataireNom?: string;
  destinataireTelephone?: string;
  latitude?: number;
  longitude?: number;
}

export type TypeEvenement =
  | 'PAIEMENT_CONFIRME' | 'CODE_GENERE' | 'CODE_ENVOYE' | 'ANIMAL_PRET'
  | 'PRIS_EN_CHARGE' | 'POSITION' | 'CODE_REFUSE' | 'CODE_VALIDE'
  | 'ECHEC_LIVRAISON' | 'LITIGE_OUVERT' | 'LITIGE_ARBITRE' | 'FONDS_LIBERES';

/** Une ligne de la frise. Le libellé vient du back : c'est du vocabulaire métier. */
export interface EvenementLivraison {
  id: number;
  type: TypeEvenement;
  libelle: string;
  auteurType: 'ACHETEUR' | 'VENDEUR' | 'TRANSPORTEUR' | 'SYSTEME' | 'ADMIN';
  commentaire?: string;
  photoUrl?: string;
  date: string;
}

export type StatutCommande = 'EN_ATTENTE' | 'PAYEE' | 'ECHOUEE' | 'ANNULEE' | 'EXPIREE';

export type StatutVersement = 'BLOQUE' | 'EN_ATTENTE' | 'EN_COURS' | 'CONFIRME' | 'ECHOUE';

export type Transporteur = 'MANUEL' | 'YANGO';

/** Un point du parcours parcouru. */
/**
 * Un relevé transmis par le téléphone du livreur.
 *
 * Les coordonnées seules suffisaient à poser une épingle. La vitesse et le cap —
 * fournis par le même appel au GPS, sans coût supplémentaire — permettent au
 * marqueur de s'orienter et de glisser entre deux relevés au lieu de sauter.
 */
export interface RelevePosition {
  latitude: number;
  longitude: number;
  /** Facultatifs : tout matériel ne les fournit pas, et l'envoi doit passer quand même. */
  vitesseKmh?: number;
  capDegres?: number;
  precisionM?: number;
}

export interface PointTrace {
  latitude: number;
  longitude: number;
  le: string;
}

/** État de synthèse calculé par le back — le front n'a pas à le recomposer. */
export type EtatAchat =
  | 'EN_ATTENTE_PAIEMENT'
  | 'EN_ATTENTE_LIVRAISON'
  | 'PRET'
  | 'ECHEC_LIVRAISON'
  | 'EN_LIVRAISON'
  | 'A_CONFIRMER'
  | 'TERMINE'
  | 'LITIGE'
  | 'ANNULE';

export type EtatVente =
  | 'A_REMETTRE'
  | 'PRET'
  | 'ECHEC_LIVRAISON'
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
  /** Code à communiquer au vendeur. Absent une fois l'animal reçu. */
  codeRemise?: string;
  remiseId?: number;
  modeRemise?: ModeRemise;
  evenements: EvenementLivraison[];
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
  /**
   * Un transporteur conduit-il a la place du vendeur ?
   *
   * Decide de ce que le vendeur doit ouvrir : l'ecran de navigation quand il
   * conduit, l'ecran de suivi quand il regarde.
   */
  livreParTransporteur?: boolean;
  transporteurNom?: string;
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
  remiseId?: number;
  modeRemise?: ModeRemise;
  evenements: EvenementLivraison[];
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

  declarerPret(itemId: number): Observable<MaVente> {
    return this.http.post<MaVente>(`${this.base}/articles/${itemId}/pret`, {});
  }

  declarerEchec(itemId: number, motif: string): Observable<MaVente> {
    return this.http.post<MaVente>(`${this.base}/articles/${itemId}/echec`, { motif });
  }

  // ── Suivi de livraison ─────────────────────────────────────────────────────

  /** L'acheteur choisit entre retrait sur place et livraison, et dit où livrer. */
  definirDestination(remiseId: number, body: DestinationRequest): Observable<SuiviLivraison> {
    return this.http.put<SuiviLivraison>(`${this.base}/remises/${remiseId}/destination`, body);
  }

  /** Le vendeur prend la route. */
  demarrerLivraison(remiseId: number): Observable<SuiviLivraison> {
    return this.http.post<SuiviLivraison>(`${this.base}/remises/${remiseId}/depart`, {});
  }

  /**
   * Pousse la position du livreur.
   *
   * L'appel le plus fréquent du système : réponse vide, pas de traitement global
   * d'erreur, et échec silencieux — une position perdue n'a aucune conséquence,
   * la suivante arrive dans vingt secondes.
   */
  envoyerPosition(remiseId: number, releve: RelevePosition): Observable<void> {
    return this.http.post<void>(
      `${this.base}/remises/${remiseId}/position`,
      releve,
      { context: new HttpContext().set(SKIP_GLOBAL_ERROR, true) },
    );
  }

  /** La carte côté acheteur. */
  suivre(remiseId: number): Observable<SuiviLivraison> {
    return this.http.get<SuiviLivraison>(`${this.base}/remises/${remiseId}/suivi`);
  }

  /**
   * Le parcours réellement emprunté.
   *
   * Séparé du suivi : il ne change pas au même rythme, et le renvoyer à chaque
   * sondage gonflerait la réponse pour rien.
   */
  trace(remiseId: number): Observable<PointTrace[]> {
    return this.http.get<PointTrace[]>(`${this.base}/remises/${remiseId}/trace`);
  }

  /**
   * Envoie la photo de remise et renvoie son URL.
   *
   * Réutilise le stockage applicatif existant : les octets partent sur le même
   * bucket que les photos d'annonces, et l'URL renvoyée est relative.
   */
  uploadPhotoRemise(file: File): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', 'ANIMAL_PHOTO');
    return this.http.post<{ url: string }>(`${environment.apiUrl}/files/upload`, formData);
  }

  /**
   * Valide le code que l'acheteur communique au moment de la remise.
   * La photo est obligatoire : c'est la preuve qui rend le litige arbitrable.
   */
  validerRemise(
    commandeId: number,
    itemIds: number[],
    code: string,
    photoUrl: string,
  ): Observable<{ articlesSoldes: number }> {
    return this.http.post<{ articlesSoldes: number }>(
      `${this.base}/remises/${commandeId}/valider`,
      { itemIds, code, photoUrl },
    );
  }
}
