import { Component, ViewEncapsulation } from '@angular/core';
import { SearchFormContentWrapperComponent } from '@search/_components/search-form-content-wrapper/search-form-content-wrapper.component';
import { COMMON_IMPORTS } from '@sharedHelpers/common-imports';

@Component({
  selector: 'app-search-activities, search-activities',
  imports: [COMMON_IMPORTS, SearchFormContentWrapperComponent],
  templateUrl: './search-activities.component.html',
  styleUrls: ['./search-activities.component.css', '../styles/search-common-styles.css'],
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'search-form-card-wrapper',
  }
})
export class SearchActivitiesComponent {

}
