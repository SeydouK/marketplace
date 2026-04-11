// features/profil/mon-profil/mon-profil.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../core/services/auth.service';
import { Role } from '../../../core/models/role.enum';
import { environment } from '../../../../environments/environment';

type SectionKey = 'infos' | 'securite' | 'dashboard';

interface Section {
  key: SectionKey;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-mon-profil',
  templateUrl: './mon-profil.component.html',
  standalone: false,
})
export class MonProfilComponent implements OnInit {
  profile = this.auth.currentUser;
  activeSection: SectionKey = 'infos';
  editingField: string | null = null;
  editValue = '';
  saving = false;
  successMessage = '';

  sections: Section[] = [
    { key: 'infos', label: 'À propos de moi', icon: '👤' },
    { key: 'securite', label: 'Historique de paiement', icon: '🔒' },
    { key: 'dashboard', label: 'Mon espace', icon: '🏠' },
  ];

  constructor(
    private auth: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.http.get<any>(`${environment.apiUrl}/users/me`).subscribe((data) => {
      this.profile = data;
    });
  }

  startEdit(field: string): void {
    this.editingField = field;
    this.editValue = field === 'name' ? (this.profile?.name ?? '') : '';
    this.successMessage = '';
  }

  cancelEdit(): void {
    this.editingField = null;
    this.editValue = '';
  }

  saveField(): void {
    if (!this.editingField) return;
    this.saving = true;
    this.http
      .patch(`${environment.apiUrl}/users/me`, { name: this.editValue })
      .subscribe({
        next: () => {
          this.saving = false;
          if (this.profile) this.profile.name = this.editValue;
          this.successMessage = 'Modifié avec succès.';
          setTimeout(() => {
            this.successMessage = '';
            this.editingField = null;
          }, 2000);
        },
        error: () => {
          this.saving = false;
        },
      });
  }

  get maskedEmail(): string {
    const email = this.profile?.email ?? '';
    const [local, domain] = email.split('@');
    if (!domain) return email;
    const masked = local.charAt(0) + '***' + local.slice(-1);
    return `${masked}@${domain}`;
  }

  get kycStatus(): string | undefined {
    return (this.profile as any)?.kycStatus;
  }

  get kycApproved(): boolean {
    return this.kycStatus === 'APPROVED';
  }

  get kycLabel(): string {
    const labels: Record<string, string> = {
      APPROVED: 'Identité vérifiée',
      PENDING: 'Vérification en cours',
      REJECTED: 'Vérification rejetée',
    };
    return this.kycStatus ? (labels[this.kycStatus] ?? this.kycStatus) : 'Procédure non commencée';
  }

  get roleLabel(): string {
    const labels: Partial<Record<Role, string>> = {
      [Role.USER]: 'Acheteur',
      [Role.ACHETEUR]: 'Acheteur',
      [Role.VENDEUR]: 'Vendeur',
      [Role.VETERINAIRE]: 'Vétérinaire',
      [Role.AGENT_ANADER]: 'Agent ANADER',
      [Role.ADMIN]: 'Administrateur',
      [Role.ADMINISTRATEUR]: 'Administrateur',
    };
    return this.profile?.role
      ? (labels[this.profile.role] ?? String(this.profile.role))
      : '';
  }
}
