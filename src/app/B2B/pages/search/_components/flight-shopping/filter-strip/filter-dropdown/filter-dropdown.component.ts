import { ClickOutsideDirective } from '@/core/directives/click-outside.directive';
import { dropDownMenu } from '@/shared/animations/dropdownList.animation';
import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  input,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { filter } from 'rxjs/operators';

type SortingDataType = { label: string; id: string; selected: boolean };

@Component({
  selector: 'app-filter-dropdown, filter-dropdown',
  imports: [CommonModule, ClickOutsideDirective],
  templateUrl: './filter-dropdown.component.html',
  styleUrls: [
    './filter-dropdown.component.css',
    '../filter-components-style.css',
  ],
  encapsulation: ViewEncapsulation.None,
  animations: [dropDownMenu],
  host: {
    class: 'filter-dropdown',
    '[class.active]': 'isDropdownActive()',
    '[attr.data-z-index]': 'isDropdownActive() ? 10 : 0',
  },
})
export class FilterDropdownComponent {
  isDropdownActive = signal(false);
  buttonName = input('button name');
  iconBefore = input('');
  iconAfter = input('');

  getSortingList = input<SortingDataType[]>([
    { label: 'Duration', id: 'duration', selected: false },
    { label: 'Cheapest', id: 'cheapest', selected: false },
    { label: 'Earliest', id: 'earliest', selected: false },
    { label: 'Latest', id: 'latest', selected: false },
  ]);

  // Reactive state
  sortingList = signal<SortingDataType[]>(this.getSortingList());

  // Computed selected values (as string or array depending on use case)
  selectedValue = computed<string | undefined>(() => {
    const selected = this.sortingList().find(item => item.selected);
    return selected ? selected.label : undefined;
  });

  onSelect(targetItem: SortingDataType) {
    this.sortingList.update((list) =>
      list.map((item) =>
        item.id === targetItem.id
          ? { ...item, selected: !item.selected }
          : { ...item, selected: item.id === targetItem.id }
      )
    );
    this.onClick(false);
  }

  onClick(event: boolean): void {
    this.isDropdownActive.set(event);
  }
}
