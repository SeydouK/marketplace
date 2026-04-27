// features/profil/mon-profil/mon-profil.component.ts
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Role } from '../../../core/models/role.enum';
import { environment } from '../../../../environments/environment';
import { UserStatusService } from '../../../core/services/user-status.service';

type SectionKey =
  | 'infos'
  | 'securite'
  | 'commentaires'
  | 'historique-paiement'
  | 'dashboard'
  | 'favoris'  
  | 'mes-animaux'
  | 'mes-annonces'
  | 'documents-sanitaires'
  | 'fiches-validees'
  | 'zone-intervention'
  | 'animaux-enregistres'
  | 'supervision';

interface Section {
  key: SectionKey;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-mon-profil',
  templateUrl: './mon-profil.component.html',
  styleUrls: ['./mon-profil.component.css'],
  standalone: false,
})
export class MonProfilComponent implements OnInit, OnDestroy {
  @ViewChild('avatarInput') avatarInput!: ElementRef<HTMLInputElement>;

  profile = this.auth.currentUser;
  activeSection: SectionKey = 'infos';
  editingField: string | null = null;
  editValue = '';
  saving = false;
  successMessage = '';
  uploadingAvatar = false;
  avatarUrl: string | null = null;
  mobilePanelOpen = false;
  mobilePanelSection = 'infos';
  mobilePanelTitle = 'Profil';

  // ──────────────────────────────────────────────
  //  Sections communes à tous les rôles
  // ──────────────────────────────────────────────
  private readonly commonSections: Section[] = [
    { key: 'infos',     label: 'À propos de moi', icon: '👤' },
    { key: 'dashboard', label: 'Mon espace',       icon: '🏠' },
  ];

  readonly mobileQuickSections = [
    { key: 'historique', label: 'Achats précédents', icon: '🛍️', isNew: false },
    { key: 'dashboard', label: 'Mon espace', icon: '🏠', isNew: false }, 
  ];

  // ──────────────────────────────────────────────
  //  Sections exclusives par rôle
  // ──────────────────────────────────────────────
  private readonly roleSections: Partial<Record<Role, Section[]>> = {
    [Role.ACHETEUR]: [
      { key: 'historique-paiement', label: 'Historique de paiement', icon: '💳' },
      { key: 'commentaires',        label: 'Mes commentaires',        icon: '💬' },
      { key: 'favoris',             label: 'Mes favoris',             icon: '❤️' }
    ],
    [Role.USER]: [
      { key: 'historique-paiement', label: 'Historique de paiement', icon: '💳' },
      { key: 'commentaires',        label: 'Mes commentaires',        icon: '💬' },
      { key: 'favoris',             label: 'Mes favoris',             icon: '❤️' },
    ],
    [Role.VENDEUR]: [
      { key: 'mes-animaux',         label: 'Mes animaux',             icon: '🐄' },
      { key: 'mes-annonces',        label: 'Mes annonces',            icon: '📋' },
      { key: 'historique-paiement', label: 'Historique de paiement',  icon: '💳' },
      { key: 'commentaires',        label: 'Mes commentaires',        icon: '💬' },
    ],
    [Role.VETERINAIRE]: [
      { key: 'documents-sanitaires', label: 'Documents sanitaires', icon: '📄' },
      { key: 'fiches-validees',      label: 'Fiches validées',       icon: '✅' },
      { key: 'zone-intervention',    label: "Zone d'intervention",   icon: '📍' },
    ],
    [Role.AGENT_ANADER]: [
      { key: 'animaux-enregistres', label: 'Animaux enregistrés', icon: '🏷️' },
      { key: 'zone-intervention',   label: "Zone d'affectation",  icon: '📍' },
    ],
    [Role.ADMIN]: [
      { key: 'supervision', label: 'Supervision', icon: '🛡️' },
    ],
    [Role.ADMINISTRATEUR]: [
      { key: 'supervision', label: 'Supervision', icon: '🛡️' },
    ],
  };

  get sections(): Section[] {
    const role = this.profile?.role as Role | undefined;
    const extras = role ? (this.roleSections[role] ?? []) : [];
    return [...this.commonSections, ...extras];
  }

  // ──────────────────────────────────────────────
  //  Informations affichées dans "À propos de moi"
  // ──────────────────────────────────────────────
  get roleSpecificInfos(): { label: string; value: string }[] {
    const role = this.profile?.role as Role | undefined;
    switch (role) {
      case Role.VENDEUR:
        return [
          { label: "Numéro d'accréditation vendeur", value: (this.profile as any)?.vendeurId ?? 'Non renseigné' },
        ];
      case Role.VETERINAIRE:
        return [
          { label: 'N° accréditation DSV', value: (this.profile as any)?.accreditationDsv ?? 'Non renseigné' },
          { label: "Zone d'intervention",  value: (this.profile as any)?.zoneIntervention ?? 'Non renseignée' },
        ];
      case Role.AGENT_ANADER:
        return [
          { label: "Zone d'affectation",  value: (this.profile as any)?.zoneAffectation ?? 'Non renseignée' },
          { label: 'Animaux enregistrés',  value: String((this.profile as any)?.animauxEnregistres ?? 0) },
        ];
      default:
        return [];
    }
  }

