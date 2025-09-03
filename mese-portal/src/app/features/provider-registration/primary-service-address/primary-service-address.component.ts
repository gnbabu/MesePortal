import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-primary-service-address',
  imports: [],
  templateUrl: './primary-service-address.component.html',
  styleUrl: './primary-service-address.component.scss',
})
export class PrimaryServiceAddressComponent {
  private router = inject(Router);
  goToNext() {
    this.router.navigateByUrl('/provider-registration/billing-payment-address');
  }
  goToPrevious() {
    this.router.navigateByUrl(
      '/provider-registration/primary-contact-information'
    );
  }
}
