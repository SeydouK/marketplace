// features/auth/login/login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';

const SAVED_USER_KEY = 'bm_saved_user';

interface SavedUser {
  name: string;
  email: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false,
})
export class LoginComponent implements OnInit {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember: [false],
  });

  showPassword = false;
  submitted = false;

  // Utilisateur reconnu depuis localStorage
  savedUser: SavedUser | null = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    try {
      const raw = localStorage.getItem('bm_saved_user');
      console.log('savedUser raw:', raw); // debug
      if (raw) {
        this.savedUser = JSON.parse(raw);
        this.form.patchValue({ email: this.savedUser!.email });
      }
    } catch {
      this.savedUser = null;
    }
  }

  get savedUserInitial(): string {
    return (this.savedUser?.name ?? '?').charAt(0).toUpperCase();
  }

  get maskedSavedEmail(): string {
    const email = this.savedUser?.email ?? '';
    const [local, domain] = email.split('@');
    if (!domain || local.length < 2) return email;
    return local.charAt(0) + '***' + local.charAt(local.length - 1) + '@' + domain;
  }

  clearSavedUser(): void {
    localStorage.removeItem(SAVED_USER_KEY);
    this.savedUser = null;
    this.form.patchValue({ email: '', password: '' });
    this.form.markAsUntouched();
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  controlInvalid(controlName: string, errorName?: string): boolean {
    const control = this.form.get(controlName);
    if (!control) return false;
    const shouldShow = control.invalid && (control.touched || control.dirty || this.submitted);
    return shouldShow && (!errorName || control.hasError(errorName));
  }

  submit(): void {
    this.submitted = true;
    if (this.form.invalid) return;
  
    const { email, password } = this.form.value;
    this.auth.login(email!, password!).subscribe({
      next: () => {
        // currentUser est déjà hydraté par le tap() dans AuthService
        const user = this.auth.currentUser;
        const toSave = {
          name: user?.name ?? email!.split('@')[0],
          email: email!,
        };
        localStorage.setItem('bm_saved_user', JSON.stringify(toSave));
  
        this.toast.success('Connexion réussie');
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.toast.error('Email ou mot de passe incorrect');
        console.error(err);
      }
    });
  }
}