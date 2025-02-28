import { Routes } from "@angular/router";
import { BookingsComponent } from "../../B2B/pages/bookings/bookings.component";
import { FlightComponent } from "../../B2B/pages/search/flight/flight.component";
import { ReportsComponent } from "../../B2B/pages/reports/reports.component";
import { SettingComponent } from "../../B2B/pages/setting/setting.component";
import { WalletComponent } from "../../B2B/pages/wallet/wallet.component";
import { DashboardComponent } from "../../B2B/pages/dashboard/dashboard.component";

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'bookings',
    component: BookingsComponent
  },
  {
    path: 'search',
    component: FlightComponent
  },
  {
    path: 'reports',
    component: ReportsComponent
  },
  {
    path: 'setting',
    component: SettingComponent
  },
  {
    path: 'setting',
    component: WalletComponent
  }
];
