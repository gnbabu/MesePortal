import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-office-address',
  imports: [],
  templateUrl: './home-office-address.component.html',
  styleUrl: './home-office-address.component.scss',
})
export class HomeOfficeAddressComponent {
  private router = inject(Router);
  goToNext() {
    this.router.navigateByUrl('/provider-registration/reports');
  }
  goToPrevious() {
    this.router.navigateByUrl('/provider-registration/reg-1099-address');
  }
}
