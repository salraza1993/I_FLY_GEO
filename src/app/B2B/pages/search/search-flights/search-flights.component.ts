import { Component, inject, OnDestroy, signal, ViewEncapsulation } from '@angular/core';
import { COMMON_IMPORTS } from '@sharedHelpers/common-imports';
import { SearchFormContentWrapperComponent } from '@search/_components/search-form-content-wrapper/search-form-content-wrapper.component';
import { CustomTabsComponent, TabDataTypes } from '@/shared/components/custom-tabs/custom-tabs.component';
import { OnwardRoundtripComponent } from '@/B2B/pages/search/_components/flight-search/onward-roundtrip/onward-roundtrip.component';
import { MultiCityComponent } from '../_components/flight-search/multi-city/multi-city.component';
import { FlightSearchService } from '../services/flight-search.service';
import { SessionManagerService } from '../services/session-manager.service';

@Component({
  selector: 'app-search-flights, search-flights',
  imports: [
    COMMON_IMPORTS,
    SearchFormContentWrapperComponent,
    CustomTabsComponent,
    OnwardRoundtripComponent,
    MultiCityComponent,
  ],
  providers: [FlightSearchService],
  templateUrl: './search-flights.component.html',
  styleUrls: ['./search-flights.component.css'],
  host: {
    'class': 'search-bg',
  }
})
export class SearchFlightsComponent implements OnDestroy {
  private flightSearchService =  inject(FlightSearchService);
  private sessionManagerService = inject(SessionManagerService);

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

  onInit(): void {
  }

  ngOnDestroy(): void {
    // this.sessionManagerService.removeSession();
  }
}
