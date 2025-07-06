import { Component, input, model } from '@angular/core';

@Component({
  selector: 'app-selected-pax-strip, selected-pax-strip',
  imports: [],
  templateUrl: './selected-pax-strip.component.html',
  styleUrl: './selected-pax-strip.component.css',
  host: {
    'class': 'selected-pax__list'
  }
})
export class SelectedPaxStripComponent {
  type = input<string>('Ad')
  value = model<number>(0);
}
