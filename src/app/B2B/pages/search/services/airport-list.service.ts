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

@Injectable({
  providedIn: 'root',
})
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
          this.allAirport.set(JSON.parse(JSON.stringify(data)));
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

  public getAirportByIATA(iata: string, getData?: Partial<AirportDataType>): AirportDataType | null {
    if (!this.isLoaded()) return null;
    const airport = this.allAirport().find(a => a.IATA.toLowerCase() === iata.toLowerCase());
    if (!airport) return null;

    if (getData && Object.keys(getData).length > 0) {
      const setData: Partial<AirportDataType> = {};
      for (const key of Object.keys(getData) as (keyof AirportDataType)[]) {
        setData[key] = airport[key] ?? '';
      }
      return setData as AirportDataType;
    }

    return {
      AirportName: airport.AirportName,
      City: airport.City,
      Country: airport.Country,
      IATA: airport.IATA,
      ICAO: airport.ICAO
    };
  }
}
