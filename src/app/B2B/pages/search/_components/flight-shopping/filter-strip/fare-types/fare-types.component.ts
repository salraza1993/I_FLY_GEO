import { Component, computed, effect, signal } from '@angular/core';
import { DropdownSelectedValueType, FilterDropdownComponent } from "../filter-dropdown/filter-dropdown.component";
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from "@/shared/components/elements/checkbox/checkbox.component";

@Component({
  selector: 'app-fare-types, fare-types',
  imports: [CommonModule, FilterDropdownComponent, CheckboxComponent],
  templateUrl: './fare-types.component.html',
  styleUrls: ['./fare-types.component.css', '../filter-components-style.css'],
  host: {
    'class': 'fare-types-wrapper'
  }
})
export class FareTypesComponent {
  refundable = signal<boolean>(false);
  nonRefundable = signal<boolean>(false);

  private readonly selectedValues = computed<DropdownSelectedValueType>(() => {
    const isRefundable = this.refundable();
    const isNonRefundable = this.nonRefundable();

    if (!isRefundable && !isNonRefundable) return undefined;

    const values: string[] = [];
    if (isRefundable) values.push('Refundable');
    if (isNonRefundable) values.push('Non-Refundable');

    return values.join(', ');
  });
  // tow-way binded
  selected = signal<DropdownSelectedValueType>(this.selectedValues())

  constructor() {
    effect(() => {
      this.selected.set(this.selectedValues());
    });
  }

}
