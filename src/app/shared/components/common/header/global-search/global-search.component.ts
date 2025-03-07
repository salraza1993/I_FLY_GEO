import { Component, signal } from '@angular/core';
import { SearchIndicatorComponent } from "./search-indicator/search-indicator.component";
import { slideIn } from '../../../../animations/slide.animations';
import { fadeIn } from '../../../../animations/fade.animations';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { ClickOutsideDirective } from '../../../../../core/directives/click-outside.directive';

@Component({
  selector: 'global-search',
  imports: [SearchIndicatorComponent, CommonModule, ClickOutsideDirective],
  templateUrl: './global-search.component.html',
  styleUrl: './global-search.component.css',
  animations: [
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [style({ opacity: 0 }), animate('100ms', style({ opacity: 1 }))]),
      transition(':leave', [animate('100ms', style({ opacity: 0 }))]),
    ]),
  ],
  host: {
    class: 'global-search'
  }
})
export class GlobalSearchComponent {
  public searchIndicatorState = signal(false);

  public toggleSearchIndicator(value: boolean): void {
    this.searchIndicatorState.update(() => value);
  }
}
