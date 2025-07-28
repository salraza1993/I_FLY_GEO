import { CommonModule } from '@angular/common';
import { Component, computed, input, model, signal } from '@angular/core';
import { BreakerLineComponent } from "@/shared/components/breaker-line/breaker-line.component";
import { NgDialogComponent } from "../../../ng-dialog/ng-dialog.component";
import { FlightDetailsComponent } from "../flight-details/flight-details.component";

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
  tripType = input<string | null>(null);
  protected isDialogActive = model<boolean>(false);
  segmentData = input<any>([]);
  journeyTime = input<string>('');

  protected segment = computed(() => this.segmentData());

  showFlightDetails() {
    this.isDialogActive.set(true);
  }

}
