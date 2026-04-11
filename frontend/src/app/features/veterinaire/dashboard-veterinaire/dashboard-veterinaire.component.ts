// veterinaire/dashboard-veterinaire/dashboard-veterinaire.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';
import { VeterinaireService, VetStats } from '../services/veterinaire.service';

@Component({
  selector: 'app-dashboard-veterinaire',
  templateUrl: './dashboard-veterinaire.component.html',
  standalone: false,
})
export class DashboardVeterinaireComponent implements OnInit {
  profile?: User | null;
  stats?: VetStats;

  constructor(
    private auth: AuthService,
    private vetService: VeterinaireService
  ) {}

  ngOnInit(): void {
    this.profile = this.auth.currentUser;
    this.vetService.getStats().subscribe((s) => (this.stats = s));
  }
}
