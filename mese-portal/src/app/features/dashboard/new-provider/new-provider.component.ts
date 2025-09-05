import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProviderSelectionService } from '../../services/provider-selection.service';

@Component({
  selector: 'app-new-provider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './new-provider.component.html',
  styleUrl: './new-provider.component.scss',
})
export class NewProviderComponent {
  private router = inject(Router);
  providerSelection = inject(ProviderSelectionService);
  createNewProvider() {
    this.router.navigateByUrl('/provider-registration');
  }
  cancel() {
    this.router.navigateByUrl('/dashboard');
  }
}
