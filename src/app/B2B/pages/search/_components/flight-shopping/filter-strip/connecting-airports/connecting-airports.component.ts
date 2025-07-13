import { Component, computed, effect, ElementRef, inject, signal, ViewChild, } from '@angular/core';
import { DropdownSelectedValueType, FilterDropdownComponent } from '../filter-dropdown/filter-dropdown.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

type AiroprtType = {
  id: string;
  name: string;
  code: string;
  selected: boolean;
};

@Component({
  selector: 'app-connecting-airports, connecting-airports',
  imports: [CommonModule, FilterDropdownComponent, FormsModule],
  templateUrl: './connecting-airports.component.html',
  styleUrls: [
    './connecting-airports.component.css',
    '../filter-components-style.css',
  ],
  host: {
    class: 'connecting-airports-wrapper',
  },
})
export class ConnectingAirportsComponent {
  @ViewChild('connectingAirportInputElement') connectingAirportInputElement!: ElementRef<HTMLInputElement>;
  private readonly AIRLINES_JSON_PATH = 'assets/static-json/connecting-airports.json';
  http = inject(HttpClient);

  searchInput = signal<string | undefined>('');
  private airports = signal<AiroprtType[]>([]);

  // two-way binded
  showDropdown = signal<boolean>(false);
  selected = signal<DropdownSelectedValueType>(undefined);

  private readonly selectedAirports = computed<AiroprtType[]>(() => {
    return this.airports().filter(airport => airport.selected)
  })

  readonly filteredAirports = computed<AiroprtType[]>(() => {
    const query = (this.searchInput() || '').toLowerCase().trim();
    if (query.length < 3) return this.airports();
    return this.airports().filter(
      airport =>
        airport.name.toLowerCase().includes(query) ||
        airport.code.toLowerCase().includes(query)
    );
  });

  // reseting searchInput if dropdown hidden
  private readonly resetInputValue = effect(() => {
    if (this.showDropdown() && this.connectingAirportInputElement?.nativeElement) {
      queueMicrotask(() => this.connectingAirportInputElement.nativeElement.focus());
    }
    if (!this.showDropdown()) this.searchInput.set('');
  });

  // adding selected airpoprts
  private setSelectedValue = () => {
    const totalSelected = this.selectedAirports();
    if(totalSelected.length < 0) this.selected.set(undefined)
    if(totalSelected.length > 1) this.selected.set(`Airports + ${totalSelected.length}`)
    else this.selected.set(totalSelected[0]?.name)
  };


  // private readonly autoFocuseInput = effect(() => {  });
  private sortedData(): void {
    this.airports().sort((a: AiroprtType, b: AiroprtType) => {
      if (a.selected && !b.selected) return -1;
      else if (!a.selected && b.selected) return 1;
      else return 0;
    });
  }
  ngOnInit():void {
    this.http.get<AiroprtType[]>(this.AIRLINES_JSON_PATH)
    .subscribe(data => this.airports.set(data))
  }

  public onSelect(targetItem: AiroprtType): void {
    this.airports.update((list) =>
      list.map((item) => item.id === targetItem?.id
        ? { ...item, selected: !item.selected }
        : item
      )
    );
    this.sortedData();
    this.setSelectedValue();
    this.searchInput.set('');
  }

  public onInputEnterPressed():void {
    const query = (this.searchInput() || '').toLowerCase().trim();
    const found = this.airports().find(airport => airport.code.toLowerCase() === query || airport.name.toLowerCase() === query);
    if (found) this.onSelect(found);
  }

}
