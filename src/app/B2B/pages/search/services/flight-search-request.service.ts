import { HttpClient, HttpContext } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { FlightSearchRequestType } from '../models/FlightSearchRequestType.interface';


@Injectable({
  providedIn: 'root',
})
export class FlightSearchRequestService {

  
  requestType: FlightSearchRequestType = {
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
    // if(!this.searchRequestData()) {
    //   this.http.post('')
    // }
    console.log('insideService: ', this.searchRequestData());
  }
  
  
  public readonly getSearchRequestData = computed(() => this.searchRequestData())
}
