import { CommonModule, NgComponentOutlet } from '@angular/common';
import { booleanAttribute, Component, Input, input, Type } from '@angular/core';

@Component({
  selector: 'report-elements',
  imports: [NgComponentOutlet, CommonModule],
  templateUrl: './report-elements.component.html',
  styleUrl: './report-elements.component.css',
  host: {
    'class': 'report-elements-wrapper'
  }
})
export class ReportElementsComponent {
  public title = input('Element-title');
  public counter = input<number|string>(0);
  public legend = input(false, {transform: booleanAttribute})
  @Input() public icon: Type<any> | undefined;
}
