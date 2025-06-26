import { CommonModule } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlusMinusComponent } from "./plus-minus/plus-minus.component";
import { dropDownMenu } from '@animations/dropdownList.animation';
import { ClickOutsideDirective } from '@/core/directives/click-outside.directive';
@Component({
  selector: 'app-passenger-selection, passenger-selection',
  imports: [CommonModule, FormsModule, PlusMinusComponent, ClickOutsideDirective],
  templateUrl: './passenger-selection.component.html',
  styleUrl: './passenger-selection.component.css',
  animations: [dropDownMenu],
  host: {
    'class': 'passenger-selection-wrapper'
  }
})
export class PassengerSelectionComponent {
  public dropdownState = signal<boolean>(false);
  public totalAdults = signal<number>(1);
  public totalChilds = signal<number>(0);
  public totalInfants = signal<number>(0);
  public error = signal<string|null>(null)
  private totalPax = computed<number>(() => (this.totalAdults() + this.totalChilds() + this.totalInfants()));

  constructor() {
    effect(() => {
      const _total:number = this.totalPax();
      _total > 9 ? this.error.set('We do not support more than 9 passengers.') : this.error.set(null);
    })
  }
  
  public paxAddition(type: string): void {
    switch (type) {
      case 'adults':
        this.totalAdults.update(n => n >= 9 ? n : n + 1);
        break;
        case 'children':
          this.totalChilds.update(n => n >= 9 ? n : n + 1);
          break;
        case 'infants':
          if(this.totalInfants() < this.totalAdults()) 
            this.totalInfants.update(n => n >= 9 ? n : n + 1);
          break;
    }
  }

  public paxSubstration(type: string): void {
    switch (type) {
      case 'adults':
        if(this.totalInfants() >= this.totalAdults()) {
          this.totalInfants.update(n => Math.max(n - 1, 0));          
        }
        this.totalAdults.update(n => Math.max(n - 1, 1));
        break;
      case 'children':
        this.totalChilds.update(n => Math.max(n - 1, 0));
        break;
      case 'infants':
        this.totalInfants.update(n => Math.max(n - 1, 0));
        break;
    }
  }
  public paxResetValues(): void {
    this.totalAdults.update(prev => prev = 1);
    this.totalChilds.update(prev => prev = 0);
    this.totalInfants.update(prev => prev = 0);
  }
  dropdownHandler(value: boolean) {
    this.dropdownState.update(prev => prev = value)
  }
}
