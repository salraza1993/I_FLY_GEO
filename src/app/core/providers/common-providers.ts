import { importProvidersFrom } from '@angular/core';

// Common Angular Modules
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BodyClassModifierService } from '../../shared/services/body-modifier.service';
import { LanguageService } from '../../shared/services/language.service';
import { ViewportService } from '../../shared/services/viewport.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CreateTranslateLoader } from '../i18n/translate-loader.factory';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

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
    NgxDatatableModule,
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
