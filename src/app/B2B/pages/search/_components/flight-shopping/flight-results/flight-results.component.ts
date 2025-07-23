import { Component, computed, effect, inject, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnwayResultCardComponent } from "./onway-result-card/onway-result-card.component";
import { FlightSearchService } from '../../../services/flight-search.service';
import { ActivatedRoute } from '@angular/router';
import { SearchCriteriaDataType } from '@/shared/models/SearchCriteria.interface';
import { SearchCriteriaService } from '@/shared/services/search-criteria.service';
import { RoundtripResultCardComponent } from "./roundtrip-result-card/roundtrip-result-card.component";

@Component({
  selector: 'app-flight-results, flight-results',
  imports: [CommonModule, OnwayResultCardComponent, RoundtripResultCardComponent],
  templateUrl: './flight-results.component.html',
  styleUrls: ['./flight-results.component.css', './flight-results-common.css'],
  host: {
    'class': 'flight-search-results'
  }
})
export class FlightResultsComponent {
  private flightSearchService = inject(FlightSearchService);
  private searchCriteriaService = inject(SearchCriteriaService);
  protected route = inject(ActivatedRoute);
  protected searchCriteria = signal<SearchCriteriaDataType | null>(null);

  flightData = computed<any>(() => this.flightSearchService.getFlights()?.data?.flights || []);
  getJourneyPrice = signal<string>('');

  constructor() {
    const sessionId = this.route.snapshot.queryParamMap.get('session');
    this.searchCriteria.set(this.searchCriteriaService.getSearchCriteria(sessionId));
  }

  get tripType(): string {
    const data = this.searchCriteria();
    return data?.tripType?.toLocaleLowerCase() || '';
  }


}
