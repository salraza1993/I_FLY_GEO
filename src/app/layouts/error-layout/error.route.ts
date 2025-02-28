import { Routes } from "@angular/router";
import { NotFoundComponent } from "../../shared/components/common/not-found/not-found.component";

export const ERROR_ROUTES: Routes = [
  {
    path: '**',
    component: NotFoundComponent
  }
];
