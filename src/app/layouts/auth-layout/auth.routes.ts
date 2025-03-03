import { Routes } from "@angular/router";
import { LoginComponent } from "../../auth/login/login.component";
import { RegisterComponent } from "../../auth/register/register.component";
import { ForgetPasswordComponent } from "../../auth/forget-password/forget-password.component";

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'forget-password',
    component: ForgetPasswordComponent
  }
];
