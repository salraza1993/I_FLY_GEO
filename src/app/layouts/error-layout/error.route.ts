import { Routes } from "@angular/router";

export const ERROR_ROUTES: Routes = [
  {
    path: '**',
    loadComponent: () => import('../../shared/components/not-found/not-found.component')
  }
];
