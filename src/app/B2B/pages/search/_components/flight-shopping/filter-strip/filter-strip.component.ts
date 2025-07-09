import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation} from '@angular/core';
import { FilterDropdownComponent } from './filter-dropdown/filter-dropdown.component';

@Component({
  selector: 'app-filter-strip, filter-strip',
  imports: [CommonModule, FilterDropdownComponent],
  templateUrl: './filter-strip.component.html',
  styleUrls: ['./filter-strip.component.css', './filter-components-style.css'],
  host: {
    'class': 'flight-strip-wrapper'
  }
})
export class FilterStripComponent {

}
