// admin/gestion-transporteurs/gestion-transporteurs.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ToastService } from '../../../core/services/toast.service';
import {
  DossierTransporteur,
  LIBELLES_VEHICULE,
} from '../../transporteur/services/transporteur.service';

/**
 * Validation des permis de conduire.
 *
 * L'examen est humain, contrairement au KYC qui s'appuie sur une reconnaissance
 * automatique. Un faux positif ici ne coûte pas un compte mal ouvert, mais un
 * animal confié à quelqu'un que la plateforme aura présenté comme fiable.
 */
@Component({
  selector: 'app-gestion-transporteurs',
  templateUrl: './gestion-transporteurs.component.html',
  standalone: false,
})
export class GestionTransporteursComponent implements OnInit {
  dossiers: DossierTransporteur[] = [];
  chargement = true;
  erreur = false;

  enCours = new Set<number>();
  refusId: number | null = null;
  refusMotif = '';

  readonly libellesVehicule = LIBELLES_VEHICULE;
  private readonly base = `${environment.apiUrl}/admin/transporteurs`;

  constructor(private http: HttpClient, private toast: ToastService) {}

  ngOnInit(): void {
    this.charger();
  }

  charger(): void {
    this.chargement = true;
    this.erreur = false;
    this.http.get<DossierTransporteur[]>(`${this.base}/en-attente`).subscribe({
      next: (d) => {
        this.dossiers = d;
        this.chargement = false;
      },
      error: () => {
        this.erreur = true;
        this.chargement = false;
      },
    });
  }

  valider(dossier: DossierTransporteur): void {
    if (this.enCours.has(dossier.id)) return;
    this.enCours.add(dossier.id);

    this.http.post(`${this.base}/${dossier.id}/permis/valider`, {}).subscribe({
      next: () => {
        this.enCours.delete(dossier.id);
        this.toast.success(`${dossier.nom} est désormais habilité.`);
        this.charger();
      },
      error: (e) => {
        this.enCours.delete(dossier.id);
        this.toast.error(e?.error?.message ?? 'La validation a échoué.');
      },
    });
  }

  ouvrirRefus(dossier: DossierTransporteur): void {
    this.refusId = dossier.id;
    this.refusMotif = '';
  }

  fermerRefus(): void {
    this.refusId = null;
    this.refusMotif = '';
  }

  refuser(dossier: DossierTransporteur): void {
    this.http
      .post(`${this.base}/${dossier.id}/permis/refuser`, {
        motif: this.refusMotif.trim() || null,
      })
      .subscribe({
        next: () => {
          this.fermerRefus();
          this.toast.info('Permis refusé. Le transporteur peut en redéposer un.');
          this.charger();
        },
        error: (e) => this.toast.error(e?.error?.message ?? 'Le refus a échoué.'),
      });
  }

  /** L'identité est-elle vérifiée ? Sans elle, valider le permis ne suffit pas. */
  identiteOk(dossier: DossierTransporteur): boolean {
    return dossier.kycStatus === 'VALIDATED';
  }
}
