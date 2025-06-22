import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEchartsCore } from 'ngx-echarts';
import { routes } from './app.routes';
import { COMMON_PROVIDERS } from './core/providers/common-providers';
import { echarts } from './core/echarts/echarts-config';
import { provideAnimations } from '@angular/platform-browser/animations';
import {  provideHttpClient } from '@angular/common/http';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimations(),
    provideHttpClient(),
    [provideEchartsCore({ echarts })],
    provideRouter(routes),
    ...COMMON_PROVIDERS
  ]
};
