import { Component, OnInit } from '@angular/core';
import { User } from '../../../core/models/user.model';
import { AuthService } from '../../../core/services/auth.service';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard-proprietaire',
  templateUrl: './dashboard-proprietaire.component.html',
  styleUrls: ['./dashboard-proprietaire.component.css'],
  standalone: false,
})
export class DashboardProprietaireComponent implements OnInit {
  profile?: User;

  constructor(
    private dashboardService: DashboardService,
    private readonly auth: AuthService
  ) {}

  ngOnInit(): void {
    this.dashboardService.me().subscribe((profile) => {
      this.profile = profile;
    });
  }

  get animalsCount(): number {
    return this.profile?.animalsCount ?? 0;
  }

  get pendingHealthValidationCount(): number {
    return this.profile?.pendingHealthValidationCount ?? 0;
  }

  get canAccessHealthValidation(): boolean {
    return this.auth.canAccessHealthValidation;
  }
}
