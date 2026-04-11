import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface UserStatus {
  emailVerified: boolean;
  kycStatus: string | null;
  role: string | null;
}

@Injectable({ providedIn: 'root' })
export class UserStatusService {

  private statusSubject = new BehaviorSubject<UserStatus>(this.loadFromStorage());
  status$ = this.statusSubject.asObservable();

  private loadFromStorage(): UserStatus {
    return {
      emailVerified: localStorage.getItem('emailVerified') === 'true',
      kycStatus: localStorage.getItem('kycStatus'),
      role: localStorage.getItem('role'),
    };
  }

  update(status: Partial<UserStatus>): void {
    const current = this.statusSubject.value;
    const updated = { ...current, ...status };

    localStorage.setItem('emailVerified', String(updated.emailVerified));
    if (updated.kycStatus) localStorage.setItem('kycStatus', updated.kycStatus);
    if (updated.role) localStorage.setItem('role', updated.role);

    this.statusSubject.next(updated);
  }

  clear(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('emailVerified');
    localStorage.removeItem('kycStatus');
    localStorage.removeItem('role');
    this.statusSubject.next({ emailVerified: false, kycStatus: null, role: null });
  }

  get snapshot(): UserStatus {
    return this.statusSubject.value;
  }
}