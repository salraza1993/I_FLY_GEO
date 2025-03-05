import { Directive, ElementRef, HostListener, inject, Renderer2 } from '@angular/core';
import { AddRemoveClassService } from './../services/add-remove-class.service';

@Directive({
  selector: '[responsiveClass]',
  providers: [AddRemoveClassService]
})
export class ResponsiveClassDirective {
  private AddRemoveClass = inject(AddRemoveClassService);
  private mobileMax = 767;
  private tabletMax = 1024;

  constructor(private element: ElementRef) {}

  ngOnInit() {
    this.updateClass(); // Set class on initialization
  }

  // Listen to window resize event to update class
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateClass();
  }

  private updateClass() {
    const width = window.innerWidth;

    // Remove all/old classes
    this.AddRemoveClass.removeClasses(this.element, ['mobile-view', 'tablet-view', 'desktop-view']);

    // Add class based on screen size
    if (width <= this.mobileMax) {
      this.AddRemoveClass.addClass(this.element, 'mobile-view');
    } else if (width > this.mobileMax && width <= this.tabletMax) {
      this.AddRemoveClass.addClass(this.element, 'tablet-view');
    } else {
      this.AddRemoveClass.addClass(this.element, 'desktop-view');
    }
  }

}
