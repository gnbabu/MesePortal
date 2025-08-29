import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MasterLayoutComponent } from './layout/master-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { permissionsGuard } from './core/guards/permissions.guard';

export const routes: Routes = [
  {
    path: '',
    component: MasterLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login.component').then((m) => m.LoginComponent),
        canActivate: [authGuard],
      }, // login inside layout
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
        canActivate: [authGuard, permissionsGuard],
        data: { permissions: ['DASHBOARD.VIEW'] },
      },
      {
        path: 'forbidden',
        loadComponent: () =>
          import('./pages/forbidden/forbidden.component').then(
            (m) => m.ForbiddenComponent
          ),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
