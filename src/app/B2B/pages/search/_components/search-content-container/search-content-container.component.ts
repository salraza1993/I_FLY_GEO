import { COMMON_IMPORTS } from '@/shared/helpers/common-imports';
import { Component, inject, input, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchFlightsComponent } from '../../search-flights/search-flights.component';
import { SearchActivitiesComponent } from '../../search-activities/search-activities.component';
import { SearchHotelsComponent } from '../../search-hotels/search-hotels.component';
import { SearchCarsComponent } from '../../search-cars/search-cars.component';

@Component({
  selector: 'app-search-content-container, search-content-container',
  imports: [COMMON_IMPORTS, SearchFlightsComponent, SearchHotelsComponent, SearchCarsComponent, SearchActivitiesComponent],
  templateUrl: './search-content-container.component.html',
  styleUrl: './search-content-container.component.css'
})
export class SearchContentContainerComponent {
  private activatedRoute = inject(ActivatedRoute);
  public currentTab = signal<string>(''); // Default tab
  public getCurrentTab = input<string>('');

  // ngOnInit() {
  //   this.currentTab.set(this.activatedRoute.snapshot.firstChild?.url[0]?.path || '');
  //   console.log('Current Tab:', this.currentTab());
  // }
}
