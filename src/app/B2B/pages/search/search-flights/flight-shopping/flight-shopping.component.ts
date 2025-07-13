import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { SearchFlightLoaderComponent } from '../../_components/search-flight-loader/search-flight-loader.component';
import { SearchModifyComponent } from "../../_components/flight-shopping/search-modify/search-modify.component";
import { FlightCalenderCarouselComponent } from "../../_components/flight-shopping/flight-calender-carousel/flight-calender-carousel.component";
import { FilterStripWrapperComponent } from "../../_components/flight-shopping/filter-strip-wrapper/filter-strip-wrapper.component";
import { FiltersService } from '../../services/filters.service';

@Component({
  selector: 'app-flight-shopping',
  imports: [
    CommonModule,
    SearchFlightLoaderComponent,
    SearchModifyComponent,
    FlightCalenderCarouselComponent,
    FilterStripWrapperComponent
  ],
  providers: [FiltersService],
  templateUrl: './flight-shopping.component.html',
  styleUrl: './flight-shopping.component.css',
  host: {
    'class': 'flight-shopping-wrapper'
  }
})
export class FlightShoppingComponent {
  private fliterService = inject(FiltersService)
  isLoading = signal(false);
}
