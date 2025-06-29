import { COMMON_IMPORTS } from '@sharedHelpers/common-imports';
import { Component, inject, output, signal } from '@angular/core';
import { CustomTabsComponent, TabDataTypes } from '@/shared/components/custom-tabs/custom-tabs.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-search-services-tabs, search-services-tabs',
  imports: [COMMON_IMPORTS, CustomTabsComponent],
  templateUrl: './search-services-tabs.component.html',
  styleUrl: './search-services-tabs.component.css',
  host: {
    'class': 'search-services-tabs-wrapper'
  }
})
export class SearchServicesTabsComponent {
  private router = inject(Router);
  private location = inject(Location);
  private activatedRoute = inject(ActivatedRoute);
  private currentLocation = signal<string>('flights');
  private selectedTab = signal<string | null>(null);
  public readonly sendSelectedTab = output<string>();
  public servicesTabs = signal<TabDataTypes[]>([
    { id: 'flights', label: 'Flights', icon: 'plane', selected: true, method: this.tabHandler.bind(this) },
    { id: 'hotels', label: 'Hotels', icon: 'hotel', selected: false, method: this.tabHandler.bind(this) },
    { id: 'cars', label: 'Cars', icon: 'car', selected: false, method: this.tabHandler.bind(this) },
    { id: 'activities', label: 'Activities', icon: 'compass', selected: false, method: this.tabHandler.bind(this) }
  ]);
  ngOnInit() {
    this.currentLocation.set(this.router.url);
    this.selectedTab.set(this.activatedRoute.snapshot.firstChild?.url[0]?.path || 'flights');
    this.tabModifier(this.selectedTab() || '');
  }
  private tabModifier = (activeItem: string) => {
    this.servicesTabs.update((tabs) =>
      tabs.map(tab => ({ ...tab, selected: tab.id === activeItem }))
    );
  };
  public tabHandler(tabItem: TabDataTypes): void {
    this.tabModifier(tabItem.id || '');
    const selectedTab = this.servicesTabs().find(tab => tab.selected);
    if (selectedTab) {
      this.updateUrl(selectedTab);
    }
    this.sendSelectedTab.emit(tabItem.id || '');
  }
  private updateUrl(tabItem: TabDataTypes): void {
    const newPath = tabItem.id?.toLowerCase();
    this.location.replaceState(`/search/${newPath}`);
    window.history.replaceState({}, '', `/search/${newPath}`);
    // this.router.navigate([`/search/${newPath}`], {
    //   replaceUrl: true,
    //   skipLocationChange: true,
    //   state: { preserveState: false }
    // });
  }
}
