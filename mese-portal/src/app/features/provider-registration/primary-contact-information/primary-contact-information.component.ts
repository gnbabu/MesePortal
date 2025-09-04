import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-primary-contact-information',
  imports: [],
  templateUrl: './primary-contact-information.component.html',
  styleUrl: './primary-contact-information.component.scss',
})
export class PrimaryContactInformationComponent {
  private router = inject(Router);
  private toastService = inject(ToastService);
  goToNext() {
    this.toastService.success(
      'Primary Contact Information saved successfully!'
    );
    this.router.navigateByUrl('/provider-registration/primary-service-address');
  }
  goToPrevious() {
    this.router.navigateByUrl('/provider-registration/provider-information');
  }
}
