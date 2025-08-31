import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './http.service';
import { firstValueFrom, Observable, of, tap } from 'rxjs';
import { ILoginRequest } from '../models/core.models';
import { AuthStore } from '../store/auth.store';
import { PermissionsStore } from '../store/permission.store';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authStore = inject(AuthStore);
  private permissionsStore = inject(PermissionsStore);

  constructor(private httpService: HttpService, private router: Router) {}

  async login(loginRequest: ILoginRequest): Promise<void> {
    try {
      // Convert the Observable returned by HttpService to a Promise
      const response = await firstValueFrom(
        this.httpService.post<{ token: string; user: any }>(
          'Authentication/login',
          loginRequest
        )
      );

      // ✅ Set token & user in AuthStore
      await this.authStore.setAuth(response.token, response.user);

      // ✅ Load permissions sequentially
      await this.permissionsStore.loadPermissions();

      // ✅ Navigate to dashboard after everything is ready
      this.router.navigateByUrl('/dashboard');
    } catch (err) {
      console.error('Login failed', err);
      throw err;
    }
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
