import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, input, signal, ViewEncapsulation } from '@angular/core';
import { CardFooterComponent } from "../card-footer/card-footer.component";
import { SegementComponent } from '../segment/segment.component';
import { FlightSearchService } from '@/B2B/pages/search/services/flight-search.service';

@Component({
  selector: 'app-onway-result-card, onway-result-card',
  imports: [CommonModule, SegementComponent, CardFooterComponent],
  templateUrl: './onway-result-card.component.html',
  styleUrls: ['./onway-result-card.component.css', '../flight-results-common.css'],
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'onway-result-card-wrapper result-card'
  }
})
export class OnwayResultCardComponent {
  private flightSearchService = inject(FlightSearchService);
  data = input<any>();
  pricing = input<any>();

  protected readonly offers = computed<any>(() => this.flightSearchService.getFlights()?.data?.offers || []);
  getPrice = computed(() => {
    return this.offers()?.find((item: any) => item.offerId === this.data().C_offers[0])
  });

}
