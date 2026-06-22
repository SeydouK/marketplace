import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { FavouritesService } from '../../../core/services/favoris.service';

@Component({
  selector: 'app-favourite-btn',
  templateUrl: './favourite-btn.component.html',
  standalone: false,
})
export class FavouriteBtnComponent {
  @Input({ required: true }) listingId!: string;
  /** Taille optionnelle : 'sm' | 'md' (défaut) */
  @Input() size: 'sm' | 'md' = 'md';

  loading = false;

  constructor(
    public readonly auth: AuthService,
    private readonly favourites: FavouritesService
  ) {}

  get isFav(): boolean {
    return this.favourites.isFavourite(this.listingId);
  }

  toggle(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    if (!this.auth.isLoggedIn()) {
      // Redirige vers la connexion si non connecté — géré par le parent si besoin
      return;
    }

    if (this.loading) return;
    this.loading = true;

    this.favourites.toggle(this.listingId).subscribe({
      next: () => (this.loading = false),
      error: () => (this.loading = false),
    });
  }
}