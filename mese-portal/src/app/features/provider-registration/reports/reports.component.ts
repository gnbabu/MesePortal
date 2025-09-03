import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports',
  imports: [],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
})
export class ReportsComponent {
  private router = inject(Router);
  goToNext() {}
  goToPrevious() {
    this.router.navigateByUrl('/provider-registration/home-office-address');
  }
}
