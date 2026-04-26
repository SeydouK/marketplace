// admin/dashboard-admin/dashboard-admin.component.ts
import { Component, OnInit } from '@angular/core';
import { AdminService, AdminStats, SellerRequest } from '../services/admin.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  standalone: false,
})
export class DashboardAdminComponent implements OnInit {
  stats?: AdminStats;
  sellerRequests: SellerRequest[] = [];
  approvingSellerRequestId?: number;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getStats().subscribe((stats) => {
      this.stats = stats;
    });

    this.loadSellerRequests();
  }

  loadSellerRequests(): void {
    this.adminService.listSellerRequests().subscribe((requests) => {
      this.sellerRequests = requests;
    });
  }

  approveSellerRequest(request: SellerRequest): void {
    if (this.approvingSellerRequestId) {
      return;
    }

    this.approvingSellerRequestId = request.id;
    this.adminService.approveSellerRequest(request.id).subscribe({
      next: () => {
        this.sellerRequests = this.sellerRequests.filter((item) => item.id !== request.id);
        this.approvingSellerRequestId = undefined;
      },
      error: () => {
        this.approvingSellerRequestId = undefined;
      },
    });
  }
}
