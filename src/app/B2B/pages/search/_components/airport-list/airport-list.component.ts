import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, model, signal } from '@angular/core';
import { AirportDataType, AirportListService } from '../../services/airport-list.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-airport-list, airport-list',
  imports: [CommonModule],
  templateUrl: './airport-list.component.html',
  styleUrl: './airport-list.component.css',
  host: {
    'class': 'aiport-list-wrapper'
  }
})
export class AirportListComponent {
  private readonly AIRPORT_LIST_JSON_URL = 'assets/static-json/airports.json';
  private http = inject(HttpClient);
  private allAirport = signal<AirportDataType[]>([]);
  private isLoaded = signal<boolean>(false);
  searchValue = input<string | null>('')
  constructor() {
    console.log(this.searchValue())
  }
  ngOnInit() {
    this.http
      .get<AirportDataType[]>(this.AIRPORT_LIST_JSON_URL)
      .subscribe((data) => {this.allAirport.set(data) });
  } 

  public filteredAirport = computed(() => {
    const query = (this.searchValue() || '').toLowerCase();
    return this.allAirport().filter(airport =>
      // airport.airportCity?.toLowerCase() === query.toLowerCase() ||
      // airport.airportCode?.toLowerCase() === query.toLowerCase() ||
      // airport.airportName?.toLowerCase() === query.toLowerCase()     
      airport.airportCity?.toLowerCase().includes(query.toLowerCase()) ||
      airport.airportCode?.toLowerCase().includes(query.toLowerCase()) ||
      airport.airportName?.toLowerCase().includes(query.toLowerCase())     
    );
  });

}
