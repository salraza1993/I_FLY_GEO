import { importProvidersFrom } from '@angular/core';

// Common Angular Modules
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewportService } from '../services/viewport.service';
import { BodyClassModifierService } from '../services/body-modifier.service';

export const COMMON_PROVIDERS = [
  importProvidersFrom(
    CommonModule,
    HttpClient,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ViewportService,
    BodyClassModifierService
  )
];
