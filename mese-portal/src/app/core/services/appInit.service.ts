import { inject, Injectable } from '@angular/core';
import { AuthStore } from '../../core/store/auth.store';
import { PermissionsStore } from '../../core/store/permission.store';
import { MenuStore } from '../../core/store/menu.store';

@Injectable({ providedIn: 'root' })
export class AppInitService {
  public authStore = inject(AuthStore);
  private permissionsStore = inject(PermissionsStore);
  private menuStore = inject(MenuStore);

  async initApp(): Promise<void> {
    // Load auth from localStorage
    debugger;
    this.authStore.loadAuthFromStorage();

    const token = this.authStore.token();
    const user = this.authStore.user();
    if (token && user?.userId) {
      // Load permissions
      await this.permissionsStore.loadPermissions();
    } else {
      // No user → show public menus only
      this.menuStore.resetMenus();
    }
  }
}
