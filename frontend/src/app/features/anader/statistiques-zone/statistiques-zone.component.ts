// anader/statistiques-zone/statistiques-zone.component.ts
import { Component, OnInit } from '@angular/core';
import { AnaderService } from '../services/anader.service';

export interface ZoneStats {
  activeFarmers: number;
  totalAnimals: number;
  complianceRate: number;
  rfidThisMonth: number;
  speciesBreakdown: { name: string; count: number; percent: number }[];
}

export interface RecentFarmer {
  name: string;
  village: string;
  animalsCount: number;
  isCompliant: boolean;
  registeredAt: string;
}

@Component({
  selector: 'app-statistiques-zone',
  templateUrl: './statistiques-zone.component.html',
  standalone: false,
})
export class StatistiquesZoneComponent implements OnInit {
  stats?: ZoneStats;
  recentFarmers: RecentFarmer[] = [];

  constructor(private anaderService: AnaderService) {}

  ngOnInit(): void {
    // TODO: appels API dédiés aux stats zone et éleveurs récents
    // this.anaderService.getZoneStats().subscribe(...)
    // this.anaderService.getRecentFarmers().subscribe(...)
  }
}
