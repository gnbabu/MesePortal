import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class I18nService {
  constructor(private http: HttpClient) {}

  loadTranslations(lang: string): Observable<Record<string, string>> {
    return this.http.get<Record<string, any>>(`/assets/i18n/${lang}.json`);
  }
}
