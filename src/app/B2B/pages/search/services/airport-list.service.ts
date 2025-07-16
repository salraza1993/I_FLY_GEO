import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal } from '@angular/core';

export type AirportDataType = {
  airportCity: string,
  airportCode: string,
  airportName: string,
  countryCode: string,
  countryName: string,
  latitude: number,
  longitude: number,
  recordType: string,
  cugCurrencyCode: string,
};

@Injectable({
  providedIn: 'root',
})
export class AirportListService {
  private readonly AIRPORT_LIST_JSON_URL = 'assets/static-json/airports.json';
  private http = inject(HttpClient);
  private allAirport = signal<AirportDataType[]>([]);
  private searchTerm = signal<string>('');
  private isLoaded = signal<boolean>(false);
  public filteredAirport = signal<AirportDataType[]>([]);
  constructor() {
    effect(() => {
      const searchTerm = this.searchTerm().toLowerCase();
      const list = this.allAirport();
      this.filteredAirport.set(
        list.filter(
          (airport) =>
            airport.airportCode?.toLowerCase().includes(searchTerm) ||
            airport.airportName?.toLowerCase().includes(searchTerm)  ||
            airport.airportCity?.toLowerCase().includes(searchTerm)
        )
      );
    });
  }

  public loadAirports(): void {
    this.http
      .get<AirportDataType[]>(this.AIRPORT_LIST_JSON_URL)
      .subscribe((data) => {
        this.allAirport.set(data);
        this.isLoaded.set(true);
      });
  }
  public updateSearch(searchValue: string) {
    this.searchTerm.set(searchValue);
  }
}
