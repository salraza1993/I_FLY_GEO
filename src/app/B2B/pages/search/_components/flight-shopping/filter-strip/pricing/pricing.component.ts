import { Component, computed, effect, signal } from '@angular/core';
import { DropdownSelectedValueType, FilterDropdownComponent } from "../filter-dropdown/filter-dropdown.component";
import { CommonModule } from '@angular/common';
import { dropDownMenu } from '@/shared/animations/dropdownList.animation';
import { RangeSliderComponent } from "../../../range-slider/range-slider.component";
type SortingDataType = { label: string; id: string; selected: boolean };

@Component({
  selector: 'app-pricing, pricing',
  imports: [CommonModule, FilterDropdownComponent, RangeSliderComponent],
  templateUrl: './pricing.component.html',
  animations: [dropDownMenu],
  styleUrls: ['./pricing.component.css', '../filter-components-style.css'],
  host: {
    'class': 'pricing-wrapper'
  }
})
export class PricingComponent {
  showDropdown = signal<boolean>(false);
  minRange = signal<number>(350);
  maxRange = signal<number>(1000);
  rangeValue = signal<number>(this.maxRange());
  selected = signal<DropdownSelectedValueType>(undefined);
  private readonly updateSelected = effect(() => {
    if(this.rangeValue() === this.maxRange()) this.selected.set(undefined);
    else this.selected.set(`${this.minRange()} - ${this.rangeValue()}`)
  })
}
