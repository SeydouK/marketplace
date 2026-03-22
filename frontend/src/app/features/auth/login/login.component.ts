import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false,
})
export class LoginComponent {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember: [false],
  });

  showPassword = false;
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

  controlInvalid(controlName: string, errorName?: string): boolean {
    const control = this.form.get(controlName);

    if (!control) {
      return false;
    }

    const shouldShow = control.invalid && (control.touched || control.dirty || this.submitted);
    return shouldShow && (!errorName || control.hasError(errorName));
  }

  submit(): void {
    this.submitted = true;
    if (this.form.invalid) return;
    const { email, password } = this.form.value;
    this.auth.login(email!, password!).subscribe({
      next: () => {
        this.toast.success('Connexion reussie');
        this.router.navigate(['/']);
      },
    });
  }
}
