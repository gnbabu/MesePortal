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
      {
        path: 'medicaidhome',
        loadComponent: () =>
          import('./pages/medicaid-home/medicaid-home.component').then(
            (m) => m.MedicaidHomeComponent
          ),
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'providerdirectory',
        loadComponent: () =>
          import(
            './pages/provider-directory/provider-directory.component'
          ).then((m) => m.ProviderDirectoryComponent),
      },
      {
        path: 'gissearch',
        loadComponent: () =>
          import(
            './pages/provider-search-gis/provider-search-gis.component'
          ).then((m) => m.ProviderSearchGisComponent),
      },
      {
        path: 'provider-training',
        loadComponent: () =>
          import('./pages/provider-training/provider-training.component').then(
            (m) => m.ProviderTrainingComponent
          ),
      },
      {
        path: 'contactus',
        loadComponent: () =>
          import('./pages/contactus/contactus.component').then(
            (m) => m.ContactusComponent
          ),
      },
      {
        path: 'feeschedule',
        loadComponent: () =>
          import('./pages/fee-schedule/fee-schedule.component').then(
            (m) => m.FeeScheduleComponent
          ),
      },
      {
        path: 'provider-registration',
        loadComponent: () =>
          import(
            './layout/provider-registration-layout/provider-registration-layout.component'
          ).then((m) => m.ProviderRegistrationLayoutComponent),
        children: [
          {
            path: 'provider-information',
            loadComponent: () =>
              import(
                './features/provider-registration/provider-information/provider-information.component'
              ).then((m) => m.ProviderInformationComponent),
          },
          {
            path: 'primary-contact-information',
            loadComponent: () =>
              import(
                './features/provider-registration/primary-contact-information/primary-contact-information.component'
              ).then((m) => m.PrimaryContactInformationComponent),
          },
          {
            path: 'primary-service-address',
            loadComponent: () =>
              import(
                './features/provider-registration/primary-service-address/primary-service-address.component'
              ).then((m) => m.PrimaryServiceAddressComponent),
          },
          {
            path: 'billing-payment-address',
            loadComponent: () =>
              import(
                './features/provider-registration/billing-payment-address/billing-payment-address.component'
              ).then((m) => m.BillingPaymentAddressComponent),
          },
          {
            path: 'correspondence-address',
            loadComponent: () =>
              import(
                './features/provider-registration/correspondence-address/correspondence-address.component'
              ).then((m) => m.CorrespondenceAddressComponent),
          },
          {
            path: 'other-service-locations',
            loadComponent: () =>
              import(
                './features/provider-registration/other-service-locations/other-service-locations.component'
              ).then((m) => m.OtherServiceLocationsComponent),
          },
          {
            path: 'reg-1099-address',
            loadComponent: () =>
              import(
                './features/provider-registration/reg-1099-address/reg-1099-address.component'
              ).then((m) => m.Reg1099AddressComponent),
          },
          {
            path: 'home-office-address',
            loadComponent: () =>
              import(
                './features/provider-registration/home-office-address/home-office-address.component'
              ).then((m) => m.HomeOfficeAddressComponent),
          },
          {
            path: 'reports',
            loadComponent: () =>
              import(
                './features/provider-registration/reports/reports.component'
              ).then((m) => m.ReportsComponent),
          },
          {
            path: '',
            redirectTo: 'provider-information',
            pathMatch: 'full',
          },
        ],
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
