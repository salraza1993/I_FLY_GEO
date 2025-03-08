import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCase',
  standalone: true
})
export class CamelCasePipe implements PipeTransform {
  // Not Working: Need to work
  transform(value: string | null) {
    return String(value).replace(/([a-z])([A-Z])/g, '$1 $2');
  }

}
