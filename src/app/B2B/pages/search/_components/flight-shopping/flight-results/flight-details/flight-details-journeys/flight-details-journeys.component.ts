import { CommonModule } from '@angular/common';
import { Component, computed, effect, input, signal } from '@angular/core';
import { AirlineLogoComponent } from "../../airline-logo/airline-logo.component";
import { TimelineComponent } from "../../timeline/timeline.component";
import { FlightJourney } from '@/B2B/pages/search/models/FlightResultCardInterface.interface';
import { DetailsLayoverComponent } from "../details-segment/details-layover/details-layover.component";
import { DetailsSegmentComponent } from '../details-segment/details-segment.component';

@Component({
  selector: 'app-flight-details-journeys, flight-details-journeys',
  imports: [CommonModule, AirlineLogoComponent, TimelineComponent, DetailsSegmentComponent, DetailsLayoverComponent],
  templateUrl: './flight-details-journeys.component.html',
  styleUrl: './flight-details-journeys.component.css',
  // providers: [AirportListService],
  host: {
    class: 'flight-details-journeys-wrapper',
  },
})
export class FlightDetailsJourneysComponent {
  getJourneys = input<FlightJourney[]>();
  protected journeysData = signal<FlightJourney[]>([]);
  protected journeys = computed<FlightJourney[]>(() => this.journeysData());

  private readonly journeyDataEffect = effect(() => {
    const data = this.getJourneys();
    if (data) {
      this.journeysData.set(this.addActiveStateToJourneys(data));
    }
  })

  private addActiveStateToJourneys(data: FlightJourney[]): FlightJourney[] {
    return data.map((journey, index) => ({
      ...journey,
      isActive: index === 0, // Set the first journey as active by default
    }))
  }

  toggleAccordion(item: any) {
    this.journeysData.update((journeys) =>
      journeys.map((journey) => ({
        ...journey,
        isActive: journey.journeyId === item.journeyId,
      }))
    );
  }

  protected getJourneyDuration(journey: FlightJourney): string {
    const getJourney = this.journeys().find(j => j.journeyId === journey.journeyId);
    const segments = journey.segments;
    const duration = getJourney?.isDirect ? getJourney.duration : segments.map(segment => segment.layoverDuration).join('');
    return duration;
  }
}
