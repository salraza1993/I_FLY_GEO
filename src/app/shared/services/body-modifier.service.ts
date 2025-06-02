import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BodyClassModifierService {
  private renderer: Renderer2;
  rootBody?: HTMLElement;
  private currentClass:string = '';
  constructor(
    @Inject(DOCUMENT) private document: Document,
    rendererFactory: RendererFactory2,
    private router: Router
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.rootBody = this.document.body;
  }
  public initializeRouteBasedClass() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateBodyClass();
      });
  }
  public addClassToBody(className: string) {
    this.renderer.addClass(this.rootBody, className);
  }
  public removeBodyClasses(removeAbleClasses: string[]): void {
    removeAbleClasses.forEach(className => {
      this.removeBodyClass(className);
    });
  }
  public removeBodyClass(className: string): void {
    this.renderer.removeClass(this.rootBody, className);
  }
  private updateBodyClass() {
    // Remove current class
    if (this.currentClass) {
      // this.renderer.removeClass(document.body, this.currentClass);
      this.removeBodyClass(this.currentClass);
    }

    // Get the new class based on route
    const routePath = this.router.url.split('?')[0].split('/')[1];
    this.currentClass = routePath ? `${routePath}-page` : 'home-page';

    // Add new class
    // this.renderer.addClass(document.body, this.currentClass);
    this.addClassToBody(this.currentClass);
  }
}
