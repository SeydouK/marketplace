import { Injectable } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { SKIP_GLOBAL_ERROR } from '../../../core/interceptors/error.interceptor';
import { Panier, PanierItem,
  PanierParVendeur,
  AjouterAuPanierRequest,
  ModifierQuantiteRequest  } from '../models/panier.model';
@Injectable({ providedIn: 'root' })
export class PanierService {

  private readonly apiUrl = `${environment.apiUrl}/panier`;

  private panierSubject = new BehaviorSubject<Panier | null>(null);
  public panier$ = this.panierSubject.asObservable();

  private countSubject = new BehaviorSubject<number>(0);
  public count$ = this.countSubject.asObservable();

  constructor(private http: HttpClient) {}

  chargerPanier(): Observable<Panier> {
    return this.http.get<Panier>(this.apiUrl).pipe(
      tap(panier => {
        this.panierSubject.next(panier);
        this.countSubject.next(panier.nombreArticles);
      })
    );
  }

  rafraichirCount(): Observable<{ count: number }> {
    // Appel d'arrière-plan (badge du menu) : on n'affiche pas de toast global
    // en cas d'échec, le composant gère/ignore l'erreur silencieusement.
    return this.http
      .get<{ count: number }>(`${this.apiUrl}/count`, {
        context: new HttpContext().set(SKIP_GLOBAL_ERROR, true),
      })
      .pipe(tap(res => this.countSubject.next(res.count)));
  }

  // animalId est un string (UUID) côté frontend
  ajouterArticle(animalId: string, quantite = 1): Observable<Panier> {
    const body: AjouterAuPanierRequest = { animalId, quantite };
    return this.http.post<Panier>(`${this.apiUrl}/items`, body).pipe(
      tap(panier => {
        this.panierSubject.next(panier);
        this.countSubject.next(panier.nombreArticles);
      })
    );
  }

  modifierQuantite(itemId: number, quantite: number): Observable<Panier> {
    const body: ModifierQuantiteRequest = { quantite };
    return this.http.put<Panier>(`${this.apiUrl}/items/${itemId}`, body).pipe(
      tap(panier => {
        this.panierSubject.next(panier);
        this.countSubject.next(panier.nombreArticles);
      })
    );
  }

  supprimerArticle(itemId: number): Observable<Panier> {
    return this.http.delete<Panier>(`${this.apiUrl}/items/${itemId}`).pipe(
      tap(panier => {
        this.panierSubject.next(panier);
        this.countSubject.next(panier.nombreArticles);
      })
    );
  }

  viderPanier(): Observable<void> {
    return this.http.delete<void>(this.apiUrl).pipe(
      tap(() => {
        this.panierSubject.next(null);
        this.countSubject.next(0);
      })
    );
  }

  getItemsParVendeur(panier: Panier): PanierParVendeur[] {
    const map = new Map<number, PanierParVendeur>();
    for (const item of panier.items) {
      if (!map.has(item.vendeurId)) {
        map.set(item.vendeurId, {
          vendeurId: item.vendeurId,
          vendeurNom: item.vendeurNom,
          items: [],
          sousTotal: 0
        });
      }
      const groupe = map.get(item.vendeurId)!;
      groupe.items.push(item);
      groupe.sousTotal += item.sousTotal;
    }
    return Array.from(map.values());
  }

  get panierActuel(): Panier | null { return this.panierSubject.value; }
  get countActuel(): number { return this.countSubject.value; }
}