import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';

export type AirportDataType = {
  AirportName: string
  City: string
  Country: string
  IATA: string
  ICAO?: string
  Lat?: string
  Long?: string
  TimeZone?: string
};

// @Injectable({
//   providedIn: 'root',
// })
export class AirportListService {
  private readonly AIRPORT_LIST_JSON_URL = 'assets/static-json/airports.json';
  private http = inject(HttpClient);
  public allAirport = signal<AirportDataType[]>([]);
  private searchTerm = signal<string>('');
  private isLoaded = signal<boolean>(false);

  public filteredAirport = computed(() => {
    const query = (this.searchTerm() || '').toLowerCase().trim();
    if (query.length < 3) return [];

    return this.allAirport().filter((airport) =>
      JSON.stringify(airport).toLowerCase().includes(query)
    ).splice(0, 5);
  })

  constructor() {
    this.http
      .get<AirportDataType[]>(this.AIRPORT_LIST_JSON_URL).subscribe({
        next: (data) => {
          this.allAirport.set(data);
          this.isLoaded.set(true);
        },
        error: (error) => {
          console.error('Error loading airport data:', error);
          this.isLoaded.set(false);
        }
      })

  }

  public updateSearch(searchValue: string) {
    this.searchTerm.set(searchValue);
  }

  public getAirport(airportCode: string): AirportDataType | null {
    if (!this.isLoaded()) return null;
    const airport = this.allAirport().find(airport => airport.IATA.toLowerCase() === airportCode.toLowerCase());
    return airport || null;
  }
}
