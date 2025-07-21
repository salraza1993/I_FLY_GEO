import { Component, signal } from '@angular/core';
import { OriginDestinationComponent, OriginDestinationDataType } from "../origin-destination/origin-destination.component";
import { PaxSelectionDataType, PassengerSelectionComponent } from '../passenger-selection/passenger-selection.component';
import { CabinSelectionComponent } from "../cabin-selection/cabin-selection.component";
import { CustomButtonComponent } from "@sharedComponents/custom-button/custom-button.component";
import { COMMON_IMPORTS } from '@sharedHelpers/common-imports';
import { DatepickerComponent, EasepickDateType } from "@sharedComponents/datepicker/datepicker.component";
import { AirportDataType } from '../../../services/airport-list.service';

// OriginDestinationComponent,
interface FlightSegment {
  id: string;
  originDestination: AirportDataType | null;
  date: Date;
}
@Component({
  selector: 'app-multi-city, multi-city',
  imports: [COMMON_IMPORTS,
    PassengerSelectionComponent, CabinSelectionComponent, CustomButtonComponent, DatepickerComponent],
  templateUrl: './multi-city.component.html',
  styleUrl: './multi-city.component.css',
  host: {
    'class': 'multi-city-content-wrapper'
  }
})
export class MultiCityComponent {
  segments = signal<FlightSegment[]>(
    [
      this.createNewSegment(),
      this.createNewSegment(),
      this.createNewSegment(),
      this.createNewSegment(),
      this.createNewSegment(),
      this.createNewSegment(),
    ] // Initialize with one segment
  );

  setOriginDestination!: OriginDestinationDataType;
  dateRange: EasepickDateType = null;
  selectedDate = signal<EasepickDateType>(null);
  selectedCabins = signal<string[]>(['Economy']);
  selectedPax = signal<PaxSelectionDataType>({ adults: 1, children: 0, infants: 0 });
  private createNewSegment(): FlightSegment {
    return {
      id: crypto.randomUUID(), // or use another unique ID generator
      originDestination: null, // Only AirportDataType properties allowed
      date: new Date()
    };
  }

  addSegment() {
    this.segments.update(current => [...current, this.createNewSegment()]);
  }

  removeSegment(id: string) {
    if (this.segments().length > 1) {
      this.segments.update(current => current.filter(s => s.id !== id));
    }
  }

  updateSegment(id: string, updates: Partial<FlightSegment>) {
    this.segments.update(current =>
      current.map(segment =>
        segment.id === id ? { ...segment, ...updates } : segment
      )
    );
  }
}
