import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';

@Component({
  selector: 'app-flight-calender-carousel, flight-calender-carousel',
  imports: [CommonModule],
  templateUrl: './flight-calender-carousel.component.html',
  styleUrl: './flight-calender-carousel.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: {
    'class': 'flight-calendar-wrapper',
  }
})
export class FlightCalenderCarouselComponent {
  logoPath = 'assets/images/airlines'
  airlines = signal<any | any[]>([
    {
      airlineCode: 'EK',
      airlineName: 'Emirates Airline',
      amount: 563
    },
    {
      airlineCode: 'G9',
      airlineName: 'Air Arabia',
      amount: 563
    },
    {
      airlineCode: 'AI',
      airlineName: 'Air India',
      amount: 563
    },
    {
      airlineCode: 'SQ',
      airlineName: 'Singapore Airline',
      amount: 563
    },
    {
      airlineCode: '6E',
      airlineName: 'Indigo Airline',
      amount: 563
    },
    {
      airlineCode: 'BA',
      airlineName: 'British Airways',
      amount: 563
    },
    {
      airlineCode: 'ET',
      airlineName: 'Ethopian Airline',
      amount: 563
    },
    {
      airlineCode: 'UA',
      airlineName: 'United Airline',
      amount: 563
    },
    {
      airlineCode: 'UL',
      airlineName: 'Shrilankan Airline',
      amount: 563
    },
    {
      airlineCode: 'QR',
      airlineName: 'Qatar Airline',
      amount: 563
    },
    {
      airlineCode: 'QF',
      airlineName: 'Qantas Airline',
      amount: 563
    },
    {
      airlineCode: 'BG',
      airlineName: 'Biman Airline',
      amount: 563
    },
  ])

}
