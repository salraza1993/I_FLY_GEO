import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { JourneyInfoComponent } from "../journey-info/journey-info.component";
import { CardFooterComponent } from "../card-footer/card-footer.component";

@Component({
  selector: 'app-roundtrip-result-card, roundtrip-result-card',
  imports: [CommonModule, JourneyInfoComponent, CardFooterComponent],
  templateUrl: './roundtrip-result-card.component.html',
  styleUrls: ['./roundtrip-result-card.component.css', '../flight-results-common.css'],
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'roundtrip-result-card-wrapper result-card'
  }
})
export class RoundtripResultCardComponent {

}
