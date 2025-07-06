import { TooltipDirective } from '@/core/directives/tooltip.directive';
import { COMMON_IMPORTS } from '@/shared/helpers/common-imports';
import { Component } from '@angular/core';

@Component({
  selector: 'app-search-modify, search-modify',
  imports: [COMMON_IMPORTS, TooltipDirective],
  templateUrl: './search-modify.component.html',
  styleUrl: './search-modify.component.css',
  host: {
    'class': 'search-modify-wrapper content-wrapper',
  }
})
export class SearchModifyComponent {

}
