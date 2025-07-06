import { ClickOutsideDirective } from '@/core/directives/click-outside.directive';
import { dropDownMenu } from '@/shared/animations/dropdownList.animation';
import { CommonModule } from '@angular/common';
import { Component, computed, effect, model, output, signal } from '@angular/core';

type CabinDataListType = {
  id: string;
  label: string;
  selected: boolean;
};
@Component({
  selector: 'app-cabin-selection, cabin-selection',
  imports: [CommonModule, ClickOutsideDirective],
  templateUrl: './cabin-selection.component.html',
  styleUrls: ['./cabin-selection.component.css'],
  animations: [dropDownMenu],
  host: {
    class: 'cabin-selection-wrapper',
    '[attr.data-z-index]': 'dropdownState() ? 10 : 1'
  },
})
export class CabinSelectionComponent {
  public error = signal<string | null>(null);
  public dropdownState = signal<boolean>(false);
  public getCabins = model<string[]>(['Economy']);

  public focusNext = output<string>();
  public touched = signal<boolean>(false);
  private hasInteracted = signal<boolean>(false);
  public showCabinDropdown = model<boolean>(false);

  public cabinList = signal<CabinDataListType[]>([
    { id: 'economy', label: 'Economy', selected: true },
    { id: 'economy-premium', label: 'Economy Premium', selected: false },
    { id: 'business-class', label: 'Business Class', selected: false },
    { id: 'first-class', label: 'First Class', selected: false },
    { id: 'not-preferred', label: 'Not Preferred', selected: false },
  ]);

  public selectedCabins = computed(() =>
    this.cabinList()
      .filter(c => c.selected && c.id !== 'not-preferred')
      .map(c => c.label)
  );

  public selectedClassLabels = computed(() => {
    const list = this.cabinList().filter(c => c.selected);
    return list.map(c => c.label).join(', ');
  });

  constructor() {
    // Keep model in sync with internal selection
    effect(() => {
      if (!this.touched()) return;
      const active = this.cabinList().filter(c => c.selected).map(c => c.label.replaceAll(' ', ''));
      this.getCabins.set(active);
    });
    effect(() => {
      if (this.showCabinDropdown() && this.touched()) {
        this.dropdownHandler(true);
        queueMicrotask(() => this.showCabinDropdown.set(false));
      }
    })
  }

  public dropdownHandler(value: boolean) {
    this.dropdownState.set(value);
    if (!value) {
      this.touched.set(true);

      if (this.hasInteracted()) {
        this.focusNext.emit('submit');
      }
    }
  }
  public selectCabinHandler(itemId: string) {
    this.cabinList.update(prev =>
      prev.map(cabin => {
        if (itemId === 'not-preferred') {
          return { ...cabin, selected: cabin.id === 'not-preferred' };
        }
        if (cabin.id === 'not-preferred') {
          return { ...cabin, selected: false };
        }
        if (cabin.id === itemId) {
          return { ...cabin, selected: !cabin.selected };
        }
        return cabin;
      })
    );
     this.autoSelectNotPreferred();
  }  

  private autoSelectNotPreferred() {
    this.cabinList.update(prev => {
      const hasCabinSelected = prev.some(
        c => c.selected && c.id !== 'not-preferred'
      );
      return prev.map(cabin =>
        cabin.id === 'not-preferred'
          ? { ...cabin, selected: !hasCabinSelected }
          : cabin
      );
    });
  }
}
