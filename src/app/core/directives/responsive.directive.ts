import { Directive, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { ViewportService } from '../services/viewport.service';
import { effect, inject } from '@angular/core';

@Directive({
  selector: '[responsive]'
})
export class ResponsiveDirective implements OnInit {
  private viewportService = inject(ViewportService); // Correctly inject ViewportService
  private hasView = false;

  @Input('responsive') condition: 'mobile' | 'tablet' | 'desktop' = 'desktop'; // Default condition

  ngOnInit() {
    // Ensure effect is triggered in a valid injection context
    this.setupEffect();
  }

  private setupEffect() {
    // Use effect in a valid injection context
    effect(() => {
      let shouldShow = false;

      // Check viewport condition and update accordingly
      if (this.condition === 'mobile') shouldShow = this.viewportService.isMobile();
      if (this.condition === 'tablet') shouldShow = this.viewportService.isTablet();
      if (this.condition === 'desktop') shouldShow = this.viewportService.isDesktop();

      // Add the component view if condition is true
      if (shouldShow && !this.hasView) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.hasView = true;
      } else if (!shouldShow && this.hasView) {
        // Remove the view if the condition doesn't match
        this.viewContainer.clear();
        this.hasView = false;
      }
    });
  }

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) { }
}
