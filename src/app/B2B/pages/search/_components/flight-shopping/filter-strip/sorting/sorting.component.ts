import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { DropdownSelectedValueType, FilterDropdownComponent } from "../filter-dropdown/filter-dropdown.component";
import { dropdownItemAnimation, dropDownMenu } from '@/shared/animations/dropdownList.animation';

type SortingDataType = { label: string; id: string; selected: boolean };

@Component({
  selector: 'app-sorting, sorting',
  imports: [CommonModule, FilterDropdownComponent],
  templateUrl: './sorting.component.html',
  animations: [dropDownMenu, dropdownItemAnimation],
  styleUrls: ['./sorting.component.css', '../filter-components-style.css']
})
export class SortingComponent {
  sortingList = signal<SortingDataType[]>([
    { label: 'Price - Low to High', id: 'priceLowToHigh', selected: false },
    { label: 'Price - High to Low', id: 'priceHighToLow', selected: false },
    { label: 'Duration - Low to High', id: 'durationLowToHigh', selected: false },
    { label: 'Duration - High to Low', id: 'durationHighToLow', selected: false },
    { label: 'Arrival - Low to High', id: 'arrivalLowToHigh', selected: false },
    { label: 'Arrival - High to Low', id: 'arrivalHighToLow', selected: false },
  ]);

  // Two-way binded
  showDropdown = signal<boolean>(false);
  selected = signal<DropdownSelectedValueType>(undefined);

  onSelect(targetItem: SortingDataType) {
    this.showDropdown.set(true)
    this.sortingList.update((list) =>
      list.map((item) =>
        item.id === targetItem.id
          ? { ...item, selected: !item.selected }
          : { ...item, selected: item.id === targetItem.id }
      )
    );
    const selected = this.sortingList().find(item => item.selected);
    this.selected.set(selected ? selected.label : undefined);
  }
}
