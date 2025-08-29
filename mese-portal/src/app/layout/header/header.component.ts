import { Component, EventEmitter, Output, inject } from '@angular/core';
import { AuthStore } from '../../core/store/auth.store';
import { PermissionsStore } from '../../core/store/permission.store';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  authStore = inject(AuthStore);
  permissionsStore = inject(PermissionsStore);
  private router = inject(Router);

  @Output() toggleSidebar = new EventEmitter<void>();

  logOut() {
    this.authStore.logout();
    this.permissionsStore.clearPermissions();
    this.router.navigateByUrl('/login');
  }
}
