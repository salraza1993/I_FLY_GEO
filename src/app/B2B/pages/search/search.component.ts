import { Component } from '@angular/core';
import { FlightSearchComponent } from './flight-search/flight-search.component';

@Component({
  selector: 'search',
  imports: [FlightSearchComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export default class SearchComponent {

}
