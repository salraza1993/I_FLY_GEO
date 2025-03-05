import { BodyClassModifierService } from './body-modifier.service';
import { HostListener, Injectable, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ViewportService {
  private BodyClassModifierService = inject(BodyClassModifierService);
  private document = inject(DOCUMENT);

  private mobileMax = 767;
  private tabletMax = 1024;

  isMobile = signal(window.innerWidth <= this.mobileMax);
  isTablet = signal(window.innerWidth > this.mobileMax && window.innerWidth <= this.tabletMax);
  isDesktop = signal(window.innerWidth > this.tabletMax);

  constructor() {
    this.updateBodyClass();
    window.addEventListener('resize', this.onResize.bind(this));
  }
  @HostListener('window:resize', [])
  private onResize() {
    this.updateBodyClass();
  }

  public updateBodyClass() {
    const body = this.document.body;
    const width = window.innerWidth;
    this.BodyClassModifierService.removeBodyClasses(['mobile-view', 'tablet-view', 'desktop-view']);

    if (width <= this.mobileMax) {
      this.BodyClassModifierService.addClassToBody('mobile-view');
    } else if (width > this.mobileMax && width <= this.tabletMax) {
      this.BodyClassModifierService.addClassToBody('tablet-view');
    } else {
      this.BodyClassModifierService.addClassToBody('desktop-view');
    }
  }
}
