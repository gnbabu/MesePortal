import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-primary-contact-information',
  imports: [],
  templateUrl: './primary-contact-information.component.html',
  styleUrl: './primary-contact-information.component.scss',
})
export class PrimaryContactInformationComponent {
  private router = inject(Router);
  goToNext() {
    this.router.navigateByUrl('/provider-registration/primary-service-address');
  }
  goToPrevious() {
    this.router.navigateByUrl('/provider-registration/provider-information');
  }
}
