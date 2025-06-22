import { Routes } from "@angular/router";

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('../../auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'login-otp-validation',
    loadComponent: () => import('../../auth/login-otp/login-otp.component').then(m => m.LoginOtpComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('../../auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'forget-password',
    loadComponent: () => import('../../auth/forget-password/forget-password.component').then(m => m.ForgetPasswordComponent)
  },
  {
    path: 'reset-password',
    loadComponent: () => import('../../auth/reset-password/reset-password.component').then(m => m.ResetPasswordComponent)
  }
];
