import { Routes } from '@angular/router';
import { PageLayoutEnum } from './shared/enums/PageLayoutEnum';
import { setLayout } from './core/utilities/layout-resolver';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./layouts/default-layout/default.routes').then((dashboard) => dashboard.DASHBOARD_ROUTES),
    // canActivate: [AuthGuard],
    resolve: {
      layout: setLayout(PageLayoutEnum.Authorized)
      
    }
  },
  {
    path: '',
    loadChildren: () => import('./layouts/auth-layout/auth.routes').then((auth) => auth.AUTH_ROUTES),
    resolve: {
      layout: setLayout(PageLayoutEnum.UnAuthorized)
    }
  },
  {
    path: '**',
    loadChildren: () => import('./layouts/error-layout/error.route').then((error) => error.ERROR_ROUTES),
    resolve: {
      layout: setLayout(PageLayoutEnum.Error)
    }
  }
];
