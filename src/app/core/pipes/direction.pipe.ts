import { Pipe, PipeTransform } from '@angular/core';
import { LanguageSwitchService } from 'src/app/services/languageSwitch.service';

@Pipe({
  name: 'languageDirection',
  standalone: true,
})
export class LanguageDirectionPipe implements PipeTransform {
  currentLanguage: string = 'en';
  constructor(private _languageService: LanguageSwitchService) {
  }
  transform(value: string | unknown): string {
    return value === 'ar' ? 'rtl' : 'ltr';
  }
}
