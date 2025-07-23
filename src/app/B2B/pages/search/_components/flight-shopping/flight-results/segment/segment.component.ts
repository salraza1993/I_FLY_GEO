import { TooltipDirective } from '@/core/directives/tooltip.directive';
import { DateUtils } from '@/core/utilities/date-utils';
import { CommonModule } from '@angular/common';
import { Component, effect, input } from '@angular/core';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-segment, segment',
  imports: [CommonModule, TooltipDirective],
  templateUrl: './segment.component.html',
  styleUrls: ['./segment.component.css', '../flight-results-common.css'],
  host: {
    class: 'segment-wrapper journey',
  },
})
export class SegementComponent {
  segementData = input<any>([]);

  dateFormat(dateString: string, type: string): string {
    const luxonObj = DateTime.fromISO(dateString);
    const date = luxonObj.toFormat('dd-MM-yyyy');
    const time = luxonObj.toFormat('HH:MM');
    if (type === 'date') return date;
    if (type === 'time') return time;
    return `${date}, ${time}`;
  }

  get segmentLength() {
    const data = this.segementData()[0].segments;
    return Array.isArray(data) && data.length > 1 ? data.slice(0, -1) : [];
  }

  get lastIndex() {
    const data = this.segementData()[0].segments;
    return data.length -1;
  }
  get duration():string {
    const formattedDuration = DateUtils.formatDuration(this.segementData().duration);
    return formattedDuration
  }
}
