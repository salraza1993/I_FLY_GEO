import { Routes } from "@angular/router";

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('../../auth/login/login.component')
  },
  {
    path: 'register',
    loadComponent: () => import('../../auth/register/register.component')
  },
  {
    path: 'forget-password',
    loadComponent: () => import('../../auth/forget-password/forget-password.component')
  },
  // {
  //   path: 'reset-password',
  //   loadComponent: () => import('../../auth/reset-password/reset-password.component')
  // }
];
