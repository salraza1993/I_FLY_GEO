import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, ViewEncapsulation } from '@angular/core';
import { CardFooterComponent } from "../card-footer/card-footer.component";
import { SegementComponent } from '../segment/segment.component';
import { FlightSearchService } from '@/B2B/pages/search/services/flight-search.service';

@Component({
  selector: 'app-roundtrip-result-card, roundtrip-result-card',
  imports: [CommonModule, SegementComponent, CardFooterComponent],
  templateUrl: './roundtrip-result-card.component.html',
  styleUrls: ['./roundtrip-result-card.component.css', '../flight-results-common.css'],
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'roundtrip-result-card-wrapper result-card'
  }
})
export class RoundtripResultCardComponent {
  private flightSearchService = inject(FlightSearchService);
  data = input<any>();
  pricing = input<any>();

  protected readonly offers = computed<any>(() => this.flightSearchService.getFlights()?.data?.offers || []);
  getPrice = computed(() => {
    return this.offers()?.find((item: any) => item.offerId === this.data().C_offers[0])
  });
}
