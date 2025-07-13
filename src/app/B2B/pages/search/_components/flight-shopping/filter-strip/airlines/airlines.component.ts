import { AfterViewInit, Component, computed, effect, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FilterDropdownComponent, DropdownSelectedValueType } from "../filter-dropdown/filter-dropdown.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

type AirlineType = {
  id: string;
  name: string;
  selected: boolean;
};
@Component({
  selector: 'app-airlines, airlines',
  imports: [CommonModule, FormsModule, FilterDropdownComponent],
  templateUrl: './airlines.component.html',
  styleUrls: ['./airlines.component.css', '../filter-components-style.css'],
  host: {
    'class': 'airlines-wrapper'
  }
})
export class AirlinesComponent {
  @ViewChild('airlineSelectInputElement') airlineSelectInputElement!: ElementRef<HTMLInputElement>;
  private readonly AIRLINES_JSON_PATH = 'assets/static-json/airlines.json';
  http = inject(HttpClient);

  searchInput = signal<string | undefined>('');
  private airlines = signal<AirlineType[]>([]);

  // two-way binded
  showDropdown = signal<boolean>(false);
  selected = signal<DropdownSelectedValueType>(undefined);

  private readonly selectedAirlines = computed<AirlineType[]>(() => {
    return this.airlines().filter(airline => airline.selected)
  })

  readonly filteredAirlins = computed<AirlineType[]>(() => {
    const query = (this.searchInput() || '').toLowerCase().trim();
    if (query.length < 3) return this.airlines();
    return this.airlines()?.filter(airport => airport.name.toLowerCase().includes(query));
  });

  private readonly resetInputValue = effect(() => {
    if (!this.showDropdown()) this.searchInput.set('');
  });

  // adding selected airpoprts
  private setSelectedValue = () => {
    const totalSelected = this.selectedAirlines();
    if(totalSelected.length < 0) this.selected.set(undefined)
    if(totalSelected.length > 1) this.selected.set(`Airlines + ${totalSelected.length}`)
    else this.selected.set(totalSelected[0]?.name)
  };

  private readonly autoFocuseInput = effect(() => {
    if (this.showDropdown() && this.airlineSelectInputElement?.nativeElement) {
      queueMicrotask(() => this.airlineSelectInputElement.nativeElement.focus());
    }
  });

  ngOnInit():void {
    this.http.get<AirlineType[]>(this.AIRLINES_JSON_PATH)
    .subscribe(data => this.airlines.set(data))
  }

  private sortedData(): void {
    this.airlines()?.sort((a: AirlineType, b: AirlineType) => {
      if (a.selected && !b.selected) return -1;
      else if (!a.selected && b.selected) return 1;
      else return 0;
    });
  }

  public onSelect(targetItem: AirlineType) {
    this.sortedData();
    this.airlines.update((list) => list?.map(item =>
        item.id === targetItem.id
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
    const found = this.airlines()?.find(airline => airline.name.toLowerCase() === query);
    if (found) this.onSelect(found);
  }
}
