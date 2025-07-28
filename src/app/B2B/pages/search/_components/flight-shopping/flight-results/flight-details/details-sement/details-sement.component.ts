import { TimelineDataType } from '@/B2B/pages/search/models/SearchCardDataTypes.interface';
import { CommonModule } from '@angular/common';
import { Component, effect, input } from '@angular/core';

@Component({
  selector: 'app-details-sement, details-sement',
  imports: [CommonModule],
  templateUrl: './details-sement.component.html',
  styleUrl: './details-sement.component.css',
  host: {
    'class': 'details-sement-wrapper',
  },
})
export class DetailsSementComponent {
  getSegmentDetails = input<TimelineDataType[]>([]);
  effectSegment  = effect(() => {
    console.log('get: ', this.getSegmentDetails());
  })
}
