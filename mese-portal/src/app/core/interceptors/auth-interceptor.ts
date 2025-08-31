// auth.interceptor.ts
import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AuthStore } from '../store/auth.store';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authStore = inject(AuthStore);
  const authService = inject(AuthService);

  // Skip login API

  if (req.url.endsWith('Authentication/login')) {
    return next(req);
  }

  const token = authStore.token();

  const authReq = token
    ? req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 0) {
        // Network/server error
        alert(
          'Cannot connect to server. Please check your internet or server status.'
        );
      } else if (error.status === 401) {
        // Token invalid or expired
        authService.logout(); // clears store + navigates
      }
      return throwError(() => error);
    })
  );
};
