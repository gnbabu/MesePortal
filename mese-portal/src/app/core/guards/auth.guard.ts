// auth.guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthStore } from '../store/auth.store';

export const authGuard: CanActivateFn = (route, state) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);
  debugger;
  if (authStore.isLoggedIn()) {
    // If trying to go to login while logged in, redirect to dashboard
    if (state.url === '/login') {
      router.navigate(['/dashboard']);
      return false;
    }
    return true;
  } else {
    // Not logged in → allow login page only
    if (state.url === '/login') {
      return true;
    }
    router.navigate(['/login']);
    return false;
  }
};
