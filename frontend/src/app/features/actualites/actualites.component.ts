import { Component, OnInit } from '@angular/core';
import { ActualiteService } from './actualite.service';
import { Actualite, ActualiteCategorie, ActualiteResume } from './actualite.model';

@Component({
  selector: 'app-actualites',
  templateUrl: './actualites.component.html',
  standalone: false,
})
export class ActualitesComponent implements OnInit {
  actualites: ActualiteResume[] = [];
  chargement = true;
  erreur = false;

  categorieActive: ActualiteCategorie | '' = '';

  /** Article ouvert dans la fiche, chargé à la demande pour son corps. */
  selected: Actualite | null = null;
  chargementDetail = false;

  readonly categories: { value: ActualiteCategorie | ''; label: string }[] = [
    { value: '',               label: 'Toutes' },
    { value: 'SANTE_ANIMALE',  label: 'Santé animale' },
    { value: 'ELEVAGE',        label: 'Élevage' },
    { value: 'MARCHE',         label: 'Marché' },
    { value: 'REGLEMENTATION', label: 'Réglementation' },
    { value: 'CONSEIL',        label: 'Conseils pratiques' },
  ];

  constructor(public readonly svc: ActualiteService) {}

  ngOnInit(): void {
    this.charger();
    this.svc.markAllAsSeen();
  }

  charger(): void {
    this.chargement = true;
    this.erreur = false;
    this.svc.getAll().subscribe({
      next: (liste) => {
        this.actualites = liste;
        this.chargement = false;
      },
      error: () => {
        this.erreur = true;
        this.chargement = false;
      },
    });
  }

  get filteredActualites(): ActualiteResume[] {
    if (!this.categorieActive) return this.actualites;
    return this.actualites.filter((a) => a.categorie === this.categorieActive);
  }

  /** Récent = moins de sept jours, comme la fenêtre retenue sur l'ancienne liste. */
  isNew(actu: ActualiteResume): boolean {
    const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return new Date(actu.datePublication).getTime() > cutoff;
  }

  openDetail(actu: ActualiteResume): void {
    this.chargementDetail = true;
    // Le résumé est déjà connu : on l'affiche pendant que le corps arrive,
    // plutôt qu'une fiche vide.
    this.selected = { ...actu, contenu: '', publiee: true };
    this.svc.getById(actu.id).subscribe({
      next: (detail) => {
        this.selected = detail;
        this.chargementDetail = false;
      },
      error: () => {
        this.chargementDetail = false;
        this.selected = null;
      },
    });
  }

  fermerDetail(): void {
    this.selected = null;
    this.chargementDetail = false;
  }
}
