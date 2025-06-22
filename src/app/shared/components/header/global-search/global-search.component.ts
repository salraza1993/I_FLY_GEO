import { Component, signal } from '@angular/core';
import { SearchIndicatorComponent } from "./search-indicator/search-indicator.component";
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from '../../../../core/directives/click-outside.directive';
import { TooltipWrapperComponent } from "../../tooltip-wrapper/tooltip-wrapper.component";

@Component({
  selector: 'global-search',
  imports: [SearchIndicatorComponent, CommonModule, ClickOutsideDirective, TooltipWrapperComponent],
  templateUrl: './global-search.component.html',
  styleUrl: './global-search.component.css',
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
