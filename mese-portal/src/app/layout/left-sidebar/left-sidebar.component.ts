import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MenuStore } from '../../core/store/menu.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.scss',
})
export class LeftSidebarComponent {
  @Input() sidebarActive = false;
  @Output() close = new EventEmitter<void>();
  menuStore = inject(MenuStore);
}
