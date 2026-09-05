// transporteur/services/transporteur.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export type TypeVehicule = 'BETAILLERE' | 'CAMION' | 'PICKUP' | 'TRICYCLE' | 'AUTRE';

export type StatutAffectation = 'PROPOSEE' | 'ACCEPTEE' | 'REFUSEE' | 'ANNULEE';

export type KycStatus = 'PENDING' | 'CNI_UPLOADED' | 'CNI_VERIFIED' | 'VALIDATED' | 'REJECTED';

/** Où en est le dossier d'un transporteur — pour lui comme pour l'administration. */
export interface DossierTransporteur {
  id: number;
  nom: string;
  email: string;
  telephone?: string;
  kycStatus: KycStatus;
  permisUrl?: string;
  permisValide: boolean;
  permisValideAt?: string;
  typeVehicule?: TypeVehicule;
  capaciteTetes?: number;
  /** Identité vérifiée ET permis validé : la seule question qui compte. */
  habilite: boolean;
  /** Ce qui lui manque, formulé pour lui. Absent quand le dossier est complet. */
  prochaineEtape?: string;
}

export interface TransporteurDisponible {
  id: number;
  nom: string;
  telephone?: string;
  typeVehicule?: TypeVehicule;
  capaciteTetes?: number;
}

/**
 * Une course, vue par le transporteur.
 * Ni prix, ni montant, ni code de remise : il transporte, il ne négocie pas.
 */
export interface Course {
  remiseId: number;
  commandeId: number;
  statut: StatutAffectation;
  proposeeLe: string;
  animaux: string[];
  articleIds: number[];
  lieuChargement?: string;
  vendeurNom?: string;
  vendeurTelephone?: string;
  adresseLigne?: string;
  adresseVille?: string;
  adresseIndications?: string;
  destinataireNom?: string;
  destinataireTelephone?: string;
  destinationLatitude?: number;
  destinationLongitude?: number;
  departAt?: string;
  termine: boolean;
}

@Injectable({ providedIn: 'root' })
export class TransporteurService {
  private base = `${environment.apiUrl}/transporteurs`;

  constructor(private http: HttpClient) {}

  // ── Dossier ────────────────────────────────────────────────────────────────

  monDossier(): Observable<DossierTransporteur> {
    return this.http.get<DossierTransporteur>(`${this.base}/dossier`);
  }

  deposerPermis(fichier: File): Observable<DossierTransporteur> {
    const formData = new FormData();
    formData.append('file', fichier);
    return this.http.post<DossierTransporteur>(`${this.base}/dossier/permis`, formData);
  }

  declarerVehicule(type: TypeVehicule, capaciteTetes?: number): Observable<DossierTransporteur> {
    return this.http.put<DossierTransporteur>(`${this.base}/dossier/vehicule`, {
      type,
      capaciteTetes: capaciteTetes ?? null,
    });
  }

  // ── Courses ────────────────────────────────────────────────────────────────

  mesCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.base}/mes-courses`);
  }

  accepter(remiseId: number): Observable<Course> {
    return this.http.post<Course>(`${this.base}/courses/${remiseId}/accepter`, {});
  }

  refuser(remiseId: number, motif?: string): Observable<void> {
    return this.http.post<void>(`${this.base}/courses/${remiseId}/refuser`, { motif: motif ?? null });
  }

  // ── Côté vendeur ───────────────────────────────────────────────────────────

  disponibles(): Observable<TransporteurDisponible[]> {
    return this.http.get<TransporteurDisponible[]>(`${this.base}/disponibles`);
  }

  proposerCourse(remiseId: number, transporteurId: number): Observable<void> {
    return this.http.post<void>(`${this.base}/courses/${remiseId}/proposer`, { transporteurId });
  }

  annulerProposition(remiseId: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/courses/${remiseId}/proposition`);
  }
}

/** Libellés des véhicules, partagés par tous les écrans. */
export const LIBELLES_VEHICULE: Record<TypeVehicule, string> = {
  BETAILLERE: 'Bétaillère',
  CAMION: 'Camion',
  PICKUP: 'Pick-up',
  TRICYCLE: 'Tricycle',
  AUTRE: 'Autre véhicule',
};
