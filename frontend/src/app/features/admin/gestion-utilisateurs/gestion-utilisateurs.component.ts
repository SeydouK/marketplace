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
      [Role.ADMIN]: 'ui-badge--danger',
      [Role.ADMINISTRATEUR]: 'ui-badge--danger',
      [Role.VENDEUR]: 'ui-badge--info',
      [Role.VETERINAIRE]: 'ui-badge--warning',
      [Role.AGENT_ANADER]: 'ui-badge--success',
      [Role.ACHETEUR]: '',
      [Role.USER]: '',
    };
    return role ? (map[role] ?? '') : '';
  }

  getKycBadgeClass(status?: string | null): string {
    const map: Record<string, string> = {
      VALIDATED: 'ui-badge--success',
      CNI_VERIFIED: 'ui-badge--info',
      CNI_UPLOADED: 'ui-badge--info',
      PENDING: 'ui-badge--warning',
      REJECTED: 'ui-badge--danger',
    };
    return status ? (map[status] ?? '') : '';
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
