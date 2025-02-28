import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { LayoutService } from '../../layouts/layout.service';
import { PageLayoutEnum } from '../../shared/enums/PageLayoutEnum';

/**
 * Resolver sets the page layout type,
 * ensuring that the layout is available before navigating to the component.
**/
export const setLayout = (inputLayout: PageLayoutEnum): ResolveFn<void> => {
  return (_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) => {
    inject(LayoutService).setLayout(inputLayout);
  };
};
