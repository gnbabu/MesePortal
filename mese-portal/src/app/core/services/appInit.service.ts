import { inject, Injectable } from '@angular/core';
import { AuthStore } from '../../core/store/auth.store';
import { PermissionsStore } from '../../core/store/permission.store';
import { MenuStore } from '../../core/store/menu.store';
import { I18nStore } from '../store/i18n.store';

@Injectable({ providedIn: 'root' })
export class AppInitService {
  public authStore = inject(AuthStore);
  private permissionsStore = inject(PermissionsStore);
  private menuStore = inject(MenuStore);
  private i18nStore = inject(I18nStore);

  async initApp(): Promise<void> {
    this.i18nStore.init();
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
