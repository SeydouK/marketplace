// vendeur/mes-annonces/mes-annonces.component.ts
import { Component, OnInit } from '@angular/core';
import { Listing } from '../../annonces/models/listing.model';
import { ListingService } from '../../annonces/services/listing.service';

type AnimalStatus = 'ALL' | 'DISPONIBLE' | 'EN_ATTENTE' | 'VENDU' | 'INDISPONIBLE';

@Component({
  selector: 'app-mes-annonces',
  templateUrl: './mes-annonces.component.html',
  standalone: false,
})
export class MesAnnoncesComponent implements OnInit {
  listings: Listing[] = [];
  activeFilter: AnimalStatus = 'ALL';

  statusFilters: { label: string; value: AnimalStatus }[] = [
    { label: 'Toutes', value: 'ALL' },
    { label: 'Disponibles', value: 'DISPONIBLE' },
    { label: 'En attente', value: 'EN_ATTENTE' },
    { label: 'Vendus', value: 'VENDU' },
    { label: 'Indisponibles', value: 'INDISPONIBLE' },
  ];

  constructor(private listingService: ListingService) {}

  ngOnInit(): void {
    this.listingService.myListings().subscribe((listings) => {
      this.listings = listings;
    });
  }

  setFilter(filter: AnimalStatus): void {
    this.activeFilter = filter;
  }

  get filteredListings(): Listing[] {
    if (this.activeFilter === 'ALL') return this.listings;
    return this.listings.filter((l) => l.status === this.activeFilter);
  }

  deleteListing(listingId: string): void {
    if (!confirm('Supprimer cette annonce ?')) return;
    this.listingService.deleteListing(Number(listingId)).subscribe(() => {
        this.listings = this.listings.filter((l) => l.id !== listingId);
    });
  }
}
