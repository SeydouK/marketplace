import { Component, OnInit } from '@angular/core';
import { Listing } from '../../annonces/models/listing.model';
import { ListingService } from '../../annonces/services/listing.service';

@Component({
  selector: 'app-mes-annonces',
  templateUrl: './mes-annonces.component.html',
  styleUrls: ['./mes-annonces.component.css'],
  standalone: false,
})
export class MesAnnoncesComponent implements OnInit {
  listings: Listing[] = [];

  constructor(private listingService: ListingService) {}

  ngOnInit(): void {
    this.listingService.myListings().subscribe((listings) => {
      this.listings = listings;
    });
  }
}
