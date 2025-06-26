import { ClickOutsideDirective } from '@/core/directives/click-outside.directive';
import { dropDownMenu } from '@/shared/animations/dropdownList.animation';
import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

type CabinDataListType = {
  id: string, 
  label: string, 
  selected: boolean
}
@Component({
  selector: 'app-cabin-selection, cabin-selection',
  imports: [CommonModule, ClickOutsideDirective],
  templateUrl: './cabin-selection.component.html',
  styleUrl: './cabin-selection.component.css',
  animations: [dropDownMenu],
  host: {
    'class': 'cabin-selection-wrapper'
  }
})
export class CabinSelectionComponent {
  public error = signal<string|null>(null)
  public dropdownState = signal<boolean>(false);
  public selectedCabins = signal<string[]>(['Economy']);

  public cabinList = signal<CabinDataListType[]>([
    { id: 'economy', label: 'Economy', selected: true },
    { id: 'economy-premium', label: 'Economy Premium', selected: false },
    { id: 'business-class', label: 'Business Class', selected: false },
    { id: 'first-class', label: 'First Class', selected: false },
    { id: 'not-preferred', label: 'Not Preferred', selected: false },
  ]);

  
  dropdownHandler(value: boolean) {
    this.dropdownState.update(prev => prev = value)
  }
  selectCabinHandler(itemId: string) {
    // this.cabinList.update((prev)=> [...prev, prev.selected = prev.id === itemId])
  }
}
