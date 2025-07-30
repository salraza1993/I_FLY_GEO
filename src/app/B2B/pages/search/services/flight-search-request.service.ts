import { HttpClient, HttpContext } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';


type PaxType = { type: string, total: number };
type JourneyType = {
  destArrival_IATA_LocationCode: string,
  originDepature_IATA_LocationCode: string,
  date: string,
};

export type FlightSearchRequestType = {
  supplierCode: string,
  passengers: PaxType[],
  originDestinationsCriteria: JourneyType[],
}

@Injectable({
  providedIn: 'root',
})
export class FlightSearchRequestService {
  // example of request
  private requestType: FlightSearchRequestType = {
    supplierCode: '1A',
    passengers: [
      {
        type: 'adult',
        total: 1
      },
    ],
    originDestinationsCriteria: [
      {
        destArrival_IATA_LocationCode: 'DXB',
        originDepature_IATA_LocationCode: 'CAI',
        date: '2025-07-10',
      },
    ],
  };
  private http = inject(HttpClient);
  private readonly searchRequestData = signal<FlightSearchRequestType | null>(null);


  public setSearchRequest(data: FlightSearchRequestType):void {
    this.searchRequestData.set(data)
  }

  public readonly getSearchRequestData = computed(() => this.searchRequestData())
}
