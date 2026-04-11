// anader/dashboard-anader/dashboard-anader.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';
import { AnaderService, AnaderStats } from '../services/anader.service';

@Component({
  selector: 'app-dashboard-anader',
  templateUrl: './dashboard-anader.component.html',
  standalone: false,
})
export class DashboardAnaderComponent implements OnInit {
  profile?: User | null;
  stats?: AnaderStats;

  constructor(
    private auth: AuthService,
    private anaderService: AnaderService
  ) {}

  ngOnInit(): void {
    this.profile = this.auth.currentUser;
    this.anaderService.getStats().subscribe((s) => (this.stats = s));
  }
}
