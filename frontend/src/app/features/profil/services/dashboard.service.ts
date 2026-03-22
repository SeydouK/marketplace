import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { User } from '../../../core/models/user.model';
import { Listing } from '../../annonces/models/listing.model';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(private http: HttpClient) {}

  me(): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/users/me`);
  }

  myListings(): Observable<Listing[]> {
    return this.http.get<Listing[]>(`${environment.apiUrl}/users/me/listings`);
  }
}
