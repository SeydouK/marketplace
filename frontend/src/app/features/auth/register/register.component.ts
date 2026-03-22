import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: false,
})
export class RegisterComponent {
  form = this.fb.group(
    {
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
    private toast: ToastService
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

    const { name, email, password } = this.form.getRawValue();
    this.auth.register({ name: name!, email: email!, password: password! }).subscribe({
      next: () => {
        this.toast.success('Compte cree avec succes');
        this.router.navigate(['/']);
      },
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
