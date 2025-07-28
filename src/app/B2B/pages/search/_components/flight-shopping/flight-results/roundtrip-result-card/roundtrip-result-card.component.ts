import { CommonModule } from '@angular/common';
import { Component, computed, effect, input, ViewEncapsulation } from '@angular/core';
import { CardFooterComponent } from "../card-footer/card-footer.component";
import { SegmentComponent } from '../segment/segment.component';

@Component({
  selector: 'app-roundtrip-result-card, roundtrip-result-card',
  imports: [CommonModule, SegmentComponent, CardFooterComponent],
  templateUrl: './roundtrip-result-card.component.html',
  styleUrls: ['./roundtrip-result-card.component.css', '../flight-results-common.css'],
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'roundtrip-result-card-wrapper result-card'
  }
})
export class RoundtripResultCardComponent {
  cardData = input<any>();
  offers = input<any>();
  pricing = input<any>();

  private readonly allOffers = computed<any[]>(() => this.offers());
  protected readonly journeys = computed<any[]>(() => this.cardData().journeys || []);

  // protected readonly offers = computed<any>(() => this.flightSearchService.getFlights()?.data?.offers || []);
  getPrice = computed(() => {
    return this.allOffers()?.find((item: any) => item.offerId === this.cardData().C_offers[0])
  });
}
