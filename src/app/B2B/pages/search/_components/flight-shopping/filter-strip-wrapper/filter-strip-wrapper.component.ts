import { CommonModule } from '@angular/common';
import { Component, computed, HostListener, inject, signal } from '@angular/core';
import { FilterStripComponent } from "../filter-strip/filter-strip.component";
import { AdditionalInfoComponent } from "../additional-info/additional-info.component";
import { FiltersService } from '../../../services/filters.service';

@Component({
  selector: 'app-filter-strip-wrapper, filter-strip-wrapper',
  imports: [CommonModule, FilterStripComponent, AdditionalInfoComponent],
  templateUrl: './filter-strip-wrapper.component.html',
  styleUrl: './filter-strip-wrapper.component.css',
  host: {
    'class': 'filter-strip-wrapper',
    '[class.fixed]': 'isSticky()',
    '[attr.data-x-index]': 'isSticky() ? 10 : 1'
  }
})
export class FilterStripWrapperComponent {
  private fliterService = inject(FiltersService)
  isSticky = computed(this.fliterService.isSticky);

  togglerValue1 = signal(false)
  togglerValue2 = signal(true)

  @HostListener("window:scroll", [])
  onWindowScroll() {
    const windowScroll = window.scrollY || document.documentElement.scrollTop;
    if (windowScroll > 150) {
      this.fliterService.setSticky(true)
    } else {
      this.fliterService.setSticky(false)
    }
  }
}
