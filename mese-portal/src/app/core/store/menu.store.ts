// stores/menu.store.ts
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { IMenu } from '../models/core.models';
import { ALL_MENUS } from '../../config/menus.config';

interface MenuState {
  menus: IMenu[]; // visible menus
  allMenus: IMenu[]; // reference for mapping
}

const initialState: MenuState = {
  menus: ALL_MENUS.filter((m) => m.isPublic).sort((a, b) => a.order - b.order),
  allMenus: ALL_MENUS,
};

export const MenuStore = signalStore(
  { providedIn: 'root' },
  withState<MenuState>(initialState),
  withDevtools('MenuStore'),
  withMethods((store) => ({
    // Load menus for logged-in user
    loadUserMenus(allowedIds: string[]) {
      const userMenus = store
        .allMenus()
        .filter((m) => m.isPublic || allowedIds.includes(m.permissionCode))
        .sort((a, b) => a.order - b.order);

      patchState(store, { menus: userMenus });
    },
    // Reset to only public menus (on logout)
    resetMenus() {
      const publicMenus = store
        .allMenus()
        .filter((m) => m.isPublic)
        .sort((a, b) => a.order - b.order);

      patchState(store, { menus: publicMenus });
    },
  }))
);
