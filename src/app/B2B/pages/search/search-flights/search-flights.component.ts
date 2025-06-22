import { Component, ViewEncapsulation } from '@angular/core';
import { COMMON_IMPORTS } from '@sharedHelpers/common-imports';
import { SearchFormContentWrapperComponent } from '@search/_components/search-form-content-wrapper/search-form-content-wrapper.component';

@Component({
  selector: 'app-search-flights, search-flights',
  imports: [COMMON_IMPORTS, SearchFormContentWrapperComponent],
  templateUrl: './search-flights.component.html',
  styleUrls: ['./search-flights.component.css', '../styles/search-common-styles.css'],
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'search-form-card-wrapper',
  }
})
export class SearchFlightsComponent {

}
