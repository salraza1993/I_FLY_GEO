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
import { SessionCounterComponent } from '@/shared/components/header/session-counter/session-counter.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionManagerService } from '../../services/session-manager.service';
import { single } from 'rxjs';

@Component({
  selector: 'app-flight-shopping',
  imports: [
    CommonModule,
    SearchFlightLoaderComponent,
    FlightCalenderCarouselComponent,
    FilterStripWrapperComponent,
    SearchModifyStripComponent,
    FlightResultsComponent,
    SessionCounterComponent
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
  protected getSearchCriteria = signal<any>(null);

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
      const bodyParams = this.localStorageService.getItem(`${this.sessionId()}-body-params`)!;
      const searchCriteria = this.localStorageService.getItem(`${this.sessionId()}-search-criteria`) || {};

      // Parse the search criteria if it's a string, otherwise use it directly
      const parsedSearchCriteria = typeof searchCriteria === 'string' ? JSON.parse(searchCriteria) : searchCriteria;
      this.getSearchCriteria.set(parsedSearchCriteria);
      console.log('check: ', this.getSearchCriteria())

      this.flightSearchService.searchHandler(JSON.parse(bodyParams));
    } else {
      this.router.navigate(['/search/flights']);
    }
  }
}
