import { GenerateUniqueId } from '@/shared/helpers/uniqueIdGenerator';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, effect, ElementRef, input, model, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-range-slider, ng-range-slider, range-slider',
  imports: [CommonModule, FormsModule],
  templateUrl: './range-slider.component.html',
  styleUrl: './range-slider.component.css',
  host: {
    'class': 'range-slider-wrapper ng-range-slider-wrapper'
  }
})
export class RangeSliderComponent implements AfterViewInit {
  @ViewChild('rangeInput') rangeInput! : ElementRef<HTMLInputElement>;
  @ViewChild('rangeThumb') rangeThumb! : ElementRef<HTMLDivElement>;
  @ViewChild('rangeLine') rangeLine! : ElementRef<HTMLDivElement>;

  private readonly uid = GenerateUniqueId(5);
  currency = 'AED';

  type = input<'pricing' | 'duration'>('pricing');
  min = input<number>(250);
  max = input<number>(1500);
  rangeValue = model<number>(1500)
  rangeId = input<string>(`rangeId-${this.uid}`);
  rangeName = input<string>(`rangeName-${this.uid}`);
  selectedRange = signal(this.rangeValue());

  // Update thumb/line position on change
  readonly updateStyles = effect(() => {
    this.updateStylesHandler(this.rangeValue())
  });

  private updateStylesHandler(value: number): void {
    let percentValue = ((value - this.min()) / (this.max() - this.min())) * 100;

    if (this.rangeThumb && this.rangeLine) {
      this.rangeThumb.nativeElement.style.setProperty('--thumb-x-position', `${(percentValue)}%`);
      this.rangeLine.nativeElement.style.setProperty('--line-width', `${percentValue}%`);
    }
  }
  ngOnit():void {
    this.updateStylesHandler(this.rangeValue())
  }
  // Re-apply styles after view init
  ngAfterViewInit(): void {
    console.log(this.min())
    queueMicrotask(() => {
      this.updateStylesHandler(this.rangeValue());
    });
  }
}
