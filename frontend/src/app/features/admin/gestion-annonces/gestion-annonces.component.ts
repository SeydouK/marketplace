import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminListing, AdminListingStatus, AdminService } from '../services/admin.service';

@Component({
  selector: 'app-gestion-annonces',
  templateUrl: './gestion-annonces.component.html',
  standalone: false,
})
export class GestionAnnoncesComponent implements OnInit {
  listings: AdminListing[] = [];
  activeFilter: AdminListingStatus | 'all' = 'all';
  currentPage = 0;
  totalPages = 1;
  totalElements = 0;
  loading = false;
  updatingListingId?: string;

  readonly filters: { label: string; value: AdminListingStatus | 'all' }[] = [
    { label: 'Toutes',              value: 'all' },
    { label: 'Disponibles',         value: 'DISPONIBLE' },
    { label: 'Indisponibles',       value: 'INDISPONIBLE' },
    { label: 'Attente vétérinaire', value: 'EN_ATTENTE' },
    { label: 'Vendues',             value: 'VENDU' },
  ];

  constructor(private readonly adminService: AdminService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.adminService
      .getListings({ status: this.activeFilter, page: this.currentPage, size: 20 })
      .subscribe({
        next: (page) => {
          this.listings = page.content;
          this.totalPages = page.totalPages;
          this.totalElements = page.totalElements;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
  }

  setFilter(value: AdminListingStatus | 'all'): void {
    this.activeFilter = value;
    this.currentPage = 0;
    this.load();
  }

  approve(listing: AdminListing): void {
    if (!listing.documentsValides) {
      return;
    }
    this.runListingAction(listing, () => this.adminService.approveListing(listing.id));
  }

  canPublish(listing: AdminListing): boolean {
    return listing.status === 'INDISPONIBLE' && listing.documentsValides;
  }

  suspend(listing: AdminListing): void {
    this.runListingAction(listing, () => this.adminService.suspendListing(listing.id));
  }

  prevPage(): void {
    if (this.currentPage <= 0) {
      return;
    }

    this.currentPage--;
    this.load();
  }

  nextPage(): void {
    if (this.currentPage >= this.totalPages - 1) {
      return;
    }

    this.currentPage++;
    this.load();
  }

  getStatusBadge(status?: string): string {
    const map: Record<string, string> = {
      DISPONIBLE:              'bg-green-100 text-green-800',
      INDISPONIBLE:            'bg-amber-100 text-amber-800',
      EN_ATTENTE_VALIDATION:   'bg-blue-100 text-blue-800',
      VENDU:                   'bg-gray-100 text-gray-600',
    };
    return status ? (map[status] ?? 'bg-gray-100 text-gray-600') : 'bg-gray-100 text-gray-600';
  }

  trackByListingId(_: number, listing: AdminListing): string {
    return listing.id;
  }

  private runListingAction(listing: AdminListing, action: () => Observable<AdminListing>): void {
    this.updatingListingId = listing.id;
    action().subscribe({
      next: () => this.load(),
      error: () => {
        this.updatingListingId = undefined;
      },
      complete: () => {
        this.updatingListingId = undefined;
      },
    });
  }
}
