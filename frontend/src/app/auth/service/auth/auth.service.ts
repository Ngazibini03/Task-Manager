import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

const BASE_URL = "http://localhost:8080/api/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(signupRequest: any): Observable<any> {
    return this.http.post(`${BASE_URL}/signup`, signupRequest).pipe(
      tap(response => console.log('Signup successful:', response)),
      catchError(error => {
        console.error('Signup failed:', error);
        return throwError(() => error);
      })
    );
  }

  login(loginRequest: any): Observable<any> {
    return this.http.post(`${BASE_URL}/login`, loginRequest).pipe(
      tap((response: any) => {
        if (response.jwt) {
          localStorage.setItem('token', response.jwt); // Store JWT token
          localStorage.setItem('userId', response.userId); // Store user ID
          localStorage.setItem('role', response.userRole); // Store user role
        }
      }),
      catchError(error => {
        console.error('Login failed:', error);
        return throwError(() => error);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // Returns true if the token exists
  }

  getToken(): string | null {
    return localStorage.getItem('token'); // Retrieve stored token
  }

  getUserRole(): string | null {
    return localStorage.getItem('role'); // Retrieve stored user role
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
}
