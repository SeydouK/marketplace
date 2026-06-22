import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly TOKEN_KEY = 'marketplace_token';
  private readonly USER_KEY = 'marketplace_user';
  private readonly EMAIL_VERIFIED_KEY = 'emailVerified'; // ← ajouter
  private readonly KYC_STATUS_KEY = 'kycStatus';         // ← ajouter
  private readonly ROLE_KEY = 'role';                    // ← ajouter

  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  setUser(user: User) {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  getUser(): User | null {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  clear() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.EMAIL_VERIFIED_KEY);
    localStorage.removeItem(this.KYC_STATUS_KEY);     
    localStorage.removeItem(this.ROLE_KEY);           
  }
}