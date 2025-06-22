import { Component, inject, signal } from '@angular/core';
import { COMMON_IMPORTS } from '@sharedHelpers/common-imports';
import { TabDataTypes } from '@sharedComponents/custom-tabs/custom-tabs.component';
import { SearchServicesTabsComponent } from './_components/search-services-tabs/search-services-tabs.component';
import { SearchContentContainerComponent } from './_components/search-content-container/search-content-container.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'search',
  imports: [COMMON_IMPORTS, SearchServicesTabsComponent, SearchContentContainerComponent ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css', './styles/search-common-styles.css'],
  host: {
    'class': 'search-page-wrapper'
  }
})
export class SearchComponent {
  private activatedRoute = inject(ActivatedRoute);
  public readonly getActiveTab = signal<string>('flights');

  ngOnInit() {
    this.getActiveTab.set(this.activatedRoute.snapshot.firstChild?.url[0]?.path || '');
    console.log('Current Tab:', this.getActiveTab());
  }
  public getCurrentTabHandler = (event: string):void => {
    this.getActiveTab.set(event);
  };

}
