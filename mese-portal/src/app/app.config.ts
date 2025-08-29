import {
  ApplicationConfig,
  importProvidersFrom,
  inject,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthStore } from './core/store/auth.store';
import { authInterceptor } from './core/interceptors/auth-interceptor';
import { AppInitService } from './core/services/appInit.service';

export const appConfig: ApplicationConfig = {
  providers: [
    AuthStore,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(routes),
    // APP_INITIALIZER with async support
    // Load Menus and permissions on refresh
    provideAppInitializer(() => {
      const appInit = inject(AppInitService);
      return appInit.initApp();
    }),
  ],
};
