import { Component, inject, signal } from '@angular/core';
import { COMMON_IMPORTS } from '../../../../../shared/helpers/common-imports';
import { CustomTabsComponent } from '../../../../../shared/components/custom-tabs/custom-tabs.component';
import { ContentCardComponent } from '../../../../../shared/components/elements/content-card/content-card.component';
import { TranslateService } from '@ngx-translate/core';
interface SubTabs {
  label: string,
  id: string,
  selected: boolean,
  method: (tabItem: SubTabs) => void,
}
@Component({
  selector: 'dashboard-graph',
  imports: [COMMON_IMPORTS, CustomTabsComponent, ContentCardComponent],
  templateUrl: './dashboard-graph.component.html',
  styleUrl: './dashboard-graph.component.css',
  host: {
    'class': 'dashboard-graph-wrapper'
  }
})
export class DashboardGraphComponent {
  private translate = inject(TranslateService);
  public daysTabs = signal<SubTabs[]>([]);
  public subTabs = signal<SubTabs[]>([
    { label: 'All Reports', id: 'allReports', selected: true, method: this.tabHandler.bind(this) },
    { label: 'By Bookings', id: 'byBookings', selected: false, method: this.tabHandler.bind(this) },
    { label: 'By Supplier', id: 'bySuppliers', selected: false, method: this.tabHandler.bind(this) },
    { label: 'By Pax', id: 'byPax', selected: false, method: this.tabHandler.bind(this) },
    { label: 'By Revenue', id: 'byRevenue', selected: false, method: this.tabHandler.bind(this) },
  ]);
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
      this.daysTabs.set([
        { label: translations['DASHBOARD.TABS.DAY'], id: 'day', selected: true, method: this.tabHandler.bind(this) },
        { label: translations['DASHBOARD.TABS.WEEK'], id: 'week', selected: false, method: this.tabHandler.bind(this) },
        { label: translations['DASHBOARD.TABS.MONTH'], id: 'month', selected: false, method: this.tabHandler.bind(this) },
      ]);
    });
  }
  dummyCards = [
    { heading: 'Passengers Wise', data: 'BodyData'},
    { heading: 'Supplier Wise', data: 'BodyData'},
    { heading: 'Revenue Wise', data: 'BodyData'},
  ]

  public tabHandler(tabItem: SubTabs): void {
    this.subTabs.update((tabs) =>
      tabs.map(tab => ({ ...tab, selected: tab.id === tabItem.id }))
    )
  }
  
}
