import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { SearchFlightLoaderComponent } from '../../_components/search-flight-loader/search-flight-loader.component';
import { SearchModifyStripComponent } from '../../_components/flight-shopping/search-modify-strip/search-modify-strip.component';
import { FlightCalenderCarouselComponent } from '../../_components/flight-shopping/flight-calender-carousel/flight-calender-carousel.component';
import { FilterStripWrapperComponent } from '../../_components/flight-shopping/filter-strip-wrapper/filter-strip-wrapper.component';
import { FlightResultsComponent } from '../../_components/flight-shopping/flight-results/flight-results.component';
import { FiltersService } from '../../services/filters.service';
import { FlightSearchService } from '../../services/flight-search.service';
import { LocalStorageService } from '../../../../../shared/services/localStorage.service';
import { SessionCounterComponent } from '@/shared/components/header/session-counter/session-counter.component';
import { ActivatedRoute, Router } from '@angular/router';

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
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fliterService = inject(FiltersService);
  private flightSearchService = inject(FlightSearchService);
  private localStorage = inject(LocalStorageService);
  isLoading = computed(() => this.flightSearchService.isLoading());
  sessionId = signal<string | null>(null);

  constructor() {
    const sessionId = this.route.snapshot.queryParamMap.get('session');
    this.sessionId.set(sessionId);
    this.sendRequest();
  }

  protected sendRequest() {
    const searchCriteria = this.localStorage.getItem(`${this.sessionId()}-search-criteria`);
    console.log(JSON.parse(JSON.stringify(searchCriteria)))
    if(this.sessionId()) {
      this.flightSearchService.searchHandler(searchCriteria ? JSON.parse(this.localStorage.getItem('search-criteria') || '{}') : null);
    } else {
      this.router.navigate(['/search/flights']);
    }
  }
}
