import { Component, HostListener } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';
import Tesseract from 'tesseract.js';
import { UserStatusService } from '../../../core/services/user-status.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: false,
})
export class RegisterComponent {
  form = this.fb.group(
    {
      surname: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirmation: ['', Validators.required],
      // Indicatif separe du numero : coder un pays en dur condamnerait la
      // plateforme a un seul marche.
      indicatif: ['+225'],
      telephone: [''],
    },
    {
      validators: this.passwordMatchValidator(),
    }
  );

  /**
   * Un transporteur s'inscrit comme tel : son parcours differe des le depart
   * (numero obligatoire, puis permis de conduire a deposer).
   */
  estTransporteur = false;

  /** Indicatifs proposes — la liste s'allonge sans toucher au code. */
  // ── Choix de l'indicatif ───────────────────────────────────────────────────
  //
  // Une liste maison plutot qu'un <select> natif, pour une raison precise : un
  // select affiche le meme texte ouvert et ferme. Or le champ est etroit — il
  // doit l'etre, il partage sa ligne avec le numero — et « +225 Cote d'Ivoire »
  // s'y retrouvait tronque, parfois jusqu'a masquer l'indicatif lui-meme.
  //
  // Ferme, on n'affiche donc que l'indicatif. Ouverte, la liste montre le pays
  // en entier : c'est la qu'on en a besoin, et la place ne manque plus.

  listeIndicatifsOuverte = false;

  /** L'entree correspondant a la valeur du formulaire. */
  get indicatifChoisi() {
    const code = this.form?.get('indicatif')?.value;
    return this.indicatifs.find((i) => i.code === code) ?? this.indicatifs[0];
  }

  basculerIndicatifs(evenement: MouseEvent): void {
    // Sans cela le clic remonte au document et referme ce qu'il vient d'ouvrir.
    evenement.stopPropagation();
    this.listeIndicatifsOuverte = !this.listeIndicatifsOuverte;
  }

  choisirIndicatif(code: string): void {
    this.form.get('indicatif')?.setValue(code);
    this.listeIndicatifsOuverte = false;
  }

  @HostListener('document:click')
  fermerIndicatifs(): void {
    this.listeIndicatifsOuverte = false;
  }

  @HostListener('document:keydown.escape')
  fermerIndicatifsAuClavier(): void {
    this.listeIndicatifsOuverte = false;
  }

  readonly indicatifs = [
    { code: '+225', pays: "Côte d'Ivoire", drapeau: '🇨🇮' },
    { code: '+226', pays: 'Burkina Faso',  drapeau: '🇧🇫' },
    { code: '+223', pays: 'Mali',          drapeau: '🇲🇱' },
    { code: '+221', pays: 'Sénégal',       drapeau: '🇸🇳' },
    { code: '+224', pays: 'Guinée',        drapeau: '🇬🇳' },
    { code: '+228', pays: 'Togo',          drapeau: '🇹🇬' },
    { code: '+229', pays: 'Bénin',         drapeau: '🇧🇯' },
    { code: '+227', pays: 'Niger',         drapeau: '🇳🇪' },
    { code: '+233', pays: 'Ghana',         drapeau: '🇬🇭' },
    { code: '+234', pays: 'Nigeria',       drapeau: '🇳🇬' },
    { code: '+237', pays: 'Cameroun',      drapeau: '🇨🇲' },
    { code: '+33',  pays: 'France',        drapeau: '🇫🇷' },
  ];

  showPassword = false;
  showPasswordConfirmation = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: ToastService,
    private userStatusService: UserStatusService
  ) {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  togglePasswordConfirmation(): void {
    this.showPasswordConfirmation = !this.showPasswordConfirmation;
  }

  controlInvalid(controlName: string, errorName?: string): boolean {
    const control = this.form.get(controlName);

    if (!control) {
      return false;
    }

    const shouldShow = control.invalid && (control.touched || control.dirty || this.submitted);
    return shouldShow && (!errorName || control.hasError(errorName));
  }

  formInvalid(errorName: string): boolean {
    return !!this.form.hasError(errorName) && (this.form.dirty || this.form.touched || this.submitted);
  }

  /** Bascule vendeur/transporteur : le numero devient exige. */
  choisirRole(transporteur: boolean): void {
    this.estTransporteur = transporteur;
    const champ = this.form.get('telephone');
    if (transporteur) {
      champ?.addValidators([Validators.required, Validators.minLength(8)]);
    } else {
      champ?.clearValidators();
    }
    champ?.updateValueAndValidity();
  }

  submit(): void {
    this.submitted = true;
    if (this.form.invalid) return;

    const { surname, name, email, password, indicatif, telephone } = this.form.getRawValue();

    // Le back attend un numero international complet : il ne devine aucun pays.
    const numero = telephone?.trim()
      ? `${indicatif}${telephone.replace(/[^0-9]/g, '')}`
      : undefined;

    this.auth.register({
      surname: surname!, name: name!, email: email!, password: password!,
      phone: numero,
      role: this.estTransporteur ? 'TRANSPORTEUR' : 'ACHETEUR',
    }).subscribe({
      next: (res: any) => {
        // Le token est déjà persisté par AuthService.register() (clé marketplace_token).
        this.userStatusService.update({
          emailVerified: res.emailVerified,
          kycStatus: res.kycStatus,
          role: res.role,
        });
        this.toast.success('Compte crée avec succès');
        this.router.navigate(['/verify-email']);
      },
      error:(err) => {
        this.toast.error(err.error.message || "Erreur inscription");
      }
    });
  }


  private passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const passwordConfirmation = control.get('passwordConfirmation')?.value;

      if (!password || !passwordConfirmation || password === passwordConfirmation) {
        return null;
      }

      return { passwordMismatch: true };
    };
  }
}
