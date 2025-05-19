import { TranslateService } from "@ngx-translate/core";


export function InitializeTranslate(translate: TranslateService) {
  const savedLang = localStorage.getItem('appSettings');
  const browserLang = translate.getBrowserLang();
  const langToUse = savedLang || browserLang || 'en';

  translate.setDefaultLang('en');
  translate.use(langToUse);

  document.documentElement.lang = langToUse;
  document.documentElement.dir = langToUse === 'ar' ? 'rtl' : 'ltr';
  console.log(';');
}