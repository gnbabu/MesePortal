import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  AppTitle = signal<string>(environment.displayName);
  title = 'mese-portal';

  sidebarActive = false;

  openSidebar() {
    this.sidebarActive = true;
  }

  closeSidebar() {
    this.sidebarActive = false;
  }
}
