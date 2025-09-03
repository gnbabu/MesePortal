import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-other-service-locations',
  imports: [],
  templateUrl: './other-service-locations.component.html',
  styleUrl: './other-service-locations.component.scss',
})
export class OtherServiceLocationsComponent {
  private router = inject(Router);
  goToNext() {
    this.router.navigateByUrl('/provider-registration/reg-1099-address');
  }
  goToPrevious() {
    this.router.navigateByUrl('/provider-registration/correspondence-address');
  }
}
