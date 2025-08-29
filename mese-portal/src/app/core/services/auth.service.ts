import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './http.service';
import { Observable, of, tap } from 'rxjs';
import { ILoginRequest } from '../models/core.models';
import { AuthStore } from '../store/auth.store';
import { PermissionsStore } from '../store/permission.store';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authStore = inject(AuthStore);
  private permissionsStore = inject(PermissionsStore);

  constructor(private httpService: HttpService, private router: Router) {}

  login(loginRequest: ILoginRequest): Observable<any> {
    return this.httpService
      .post<{ token: string; user: any }>('Authentication/login', loginRequest)
      .pipe(
        tap(async (response) => {
          // ✅ set token & user
          this.authStore.setAuth(response.token, response.user);

          // ✅ immediately load permissions
          await this.permissionsStore.loadPermissions();
          this.router.navigateByUrl('/dashboard');
        })
      );
  }

  logout() {
    this.authStore.logout();
    this.router.navigateByUrl('/login');
  }

  restoreSession() {
    const token = localStorage.getItem('mese_token');
    const user = localStorage.getItem('mese_user');
    if (token && user) {
      this.authStore.setAuth(token, JSON.parse(user));
    }
  }
}
