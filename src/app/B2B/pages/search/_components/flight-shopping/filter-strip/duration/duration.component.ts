import { Component, effect, signal } from '@angular/core';
import { DropdownSelectedValueType, FilterDropdownComponent } from "../filter-dropdown/filter-dropdown.component";
import { CommonModule } from '@angular/common';
import { RangeSliderComponent } from "../../../range-slider/range-slider.component";

@Component({
  selector: 'app-duration, duration',
  imports: [CommonModule, FilterDropdownComponent, RangeSliderComponent],
  templateUrl: './duration.component.html',
  styleUrl: './duration.component.css',
  host: {
    'class': 'duration-wrapper'
  }
})
export class DurationComponent {
  showDropdown = signal<boolean>(false);
  minRange = signal<number>(0);
  maxRange = signal<number>(32);
  rangeValue = signal<number>(this.maxRange());
  selected = signal<DropdownSelectedValueType>(undefined);
  private readonly updateSelected = effect(() => {
    if(this.rangeValue() === this.maxRange()) this.selected.set(undefined);
    else this.selected.set(`${this.minRange()} - ${this.rangeValue()} hrs`)
  })
}
