import {
  Component,
  computed,
  effect,
  ElementRef,
  model,
  output,
  signal,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { COMMON_IMPORTS } from '@sharedHelpers/common-imports';
import { AirportListComponent } from '../airport-list/airport-list.component';
import { ClickOutsideDirective } from '@/core/directives/click-outside.directive';
import { AirportDataType } from '../../../services/airport-list.service';
import { fadeIn } from '@/shared/animations/fade.animations';

export type OriginDestinationDataType = {
  origin: string | object | null;
  destination: string | object | null;
};

@Component({
  selector: 'app-origin-destination, origin-destination',
  imports: [
    COMMON_IMPORTS,
    FormsModule,
    AirportListComponent,
    ClickOutsideDirective,
  ],
  templateUrl: './origin-destination.component.html',
  styleUrls: ['./origin-destination.component.css'],
  animations: [fadeIn],
  host: {
    class: 'origin-destination-wrapper',
    '[class.error]': 'errors().origin || errors().destination',
    '[attr.data-z-index]': 'zIndexCalculator()',
  },
})
export class OriginDestinationComponent {
  @ViewChild('originInput') originInput!: ElementRef<HTMLInputElement>;
  @ViewChild('destinationInput') destinationInput!: ElementRef<HTMLInputElement>;

  public isSwappedValue = signal(false);
  public origin = signal<string | null>(null);
  public destination = signal<string | null>(null);

  public focusNext = output<string>();
  public enableOriginAirportList = signal(false);
  public enableDestinationAirportList = signal(false);

  public getOriginAirportData = signal<AirportDataType | null>(null);
  public getDestinationAirportData = signal<AirportDataType | null>(null);
  public zIndexCalculator = computed(() =>
    (this.enableOriginAirportList() || this.enableDestinationAirportList()) ? 10 : 1)

  private originDestinationComputed = computed<OriginDestinationDataType>(() => ({
    origin: { ...this.getOriginAirportData() },
    destination: { ...this.getDestinationAirportData() },
  }));

  // Two-way binding data
  public getOriginDestination = model<OriginDestinationDataType>(this.originDestinationComputed());

  public errors = signal<{ origin: string | null; destination: string | null }>({
    origin: null,
    destination: null,
  });
  public isTouched = signal<{ origin: boolean; destination: boolean }>({
    origin: false,
    destination: false,
  });

  errorStateChanged = model<boolean>();

  private haveError = computed(() => {
    const touched = this.isTouched();
    const errors = this.errors();
    return (touched.origin && !!errors.origin) || (touched.destination && !!errors.destination);
  });

  private checkEffectsOnUpdate = effect(() => {
    this.getOriginDestination.set(this.originDestinationComputed());
    this.errorStateChanged.set(this.haveError());
  })


  public swapValues(): void {
    const [originValue, destinationValue] = [this.origin(), this.destination()];
    this.origin.set(originValue);
    this.destination.set(destinationValue);

    const temp = this.getOriginAirportData();
    this.getOriginAirportData.set(this.getDestinationAirportData());
    this.getDestinationAirportData.set(temp);
    this.isSwappedValue.update(prev => !prev);
    if (document.activeElement === this.destinationInput.nativeElement) {
      this.focusOrigin();
    }
  }

  private isValid(value: string | null, airport: AirportDataType | null): boolean {
    return !!value && value.length >= 3 && !!airport;
  }

  public onOutsideClicked(field: 'origin' | 'destination'): void {
    const isOrigin = field === 'origin';
    const inputValue = isOrigin ? this.origin() : this.destination();
    const selectedAirport = isOrigin ? this.getOriginAirportData() : this.getDestinationAirportData();
    const inputRef = isOrigin ? this.originInput : this.destinationInput;
    const listToggle = isOrigin ? this.enableOriginAirportList : this.enableDestinationAirportList;

    const otherValue = isOrigin ? this.destination() : this.origin();

    const valid = this.isValid(inputValue, selectedAirport);
    const isSame = !!inputValue && inputValue === otherValue;

    listToggle.set(false);
    const gotTouched = this.isTouched()[field];

    if(gotTouched) {
      if (!valid) {
        this.setError(field, 'Please select a valid airport.');
        isOrigin ? this.origin.set(null) : this.destination.set(null);
        isOrigin ? this.getOriginAirportData.set(null) : this.getDestinationAirportData.set(null);
      } else if (isSame) {
        this.setError(field, 'Origin and destination cannot be the same.');
        this.getOriginDestination.set({origin: null, destination: null });
      } else {
        this.clearError(field);
        if (document.activeElement === inputRef.nativeElement) {
          isOrigin ? this.focusDestination() : this.focusNextField();
        }
      }
    }
  }
  private setError(field: 'origin' | 'destination', message: string) {
    this.errors.update(prev => ({...prev, [field]: message }));
  }

  private clearError(field: 'origin' | 'destination') {
    this.errors.update(prev => ({...prev, [field]: null }));
  }

  private resetField(field: 'origin' | 'destination') {
    this.isTouched.update(prev => ({ ...prev, [field]: false }));
    this.clearError(field);
  }

  public onEnterPressed(field: 'origin' | 'destination') {
    if (field === 'origin') {
      this.focusDestination();
    } else {
      if (this.isValid(this.destination(), this.getDestinationAirportData())) {
        this.enableDestinationAirportList.set(false);
        this.focusNextField();
      }
    }
  }

  public clearValue(field: 'origin' | 'destination'): void {
    if (field === 'origin') {
      this.origin.set(null);
      this.getOriginAirportData.set(null);
      this.resetField('origin');
      this.focusOrigin();
    } else {
      this.destination.set(null);
      this.getDestinationAirportData.set(null);
      this.resetField('destination');
      this.focusDestination();
    }
  }

  public onAiportListSelected(field: 'origin' | 'destination', selectedAirport: AirportDataType): void {
    if (field === 'origin') {
      this.getOriginAirportData.set(selectedAirport);
      if (this.isValid(this.origin(), selectedAirport)) {
        this.enableOriginAirportList.set(false);
        this.originInput.nativeElement.blur();
        this.focusDestination();
      }
    } else {
      this.getDestinationAirportData.set(selectedAirport);
      if (this.isValid(this.destination(), selectedAirport)) {
        this.enableDestinationAirportList.set(false);
        this.destinationInput.nativeElement.blur();
        this.focusNextField();
      }
    }
  }

  public focusOrigin(): void {
    setTimeout(() => {
      this.originInput.nativeElement.focus();
      this.focusNext.emit('origin');
    }, 0);
  }

  public focusDestination(): void {
    setTimeout(() => {
      this.destinationInput.nativeElement.focus();
      this.destinationInput.nativeElement.select();
      if (!this.haveError() && this.getDestinationAirportData()) {
        this.focusNext.emit('destination');
      }
    }, 0);
  }

  public focusNextField(): void {
    this.destinationInput.nativeElement.blur();
    this.enableOriginAirportList.set(false);
    this.enableDestinationAirportList.set(false);
    if (!this.haveError() && this.getDestinationAirportData()) {
      this.focusNext.emit('datepicker');
    }
  }

  public onFocused(field: 'origin' | 'destination'): void {
    this.isTouched.update(prev =>  ({...prev, [field]: true}))
    if (field === 'origin') {
      this.originInput.nativeElement.select();
      this.enableOriginAirportList.set(true);
      this.enableDestinationAirportList.set(false);
    } else {
      this.destinationInput.nativeElement.select();
      this.enableDestinationAirportList.set(true);
      this.enableOriginAirportList.set(false);
    }
    this.clearError(field);
  }

  public onKeyDown(): void {
    this.enableDestinationAirportList.set(false)
  }
}
