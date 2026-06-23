import { Component, Input } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { FavorisService } from '../../../core/services/favoris.service';
import { Role } from '../../../core/models/role.enum';
import { Listing } from '../../../features/annonces/models/listing.model';

@Component({
  selector: 'app-favourite-btn',
  templateUrl: './favourite-btn.component.html',
  standalone: false,
})
export class FavouriteBtnComponent {
  @Input({ required: true }) listing!: Listing;
  /** Taille optionnelle : 'sm' | 'md' (défaut) */
  @Input() size: 'sm' | 'md' = 'md';

  constructor(
    public readonly auth: AuthService,
    private readonly favorisService: FavorisService
  ) {}

  get canFavorite(): boolean {
    const user = this.auth.currentUser;
    if (!user) return false;
    return this.auth.hasRole(Role.ACHETEUR) || this.auth.hasRole(Role.VENDEUR);
  }

  get isFav(): boolean {
    return this.favorisService.isFavori(this.listing.id);
  }

  toggle(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    if (!this.canFavorite) return;
    this.favorisService.toggle(this.listing);
  }
}