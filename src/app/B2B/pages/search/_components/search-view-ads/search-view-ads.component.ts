import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-search-view-ads, search-view-ads',
  imports: [],
  templateUrl: './search-view-ads.component.html',
  styleUrl: './search-view-ads.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host:{
    'class': 'earch-view-ads-wrapper'
  }
})
export class SearchViewAdsComponent {

}
