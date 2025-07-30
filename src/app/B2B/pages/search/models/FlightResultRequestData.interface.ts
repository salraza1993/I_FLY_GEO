/**
 * Timeline segment data from server
 */
export interface TimelineData {
  readonly segmentId: string;
  readonly arrival: RequestArrivalDeparture;
  readonly dep: RequestArrivalDeparture;
  readonly duration: string;
  readonly operatingCarrierInfo: RequestOperatingCarrierInfo;
  readonly marketingCarrierInfo: null;
  readonly secureFlightInd: false;
  readonly segmentTypeCode: null;
}

/**
 * Arrival/Departure information
 */
export interface RequestArrivalDeparture {
  readonly AircraftScheduledDateTime: string;
  readonly IATALocationCode: string;
  readonly StationName: string;
  readonly TerminalName: string;
}

/**
 * Operating carrier details
 */
export interface RequestOperatingCarrierInfo {
  readonly CarrierDesigCode: string;
  readonly CarrierDesigName: string;
  readonly CarrierName: string;
  readonly CarrierCode: string;
  readonly OperatingCarrierFlightNumberText: string;
}

/**
 * Main result card data from server
 */
export interface FlightResultRequestData {
  readonly iid: string;
  readonly source: string;
  readonly journeys: RequestJourneyData[];
  readonly O_offers: string[];
  readonly R_offers: string[];
  readonly C_offers: string[];
  readonly hasAvailable: {
    readonly baggage: true;
    readonly seat: true;
    readonly meal: false;
    readonly refundable: false;
  };
}

/**
 * Journey information with segments
 */
export interface RequestJourneyData {
  readonly journeyId: string;
  readonly duration: string;
  readonly stops: number;
  readonly isDirect: boolean;
  readonly segments: RequestJourneySegmentData[];
}

/**
 * Individual journey segment
 */
export interface RequestJourneySegmentData {
  readonly segmentId: string;
  readonly arrival: RequestAirportInfo;
  readonly dep: RequestAirportInfo;
  readonly duration: string;
  readonly marketingCarrierInfo: null;
  readonly operatingCarrierInfo: RequestOperatingCarrierInfoType;
  readonly secureFlightInd: false;
  readonly segmentTypeCode: null;
}

/**
 * Airport information
 */
export interface RequestAirportInfo {
  readonly AircraftScheduledDateTime: string;
  readonly IATALocationCode: string;
  readonly StationName: string;
  readonly TerminalName: string;
}

/**
 * Operating carrier information type
 */
export interface RequestOperatingCarrierInfoType {
  readonly CarrierDesigCode: string;
  readonly CarrierDesigName: string;
  readonly CarrierName: string;
  readonly CarrierCode: string;
  readonly OperatingCarrierFlightNumberText: string;
}

