import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-flights-loader-aircraft, flights-loader-aircraft',
  imports: [CommonModule],
  templateUrl: './flights-loader-aircraft.component.html',
  styleUrl: './flights-loader-aircraft.component.css',
  host: {
    'class': 'aircraft-loader'
  }
})
export class FlightsLoaderAircraftComponent {

}
