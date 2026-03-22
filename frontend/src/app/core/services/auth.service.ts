import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { JwtResponse } from '../models/jwt-response.model';
import { User } from '../models/user.model';
import { Role } from '../models/role.enum';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;

  constructor(private http: HttpClient, private storage: StorageService) {
    this.currentUserSubject = new BehaviorSubject<User | null>(this.storage.getUser());
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http
      .post<JwtResponse>(`${environment.apiUrl}/auth/login`, { email, password })
      .pipe(
        tap((res) => {
          const user: User = {
            id: res.id,
            email: res.email,
            role: res.role,
            name: res.name,
          };
          this.storage.setToken(res.token);
          this.storage.setUser(user);
          this.currentUserSubject.next(user);
        })
      );
  }

  register(data: {
    name: string;
    email: string;
    password: string;
  }) {
    return this.http
      .post<JwtResponse>(`${environment.apiUrl}/auth/register`, data)
      .pipe(
        tap((res) => {
          const user: User = {
            id: res.id,
            email: res.email,
            role: res.role,
            name: res.name,
          };
          this.storage.setToken(res.token);
          this.storage.setUser(user);
          this.currentUserSubject.next(user);
        })
      );
  }

  isLoggedIn(): boolean {
    return !!this.storage.getToken();
  }

  hasRole(role: Role): boolean {
    return this.currentUser?.role === role;
  }

  logout() {
    this.storage.clear();
    this.currentUserSubject.next(null);
  }
}
