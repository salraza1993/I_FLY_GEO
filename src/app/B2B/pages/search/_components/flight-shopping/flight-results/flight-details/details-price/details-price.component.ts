import { PricingDetails } from '@/B2B/pages/search/models/FlightResultCardInterface.interface';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-details-price, details-price',
  imports: [],
  templateUrl: './details-price.component.html',
  styleUrl: './details-price.component.css',
  host: {
    'class': 'details-price-wrapper',
  },
})
export class DetailsPriceComponent {
  getPricing = input<PricingDetails | null>()
}
