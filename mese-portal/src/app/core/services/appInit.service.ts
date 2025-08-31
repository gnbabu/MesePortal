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

  /**
   * Initialize application on startup:
   * 1. Load i18n
   * 2. Restore auth from localStorage
   * 3. Load permissions and menus if user is logged in
   * 4. Reset menus to public if no user
   */
  async initApp(): Promise<void> {
    try {
      // 1️⃣ Initialize i18n
      this.i18nStore.init();

      // 2️⃣ Restore auth from localStorage
      await this.authStore.loadAuthFromStorage();

      const token = this.authStore.token();
      const user = this.authStore.user();

      if (token && user?.userId) {
        // 3️⃣ Load permissions and menus sequentially
        await this.permissionsStore.loadPermissions();
      } else {
        // 4️⃣ Reset menus to public only
        this.menuStore.resetMenus();
      }
    } catch (err) {
      console.error('App initialization failed:', err);
      // Ensure menus are at least public
      this.menuStore.resetMenus();
    }
  }
}
