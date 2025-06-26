import { CommonModule } from '@angular/common';
import { Component, effect, input, model, signal } from '@angular/core';

@Component({
  selector: 'app-plus-minus, plus-minus',
  imports: [CommonModule],
  templateUrl: './plus-minus.component.html',
  styleUrl: './plus-minus.component.css',
  host: {
    'class': 'pax-selection__block dropdown-anime-item focus-within'
  }
})
export class PlusMinusComponent {
  public paxType = input('Adult');
  public type = input('Adult');
  public age = input('12+ Years')
  public selectedValue = model<number>(0);
  public onIncrement = input<() => void>();
  public onDecrement  = input<() => void>();
  public isMinusDisabled = signal(false);
  public isPlusDisabled = signal(false);
  constructor() {
    effect(() => {
      this.makeDisabled(0, 9);
    })
  }

  private makeDisabled(min: number, max: number) {
    const isAdult = this.paxType().toLocaleLowerCase() === 'adult';
    if(isAdult && this.selectedValue() <= (min + 1)) {
      this.isMinusDisabled.update(value => value = true);
    } else if(this.selectedValue() === min) {
      this.isMinusDisabled.update(value => value = true);
    } else if(this.selectedValue() >= max) { 
      this.isPlusDisabled.update(value => value = true)
    } else {
      this.isMinusDisabled.update(value => value = false)
      this.isPlusDisabled.update(value => value = false)
    }    
  }
}