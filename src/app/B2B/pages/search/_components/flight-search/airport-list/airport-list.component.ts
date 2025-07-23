import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  effect,
  HostListener,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { fadeIn } from '@/shared/animations/fade.animations';
import { AirportDataType, AirportListService } from '../../../services/airport-list.service';

@Component({
  selector: 'app-airport-list, airport-list',
  imports: [CommonModule],
  templateUrl: './airport-list.component.html',
  styleUrl: './airport-list.component.css',
  animations: [fadeIn],
  providers: [AirportListService],
  host: {
    class: 'aiport-list-wrapper',
  },
})
export class AirportListComponent {
  private airportListService = inject(AirportListService);
  protected allAirport = computed<AirportDataType[]>(() => this.airportListService.allAirport());
  protected filteredAirport = computed<AirportDataType[]>(() => this.airportListService.filteredAirport());
  protected focusedIndex = signal<number>(-1);

  elementType = input<string>('origin');
  onSelected = output<AirportDataType | null | any>()

  // Two-way binded
  searchValue = model<string | null | undefined>('');
  selectedAirport = model<AirportDataType | null>(null);

  protected updateSearchValue = effect(() => {
    this.airportListService.updateSearch(this.searchValue() || '');
  });

  private hasValidMatch = computed(() => {
    const searchValue = this.searchValue();
    if (!searchValue || searchValue.length < 3) return false;

    const inputValue = searchValue.toLowerCase().replace(/[(),]/g, '').split(' ');
    const hasValidMatch = this.allAirport().some(airport =>
      inputValue.includes(airport.IATA.toLowerCase()) ||
      inputValue.includes(airport.City.toLowerCase()) ||
      inputValue.includes(airport.AirportName.toLowerCase())
    );
    return hasValidMatch;
  })

  protected showError = computed(() => !this.hasValidMatch());

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
      if(
        item.IATA.toLowerCase() === this.searchValue()?.toLowerCase().trim() ||
        item.City.toLowerCase() === this.searchValue()?.toLowerCase().trim()
      ) {
        this.selectedAirport.set(item);
        const displayText = `${item.City} (${item.IATA}), ${item.AirportName}`;
        this.searchValue.set(displayText);
        this.focusedIndex.set(-1);
        this.onSelected.emit(this.selectedAirport());
        return
      }
    })
    if (focused) {
      this.selectedAirport.set(focused);
      const displayText = `${focused.City} (${focused.IATA}), ${focused.AirportName}`;
      this.searchValue.set(displayText);
      this.focusedIndex.set(-1);
      this.onSelected.emit(this.selectedAirport());
    }
  }

  public onSelect(selectedItem: AirportDataType):void {
    const foundItem = this.allAirport().findIndex(item => item.IATA === selectedItem.IATA)
    this.selectedAirport.set(this.allAirport()[foundItem]);
    const displayText = `${this.allAirport()[foundItem].City} (${this.allAirport()[foundItem].IATA}), ${this.allAirport()[foundItem].AirportName}`;
    this.searchValue.set(displayText);
    this.focusedIndex.set(-1);
    this.onSelected.emit(this.selectedAirport());
  }
}
