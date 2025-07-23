import { TooltipDirective } from '@/core/directives/tooltip.directive';
import { COMMON_IMPORTS } from '@/shared/helpers/common-imports';
import { NgModalService } from '@/shared/services/ng-modal.service';
import { Component, computed, inject, signal } from '@angular/core';
import { SearchModifyFormComponent } from '../search-modify-form/search-modify-form.component';
import { ActivatedRoute } from '@angular/router';
import { SearchCriteriaDataType } from '@/shared/models/SearchCriteria.interface';
import { SearchCriteriaService } from '@/shared/services/search-criteria.service';
import { DateFormatPipe } from '@/core/pipes/date-format.pipe';

@Component({
  selector: 'app-search-modify-strip, search-modify-strip',
  imports: [COMMON_IMPORTS, TooltipDirective, DateFormatPipe],
  templateUrl: './search-modify-strip.component.html',
  styleUrl: './search-modify-strip.component.css',
  host: {
    'class': 'search-modify-wrapper content-wrapper',
  }
})


export class SearchModifyStripComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly modalService = inject(NgModalService);
  private searchCriteriaService = inject(SearchCriteriaService);
  protected searchedData = signal<SearchCriteriaDataType | null>(null);

  constructor() {
    const sessionId = this.route.snapshot.queryParamMap.get('session');
    this.searchedData.set(this.searchCriteriaService.getSearchCriteria(sessionId));
  }

  showFilterModal() {
    this.modalService.open('modify-search-modal', {
      component: SearchModifyFormComponent,
      animation: 'fade',
      position: 'center',
      overlay: true,
      overlayClose: false
    });
  }

  get tripType() : string | undefined {
    const data = this.searchedData();
    return data?.tripType.toLowerCase()
  }

  get isFamily(): boolean {
    const data = this.searchedData();
    return ((data?.passengers?.children ?? 0) > 0 || (data?.passengers?.infants ?? 0) > 0);
  }
  get setOrigin():string {
    const data = this.searchedData()?.origin;
    return data?.AirportName || '';
  }

  protected setOriginDestinationString(type: string): string {
    const data = this.searchedData();
    let stringValue = '';
    if(type === 'destination') {
      stringValue = `${data?.destination?.City} (${data?.destination?.IATA}), ${data?.destination?.AirportName}`;
    } else {
      stringValue = `${data?.origin?.City} (${data?.origin?.IATA}), ${data?.origin?.AirportName}`;
    }
    return stringValue;
  }

}
