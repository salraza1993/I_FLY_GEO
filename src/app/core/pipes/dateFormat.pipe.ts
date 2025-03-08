import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
  standalone: true,
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string | undefined): string {
    if (!value) return '';
    const inputDate = new Date(value);
    const options: any = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    return inputDate.toLocaleDateString('en-US', options);
  }
}
