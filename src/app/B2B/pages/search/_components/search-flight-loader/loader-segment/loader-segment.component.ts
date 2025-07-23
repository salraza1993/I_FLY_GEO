import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-loader-segment, loader-segment',
  imports: [CommonModule],
  templateUrl: './loader-segment.component.html',
  styleUrl: './loader-segment.component.css',
  host: {
    'class': 'loader-segment',
    '[class.segment-roundtrip]': 'tripType() === "roundtrip"',
    '[class.segment-oneway]': 'tripType() === "oneway"',
  },
})
export class LoaderSegmentComponent {
  tripType = input.required<string | undefined>();
  from = input.required<string | undefined>();
  date = input.required<string | undefined>();
  to = input.required<string | undefined>();

  get dateFormat():string {
    const date = this.date();
    return DateTime.fromISO(date ?? '').toFormat('dd MMM yyyy');
  }
}
