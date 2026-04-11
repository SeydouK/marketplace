// admin/dashboard-admin/dashboard-admin.component.ts
import { Component, OnInit } from '@angular/core';
import { AdminService, AdminStats } from '../services/admin.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  standalone: false,
})
export class DashboardAdminComponent implements OnInit {
  stats?: AdminStats;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getStats().subscribe((stats) => {
      this.stats = stats;
    });
  }
}
