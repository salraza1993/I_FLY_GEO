import { COMMON_IMPORTS } from '@/shared/helpers/common-imports';
import { Component, input, ViewEncapsulation } from '@angular/core';
import { FlightsHeroBgComponent } from '../../elements/flights-hero-bg/flights-hero-bg.component';

@Component({
  selector: 'app-search-form-header, search-form-header',
  imports: [COMMON_IMPORTS, FlightsHeroBgComponent],
  templateUrl: './search-form-header.component.html',
  styleUrl: './search-form-header.component.css',
  host: {
    'class': 'search-form-header'
  }
})
export class SearchFormHeaderComponent {
  headingSmall = input<string>('Search');
  headingBig = input<string>('Flight');
}
