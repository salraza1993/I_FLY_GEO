import { computed, inject, signal } from '@angular/core';
import { AirportListService } from './airport-list.service';
import { DateUtils } from '@/core/utilities/date-utils';
import { DateTime } from 'luxon';
import {
  FlightResultRequestData,
  RequestAirportInfo,
  RequestJourneyData,
  RequestJourneySegmentData,
} from '../models/FlightResultRequestData.interface';
import {
  AirportInfo,
  FlightJourney,
  FlightResultCard,
  FlightSegment,
  LayoverInfo,
  PricingDetails,
} from '../models/FlightResultCardInterface.interface';
import { FlightSearchService } from './flight-search.service';

// @Injectable({
//   providedIn: 'root'
// })
export class FlightResultModifierService {
  private readonly airlinesService = inject(AirportListService);
  private readonly flightSearchService = inject(FlightSearchService);

  private modifiedResult = signal<FlightResultCard | null>(null);
  private originalFlights = signal<any>(null);

  readonly modifiedResultComputed = computed<FlightResultCard | null>(() => this.modifiedResult());
  readonly getOffers = computed(() => this.flightSearchService.getOffers());

  resultModifyHanlder(data: FlightResultRequestData) {
    this.originalFlights.set(data);

    // Get offers once outside the transformation to avoid infinite loops
    const currentOffers = this.flightSearchService.getOffers();

    const transformedData: FlightResultCard = {
      id: data.iid,
      services: {
        baggage: data.hasAvailable?.baggage || false,
        seatSelection: data.hasAvailable?.seat || false,
        meal: data.hasAvailable?.meal || false,
        refundable: data.hasAvailable?.refundable || false,
      },
      offers: {
        combined: data.C_offers,
        onward: data.O_offers,
        return: data.R_offers,
      },
      journeys: this.journeyModifier(data.journeys) || [],
      pricing: this.setPriceFromOffers(data.C_offers[0], currentOffers),
      availability: {
        availableSeats: this.setSeats(data.C_offers[0], currentOffers) || null,
        baggageInfo: null,
        lastUpdated: null
      }
    };

    this.modifiedResult.set(transformedData);
  }

  private setPriceFromOffers(
    offerId: string,
    offers: any[]
  ): PricingDetails {
    const cardOffer = offers.find((item: any) => item.offerId === offerId);
    if (!cardOffer) {
      throw new Error(`Offer with ID ${offerId} not found`);
    }
    const priceDetails = {
      currencyCode: cardOffer.currencyCode,
      totalAmount: cardOffer.totalAmount,
      baseAmount: cardOffer.baseAmount,
      totalTaxes: Number(parseFloat(cardOffer.totalTax).toFixed(2)),
    };
    return priceDetails;
  }

  private setSeats(offerId: string, offers: any[]): number {
    const cardOffer = offers.find((item: any) => item.offerId === offerId);
    if (!cardOffer) {
      throw new Error(`Offer with ID ${offerId} not found`);
    }
    return cardOffer.numberOfBookableSeats;
  }

  private journeyModifier(journeys: RequestJourneyData[]) {
    const journeysData: FlightJourney[] = [];
    journeys.forEach((journey: RequestJourneyData) => {
      const newJourney = {
        journeyId: journey.journeyId,
        duration: DateUtils.formatDuration(journey.duration),
        stops: journey.stops,
        isDirect: journey.isDirect,
        segments: [] as any[],
      };

      const segments: RequestJourneySegmentData[] = journey.segments;
      segments.forEach((segment: RequestJourneySegmentData, index: number) => {
        const hasNext = segments.length > index + 1;
        let layovers: LayoverInfo[] = [];

        if (hasNext) {
          const nextSegment = segments[index + 1];
          layovers.push({
            arrival: this.setAirportDetails(segment.arrival),
            departure: this.setAirportDetails(nextSegment.dep),
            duration: this.getLayoverTime(index, segments),
          });
        }

        const opCarrier = segment.operatingCarrierInfo || {};

        const newSegment: FlightSegment = {
          segmentId: segment.segmentId,
          arrival: this.setAirportDetails(segment.arrival),
          departure: this.setAirportDetails(segment.dep),
          duration: DateUtils.formatDuration(segment.duration),
          layovers,
          carrier: {
            name: opCarrier.CarrierName,
            code: opCarrier.CarrierCode,
            flightNumber: `${opCarrier.CarrierCode} - ${opCarrier.OperatingCarrierFlightNumberText}`,
            aircraft: {
              type: opCarrier.CarrierDesigName,
              code: opCarrier.CarrierDesigCode,
            },
          },
        };
        newJourney.segments.push(newSegment);
      });

      journeysData.push(newJourney);
    });
    return journeysData;
  }

  private setAirportDetails(segmentType: RequestAirportInfo): AirportInfo {
    const options = { AirportName: 'true', City: 'true', Country: 'true' };
    const getDetails = this.airlinesService.getAirportByIATA(
        segmentType.IATALocationCode,
        options
      )
    return {
      scheduledDateTime: segmentType.AircraftScheduledDateTime,
      iataCode: segmentType.IATALocationCode,
      terminal: segmentType.TerminalName,
      airportName: getDetails?.AirportName || '',
      city: getDetails?.City || '',
      country: getDetails?.Country || '',
    };
  }

  private getLayoverTime(layoverIndex: number, segments: any): string {
    if (
      !segments ||
      segments.length < 2 ||
      layoverIndex >= segments.length - 1
    ) {
      return '0h 00m';
    }

    try {
      const arrivalAtLayover = DateTime.fromISO(
        segments[layoverIndex].arrival.AircraftScheduledDateTime
      );
      const departureFromLayover = DateTime.fromISO(
        segments[layoverIndex + 1].dep.AircraftScheduledDateTime
      );

      if (!arrivalAtLayover.isValid || !departureFromLayover.isValid) {
        return '0h 00m';
      }

      const layoverDuration = departureFromLayover.diff(arrivalAtLayover);
      const duration = layoverDuration.shiftTo('hours', 'minutes');

      const hours = Math.floor(Math.abs(duration.hours));
      const mins = Math.round(Math.abs(duration.minutes));

      return `${hours.toString().padStart(2, '0')}h ${mins
        .toString()
        .padStart(2, '0')}m`;
    } catch (error) {
      console.warn('Error calculating layover time:', error);
      return '0h 00m';
    }
  }
}
