import { CommonModule } from '@angular/common';
import { Component, computed, input, signal } from '@angular/core';
import { FlightDetailsJourneysComponent } from "./flight-details-journeys/flight-details-journeys.component";

interface TabTypes {
  label: string,
  id: string,
  selected: boolean,
}

@Component({
  selector: 'app-flight-details, flight-details',
  imports: [CommonModule, FlightDetailsJourneysComponent],
  templateUrl: './flight-details.component.html',
  styleUrl: './flight-details.component.css',
  host: {
    'class': 'flight-details-wrapper flight-details',
    '[attr.data-product-id]': 'productId()',
  }
})
export class FlightDetailsComponent {
  productId = input<string>();
  detailsData = input<string>();

  protected tabs = signal<TabTypes[]>([
    { id: 'itineraryDetails', label: 'Itinerary Details', selected: true, },
    { id: 'fareDetails', label: 'Fare Details', selected: false },
  ]);
  protected activeStrip = computed(() => this.tabs().findIndex(tab => tab.selected) || '0');

  public tabHandler(tabId: string) {
    this.tabs.update((tabs: TabTypes[]) =>
      tabs.map(tab => ({ ...tab, selected: tab.id === tabId }))
    )
  }
}
