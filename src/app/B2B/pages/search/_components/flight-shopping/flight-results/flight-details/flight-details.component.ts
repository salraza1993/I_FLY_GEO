import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { FlightDetailsJourneysComponent } from "./flight-details-journeys/flight-details-journeys.component";
import { DetailsPriceComponent } from "./details-price/details-price.component";
import { NgModalService } from '@/shared/services/ng-modal.service';

interface TabTypes {
  label: string,
  id: string,
  selected: boolean,
}

@Component({
  selector: 'app-flight-details, flight-details',
  imports: [CommonModule, FlightDetailsJourneysComponent, DetailsPriceComponent],
  templateUrl: './flight-details.component.html',
  styleUrl: './flight-details.component.css',
  host: {
    'class': 'flight-details-wrapper flight-details',
    '[attr.data-product-id]': 'productId()',
  }
})
export class FlightDetailsComponent {
  private readonly modalService = inject(NgModalService);
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
  onClose():void {
    this.modalService.close('flight-details-modal');
  }
}
