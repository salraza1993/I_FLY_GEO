import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FilterStripComponent } from "../filter-strip/filter-strip.component";
import { AdditionalInfoComponent } from "../additional-info/additional-info.component";

@Component({
  selector: 'app-filter-strip-wrapper, filter-strip-wrapper',
  imports: [CommonModule, FilterStripComponent, AdditionalInfoComponent],
  templateUrl: './filter-strip-wrapper.component.html',
  styleUrl: './filter-strip-wrapper.component.css',
  host: {
    'class': 'filter-strip-wrapper'
  }
})
export class FilterStripWrapperComponent {

}
