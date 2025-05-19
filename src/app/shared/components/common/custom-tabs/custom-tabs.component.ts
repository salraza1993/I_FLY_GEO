import { AfterViewInit, Component, effect, ElementRef, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../../core/services/language.service';

@Component({
  selector: 'custom-tabs',
  imports: [CommonModule],
  templateUrl: './custom-tabs.component.html',
  styleUrl: './custom-tabs.component.css',
  host: {
    'class': 'custom-tabs'
  }
})
export class CustomTabsComponent implements AfterViewInit {
  private _languageService = inject(LanguageService);
  layoutDirection: "ltr" | "rtl" = this._languageService.getLayoutDirection;
  constructor(private elRef: ElementRef) {
    effect(() => {
      this.setTabs();
      this.updateActiveStrip();
      
    });
  }
  private tabsPlaceholder = [
    {
      label: "Tab One",
      id: "tab-one",
      selected: true,
      path: "/tab-one",
      // class: 'tab-one',
    },
    {
      label: "Tab Two",
      id: "tab-two",
      selected: false,
      path: "/tab-two",
      // class: 'tab-two',
    },
    {
      label: "Tab Three",
      id: "tab-three",
      selected: false,
      path: "/tab-three",
      // class: 'tab-three',
    },
  ];
  readonly setTabs = input<any>(this.tabsPlaceholder);
  readonly tabsContainerClass = input<string>('');
  readonly tabsItemClass = input<string>('');
  public activeStripStyles = signal({
    '--tab-active-item-offset-x': '5px',
    '--tab-active-item-width': '60px',
  })

  private updateActiveStrip(): void {
    setTimeout(() => {  // Delay execution to allow class update
      const parent = this.elRef.nativeElement.querySelector('.custom-tabs');
      const tabs = this.elRef.nativeElement.querySelectorAll('.custom-tabs__item');

      if (!parent || !tabs.length) return;

      const activeTab = Array.from(tabs).find((tab: any) => tab.classList.contains('active')) as HTMLElement;

      if (activeTab) {
        const textWidth = activeTab.scrollWidth;
        const offsetX = activeTab.offsetLeft - parent.offsetLeft;
        this.activeStripStyles.set({
          '--tab-active-item-offset-x': `${offsetX}px`,
          '--tab-active-item-width': `${textWidth}px`,
        });
      }

      // Update each tab's width and offset
      tabs.forEach((tab: HTMLElement) => {
        const textWidth = tab.scrollWidth;
        const offsetX = tab.offsetLeft - parent.offsetLeft;

        tab.style.setProperty('--tab-item-width', `${textWidth}px`);
        tab.style.setProperty('--tab-item-offset-x', `${offsetX}px`);
      });
    }, 0);  // Runs on the next microtask to ensure DOM updates are applied
  }

  ngAfterViewInit(): void {
    this.updateActiveStrip(); // Set the initial position
  }
}
