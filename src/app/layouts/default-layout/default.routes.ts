import { Routes } from "@angular/router";

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('../../B2B/pages/dashboard/dashboard.component')
  },
  {
    path: 'bookings',
    loadComponent: () => import('../../B2B/pages/bookings/bookings.component')
  },
  {
    path: 'search',
    loadComponent: () => import('../../B2B/pages/search/search.component')
  },
  {
    path: 'reports',
    loadComponent: () => import('../../B2B/pages/reports/reports.component')
  },
  {
    path: 'settings',
    loadComponent: () => import('../../B2B/pages/setting/setting.component')
  },
  {
    path: 'setting',
    loadComponent: () => import('../../B2B/pages/wallet/wallet.component')
  },
  {
    path: 'my-profile',
    loadComponent: () => import('../../B2B/pages/my-profile/my-profile.component')
  },
  {
    path: 'change-password',
    loadComponent: () => import('../../B2B/pages/change-password/change-password.component')
  }
];
