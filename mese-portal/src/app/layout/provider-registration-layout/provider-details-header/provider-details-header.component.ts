import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-provider-details-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './provider-details-header.component.html',
  styleUrl: './provider-details-header.component.scss',
})
export class ProviderDetailsHeaderComponent {
  isExpanded = false;
  toggleDetails() {
    this.isExpanded = !this.isExpanded;
  }
}
