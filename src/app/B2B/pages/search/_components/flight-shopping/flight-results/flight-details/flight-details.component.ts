import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { FlightDetailsJourneysComponent } from "./flight-details-journeys/flight-details-journeys.component";
import { DetailsPriceComponent } from "./details-price/details-price.component";
import { NgModalService } from '@/shared/services/ng-modal.service';
import { FlightJourney, FlightResultCard, FlightServices, PricingDetails } from '@/B2B/pages/search/models/FlightResultCardInterface.interface';
import { SearchCriteriaService } from '@shared/services/search-criteria.service';
import { ActivatedRoute } from '@angular/router';
import { SearchCriteriaDataType } from '@/shared/models/SearchCriteria.interface';
import { TextTransformPipe } from '@/core/pipes/text-transform.pipe';

interface TabTypes {
  label: string,
  id: string,
  selected: boolean,
}

@Component({
  selector: 'app-flight-details, flight-details',
  imports: [CommonModule, FlightDetailsJourneysComponent, DetailsPriceComponent, TextTransformPipe],
  templateUrl: './flight-details.component.html',
  styleUrl: './flight-details.component.css',
  host: {
    'class': 'flight-details-wrapper flight-details',
    '[attr.data-product-id]': 'productId()',
  }
})
export class FlightDetailsComponent {
  private readonly modalService = inject(NgModalService);
  private readonly searchCriteriaService = inject(SearchCriteriaService);
  private readonly activatedRoute = inject(ActivatedRoute);
  protected searchCriteria = signal<SearchCriteriaDataType | null>(null);

  productId = input<string>();

  detailsData = input<FlightResultCard | null>();
  constructor() {
    const sessionId = this.activatedRoute.snapshot.queryParamMap.get('session');
    this.searchCriteria.set(this.searchCriteriaService.getSearchCriteria(sessionId));
  }

  protected readonly pricing = computed<PricingDetails>(() => this.detailsData()?.pricing!);
  protected readonly services = computed<FlightServices>(() => this.detailsData()?.services!);
  protected readonly journeys = computed<FlightJourney[]>(() => this.detailsData()?.journeys!);

  protected tabs = signal<TabTypes[]>([
    { id: 'itineraryDetails', label: 'Itinerary Details', selected: true, },
    { id: 'fareDetails', label: 'Fare Details', selected: false },
  ]);
  protected activeStrip = computed(() => this.tabs().findIndex(tab => tab.selected) || '0');

  protected tabHandler(tabId: string) {
    this.tabs.update((tabs: TabTypes[]) =>
      tabs.map(tab => ({ ...tab, selected: tab.id === tabId }))
    )
  }
  protected onClose():void {
    this.modalService.close('flight-details-modal');
  }


  get tripType(): string {
    const data = this.searchCriteria();
    return data?.tripType?.toLocaleLowerCase() || '';
  }
  get isFamily(): boolean {
    const data = this.searchCriteria();
    return ((data?.passengers?.children ?? 0) > 0 || (data?.passengers?.infants ?? 0) > 0);
  }
}
