import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormatter',
  standalone: true
})
export class NumberFormatterPipe implements PipeTransform {
  private numberFormatter(number: number) {
    return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(number)
  }
  transform(value: number): unknown {
    return this.numberFormatter(value);
  }
}
