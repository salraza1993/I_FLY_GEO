import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { CardFooterComponent } from "../card-footer/card-footer.component";
import { SegementComponent } from '../segment/segment.component';

@Component({
  selector: 'app-roundtrip-result-card, roundtrip-result-card',
  imports: [CommonModule, SegementComponent, CardFooterComponent],
  templateUrl: './roundtrip-result-card.component.html',
  styleUrls: ['./roundtrip-result-card.component.css', '../flight-results-common.css'],
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'roundtrip-result-card-wrapper result-card'
  }
})
export class RoundtripResultCardComponent {

}
