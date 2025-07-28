import { CommonModule } from '@angular/common';
import { Component, computed, input, ViewEncapsulation } from '@angular/core';
import { CardFooterComponent } from "../card-footer/card-footer.component";
import { SegmentComponent } from '../segment/segment.component';
@Component({
  selector: 'app-onway-result-card, onway-result-card',
  imports: [CommonModule, SegmentComponent, CardFooterComponent],
  templateUrl: './onway-result-card.component.html',
  styleUrls: ['./onway-result-card.component.css', '../flight-results-common.css'],
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'onway-result-card-wrapper result-card'
  }
})
export class OnwayResultCardComponent {
  cardData = input<any>();
  offers = input<any>();
  pricing = input<any>();

  private readonly allOffers = computed<any[]>(() => this.offers());
  protected readonly journeys = computed<any[]>(() => this.cardData().journeys || []);

  getPrice = computed(() => {
    return this.allOffers()?.find((item: any) => item.offerId === this.cardData().C_offers[0])
  });

}
