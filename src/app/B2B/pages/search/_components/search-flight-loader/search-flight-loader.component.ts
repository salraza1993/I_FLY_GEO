import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightsLoaderIllustrationComponent } from "./flights-loader-illustration/flights-loader-illustration.component";
import { FlightsLoaderAircraftComponent } from "./flights-loader-aircraft/flights-loader-aircraft.component";

@Component({
  selector: 'app-search-flight-loader, search-flight-loader',
  imports: [CommonModule, FlightsLoaderIllustrationComponent, FlightsLoaderAircraftComponent],
  templateUrl: './search-flight-loader.component.html',
  styleUrl: './search-flight-loader.component.css',
  host: {
    'class': 'search-flight-loader-wrapper'
  }
})
export class SearchFlightLoaderComponent {

}
