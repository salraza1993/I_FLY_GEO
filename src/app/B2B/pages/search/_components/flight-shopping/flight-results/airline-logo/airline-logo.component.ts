import { CarrierInfo } from '@/B2B/pages/search/models/FlightResultCardInterface.interface';
import { DirectionTypes, TooltipDirective } from '@/core/directives/tooltip.directive';
import { AirlinesLogoPipe } from '@/core/pipes/airlines-logo.pipe';
import { TextTransformPipe } from '@/core/pipes/text-transform.pipe';
import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';


export type OperatingCarrierTypes = {
  CarrierDesigCode: string,
  CarrierDesigName: string,
  CarrierName: string,
  CarrierCode: string,
  OperatingCarrierFlightNumberText: string
}

@Component({
  selector: 'app-airline-logo, airline-logo',
  imports: [CommonModule, AirlinesLogoPipe, TooltipDirective, TextTransformPipe],
  templateUrl: './airline-logo.component.html',
  styleUrl: './airline-logo.component.css',
  host: {
    'class': 'airline-logo-wrapper',
  },
})
export class AirlineLogoComponent {
  getAirline = input<CarrierInfo | null>(null);
  airlineLineInfo = computed(() => this.getAirline());
  tooltipDirection = input<DirectionTypes>('top-left');

  airlinesLogoNotFound = ['X1', 'VF'];

  get airlineLogoCode() : string  {
    const airline = this.getAirline()?.code;
    if(this.airlinesLogoNotFound.includes(airline!)) return '';
    return airline || '';
  }
  get airlineCode() : string  {
    const airline = this.getAirline()?.code;
    return airline || '';
  }
  get airlineName() : string {
    const airline = this.getAirline()?.name;
    return airline || '';
  }
  get flightNumber() : string {
    const airline = this.getAirline()?.flightNumber;
    return airline || '';
  }
  get airlineDesigCode() : string {
    const airline = this.getAirline()?.code;
    return airline || '';
  }
}
