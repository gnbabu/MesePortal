import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-billing-payment-address',
  imports: [],
  templateUrl: './billing-payment-address.component.html',
  styleUrl: './billing-payment-address.component.scss',
})
export class BillingPaymentAddressComponent {
  private router = inject(Router);
  goToNext() {
    this.router.navigateByUrl('/provider-registration/correspondence-address');
  }
  goToPrevious() {
    this.router.navigateByUrl('/provider-registration/primary-service-address');
  }
}
