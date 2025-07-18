import { importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BodyClassModifierService } from '@sharedServices/body-modifier.service';
import { LanguageService } from '@sharedServices/language.service';
import { ViewportService } from '@sharedServices/viewport.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CreateTranslateLoader } from '../i18n/translate-loader.factory';

export const COMMON_PROVIDERS = [
  importProvidersFrom(
    CommonModule,
    HttpClient,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ViewportService,
    LanguageService,
    BodyClassModifierService,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: CreateTranslateLoader,
        deps: [HttpClient]
      }
    })
  )
];
