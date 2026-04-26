import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../core/services/toast.service';
import { SellerRequest } from './models/seller-request.model';
import { AdminService } from './services/admin.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
  standalone: false,
})
export class AdminHomeComponent implements OnInit {
  sellerRequests: SellerRequest[] = [];
  loading = false;
  approvingRequestId: number | null = null;

  constructor(
    private readonly adminService: AdminService,
    private readonly toast: ToastService
  ) {}

  ngOnInit(): void {
    this.loadSellerRequests();
  }

  loadSellerRequests(): void {
    this.loading = true;
    this.adminService.listSellerRequests().subscribe({
      next: (requests) => {
        this.sellerRequests = requests;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  approve(request: SellerRequest): void {
    if (this.approvingRequestId !== null) {
      return;
    }

    this.approvingRequestId = request.id;
    this.adminService.approveSellerRequest(request.id).subscribe({
      next: () => {
        this.sellerRequests = this.sellerRequests.filter((item) => item.id !== request.id);
        this.approvingRequestId = null;
        this.toast.success(`${request.name} ${request.surname} est maintenant vendeur.`);
      },
      error: () => {
        this.approvingRequestId = null;
      },
    });
  }

  trackByRequestId(_: number, request: SellerRequest): number {
    return request.id;
  }

  get pendingCount(): number {
    return this.sellerRequests.length;
  }
}
