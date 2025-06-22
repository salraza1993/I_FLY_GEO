import { Component, input } from '@angular/core';
import { COMMON_IMPORTS } from '@sharedHelpers/common-imports';
import { FlightsHeroBgComponent } from '@search/elements/flights-hero-bg/flights-hero-bg.component';

@Component({
  selector: 'app-search-form-content-wrapper, search-form-content-wrapper',
  imports: [COMMON_IMPORTS, FlightsHeroBgComponent],
  templateUrl: './search-form-content-wrapper.component.html',
  styleUrl: './search-form-content-wrapper.component.css',
  host: {
    'class': 'search-form-content-wrapper'
  }
})
export class SearchFormContentWrapperComponent {
  headingSmall = input<string>('Search');
  headingBig = input<string>('Flight');
}
