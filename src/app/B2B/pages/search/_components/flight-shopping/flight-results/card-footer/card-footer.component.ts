import { CommonModule } from '@angular/common';
import { Component, computed, input, model, signal } from '@angular/core';
import { BreakerLineComponent } from "@/shared/components/breaker-line/breaker-line.component";
import { NgDialogComponent } from "../../../ng-dialog/ng-dialog.component";
import { FlightDetailsComponent } from "../flight-details/flight-details.component";
import { FlightJourney, FlightResultCard, FlightServices, PricingDetails } from '@/B2B/pages/search/models/FlightResultCardInterface.interface';

@Component({
  selector: 'app-card-footer, card-footer',
  imports: [CommonModule, BreakerLineComponent, NgDialogComponent, FlightDetailsComponent],
  templateUrl: './card-footer.component.html',
  styleUrl: './card-footer.component.css',
  host: {
    'class': 'card-footer-wrapper'
  }
})
export class CardFooterComponent {
  protected isDialogActive = model<boolean>(false);
  cardData = input<FlightResultCard | null>();

  protected readonly detailsDataPrice = computed<PricingDetails>(() => this.cardData()?.pricing!);
  protected readonly services = computed<FlightServices>(() => this.cardData()?.services!);

  showFlightDetails() {
    this.isDialogActive.set(true);
  }

  get availableSeats(): number | null {
    return this.cardData()?.availability?.availableSeats || null;
  }

}
