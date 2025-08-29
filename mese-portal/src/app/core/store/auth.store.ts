import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { IUser } from '../models/core.models';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { PermissionsStore } from './permission.store';

export interface AuthState {
  token: string | null;
  user: IUser | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
};

export const AuthStore = signalStore(
  withState<AuthState>(initialState),
  withDevtools('AuthStore'),
  withMethods((store) => ({
    setAuth(token: string, user: IUser) {
      patchState(store, { token, user });
      debugger;
      localStorage.setItem('mese_token', token);
      localStorage.setItem('mese_user', JSON.stringify(user));
    },
    logout() {
      patchState(store, { token: null, user: null });
      localStorage.removeItem('mese_token');
      localStorage.removeItem('mese_user');
    },
    // Computed signals must be defined as a **getter method**
    get isLoggedIn() {
      return computed(() => !!store.token());
    },
  }))
);
