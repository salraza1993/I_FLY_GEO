import { Inject, inject, Injectable, Renderer2, RendererFactory2, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from './localStorage.service';
import { PreferencesDataTypes } from '../../types/appSettingInterface';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private translate = inject(TranslateService);
  private localStorage = inject(LocalStorageService);
  private defaultLang:string = 'en';
  private userPreferences = signal<PreferencesDataTypes>(this.localStorage.getInnerItem('appSettings', 'preferences'));
  private browserLang: string|undefined = this.translate.getBrowserLang();
  private savedLanguage: string = this.userPreferences().language; 
  private _currentLang = signal<string>(this.defaultLang);
  private _layoutDirection = signal<string>(this.userPreferences().layoutDirection);
  
  constructor() {
    this.initializeLanguage();
  }
  private initializeLanguage():void {    
    const languageToUse = this.savedLanguage || this.browserLang || this.defaultLang;
    this.translate.use(languageToUse);
    this._currentLang.set(languageToUse);
    this._layoutDirection.set(this.userPreferences().layoutDirection);
    this.setDocumentDirection(languageToUse);
  }

  public changeLanguage(setLanguage: string):void {
    this.translate.use(setLanguage);
    this._currentLang.set(setLanguage);
    const updatedPreferences = { ...this.userPreferences(), language: setLanguage }
    this.localStorage.setInnerItem('appSettings', 'preferences', updatedPreferences)
    this.setDocumentDirection(setLanguage);
    this._layoutDirection.set(this.userPreferences().layoutDirection);
  }

  private setDocumentDirection(documentLanguage: string):void {
    const updatedPreferences = {
      ...this.userPreferences(),
      layoutDirection: documentLanguage === 'ar' ? 'rtl' : 'ltr',
      language: documentLanguage
    }
    this.localStorage.setInnerItem('appSettings', 'preferences', updatedPreferences)
    document.documentElement.dir = updatedPreferences.layoutDirection;
    document.body.dir = updatedPreferences.layoutDirection;
    document.documentElement.lang = updatedPreferences.language;
    this._layoutDirection.set(this.userPreferences().layoutDirection);
  }
  public get currentLangSignal() {
    return this._currentLang;
  }
  public get currentLang(): string {
    return this._currentLang();
  }
  get getLayoutDirection(): 'ltr' | 'rtl' {
    return this._layoutDirection() as 'ltr' | 'rtl'
  }
}
