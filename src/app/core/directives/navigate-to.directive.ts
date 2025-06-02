import { Directive, HostListener, inject, input } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Directive({
  selector: '[navigateTo]'
})
export class NavigateToDirective {
  private router = inject(Router);
  navigateTo = input.required<string | string[]>({ alias: 'navigateTo' });
  navigationExtras = input<NavigationExtras>(undefined, { alias: 'navigationExtras' });

  @HostListener('click')
  onClick(): void {
    const target = this.navigateTo();
    const commands = typeof target === 'string' ? [target] : target;
    
    this.router.navigate(commands, this.navigationExtras())
      .catch(error => console.error('Navigation failed:', error));
  }
}

// Example 
// <button navigateTo="/home">Home</button>
// <button[navigateTo]="['/product', productId]">Product</button>
// <button navigateTo="/about" [navigationExtras]="{queryParams: {section: 'team'}}">About Team</button>