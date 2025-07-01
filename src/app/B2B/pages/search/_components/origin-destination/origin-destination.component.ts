import { Component, computed, effect, ElementRef, model, output, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { COMMON_IMPORTS } from '@sharedHelpers/common-imports';
import { AirportListComponent } from "../airport-list/airport-list.component";
import { AirportDataType } from '../../services/airport-list.service';

export type OriginDestinationDataType = {
  origin: any, 
  destination: any
}
@Component({
  selector: 'app-origin-destination, origin-destination',
  imports: [COMMON_IMPORTS, FormsModule, AirportListComponent],
  templateUrl: './origin-destination.component.html',
  styleUrls: ['./origin-destination.component.css'],
  host: {
    'class': 'origin-destination-wrapper',
    '[attr.data-z-index]': '(enableOriginAirportList() || enableDestinationAirportList()) ? 10 : 1'
  }
})
export class OriginDestinationComponent {
  @ViewChild('originInput') originInput!: ElementRef<HTMLInputElement>;
  @ViewChild('destinationInput') destinationInput!: ElementRef<HTMLInputElement>;

  public isSwappedValue = signal(false);
  public origin = signal<string | null>(null);
  public destination = signal<string | null>(null);
  public focusChanged = output<string>();
  public enableOriginAirportList = signal<boolean>(false);
  public enableDestinationAirportList = signal<boolean>(false);
  public getOriginAirportData = signal<AirportDataType | null>(null);
  public getDestinationAirportData = signal<AirportDataType | null>(null);

  private originDestinationComputed = computed<OriginDestinationDataType>(() => ({
    origin: {...this.getOriginAirportData()},
    destination: {...this.getDestinationAirportData()}
  }))

  public getOriginDestination = model<OriginDestinationDataType>(this.originDestinationComputed())

  constructor() {
    effect(() => {
      this.getOriginDestination.set(this.originDestinationComputed());
    });
  }

  public swapValues(): void {
    const originValue = this.origin();
    const destinationValue = this.destination();
    this.origin.set(destinationValue);
    this.destination.set(originValue);
    this.isSwappedValue.update(prev => prev = !prev);
    // After swap, focus should stay logical
    if (this.destinationInput.nativeElement === document.activeElement) {
      this.focusOrigin();
    }
  }

  clearOrigin(): void {
    this.origin.set(null);
    this.focusOrigin();
  }
  onOriginChange(): void {
    // You can add debounce or validation logic here
    if (this.origin() && this.origin()!.length >= 3) {
      this.focusDestination();
    }
  }

  // Focus management methods
  focusOrigin(): void {
    setTimeout(() => {
      this.originInput.nativeElement.focus();
      this.focusChanged.emit('origin');
    }, 0);
  }

  focusDestination(): void {
    setTimeout(() => {
      this.destinationInput.nativeElement.focus();
      this.focusChanged.emit('destination');
    }, 0);
  }

  focusNextField(): void {
    // This would focus the next field in your form (date picker, etc.)
    this.focusChanged.emit('next');
  }

  onFocused(field: 'origin' | 'destination'): void {
    if (field === 'origin') {
      this.originInput.nativeElement.select()
      this.enableOriginAirportList.set(true)
      this.enableDestinationAirportList.set(false)
    } else if(field === 'destination') {
      this.destinationInput.nativeElement.select()
      this.enableDestinationAirportList.set(true)
      this.enableOriginAirportList.set(false)
    } else {
      this.enableOriginAirportList.set(false)
      this.enableDestinationAirportList.set(false)
    }
  }
  onSelectedAirportData(field: string) {
    if(field === 'origin') {
      this.enableOriginAirportList.set(false)
      this.focusDestination();
    } else if(field === 'destination') {
      this.enableDestinationAirportList.set(false)
      this.focusNextField();
    }
  }
  validateAndMoveFocus(event: Event, field: 'origin' | 'destination'): void {
    event.stopImmediatePropagation();
    event.preventDefault();
    if (field === 'origin' && this.origin() && this.origin()!.length >= 3) {
      this.enableOriginAirportList.set(false)
      this.focusDestination();
    } else if (field === 'destination' && this.destination() && this.destination()!.length >= 3) {
      this.enableDestinationAirportList.set(false)
      this.focusNextField();
    } else {
      this.enableOriginAirportList.set(false)
      this.enableDestinationAirportList.set(false)
    }
  }
}

