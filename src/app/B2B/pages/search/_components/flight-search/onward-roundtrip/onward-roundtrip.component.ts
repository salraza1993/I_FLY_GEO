import {
  booleanAttribute,
  Component,
  computed,
  inject,
  input,
  linkedSignal,
  signal
} from '@angular/core';
import { COMMON_IMPORTS } from '@sharedHelpers/common-imports';
import { CabinSelectionComponent } from '../cabin-selection/cabin-selection.component';
import { SearchDatepickerComponent, SearchDateType } from '../search-datepicker/search-datepicker.component';
import { CustomButtonComponent } from '@sharedComponents/custom-button/custom-button.component';
import { OriginDestinationComponent, OriginDestinationDataType } from '../origin-destination/origin-destination.component';
import { PassengerSelectionComponent, PaxSelectionDataType } from '../passenger-selection/passenger-selection.component';
import { Router } from '@angular/router';
import { FlightSearchService } from '../../../services/flight-search.service';
import { DateTime } from 'luxon';
import { LocalStorageService } from '../../../../../../shared/services/localStorage.service';
import { SessionManagerService } from '../../../services/session-manager.service';

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
  private flightSearchService = inject(FlightSearchService);
  private sessionManager = inject(SessionManagerService);
  private localStorage = inject(LocalStorageService);
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
  originDestinationError = signal(true);
  datePickerError = signal(true);
  paxError = signal(false);

  focusNext = signal<string | null>(null);

  // Button disabled logic
  isDisabled = computed(() => {
    const origin = this.setOriginDestination().origin;
    const destination = this.setOriginDestination().destination;
    const date = this.dateRange();
    return (
      !origin || !destination || !date ||
      this.originDestinationError() || this.datePickerError()
    );
  });

  public focusHanlder(nextField: string | null): void {
    this.focusNext.set(nextField);
    this.showCalendar.set(nextField === 'datepicker');
    this.showPassengers.set(nextField === 'passengers');
    this.showCabins.set(nextField === 'cabin');
  }

  public searchFlight(): void {
    if (this.isDisabled()) return;
    // this.localStorage.setItem('search-criteria', JSON.stringify(this.setRequestBody()));
    this.sessionManager.autoDeleteExpiredSessions();
    const sessionId = this.sessionManager.createSessionWithData(JSON.stringify(this.setRequestBody()));
    this.router.navigate(['/search/flight-results'], {
      queryParams: { session: sessionId }
    });
  }

  public setRequestBody() {
    const { origin, destination } = this.setOriginDestination();
    const requestBody = {
      supplierCode: '1A',
      passengers: [{ type: 'adult' }],
      originDestinationsCriteria: [
        {
          destArrival_IATA_LocationCode: destination?.IATA || '',
          originDepature_IATA_LocationCode: origin?.IATA || '',
          date: this.dateRange()?.onwardDate || '',
        }
      ],
    }
    if(this.roundTrip()) {
      requestBody.originDestinationsCriteria.push({
        destArrival_IATA_LocationCode: origin?.IATA || '',
        originDepature_IATA_LocationCode: destination?.IATA || '',
        date: this.dateRange()?.returnDate || '',
      });
    }
    return requestBody;
  }
}
