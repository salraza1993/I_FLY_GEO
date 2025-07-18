import { SearchContentContainerComponent } from "@search/_components/search-content-container/search-content-container.component";
import { Routes } from "@angular/router";
import { FlightShoppingComponent } from "@/B2B/pages/search/search-flights/flight-shopping/flight-shopping.component";

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('@/B2B/pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'bookings',
    loadComponent: () => import('@/B2B/pages/bookings/bookings.component').then(m => m.BookingsComponent)
  },
  {
    path: 'search',
    loadComponent: () => import('@/B2B/pages/search/search.component').then(m => m.SearchComponent),
    children: [
      { path: 'flights', component: SearchContentContainerComponent },
      { path: 'hotels', component: SearchContentContainerComponent },
      { path: 'cars', component: SearchContentContainerComponent },
      { path: 'activities', component: SearchContentContainerComponent },
      { path: '', redirectTo: 'flights', pathMatch: 'full' } // Default tab
    ]
  },
  { path: 'search/flight-results',
    loadComponent: () => import('@/B2B/pages/search/search-flights/flight-shopping/flight-shopping.component').then(m => FlightShoppingComponent)
  },
  {
    path: 'reports',
    loadComponent: () => import('@/B2B/pages/reports/reports.component').then(m => m.ReportsComponent)
  },
  {
    path: 'settings',
    loadComponent: () => import('@/B2B/pages/setting/setting.component').then(m => m.SettingComponent)
  },
  {
    path: 'setting',
    loadComponent: () => import('@/B2B/pages/wallet/wallet.component').then(m => m.WalletComponent)
  },
  {
    path: 'my-profile',
    loadComponent: () => import('@/B2B/pages/my-profile/my-profile.component').then(m => m.MyProfileComponent)
  },
  {
    path: 'change-password',
    loadComponent: () => import('@/B2B/pages/change-password/change-password.component').then(m => m.ChangePasswordComponent)
  },
  {
    path: 'elements',
    loadComponent: () => import('@/B2B/pages/static-elements/static-elements.component').then(m => m.StaticElementsComponent)
  }
];
