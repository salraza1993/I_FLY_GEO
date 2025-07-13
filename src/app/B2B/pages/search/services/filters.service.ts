import { computed, Injectable, signal } from '@angular/core';

// @Injectable({
//   // providedIn: 'root'
// })
export class FiltersService {
  private stickyState = signal<boolean>(false);
  constructor() {
    console.log('FilterService')
  }
  public isSticky = computed<boolean>(this.stickyState);
  public setSticky = (event: boolean) => {
    this.stickyState.set(event);
  }

}
