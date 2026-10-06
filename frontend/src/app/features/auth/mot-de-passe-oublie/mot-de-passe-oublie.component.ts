// features/auth/mot-de-passe-oublie/mot-de-passe-oublie.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

/** Délai avant de proposer un nouvel envoi : le serveur ignore les demandes trop rapprochées. */
const DELAI_RENVOI_SECONDES = 120;

/**
 * Première étape du mot de passe oublié : demander un lien.
 *
 * L'écran de confirmation ne dit jamais si l'adresse a un compte — c'est ce
 * que garantit aussi le serveur. Il formule donc au conditionnel.
 */
@Component({
  selector: 'app-mot-de-passe-oublie',
  templateUrl: './mot-de-passe-oublie.component.html',
  standalone: false,
})
export class MotDePasseOublieComponent implements OnInit, OnDestroy {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  etape: 'saisie' | 'envoye' = 'saisie';
  envoiEnCours = false;
  erreur: string | null = null;
  submitted = false;

  /** Secondes avant de pouvoir renvoyer le lien. */
  attente = 0;
  private minuteur?: ReturnType<typeof setInterval>;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // Venu de la page de connexion : l'adresse déjà saisie est reprise.
    const email = this.route.snapshot.queryParamMap.get('email');
    if (email) this.form.patchValue({ email });
  }

  ngOnDestroy(): void {
    this.arreterMinuteur();
  }

  get email(): string {
    return (this.form.value.email ?? '').trim();
  }

  controlInvalid(errorName: string): boolean {
    const control = this.form.get('email');
    if (!control) return false;
    return control.invalid && (control.touched || this.submitted) && control.hasError(errorName);
  }

  envoyer(): void {
    this.submitted = true;
    if (this.form.invalid || this.envoiEnCours) return;

    this.envoiEnCours = true;
    this.erreur = null;
    this.auth.demanderReinitialisation(this.email).subscribe({
      next: () => {
        this.envoiEnCours = false;
        this.etape = 'envoye';
        this.demarrerMinuteur();
      },
      error: (e) => {
        this.envoiEnCours = false;
        this.erreur = e?.error?.error ?? e?.error?.message
          ?? 'La demande n\'a pas pu aboutir. Vérifiez votre connexion et réessayez.';
      },
    });
  }

  renvoyer(): void {
    if (this.attente > 0) return;
    this.envoyer();
  }

  modifierAdresse(): void {
    this.etape = 'saisie';
    this.erreur = null;
  }

  private demarrerMinuteur(): void {
    this.arreterMinuteur();
    this.attente = DELAI_RENVOI_SECONDES;
    this.minuteur = setInterval(() => {
      this.attente = Math.max(0, this.attente - 1);
      if (this.attente === 0) this.arreterMinuteur();
    }, 1000);
  }

  private arreterMinuteur(): void {
    if (this.minuteur) clearInterval(this.minuteur);
    this.minuteur = undefined;
  }
}
