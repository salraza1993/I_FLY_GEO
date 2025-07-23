import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { SearchFlightLoaderComponent } from '../../_components/search-flight-loader/search-flight-loader.component';
import { SearchModifyStripComponent } from '../../_components/flight-shopping/search-modify-strip/search-modify-strip.component';
import { FlightCalenderCarouselComponent } from '../../_components/flight-shopping/flight-calender-carousel/flight-calender-carousel.component';
import { FilterStripWrapperComponent } from '../../_components/flight-shopping/filter-strip-wrapper/filter-strip-wrapper.component';
import { FlightResultsComponent } from '../../_components/flight-shopping/flight-results/flight-results.component';
import { FiltersService } from '../../services/filters.service';
import { FlightSearchRequestBodyType, FlightSearchService } from '../../services/flight-search.service';
import { LocalStorageService } from '../../../../../shared/services/localStorage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionManagerService } from '../../services/session-manager.service';
import { SearchCriteriaDataType } from '@/shared/models/SearchCriteria.interface';

@Component({
  selector: 'app-flight-shopping',
  imports: [
    CommonModule,
    SearchFlightLoaderComponent,
    FlightCalenderCarouselComponent,
    FilterStripWrapperComponent,
    SearchModifyStripComponent,
    FlightResultsComponent,
],
  providers: [FiltersService, FlightSearchService],
  templateUrl: './flight-shopping.component.html',
  styleUrl: './flight-shopping.component.css',
  host: {
    class: 'flight-shopping-wrapper',
  },
})
export class FlightShoppingComponent {
  private fliterService = inject(FiltersService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private flightSearchService = inject(FlightSearchService);
  private sessionManager = inject(SessionManagerService);
  private localStorageService = inject(LocalStorageService);
  protected getSearchCriteria = signal<SearchCriteriaDataType | null>(null);

  // isLoading = signal(true);
  isLoading = computed(() => this.flightSearchService.isLoading());
  sessionId = signal<string | null>(null);

  constructor() {
    const sessionId = this.route.snapshot.queryParamMap.get('session');
    this.sessionId.set(sessionId);
    this.sendRequest();
  }

  protected sendRequest() {
    const isSessionIdExists = this.sessionManager.isSessionValid(this.sessionId()!);

    if(isSessionIdExists) {
      const data = this.localStorageService.getItem(`${this.sessionId()}-search-criteria`);
      const searchCriteria = typeof data === 'string' ? JSON.parse(data) : data;

      this.getSearchCriteria.set(searchCriteria.searchCriteria);
      this.flightSearchService.searchHandler(searchCriteria.bodyParams as FlightSearchRequestBodyType);
    } else {
      this.router.navigate(['/search/flights']);
    }
  }
}
