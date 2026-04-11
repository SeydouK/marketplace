// admin/gestion-utilisateurs/gestion-utilisateurs.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { User } from '../../../core/models/user.model';
import { Role } from '../../../core/models/role.enum';

@Component({
  selector: 'app-gestion-utilisateurs',
  templateUrl: './gestion-utilisateurs.component.html',
  standalone: false,
})
export class GestionUtilisateursComponent implements OnInit {
  users: User[] = [];
  activeFilter = 'all';
  currentPage = 0;
  totalPages = 1;

  filters = [
    { label: 'Tous', value: 'all' },
    { label: 'KYC en attente', value: 'pending-kyc' },
    { label: 'Vendeurs', value: Role.VENDEUR },
    { label: 'Acheteurs', value: Role.ACHETEUR },
  ];

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['filter']) {
        this.activeFilter = params['filter'];
      }
      this.loadUsers();
    });
  }

  loadUsers(): void {
    this.adminService
      .getUsers({ filter: this.activeFilter, page: this.currentPage, size: 20 })
      .subscribe((page) => {
        this.users = page.content;
        this.totalPages = page.totalPages;
      });
  }

  setFilter(filter: string): void {
    this.activeFilter = filter;
    this.currentPage = 0;
    this.loadUsers();
  }

  validateKyc(user: User): void {
    if (!user.id) return;
    this.adminService.validateKyc(user.id).subscribe(() => this.loadUsers());
  }

  rejectKyc(user: User): void {
    const reason = prompt('Motif du rejet :');
    if (!reason || !user.id) return;
    this.adminService.rejectKyc(user.id, reason).subscribe(() => this.loadUsers());
  }

  changeRole(user: User): void {
    const roles = Object.values(Role).join(', ');
    const newRole = prompt(`Nouveau rôle (${roles}) :`) as Role;
    if (!newRole || !user.id) return;
    this.adminService.updateUserRole(user.id, newRole).subscribe(() => this.loadUsers());
  }

  prevPage(): void {
    if (this.currentPage > 0) { this.currentPage--; this.loadUsers(); }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) { this.currentPage++; this.loadUsers(); }
  }

  getRoleBadgeClass(role?: Role): string {
    const map: Partial<Record<Role, string>> = {
      [Role.ADMIN]: 'bg-red-100 text-red-800',
      [Role.ADMINISTRATEUR]: 'bg-red-100 text-red-800',
      [Role.VENDEUR]: 'bg-blue-100 text-blue-800',
      [Role.VETERINAIRE]: 'bg-amber-100 text-amber-800',
      [Role.AGENT_ANADER]: 'bg-green-100 text-green-800',
      [Role.ACHETEUR]: 'bg-gray-100 text-gray-700',
      [Role.USER]: 'bg-gray-100 text-gray-700',
    };
    return role ? (map[role] ?? 'bg-gray-100 text-gray-700') : 'bg-gray-100 text-gray-700';
  }

  getKycBadgeClass(status?: string): string {
    const map: Record<string, string> = {
      APPROVED: 'bg-green-100 text-green-800',
      PENDING: 'bg-yellow-100 text-yellow-800',
      REJECTED: 'bg-red-100 text-red-800',
    };
    return status ? (map[status] ?? 'bg-gray-100 text-gray-600') : 'bg-gray-100 text-gray-600';
  }
}
