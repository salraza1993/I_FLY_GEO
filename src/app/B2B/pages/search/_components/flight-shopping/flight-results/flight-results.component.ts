import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnwayResultCardComponent } from "./onway-result-card/onway-result-card.component";
import { RoundtripResultCardComponent } from './roundtrip-result-card/roundtrip-result-card.component';

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

}
