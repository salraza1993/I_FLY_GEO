import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { SearchFlightLoaderComponent } from '../../_components/search-flight-loader/search-flight-loader.component';
import { SearchModifyStripComponent } from '../../_components/flight-shopping/search-modify-strip/search-modify-strip.component';
import { FlightCalenderCarouselComponent } from '../../_components/flight-shopping/flight-calender-carousel/flight-calender-carousel.component';
import { FilterStripWrapperComponent } from '../../_components/flight-shopping/filter-strip-wrapper/filter-strip-wrapper.component';
import { FlightResultsComponent } from '../../_components/flight-shopping/flight-results/flight-results.component';
import { FiltersService } from '../../services/filters.service';
import { FlightSearchService } from '../../services/flight-search.service';

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
  private fliterService = inject(FiltersService)
  private flightSearchService = inject(FlightSearchService)
  isLoading = computed(() => this.flightSearchService.isLoading());
}
