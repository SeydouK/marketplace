// features/favoris/favoris.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Listing } from '../annonces/models/listing.model';
import { FavorisService } from '../../core/services/favoris.service';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.component.html',
 /* styleUrls: ['./favoris.component.css'],*/
  standalone: false,
})
export class FavorisComponent implements OnInit, OnDestroy {
  favoris: Listing[] = [];
  private sub?: Subscription;

  constructor(private readonly favorisService: FavorisService) {}

  ngOnInit(): void {
    this.sub = this.favorisService.favoris$.subscribe((f) => (this.favoris = f));
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  remove(listing: Listing): void {
    this.favorisService.remove(listing.id);
  }

  clearAll(): void {
    this.favorisService.clearAll();
  }

  trackByListing(_: number, listing: Listing): string {
    return listing.id;
  }
}