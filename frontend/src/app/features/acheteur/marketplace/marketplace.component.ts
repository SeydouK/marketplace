// acheteur/marketplace/marketplace.component.ts
import { Component, OnInit } from '@angular/core';
import { Listing } from '../../annonces/models/listing.model';
import { ListingService } from '../../annonces/services/listing.service';

interface MarketplaceFilters {
  species: string;
  region: string;
  maxPrice: number | null;
  certified: string;
}

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  standalone: false,
})
export class MarketplaceComponent implements OnInit {
  listings: Listing[] = [];
  loading = false;
  total = 0;
  currentPage = 0;
  totalPages = 1;
  pageSize = 12;

  filters: MarketplaceFilters = {
    species: '',
    region: '',
    maxPrice: null,
    certified: '',
  };

  constructor(private listingService: ListingService) {}

  ngOnInit(): void {
    this.search();
  }

  search(): void {
    this.loading = true;
    this.currentPage = 0;
    this.loadListings();
  }

  loadListings(): void {
    this.loading = true;
    this.listingService
      .searchListings({
        ...this.filters,
        page: this.currentPage,
        size: this.pageSize,
      })
      .subscribe({
        next: (result) => {
          this.listings = result.content;
          this.total = result.totalElements;
          this.totalPages = result.totalPages;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
  }

  resetFilters(): void {
    this.filters = { species: '', region: '', maxPrice: null, certified: '' };
    this.search();
  }

  prevPage(): void {
    if (this.currentPage > 0) { this.currentPage--; this.loadListings(); }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) { this.currentPage++; this.loadListings(); }
  }
}
