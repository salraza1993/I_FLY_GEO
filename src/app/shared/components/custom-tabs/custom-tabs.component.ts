import { AfterViewInit, Component, effect, ElementRef, inject, input, signal, booleanAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

export type TabDataTypes = {
  label?: string,
  id?: string,
  icon?: string,
  selected?: boolean,
  path?: string,
  class?: string,
  method?: (tabItem: TabDataTypes) => void,
}
@Component({
  selector: 'custom-tabs, app-custom-tabs',
  imports: [CommonModule],
  templateUrl: './custom-tabs.component.html',
  styleUrl: './custom-tabs.component.css',
  host: {
    'class': 'custom-tabs-wrapper',
    'class.bordered-only': 'isOnlyBordered()'
  }
})
export class CustomTabsComponent implements AfterViewInit {
  private _languageService = inject(LanguageService);
  layoutDirection = signal<'ltr' | 'rtl'>(this._languageService.getLayoutDirection);
  constructor(private elRef: ElementRef) {
    effect(() => {
      this.setTabs();
      this.updateActiveStrip();
    });
  }
  private readonly tabsPlaceholder = [
    {
      label: "Tab One",
      id: "tab-one",
      icon: "fa-home",
      selected: true,
      path: "/tab-one",
    },
    {
      label: "Tab Two",
      id: "tab-two",
      selected: false,
      path: "/tab-two",
    },
    {
      label: "Tab Three",
      id: "tab-three",
      selected: false,
      path: "/tab-three",
    },
  ];
  readonly setTabs = input<any>(this.tabsPlaceholder);
  readonly tabsContainerClass = input<string>('');
  readonly tabsItemClass = input<string>('');
  
  public isOnlyBordered = input(false, { transform: booleanAttribute });
  public isElementHover = signal<boolean>(false)
  public activeStripStyles = signal({
    '--tab-active-item-offset-x': '5px',
    '--tab-active-item-width': '60px',
  })
  public hoveredStripStyles = signal({
    '--tab-active-item-offset-x': '5px',
    '--tab-active-item-width': '60px',
  })

  private updateActiveStrip(): void {
    setTimeout(() => { 
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

      tabs.forEach((tab: HTMLElement) => {
        const textWidth = tab.scrollWidth;
        const offsetX = tab.offsetLeft - parent.offsetLeft;

        tab.style.setProperty('--tab-item-width', `${textWidth}px`);
        tab.style.setProperty('--tab-item-offset-x', `${offsetX}px`);
      });
    }, 0);
  }

  ngAfterViewInit(): void {
    this.updateActiveStrip();
  }

  public onTabHover(event: MouseEvent): void {
    this.isElementHover.set(true);
    const hoveredTab = event.currentTarget as HTMLElement;
    const parent = this.elRef.nativeElement.querySelector('.custom-tabs');

    if (!hoveredTab || !parent) return;

    const textWidth = hoveredTab.scrollWidth;
    const offsetX = hoveredTab.offsetLeft - parent.offsetLeft;

    this.hoveredStripStyles.set({
      '--tab-active-item-offset-x': `${offsetX}px`,
      '--tab-active-item-width': `${textWidth}px`,
    });
  }
  public onTabUnHover(event: MouseEvent): void {
    this.isElementHover.set(false);
  }
}
