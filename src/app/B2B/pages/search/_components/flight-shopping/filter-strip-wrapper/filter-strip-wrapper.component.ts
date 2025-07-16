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
  togglerValue2 = signal(true);

  primaryGrid = signal<any>([]);
  dangerGrid = signal<any>([]);
  successGrid = signal<any>([]);
  infoGrid = signal<any>([]);
  warningGrid = signal<any>([]);
  purpleGrid = signal<any>([]);
  yellowGrid = signal<any>([]);
  accentGrid = signal<any>([]);
  secondaryGrid = signal<any>([]);

  @HostListener("window:scroll", [])
  onWindowScroll() {
    const windowScroll = window.scrollY || document.documentElement.scrollTop;
    if (windowScroll > 150) {
      this.fliterService.setSticky(true)
    } else {
      this.fliterService.setSticky(false)
    }
  }
  constructor() {
    this.primaryGrid.set(this.generateGrid('primary', 100, 5));
    this.dangerGrid.set(this.generateGrid('danger'));
    this.successGrid.set(this.generateGrid('success'));
    this.infoGrid.set(this.generateGrid('info'));
    this.warningGrid.set(this.generateGrid('warning'));
    this.purpleGrid.set(this.generateGrid('purple'));
    this.yellowGrid.set(this.generateGrid('yellow'));
    this.accentGrid.set(this.generateGrid('accent'));
    this.secondaryGrid.set(this.generateGrid('secondary'));
  }

  // generateGrid(type:string, arrayLength: number = 100)  {
  //   let innerTextValue = arrayLength;
  //   const array = [];
  //   while (innerTextValue >= 5) {
  //     array.push({type: type, label: innerTextValue})
  //     innerTextValue -= 5;
  //   }
  //   return array;
  // }
  generateGrid(type:string, arrayLength: number = 100, minusValue: number = 10)  {
    let innerTextValue = arrayLength;
    const array = [];
    while (innerTextValue >= minusValue) {
      array.unshift({type: type, label: innerTextValue})
      innerTextValue -= minusValue;
    }
    return array;
  }
}
