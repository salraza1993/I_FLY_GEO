import { Component, computed, input, inject, model, effect, signal } from '@angular/core';
import { SegmentComponent } from "../segment/segment.component";
import { CardFooterComponent } from "../card-footer/card-footer.component";
import { CommonModule } from '@angular/common';
import { NgModalService } from '@/shared/services/ng-modal.service';
import { FlightDetailsComponent } from '../flight-details/flight-details.component';
import { FlightResultModifierService } from '@/B2B/pages/search/services/flight-result-modifier.service';

@Component({
  selector: 'app-result-card, result-card',
  imports: [CommonModule, CardFooterComponent, SegmentComponent],
  templateUrl: './result-card.component.html',
  styleUrl: './result-card.component.css',
  providers: [FlightResultModifierService],
  host: {
    'class': 'result-card-wrapper result-card',
    '[attr.data-card-type]': 'tripType()',
  },
})
export class ResultCardComponent {
  private readonly resultModifierService = inject(FlightResultModifierService);
  protected isDialogActive = model<boolean>(false);
  protected newFlight = computed<any>(() => this.resultModifierService.modifiedResultSignal());

  cardData = input<any>();
  offers = input<any>();
  pricing = input<any>();
  tripType = input<string>();

  constructor() {
    effect(() => {
      const data = this.cardData();
      this.resultModifierService.resultModifyHanlder(data);
    })
  }

  private readonly allOffers = computed<any[]>(() => this.offers());
  protected readonly journeys = computed<any[]>(() => this.cardData().journeys || []);

  getPrice = computed(() => {
    return this.allOffers()?.find((item: any) => item.offerId === this.cardData().C_offers[0])
  });
}
