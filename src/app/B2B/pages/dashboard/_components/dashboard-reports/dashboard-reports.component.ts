import { Component, inject, signal, Type } from '@angular/core';
import { SectionHeadingComponent } from "@sharedComponents/section-heading/section-heading.component";
import { CustomTabsComponent, TabDataTypes } from "@sharedComponents/custom-tabs/custom-tabs.component";
import { RouterLink } from '@angular/router';
import { ReportElementsComponent } from "./report-elements/report-elements.component";
import { IconTransactionsComponent } from './icons/icon-transactions/icon-transactions.component';
import { IconBookingsComponent } from './icons/icon-bookings/icon-bookings.component';
import { IconHoldBookingsComponent } from './icons/icon-hold-bookings/icon-hold-bookings.component';
import { IconChangeRequestComponent } from './icons/icon-change-request/icon-change-request.component';
import { IconFailedBookingsComponent } from './icons/icon-failed-bookings/icon-failed-bookings.component';
import { TranslateService } from '@ngx-translate/core';


type IconComponentType = Type<any>;

@Component({
  selector: 'dashboard-reports',
  imports: [
    SectionHeadingComponent,
    CustomTabsComponent,
    RouterLink,
    ReportElementsComponent
  ],
  templateUrl: './dashboard-reports.component.html',
  styleUrl: './dashboard-reports.component.css',
  host: {
    'class': 'dashboard-reports-wrapper'
  }
})
export class DashboardReportsComponent {
  private translate = inject(TranslateService);
  readonly IconTransactionsComponent: IconComponentType = IconTransactionsComponent;
  readonly IconBookingsComponent: IconComponentType = IconBookingsComponent;
  readonly IconHoldBookingsComponent: IconComponentType = IconHoldBookingsComponent;
  readonly IconFailedBookingsComponent: IconComponentType = IconFailedBookingsComponent;
  readonly IconChangeRequestComponent: IconComponentType = IconChangeRequestComponent;
  public subTabs = signal<TabDataTypes[]>([]);
  constructor() {
    this.loadTranslatedTabs();
    this.translate.onLangChange.subscribe(() => this.loadTranslatedTabs());
  }

  private loadTranslatedTabs(): void {
    this.translate.get([
      'DASHBOARD.TABS.DAY',
      'DASHBOARD.TABS.WEEK',
      'DASHBOARD.TABS.MONTH'
    ]).subscribe(translations => {
      this.subTabs.set([
        { label: translations['DASHBOARD.TABS.DAY'], id: 'day', selected: true, method: this.tabHandler.bind(this) },
        { label: translations['DASHBOARD.TABS.WEEK'], id: 'week', selected: false, method: this.tabHandler.bind(this) },
        { label: translations['DASHBOARD.TABS.MONTH'], id: 'month', selected: false, method: this.tabHandler.bind(this) },
      ]);
    });
  }

  public tabHandler(tabItem: TabDataTypes): void {
    this.subTabs.update((tabs) =>
      tabs.map(tab => ({ ...tab, selected: tab.id === tabItem.id }))
    )
  }
}