  // ──────────────────────────────────────────────
  //  Badge de rôle
  // ──────────────────────────────────────────────
  get roleLabel(): string {
    const labels: Partial<Record<Role, string>> = {
      [Role.USER]:           'Acheteur',
      [Role.ACHETEUR]:       'Acheteur',
      [Role.VENDEUR]:        'Vendeur',
      [Role.VETERINAIRE]:    'Vétérinaire',
      [Role.AGENT_ANADER]:   'Agent ANADER',
      [Role.ADMIN]:          'Administrateur',
      [Role.ADMINISTRATEUR]: 'Administrateur',
    };
    return this.profile?.role ? (labels[this.profile.role] ?? String(this.profile.role)) : '';
  }

  get roleBadgeColor(): string {
    const colors: Partial<Record<Role, string>> = {
      [Role.USER]:           'bg-blue-100 text-blue-700',
      [Role.ACHETEUR]:       'bg-blue-100 text-blue-700',
      [Role.VENDEUR]:        'bg-orange-100 text-orange-700',
      [Role.VETERINAIRE]:    'bg-green-100 text-green-700',
      [Role.AGENT_ANADER]:   'bg-yellow-100 text-yellow-700',
      [Role.ADMIN]:          'bg-[#fee4e2] text-[#b42318]',
      [Role.ADMINISTRATEUR]: 'bg-[#fee4e2] text-[#b42318]',
    };
    return this.profile?.role ? (colors[this.profile.role] ?? 'bg-gray-100 text-gray-700') : 'bg-gray-100 text-gray-700';
  }

  // ──────────────────────────────────────────────
  //  Guards de section
  // ──────────────────────────────────────────────
  get isVendeur(): boolean {
    return this.profile?.role === Role.VENDEUR;
  }

  get isVeterinaire(): boolean {
    return this.profile?.role === Role.VETERINAIRE;
  }

  get isAgentAnader(): boolean {
    return this.profile?.role === Role.AGENT_ANADER;
  }

  get isAdmin(): boolean {
    return this.profile?.role === Role.ADMIN || this.profile?.role === Role.ADMINISTRATEUR;
  }

  get isAcheteur(): boolean {
    return this.profile?.role === Role.ACHETEUR || this.profile?.role === Role.USER;
  }

  get hasCommentaires(): boolean {
    return this.isAcheteur || this.isVendeur;
  }

  get hasPaiement(): boolean {
    return this.isAcheteur || this.isVendeur;
  }

  get avatarInitial(): string {
    const name = this.profile?.name ?? '';
    return name.charAt(0).toUpperCase() || '?';
  }

  get maskedEmail(): string {
    return this.profile?.email ?? '';
  }

  get kycStatus(): string | undefined {
    const fromStatus = this.userStatusService.snapshot?.kycStatus;
    return fromStatus ?? (this.profile as any)?.kycStatus;
  }

  get kycApproved(): boolean {
    return this.kycStatus === 'VALIDATED' || this.kycStatus === 'APPROVED';
  }

  get kycLabel(): string {
    const labels: Record<string, string> = {
      PENDING:      'Vérification en cours',
      CNI_UPLOADED: 'CNI reçue — en attente de traitement',
      CNI_VERIFIED: 'CNI vérifiée — selfie requis',
      VALIDATED:    'Identité vérifiée',
      REJECTED:     'Vérification rejetée',
    };
    return this.kycStatus ? (labels[this.kycStatus] ?? this.kycStatus) : 'Procédure non commencée';
  }

  // ──────────────────────────────────────────────
  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private router: Router,
    private userStatusService: UserStatusService
  ) {}

  ngOnInit(): void {
    this.http.get<any>(`${environment.apiUrl}/users/me`).subscribe((data) => {
      this.profile = data;
      this.avatarUrl = data?.avatarUrl ?? null;
    });
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }

  // ──────────────────────────────────────────────
  //  Avatar
  // ──────────────────────────────────────────────
  triggerAvatarUpload(): void {
    this.avatarInput?.nativeElement.click();
  }

  onAvatarSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      this.avatarUrl = e.target?.result as string;
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append('avatar', file);
    this.uploadingAvatar = true;

    this.http.post<{ avatarUrl: string }>(`${environment.apiUrl}/users/me/avatar`, formData)
      .subscribe({
        next: (res) => {
          this.uploadingAvatar = false;
          this.avatarUrl = res.avatarUrl;
          if (this.profile) (this.profile as any).avatarUrl = res.avatarUrl;
        },
        error: () => {
          this.uploadingAvatar = false;
        },
      });

    input.value = '';
  }

  // ──────────────────────────────────────────────
  //  Edition inline
  // ──────────────────────────────────────────────
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

  // ──────────────────────────────────────────────
  //  Mobile panel (slider depuis la droite)
  // ──────────────────────────────────────────────
  openMobilePanel(): void {
    this.mobilePanelSection = 'infos';
    this.mobilePanelTitle = 'Profil';
    this.mobilePanelOpen = true;
    document.body.style.overflow = 'hidden';
  }

  openSectionPanel(sectionKey: string): void {
    const section = this.sections.find(s => s.key === sectionKey);
    this.mobilePanelSection = sectionKey;
    this.mobilePanelTitle = section?.label ?? 'Détails';
    this.activeSection = sectionKey as SectionKey;
    this.mobilePanelOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeMobilePanel(): void {
    this.mobilePanelOpen = false;
    document.body.style.overflow = '';
  }

  navigateToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  // ──────────────────────────────────────────────
  //  Déconnexion
  // ──────────────────────────────────────────────
  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
