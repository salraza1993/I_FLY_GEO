import { Component, ViewEncapsulation } from '@angular/core';
import { COMMON_IMPORTS } from '@sharedHelpers/common-imports';
import { SearchFormContentWrapperComponent } from '@search/_components/search-form-content-wrapper/search-form-content-wrapper.component';

@Component({
  selector: 'app-search-cars, search-cars',
  imports: [COMMON_IMPORTS, SearchFormContentWrapperComponent],
  templateUrl: './search-cars.component.html',
  styleUrls: ['./search-cars.component.css'],
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'search-form-card-wrapper',
  }
})
export class SearchCarsComponent {

}
