// admin/gestion-annonces/gestion-annonces.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Listing } from '../../annonces/models/listing.model';

@Component({
  selector: 'app-gestion-annonces',
  templateUrl: './gestion-annonces.component.html',
  standalone: false,
})
export class GestionAnnoncesComponent implements OnInit {
  listings: Listing[] = [];
  activeFilter = 'all';

  filters = [
    { label: 'Toutes', value: 'all' },
    { label: 'En attente', value: 'EN_ATTENTE' },
    { label: 'Disponibles', value: 'DISPONIBLE' },
    { label: 'Signalées', value: 'FLAGGED' },
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    const params = this.activeFilter !== 'all' ? `?status=${this.activeFilter}` : '';
    this.http
      .get<Listing[]>(`${environment.apiUrl}/admin/annonces${params}`)
      .subscribe((data) => (this.listings = data));
  }

  setFilter(value: string): void {
    this.activeFilter = value;
    this.load();
  }

  approve(listing: Listing): void {
    this.http
      .post(`${environment.apiUrl}/admin/annonces/${listing.id}/approuver`, {})
      .subscribe(() => this.load());
  }

  suspend(listing: Listing): void {
    this.http
      .post(`${environment.apiUrl}/admin/annonces/${listing.id}/suspendre`, {})
      .subscribe(() => this.load());
  }

  getSanitaryBadge(status?: string): string {
    const map: Record<string, string> = {
      DISPONIBLE: 'bg-green-100 text-green-800',
      EN_ATTENTE: 'bg-amber-100 text-amber-800',
      EN_ATTENTE_VALIDATION: 'bg-blue-100 text-blue-800',
      INDISPONIBLE: 'bg-gray-100 text-gray-600',
    };
    return status ? (map[status] ?? 'bg-gray-100 text-gray-600') : 'bg-gray-100 text-gray-600';
  }
}
