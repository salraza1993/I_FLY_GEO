/**
 * Main flight result card data structure
 */
export interface FlightResultCard {
  readonly id: string;
  readonly services: FlightServices;
  readonly offers: FlightOffers;
  readonly journeys: FlightJourney[];
  readonly pricing?: PricingDetails;
  readonly availability?: AvailabilityInfo;
}

/**
 * Available flight services and amenities
 */
export interface FlightServices {
  readonly baggage: boolean;
  readonly seatSelection: boolean;
  readonly meal: boolean;
  readonly refundable: boolean;
}

/**
 * Flight offer identifiers for different trip types
 */
export interface FlightOffers {
  readonly combined: readonly string[];
  readonly onward: readonly string[];
  readonly return: readonly string[];
}

/**
 * Detailed pricing information
 */
export interface PricingDetails {
  readonly currencyCode: string;
  readonly totalAmount: number;
  readonly baseAmount: number;
  readonly totalTaxes: number; // Fixed typo: was "totalTaxs"
  readonly breakdown?: PriceBreakdown[];
}

/**
 * Optional price breakdown for transparency
 */
export interface PriceBreakdown {
  readonly description: string;
  readonly amount: number;
  readonly type: 'base' | 'tax' | 'fee' | 'surcharge';
}

/**
 * Flight availability information
 */
export interface AvailabilityInfo {
  readonly availableSeats?: number | null;
  readonly baggageInfo?: BaggageInfo | null;
  readonly lastUpdated?: Date | null;
}

/**
 * Baggage allowance details
 */
export interface BaggageInfo {
  readonly checkedBags: number;
  readonly carryOnBags: number;
  readonly weightLimit?: number;
  readonly weightUnit?: 'kg' | 'lbs' | 'quantity';
}

/**
 * Flight journey containing multiple segments
 */
export interface FlightJourney {
  readonly journeyId: string;
  readonly duration: string; // Format: "2h 30m"
  readonly stops: number;
  readonly isDirect: boolean;
  readonly segments: FlightSegment[];
  readonly totalDistance?: number; // In kilometers
}

/**
 * Individual flight segment
 */
export interface FlightSegment {
  readonly segmentId: string;
  readonly departure: AirportInfo;
  readonly arrival: AirportInfo;
  readonly duration: string;
  readonly carrier: CarrierInfo;
  readonly operatingCarrier?: CarrierInfo; // If different from marketing carrier
  readonly aircraft?: AircraftInfo;
  readonly layovers?: LayoverInfo[];
  readonly secureFlightIndicator?: boolean;
  readonly segmentType?: any;
}

/**
 * Layover information between segments
 */
export interface LayoverInfo {
  readonly departure: AirportInfo;
  readonly arrival: AirportInfo;
  readonly duration: string; // Format: "1h 45m"
  readonly airport?: AirportInfo;
  readonly isOvernight?: boolean;
  readonly facilities?: string[]; // Available facilities during layover
}

/**
 * Airport and timing information
 */
export interface AirportInfo {
  readonly scheduledDateTime: string; // ISO 8601 format
  readonly iataCode: string; // 3-letter IATA code
  readonly airportName: string;
  readonly terminal: string;
  readonly city: string;
  readonly country: string;
  readonly icaoCode?: string; // 4-letter ICAO code
  readonly countryCode?: string; // ISO 2-letter country code
  readonly gate?: string;
  readonly timezone?: string; // IANA timezone
}

/**
 * Airline carrier information
 */
export interface CarrierInfo {
  readonly name: string;
  readonly code: string; // 2-letter IATA code
  readonly flightNumber: string; // Full flight number (e.g., "AA1234")
  readonly logo?: string; // URL to carrier logo
  readonly aircraft?: AircraftInfo; // Optional aircraft details
}

/**
 * Aircraft details
 */
export interface AircraftInfo {
  readonly type: string; // Aircraft model (e.g., "Boeing 737-800")
  readonly code: string; // IATA aircraft code
  readonly configuration?: SeatConfiguration;
}

/**
 * Seat configuration details
 */
export interface SeatConfiguration {
  readonly economy?: number;
  readonly premiumEconomy?: number;
  readonly business?: number;
  readonly first?: number;
  readonly total: number;
}
