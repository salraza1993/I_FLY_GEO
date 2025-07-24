import { TooltipDirective } from '@/core/directives/tooltip.directive';
import { CommonModule } from '@angular/common';
import { Component, computed, inject, model } from '@angular/core';
import { FiltersService } from '../../../services/filters.service';
import { NgModalService } from '@/shared/services/ng-modal.service';
import { FilterModalComponent } from '../../filter-modal/filter-modal.component';
import { FlightSearchService } from '../../../services/flight-search.service';
@Component({
  selector: 'app-additional-info, additional-info',
  imports: [CommonModule, TooltipDirective],
  templateUrl: './additional-info.component.html',
  styleUrl: './additional-info.component.css',
  host: {
    'class': 'additional-info-wrapper',
    '[class.fixed]': 'isSticky()'
  }
})
export class AdditionalInfoComponent {
  private readonly flightSearchService = inject(FlightSearchService);
  public isSticky = inject(FiltersService).isSticky;
  private readonly modalService = inject(NgModalService);

  protected readonly totalResults = computed(() => this.flightSearchService.totalResults());

  showFilterModal() {
    this.modalService.open('filter-modal', {
      component: FilterModalComponent,
      animation: 'fade',
      position: 'center',
      overlay: true,
      overlayClose: true
    });
  }
  showEmailModal() {
    this.modalService.open('emails-modal', {
      component: FilterModalComponent,
      animation: 'fade',
      position: 'center',
      overlay: true,
      overlayClose: true
    });
  }

}
