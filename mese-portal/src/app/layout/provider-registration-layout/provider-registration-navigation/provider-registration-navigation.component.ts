import { CommonModule } from '@angular/common';
import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
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
  @ViewChild('iconNavbar') iconNavbar!: ElementRef;

  constructor(private router: Router, private ngZone: NgZone) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.syncSelectedItem(event.urlAfterRedirects);
        // Scroll main page to top
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

        // Run scrollToActive once after navigation completes
        setTimeout(() => {
          this.scrollToActive();
        }, 0);
      });
  }

  private syncSelectedItem(url: string) {
    if (url.includes('provider-information'))
      this.selectedItem = 'Provider Information';
    else if (url.includes('primary-contact-information'))
      this.selectedItem = 'Primary Contact Information';
    else if (url.includes('primary-service-address'))
      this.selectedItem = 'Primary Service Address';
    else if (url.includes('billing-payment-address'))
      this.selectedItem = 'Billing & Payment Address';
    else if (url.includes('correspondence-address'))
      this.selectedItem = 'Correspondence Address';
    else if (url.includes('other-service-locations'))
      this.selectedItem = 'Other Service Locations';
    else if (url.includes('reg-1099-address'))
      this.selectedItem = '1099 Address';
    else if (url.includes('home-office-address'))
      this.selectedItem = 'Home Office Address';
    else if (url.includes('reports')) this.selectedItem = 'Reports';
    else this.selectedItem = 'Jump to';
  }

  private scrollToActive() {
    if (!this.iconNavbar) return;

    const activeLink: HTMLElement | null =
      this.iconNavbar.nativeElement.querySelector('a.active');

    if (activeLink) {
      activeLink.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }
}
