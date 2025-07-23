import { Component, input, effect, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightsLoaderIllustrationComponent } from './flights-loader-illustration/flights-loader-illustration.component';
import { FlightsLoaderAircraftComponent } from './flights-loader-aircraft/flights-loader-aircraft.component';
import { LoaderSegmentComponent } from "./loader-segment/loader-segment.component";
import { SearchCriteriaDataType } from '@/shared/models/SearchCriteria.interface';

@Component({
  selector: 'app-search-flight-loader, search-flight-loader',
  imports: [
    CommonModule,
    FlightsLoaderIllustrationComponent,
    FlightsLoaderAircraftComponent,
    LoaderSegmentComponent
],
  templateUrl: './search-flight-loader.component.html',
  styleUrl: './search-flight-loader.component.css',
  host: {
    class: 'search-flight-loader-wrapper',
  },
})
export class SearchFlightLoaderComponent {
  searchParams = input<SearchCriteriaDataType | null>(null);

  // Use computed to ensure we have valid data
  protected searchData = computed(() => {
    const params = this.searchParams();
    return params || null;
  });


  get familyIcon() {
    const data = this.searchData();
    return ((data?.passengers?.children ?? 0) > 0 || (data?.passengers?.infants ?? 0) > 0);
  }
  get tripType():string {
    const data = this.searchData();
    return data?.tripType?.toLocaleLowerCase() || '';
  }
}
