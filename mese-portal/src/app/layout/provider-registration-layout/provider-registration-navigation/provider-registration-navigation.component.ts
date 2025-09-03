import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-provider-registration-navigation',
  imports: [],
  templateUrl: './provider-registration-navigation.component.html',
  styleUrl: './provider-registration-navigation.component.scss',
})
export class ProviderRegistrationNavigationComponent {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  setActive(event: Event) {
    event.preventDefault();
    const links = this.el.nativeElement.querySelectorAll('.icon-navbar a');
    links.forEach((link: HTMLElement) =>
      this.renderer.removeClass(link, 'active')
    );
    this.renderer.addClass(event.currentTarget as HTMLElement, 'active');
  }
}
