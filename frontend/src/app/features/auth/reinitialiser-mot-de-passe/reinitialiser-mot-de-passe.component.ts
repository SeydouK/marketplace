// features/auth/reinitialiser-mot-de-passe/reinitialiser-mot-de-passe.component.ts
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';

/** Aligné sur l'inscription et sur le serveur. */
const LONGUEUR_MIN = 6;

/**
 * Seconde étape du mot de passe oublié, atteinte par le lien reçu par email.
 *
 * Le lien est vérifié dès l'ouverture : annoncer qu'il a expiré après que
 * l'utilisateur a saisi deux fois son nouveau mot de passe serait le pire
 * moment pour l'apprendre.
 */
@Component({
  selector: 'app-reinitialiser-mot-de-passe',
  templateUrl: './reinitialiser-mot-de-passe.component.html',
  standalone: false,
})
export class ReinitialiserMotDePasseComponent implements OnInit {
  readonly longueurMin = LONGUEUR_MIN;

  form = this.fb.group(
    {
      motDePasse: ['', [Validators.required, Validators.minLength(LONGUEUR_MIN)]],
      confirmation: ['', Validators.required],
    },
    { validators: this.identiques() },
  );

  etape: 'verification' | 'formulaire' | 'invalide' | 'termine' = 'verification';
  envoiEnCours = false;
  erreur: string | null = null;
  submitted = false;
  afficher = false;

  private jeton = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastService,
  ) {}

  ngOnInit(): void {
    this.jeton = this.route.snapshot.queryParamMap.get('jeton') ?? '';
    if (!this.jeton) {
      this.etape = 'invalide';
      return;
    }

    this.auth.verifierJetonReinitialisation(this.jeton).subscribe({
      next: ({ valide }) => (this.etape = valide ? 'formulaire' : 'invalide'),
      // Serveur injoignable : on laisse tenter, la soumission dira si le lien vaut encore.
      error: () => (this.etape = 'formulaire'),
    });
  }

  /** Indication de robustesse, volontairement simple : longueur et variété. */
  get robustesse(): { niveau: 0 | 1 | 2 | 3; libelle: string } {
    const v = this.form.value.motDePasse ?? '';
    if (!v) return { niveau: 0, libelle: '' };
    if (v.length < LONGUEUR_MIN) return { niveau: 1, libelle: 'Trop court' };
    const familles = [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].filter((r) => r.test(v)).length;
    if (v.length >= 10 && familles >= 3) return { niveau: 3, libelle: 'Solide' };
    if (v.length >= 8 && familles >= 2) return { niveau: 2, libelle: 'Correct' };
    return { niveau: 1, libelle: 'Faible' };
  }

  controlInvalid(nom: string, erreur: string): boolean {
    const control = this.form.get(nom);
    if (!control) return false;
    return control.invalid && (control.touched || this.submitted) && control.hasError(erreur);
  }

  get confirmationDifferente(): boolean {
    const confirmation = this.form.get('confirmation');
    return this.form.hasError('differents') && !!confirmation && (confirmation.touched || this.submitted);
  }

  valider(): void {
    this.submitted = true;
    if (this.form.invalid || this.envoiEnCours) return;

    this.envoiEnCours = true;
    this.erreur = null;
    this.auth.reinitialiserMotDePasse(this.jeton, this.form.value.motDePasse!).subscribe({
      next: () => {
        this.envoiEnCours = false;
        this.etape = 'termine';
      },
      error: (e) => {
        this.envoiEnCours = false;
        const message: string | undefined = e?.error?.message ?? e?.error?.error;
        // Lien expiré ou déjà utilisé entre-temps : l'écran dédié le dit mieux qu'une alerte.
        if (e?.status === 400 && message?.toLowerCase().includes('lien')) {
          this.etape = 'invalide';
          return;
        }
        this.erreur = message ?? 'Le mot de passe n\'a pas pu être modifié. Réessayez dans un instant.';
      },
    });
  }

  allerALaConnexion(): void {
    this.toast.success('Mot de passe modifié. Connectez-vous avec le nouveau.');
    void this.router.navigate(['/auth/login']);
  }

  private identiques(): ValidatorFn {
    return (groupe: AbstractControl): ValidationErrors | null => {
      const a = groupe.get('motDePasse')?.value;
      const b = groupe.get('confirmation')?.value;
      return !a || !b || a === b ? null : { differents: true };
    };
  }
}
