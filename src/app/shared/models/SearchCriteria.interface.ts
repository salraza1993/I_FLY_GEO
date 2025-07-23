import { AirportDataType } from "@/B2B/pages/search/services/airport-list.service";
import { StringOfArray } from "./Common.interface";

export interface SearchCriteriaDataType {
  tripType: string,
  origin: AirportDataType,
  destination: AirportDataType,
  dateRange: { onwardDate: string, returnDate?: string },
  selectedCabins: StringOfArray,
  passengers: { adults: number, children: number, infants: number },
  isDirectOnly: boolean,
  suppliers: StringOfArray;
}
