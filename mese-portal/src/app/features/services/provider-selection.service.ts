import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProviderSelectionService {
  selectedApplicationType = signal<string>('');
  selectedCategory = signal<string>('');
}
