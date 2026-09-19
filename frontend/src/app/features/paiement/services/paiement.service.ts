import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Commande } from '../models/commande.model';

@Injectable({ providedIn: 'root' })
export class PaiementService {

  private readonly apiUrl = `${environment.apiUrl}/paiements`;

  constructor(private http: HttpClient) {}

  creerCommande(): Observable<Commande> {
    return this.http.post<Commande>(`${this.apiUrl}/commandes`, {});
  }

  getCommande(id: number): Observable<Commande> {
    return this.http.get<Commande>(`${this.apiUrl}/commandes/${id}`);
  }
}
