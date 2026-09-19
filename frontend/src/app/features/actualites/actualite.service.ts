import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  Actualite,
  ActualiteResume,
  COULEURS_CATEGORIE,
  LIBELLES_CATEGORIE,
  ActualiteCategorie,
} from './actualite.model';

const STORAGE_KEY = 'actualites_last_seen';

/**
 * Lecture des actualités publiées.
 *
 * Les articles vivaient auparavant dans un tableau codé en dur ici même :
 * publier demandait un déploiement. Ils viennent désormais de l'API, alimentée
 * par l'écran d'administration.
 */
@Injectable({ providedIn: 'root' })
export class ActualiteService {
  private readonly base = `${environment.apiUrl}/actualites`;

  /** Date de la dernière visite de la rubrique, conservée d'une session à l'autre. */
  private lastSeen: Date = this.loadLastSeen();

  private readonly _hasNewActualites = new BehaviorSubject<boolean>(false);
  readonly hasNewActualites$: Observable<boolean> = this._hasNewActualites.asObservable();

  private readonly _hasNewServices = new BehaviorSubject<boolean>(true);
  readonly hasNewServices$: Observable<boolean> = this._hasNewServices.asObservable();

  constructor(private readonly http: HttpClient) {
    this.rafraichirPastille();
  }

  getAll(): Observable<ActualiteResume[]> {
    return this.http.get<ActualiteResume[]>(this.base);
  }

  getById(id: number): Observable<Actualite> {
    return this.http.get<Actualite>(`${this.base}/${id}`);
  }

  /**
   * Interroge la date du dernier article en ligne pour décider de la pastille.
   *
   * Une requête dédiée plutôt que la liste complète : l'en-tête est monté sur
   * toutes les pages, y compris pour un visiteur qui n'ouvrira jamais la
   * rubrique. En cas d'échec, pas de pastille — une erreur réseau ne doit pas
   * annoncer une nouveauté qui n'existe peut-être pas.
   */
  rafraichirPastille(): void {
    this.http
      .get<{ datePublication?: string }>(`${this.base}/derniere-publication`)
      .pipe(catchError(() => of({} as { datePublication?: string })))
      .subscribe((reponse) => {
        const derniere = reponse?.datePublication ? new Date(reponse.datePublication) : null;
        this._hasNewActualites.next(!!derniere && derniere > this.lastSeen);
      });
  }

  /** Appelé quand l'utilisateur ouvre la rubrique Actualités. */
  markAllAsSeen(): void {
    this.lastSeen = new Date();
    localStorage.setItem(STORAGE_KEY, this.lastSeen.toISOString());
    this._hasNewActualites.next(false);
  }

  /** Appelé quand l'utilisateur visite Services. */
  markServicesAsSeen(): void {
    this._hasNewServices.next(false);
  }

  private loadLastSeen(): Date {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? new Date(stored) : new Date(0);
  }

  getCategorieLabel(cat: string): string {
    return LIBELLES_CATEGORIE[cat as ActualiteCategorie] ?? cat;
  }

  getCategorieColor(cat: string): string {
    return COULEURS_CATEGORIE[cat as ActualiteCategorie] ?? 'bg-gray-100 text-gray-700';
  }
}
