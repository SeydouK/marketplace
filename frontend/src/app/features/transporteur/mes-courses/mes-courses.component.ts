// transporteur/mes-courses/mes-courses.component.ts
import { Component, OnInit } from '@angular/core';
import { Course, TransporteurService } from '../services/transporteur.service';
import { ToastService } from '../../../core/services/toast.service';
import { PwaService } from '../../../core/services/pwa.service';

/**
 * L'espace du transporteur : ce qu'on lui propose, et ce qu'il a accepté.
 *
 * Une seule course peut être en cours à la fois. L'écran le dit explicitement
 * plutôt que de laisser un refus inexpliqué au moment d'en accepter une seconde.
 */
@Component({
  selector: 'app-mes-courses',
  templateUrl: './mes-courses.component.html',
  standalone: false,
})
export class MesCoursesComponent implements OnInit {
  courses: Course[] = [];
  chargement = true;
  erreur = false;

  enCours = new Set<number>();

  /** Course dont le refus est en cours de saisie. */
  refusCourse: Course | null = null;
  refusMotif = '';

  constructor(
    private transporteurService: TransporteurService,
    private toast: ToastService,
    public pwa: PwaService,
  ) {}

  /** Installe l'application sur l'ecran d'accueil du telephone. */
  async installer(): Promise<void> {
    const accepte = await this.pwa.installer();
    if (accepte) {
      this.toast.success("BétailMarket est maintenant sur votre écran d'accueil.");
    }
  }

  ngOnInit(): void {
    this.charger();
  }

  private charger(): void {
    this.chargement = true;
    this.erreur = false;
    this.transporteurService.mesCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
        this.chargement = false;
      },
      error: () => {
        this.erreur = true;
        this.chargement = false;
      },
    });
  }

  // ── Regroupements ──────────────────────────────────────────────────────────

  get propositions(): Course[] {
    return this.courses.filter((c) => c.statut === 'PROPOSEE');
  }

  /** La course acceptée et non terminée — il n'y en a qu'une par construction. */
  get courseEnCours(): Course | null {
    return this.courses.find((c) => c.statut === 'ACCEPTEE' && !c.termine) ?? null;
  }

  get coursesTerminees(): Course[] {
    return this.courses.filter((c) => c.statut === 'ACCEPTEE' && c.termine);
  }

  // ── Répondre ───────────────────────────────────────────────────────────────

  accepter(course: Course): void {
    if (this.enCours.has(course.remiseId)) return;
    this.enCours.add(course.remiseId);

    this.transporteurService.accepter(course.remiseId).subscribe({
      next: () => {
        this.enCours.delete(course.remiseId);
        this.toast.success('Course acceptée. Vous pouvez partir la chercher.');
        this.charger();
      },
      error: (e) => {
        this.enCours.delete(course.remiseId);
        this.toast.error(e?.error?.message ?? "L'acceptation a échoué.");
        this.charger();
      },
    });
  }

  ouvrirRefus(course: Course): void {
    this.refusCourse = course;
    this.refusMotif = '';
  }

  fermerRefus(): void {
    this.refusCourse = null;
    this.refusMotif = '';
  }

  envoyerRefus(): void {
    if (!this.refusCourse) return;
    const course = this.refusCourse;

    this.transporteurService.refuser(course.remiseId, this.refusMotif.trim() || undefined).subscribe({
      next: () => {
        this.fermerRefus();
        this.toast.info('Course refusée. Le vendeur en est informé.');
        this.charger();
      },
      error: (e) => this.toast.error(e?.error?.message ?? 'Le refus a échoué.'),
    });
  }

  // ── Affichage ──────────────────────────────────────────────────────────────

  /** Itinéraire vers le point de livraison, ouvert dans l'app de cartes. */
  itineraire(course: Course): string | null {
    if (!course.destinationLatitude || !course.destinationLongitude) return null;
    return `https://www.google.com/maps/dir/?api=1&destination=${course.destinationLatitude},${course.destinationLongitude}`;
  }

  /** Bloque-t-on l'acceptation parce qu'une course occupe déjà le transporteur ? */
  get occupe(): boolean {
    return this.courseEnCours !== null;
  }
}
