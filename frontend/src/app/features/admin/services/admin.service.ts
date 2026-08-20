// admin/services/admin.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { User } from '../../../core/models/user.model';
import { Role } from '../../../core/models/role.enum';

export interface AdminStats {
  totalUsers: number;
  pendingKyc: number;
  activeListings: number;
  openDisputes: number;
}

export interface UserPage {
  content: AdminUser[];
  totalElements: number;
  totalPages: number;
  number: number;
}

export interface AdminUser {
  id: number;
  name: string;
  surname: string;
  email: string;
  role: Role;
  emailVerified: boolean;
  kycStatus: string | null;
  devenirVendeur: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SellerRequest {
  id: number;
  name: string;
  surname: string;
  email: string;
  role: Role;
  emailVerified: boolean;
  kycStatus: string | null;
  devenirVendeur: boolean;
  createdAt: string;
  updatedAt: string;
}

export type AdminListingStatus = 'DISPONIBLE' | 'INDISPONIBLE' | 'RESERVE' | 'VENDU' | 'EN_ATTENTE';

export interface AdminListing {
  id: string;
  displayName: string;
  type: string;
  race: string | null;
  lieuNaissance: string | null;
  price: number;
  quantity: number;
  status: AdminListingStatus;
  photos: string[];
  sellerId: number;
  sellerName: string;
  sellerEmail: string;
  createdAt: string;
  updatedAt: string;
  documentsValides: boolean;
}

export interface AdminListingPage {
  content: AdminListing[];
  totalElements: number;
  totalPages: number;
  number: number;
}

export type StatutCommande = 'EN_ATTENTE' | 'PAYEE' | 'ECHOUEE' | 'ANNULEE' | 'EXPIREE';

export interface AdminCommande {
  id: number;
  reference: string | null;
  statut: StatutCommande;
  montant: number;
  fraisGeniusPay: number;
  commissionPlateforme: number;
  montantNetVendeur: number;
  acheteurId: number;
  acheteurNom: string | null;
  acheteurEmail: string | null;
  nombreArticles: number;
  createdAt: string;
  paidAt: string | null;
}

export interface AdminCommandePage {
  content: AdminCommande[];
  totalElements: number;
  totalPages: number;
  number: number;
}

export type StatutVersement = 'EN_ATTENTE' | 'EN_COURS' | 'CONFIRME' | 'ECHOUE';

export interface AdminVersement {
  id: number;
  commandeId: number;
  commandeReference: string | null;
  vendeurId: number;
  vendeurNom: string | null;
  vendeurTelephone: string | null;
  montantBrut: number;
  fraisGeniusPayAlloue: number;
  commissionPlateformeAlloue: number;
  montantNet: number;
  statut: StatutVersement;
  reference: string | null;
  createdAt: string;
  envoyeAt: string | null;
}

export interface AdminVersementPage {
  content: AdminVersement[];
  totalElements: number;
  totalPages: number;
  number: number;
}

@Injectable({ providedIn: 'root' })
export class AdminService {
  private base = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) {}

  getStats(): Observable<AdminStats> {
    return this.http.get<AdminStats>(`${this.base}/stats`);
  }

  getUsers(params?: { filter?: string; page?: number; size?: number }): Observable<UserPage> {
    let httpParams = new HttpParams();
    if (params?.filter) httpParams = httpParams.set('filter', params.filter);
    if (params?.page !== undefined) httpParams = httpParams.set('page', params.page);
    if (params?.size !== undefined) httpParams = httpParams.set('size', params.size);
    return this.http.get<UserPage>(`${this.base}/users`, { params: httpParams });
  }

  listSellerRequests(): Observable<SellerRequest[]> {
    return this.http.get<SellerRequest[]>(`${this.base}/seller-requests`);
  }

  approveSellerRequest(userId: number): Observable<SellerRequest> {
    return this.http.post<SellerRequest>(`${this.base}/seller-requests/${userId}/approve`, {});
  }

  getListings(params?: { status?: AdminListingStatus | 'all'; page?: number; size?: number }): Observable<AdminListingPage> {
    let httpParams = new HttpParams();
    if (params?.status && params.status !== 'all') httpParams = httpParams.set('status', params.status);
    if (params?.page !== undefined) httpParams = httpParams.set('page', params.page);
    if (params?.size !== undefined) httpParams = httpParams.set('size', params.size);
    return this.http.get<AdminListingPage>(`${this.base}/annonces`, { params: httpParams });
  }

  approveListing(listingId: string): Observable<AdminListing> {
    return this.http.post<AdminListing>(`${this.base}/annonces/${listingId}/approuver`, {});
  }

  suspendListing(listingId: string): Observable<AdminListing> {
    return this.http.post<AdminListing>(`${this.base}/annonces/${listingId}/suspendre`, {});
  }

  updateUserRole(userId: number, role: Role): Observable<AdminUser> {
    return this.http.patch<AdminUser>(`${this.base}/users/${userId}/role`, { role });
  }

  validateKyc(userId: number): Observable<AdminUser> {
    return this.http.post<AdminUser>(`${this.base}/users/${userId}/kyc/validate`, {});
  }

  rejectKyc(userId: number, reason: string): Observable<AdminUser> {
    return this.http.post<AdminUser>(`${this.base}/users/${userId}/kyc/reject`, { reason });
  }

  getCommandes(params?: { statut?: StatutCommande | 'all'; page?: number; size?: number }): Observable<AdminCommandePage> {
    let httpParams = new HttpParams();
    if (params?.statut && params.statut !== 'all') httpParams = httpParams.set('statut', params.statut);
    if (params?.page !== undefined) httpParams = httpParams.set('page', params.page);
    if (params?.size !== undefined) httpParams = httpParams.set('size', params.size);
    return this.http.get<AdminCommandePage>(`${this.base}/commandes`, { params: httpParams });
  }

  getVersements(params?: { statut?: StatutVersement | 'all'; page?: number; size?: number }): Observable<AdminVersementPage> {
    let httpParams = new HttpParams();
    if (params?.statut && params.statut !== 'all') httpParams = httpParams.set('statut', params.statut);
    if (params?.page !== undefined) httpParams = httpParams.set('page', params.page);
    if (params?.size !== undefined) httpParams = httpParams.set('size', params.size);
    return this.http.get<AdminVersementPage>(`${this.base}/versements`, { params: httpParams });
  }

  envoyerVersement(versementId: number): Observable<AdminVersement> {
    return this.http.post<AdminVersement>(`${this.base}/versements/${versementId}/envoyer`, {});
  }

  // ⚠️ TODO backend : POST /api/admin/users/{id}/suspend n'existe pas encore.
  suspendUser(userId: number): Observable<User> {
    // TODO backend : return this.http.post<User>(`${this.base}/users/${userId}/suspend`, {});
    return throwError(() => new Error('API suspension utilisateur non disponible : endpoint à développer.'));
  }
}
