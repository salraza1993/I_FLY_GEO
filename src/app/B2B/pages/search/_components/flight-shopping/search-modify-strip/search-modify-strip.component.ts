import { TooltipDirective } from '@/core/directives/tooltip.directive';
import { COMMON_IMPORTS } from '@/shared/helpers/common-imports';
import { NgModalService } from '@/shared/services/ng-modal.service';
import { Component, inject } from '@angular/core';
import { SearchModifyFormComponent } from '../search-modify-form/search-modify-form.component';

@Component({
  selector: 'app-search-modify-strip, search-modify-strip',
  imports: [COMMON_IMPORTS, TooltipDirective],
  templateUrl: './search-modify-strip.component.html',
  styleUrl: './search-modify-strip.component.css',
  host: {
    'class': 'search-modify-wrapper content-wrapper',
  }
})
export class SearchModifyStripComponent {
  private readonly modalService = inject(NgModalService);

  showFilterModal() {
    this.modalService.open('modify-search-modal', {
      component: SearchModifyFormComponent,
      animation: 'fade',
      position: 'center',
      overlay: true,
      overlayClose: false
    });
  }
}
