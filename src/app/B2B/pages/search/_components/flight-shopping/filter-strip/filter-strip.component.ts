import { CommonModule } from '@angular/common';
import { Component, inject} from '@angular/core';
import { PricingComponent } from "./pricing/pricing.component";
import { fadeInOut } from '@/shared/animations/fade.animations';
import { FiltersService } from '../../../services/filters.service';
import { SortingComponent } from "./sorting/sorting.component";
import { StopsComponent } from "./stops/stops.component";
import { TimingComponent } from "./timing/timing.component";
import { DurationComponent } from "./duration/duration.component";
import { AirlinesComponent } from "./airlines/airlines.component";
import { SuplliersComponent } from "./suplliers/suplliers.component";
import { BaggageComponent } from "./baggage/baggage.component";
import { ConnectingAirportsComponent } from "./connecting-airports/connecting-airports.component";
import { FareTypesComponent } from "./fare-types/fare-types.component";
import { FilterDropdownComponent } from "./filter-dropdown/filter-dropdown.component";

@Component({
  selector: 'app-filter-strip, filter-strip',
  imports: [
    CommonModule,
    PricingComponent,
    SortingComponent,
    StopsComponent,
    TimingComponent,
    DurationComponent,
    AirlinesComponent,
    SuplliersComponent,
    BaggageComponent,
    ConnectingAirportsComponent,
    FareTypesComponent,
],
  templateUrl: './filter-strip.component.html',
  styleUrls: ['./filter-strip.component.css', './filter-components-style.css'],
  animations: [fadeInOut],
  host: {
    'class': 'flight-strip-wrapper',
    '[class.fixed]': 'isSticky()'
  }
})
export class FilterStripComponent {
  public isSticky = inject(FiltersService).isSticky;
}
