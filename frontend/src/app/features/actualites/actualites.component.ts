import { Component, OnInit } from '@angular/core';
import { ActualiteService } from './actualite.service';
import { Actualite, ActualiteCategorie } from './actualite.model';

@Component({
  selector: 'app-actualites',
  templateUrl: './actualites.component.html',
  standalone: false,
})
export class ActualitesComponent implements OnInit {
  categorieActive: ActualiteCategorie | '' = '';
  selected: Actualite | null = null;

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
    this.svc.markAllAsSeen();
  }

  get filteredActualites(): Actualite[] {
    const all = this.svc.getAll();
    if (!this.categorieActive) return all;
    return all.filter(a => a.categorie === this.categorieActive);
  }

  isNew(actu: Actualite): boolean {
    const cutoff = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    return actu.datePublication > cutoff;
  }

  openDetail(actu: Actualite): void {
    this.selected = actu;
  }
}
