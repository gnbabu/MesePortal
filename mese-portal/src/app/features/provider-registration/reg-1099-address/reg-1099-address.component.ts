import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reg-1099-address',
  imports: [],
  templateUrl: './reg-1099-address.component.html',
  styleUrl: './reg-1099-address.component.scss',
})
export class Reg1099AddressComponent {
  private router = inject(Router);
  goToNext() {
    this.router.navigateByUrl('/provider-registration/home-office-address');
  }
  goToPrevious() {
    this.router.navigateByUrl('/provider-registration/other-service-locations');
  }
}
