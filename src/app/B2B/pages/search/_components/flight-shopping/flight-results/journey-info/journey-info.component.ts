import { TooltipDirective } from '@/core/directives/tooltip.directive';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-journey-info, journey-info, journey',
  imports: [CommonModule, TooltipDirective],
  templateUrl: './journey-info.component.html',
  styleUrls: ['./journey-info.component.css', '../flight-results-common.css'],
  host: {
    'class': 'journey-info-wrapper journey'
  }
})
export class JourneyInfoComponent {

}
