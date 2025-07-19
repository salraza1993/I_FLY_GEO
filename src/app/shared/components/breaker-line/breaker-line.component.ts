import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-breaker-line, breaker-line, separator-line',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './breaker-line.component.html',
  styleUrls: ['./breaker-line.component.css'],
  host: {
    'class': 'section-breaker-line-wrapper',
    '[style]': 'setStylesToParent()'
  }
})
export class BreakerLineComponent {
  height = input<number | string>(5);
  opacity = input<number | string>(0.5);
  type = input<string>('inherit');
  label = input<string | null>(null);
  margin = input<number | string>(0);
  padding = input<number | string>(0);

  get heightStyle(): string {
    return this.formatUnit(this.height());
  }

  get marginStyle(): string {
    return this.formatUnit(this.margin());
  }

  get paddingStyle(): string {
    return this.formatUnit(this.padding());
  }

  protected formatUnit(value: number | string): string {
    const val = String(value);
    return val.match(/(px|em|%|rem)$/) ? val : `${val}px`;
  }

  protected setStylesToParent(): { [key: string]: string | number } {
    return {
      // '--breaker-line-height': this.heightStyle,
      // '--breaker-line-margin-y': this.marginStyle,
      // '--breaker-line-padding-y': this.paddingStyle,
      // '--breaker-line-opacity': this.opacity(),
      // 'background-color': this.type() === 'inherit' ? 'inherit' : `var(--${this.type()})`
    };
  }
}
