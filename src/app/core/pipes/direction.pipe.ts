import { inject, Pipe, PipeTransform } from '@angular/core';
import { LocalStorageService } from '../../shared/services/localStorage.service';
import { LanguageService } from '../../shared/services/language.service';

@Pipe({
  name: 'languageDirection',
  standalone: true,
})
export class LanguageDirectionPipe implements PipeTransform {
  private _languageService = inject(LanguageService);

  transform(): 'ltr' | 'rtl' {
    return this._languageService.getLayoutDirection;
  }
}
