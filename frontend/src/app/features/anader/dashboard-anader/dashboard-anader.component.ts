// features/anader/dashboard-anader/dashboard-anader.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../core/services/auth.service';
import { environment } from '../../../../environments/environment';
import {
  AnaderService,
  AnaderStats,
  AnimalSansRfid,
} from '../services/anader.service';

/** Régions administratives de Côte d'Ivoire (districts) */
const REGIONS_CI = [
  'ABIDJAN',
  'AGNÉBY-TIASSA',
  'BAFING',
  'BAGOUÉ',
  'BÉRÉ',
  'BAS-SASSANDRA',
  'CAVALLY',
  'GBÊKÊ',
  'GÔH',
  'GRANDS-PONTS',
  'GÔH-DJIBOUA',
  'HAMBOL',
  'HAUT-SASSANDRA',
  'IFFOU',
  'INDÉNIÉ-DJUABLIN',
  'LA MÉ',
  'LÔH-DJIBOUA',
  'MARAHOUÉ',
  'MON',
  "N'ZI",
  'NAWA',
  'PORO',
  'SAN-PÉDRO',
  'SUD-COMOÉ',
  'TCHOLOGO',
  'TONKPI',
  'WORODOUGOU',
].sort();

@Component({
  selector: 'app-dashboard-anader',
  templateUrl: './dashboard-anader.component.html',
  standalone: false,
})
export class DashboardAnaderComponent implements OnInit {

  profile: any = null;

  // ── Stats ──────────────────────────────────────────────────────────────────
  stats: AnaderStats | null = null;

  // ── Liste animaux ──────────────────────────────────────────────────────────
  animaux: AnimalSansRfid[] = [];
  loading = false;
  currentPage = 0;
  totalPages  = 0;
  totalElements = 0;

  // ── Filtre région ──────────────────────────────────────────────────────────
  readonly regions = REGIONS_CI;
  selectedRegion: string | null = null;

  // ── Modal RFID ─────────────────────────────────────────────────────────────
  modalAnimal: AnimalSansRfid | null = null;
  rfidInput    = '';
  rfidError    = '';
  saving       = false;
  successMessage = '';

  // ── Validation RFID : 8–20 caractères alphanumériques ─────────────────────
  private readonly RFID_PATTERN = /^[0-9A-Za-z]{8,20}$/;

  get rfidValid(): boolean {
    return this.RFID_PATTERN.test(this.rfidInput);
  }

  constructor(
    private auth:         AuthService,
    private http:         HttpClient,
    private anaderSvc:    AnaderService,
  ) {}

  ngOnInit(): void {
    this.http.get<any>(`${environment.apiUrl}/users/me`).subscribe(d => {
      this.profile = d;
    });
    this.loadStats();
    this.loadAnimaux();
  }

  // ── Chargements ────────────────────────────────────────────────────────────

  private loadStats(): void {
    this.anaderSvc.getStats().subscribe(s => this.stats = s);
  }

  private loadAnimaux(): void {
    this.loading = true;
    this.anaderSvc
      .getAnimauxSansRfid(this.selectedRegion, this.currentPage)
      .subscribe({
        next: page => {
          this.animaux       = page.content;
          this.totalPages    = page.totalPages;
          this.totalElements = page.totalElements;
          this.loading       = false;
        },
        error: () => { this.loading = false; },
      });
  }

  // ── Filtre région ──────────────────────────────────────────────────────────

  onRegionChange(event: Event): void {
    const val = (event.target as HTMLSelectElement).value;
    this.selectedRegion = val || null;
    this.currentPage = 0;
    this.loadAnimaux();
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.loadAnimaux();
  }

  // ── Modal RFID ─────────────────────────────────────────────────────────────

  openRfidModal(animal: AnimalSansRfid): void {
    this.modalAnimal    = animal;
    this.rfidInput      = '';
    this.rfidError      = '';
    this.successMessage = '';
    this.saving         = false;
  }

  closeRfidModal(): void {
    if (this.saving) return; // empêche la fermeture pendant l'enregistrement
    this.modalAnimal    = null;
    this.rfidInput      = '';
    this.rfidError      = '';
    this.successMessage = '';
  }

  confirmerRfid(): void {
    if (!this.modalAnimal) return;

    // Validation côté client
    this.rfidError = '';
    if (!this.rfidInput.trim()) {
      this.rfidError = 'Veuillez saisir le numéro RFID.';
      return;
    }
    if (!this.rfidValid) {
      this.rfidError = 'Format invalide. 8 à 20 caractères alphanumériques.';
      return;
    }

    this.saving = true;
    this.anaderSvc
      .insererRfid(this.modalAnimal.id, this.rfidInput.trim().toUpperCase())
      .subscribe({
        next: () => {
          this.saving = false;
          this.successMessage = `Puce ${this.rfidInput} enregistrée avec succès ✅`;

          // Retire l'animal de la liste locale immédiatement
          this.animaux = this.animaux.filter(a => a.id !== this.modalAnimal!.id);
          this.totalElements = Math.max(0, this.totalElements - 1);

          // Rafraîchit les stats
          this.loadStats();

          // Ferme le modal après 1,5 secondes
          setTimeout(() => this.closeRfidModal(), 1500);
        },
        error: (err: { status: number }) => {
          this.saving = false;
          if (err.status === 409) {
            this.rfidError = 'Ce numéro RFID est déjà attribué à un autre animal.';
          } else if (err.status === 422) {
            this.rfidError = "Impossible : l'animal n'est pas encore validé par un vétérinaire.";
          } else {
            this.rfidError = 'Erreur lors de l\'enregistrement. Veuillez réessayer.';
          }
        },
      });
  }
}