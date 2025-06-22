import { animate, style, transition, trigger } from '@angular/animations';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'tooltip-wrapper',
  imports: [],
  templateUrl: './tooltip-wrapper.component.html',
  styleUrl: './tooltip-wrapper.component.css',
  animations: [
    trigger('insertRemoveTrigger', [
      transition(':enter', [style({ opacity: 0 }), animate('250ms', style({ opacity: 1 }))]),
      transition(':leave', [animate('100ms', style({ opacity: 0 }))]),
    ]),
  ],
  host: {
    'class': 'tooltip-wrapper'
  }
})
export class TooltipWrapperComponent {
  showTooltip = signal(false);
}
