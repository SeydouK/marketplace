// features/profil/parametres/parametres.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../core/services/auth.service';
import { Role } from '../../../core/models/role.enum';
import { environment } from '../../../../environments/environment';

type SectionKey = 'infos' | 'securite' | 'confidentialite' | 'notifications' | 'paiements' | 'langues' | 'pro';

interface Section {
  key: SectionKey;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-parametres',
  templateUrl: './parametres.component.html',
  standalone: false,
})
export class ParametresComponent implements OnInit {
  profile = this.auth.currentUser;
  activeSection: SectionKey = 'infos';
  editingField: string | null = null;
  editValue = '';
  saving = false;
  successMessage = '';

  sections: Section[] = [
    { key: 'infos', label: 'Informations personnelles', icon: '👤' },
    { key: 'securite', label: 'Connexion et sécurité', icon: '🔒' },
    { key: 'confidentialite', label: 'Confidentialité', icon: '🤝' },
    { key: 'notifications', label: 'Notifications', icon: '🔔' },
    { key: 'paiements', label: 'Paiements', icon: '💳' },
    { key: 'langues', label: 'Langues et devise', icon: '🌐' },
  ];

  constructor(
    public auth: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.http.get<any>(`${environment.apiUrl}/users/me`).subscribe((data) => {
      this.profile = data;
    });
  }

  setSection(key: SectionKey): void {
    this.activeSection = key;
    this.cancelEdit();
  }

  startEdit(field: string): void {
    this.editingField = field;
    this.editValue = field === 'name' ? (this.profile?.name ?? '') : '';
    this.successMessage = '';
  }

  cancelEdit(): void {
    this.editingField = null;
    this.editValue = '';
    this.successMessage = '';
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
          this.successMessage = 'Modifications enregistrées.';
          setTimeout(() => {
            this.successMessage = '';
            this.editingField = null;
          }, 2000);
        },
        error: () => { this.saving = false; },
      });
  }

  get maskedEmail(): string {
    const email = this.profile?.email ?? '';
    const [local, domain] = email.split('@');
    if (!domain) return email;
    return local.charAt(0) + '***' + local.slice(-1) + '@' + domain;
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

  get isVendeur(): boolean {
    return this.auth.hasRole(Role.VENDEUR);
  }
}
