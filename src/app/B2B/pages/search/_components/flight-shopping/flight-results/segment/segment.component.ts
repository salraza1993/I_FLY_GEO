import { TooltipDirective } from '@/core/directives/tooltip.directive';
import { DateUtils } from '@/core/utilities/date-utils';
import { DateFormatPipe } from '@/core/pipes/date-format.pipe';
import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, input } from '@angular/core';
import { ThemeService } from '@shared/services/theme.service';
import { AirlinesLogoPipe } from '@/core/pipes/airlines-logo.pipe';

@Component({
  selector: 'app-segment, segment',
  imports: [CommonModule, TooltipDirective, DateFormatPipe, AirlinesLogoPipe],
  templateUrl: './segment.component.html',
  styleUrls: ['./segment.component.css', '../flight-results-common.css'],
  host: {
    class: 'segment-wrapper journey',
  },
})
export class SegementComponent {
  public readonly themeService = inject(ThemeService);
  segementData = input<any>([]);
  data = computed(() => this.segementData());

  get segmentLength() {
    const data = this.segementData()[0]?.segments;
    return Array.isArray(data) && data.length > 1 ? data.slice(0, -1) : [];
  }

  get lastIndex() {
    const data = this.segementData()[0]?.segments;
    return data?.length - 1 || 0;
  }

  get duration(): string {
    const formattedDuration = DateUtils.formatDuration(this.segementData()?.duration);
    return formattedDuration;
  }

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    if (target) {
      target.src = 'assets/images/airlines/default.png';
    }
  }
}
