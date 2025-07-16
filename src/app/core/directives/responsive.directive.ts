import { Directive, Input, TemplateRef, ViewContainerRef, OnInit, signal, input } from '@angular/core';
import { effect, inject } from '@angular/core';
import { ViewportService } from '@shared/services/viewport.service';

@Directive({
  selector: '[responsive]'
})
export class ResponsiveDirective {
  private viewportService: any = inject(ViewportService); // Correctly inject ViewportService
  private hasView = false;
  private templateRef = inject<any>(TemplateRef);
  private viewContainer = inject(ViewContainerRef)

  condition = signal<'mobile' | 'tablet' | 'desktop'>('desktop');
  responsive = input();

  // Use effect in a valid injection context
  private readonly setupEffect = effect(() => {
    let shouldShow = false;
    // Check viewport condition and update accordingly
    if (this.condition() === 'mobile') shouldShow = this.viewportService.isMobile();
    if (this.condition() === 'tablet') shouldShow = this.viewportService.isTablet();
    if (this.condition() === 'desktop') shouldShow = this.viewportService.isDesktop();

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
