import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightSearchService } from '../../../services/flight-search.service';
import { ActivatedRoute } from '@angular/router';
import { SearchCriteriaDataType } from '@/shared/models/SearchCriteria.interface';
import { SearchCriteriaService } from '@/shared/services/search-criteria.service';
import { ResultCardComponent } from "./result-card/result-card.component";
import { ResultCardSkeletonComponent } from "./result-card-skeleton/result-card-skeleton.component";
import { AirportDataType, AirportListService } from '../../../services/airport-list.service';
import { JourneyTypesComponent } from "./journey-types/journey-types.component";

@Component({
  selector: 'app-flight-results, flight-results',
  imports: [CommonModule, ResultCardComponent, ResultCardSkeletonComponent, JourneyTypesComponent],
  templateUrl: './flight-results.component.html',
  styleUrl: './flight-results.component.css',
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

  constructor() {
    const sessionId = this.route.snapshot.queryParamMap.get('session');
    this.searchCriteria.set(this.searchCriteriaService.getSearchCriteria(sessionId));
  }

  get tripType(): string {
    const data = this.searchCriteria();
    return data?.tripType?.toLocaleLowerCase() || '';
  }

  get tripDetails(): Partial<SearchCriteriaDataType> {
    const destination = this.searchCriteria()?.destination;
    const origin = this.searchCriteria()?.origin;
    return { destination, origin };
  }

}
