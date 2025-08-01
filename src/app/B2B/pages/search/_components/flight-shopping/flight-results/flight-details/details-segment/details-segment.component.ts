import { FlightSegment } from '@/B2B/pages/search/models/FlightResultCardInterface.interface';
import { TimelineData} from '@/B2B/pages/search/models/FlightResultRequestData.interface';
import { AirlinesLogoPipe } from '@/core/pipes/airlines-logo.pipe';
import { DateFormatPipe } from '@/core/pipes/date-format.pipe';
import { TextTransformPipe } from '@/core/pipes/text-transform.pipe';
import { CommonModule } from '@angular/common';
import { Component, computed, effect, input, signal, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-details-segment, details-segment',
  imports: [CommonModule, DateFormatPipe, TextTransformPipe, AirlinesLogoPipe],
  templateUrl: './details-segment.component.html',
  styleUrl: './details-segment.component.css',
  host: {
    'class': 'details-segment-wrapper',
  },
})
export class DetailsSegmentComponent {
  getSegmentDetails = input<FlightSegment | undefined>();
  segmentDuration = input<string | undefined>(undefined);
  segmentIndex = input<number | null>(0);

  protected segment = signal<FlightSegment | undefined>(undefined);
  private segmentEffect = effect(() => {
    this.segment.set(this.getSegmentDetails());
  })
  protected origin = computed(() => this.segment()?.departure);
  protected destination = computed(() => this.segment()?.arrival);
  protected layovers = computed(() => this.segment()?.layovers);
  protected layoverDuration = computed(() => this.segment()?.duration);

  protected carrier = computed(() => {
    const segment = this.segment();
    return segment?.carrier || null;
  });

  // get segmentDuration(): string {
  //   let layoverDuration = '';
  //   this.layovers().forEach((layover, index) => {
  //     layoverDuration = layover.duration;
  //   });;

  //   return layoverDuration || '';
  // }

}
