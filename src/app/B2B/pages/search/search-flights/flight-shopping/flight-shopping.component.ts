import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { SearchFlightLoaderComponent } from '../../_components/search-flight-loader/search-flight-loader.component';
import { SearchModifyComponent } from "../../_components/flight-shopping/search-modify/search-modify.component";
import { FlightCalenderCarouselComponent } from "../../_components/flight-shopping/flight-calender-carousel/flight-calender-carousel.component";
import { AdditionalInfoComponent } from "../../_components/flight-shopping/additional-info/additional-info.component";

@Component({
  selector: 'app-flight-shopping',
  imports: [
    CommonModule,
    SearchFlightLoaderComponent,
    SearchModifyComponent,
    FlightCalenderCarouselComponent,
    AdditionalInfoComponent
],
  templateUrl: './flight-shopping.component.html',
  styleUrl: './flight-shopping.component.css',
  host: {
    'class': 'flight-shopping-wrapper'
  }
})
export class FlightShoppingComponent {
  isLoading = signal(false);
}
