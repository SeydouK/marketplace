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
    { label: 'Toutes', value: 'all' },
    { label: 'Disponibles', value: 'DISPONIBLE' },
    { label: 'Indisponibles', value: 'INDISPONIBLE' },
    { label: 'Vendues', value: 'VENDU' },
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
    this.runListingAction(listing, () => this.adminService.approveListing(listing.id));
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
      DISPONIBLE: 'ui-badge--success',
      INDISPONIBLE: 'ui-badge--warning',
      VENDU: '',
    };
    return status ? (map[status] ?? '') : '';
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
