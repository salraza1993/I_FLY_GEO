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
import { from } from 'rxjs';

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
      journeys: this.journeyModifier(data.journeys),
      pricing: this.setPriceFromOffers(data.C_offers[0], currentOffers),
      availability: {
        availableSeats: this.setSeats(data.C_offers[0], currentOffers) || null,
        baggageInfo: null,
        lastUpdated: null
      }
    };

    this.modifiedResult.set(transformedData);
  }

  getDeferencialDayCount(startSegment: any, endSegment: any):string {

    return 'day'
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
        let layoverInfo: LayoverInfo | undefined = undefined;
        let layoverDuration : string | undefined = undefined;

        if (hasNext) {
          const nextSegment = segments[index + 1];
          layoverInfo = {
            arrival: this.setAirportDetails(segment.arrival),
            duration: this.getLayoverTime(index, segments),
          };
          layoverDuration = layoverInfo.duration;
        }

        const opCarrier = segment.operatingCarrierInfo || {};

        const newSegment: FlightSegment = {
          segmentId: segment.segmentId,
          arrival: this.setAirportDetails(segment.arrival),
          departure: this.setAirportDetails(segment.dep),
          duration: this.segmentDurationCalculator(segment),
          layovers: layoverInfo,
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
    const getDetails = this.airlinesService.getAirportByIATA(segmentType.IATALocationCode, options);

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
      return '';
    }

    try {
      const arrivalAtLayover = DateTime.fromISO(
        segments[layoverIndex].arrival.AircraftScheduledDateTime
      );
      const departureFromLayover = DateTime.fromISO(
        segments[layoverIndex + 1].dep.AircraftScheduledDateTime
      );

      if (!arrivalAtLayover.isValid || !departureFromLayover.isValid) {
        return '';
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
      return '';
    }
  }

  private segmentDurationCalculator(segment: RequestJourneySegmentData): string {
    if (segment.duration && segment.duration !== '') {
      return String(DateUtils.durationInMinutes(segment.duration));
    }
    const departureTime = segment.dep.AircraftScheduledDateTime;
    const arrivalTime = segment.arrival.AircraftScheduledDateTime;
    return this.getDifferenceInTime(departureTime, arrivalTime);
  }

  private getDifferenceInTime(fromTime: string, toTime: string): string {
    // need to discuss timeZone with Saud
    const depTime = DateTime.fromISO(fromTime, { zone: 'utc' });
    const arrTime = DateTime.fromISO(toTime, { zone: 'utc' });
    if (!depTime.isValid || !arrTime.isValid) {
      return 'Invalid DateTime format';
    }

    // Get the duration
    const diff = arrTime.diff(depTime, ["hours", "minutes"]).toObject();
    const durationHours = Math.floor(diff.hours ?? 0);
    const durationMinutes = Math.floor(diff.minutes ?? 0);

    const dayDifference = arrTime.startOf('day').diff(depTime.startOf('day'), 'days').days;

    // Format duration (e.g., "02h 00m")
    const durationFormat = `${String(diff.hours).padStart(2, "0")}h ${String(diff.minutes).padStart(2, "0")}m`;

    // Format like "04h 30m" or "23h 45m +1"
    let durationString = `${String(durationHours).padStart(2, '0')}h ${String(durationMinutes).padStart(2, '0')}m`;
    if (dayDifference >= 1) {
      durationString += ` +${dayDifference}`;
    }
    return durationString;
  }

}
