import { Component, OnInit } from '@angular/core';
import { User } from '../../../core/models/user.model';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard-proprietaire',
  templateUrl: './dashboard-proprietaire.component.html',
  styleUrls: ['./dashboard-proprietaire.component.css'],
  standalone: false,
})
export class DashboardProprietaireComponent implements OnInit {
  profile?: User;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.me().subscribe((profile) => {
      this.profile = profile;
    });
  }
}
