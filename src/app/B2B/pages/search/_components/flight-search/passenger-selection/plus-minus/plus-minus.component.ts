import { CommonModule } from '@angular/common';
import { Component, computed, effect, input, model, signal } from '@angular/core';

@Component({
  selector: 'app-plus-minus, plus-minus',
  imports: [CommonModule],
  templateUrl: './plus-minus.component.html',
  styleUrl: './plus-minus.component.css',
  host: {
    'class': 'dropdown-wrapper__list dropdown-anime-item focus-within'
  }
})
export class PlusMinusComponent {
  public paxType = input('Adult');
  public type = input('Adult');
  public age = input('12+ Years')
  public selectedValue = model<number>(0);
  public onIncrement = input<() => void>();
  public onDecrement  = input<() => void>();
  private readonly MIN = 0;
  private readonly MAX = 9;
  public isPlusDisabled = computed(() => this.selectedValue() >= this.MAX);
  public isMinusDisabled = computed(() => {
    const val = this.selectedValue();
    const type = this.paxType().toLowerCase();
    return type === 'adults' ? val <= 1 : val <= this.MIN;
  });
}