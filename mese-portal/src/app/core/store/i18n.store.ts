import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { inject, WritableSignal, signal } from '@angular/core';
import { I18nService } from '../services/i18n.service';
import { firstValueFrom } from 'rxjs';
import { withDevtools } from '@angular-architects/ngrx-toolkit';

interface I18nState {
  currentLang: string;
  translations: Record<string, string>;
}

const defaultLang = localStorage.getItem('lang') || 'en';

export const I18nStore = signalStore(
  { providedIn: 'root' },
  withState<I18nState>({
    currentLang: defaultLang,
    translations: {},
  }),
  withDevtools('i18nStore'),
  withMethods((store) => {
    const service = inject(I18nService);

    return {
      async init() {
        await this.loadTranslations(store.currentLang() as string);
      },
      async switchLang(lang: string) {
        // Make currentLang writable
        const currentLang: WritableSignal<string> =
          store.currentLang as WritableSignal<string>;
        currentLang.set(lang);

        localStorage.setItem('lang', lang);
        await this.loadTranslations(lang);
      },
      async loadTranslations(lang: string) {
        try {
          const translations = await firstValueFrom(
            service.loadTranslations(lang)
          );
          //console.log(translations);
          patchState(store, { translations: translations || {} });
        } catch (err) {
          console.error('Error loading translations', err);
          patchState(store, { translations: {} });
        }
      },
      getMessage(key: string, args?: Record<string, any>, fallback?: string) {
        const translations = store.translations();
        let msg = getNested(translations, key) || fallback || key;

        if (args) {
          Object.keys(args).forEach((argKey) => {
            msg = msg.replace(`{${argKey}}`, args[argKey]);
          });
        }

        return msg;
      },
    };
  })
);

function getNested(obj: any, path: string): any {
  return path.split('.').reduce((o, key) => (o ? o[key] : undefined), obj);
}
