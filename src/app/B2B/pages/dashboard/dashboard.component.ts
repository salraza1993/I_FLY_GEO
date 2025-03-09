import { Component, signal } from '@angular/core';
import { SectionHeadingComponent } from "../../../shared/components/common/section-heading/section-heading.component";
import { BlockSpacerComponent } from "../../../shared/components/common/block-spacer/block-spacer.component";
import { CustomTabsComponent } from "../../../shared/components/common/custom-tabs/custom-tabs.component";
interface SubTabs {
  label: string,
  id: string,
  selected: boolean,
  method: (tabItem: SubTabs) => void,
}
@Component({
  selector: 'dashboard',
  imports: [SectionHeadingComponent, BlockSpacerComponent, CustomTabsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  host: {
    'class': 'page-content-wrapper'
  }
})
export default class DashboardComponent {
  public subTabs = signal<SubTabs[]>([
    { label: "Day", id: "day", selected: true, method: this.tabHandler.bind(this) },
    { label: "Week", id: "week", selected: false, method: this.tabHandler.bind(this) },
    { label: "Month", id: "month", selected: false, method: this.tabHandler.bind(this) },
  ]);
  public tabHandler(tabItem: SubTabs): void {
    this.subTabs.update((tabs) =>
      tabs.map(tab => ({...tab, selected: tab.id === tabItem.id}))
    )
  }
}
