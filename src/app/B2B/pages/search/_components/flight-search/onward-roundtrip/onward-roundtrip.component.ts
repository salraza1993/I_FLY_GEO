import {
  booleanAttribute,
  Component,
  computed,
  inject,
  input,
  signal
} from '@angular/core';
import { COMMON_IMPORTS } from '@sharedHelpers/common-imports';
import { CabinSelectionComponent } from '../cabin-selection/cabin-selection.component';
import { SearchDatepickerComponent, SearchDateType } from '../search-datepicker/search-datepicker.component';
import { CustomButtonComponent } from '@sharedComponents/custom-button/custom-button.component';
import { OriginDestinationComponent, OriginDestinationDataType } from '../origin-destination/origin-destination.component';
import { PassengerSelectionComponent, PaxSelectionDataType } from '../passenger-selection/passenger-selection.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onward-roundtrip, onward-roundtrip',
  standalone: true,
  imports: [
    COMMON_IMPORTS,
    OriginDestinationComponent,
    PassengerSelectionComponent,
    CabinSelectionComponent,
    SearchDatepickerComponent,
    CustomButtonComponent,
  ],
  templateUrl: './onward-roundtrip.component.html',
  styleUrls: ['./onward-roundtrip.component.css'],
  host: {
    class: 'onward-roundtrip-content-wrapper',
    '[class.roundtrip]': 'roundTrip()',
  },
})
export class OnwardRoundtripComponent {
  router = inject(Router);
  roundTrip = input(false, { transform: booleanAttribute });

  // Signals
  setOriginDestination = signal<OriginDestinationDataType>({ origin: null, destination: null });
  dateRange = signal<SearchDateType>(null);
  selectedCabins = signal<string[]>(['Economy']);
  selectedPax = signal<PaxSelectionDataType>({ adults: 1, children: 0, infants: 0 });

  // Dropdown visibility
  showCalendar = signal(false);
  showPassengers = signal(false);
  showCabins = signal(false);

  // Error signals (can be used visually)
  originDestinationError = signal(false);
  datePickerError = signal(false);
  paxError = signal(false);

  focusNext = signal<string | null>(null);

  // Disable button unless all required fields are filled
  public isDisabled = computed(() => {
    const originDest = this.setOriginDestination();
    const hasOrigin = !!originDest.origin;
    const hasDestination = !!originDest.destination;
    const hasDate = !!this.dateRange();

    return !(hasOrigin && hasDestination && hasDate);
  });

  public focusHanlder(nextField: string | null): void {
    this.focusNext.set(nextField);
    this.showCalendar.set(nextField === 'datepicker');
    this.showPassengers.set(nextField === 'passengers');
    this.showCabins.set(nextField === 'cabin');
  }

  public searchFlight(): void {
    if (this.isDisabled()) return;
    this.router.navigate(['/search/flight-results']);
    console.log('Searching with:', {
      originDestination: this.setOriginDestination(),
      dateRange: this.dateRange(),
      pax: this.selectedPax(),
      cabin: this.selectedCabins()
    });
  }
}
