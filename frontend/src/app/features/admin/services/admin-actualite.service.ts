import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Actualite, ActualitePayload } from '../../actualites/actualite.model';

/**
 * Rédaction des actualités.
 *
 * Distinct du service public : celui-ci voit les brouillons, l'autre non.
 */
@Injectable({ providedIn: 'root' })
export class AdminActualiteService {
  private readonly base = `${environment.apiUrl}/admin/actualites`;

  constructor(private readonly http: HttpClient) {}

  lister(): Observable<Actualite[]> {
    return this.http.get<Actualite[]>(this.base);
  }

  creer(payload: ActualitePayload): Observable<Actualite> {
    return this.http.post<Actualite>(this.base, payload);
  }

  modifier(id: number, payload: ActualitePayload): Observable<Actualite> {
    return this.http.put<Actualite>(`${this.base}/${id}`, payload);
  }

  /** Bascule en ligne / hors ligne sans repasser par le formulaire. */
  changerPublication(id: number, publiee: boolean): Observable<Actualite> {
    const action = publiee ? 'publier' : 'depublier';
    return this.http.patch<Actualite>(`${this.base}/${id}/${action}`, {});
  }

  supprimer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
