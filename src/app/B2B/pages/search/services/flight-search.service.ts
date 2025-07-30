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

  private getResponse = signal<any>(null);

  getFlights = computed<any>(() => this.getResponse().data.flights || []);
  getOffers = computed<any>(() => this.getResponse().data.offers || []);
  totalResults = computed<number>(() => this.getFlights().length || 0);
  totalOffers = computed<number>(() => this.getOffers().length || 0);

  isLoading = signal<boolean>(true);
  isError = signal<boolean>(false);
  isErrorMessage = signal<string | null>(null);

  searchHandler(requestBody: FlightSearchRequestBodyType): void {
    this.isLoading.set(true);
    this.http.post(this.BASE_API_URL, requestBody).subscribe({
      next: (response) => {
        this.getResponse.set(response);
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
