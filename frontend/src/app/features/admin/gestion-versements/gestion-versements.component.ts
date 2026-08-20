import { Component, OnInit } from '@angular/core';
import { AdminVersement, StatutVersement, AdminService } from '../services/admin.service';

@Component({
  selector: 'app-gestion-versements',
  templateUrl: './gestion-versements.component.html',
  standalone: false,
})
export class GestionVersementsComponent implements OnInit {
  versements: AdminVersement[] = [];
  activeFilter: StatutVersement | 'all' = 'all';
  currentPage = 0;
  totalPages = 1;
  totalElements = 0;
  loading = false;
  envoiEnCoursId?: number;

  readonly filters: { label: string; value: StatutVersement | 'all' }[] = [
    { label: 'Tous',       value: 'all' },
    { label: 'En attente', value: 'EN_ATTENTE' },
    { label: 'En cours',   value: 'EN_COURS' },
    { label: 'Confirmés',  value: 'CONFIRME' },
    { label: 'Échoués',    value: 'ECHOUE' },
  ];

  constructor(private readonly adminService: AdminService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.adminService
      .getVersements({ statut: this.activeFilter, page: this.currentPage, size: 20 })
      .subscribe({
        next: (page) => {
          this.versements = page.content;
          this.totalPages = page.totalPages;
          this.totalElements = page.totalElements;
          this.loading = false;
        },
        error: () => { this.loading = false; },
      });
  }

  setFilter(value: StatutVersement | 'all'): void {
    this.activeFilter = value;
    this.currentPage = 0;
    this.load();
  }

  canEnvoyer(versement: AdminVersement): boolean {
    return versement.statut === 'EN_ATTENTE' || versement.statut === 'ECHOUE';
  }

  envoyer(versement: AdminVersement): void {
    if (!versement.vendeurTelephone) {
      alert('Ce vendeur n\'a pas de numéro de téléphone renseigné : versement impossible.');
      return;
    }
    if (!confirm(`Envoyer ${versement.montantNet} FCFA à ${versement.vendeurNom} (${versement.vendeurTelephone}) ?`)) return;

    this.envoiEnCoursId = versement.id;
    this.adminService.envoyerVersement(versement.id).subscribe({
      next: () => { this.envoiEnCoursId = undefined; this.load(); },
      error: (err) => {
        this.envoiEnCoursId = undefined;
        alert(err?.error?.message || 'Échec de l\'envoi du versement.');
      },
    });
  }

  prevPage(): void {
    if (this.currentPage <= 0) return;
    this.currentPage--;
    this.load();
  }

  nextPage(): void {
    if (this.currentPage >= this.totalPages - 1) return;
    this.currentPage++;
    this.load();
  }

  getStatutBadge(statut: StatutVersement): string {
    const map: Record<StatutVersement, string> = {
      EN_ATTENTE: 'bg-blue-100 text-blue-800',
      EN_COURS:   'bg-amber-100 text-amber-800',
      CONFIRME:   'bg-green-100 text-green-800',
      ECHOUE:     'bg-red-100 text-red-800',
    };
    return map[statut] ?? 'bg-[#F6F1E7] text-gray-600';
  }

  getStatutLabel(statut: StatutVersement): string {
    const map: Record<StatutVersement, string> = {
      EN_ATTENTE: 'En attente',
      EN_COURS:   'En cours',
      CONFIRME:   'Confirmé',
      ECHOUE:     'Échoué',
    };
    return map[statut] ?? statut;
  }

  trackByVersementId(_: number, versement: AdminVersement): number {
    return versement.id;
  }
}
