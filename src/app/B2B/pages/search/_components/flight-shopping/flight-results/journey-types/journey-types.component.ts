import { AirportDataType } from '@/B2B/pages/search/services/airport-list.service';
import { TooltipDirective } from '@/core/directives/tooltip.directive';
import { SearchCriteriaDataType } from '@/shared/models/SearchCriteria.interface';
import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-journey-types, journey-types',
  imports: [CommonModule, TooltipDirective],
  templateUrl: './journey-types.component.html',
  styleUrl: './journey-types.component.css',
  host: {
    'class': 'journey-types-wrapper journey-types',
  }
})
export class JourneyTypesComponent {
  tripDetails = input<Partial<SearchCriteriaDataType>>();

  get origin(): AirportDataType | null {
    const data = this.tripDetails()?.origin;
    return data ? data : null ;
  }
  get destination(): AirportDataType | null {
    const data = this.tripDetails()?.destination;
    return data ? data : null ;
  }

  get originTooltip(): string {
    const data  = this.tripDetails()?.origin;
    return data ? `${data.City} (${data.IATA}) ${data.AirportName}, ${data.Country}` : '';
  }
  get destinationTooltip(): string {
    const data  = this.tripDetails()?.destination;
    return data ? `${data.City} (${data.IATA}) ${data.AirportName}, ${data.Country}` : '';
  }
}
