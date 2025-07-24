import { TooltipDirective } from '@/core/directives/tooltip.directive';
import { DateUtils } from '@/core/utilities/date-utils';
import { DateFormatPipe } from '@/core/pipes/date-format.pipe';
import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, input } from '@angular/core';
import { ThemeService } from '@shared/services/theme.service';
import { AirlineLogoComponent } from "./airline-logo/airline-logo.component";
import { AirportDataType, AirportListService } from '@/B2B/pages/search/services/airport-list.service';

@Component({
  selector: 'app-segment, segment',
  imports: [CommonModule, TooltipDirective, DateFormatPipe, AirlineLogoComponent],
  templateUrl: './segment.component.html',
  styleUrls: ['./segment.component.css', '../flight-results-common.css'],
  providers: [AirportListService],
  host: {
    class: 'segment-wrapper journey',
  },
})
export class SegementComponent {
  public readonly themeService = inject(ThemeService);
  readonly airportList = inject(AirportListService)
  segementData = input<any>([]);
  journeyTime = input<string>('');

  protected segment = computed(() => this.segementData());
  protected departFrom = computed(() => {
    const data = this.segment();
    return data?.[0] || null;
  });
  protected departTo = computed(() => {
    const data = this.segment();
    return data?.slice(-1)?.[0] || null;
  });

  // Convert getter to computed signal
  protected layoverSegments = computed(() => {
    const data = this.segment();
    return data?.length > 1 ? data.slice(0, -1) : [];
  });
  protected layoverAirportDetails = computed<AirportDataType[]>(() => this.filterOutLayoverDetails());



  constructor() {
    effect(() => {
      console.log('layoverAirportDetails', this.layoverAirportDetails())
    });
  }


  get totalDuration(): string {
    const formattedDuration = DateUtils.formatDuration(this.journeyTime());
    return formattedDuration;
  }

  get lastIndex() {
    const data = this.segment();
    return data?.length - 1 || 0;
  }

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    if (target) {
      target.src = 'assets/images/airlines/default.png';
    }
  }

  private filterOutLayoverDetails() {
    return this.layoverSegments()
      .map((segment: any) => {
        const iataCode = segment?.arrival?.IATALocationCode;
        if (!iataCode) return null;

        const airport = this.airportList.getAirport(iataCode);
        if (!airport) return null;

        // Pick only relevant fields
        const { AirportName, City, Country, IATA } = airport;
        return { AirportName, City, Country, IATA };
      })
      .filter((airport: any): airport is AirportDataType => !!airport);
  }
}
