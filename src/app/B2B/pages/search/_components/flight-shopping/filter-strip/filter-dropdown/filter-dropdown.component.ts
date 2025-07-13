import { FiltersService } from '@/B2B/pages/search/services/filters.service';
import { ClickOutsideDirective } from '@/core/directives/click-outside.directive';
import { TooltipDirective } from '@/core/directives/tooltip.directive';
import { CommonModule } from '@angular/common';
import { Component, inject, input, model, signal } from '@angular/core';

export type DropdownSelectedValueType = string | undefined;
// TooltipDirective
@Component({
  selector: 'app-filter-dropdown, filter-dropdown',
  imports: [CommonModule, ClickOutsideDirective],
  templateUrl: './filter-dropdown.component.html',
  styleUrls: [ './filter-dropdown.component.css', '../filter-components-style.css',],
  host: {
    class: 'filter-dropdown',
    '[class.active]': 'showDropdown()',
    '[class.fixed]': 'isSticky()',
    '[attr.data-z-index]': 'showDropdown() ? 10 : 0',
  },
})
export class FilterDropdownComponent {
  public isSticky = inject(FiltersService).isSticky;
  public tooltipData = signal<string[] | any | null>(null);

  // inputs from parent two-way-binding
  showDropdown = model<boolean>(false);
  selectedValue = model<DropdownSelectedValueType>(undefined);

  // inputs from parent one-way
  buttonName = input<string | undefined>();
  iconBefore = input<string | undefined>('');
  iconAfter = input<string | undefined>('');
  classToButton = input<string | undefined>('');
  classToContentWrapper = input<string | undefined>('');
  onClickMethod = input<(type: boolean) => void | undefined>();

  onClick(event: boolean): void {
    this.onClickMethod();
    this.showDropdown.set(event);
  }

  get pills():string[] {
    const value = this.selectedValue();
    return value ? value.split(', ').map(v => v.trim()) : [];
  }

  get tooltipText(): string | null | boolean {
    return this.selectedValue() || (!this.showDropdown() && null);
  }
}
