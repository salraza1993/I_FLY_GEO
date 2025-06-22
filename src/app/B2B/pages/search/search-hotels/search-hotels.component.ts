import { Component, ViewEncapsulation } from '@angular/core';
import { COMMON_IMPORTS } from '@sharedHelpers/common-imports';
import { HotelsHeroBgComponent } from '../elements/hotels-hero-bg/hotels-hero-bg.component';
import { SearchFormContentWrapperComponent } from '../_components/search-form-content-wrapper/search-form-content-wrapper.component';

@Component({
  selector: 'app-search-hotels, search-hotels',
  imports: [COMMON_IMPORTS, HotelsHeroBgComponent, SearchFormContentWrapperComponent],
  templateUrl: './search-hotels.component.html',
  styleUrls: ['./search-hotels.component.css', '../styles/search-common-styles.css'],
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'search-form-card-wrapper',
  }
})
export class SearchHotelsComponent {

}
