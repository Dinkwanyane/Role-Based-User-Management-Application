import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

export interface CreateUserPayload {
  username: string;
  name: string;
  surname: string;
  password: string;
}

export interface CreateUserResponse {
  id: number;
  username: string;
  name: string;
  surname: string;
  role?: string;
}

export interface AppUser {
  id: number;
  username: string;
  name: string;
  surname: string;
  role: 'admin' | 'user';
}

const API_BASE = 'http://localhost:8000/api';

@Injectable({ providedIn: 'root' })
export class AuthService {
  currentUser = signal<AppUser | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  getUsers(): Observable<AppUser[]> {
    return this.http.get<AppUser[]>(
      `${API_BASE}/users/`,
      { withCredentials: true }
    );
  }

  createUser(payload: CreateUserPayload): Observable<CreateUserResponse> {
    return this.http.post<CreateUserResponse>(
      `${API_BASE}/users/`,
      payload,
      { withCredentials: true }
    );
  }

  fetchCsrfToken(): Observable<any> {
    return this.http.get(`${API_BASE}/auth/csrf/`, { withCredentials: true });
  }

  login(username: string, password: string): Observable<AppUser> {
    return this.http
      .post<AppUser>(`${API_BASE}/auth/login/`, { username, password }, { withCredentials: true })
      .pipe(tap(user => this.currentUser.set(user)));
  }

  logout(): void {
    this.http.post(`${API_BASE}/auth/logout/`, {}, { withCredentials: true }).subscribe({
      next: () => {
        this.currentUser.set(null);
        this.router.navigate(['/login']);
      },
      error: () => {
        this.currentUser.set(null);
        this.router.navigate(['/login']);
      }
    });
  }

  fetchCurrentUser(): Observable<AppUser> {
    return this.http
      .get<AppUser>(`${API_BASE}/auth/me/`, { withCredentials: true })
      .pipe(tap(user => this.currentUser.set(user)));
  }

  isAuthenticated(): boolean {
    return this.currentUser() !== null;
  }
}


