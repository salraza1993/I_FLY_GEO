import { Component, inject } from '@angular/core';
import { LanguageService } from '../../../services/language.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'language-switcher',
  imports: [CommonModule],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.css'
})
export class LanguageSwitcherComponent  {  
  private languageService = inject(LanguageService)
  currentLang = this.languageService.currentLangSignal;
  
  changeLanguage(language: string):void {
    this.languageService.changeLanguage(language);
    // window.location.reload()
  }
}
