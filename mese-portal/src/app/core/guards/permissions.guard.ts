import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PermissionsStore } from '../store/permission.store';

export const permissionsGuard: CanActivateFn = (route, state) => {
  const permissionsStore = inject(PermissionsStore);
  const router = inject(Router);

  const requiredPermissions = route.data?.['permissions'] as
    | string[]
    | undefined;

  const hasAccess = requiredPermissions?.length
    ? permissionsStore.hasPermissions(requiredPermissions)
    : false;

  if (hasAccess) {
    return true;
  }

  // User does not have required permissions, redirect
  router.navigate(['/forbidden']);
  return false;
};
