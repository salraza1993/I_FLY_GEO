import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-result-card-skeleton, result-card-skeleton',
  imports: [CommonModule],
  templateUrl: './result-card-skeleton.component.html',
  styleUrl: './result-card-skeleton.component.css',
  host: {
    'class': 'result-card-skeleton-wrapper',
  }
})
export class ResultCardSkeletonComponent {
  tripType = input<string>()
}
