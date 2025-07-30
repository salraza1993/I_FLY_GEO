import { Component, computed, input, inject, model, effect, signal } from '@angular/core';
import { SegmentComponent } from "../segment/segment.component";
import { CardFooterComponent } from "../card-footer/card-footer.component";
import { CommonModule } from '@angular/common';
import { NgModalService } from '@/shared/services/ng-modal.service';
import { FlightDetailsComponent } from '../flight-details/flight-details.component';
import { FlightResultModifierService } from '@/B2B/pages/search/services/flight-result-modifier.service';
import { FlightJourney, FlightResultCard, PricingDetails } from '@/B2B/pages/search/models/FlightResultCardInterface.interface';

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

  cardData = input<any>();
  offers = input<any>();
  tripType = input<string>();

  protected modifiedResult = computed<FlightResultCard | null>(() => this.resultModifierService.modifiedResultComputed()!);

  protected readonly journeys = computed<FlightJourney[]>(() =>
    this.modifiedResult() ? this.modifiedResult()!.journeys : []);

  protected readonly pricing = computed<PricingDetails>(() => this.modifiedResult()?.pricing ?? {} as PricingDetails);

  private resultCardEffect = effect(() => {
    const data = this.cardData();
    this.resultModifierService.resultModifyHanlder(data);
    // console.log(this.modifiedResult());
  });

}
