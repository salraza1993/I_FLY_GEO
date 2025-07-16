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
  withBag = signal<boolean>(false)
  withoutBag = signal<boolean>(false)

  // Two-way binded
  showDropdown = signal<boolean>(false);
  selected = signal<DropdownSelectedValueType>(undefined);

  private readonly selectedValues = computed<DropdownSelectedValueType>(() => {
    const withBaggage = this.withBag();
    const withoutBaggage = this.withoutBag();

    if (!withBaggage && !withoutBaggage) return undefined;

    const values: string[] = [];
    if (withBaggage) values.push('With Bage');
    if (withoutBaggage) values.push('Without Bage');

    return values.join(', ');
  });

  private readonly updateSelected = effect(() => {
    this.selected.set(this.selectedValues());
  })

}
