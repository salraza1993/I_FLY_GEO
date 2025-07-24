import { Component, computed, input } from '@angular/core';
import { SegementComponent } from "../segment/segment.component";
import { CardFooterComponent } from "../card-footer/card-footer.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-result-card, result-card',
  imports: [CommonModule, SegementComponent, CardFooterComponent],
  templateUrl: './result-card.component.html',
  styleUrl: './result-card.component.css',
  host: {
    'class': 'result-card-wrapper result-card',
    '[attr.data-card-type]': 'tripType()',
  },
})
export class ResultCardComponent {
  cardData = input<any>();
  offers = input<any>();
  pricing = input<any>();
  tripType = input<string>();

  private readonly allOffers = computed<any[]>(() => this.offers());
  protected readonly journeys = computed<any[]>(() => this.cardData().journeys || []);

  // protected readonly offers = computed<any>(() => this.flightSearchService.getFlights()?.data?.offers || []);
  getPrice = computed(() => {
    return this.allOffers()?.find((item: any) => item.offerId === this.cardData().C_offers[0])
  });
}
