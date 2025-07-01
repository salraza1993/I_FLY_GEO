import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  effect,
  HostListener,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import {
  AirportDataType,
  AirportListService,
} from '../../services/airport-list.service';
import { HttpClient } from '@angular/common/http';
import { fadeIn } from '@/shared/animations/fade.animations';

@Component({
  selector: 'app-airport-list, airport-list',
  imports: [CommonModule],
  templateUrl: './airport-list.component.html',
  styleUrl: './airport-list.component.css',
  animations: [fadeIn],
  host: {
    class: 'aiport-list-wrapper',
  },
})
export class AirportListComponent {
  private readonly AIRPORT_LIST_JSON_URL = 'assets/static-json/airports.json';
  private http = inject(HttpClient);
  public allAirport = signal<AirportDataType[]>([]);
  private isLoaded = signal<boolean>(false);
  public focusedIndex = signal<number>(-1);
  public selectedAirport = model<AirportDataType | null>(null);
  public showError = signal(false);

  public elementType = input<string>('origin');
  public searchValue = model<string | null | undefined>('');
  public onSelected = input<() => void>()
  constructor() {
    effect(() => {
      const query = this.searchValue() || '';
      this.evaluateError(query);
    });
  }

  // keyboard based selection
  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    const results = this.filteredAirport();
    if (!results.length) return;
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.focusedIndex.update((i) => (i + 1) % results.length);
        break;

      case 'ArrowUp':
        event.preventDefault();
        this.focusedIndex.update(
          (i) => (i - 1 + results.length) % results.length
        );
        break;

      case 'Enter':
      case 'Tab': {
        this.onTabOrEnterPressed(results)
        break;
      }
    }
  }

  private onTabOrEnterPressed(results: AirportDataType[]) {
    const focused = results[this.focusedIndex()];
    this.allAirport().forEach(item => {
      if(item.airportCode.toLowerCase() === this.searchValue()?.toLowerCase().trim()) {
        console.log(item)
        this.selectedAirport.set(item);
        const displayText = `${item.airportCity} (${item.airportCode}), ${item.airportName}`;
        this.searchValue.set(displayText);
        this.focusedIndex.set(-1);
        return
      }
    })
    if (focused) {
      this.selectedAirport.set(focused);
      const displayText = `${focused.airportCity} (${focused.airportCode}), ${focused.airportName}`;
      this.searchValue.set(displayText);
      this.focusedIndex.set(-1);
    }
  }

  ngOnInit() {
    this.http
      .get<AirportDataType[]>(this.AIRPORT_LIST_JSON_URL)
      .subscribe((data) => {
        this.allAirport.set(data);
      });
  }

  public filteredAirport = computed(() => {
    const query = (this.searchValue() || '').toLowerCase().trim();
    if (query.length < 3) return [];

    return this.allAirport().filter((airport) =>
      JSON.stringify(airport).toLowerCase().includes(query)
      // airport.airportCode.toLowerCase() === query ||
      // airport.airportCity.toLowerCase() === query ||
      // airport.airportName.toLowerCase() === query
    );
  })
  public onSelect(selectedItem: AirportDataType):void {
    const foundItem = this.allAirport().findIndex(item => item.airportCode === selectedItem.airportCode)
    this.selectedAirport.set(this.allAirport()[foundItem]);
    const displayText = `${this.allAirport()[foundItem].airportCity} (${this.allAirport()[foundItem].airportCode}), ${this.allAirport()[foundItem].airportName}`;
    this.searchValue.set(displayText);
    this.focusedIndex.set(-1);
    this.onSelected();
  }

  private evaluateError(query: string) {
    const hasMatch = this.allAirport().filter((airport) =>
      JSON.stringify(airport).toLowerCase().includes(query)
    );
    const shouldShow = query.length >= 3 && !hasMatch;
    this.showError.set(shouldShow);
  }
}
