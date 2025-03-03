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
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: {
    class: 'root-wrapper'
  }
})
export class AppComponent {
  title = 'i_fly_geo';
  readonly PageLayout = PageLayoutEnum;

  constructor(public LayoutService: LayoutService) { }
}
