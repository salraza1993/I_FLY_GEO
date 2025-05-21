import { Component } from '@angular/core';
import { SectionHeadingComponent } from "../../../shared/components/common/section-heading/section-heading.component";
import { BlockSpacerComponent } from "../../../shared/components/common/block-spacer/block-spacer.component";
import { DashboardReportsComponent } from "../../../shared/components/B2B/dashboard/dashboard-reports/dashboard-reports.component";
import { DashboardGraphComponent } from "../../../shared/components/B2B/dashboard/dashboard-graph/dashboard-graph.component";
import { LanguageSwitcherComponent } from '../../../shared/components/common/language-switcher/language-switcher.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ThemeModeChangerComponent } from '../../../shared/components/common/theme-mode-changer/theme-mode-changer.component';

@Component({
  selector: 'dashboard',
  imports: [
    SectionHeadingComponent,
    BlockSpacerComponent,
    DashboardReportsComponent,
    DashboardGraphComponent,
    LanguageSwitcherComponent,
    TranslateModule,
    CommonModule,
    ThemeModeChangerComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  host: {
    'class': 'page-content-wrapper'
  }
})
export default class DashboardComponent {
  
  
}
