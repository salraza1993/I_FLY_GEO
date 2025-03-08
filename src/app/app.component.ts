import { ViewportService } from './core/services/viewport.service';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutService } from './layouts/layout.service';
import { PageLayoutEnum } from './shared/enums/PageLayoutEnum';
import { DefaultLayoutComponent } from "./layouts/default-layout/default-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { CommonModule } from '@angular/common';
import { ErrorLayoutComponent } from "./layouts/error-layout/error-layout.component";
import { AppSettingsService } from './core/services/appSettings.service';
import { LocalStorageService } from './core/services/localStorage.service';

@Component({
  selector: 'root',
  imports: [RouterOutlet, CommonModule, DefaultLayoutComponent, AuthLayoutComponent, ErrorLayoutComponent],
  template: `
    @switch (LayoutService.layout$ | async) {
      @case (PageLayout.Authorized) {
        <default-layout><router-outlet /></default-layout>
      }

      @case (PageLayout.UnAuthorized) {
        <auth-layout><router-outlet /></auth-layout>
      }

      @case (PageLayout.Error) {
        <error-layout><router-outlet /></error-layout>
      }

      @default {
        <auth-layout><router-outlet /></auth-layout>
      }
    }
`,
  styleUrl: './app.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ViewportService, AppSettingsService, LocalStorageService],
  host: {
    class: 'root-wrapper'
  }
})
export class AppComponent implements OnInit {
  title = 'i_fly_geo';
  readonly PageLayout = PageLayoutEnum;
  private viewportService = inject(ViewportService);
  private appSettingsService = inject(AppSettingsService);
  private localStorageService = inject(LocalStorageService);

  private appSettings = signal<any>(null);

  constructor(public LayoutService : LayoutService) { }

  ngOnInit(): void {
    this.appSettings.set(
      this.appSettingsService.initializeAppSetting().subscribe((data) => {
        if (this.localStorageService.getItem('appSettings') === null) {
          this.localStorageService.setItem('appSettings', JSON.stringify(data));
        }
      })
    )
  }
}
