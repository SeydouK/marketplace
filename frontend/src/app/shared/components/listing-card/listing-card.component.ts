// shared/components/listing-card/listing-card.component.ts
import { Component, Input } from '@angular/core';
import { Listing } from '../../../features/annonces/models/listing.model';
import { FavorisService } from '../../../core/services/favoris.service';
import { AuthService } from '../../../core/services/auth.service';
import { Role } from '../../../core/models/role.enum';

@Component({
  selector: 'app-listing-card',
  templateUrl: './listing-card.component.html',
  styleUrls: ['./listing-card.component.css'],
  standalone: false,
})
export class ListingCardComponent {
  @Input({ required: true }) listing!: Listing;

  constructor(private readonly favorisService: FavorisService, private auth: AuthService) {}

  get isFavori(): boolean {
    return this.favorisService.isFavori(this.listing.id);
  }

  get canFavorite(): boolean {
    const user = this.auth.currentUser;
    if (!user) return false;
    return this.auth.hasRole(Role.ACHETEUR) || this.auth.hasRole(Role.VENDEUR);
  }

  toggleFavori(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.favorisService.toggle(this.listing);
  }
}