import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService, AdminUser } from '../services/admin.service';
import { Role } from '../../../core/models/role.enum';

@Component({
  selector: 'app-gestion-utilisateurs',
  templateUrl: './gestion-utilisateurs.component.html',
  standalone: false,
})
export class GestionUtilisateursComponent implements OnInit {
  users: AdminUser[] = [];
  activeFilter = 'all';
  currentPage = 0;
  totalPages = 1;
  totalElements = 0;
  loading = false;
  updatingUserId?: number;

  readonly roles = Object.values(Role);
  readonly filters = [
    { label: 'Tous', value: 'all' },
    { label: 'KYC en attente', value: 'pending-kyc' },
    { label: 'Vendeurs', value: Role.VENDEUR },
    { label: 'Acheteurs', value: Role.USER },
  ];

  constructor(
    private readonly adminService: AdminService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.activeFilter = params['filter'] || 'all';
      this.currentPage = 0;
      this.loadUsers();
    });
  }

  loadUsers(): void {
    this.loading = true;
    this.adminService
      .getUsers({ filter: this.activeFilter, page: this.currentPage, size: 20 })
      .subscribe({
        next: (page) => {
          this.users = page.content;
          this.totalPages = page.totalPages;
          this.totalElements = page.totalElements;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
  }

  setFilter(filter: string): void {
    this.activeFilter = filter;
    this.currentPage = 0;
    this.loadUsers();
  }

  validateKyc(user: AdminUser): void {
    this.runUserAction(user, () => this.adminService.validateKyc(user.id));
  }

  rejectKyc(user: AdminUser): void {
    const reason = prompt('Motif du rejet :');
    if (!reason) {
      return;
    }

    this.runUserAction(user, () => this.adminService.rejectKyc(user.id, reason));
  }

  changeRole(user: AdminUser, role: Role): void {
    if (role === user.role) {
      return;
    }

    this.runUserAction(user, () => this.adminService.updateUserRole(user.id, role));
  }

  prevPage(): void {
    if (this.currentPage <= 0) {
      return;
    }

    this.currentPage--;
    this.loadUsers();
  }

  nextPage(): void {
    if (this.currentPage >= this.totalPages - 1) {
      return;
    }

    this.currentPage++;
    this.loadUsers();
  }

  getRoleBadgeClass(role?: Role): string {
    const map: Partial<Record<Role, string>> = {
      [Role.ADMIN]: 'bg-red-100 text-red-800',
      [Role.ADMINISTRATEUR]: 'bg-red-100 text-red-800',
      [Role.VENDEUR]: 'bg-blue-100 text-blue-800',
      [Role.VETERINAIRE]: 'bg-amber-100 text-amber-800',
      [Role.AGENT_ANADER]: 'bg-green-100 text-green-800',
      [Role.ACHETEUR]: 'bg-[#F6F1E7] text-gray-700',
      [Role.USER]: 'bg-[#F6F1E7] text-gray-700',
    };
    return role ? (map[role] ?? 'bg-[#F6F1E7] text-gray-700') : 'bg-[#F6F1E7] text-gray-700';
  }

  getKycBadgeClass(status?: string | null): string {
    const map: Record<string, string> = {
      VALIDATED: 'bg-green-100 text-green-800',
      CNI_VERIFIED: 'bg-blue-100 text-blue-800',
      CNI_UPLOADED: 'bg-blue-100 text-blue-800',
      PENDING: 'bg-yellow-100 text-yellow-800',
      REJECTED: 'bg-red-100 text-red-800',
    };
    return status ? (map[status] ?? 'bg-[#F6F1E7] text-gray-600') : 'bg-[#F6F1E7] text-gray-600';
  }

  canModerateKyc(status?: string | null): boolean {
    return !!status && ['PENDING', 'CNI_UPLOADED', 'CNI_VERIFIED'].includes(status);
  }

  trackByUserId(_: number, user: AdminUser): number {
    return user.id;
  }

  private runUserAction(user: AdminUser, action: () => Observable<AdminUser>): void {
    this.updatingUserId = user.id;
    action().subscribe({
      next: () => this.loadUsers(),
      error: () => {
        this.updatingUserId = undefined;
      },
      complete: () => {
        this.updatingUserId = undefined;
      },
    });
  }
}
