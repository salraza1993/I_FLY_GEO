import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FilterDropdownComponent } from "../filter-dropdown/filter-dropdown.component";
import { animate, style, transition, trigger } from '@angular/animations';
import { ToggleSwitchComponent } from '@/shared/components/elements/toggle-switch/toggle-switch.component';

type TimingTabType = { id: string, label:string | undefined, selected: boolean };
type TimingListType = { id: string, label: string, selected: boolean, duration: string };

@Component({
  selector: 'app-timing, timing',
  imports: [CommonModule, FilterDropdownComponent, ToggleSwitchComponent],
  templateUrl: './timing.component.html',
  styleUrls: ['./timing.component.css', '../filter-components-style.css'],
  host: {
    'class': 'timing-wrapper'
  },
  animations: [
    trigger('SlideInLeft', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('500ms ease-in-out', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        animate('250ms ease-in-out', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
    trigger('SlideInRight', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('500ms ease-in-out', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        animate('250ms ease-in-out', style({ transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
})
export class TimingComponent {
  timingTabs = signal<TimingTabType[]>([
    { id: 'departure', label: 'DXB - DEL', selected: true },
    { id: 'return', label: 'DEL - DXB', selected: false }
  ])
  readonly selectedTab = computed<string | undefined>(() => {
    const selected = this.timingTabs().find(tab => tab.selected);
    return selected?.id
  });
  tripType: string = 'roundtrip';

  departureTimingList = signal<TimingListType[]>([
    { id: "earlyMorning", label: "Early Morning", selected: false, duration: "12 am - 08 am" },
    { id: "morning", label: "Morning", selected: false, duration: "08 am - 12 pm" },
    { id: "afternoon", label: "Afternoon", selected: false, duration: "12 pm - 04 pm" },
    { id: "evening", label: "Evening", selected: false, duration: "04 pm - 08 pm" },
    { id: "night", label: "Night", selected: false, duration: "08 pm - 12 am" },
  ]);
  returnTimingList = signal<TimingListType[]>([
    { id: "earlyMorning", label: "Early Morning", selected: false, duration: "12 am - 08 am" },
    { id: "morning", label: "Morning", selected: false, duration: "08 am - 12 pm" },
    { id: "afternoon", label: "Afternoon", selected: false, duration: "12 pm - 04 pm" },
    { id: "evening", label: "Evening", selected: false, duration: "04 pm - 08 pm" },
    { id: "night", label: "Night", selected: false, duration: "08 pm - 12 am" },
  ]);

  checkValue() {
    // console.log('clicked:', this.departureTimingList());
  }

  public tabHandler(tab: TimingTabType): void {
    this.timingTabs.update((oldTab) => oldTab.map(item => ({...item, selected: item.id === tab.id})))
  }
}
