import { Directive, effect, ElementRef, HostListener, inject, input, Input, OnDestroy, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';

type DirectionTypes = 'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right' | 'left' | 'left-top' | 'left-bottom' | 'right' | 'right-top' | 'right-bottom';
type TooltipType = 'info' | 'warning' | 'error' | 'success' | 'danger' | 'primary' | 'accent' | 'secondary' | 'dark' | 'light' | 'auto';
type StylesTypes = string | null | number;

@Directive({
  selector: '[tooltip], [appTooltip]',
})
export class TooltipDirective implements OnDestroy {
  @Input('tooltip') tooltipContent: string | TemplateRef<any> | null = '';
  
  tooltipDirection = input<DirectionTypes>('bottom');
  tooltipType = input<TooltipType>('auto');
  tooltipDelay = input<number>(150);
  tooltipWidth = input<StylesTypes>(null);
  customClasess = input<string[] | string | null>(null);
  tooltipMaxWidth = input<StylesTypes>(null);
  tooltipMinWidth = input<StylesTypes>(null);
  
  private tooltip?: HTMLElement;
  private offset?: number = 0;
  private parentElement = inject(ElementRef);
  private renderer = inject(Renderer2);
  private viewContainer = inject(ViewContainerRef);
  private destroyListeners: (() => void)[] = [];
  
  private getTooltipClassMap(): string[] {
    return [
      'ng-tooltip--shown',
      `ng-tooltip--${this.tooltipType()}`,
      `ng-tooltip--${this.tooltipDirection()}`,
      `tooltip-position--${this.tooltipDirection()}`,
      'ng-tooltip-container'
    ];
  }

  constructor() {
    effect(() => () => this.cleanup());
  }
  
  ngOnDestroy(): void { this.cleanup(); }  

  @HostListener('mouseover') onMouseEnter() {
    if (!this.tooltip) {
      this.showTooltip();
      const timer = setTimeout(() => {
        this.renderer.addClass(this.parentElement.nativeElement, 'ng-tooltip-container');
      }, this.tooltipDelay());      
      this.destroyListeners.push(() => clearTimeout(timer));
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    const timer = setTimeout(() => { 
      const classes = this.getTooltipClassMap();
      this.removeClasses(this.parentElement.nativeElement, classes);
      this.hideTooltip();
    }, 0);
    
    this.destroyListeners.push(() => clearTimeout(timer));
  }

  private createTooltip(): void {
    if (this.tooltip) return;
    this.tooltip = this.renderer.createElement('div') as HTMLDivElement;
  
    // Base classes
    this.renderer.addClass(this.tooltip, 'ng-tooltip');
    this.renderer.addClass(this.parentElement.nativeElement, `tooptip-position--${this.tooltipDirection()}`);
    this.renderer.addClass(this.tooltip, `ng-tooltip--${this.tooltipDirection()}`);
    this.renderer.addClass(this.tooltip, `ng-tooltip--${this.tooltipType()}`);
    this.addonClasses(this.tooltip, this.customClasess());
    
    // Content handling
    if (typeof this.tooltipContent === 'string') {
      this.renderer.addClass(this.tooltip, 'ng-tooltip--string');
      this.renderer.setProperty(this.tooltip, 'textContent', this.tooltipContent);
    } else if (this.tooltipContent instanceof TemplateRef) {
      this.appendTemplateContent();
    }

    this.setTooltipDimensions();
    this.renderer.appendChild(this.parentElement.nativeElement, this.tooltip);
  }

  private appendTemplateContent(): void {
    if (!this.tooltip || !(this.tooltipContent instanceof TemplateRef)) return;

    this.viewContainer.clear();
    const embeddedView = this.viewContainer.createEmbeddedView(this.tooltipContent);

    const container = this.renderer.createElement('div');
    this.renderer.addClass(container, 'ng-tooltip--template');

    embeddedView.rootNodes.forEach((node: Node) => {
      this.renderer.appendChild(container, node);
    });

    this.renderer.appendChild(this.tooltip, container);
  }

  private showTooltip(): void {
    this.createTooltip();
    this.tooltip?.classList.add('ng-tooltip--shown');
  }

  private hideTooltip(): void {
    if (this.tooltip) {
      const classes = this.getTooltipClassMap();
      this.removeClasses(this.tooltip, classes);
      this.removeClasses(this.parentElement.nativeElement, classes);
      this.renderer.removeChild(this.parentElement.nativeElement, this.tooltip);
      this.tooltip = undefined;
        setTimeout(() => this.cleanup(), 300);
    }
  }

  private setTooltipDimensions(): void {
    if (!this.tooltip) return;
    
    const cssVariablesMap: [string, StylesTypes, string][] = [
      ['--tooltip-width', this.tooltipWidth(), 'fixed-width-applied'],
      ['--tooltip-max-width', this.tooltipMaxWidth(), 'max-width-applied'],
      ['--tooltip-min-width', this.tooltipMinWidth(), 'min-width-applied'],
    ];

    const stylesArray: string[] = [];

    for (const [varName, value, className] of cssVariablesMap) {
      const normalized = this.normalizeCssValue(value);
      if (normalized) {
        stylesArray.push(`${varName}: ${normalized}`);
        this.renderer.addClass(this.tooltip, className);
      }
    }

    this.renderer.setAttribute(this.tooltip, 'style', stylesArray.join('; '));
  }

  private normalizeCssValue(value: StylesTypes): string {
    if (value === null || value === 0) return '';
    return typeof value === 'number' ? `${value}px` : value;
  }  

  private addonClasses(element: HTMLElement, classes: string[] | string | null) : void {
    if(!classes) return;
    if(Array.isArray(classes)) {
      classes.forEach(item => this.renderer.addClass(element, item));      
    } else {
      this.renderer.addClass(element, classes);
    }
  }
  private removeClasses(htmlElement: HTMLElement, classes: string[]):void {
    classes.forEach(element => this.renderer.removeClass(htmlElement, element))
  }
  private cleanup(): void {
    if (!this.tooltip && this.destroyListeners.length === 0) return;
    this.destroyListeners.forEach(fn => fn());
    this.destroyListeners = [];

    this.viewContainer.clear();
    this.tooltip = undefined;
  }
}

// sample
// <!-- attribute Or with template -->
// <button class="button primary" tooltipType="primary" [tooltip]="'Hello Salman'" tooltipDirection="left-top">primary</button>
// <div [tooltip]="advancedTooltip" [tooltipWidth]="1000">Hover for advanced tooltip</div>
// <ng-template #advancedTooltip>
//   <div class="custom-tooltip-content">
//     <h6>Advanced Tooltip</h6>
//     <p>With custom HTML content</p>
//     <a href="http://google.com" target="_blank">google.com</a>
//   </div>
// </ng-template>