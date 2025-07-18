import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { JourneyInfoComponent } from "../journey-info/journey-info.component";
import { CardFooterComponent } from "../card-footer/card-footer.component";

@Component({
  selector: 'app-onway-result-card, onway-result-card',
  imports: [CommonModule, JourneyInfoComponent, CardFooterComponent],
  templateUrl: './onway-result-card.component.html',
  styleUrls: ['./onway-result-card.component.css', '../flight-results-common.css'],
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'onway-result-card-wrapper result-card'
  }
})
export class OnwayResultCardComponent {

}
