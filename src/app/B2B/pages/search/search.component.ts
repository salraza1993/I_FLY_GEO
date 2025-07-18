import { Component, inject, signal } from '@angular/core';
import { COMMON_IMPORTS } from '@sharedHelpers/common-imports';
import { TabDataTypes } from '@sharedComponents/custom-tabs/custom-tabs.component';
import { SearchServicesTabsComponent } from './_components/search-services-tabs/search-services-tabs.component';
import { SearchContentContainerComponent } from './_components/search-content-container/search-content-container.component';
import { ActivatedRoute } from '@angular/router';
import { SearchViewAdsComponent } from './_components/search-view-ads/search-view-ads.component';

@Component({
  selector: 'search',
  imports: [COMMON_IMPORTS, SearchServicesTabsComponent, SearchContentContainerComponent, SearchViewAdsComponent ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  host: {
    'class': 'search-page-wrapper'
  }
})
export class SearchComponent {
  private activatedRoute = inject(ActivatedRoute);
  public readonly getActiveTab = signal<string>('flights');

  ngOnInit() {
    this.getActiveTab.set(this.activatedRoute.snapshot.firstChild?.url[0]?.path || '');
  }
  public getCurrentTabHandler = (event: string):void => {
    this.getActiveTab.set(event);
  };

}
