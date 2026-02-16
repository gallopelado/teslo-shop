import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

type AuthStatus = 'checking'|'authenticated'|'not-authenticated';
const baseUrl = environment.baseUrl;

@Injectable({providedIn: 'root'})
export class AuthService {

  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<User|null>(null);
  private _token = signal<string|null>(localStorage.getItem('token'));

  private http = inject(HttpClient);


  checkStatusResource = rxResource({
    loader: () => this.checkStatus()
  });


  // se hacen computed porque son de lectura
  // asi evitamos modificaciones de las signals
  authStatus = computed<AuthStatus>(() => {
    if(this._authStatus() === 'checking') {
      return 'checking';
    }
    if(this._user()) {
      return 'authenticated';
    }
    return 'not-authenticated';
  });

  user = computed<User|null>(() => {
    return this._user();
  });

  token = computed<string|null>(() => {
    return this._token();
  });

  createUser(fullName: string, email: string, password: string) {
    return this.http.post<AuthResponse>(`${ baseUrl }/auth/register`, {
      fullName: fullName, email: email, password: password
    }).pipe(
      map(resp => {
        console.log(resp);
        return this.handleAuthSuccess(resp);
      }),
      catchError((error: any) => {
        console.log(error);
        return of(false);
      })
    )
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<AuthResponse>(`${ baseUrl }/auth/login`, {
      email: email, password: password
    }).pipe(
      map(resp => {
        return this.handleAuthSuccess(resp);
      }),
      catchError((error: any) => {
        return this.handleAuthError(error);
      })
    )
  }

  checkStatus(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if(!token) {
      this.logout();
      return of(false);
    }

    return this.http.get<AuthResponse>(`${ baseUrl }/auth/check-status`, {
      // headers: {
      //   Authorization: `Bearer ${ token }`
      // },
    }).pipe(
      map(resp => {
        return this.handleAuthSuccess(resp);
      }),
      catchError((error: any) => {
        return this.handleAuthError(error);
      })
    )
  }

  logout() {
    this._user.set(null);
    this._token.set(null);
    this._authStatus.set('not-authenticated');

    localStorage.removeItem('token');
  }

  private handleAuthSuccess({ token, user }: AuthResponse) {
    this._user.set(user);
    this._token.set(token);
    this._authStatus.set('authenticated');

    localStorage.setItem('token', token);

    return true;
  }

  private handleAuthError(error: any) {
    this.logout();
    return of(false);
  }

}
