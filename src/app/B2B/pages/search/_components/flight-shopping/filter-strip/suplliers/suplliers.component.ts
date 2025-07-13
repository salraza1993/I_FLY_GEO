import { Component, computed, signal } from '@angular/core';
import { DropdownSelectedValueType, FilterDropdownComponent } from "../filter-dropdown/filter-dropdown.component";
import { CommonModule } from '@angular/common';

type SuppliersType = { id: string,  name: string, selected: boolean };

@Component({
  selector: 'app-suplliers, suplliers',
  imports: [CommonModule, FilterDropdownComponent],
  templateUrl: './suplliers.component.html',
  styleUrls: ['./suplliers.component.css', '../filter-components-style.css'],
  host: {
    'class': 'suppliers-wrapper'
  }
})
export class SuplliersComponent {
  searchInput = signal<string | undefined>('');
  private suppliers = signal<SuppliersType[]>([
    {id: "sm", name: "SM", selected: false },
    {id: "ms", name: "MS", selected: false },
    {id: "sq", name: "SQ", selected: false },
    {id: "6e", name: "6E", selected: false },
  ]);

  // two-way binded
  showDropdown = signal<boolean>(false);
  selected = signal<DropdownSelectedValueType>(undefined);

  readonly filteredSuppliers = computed<SuppliersType[]>(() => {
    const query = (this.searchInput() || '').toLowerCase().trim();
    if (query.length < 3) return this.suppliers();
    return this.suppliers()?.filter(supplier => supplier.name.toLowerCase().includes(query));
  });


  public onSelect(targetItem: SuppliersType) {
    this.suppliers.update((list) => list?.map(item =>
        item.id === targetItem.id
        ? { ...item, selected: !item.selected }
        : item
      )
    );

    const selectedItems = this.suppliers().filter(item => item.selected);
    const selectedLabels = selectedItems.map(item => item.name).join(', ');
    this.selected.set(selectedLabels || undefined);
    this.showDropdown.set(false);
    this.searchInput.set('');
  }
}
