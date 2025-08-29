import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MasterLayoutComponent } from './layout/master-layout.component';

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
      }, // login inside layout
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      // add more routes here
    ],
  },
  { path: '**', redirectTo: '' },
];
