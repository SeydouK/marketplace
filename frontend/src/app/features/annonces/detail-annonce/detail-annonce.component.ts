import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Listing } from '../models/listing.model';
import { ListingService } from '../services/listing.service';

@Component({
  selector: 'app-detail-annonce',
  templateUrl: './detail-annonce.component.html',
  styleUrls: ['./detail-annonce.component.css'],
  standalone: false,
})
export class DetailAnnonceComponent implements OnInit {
  listing?: Listing;
  loading = true;
  readonly fallbackDescription = "Aucune description n'a été fournie pour ce dossier animal.";

  constructor(
    private route: ActivatedRoute,
    private listingService: ListingService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.listingService.get(id).subscribe({
        next: (listing) => {
          this.listing = listing;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
      return;
    }

    this.loading = false;
  }

  get canEdit(): boolean {
    return !!this.listing && this.auth.currentUser?.id === this.listing.sellerId;
  }
}
