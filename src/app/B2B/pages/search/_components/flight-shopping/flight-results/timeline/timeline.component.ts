import { TimelineData } from '@/B2B/pages/search/models/FlightResultRequestData.interface';
import { AirportListService } from '@/B2B/pages/search/services/airport-list.service';
import { TooltipDirective } from '@/core/directives/tooltip.directive';
import { DateFormatPipe } from '@/core/pipes/date-format.pipe';
import { DateUtils } from '@/core/utilities/date-utils';
import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, input } from '@angular/core';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-timeline, timeline',
  imports: [CommonModule, TooltipDirective, DateFormatPipe],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css',
  host: {
    class: 'timeline-wrapper',
  },
})
export class TimelineComponent {
  readonly airportList = inject(AirportListService);

  // Two-way binded
  timelineData = input<TimelineData[]>([]);
  journeyTime = input<string>('');

  protected segment = computed(() => this.timelineData());

  protected departFrom = computed(() => {
    const data = this.segment();
    return data?.[0] || null;
  });

  protected departTo = computed(() => {
    const data = this.segment();
    return data?.slice(-1)?.[0] || null;
  });

  protected layoverSegments = computed(() => {
    const data = this.segment();
    return data.slice(0, -1);
  });

  get totalDuration(): string {
    const formattedDuration = DateUtils.formatDuration(this.journeyTime());
    return formattedDuration;
  }

  // Getting tooltip content for a specific layover
  protected getLayoverTooltip(layoverIndex: number): string {
    const segments = this.segment();
    if (!segments || layoverIndex >= segments.length - 1) {
      return '';
    }

    const segment = segments[layoverIndex];
    const airport = this.airportList.getAirport(segment.arrival.IATALocationCode);
    const layoverTime = this.getLayoverTime(layoverIndex);

    if (!airport) {
      return `${segment.arrival.IATALocationCode}\nLayover Time: ${layoverTime}`;
    }

    return `${airport.City}, (${airport.IATA}) ${airport.AirportName}\nLayover Time: ${layoverTime}`;
  }

  // Calculating layover time for each layover airport
  protected getLayoverTime(layoverIndex: number): string {
    const segments = this.segment();
    if (!segments || segments.length < 2 || layoverIndex >= segments.length - 1) {
      return '0h 00m';
    }

    try {
      const arrivalAtLayover = DateTime.fromISO(segments[layoverIndex].arrival.AircraftScheduledDateTime);
      const departureFromLayover = DateTime.fromISO(segments[layoverIndex + 1].dep.AircraftScheduledDateTime);

      if (!arrivalAtLayover.isValid || !departureFromLayover.isValid) {
        return '0h 00m';
      }

      const layoverDuration = departureFromLayover.diff(arrivalAtLayover);
      const duration = layoverDuration.shiftTo('hours', 'minutes');

      const hours = Math.floor(Math.abs(duration.hours));
      const mins = Math.round(Math.abs(duration.minutes));

      return `${hours.toString().padStart(2, '0')}h ${mins.toString().padStart(2, '0')}m`;
    } catch (error) {
      console.warn('Error calculating layover time:', error);
      return '0h 00m';
    }
  }
}
