import { Component, OnInit } from '@angular/core';
import { AdminActualiteService } from '../services/admin-actualite.service';
import { ToastService } from '../../../core/services/toast.service';
import {
  Actualite,
  ActualiteCategorie,
  ActualitePayload,
  LIBELLES_CATEGORIE,
} from '../../actualites/actualite.model';

/**
 * Rédaction des actualités.
 *
 * Le contenu de la rubrique vivait dans le code source : publier une alerte
 * sanitaire supposait un déploiement. Cet écran est ce qui rend la rubrique
 * utilisable dans le temps qu'une alerte laisse.
 */
@Component({
  selector: 'app-gestion-actualites',
  templateUrl: './gestion-actualites.component.html',
  standalone: false,
})
export class GestionActualitesComponent implements OnInit {
  actualites: Actualite[] = [];
  chargement = true;
  erreur = false;

  /** Article en cours d'édition ; null quand le formulaire est fermé. */
  brouillon: ActualitePayload | null = null;
  editionId: number | null = null;
  enregistrement = false;

  /** Identifiants dont une bascule ou une suppression est en vol. */
  enCours = new Set<number>();
  suppressionId: number | null = null;

  readonly categories = Object.entries(LIBELLES_CATEGORIE) as [ActualiteCategorie, string][];

  constructor(
    private readonly svc: AdminActualiteService,
    private readonly toast: ToastService,
  ) {}

  ngOnInit(): void {
    this.charger();
  }

  charger(): void {
    this.chargement = true;
    this.erreur = false;
    this.svc.lister().subscribe({
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

  // ── Formulaire ───────────────────────────────────────────────────────────

  nouveau(): void {
    this.editionId = null;
    this.brouillon = {
      titre: '',
      resume: '',
      contenu: '',
      categorie: 'ELEVAGE',
      imageUrl: '',
      auteur: 'Équipe BétailMarket',
      datePublication: this.maintenantLocal(),
      publiee: false,
    };
  }

  editer(actu: Actualite): void {
    this.editionId = actu.id;
    this.brouillon = {
      titre: actu.titre,
      resume: actu.resume,
      contenu: actu.contenu,
      categorie: actu.categorie,
      imageUrl: actu.imageUrl ?? '',
      auteur: actu.auteur,
      datePublication: this.pourChampDate(actu.datePublication),
      publiee: actu.publiee,
    };
  }

  fermerFormulaire(): void {
    this.brouillon = null;
    this.editionId = null;
    this.enregistrement = false;
  }

  enregistrer(): void {
    if (!this.brouillon || this.enregistrement) return;

    const payload: ActualitePayload = {
      ...this.brouillon,
      imageUrl: this.brouillon.imageUrl?.trim() || null,
      datePublication: this.brouillon.datePublication || null,
    };

    this.enregistrement = true;
    const appel = this.editionId
      ? this.svc.modifier(this.editionId, payload)
      : this.svc.creer(payload);

    appel.subscribe({
      next: () => {
        this.toast.success(this.editionId ? 'Article mis à jour.' : 'Article créé.');
        this.fermerFormulaire();
        this.charger();
      },
      error: (e) => {
        this.enregistrement = false;
        this.toast.error(e?.error?.message ?? "L'enregistrement a échoué.");
      },
    });
  }

  // ── Actions de liste ─────────────────────────────────────────────────────

  basculerPublication(actu: Actualite): void {
    if (this.enCours.has(actu.id)) return;
    this.enCours.add(actu.id);

    this.svc.changerPublication(actu.id, !actu.publiee).subscribe({
      next: (maj) => {
        this.enCours.delete(actu.id);
        actu.publiee = maj.publiee;
        this.toast.success(maj.publiee ? 'Article en ligne.' : 'Article retiré de la rubrique.');
      },
      error: (e) => {
        this.enCours.delete(actu.id);
        this.toast.error(e?.error?.message ?? "La bascule a échoué.");
      },
    });
  }

  demanderSuppression(actu: Actualite): void {
    this.suppressionId = actu.id;
  }

  annulerSuppression(): void {
    this.suppressionId = null;
  }

  confirmerSuppression(): void {
    const id = this.suppressionId;
    if (id === null || this.enCours.has(id)) return;
    this.enCours.add(id);

    this.svc.supprimer(id).subscribe({
      next: () => {
        this.enCours.delete(id);
        this.suppressionId = null;
        this.actualites = this.actualites.filter((a) => a.id !== id);
        this.toast.success('Article supprimé.');
      },
      error: (e) => {
        this.enCours.delete(id);
        this.toast.error(e?.error?.message ?? 'La suppression a échoué.');
      },
    });
  }

  libelleCategorie(cat: ActualiteCategorie): string {
    return LIBELLES_CATEGORIE[cat] ?? cat;
  }

  /**
   * Un `datetime-local` n'accepte pas les secondes ni le fuseau renvoyés par le
   * serveur ; il attend exactement `AAAA-MM-JJTHH:MM`.
   */
  private pourChampDate(iso: string): string {
    return iso.slice(0, 16);
  }

  /**
   * Instant courant au format du champ, lu sur l'horloge locale.
   *
   * `toISOString()` bascule en UTC et decalerait la date proposee d'une heure
   * la ou le serveur, lui, raisonne en heure locale.
   */
  private maintenantLocal(): string {
    const d = new Date();
    const deuxChiffres = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${deuxChiffres(d.getMonth() + 1)}-${deuxChiffres(d.getDate())}`
      + `T${deuxChiffres(d.getHours())}:${deuxChiffres(d.getMinutes())}`;
  }
}
