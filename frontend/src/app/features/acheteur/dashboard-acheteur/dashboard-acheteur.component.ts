// acheteur/dashboard-acheteur/dashboard-acheteur.component.ts
import { Component, OnInit } from '@angular/core';
import { User } from '../../../core/models/user.model';
import { DashboardService } from '../../profil/services/dashboard.service';

@Component({
  selector: 'app-dashboard-acheteur',
  templateUrl: './dashboard-acheteur.component.html',
  standalone: false,
})
export class DashboardAcheteurComponent implements OnInit {
  profile?: User;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.me().subscribe((profile) => {
      this.profile = profile;
    });
  }

  get activeOrdersCount(): number {
    return this.profile?.activeOrdersCount ?? 0;
  }

  get completedOrdersCount(): number {
    return this.profile?.completedOrdersCount ?? 0;
  }
}
