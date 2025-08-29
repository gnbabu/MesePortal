import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.scss',
})
export class LeftSidebarComponent {
  @Input() sidebarActive = false;
  @Output() close = new EventEmitter<void>();
}
