  import { CommonModule } from '@angular/common';
  import { Component, computed, effect, model, output, signal } from '@angular/core';
  import { FormsModule } from '@angular/forms';
  import { PlusMinusComponent } from './plus-minus/plus-minus.component';
  import { dropDownMenu } from '@animations/dropdownList.animation';
  import { ClickOutsideDirective } from '@/core/directives/click-outside.directive';

  export type PaxSelectionDataType = {
    adults: number;
    children: number;
    infants: number;
  };
  @Component({
    selector: 'app-passenger-selection, passenger-selection',
    imports: [
      CommonModule,
      FormsModule,
      PlusMinusComponent,
      ClickOutsideDirective,
    ],
    templateUrl: './passenger-selection.component.html',
    styleUrls: ['./passenger-selection.component.css'],
    animations: [dropDownMenu],
    host: {
      class: 'passenger-selection-wrapper',
      '[class.in-focused]': 'dropdownState()',
      '[attr.data-z-index]': 'dropdownState() ? 10 : 1'
    },
  })
  export class PassengerSelectionComponent {
    public dropdownState = signal<boolean>(false);
    public totalAdults = signal<number>(1);
    public totalChilds = signal<number>(0);
    public totalInfants = signal<number>(0);
    public error = signal<string | null>(null);
    public focusNext = output<string>();
    public touched = signal<boolean>(false);
    private hasInteracted = signal<boolean>(false);
    public hasError = model(!!this.error());
    public showPassengerDropdown = model<boolean>(false);
    
    private getPaxComputed = computed<PaxSelectionDataType>(() => ({
      adults: this.totalAdults(),
      children: this.totalChilds(),
      infants: this.totalInfants(),
    }))
  
    private totalPax = computed(() => {
      const pax = this.getPaxComputed();
      return pax.adults + pax.children + pax.infants;
    });
    

    public getPax = model<PaxSelectionDataType>({
      adults: this.totalAdults(),
      children: this.totalChilds(),
      infants: this.totalInfants(),
    });

    constructor() {
      effect(() => {
        if (this.showPassengerDropdown() && this.touched()) {
          this.dropdownHandler(true);
          queueMicrotask(() => this.showPassengerDropdown.set(false));
        }
      });
      effect(() => {
        if (!this.touched()) return;
        const total = this.totalPax();

        if (total > 9) {
          this.error.set('We do not support more than 9 passengers.');
        } else if (this.totalAdults() < 1) {
          this.error.set('At least one adult must be selected.');
        } else if (this.totalInfants() > this.totalAdults()) {
          this.error.set('Infants cannot exceed the number of adults.');
        } else {
          this.error.set(null);
        }
      });
      this.getPax.set({
        adults: this.totalAdults(),
        children: this.totalChilds(),
        infants: this.totalInfants(),
      })
    }

    public add(type: string): void {
      this.hasInteracted.set(true);
      switch (type) {
        case 'adults':
          this.totalAdults.update((n) => (n >= 9 ? n : n + 1));
          break;
        case 'children':
          this.totalChilds.update((n) => (n >= 9 ? n : n + 1));
          break;
        case 'infants':
          if (this.totalInfants() < this.totalAdults())
            this.totalInfants.update((n) => (n >= 9 ? n : n + 1));
          break;
      }
      this.getPax.set(this.getPaxComputed())
    }

    public subtract(type: string): void {
      this.hasInteracted.set(true);
      switch (type) {
        case 'adults':
          if (this.totalInfants() >= this.totalAdults()) {
            this.totalInfants.update((n) => Math.max(n - 1, 0));
          }
          this.totalAdults.update((n) => Math.max(n - 1, 1));
          break;
        case 'children':
          this.totalChilds.update((n) => Math.max(n - 1, 0));
          break;
        case 'infants':
          this.totalInfants.update((n) => Math.max(n - 1, 0));
          break;
      }
      this.getPax.set(this.getPaxComputed())
    }
    public reset(): void {
      this.totalAdults.set(1);
      this.totalChilds.set(0);
      this.totalInfants.set(0);
      this.getPax.set(this.getPaxComputed())
    }
    dropdownHandler(value: boolean) {
      this.dropdownState.set(value);
      if (!value) {
        this.touched.set(true);
      }
    }
  }
