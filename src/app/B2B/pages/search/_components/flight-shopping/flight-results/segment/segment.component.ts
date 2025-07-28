import { TooltipDirective } from '@/core/directives/tooltip.directive';
import { DateFormatPipe } from '@/core/pipes/date-format.pipe';
import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, effect } from '@angular/core';
import { AirlineLogoComponent } from "../airline-logo/airline-logo.component";
import { AirportDataType, AirportListService } from '@/B2B/pages/search/services/airport-list.service';
import { TimelineComponent } from "../timeline/timeline.component";

@Component({
  selector: 'app-segment, segment',
  imports: [CommonModule, AirlineLogoComponent, TimelineComponent],
  templateUrl: './segment.component.html',
  styleUrls: ['./segment.component.css', '../flight-results-common.css'],
  host: {
    class: 'segment-wrapper journey',
  },
})
export class SegmentComponent {
  segmentData = input<any>([]);
  journeyTime = input<string>('');

  protected segment = computed(() => this.segmentData());
}
