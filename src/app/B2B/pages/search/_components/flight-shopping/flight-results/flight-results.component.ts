import { Component, computed, effect, inject, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnwayResultCardComponent } from "./onway-result-card/onway-result-card.component";
import { FlightSearchService } from '../../../services/flight-search.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-flight-results, flight-results',
  imports: [CommonModule, OnwayResultCardComponent],
  templateUrl: './flight-results.component.html',
  styleUrls: ['./flight-results.component.css', './flight-results-common.css'],
  host: {
    'class': 'flight-search-results'
  }
})
export class FlightResultsComponent {
  private flightSearchService = inject(FlightSearchService);

  flightData = computed<any>(() => this.flightSearchService.getFlights()?.data?.flights || []);
  getJourneyPrice = signal<string>('');

}
