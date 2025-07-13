import { TooltipDirective } from '@/core/directives/tooltip.directive';
import { CommonModule } from '@angular/common';
import { Component, inject, model } from '@angular/core';
import { FiltersService } from '../../../services/filters.service';
@Component({
  selector: 'app-additional-info, additional-info',
  imports: [CommonModule, TooltipDirective],
  templateUrl: './additional-info.component.html',
  styleUrl: './additional-info.component.css',
  host: {
    'class': 'additional-info-wrapper',
    '[class.fixed]': 'isSticky()'
  }
})
export class AdditionalInfoComponent {
  public isSticky = inject(FiltersService).isSticky
}
