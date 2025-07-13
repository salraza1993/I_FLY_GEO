import { Component, signal } from '@angular/core';
import { DropdownSelectedValueType, FilterDropdownComponent } from "../filter-dropdown/filter-dropdown.component";
import { CommonModule } from '@angular/common';
import { dropDownMenu } from '@/shared/animations/dropdownList.animation';

@Component({
  selector: 'app-stops, stops',
  imports: [CommonModule, FilterDropdownComponent],
  templateUrl: './stops.component.html',
  styleUrls: ['./stops.component.css', '../filter-components-style.css'],
  animations: [dropDownMenu],
  host: {
    'class': 'stops-wrapper'
  }
})
export class StopsComponent {
  sortingList = signal([
    { label: 'Direct Only', id: 'directOnly', selected: false },
    { label: '1 Stop', id: '1stop', selected: false },
    { label: '2 Stops', id: '2stops', selected: false },
  ]);
  // Two-way binded
  showDropdown = signal<boolean>(false);
  selected = signal<DropdownSelectedValueType>(undefined);

  onStopSelect(targetItem:any) {
    this.showDropdown.set(true)
    this.sortingList.update((list) =>
      list.map((item) => item.id === targetItem.id ? { ...item, selected: !item.selected } : item)
    );
    const selectedItems = this.sortingList().filter(item => item.selected);
    const selectedLabels = selectedItems.map(item => item.label).join(', ');
    this.selected.set(selectedLabels || undefined);
  }
}
