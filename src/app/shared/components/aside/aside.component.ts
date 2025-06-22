import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnInit,
  QueryList,
  ViewChildren,
  effect,
  inject,
  signal
} from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LanguageService } from '../../services/language.service';
import { COMMON_IMPORTS } from '../../helpers/common-imports';

type MenuDataType = {
  title: string;
  icon: string;
  path: string;
  class?: string
};

@Component({
  selector: 'aside-bar',
  standalone: true,
  imports: [RouterModule, COMMON_IMPORTS],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent implements AfterViewInit {
  private _languageService = inject(LanguageService);
  layoutDirection: 'ltr' | 'rtl' = this._languageService.getLayoutDirection;

  public isElementHover = signal<boolean>(false);
  public activeStripStyles = signal({ '--menu-strip-offset-y': '0px' });
  public hoveredStripStyles = signal({ '--menu-strip-offset-y': '0px' });

  asideMenus = signal<MenuDataType[]>([
    { title: 'Dashboard', icon: 'grid', path: '/dashboard' },
    { title: 'Search', icon: 'magnifying-glass', path: '/search/flights' },
    { title: 'Bookings', icon: 'calendar', path: '/bookings' },
    { title: 'Reports', icon: 'chart-pie', path: '/reports' },
    { title: 'Reports', icon: 'user-gear', path: '/settings', class: 'setting-menu' },
  ]);

  @ViewChildren('menuItem', { read: ElementRef }) menuItems!: QueryList<ElementRef>;

  constructor(
    private elRef: ElementRef,
    private router: Router,
    private zone: NgZone
  ) {
    effect(() => {
      this.updateActiveStrip();
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.zone.runOutsideAngular(() => {
        setTimeout(() => this.updateActiveStrip(), 0);
      });
    });
  }


  ngAfterViewInit(): void {
    setTimeout(() => this.updateActiveStrip(), 0);
  }

  public updateActiveStrip(): void {
    if (!this.menuItems) return;

    const activeTab = this.menuItems.find(el =>
      el.nativeElement.classList.contains('active')
    )?.nativeElement as HTMLElement;

    if (activeTab) {
      const offsetY = activeTab.offsetTop;
      this.activeStripStyles.set({ '--menu-strip-offset-y': `${offsetY}px` });
    }

    // Optional: update each tab's custom offset
    this.menuItems.forEach((tabRef: ElementRef) => {
      const tab = tabRef.nativeElement as HTMLElement;
      tab.style.setProperty('--tab-item-offset-y', `${tab.offsetTop}px`);
    });
  }
  public onTabHover(event: MouseEvent): void {
    this.isElementHover.set(true);
    const hoveredTab = event.currentTarget as HTMLElement;
    const parent = this.elRef.nativeElement.querySelector('.aside-menu');
    if (!hoveredTab || !parent) return;
    const offsetY = hoveredTab.offsetTop;
    this.hoveredStripStyles.set({'--menu-strip-offset-y': `${offsetY}px`,});
  }
  public onTabUnHover(event: MouseEvent): void {
    this.isElementHover.set(false);
  }
}
