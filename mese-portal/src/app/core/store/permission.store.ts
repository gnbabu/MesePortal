// permissions.store.ts
import { inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { UsersService } from '../services/user.service';
import { IPermission, IRole } from '../models/core.models';
import { AuthStore } from './auth.store';
import { firstValueFrom } from 'rxjs';
import { MenuStore } from './menu.store';

export interface PermissionsState {
  roles: IRole[];
  permissions: IPermission[];
  loading: boolean;
}

const initialState: PermissionsState = {
  roles: [],
  permissions: [],
  loading: false,
};

export const PermissionsStore = signalStore(
  { providedIn: 'root' },
  withState<PermissionsState>(initialState),
  withDevtools('PermissionsStore'),
  withMethods((store) => {
    const usersService = inject(UsersService);
    const authStore = inject(AuthStore);
    const menuStore = inject(MenuStore);

    return {
      async loadPermissions() {
        const token = authStore.token(); // get token from AuthStore
        if (!token) {
          patchState(store, { roles: [], permissions: [], loading: false });
          menuStore.resetMenus();
          return;
        }

        try {
          patchState(store, { loading: true });

          // Call backend API using UserService
          const user = authStore.user();
          if (!user?.userId) {
            console.warn('No user logged in, skipping permissions load.');
            return;
          }
          patchState(store, { loading: true });
          debugger;
          const response = await firstValueFrom(
            usersService.getUserRolesandPermissions(user.userId)
          );

          const roles = response?.userRoles ?? [];
          const permissions = response?.permissions ?? [];

          patchState(store, { roles, permissions, loading: false });

          // ✅ Load menus based on permission IDs
          debugger;
          const allowedMenuIds = permissions
            .filter((p) => p.type === 'MENU' && p.code) // only MENU type with a code
            .map((p) => p.code); // extract the code

          menuStore.loadUserMenus(allowedMenuIds);
        } catch (err) {
          console.error('Failed to load permissions:', err);
          patchState(store, { roles: [], permissions: [], loading: false });
        }
      },

      clearPermissions() {
        patchState(store, { roles: [], permissions: [] });
        menuStore.resetMenus();
      },
      // ✅ Check if user has a single permission
      hasPermission(permissionCode: string): boolean {
        return store.permissions().some((p) => p.code === permissionCode);
      },

      // ✅ Check if user has all of the provided permissions
      hasPermissions(permissionCodes: string[]): boolean {
        debugger;
        const userPerms = store.permissions().map((p) => p.code);
        return permissionCodes.every((code) => userPerms.includes(code));
      },

      // ✅ Check if user has at least one of the provided permissions
      hasAnyPermission(permissionCodes: string[]): boolean {
        const userPerms = store.permissions().map((p) => p.code);
        return permissionCodes.some((code) => userPerms.includes(code));
      },
    };
  })
);
