import { NgModalService } from '@/shared/services/ng-modal.service';
import { Component, inject, signal } from '@angular/core';
import { TabDataTypes, CustomTabsComponent } from '@shared/components/custom-tabs/custom-tabs.component';
import { MultiCityComponent } from "../../flight-search/multi-city/multi-city.component";
import { OnwardRoundtripComponent } from "../../flight-search/onward-roundtrip/onward-roundtrip.component";

@Component({
  selector: 'app-search-modify-form, search-modify-form',
  imports: [CustomTabsComponent, MultiCityComponent, OnwardRoundtripComponent],
  templateUrl: './search-modify-form.component.html',
  styleUrl: './search-modify-form.component.css',
  host: {
    'class': 'search-modify-form-wrapper'
  }
})
export class SearchModifyFormComponent {
  private readonly modalService = inject(NgModalService);
  public selectedTab = signal<string>('roundtrip');
  public flightTabs = signal<TabDataTypes[]>([
    { id: 'one-way', label: 'One-way', icon: 'arrow-right-long', selected: false, method: this.tabHandler.bind(this) },
    { id: 'roundtrip', label: 'Roundtrip', icon: 'arrow-right-arrow-left', selected: true, method: this.tabHandler.bind(this) },
    { id: 'multi-city', label: 'Multi-city', icon: 'globe-asia', selected: false, method: this.tabHandler.bind(this) },
  ]);

  public tabHandler(tabItem: TabDataTypes): void {
    this.flightTabs.update((tabs) =>
      tabs.map(tab => ({ ...tab, selected: tab.id === tabItem.id }))
    );
    this.selectedTab.set(tabItem.id || 'multi-city');
  }

  onClose():void {
    this.modalService.close('modify-search-modal');
  }
}
