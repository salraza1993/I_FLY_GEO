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
  public allAirport = computed<AirportDataType[]>(() => this.airportListService.allAirport());
  public filteredAirport = computed<AirportDataType[]>(() => this.airportListService.filteredAirport());
  public focusedIndex = signal<number>(-1);
  public showError = signal(false);

  public elementType = input<string>('origin');
  public onSelected = output<AirportDataType | null | any>()
  public selectedAirport = model<AirportDataType | null>(null);
  public searchValue = model<string | null | undefined>('');

  private checkError = effect(() => {
    const query = this.searchValue() || '';
    this.evaluateError(query);
  });

  public updateSearchValue = effect(() => {
    this.airportListService.updateSearch(this.searchValue() || '');
  });


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

  private evaluateError(query: string) {
    const hasMatch = this.filteredAirport();
    const shouldShow = query.length >= 3 && !hasMatch.length;
    this.showError.set(shouldShow);
  }
}
