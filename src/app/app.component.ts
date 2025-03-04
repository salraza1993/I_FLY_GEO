import { ViewportService } from './core/services/viewport.service';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutService } from './layouts/layout.service';
import { PageLayoutEnum } from './shared/enums/PageLayoutEnum';
import { DefaultLayoutComponent } from "./layouts/default-layout/default-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { CommonModule } from '@angular/common';
import { ErrorLayoutComponent } from "./layouts/error-layout/error-layout.component";

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
  host: {
    class: 'root-wrapper'
  }
})
export class AppComponent {
  title = 'i_fly_geo';
  readonly PageLayout = PageLayoutEnum;

  constructor(
    public LayoutService: LayoutService,
    private ViewportService: ViewportService
  ) { }
}
