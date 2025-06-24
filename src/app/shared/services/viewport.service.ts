import { BodyClassModifierService } from '../../shared/services/body-modifier.service';
import { HostListener, Injectable, inject, signal, DOCUMENT } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class ViewportService {
  private BodyClassModifierService = inject(BodyClassModifierService);
  private document = inject(DOCUMENT);
  private rootBodyElement: HTMLElement = this.document.body;

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
  private addAttribute(attributeName: string, attributeValue: string):void {
    this.rootBodyElement.setAttribute(attributeName, attributeValue)
  }
  private removeAttribute(attributeName: string):void {
    this.rootBodyElement.removeAttribute(attributeName)
  }

  public updateBodyClass() {
    const width = window.innerWidth;
    this.BodyClassModifierService.removeBodyClasses(['mobile-view', 'tablet-view', 'desktop-view']);
    this.removeAttribute('data-viewport');
    if (width <= this.mobileMax) {
      this.BodyClassModifierService.addClassToBody('mobile-view');
      this.addAttribute('data-viewport', 'mobile-view');
    } else if (width > this.mobileMax && width <= this.tabletMax) {
      this.BodyClassModifierService.addClassToBody('tablet-view');
      this.addAttribute('data-viewport', 'tablet-view');
    } else {
      this.BodyClassModifierService.addClassToBody('desktop-view');
      this.addAttribute('data-viewport', 'desktop-view');
    }
  }
}
