import { HttpClient, httpResource } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
// @Injectable({
//   providedIn: 'root'
// })

export type FlightSearchRequestBodyType = {
  supplierCode: string;
  passengers: { type: string }[];
  originDestinationsCriteria: {
    destArrival_IATA_LocationCode: string;
    originDepature_IATA_LocationCode: string;
    date: string;
  }[];
}
export class FlightSearchService {
  private BASE_API_URL = "https://iflygeo-api-supplier.azurewebsites.net/api/flights/search";
  private http = inject(HttpClient);
  private requestBody: FlightSearchRequestBodyType = {
    supplierCode: '1A',
    passengers: [{ type: 'adult' }],
    originDestinationsCriteria: [
      {
        destArrival_IATA_LocationCode: 'DXB',
        originDepature_IATA_LocationCode: 'CAI',
        date: '2025-07-30',
      }
    ],
  };

  getFlights = signal<any>([]);
  isLoading = signal<boolean>(true);
  isError = signal<boolean>(false);
  isErrorMessage = signal<string | null>(null);


  // private response = httpResource(() => ({ url: this.BASE_API_URL, method: 'POST', body: this.requestBody }), { defaultValue: []});
  // readonly getFlights = computed<unknown>(() => this.response.value() || []);

  // requestData = signal<any>(null);
  // Create the resource
  // constructor() {
  //   this.http.post(this.BASE_API_URL, this.requestBody).subscribe({
  //     next: (response) => {
  //       this.getFlights.set(response);
  //       this.isLoading.set(false);
  //       this.isError.set(false);
  //       this.isErrorMessage.set(null);
  //     },
  //     error: (error) => {
  //       this.isLoading.set(false);
  //       this.isError.set(true);
  //       this.isErrorMessage.set(error.message || 'An error occurred while fetching flight data.');
  //     }
  //   })
  // }

  searchHandler(requestBody: FlightSearchRequestBodyType): void {
    this.isLoading.set(true);
    this.http.post(this.BASE_API_URL, requestBody).subscribe({
      next: (response) => {
        this.getFlights.set(response);
        this.isLoading.set(false);
        this.isError.set(false);
        this.isErrorMessage.set(null);
      },
      error: (error) => {
        this.isLoading.set(false);
        this.isError.set(true);
        this.isErrorMessage.set(error.message || 'An error occurred while fetching flight data.');
      }
    });
  }

}
