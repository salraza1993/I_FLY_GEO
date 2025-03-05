import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BodyClassModifierService {
  private renderer: Renderer2;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }
  public addClassToBody(className: string) {
    const rootBody = this.document.body;
    this.renderer.addClass(rootBody, className);
  }
  public removeBodyClasses(removeAbleClasses: string[]): void {
    removeAbleClasses.forEach(className => {
      this.removeBodyClass(className);
    });
  }
  public removeBodyClass(className: string): void {
    const rootBody = this.document.body;
    this.renderer.removeClass(rootBody, className);
  }
}
