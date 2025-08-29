// permissions.store.ts
import { inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { UsersService } from '../services/user.service';
import { IPermission, IRole } from '../models/core.models';
import { AuthStore } from './auth.store';
import { firstValueFrom } from 'rxjs';

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

    return {
      async loadPermissions() {
        const token = authStore.token(); // get token from AuthStore
        if (!token) {
          patchState(store, { roles: [], permissions: [], loading: false });
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

          patchState(store, {
            roles: response?.userRoles ?? [],
            permissions: response?.permissions ?? [],
            loading: false,
          });
        } catch (err) {
          console.error('Failed to load permissions:', err);
          patchState(store, { roles: [], permissions: [], loading: false });
        }
      },

      clearPermissions() {
        patchState(store, { roles: [], permissions: [] });
      },
    };
  })
);
