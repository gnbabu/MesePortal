import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProviderSelectionService } from '../../services/provider-selection.service';

@Component({
  selector: 'app-provider-type-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './provider-type-selection.component.html',
  styleUrl: './provider-type-selection.component.scss',
})
export class ProviderTypeSelectionComponent {
  private router = inject(Router);
  providerSelection = inject(ProviderSelectionService);
  changeProviderTypeSelection() {
    this.router.navigateByUrl('/provider-selection');
  }

  gotoCreateNewProvider(category: string) {
    this.providerSelection.selectedCategory.set(category);
    this.router.navigateByUrl('/new-provider');
  }
}
