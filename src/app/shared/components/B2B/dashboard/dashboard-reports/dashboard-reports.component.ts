import { Component, signal, Type } from '@angular/core';
import { SectionHeadingComponent } from "../../../common/section-heading/section-heading.component";
import { CustomTabsComponent } from "../../../common/custom-tabs/custom-tabs.component";
import { RouterLink } from '@angular/router';
import { ReportElementsComponent } from "./report-elements/report-elements.component";
import { IconTransactionsComponent } from './icons/icon-transactions/icon-transactions.component';
import { IconBookingsComponent } from './icons/icon-bookings/icon-bookings.component';
import { IconHoldBookingsComponent } from './icons/icon-hold-bookings/icon-hold-bookings.component';
import { IconChangeRequestComponent } from './icons/icon-change-request/icon-change-request.component';
import { IconFailedBookingsComponent } from './icons/icon-failed-bookings/icon-failed-bookings.component';

interface SubTabs {
  label: string,
  id: string,
  selected: boolean,
  method: (tabItem: SubTabs) => void,
}
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
  readonly IconTransactionsComponent: IconComponentType = IconTransactionsComponent;
  readonly IconBookingsComponent: IconComponentType = IconBookingsComponent;
  readonly IconHoldBookingsComponent: IconComponentType = IconHoldBookingsComponent;
  readonly IconFailedBookingsComponent: IconComponentType = IconFailedBookingsComponent;
  readonly IconChangeRequestComponent: IconComponentType = IconChangeRequestComponent;

  public subTabs = signal<SubTabs[]>([
    { label: "Day", id: "day", selected: true, method: this.tabHandler.bind(this) },
    { label: "Week", id: "week", selected: false, method: this.tabHandler.bind(this) },
    { label: "Month", id: "month", selected: false, method: this.tabHandler.bind(this) },
  ]);

  public tabHandler(tabItem: SubTabs): void {
    this.subTabs.update((tabs) =>
      tabs.map(tab => ({ ...tab, selected: tab.id === tabItem.id }))
    )
  }
}
