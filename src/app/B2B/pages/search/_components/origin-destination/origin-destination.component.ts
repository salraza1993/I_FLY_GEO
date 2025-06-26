import { Component, effect, ElementRef, model, output, signal, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { COMMON_IMPORTS } from '@sharedHelpers/common-imports';

export type OriginDestinationDataType = {
  origin: string | null, 
  destination: string | null
}
@Component({
  selector: 'app-origin-destination, origin-destination',
  imports: [COMMON_IMPORTS, FormsModule],
  templateUrl: './origin-destination.component.html',
  styleUrls: ['./origin-destination.component.css', './../../styles/search-common-styles.css'],
  host: {
    'class': 'origin-destination-wrapper'
  }
})
export class OriginDestinationComponent {
  @ViewChild('originInput') originInput!: ElementRef<HTMLInputElement>;
  @ViewChild('destinationInput') destinationInput!: ElementRef<HTMLInputElement>;
  origin = signal<string | null>(null);
  destination = signal<string | null>(null);
  focusChanged = output<string>();
  getOriginDestination = model<OriginDestinationDataType>({
    origin: this.origin(),
    destination: this.destination(),
  })
  constructor() {
    effect(() => {
      this.getOriginDestination.set({
        origin: this.origin(),
        destination: this.destination()
      });
    });
  }
  public swapValues(): void {
    let originValue = this.origin();
    let destinationValue = this.destination();
    this.origin.set(destinationValue);
    this.destination.set(originValue);

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

  validateAndMoveFocus(field: 'origin' | 'destination'): void {
    if (field === 'origin' && this.origin() && this.origin()!.length >= 3) {
      this.focusDestination();
    } else if (field === 'destination' && this.destination() && this.destination()!.length >= 3) {
      this.focusNextField();
    }
  }
  inputHandler():void {}
}
