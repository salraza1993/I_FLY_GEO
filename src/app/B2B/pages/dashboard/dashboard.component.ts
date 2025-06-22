import { Component, signal } from '@angular/core';
import { SectionHeadingComponent } from "../../../shared/components/section-heading/section-heading.component";
import { BlockSpacerComponent } from "../../../shared/components/block-spacer/block-spacer.component";
import { DashboardReportsComponent } from "./_components/dashboard-reports/dashboard-reports.component";
import { DashboardGraphComponent } from "./_components/dashboard-graph/dashboard-graph.component";
import { LanguageSwitcherComponent } from '../../../shared/components/language-switcher/language-switcher.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ThemeModeChangerComponent } from '../../../shared/components/theme-mode-changer/theme-mode-changer.component';
// import { TopPerformedUsersComponent } from '../../../shared/components/B2B/dashboard/top-performed-users/top-performed-users.component';
import { DataTableComponent } from '../../../shared/components/elements/data-table/data-table.component';

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
    DataTableComponent
    // TopPerformedUsersComponent,

  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  host: {
    'class': 'page-content-wrapper'
  }
})
export class DashboardComponent {
  userData = [
    { name: 'Alice', age: 30, city: 'Paris' },
    { name: 'Bob', age: 25, city: 'Berlin' }
  ];

  userColumns = [
    { key: 'name', label: 'Name' },
    { key: 'age', label: 'Age' },
    { key: 'city', label: 'City' }
  ];

  onEdit(row: any) { console.log('Edit:', row); }
  onDelete(row: any) { console.log('Delete:', row); }
  onInfo(row: any) { console.log('Info:', row); }

}
