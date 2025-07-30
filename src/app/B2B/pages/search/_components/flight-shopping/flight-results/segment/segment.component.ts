import { CommonModule } from '@angular/common';
import { Component, computed, effect, input, signal } from '@angular/core';
import { AirlineLogoComponent } from "../airline-logo/airline-logo.component";
import { TimelineComponent } from "../timeline/timeline.component";
import { FlightSegment } from '@/B2B/pages/search/models/FlightResultCardInterface.interface';

@Component({
  selector: 'app-segment, segment',
  imports: [CommonModule, AirlineLogoComponent, TimelineComponent],
  templateUrl: './segment.component.html',
  styleUrl: './segment.component.css',
  host: {
    class: 'segment-wrapper journey',
  },
})
export class SegmentComponent {
  segmentData = input<FlightSegment[]>([]);
  journeyTime = input<string>('');

  protected segments = signal<FlightSegment[]>(this.segmentData());
  private segmentEffect = effect(() => {
    this.segments.set(this.segmentData() || []);
  })
  // protected segments = computed(() => this.segmentData());

  protected operatingCarrier = computed(() => {
    const segment = this.segments()[0];
    return segment?.carrier || null;
  });
}
