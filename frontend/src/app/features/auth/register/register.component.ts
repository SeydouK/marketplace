import { Component } from '@angular/core';
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
    },
    {
      validators: this.passwordMatchValidator(),
    }
  );

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

  submit(): void {
    this.submitted = true;
    if (this.form.invalid) return;

    const { surname, name, email, password } = this.form.getRawValue();
    this.auth.register({ surname: surname!, name: name!, email: email!, password: password! }).subscribe({
      next: (res: any) => {
        localStorage.setItem("token", res.token);
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
