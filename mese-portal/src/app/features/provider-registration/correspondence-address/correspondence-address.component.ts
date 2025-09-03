import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-correspondence-address',
  imports: [],
  templateUrl: './correspondence-address.component.html',
  styleUrl: './correspondence-address.component.scss',
})
export class CorrespondenceAddressComponent {
  private router = inject(Router);
  goToNext() {
    this.router.navigateByUrl('/provider-registration/other-service-locations');
  }
  goToPrevious() {
    this.router.navigateByUrl('/provider-registration/billing-payment-address');
  }
}
