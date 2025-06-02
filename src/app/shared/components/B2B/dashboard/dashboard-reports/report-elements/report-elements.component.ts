import { CommonModule, NgComponentOutlet } from '@angular/common';
import { booleanAttribute, Component, inject, Input, input, Type } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'report-elements',
  imports: [NgComponentOutlet, CommonModule],
  templateUrl: './report-elements.component.html',
  styleUrl: './report-elements.component.css',
  host: {
    'class': 'report-elements-wrapper',
    '[class.legend-block-wrapper]': 'legend()',
    '(click)': 'navigateTo()',
    '[attr.role]': 'report-elements',
    '[attr.tabindex]': '0',
  }
})
export class ReportElementsComponent {
  private router = inject(Router);
  public cardTitle = input<string>('Element-title');
  public counter = input<number|string>(0);
  public path = input<string|null>('/login');
  public legend = input(false, {transform: booleanAttribute})
  @Input() public icon: Type<any> | undefined;

  navigateTo(): void {
    this.router.navigate([this.path])
  }

}
