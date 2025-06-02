import { ElementRef, Injectable, Renderer2 } from '@angular/core';

@Injectable()
export class AddRemoveClassService {
  constructor(private renderer: Renderer2) { }
  // adding single class
  public addClass(elementRef: ElementRef, className: string) {
    this.renderer.addClass(elementRef.nativeElement, className);
  }

  // adding multiple classes
  public addClasses(elementRef: ElementRef, addAbleClasses: string[]) {
    addAbleClasses.forEach((className) => {
      this.addClass(elementRef, className);
    });
  }

  //  removing Single Class
  public removeClass(elementRef: ElementRef, className: string) {
    this.renderer.removeClass(elementRef.nativeElement, className);
  }
  //  removing multiple classes
  public removeClasses(elementRef: ElementRef, removeAbleClasses: string[]) {
    removeAbleClasses.forEach((className) => {
      this.removeClass(elementRef, className);
    });
  }
}
