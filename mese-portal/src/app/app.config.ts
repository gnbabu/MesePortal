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
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    AuthStore,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([authInterceptor, loadingInterceptor])),
    provideRouter(routes),
    provideAnimations(),
    provideToastr({
      timeOut: 10000,
      positionClass: 'toast-bottom-full-width',
      closeButton: true,
      progressBar: true,
      preventDuplicates: true,
    }),
    // APP_INITIALIZER with async support
    // Load Menus and permissions on refresh
    provideAppInitializer(() => {
      const appInit = inject(AppInitService);
      return appInit.initApp();
    }),
  ],
};
