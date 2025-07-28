import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { AirlineLogoComponent } from "../../airline-logo/airline-logo.component";
import { TimelineComponent } from "../../timeline/timeline.component";
import { AirportListService } from '@/B2B/pages/search/services/airport-list.service';
import { DetailsSementComponent } from "../details-sement/details-sement.component";

@Component({
  selector: 'app-flight-details-journeys, flight-details-journeys',
  imports: [CommonModule, AirlineLogoComponent, TimelineComponent, DetailsSementComponent],
  templateUrl: './flight-details-journeys.component.html',
  styleUrl: './flight-details-journeys.component.css',
  // providers: [AirportListService],
  host: {
    class: 'flight-details-journeys-wrapper',
  },
})
export class FlightDetailsJourneysComponent {
  // temprory
  private airportListService = inject(AirportListService);
  journeys = signal<any[]>([
    {
      journeyId: '291',
      duration: 'PT3H25M',
      stops: 0,
      isActive: true,
      isDirect: true,
      segments: [
        {
          segmentId: '32',
          arrival: {
            AircraftScheduledDateTime: '2025-07-30T15:00:00',
            IATALocationCode: 'DXB',
            StationName: '',
            TerminalName: '1',
          },
          dep: {
            AircraftScheduledDateTime: '2025-07-30T10:35:00',
            IATALocationCode: 'CAI',
            StationName: '',
            TerminalName: '3',
          },
          duration: '',
          marketingCarrierInfo: null,
          operatingCarrierInfo: {
            CarrierDesigCode: '789',
            CarrierDesigName: 'BOEING 787-9',
            CarrierName: 'Saudia Arabian Airlines',
            CarrierCode: 'AI',
            OperatingCarrierFlightNumberText: '912',
          },
          secureFlightInd: false,
          segmentTypeCode: null,
        },
      ],
    },
    {
      journeyId: '292',
      duration: 'PT3H25M',
      stops: 0,
      isDirect: true,
      isActive: false,
      segments: [
        {
          segmentId: '71',
          arrival: {
            AircraftScheduledDateTime: '2025-08-30T18:00:00',
            IATALocationCode: 'DXB',
            StationName: '',
            TerminalName: '1',
          },
          dep: {
            AircraftScheduledDateTime: '2025-08-30T13:35:00',
            IATALocationCode: 'CAI',
            StationName: '',
            TerminalName: '3',
          },
          duration: '',
          marketingCarrierInfo: null,
          operatingCarrierInfo: {
            CarrierDesigCode: '32N',
            CarrierDesigName: 'AIRBUS A320NEO',
            CarrierName: 'EGYPTAIR',
            CarrierCode: 'MS',
            OperatingCarrierFlightNumberText: '905',
          },
          secureFlightInd: false,
          segmentTypeCode: null,
        },
      ],
    },
  ]);

  toggleAccordion(item: any) {
    this.journeys.update((journeys) =>
      journeys.map((journey) => ({
        ...journey,
        isActive: journey.journeyId === item.journeyId,
      }))
    );
  }
}
