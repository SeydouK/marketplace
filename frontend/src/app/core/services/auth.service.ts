import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { JwtResponse } from '../models/jwt-response.model';
import { User } from '../models/user.model';
import { Role } from '../models/role.enum';
import { StorageService } from './storage.service';
import { UserStatusService } from './user-status.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly sellerRoles = new Set<Role>([
    Role.VENDEUR,
    Role.ADMIN,
    Role.ADMINISTRATEUR,
  ]);

  private readonly healthValidationRoles = new Set<Role>([
    // Role.AGENT_ANADER,
    Role.VETERINAIRE,
    // Role.ADMIN,
    // Role.ADMINISTRATEUR,
  ]);

  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;

  constructor(private http: HttpClient, private storage: StorageService, private userStatusService: UserStatusService) {
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
          this.storage.setToken(res.token);
          this.setCurrentUser({
            id: res.id,
            email: res.email,
            role: res.role,
            name: res.name,
            emailVerified: res.emailVerified,
            kycStatus: res.kycStatus as User['kycStatus'],
            devenirVendeur: res.devenirVendeur,
          });
        })
      );
  }

  register(data: {
    surname: string;
    name: string;
    email: string;
    password: string;
  }) {
    return this.http
      .post<JwtResponse>(`${environment.apiUrl}/auth/register`, data)
      .pipe(
        tap((res) => {
          this.storage.setToken(res.token);
          this.setCurrentUser({
            id: res.id,
            email: res.email,
            role: res.role,
            name: res.name,
            emailVerified: res.emailVerified,
            kycStatus: res.kycStatus as User['kycStatus'],
            devenirVendeur: res.devenirVendeur,
          });
        })
      );
  }

  refreshCurrentUser(): Observable<User> {
    return this.http
      .get<User>(`${environment.apiUrl}/users/me`)
      .pipe(tap((user) => this.setCurrentUser(user)));
  }

  requestSellerAccess(): Observable<User> {
    return this.http
      .post<User>(`${environment.apiUrl}/users/me/seller-request`, {})
      .pipe(tap((user) => this.setCurrentUser(user)));
  }

  isLoggedIn(): boolean {
    return !!this.storage.getToken();
  }

  hasRole(role: Role): boolean {
    return this.currentUser?.role === role;
  }

  hasAnyRole(roles: Role[]): boolean {
    return !!this.currentUser?.role && roles.includes(this.currentUser.role);
  }

  get canAccessHealthValidation(): boolean {
    return !!this.currentUser?.role && this.healthValidationRoles.has(this.currentUser.role);
  }

  get canAccessSellerArea(): boolean {
    return !!this.currentUser?.role && this.sellerRoles.has(this.currentUser.role);
  }

  get isSellerRequestPending(): boolean {
    return !!this.currentUser?.devenirVendeur;
  }

  logout() {
    this.storage.clear();
    this.currentUserSubject.next(null);
    this.userStatusService.clear();
  }

  private setCurrentUser(user: User): void {
    this.storage.setUser(user);
    this.currentUserSubject.next(user);

    this.userStatusService.update({
      emailVerified: user.emailVerified ?? false,
      kycStatus: user.kycStatus ?? null,
      role: user.role,
    });
  }
}
