import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProviderSelectionService } from '../../services/provider-selection.service';

@Component({
  selector: 'app-provider-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './provider-selection.component.html',
  styleUrl: './provider-selection.component.scss',
})
export class ProviderSelectionComponent {
  private router = inject(Router);
  private providerSelection = inject(ProviderSelectionService);
  showAll = false;

  toggleShowAll() {
    this.showAll = !this.showAll;
  }
  goToProviderTypePage(type: string) {
    this.providerSelection.selectedApplicationType.set(type);
    this.router.navigateByUrl('/provider-type-selection');
  }
}
