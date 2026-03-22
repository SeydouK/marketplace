import { Component, Input } from '@angular/core';
import { Listing } from '../../../features/annonces/models/listing.model';

@Component({
  selector: 'app-city-section',
  templateUrl: './city-section.component.html',
  styleUrls: ['./city-section.component.css'],
  standalone: false,
})
export class CitySectionComponent {
  @Input({ required: true }) city!: string;
  @Input() listings: Listing[] = [];

  trackByListing(_: number, listing: Listing): number {
    return listing.id;
  }
}
