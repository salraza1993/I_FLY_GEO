import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnwayResultCardComponent } from "./onway-result-card/onway-result-card.component";
import { FlightSearchService } from '../../../services/flight-search.service';
import { ActivatedRoute } from '@angular/router';
import { SearchCriteriaDataType } from '@/shared/models/SearchCriteria.interface';
import { SearchCriteriaService } from '@/shared/services/search-criteria.service';
import { ResultCardComponent } from "./result-card/result-card.component";
import { ResultCardSkeletonComponent } from "./result-card-skeleton/result-card-skeleton.component";

@Component({
  selector: 'app-flight-results, flight-results',
  imports: [CommonModule, ResultCardComponent, ResultCardSkeletonComponent],
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

  flightsData = computed<any>(() => this.flightSearchService.getFlights());
  getOffers = computed<string>(() => this.flightSearchService.getOffers());

  constructor() {
    const sessionId = this.route.snapshot.queryParamMap.get('session');
    this.searchCriteria.set(this.searchCriteriaService.getSearchCriteria(sessionId));
  }

  get tripType(): string {
    const data = this.searchCriteria();
    return data?.tripType?.toLocaleLowerCase() || '';
  }

}
