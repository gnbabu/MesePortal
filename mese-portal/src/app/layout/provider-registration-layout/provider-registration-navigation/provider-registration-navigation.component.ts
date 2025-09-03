import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2 } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-provider-registration-navigation',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './provider-registration-navigation.component.html',
  styleUrl: './provider-registration-navigation.component.scss',
})
export class ProviderRegistrationNavigationComponent {
  selectedItem = 'Jump to';
  constructor(private router: Router) {}

  ngOnInit() {
    // Update dropdown label when navigation happens
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.syncSelectedItem(event.urlAfterRedirects);
      });
  }

  setSelected(item: string) {
    this.selectedItem = item;
  }

  private syncSelectedItem(url: string) {
    switch (true) {
      case url.includes('provider-information'):
        this.selectedItem = 'Provider Information';
        break;
      case url.includes('primary-contact-information'):
        this.selectedItem = 'Primary Contact Information';
        break;
      case url.includes('primary-service-address'):
        this.selectedItem = 'Primary Service Address';
        break;
      case url.includes('billing-payment-address'):
        this.selectedItem = 'Billing & Payment Address';
        break;
      case url.includes('correspondence-address'):
        this.selectedItem = 'Correspondence Address';
        break;
      case url.includes('other-service-locations'):
        this.selectedItem = 'Other Service Locations';
        break;
      case url.includes('reg-1099-address'):
        this.selectedItem = '1099 Address';
        break;
      case url.includes('home-office-address'):
        this.selectedItem = 'Home Office Address';
        break;
      case url.includes('reports'):
        this.selectedItem = 'Reports';
        break;
      default:
        this.selectedItem = 'Jump to';
    }
  }
}
