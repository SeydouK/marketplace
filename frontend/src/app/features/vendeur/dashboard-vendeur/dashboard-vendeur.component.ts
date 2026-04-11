// vendeur/dashboard-vendeur/dashboard-vendeur.component.ts
import { Component, OnInit } from '@angular/core';
import { User } from '../../../core/models/user.model';
import { AuthService } from '../../../core/services/auth.service';
import { DashboardService } from '../../profil/services/dashboard.service';

@Component({
  selector: 'app-dashboard-vendeur',
  templateUrl: './dashboard-vendeur.component.html',
  standalone: false,
})
export class DashboardVendeurComponent implements OnInit {
  profile?: User;

  constructor(
    private dashboardService: DashboardService,
    private auth: AuthService
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
