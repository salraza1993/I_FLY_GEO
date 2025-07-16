
import { DOCUMENT } from '@angular/common';
import { inject, Injectable, Renderer2, RendererFactory2, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BodyClassModifierService {
  private document = inject(DOCUMENT);
  private readonly rendererFactory = inject(RendererFactory2);
  private readonly router = inject(Router);

  private currentClass = signal<string>('');

  private readonly renderer: Renderer2 = this.rendererFactory.createRenderer(null, null);
  private readonly rootBody: HTMLElement = this.document.body;
  private readonly rootElement: HTMLElement = this.document.documentElement;

  public initializeRouteBasedClass() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateBodyClass();
      });
  }

  private addOrRemoveHandler(type: string, htmlElementRef: HTMLElement,  classes: string | string[]) {
    if(Array.isArray(classes)) {
      classes.forEach(element => {
        if(type === 'add') this.renderer.addClass(htmlElementRef, element);
        if(type === 'remove') this.renderer.removeClass(htmlElementRef, element);
      })
    } else {
      if(type === 'add') this.renderer.addClass(this.rootBody, classes);
      if(type === 'remove') this.renderer.removeClass(this.rootBody, classes);
    }
  }

  public addClassToRoot(classes: string | string[]) {
    this.addOrRemoveHandler('add',  this.rootElement, classes);
  }

  public removeClassToRoot(classes: string | string[]) {
    this.addOrRemoveHandler('remove',  this.rootElement, classes);
  }

  public addClassToBody(classes: string | string[]) {
    this.addOrRemoveHandler('add',  this.rootBody, classes);
  }

  public removeBodyClass(classes: string | string[]): void {
    this.addOrRemoveHandler('remove', this.rootBody, classes);
  }

  private updateBodyClass() {
    // Remove current class
    if (this.currentClass()) {
      this.removeBodyClass(this.currentClass());
    }

    // Get the new class based on route
    const routePath = this.router.url.split('?')[0].split('/')[1];
    this.currentClass.set(routePath ? `${routePath}-page` : 'home-page');

    // Add new class
    this.addClassToBody(this.currentClass());
  }
}
