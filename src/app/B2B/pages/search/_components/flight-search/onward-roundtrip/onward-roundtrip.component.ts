import {
  booleanAttribute,
  Component,
  computed,
  inject,
  input,
  linkedSignal,
  model,
  signal,
} from '@angular/core';
import { COMMON_IMPORTS } from '@sharedHelpers/common-imports';
import { CabinSelectionComponent } from '../cabin-selection/cabin-selection.component';
import {
  SearchDatepickerComponent,
  SearchDateType,
} from '../search-datepicker/search-datepicker.component';
import { CustomButtonComponent } from '@sharedComponents/custom-button/custom-button.component';
import {
  OriginDestinationComponent,
  OriginDestinationDataType,
} from '../origin-destination/origin-destination.component';
import {
  PassengerSelectionComponent,
  PaxSelectionDataType,
} from '../passenger-selection/passenger-selection.component';
import { Router } from '@angular/router';
import {
  FlightSearchRequestBodyType,
  FlightSearchService,
} from '../../../services/flight-search.service';
import { DateTime } from 'luxon';
import { LocalStorageService } from '../../../../../../shared/services/localStorage.service';
import { SessionManagerService } from '../../../services/session-manager.service';
import { SearchCriteriaDataType } from '@/shared/models/SearchCriteria.interface';

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
  roundTrip = model<boolean>(false);

  // Signals
  setOriginDestination = signal<OriginDestinationDataType>({
    origin: null,
    destination: null,
  });
  dateRange = signal<SearchDateType>(null);
  selectedCabins = signal<string[]>(['Economy']);
  selectedPax = signal<PaxSelectionDataType>({
    adults: 1,
    children: 0,
    infants: 0,
  });

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
      !origin ||
      !destination ||
      !date ||
      this.originDestinationError() ||
      this.datePickerError()
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

    this.sessionManager.autoDeleteExpiredSessions();
    const data = {
      bodyParams: { ...this.setRequestBody() },
      searchCriteria: {...this.setSearchCriteria()},
    }
    const sessionId = this.sessionManager.createSessionWithData(data);
    this.flightSearchService.searchHandler(data.bodyParams);
    this.router.navigate(['/search/flight-results'], {
      queryParams: { session: sessionId },
    });
  }

  private setSearchCriteria(): SearchCriteriaDataType {
    const origin = this.setOriginDestination().origin;
    const destination = this.setOriginDestination().destination;

    if (!origin || !destination) {
      throw new Error('Origin and Destination must not be null');
    }

    const dateRangeValue = this.dateRange() ?? { onwardDate: '', returnDate: undefined };
    const data: SearchCriteriaDataType = {
      tripType: this.roundTrip() ? 'Roundtrip' : 'Oneway',
      origin: origin,
      destination: destination,
      dateRange: dateRangeValue,
      selectedCabins: this.selectedCabins(),
      passengers: this.selectedPax(),
      isDirectOnly: false,
      suppliers: ['1A', 'MS', '6E', 'G9', 'AI'],
    };
    return data;
  }

  private setRequestBody(): FlightSearchRequestBodyType {
    const { origin, destination } = this.setOriginDestination();
    const requestBody = {
      supplierCode: '1A',
      passengers: [{ type: 'adult' }],
      originDestinationsCriteria: [
        {
          destArrival_IATA_LocationCode: destination?.IATA || '',
          originDepature_IATA_LocationCode: origin?.IATA || '',
          date: this.dateRange()?.onwardDate || '',
        },
      ],
    };
    if (this.roundTrip()) {
      requestBody.originDestinationsCriteria.push({
        destArrival_IATA_LocationCode: origin?.IATA || '',
        originDepature_IATA_LocationCode: destination?.IATA || '',
        date: this.dateRange()?.returnDate || '',
      });
    }
    return requestBody;
  }
}
