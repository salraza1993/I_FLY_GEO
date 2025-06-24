import { booleanAttribute, Component, input, signal } from '@angular/core';
import { COMMON_IMPORTS } from '@sharedHelpers/common-imports';
import { OriginDestinationComponent } from '../origin-destination/origin-destination.component';
import { DatepickerComponent } from "../datepicker/datepicker.component";
import { PassengerSelectionComponent } from "../passenger-selection/passenger-selection.component";
import { CabinSelectionComponent } from "../cabin-selection/cabin-selection.component";
import { SearchDatepickerComponent } from "../search-datepicker/search-datepicker.component";

@Component({
  selector: 'app-onward-roundtrip, onward-roundtrip',
  imports: [
    COMMON_IMPORTS,
    OriginDestinationComponent,
    PassengerSelectionComponent,
    CabinSelectionComponent,
    SearchDatepickerComponent
],
  templateUrl: './onward-roundtrip.component.html',
  styleUrl: './onward-roundtrip.component.css'
})
export class OnwardRoundtripComponent {
  setOriginDestination = {
    'origin': null,
    'destination': null,
  };
  roundTrip = input(false, { transform: booleanAttribute});
  // getOriginDestination = signal<any>("Salman")
  // getOriginDestinationHandler(event: any) {
  //   this.getOriginDestination.set(event);
  // }
}
