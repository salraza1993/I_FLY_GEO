import { BodyClassModifierService } from '../../shared/services/body-modifier.service';
import { HostListener, Injectable, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';


@Injectable({
  providedIn: 'root',
})
export class ViewportService {
  private BodyClassModifier = inject(BodyClassModifierService);
  private document = inject(DOCUMENT);
  private rootBodyElement: HTMLElement = this.document.body;

  private mobileMax = 767;
  private tabletMax = 1024;

  isMobile = signal<boolean>(window.innerWidth <= this.mobileMax);
  isTablet = signal<boolean>(window.innerWidth > this.mobileMax && window.innerWidth <= this.tabletMax);
  isDesktop = signal<boolean>(window.innerWidth > this.tabletMax);

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
    this.BodyClassModifier.removeBodyClass(['mobile-view', 'tablet-view', 'desktop-view']);
    this.removeAttribute('data-viewport');
    if (width <= this.mobileMax) {
      this.BodyClassModifier.addClassToBody('mobile-view');
      this.addAttribute('data-viewport', 'mobile-view');
    } else if (width > this.mobileMax && width <= this.tabletMax) {
      this.BodyClassModifier.addClassToBody('tablet-view');
      this.addAttribute('data-viewport', 'tablet-view');
    } else {
      this.BodyClassModifier.addClassToBody('desktop-view');
      this.addAttribute('data-viewport', 'desktop-view');
    }
  }
}
