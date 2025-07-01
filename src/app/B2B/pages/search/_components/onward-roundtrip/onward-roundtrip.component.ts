import { booleanAttribute, Component, input, signal } from '@angular/core';
import { COMMON_IMPORTS } from '@sharedHelpers/common-imports';
import {
  OriginDestinationComponent,
  OriginDestinationDataType,
} from '../origin-destination/origin-destination.component';
import { DatepickerComponent } from '../../../../../shared/components/datepicker/datepicker.component';
import {
  PassengerSelectionComponent,
  PaxSelectionDataType,
} from '../passenger-selection/passenger-selection.component';
import { CabinSelectionComponent } from '../cabin-selection/cabin-selection.component';
import { SearchDatepickerComponent, SearchDateType } from '../search-datepicker/search-datepicker.component';
import { DateTime } from '@easepick/bundle';
import { CustomButtonComponent } from '../../../../../shared/components/custom-button/custom-button.component';

@Component({
  selector: 'app-onward-roundtrip, onward-roundtrip',
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
  setOriginDestination!: OriginDestinationDataType;
  dateRange: SearchDateType = null;
  selectedDate: DateTime | { start: DateTime; end: DateTime } | null = null;
  selectedCabins = signal<string[]>(['Economy']);
  selectedPax = signal<PaxSelectionDataType>({ adults: 1, children: 0, infants: 0 });
  roundTrip = input(false, { transform: booleanAttribute });
}
