import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

interface indicators {
  type: string;
  info: string;
}

@Component({
  selector: 'search-indicator',
  imports: [CommonModule],
  templateUrl: './search-indicator.component.html',
  styleUrl: './search-indicator.component.css',
  host: {
    class: 'search-indicator'
  }
})
export class SearchIndicatorComponent {
  indicationList = input<indicators[]>([
    { type: '[tag]', info: 'search within a tag' },
    { type: 'user:1234', info: 'search by user' },
    { type: 'collective: "Name"', info: 'collective content' },
    { type: 'is: question', info: 'type of post' },
    { type: 'isAccepted: question', info: 'yes search within' },
    { type: 'isAccepted: yes', info: 'search within status' },
  ]);
}
