import { Component, computed, effect, signal } from '@angular/core';
import { DropdownSelectedValueType, FilterDropdownComponent } from "../filter-dropdown/filter-dropdown.component";
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from "@/shared/components/elements/checkbox/checkbox.component";

@Component({
  selector: 'app-baggage, baggage',
  imports: [CommonModule, FilterDropdownComponent, CheckboxComponent],
  templateUrl: './baggage.component.html',
  styleUrls: ['./baggage.component.css', '../filter-components-style.css'],
  host: {
    'class': 'baggages-wrapper'
  }
})
export class BaggageComponent {
  checkinBaggage = signal<boolean>(false)
  showDropdown = signal<boolean>(false)
  selected = signal<DropdownSelectedValueType>(undefined);
  constructor() {
    effect(() => {
      if(this.checkinBaggage()) this.selected.set('1 - Checkin Bag');
      else this.selected.set(undefined)
    })
  }


}
