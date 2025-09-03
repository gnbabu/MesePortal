import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ProviderDetailsHeaderComponent } from './provider-details-header/provider-details-header.component';
import { ProviderRegistrationNavigationComponent } from './provider-registration-navigation/provider-registration-navigation.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-provider-registration-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    ProviderDetailsHeaderComponent,
    ProviderRegistrationNavigationComponent,
  ],
  templateUrl: './provider-registration-layout.component.html',
  styleUrl: './provider-registration-layout.component.scss',
})
export class ProviderRegistrationLayoutComponent {}
