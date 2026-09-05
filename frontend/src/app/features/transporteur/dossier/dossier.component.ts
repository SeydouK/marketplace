// transporteur/dossier/dossier.component.ts
import { Component, OnInit } from '@angular/core';
import {
  DossierTransporteur,
  LIBELLES_VEHICULE,
  TransporteurService,
  TypeVehicule,
} from '../services/transporteur.service';
import { ToastService } from '../../../core/services/toast.service';

/**
 * Le dossier d'habilitation du transporteur.
 *
 * Un transporteur ne reçoit de course qu'une fois son identité vérifiée
 * <em>et</em> son permis validé. Cet écran existe pour qu'il sache toujours à
 * quelle étape il en est, plutôt que d'attendre sans comprendre pourquoi rien
 * n'arrive.
 */
@Component({
  selector: 'app-dossier-transporteur',
  templateUrl: './dossier.component.html',
  standalone: false,
})
export class DossierComponent implements OnInit {
  dossier: DossierTransporteur | null = null;
  chargement = true;
  erreur = false;

  permisFichier: File | null = null;
  permisApercu: string | null = null;
  envoiPermis = false;

  vehicule: TypeVehicule | null = null;
  capacite: number | null = null;
  envoiVehicule = false;

  readonly vehicules: TypeVehicule[] = ['BETAILLERE', 'CAMION', 'PICKUP', 'TRICYCLE', 'AUTRE'];
  readonly libelles = LIBELLES_VEHICULE;

  constructor(
    private transporteurService: TransporteurService,
    private toast: ToastService,
  ) {}

  ngOnInit(): void {
    this.charger();
  }

  private charger(): void {
    this.chargement = true;
    this.transporteurService.monDossier().subscribe({
      next: (d) => {
        this.appliquer(d);
        this.chargement = false;
      },
      error: () => {
        this.erreur = true;
        this.chargement = false;
      },
    });
  }

  private appliquer(d: DossierTransporteur): void {
    this.dossier = d;
    this.vehicule = d.typeVehicule ?? null;
    this.capacite = d.capaciteTetes ?? null;
  }

  // ── Étapes ─────────────────────────────────────────────────────────────────

  /** Progression affichée : quatre jalons, dans l'ordre où on les franchit. */
  get etapes(): { label: string; fait: boolean; encours: boolean }[] {
    const d = this.dossier;
    if (!d) return [];

    const telephone = !!d.telephone;
    const identite = d.kycStatus === 'VALIDATED';
    const permisDepose = !!d.permisUrl;
    const permisOk = d.permisValide;

    return [
      { label: 'Téléphone', fait: telephone, encours: !telephone },
      { label: 'Identité vérifiée', fait: identite, encours: telephone && !identite },
      { label: 'Permis déposé', fait: permisDepose, encours: identite && !permisDepose },
      { label: 'Permis validé', fait: permisOk, encours: permisDepose && !permisOk },
    ];
  }

  get permisEnExamen(): boolean {
    return !!this.dossier?.permisUrl && !this.dossier.permisValide;
  }

  // ── Permis ─────────────────────────────────────────────────────────────────

  choisirPermis(event: Event): void {
    const fichier = (event.target as HTMLInputElement).files?.[0];
    if (!fichier) return;

    this.permisFichier = fichier;
    const lecteur = new FileReader();
    lecteur.onload = () => (this.permisApercu = lecteur.result as string);
    lecteur.readAsDataURL(fichier);
  }

  envoyerPermis(): void {
    if (!this.permisFichier || this.envoiPermis) return;
    this.envoiPermis = true;

    this.transporteurService.deposerPermis(this.permisFichier).subscribe({
      next: (d) => {
        this.appliquer(d);
        this.envoiPermis = false;
        this.permisFichier = null;
        this.permisApercu = null;
        this.toast.success('Permis déposé. Notre équipe va l’examiner.');
      },
      error: (e) => {
        this.envoiPermis = false;
        this.toast.error(e?.error?.message ?? "L'envoi du permis a échoué.");
      },
    });
  }

  // ── Véhicule ───────────────────────────────────────────────────────────────

  enregistrerVehicule(): void {
    if (!this.vehicule || this.envoiVehicule) return;
    this.envoiVehicule = true;

    this.transporteurService.declarerVehicule(this.vehicule, this.capacite ?? undefined).subscribe({
      next: (d) => {
        this.appliquer(d);
        this.envoiVehicule = false;
        this.toast.success('Véhicule enregistré.');
      },
      error: (e) => {
        this.envoiVehicule = false;
        this.toast.error(e?.error?.message ?? "L'enregistrement a échoué.");
      },
    });
  }
}
